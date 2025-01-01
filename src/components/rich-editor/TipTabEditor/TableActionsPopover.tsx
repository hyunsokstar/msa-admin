"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table as TableIcon } from "lucide-react";
import { Editor } from "@tiptap/react";

interface TableActionsPopoverProps {
  editor: Editor;
}

const TableActionsPopover = ({ editor }: TableActionsPopoverProps) => {
  const handleInsertTable = () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  const handleAddColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const handleAddColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const handleDeleteColumn = () => editor.chain().focus().deleteColumn().run();
  const handleAddRowBefore = () => editor.chain().focus().addRowBefore().run();
  const handleAddRowAfter = () => editor.chain().focus().addRowAfter().run();
  const handleDeleteRow = () => editor.chain().focus().deleteRow().run();
  const handleDeleteTable = () => editor.chain().focus().deleteTable().run();

  return (
    <Popover>
      {/* <PopoverTrigger asChild>
        <Button type="button" variant="ghost">
          <TableIcon className="mr-2 h-4 w-4" /> 테이블3
        </Button>
      </PopoverTrigger> */}
      <PopoverContent className="absolute right-0 w-64 p-2 flex flex-wrap gap-2 bg-white shadow-md border rounded-md">
        <Button variant="ghost" type="button" onClick={handleInsertTable} className="hover:bg-gray-100">
          테이블 추가
        </Button>
        <Button variant="ghost" type="button" onClick={handleAddColumnBefore} className="hover:bg-gray-100">
          열 추가 (앞)
        </Button>
        <Button variant="ghost" type="button" onClick={handleAddColumnAfter} className="hover:bg-gray-100">
          열 추가 (뒤)
        </Button>
        <Button variant="ghost" type="button" onClick={handleDeleteColumn} className="hover:bg-gray-100">
          열 삭제
        </Button>
        <Button variant="ghost" type="button" onClick={handleAddRowBefore} className="hover:bg-gray-100">
          행 추가 (위)
        </Button>
        <Button variant="ghost" type="button" onClick={handleAddRowAfter} className="hover:bg-gray-100">
          행 추가 (아래)
        </Button>
        <Button variant="ghost" type="button" onClick={handleDeleteRow} className="hover:bg-gray-100">
          행 삭제
        </Button>
        <Button variant="ghost" type="button" onClick={handleDeleteTable} className="hover:bg-gray-100">
          테이블 삭제
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default TableActionsPopover;
