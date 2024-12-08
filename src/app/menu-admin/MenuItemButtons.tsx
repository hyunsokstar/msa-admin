import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import DialogButtonForAddMenuForParentMenu from '@/components/dialog/DialogButtonForAddMenuForParentMenu';

interface MenuItemButtonsProps {
  menuId: number;
  menuName: string;
  onSuccess: () => void;
  onDelete: (id: number, name: string) => void;
  isDeleting: boolean;
}

export const MenuItemButtons: React.FC<MenuItemButtonsProps> = ({
  menuId,
  menuName,
  onSuccess,
  onDelete,
  isDeleting
}) => {
  return (
    <div className="flex items-center gap-1">
      <DialogButtonForAddMenuForParentMenu
        parentId={menuId}
        parentMenuName={menuName}
        onSuccess={onSuccess}
      />
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Pencil className="w-3 h-3 text-gray-400" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-7 w-7 ${isDeleting ? 'opacity-50' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(menuId, menuName);
        }}
        disabled={isDeleting}
      >
        <Trash2 className="w-3 h-3 text-gray-400" />
      </Button>
    </div>
  );
};