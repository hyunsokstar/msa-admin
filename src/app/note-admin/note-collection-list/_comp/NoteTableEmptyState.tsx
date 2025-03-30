// src/components/empty-states/NoteTableEmptyState.tsx
"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

export const NoteTableEmptyState = () => (
  <TableRow>
    <TableCell colSpan={4}>
      <div className="h-[400px] flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 shadow-inner">
          <PlusCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          노트가 없습니다
        </h3>
        <p className="text-sm text-gray-500 max-w-[260px]">
          새로운 노트를 추가해서 컬렉션을 채워보세요
        </p>
      </div>
    </TableCell>
  </TableRow>
);
