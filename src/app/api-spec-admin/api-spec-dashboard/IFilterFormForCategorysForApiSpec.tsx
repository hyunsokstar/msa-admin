import React from "react";
import { Input } from "@/components/ui/input";

interface IFilterFormForCategorysForApiSpecProps {
  category1: string;
  category2: string;
  onCategory1Change: (value: string) => void;
  onCategory2Change: (value: string) => void;
}

const IFilterFormForCategorysForApiSpec: React.FC<IFilterFormForCategorysForApiSpecProps> = ({
  category1,
  category2,
  onCategory1Change,
  onCategory2Change,
}) => {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Category 1"
        value={category1}
        onChange={(e) => onCategory1Change(e.target.value)}
        className="w-32"
      />
      <Input
        placeholder="Category 2"
        value={category2}
        onChange={(e) => onCategory2Change(e.target.value)}
        className="w-32"
      />
    </div>
  );
};

export default IFilterFormForCategorysForApiSpec;   