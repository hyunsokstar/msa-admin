import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface CollapseControlsProps {
  onCollapseAll: () => void;
  onExpandAll: () => void;
  onCollapseToLevel: (level: number) => void;
  currentExpandedCount: number;
  totalCount: number;
  activeLevel: number;
}

export const CollapseControls: React.FC<CollapseControlsProps> = ({
  onCollapseAll,
  onExpandAll,
  onCollapseToLevel,
  currentExpandedCount,
  totalCount,
  activeLevel
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    if (isCollapsed) {
      onExpandAll();
    } else {
      onCollapseAll();
    }
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 py-3 px-5 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
      {/* 단계 선택 버튼 */}
      <div className="flex gap-2">
        {[1, 2].map((level) => (
          <Button
            key={level}
            variant={activeLevel === level ? "default" : "outline"}
            size="sm"
            onClick={() => onCollapseToLevel(level)}
            className={`text-xs font-medium ${
              activeLevel === level
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {`${level}단계`}
          </Button>
        ))}
      </div>

      {/* 접기/펼치기 버튼 */}
      <div className="ml-auto flex gap-2 items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleToggleCollapse}
          className="text-xs font-medium"
        >
          {isCollapsed ? "펼치기" : "접기"}
        </Button>
      </div>

      {/* 카운트 정보 */}
      <div className="ml-4 text-xs text-gray-500">
        {currentExpandedCount} / {totalCount}
      </div>
    </div>
  );
};
