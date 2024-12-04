import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IssueFilter } from '@/types/typeForTaskIssue';

interface SearchFormProps {
  onFilterChange: (filter: IssueFilter) => void;
}

const ISearchFormForIssueList: React.FC<SearchFormProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = React.useState<IssueFilter>({});

  // 필터 변경 함수
  const handleFilterChange = (key: keyof IssueFilter, value: string | undefined) => {
    const newFilter = {
      ...filter,
      [key]: value === "All" ? undefined : value,
    };

    // Remove undefined values to prevent invalid filters
    Object.keys(newFilter).forEach((key) => {
      if (newFilter[key as keyof IssueFilter] === undefined) {
        delete newFilter[key as keyof IssueFilter];
      }
    });

    setFilter(newFilter);
  };

  // 검색 버튼을 클릭했을 때 API 호출
  const handleSearch = () => {
    onFilterChange(filter);
  };

  return (
    <Card className="mb-6 shadow-lg border border-gray-300 rounded-lg">
      <CardContent className="pt-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          {/* Filter by Status */}
          <Select
            onValueChange={(value) => handleFilterChange('status', value)}
            value={filter.status ?? "All"}
          >
            <SelectTrigger className="border border-gray-300 px-4 py-2 rounded-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Priority */}
          <Select
            onValueChange={(value) => handleFilterChange('priority', value)}
            value={filter.priority ?? "All"}
          >
            <SelectTrigger className="border border-gray-300 px-4 py-2 rounded-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out">
              <SelectValue placeholder="Filter by Priority" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
              <SelectItem value="All">All Priority</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Category */}
          <Select
            onValueChange={(value) => handleFilterChange('category', value)}
            value={filter.category ?? "All"}
          >
            <SelectTrigger className="border border-gray-300 px-4 py-2 rounded-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
              <SelectItem value="All">All Categories</SelectItem>
              <SelectItem value="shop">Shop</SelectItem>
              <SelectItem value="lms">LMS</SelectItem>
              <SelectItem value="cms">CMS</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Type */}
          <Select
            onValueChange={(value) => handleFilterChange('type', value)}
            value={filter.type ?? "All"}
          >
            <SelectTrigger className="border border-gray-300 px-4 py-2 rounded-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Bug">Bug</SelectItem>
              <SelectItem value="Feature">Feature</SelectItem>
              <SelectItem value="Enhancement">Enhancement</SelectItem>
            </SelectContent>
          </Select>

          {/* Search by Title/Description */}
          <div className="col-span-1 md:col-span-4">
            <Input
              placeholder="Search by Title or Description"
              value={filter.keyword ?? ""}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              // 엔터 치면 handleSearch 함수 호출
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSearch}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-lg transition-all duration-200 ease-in-out"
          >
            Search
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ISearchFormForIssueList;
