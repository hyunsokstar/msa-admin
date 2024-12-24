import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MethodFilterToggle = ({ 
  selectedMethods, 
  onMethodToggle 
}: { 
  selectedMethods: Set<string>,
  onMethodToggle: (method: string) => void 
}) => {
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  
  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-500";
      case "POST":
        return "bg-green-500";
      case "PUT":
        return "bg-yellow-500";
      case "DELETE":
        return "bg-red-500";
      case "PATCH":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex gap-2">
      {methods.map((method) => (
        <Badge
          key={method}
          className={cn(
            "cursor-pointer w-16 justify-center",
            selectedMethods.has(method) ? getMethodColor(method) : "bg-gray-200"
          )}
          onClick={() => onMethodToggle(method)}
        >
          {method}
        </Badge>
      ))}
    </div>
  );
};

export default MethodFilterToggle;