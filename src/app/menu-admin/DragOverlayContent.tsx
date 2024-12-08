import React from 'react';
import { FolderIcon, ChevronRight } from 'lucide-react';
import { MenuItemType } from '@/api/apiForMenu';
import { DEPTH_COLORS } from './DEPTH_COLORS';

interface DragOverlayContentProps {
  menu: MenuItemType;
  depth: number;
}

export const DragOverlayContent: React.FC<DragOverlayContentProps> = ({ menu, depth }) => {
  const depthColor = DEPTH_COLORS[depth as keyof typeof DEPTH_COLORS] || DEPTH_COLORS[2];

  return (
    <div className="mb-1.5 rounded-md bg-white shadow-lg border border-blue-200 scale-[1.01] opacity-95 transition-transform duration-150">
      <div className="flex items-center p-2.5">
        <div className="flex-none w-[28px] mr-2">
          {menu.items.length > 0 && (
            <ChevronRight className="w-3 h-3" style={{ color: depthColor }} />
          )}
        </div>
        <div className="flex items-center gap-2 flex-1">
          <FolderIcon className="w-4 h-4" style={{ color: depthColor }} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: depthColor }}>
              {menu.name}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">
              {menu.path}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};