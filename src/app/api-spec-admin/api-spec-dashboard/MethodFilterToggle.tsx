import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MethodFilterToggle = ({ 
  selectedMethods, 
  onMethodToggle 
}: { 
  selectedMethods: Set<string>,
  onMethodToggle: (method: string, event: React.MouseEvent) => void 
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
    <div className="flex flex-col gap-2">
      <div className="text-xs text-gray-500">
        Ctrl(⌘)+클릭으로 여러 메소드를 선택할 수 있습니다
      </div>
      <div className="flex gap-2">
        {methods.map((method) => (
          <Badge
            key={method}
            className={cn(
              "cursor-pointer w-16 justify-center",
              selectedMethods.has(method) ? getMethodColor(method) : "bg-gray-200"
            )}
            onClick={(e) => onMethodToggle(method, e)}
          >
            {method}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MethodFilterToggle;