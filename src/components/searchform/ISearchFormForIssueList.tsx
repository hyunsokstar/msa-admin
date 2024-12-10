import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IssueFilter } from "@/types/typeForTaskIssue";
import useApiForUsersInfoForSelectBox from "@/hook/useApiForUsersInfoForSelectBox";
import IFormSelectBox from "../form-select/IFormSelectBox";
import FormSelectBoxForAllUserListWithApi from "../form-select/FormSelectBoxForAllUserListWithApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SearchFormProps {
  onFilterChange: (filter: IssueFilter) => void;
  stats: { totalCompleted: number; totalIncomplete: number };
}

const ISearchFormForIssueList: React.FC<SearchFormProps> = ({
  onFilterChange,
  stats,
}) => {
  const [filter, setFilter] = React.useState<IssueFilter>({});
  const { data: users } = useApiForUsersInfoForSelectBox();

  const handleFilterChange = (key: keyof IssueFilter, value: string | undefined) => {
    const newFilter = {
      ...filter,
      [key]: value === "All" ? undefined : value,
    };

    Object.keys(newFilter).forEach((key) => {
      if (newFilter[key as keyof IssueFilter] === undefined) {
        delete newFilter[key as keyof IssueFilter];
      }
    });

    setFilter(newFilter);
  };

  const handleSearch = () => {
    onFilterChange(filter);
  };

  // Chart data
  const chartData = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        label: "Issues",
        data: [stats.totalCompleted, stats.totalIncomplete],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // 범례(라벨) 숨기기
    },
    title: {
      display: true,
      text: "Issue Statistics",
    },
  },
};


  return (
    <Card className="mb-6 shadow-lg border border-gray-300 rounded-lg">
      <CardContent className="pt-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Left: Filters */}
          <div className="grid grid-cols-1 gap-4">
            <IFormSelectBox
              label="Status"
              placeholder="Filter by Status"
              options={[
                { value: "All", label: "All Status" },
                { value: "Open", label: "Open" },
                { value: "In Progress", label: "In Progress" },
                { value: "Closed", label: "Closed" },
              ]}
              value={filter.status ?? "All"}
              onChange={(value) => handleFilterChange("status", value)}
            />

            <IFormSelectBox
              label="Priority"
              placeholder="Filter by Priority"
              options={[
                { value: "All", label: "All Priority" },
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
              value={filter.priority ?? "All"}
              onChange={(value) => handleFilterChange("priority", value)}
            />

            <IFormSelectBox
              label="Category"
              placeholder="Filter by Category"
              options={[
                { value: "All", label: "All Categories" },
                { value: "shop", label: "Shop" },
                { value: "lms", label: "LMS" },
                { value: "cms", label: "CMS" },
                { value: "user", label: "User" },
              ]}
              value={filter.category1 ?? "All"}
              onChange={(value) => handleFilterChange("category1", value)}
            />

            <IFormSelectBox
              label="Type"
              placeholder="Filter by Type"
              options={[
                { value: "All", label: "All Types" },
                { value: "Bug", label: "Bug" },
                { value: "Feature", label: "Feature" },
                { value: "Enhancement", label: "Enhancement" },
              ]}
              value={filter.type ?? "All"}
              onChange={(value) => handleFilterChange("type", value)}
            />
          </div>

          {/* Center: Other Inputs */}
          <div className="flex flex-col gap-4">
            <FormSelectBoxForAllUserListWithApi
              onChange={(value) => handleFilterChange("executor", value ?? undefined)}
            />
            <Input
              placeholder="Search by Title or Description"
              value={filter.keyword ?? ""}
              onChange={(e) => handleFilterChange("keyword", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md shadow-lg transition-all duration-200 ease-in-out"
            >
              Search
            </Button>
          </div>

          {/* Right: Statistics */}
          <div className="flex items-center justify-center mx-auto">
            <div className="w-full">
              {/* <h3 className="text-lg font-bold text-center mb-4">Statistics</h3> */}
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ISearchFormForIssueList;
