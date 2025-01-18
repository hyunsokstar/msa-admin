import React from 'react';
import { Button } from "@/components/ui/button";
import { X, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TestResult } from '../page';


interface ApiTestResultDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  testResultsList: TestResult[];
}

const IDialogButtonForApiTestResultList: React.FC<ApiTestResultDialogProps> = ({
  isOpen,
  onOpenChange,
  testResultsList
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-full h-full max-h-screen flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Test Results</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 p-0"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testResultsList.map((result, index) => (
                  <tr key={`${result.id}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {result.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {result.status === 'success' ? (
                          <div className="flex items-center text-green-600 gap-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>Success</span>
                          </div>
                        ) : result.status === 'loading' ? (
                          <div className="flex items-center text-yellow-600 gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Loading</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600 gap-1">
                            <XCircle className="h-4 w-4" />
                            <span>Failed</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{result.time} ms</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForApiTestResultList;