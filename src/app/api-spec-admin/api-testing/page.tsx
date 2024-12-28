"use client";

import React from 'react';
import type { Key } from 'react';
import ReactDataGrid from 'react-data-grid';
import { SelectColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { useApiForDashboard } from '@/hook/useApiForDashboard';
import IDialogButtonForApiTestResultList from './_comp/IDialogButtonForApiTestResultList';
import IRadioButtonsForOptionsForMultiApiTestList from './_comp/IRadioButtonsForOptionsForMultiApiTestList';
import IServiceCardsForFilteringMultiApiTestList from './_comp/IServiceCardsForFilteringMultiApiTestList';
import IFilterFormForCategorysForApiSpec from '../api-spec-dashboard/IFilterFormForCategorysForApiSpec';
import DialogButtonForAdminLoginAndGetToken from '@/components/dialog/DialogButtonForAdminLoginAndGetToken';

type TestStatus = 'loading' | 'success' | 'error' | undefined;
type HttpMethod = 'ALL' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RowData {
  id: string | number;
  service_name: string;
  title: string;
  method: string;
  endpoint: string;
  request_body_schema: string;
  category1?: string;
  category2?: string;
}

interface TestResult {
  id: string | number;
  service_name: string;
  title: string;
  method: string;
  status: TestStatus;
  time?: string;
  timestamp: string;
}

function ApiTesting() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedMethod, setSelectedMethod] = React.useState<HttpMethod>('ALL');
  const [selectedService, setSelectedService] = React.useState("ALL");
  const [category1, setCategory1] = React.useState("");
  const [category2, setCategory2] = React.useState("");
  const [bearerToken, setBearerToken] = React.useState("");
  const pageSize = 10;
  const [selectedRows, setSelectedRows] = React.useState<ReadonlySet<Key>>(new Set());
  const [testResults, setTestResults] = React.useState<Record<string, TestStatus>>({});
  const [testTimes, setTestTimes] = React.useState<Record<string, string | undefined>>({});
  const [isTestRunning, setIsTestRunning] = React.useState(false);
  const [testResultsList, setTestResultsList] = React.useState<TestResult[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = React.useState(false);
  const { data, isLoading, isError } = useApiForDashboard();

  const columns = [
    SelectColumn,
    { key: 'service_name', name: 'Service Name', width: 150 },
    { key: 'title', name: 'Title', width: 200 },
    { key: 'method', name: 'Method', width: 100 },
    { key: 'endpoint', name: 'Endpoint', width: 250 },
    { key: 'request_body_schema', name: 'Request Body Schema', width: 300 }
  ];

  const getFilteredData = () => {
    if (!data?.specs) return [];
    return data.specs.filter(spec => 
      (selectedMethod === 'ALL' || spec.method === selectedMethod) &&
      (selectedService === 'ALL' || spec.service_name === selectedService) &&
      (!category1 || spec.category1?.toLowerCase().includes(category1.toLowerCase())) &&
      (!category2 || spec.category2?.toLowerCase().includes(category2.toLowerCase()))
    );
  };

  const getCurrentPageData = () => {
    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex).map((spec) => ({
      ...spec,
      id: spec.id
    }));
  };

  const handleSelectedRowsChange = (newSelectedRows: ReadonlySet<Key>) => {
    setSelectedRows(newSelectedRows);
  };

  const handleMethodChange = (value: string) => {
    setSelectedMethod(value as HttpMethod);
    setCurrentPage(1);
    setSelectedRows(new Set());
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setCurrentPage(1);
    setSelectedRows(new Set());
  };

  const handleCategory1Change = (value: string) => {
    setCategory1(value);
    setCurrentPage(1);
    setSelectedRows(new Set());
  };

  const handleCategory2Change = (value: string) => {
    setCategory2(value);
    setCurrentPage(1);
    setSelectedRows(new Set());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTokenReceived = (token: string) => {
    setBearerToken(token);
  };

  const handleTestSelectedRows = async () => {
    if (!data?.specs || selectedRows.size === 0) return;

    console.log("bearerToken : ", bearerToken);
    

    setIsTestRunning(true);
    const updatedResults = { ...testResults };
    const updatedTimes = { ...testTimes };
    const newTestResults: TestResult[] = [];

    for (const rowId of selectedRows) {
      const key = rowId.toString();
      const rowData = data.specs.find((spec) => spec.id === rowId);

      if (!rowData) continue;

      updatedResults[key] = 'loading';
      setTestResults({ ...updatedResults });

      const startTime = performance.now();
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (bearerToken) {
          headers['Authorization'] = `Bearer ${bearerToken}`;
        }

        console.log("headers : ", headers);
        

        const response = await fetch('/api/proxy', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            endpoint: rowData.endpoint,
            method: rowData.method,
            body: rowData.request_body_schema,
          }),
        });

        const status = response.ok ? 'success' : 'error';
        updatedResults[key] = status;
        const endTime = performance.now();
        const timeSpent = (endTime - startTime).toFixed(2);
        updatedTimes[key] = timeSpent;

        newTestResults.push({
          id: rowData.id,
          service_name: rowData.service_name ?? 'Unknown Service',
          title: rowData.title,
          method: rowData.method,
          status,
          time: timeSpent,
          timestamp: new Date().toLocaleTimeString()
        });
      } catch (error) {
        updatedResults[key] = 'error';
        newTestResults.push({
          id: rowData.id,
          service_name: rowData.service_name ?? 'Unknown Service',
          title: rowData.title,
          method: rowData.method,
          status: 'error',
          timestamp: new Date().toLocaleTimeString()
        });
      }
    }

    setTestResults({ ...updatedResults });
    setTestTimes({ ...updatedTimes });
    setTestResultsList([...newTestResults, ...testResultsList]);
    setIsTestRunning(false);
    setIsResultModalOpen(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-96 text-destructive">Error loading data</div>;
  }

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <IServiceCardsForFilteringMultiApiTestList
        selectedService={selectedService}
        onServiceChange={handleServiceChange}
        specs={data?.specs}
      />

      <Card className="shadow-md border-2">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <CardTitle>API Specifications</CardTitle>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Selected: {selectedRows.size}
                </span>
                <Button 
                  onClick={handleTestSelectedRows}
                  className="relative inline-flex items-center gap-2 transition-all hover:bg-primary/90 active:scale-95"
                  disabled={selectedRows.size === 0 || isTestRunning}
                >
                  {isTestRunning && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Run Test
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="bearer-token" className="min-w-[100px]">Bearer Token:</Label>
                <div className="flex flex-1 gap-2">
                  <Input
                    id="bearer-token"
                    value={bearerToken}
                    onChange={(e) => setBearerToken(e.target.value)}
                    className="flex-1 font-mono text-sm"
                    placeholder="Enter your Bearer token..."
                  />
                  <DialogButtonForAdminLoginAndGetToken 
                    onTokenReceived={handleTokenReceived}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <IRadioButtonsForOptionsForMultiApiTestList 
                  selectedMethod={selectedMethod}
                  onMethodChange={handleMethodChange}
                />
                <IFilterFormForCategorysForApiSpec
                  category1={category1}
                  category2={category2}
                  onCategory1Change={handleCategory1Change}
                  onCategory2Change={handleCategory2Change}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="min-h-[500px] border rounded-lg overflow-hidden">
            <ReactDataGrid
              columns={columns}
              rows={getCurrentPageData()}
              rowHeight={50}
              className="rdg-light h-full"
              selectedRows={selectedRows}
              onSelectedRowsChange={handleSelectedRowsChange}
              rowKeyGetter={(row) => (row as RowData).id}
            />
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              total={filteredData.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              className="custom-pagination"
            />
          </div>
        </CardContent>
      </Card>

      <IDialogButtonForApiTestResultList 
        isOpen={isResultModalOpen}
        onOpenChange={setIsResultModalOpen}
        testResultsList={testResultsList}
      />
    </div>
  );
}

export default ApiTesting;