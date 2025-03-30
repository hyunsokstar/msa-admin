"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

export const SkeletonForNoteListTable = () => {
  return Array(7).fill(0).map((_, idx) => (
    <TableRow
      key={idx}
      className={clsx(
        "bg-muted/40", // 더 강조된 배경
        "border-b",
        "animate-pulse"
      )}
    >
      {/* Writer Cell */}
      <TableCell className="w-[200px]">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-20 rounded bg-gray-200" />
            <Skeleton className="h-3 w-16 rounded bg-gray-200" />
          </div>
        </div>
      </TableCell>

      {/* Title Cell */}
      <TableCell className="min-w-[320px]">
        <div className="space-y-1">
          <Skeleton className="h-4 w-3/4 rounded bg-gray-200" />
          <Skeleton className="h-4 w-1/2 rounded bg-gray-200" />
        </div>
      </TableCell>

      {/* Created At Cell */}
      <TableCell className="w-[130px]">
        <Skeleton className="h-4 w-24 rounded bg-gray-200" />
      </TableCell>

      {/* Actions Cell */}
      <TableCell className="w-[140px]">
        <div className="flex gap-2 justify-end pr-2">
          <Skeleton className="h-9 w-9 rounded-md shadow bg-gray-200" />
          <Skeleton className="h-9 w-9 rounded-md shadow bg-gray-200" />
        </div>
      </TableCell>
    </TableRow>
  ));
};
