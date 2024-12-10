import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface IFormSelectBoxProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const IFormSelectBox: React.FC<IFormSelectBoxProps> = ({ label, options, value, placeholder, onChange }) => {
  const selectContentStyles = "bg-white border border-gray-300 rounded-md shadow-lg";
  const selectItemStyles = "cursor-pointer hover:bg-indigo-50 focus:bg-indigo-50 py-2 px-3";
  const selectTriggerStyles = "border border-gray-300 px-4 py-2 rounded-md hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out";

  return (
    <Select
      onValueChange={(value) => onChange(value)}
      value={value}
    >
      <SelectTrigger className={selectTriggerStyles}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={selectContentStyles}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className={selectItemStyles}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IFormSelectBox;
