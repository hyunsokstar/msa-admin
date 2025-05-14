import { Button } from "@/components/ui/button";
import { Editor } from '@tiptap/react';

interface TiptapToolbarProps {
  editor: Editor;
  addImage?: () => void;
  addResizableImage?: () => void;
}

export const TiptapToolbar = ({ editor, addImage, addResizableImage }: TiptapToolbarProps) => {
  const handleInsertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const handleAddColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run();
  };

  const handleAddColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run();
  };

  const handleDeleteColumn = () => {
    editor.chain().focus().deleteColumn().run();
  };

  const handleAddRowBefore = () => {
    editor.chain().focus().addRowBefore().run();
  };

  const handleAddRowAfter = () => {
    editor.chain().focus().addRowAfter().run();
  };

  const handleDeleteRow = () => {
    editor.chain().focus().deleteRow().run();
  };

  const handleDeleteTable = () => {
    editor.chain().focus().deleteTable().run();
  };

  return (
    <div className="flex flex-wrap gap-2 border rounded-md p-2 bg-background">
      {/* 기존 버튼 */}
      <Button type="button" onClick={handleInsertTable}>테이블 추가</Button>
      <Button type="button" onClick={handleAddColumnBefore}>열 추가 (앞)</Button>
      <Button type="button" onClick={handleAddColumnAfter}>열 추가 (뒤)</Button>
      <Button type="button" onClick={handleDeleteColumn}>열 삭제</Button>
      <Button type="button" onClick={handleAddRowBefore}>행 추가 (위)</Button>
      <Button type="button" onClick={handleAddRowAfter}>행 추가 (아래)</Button>
      <Button type="button" onClick={handleDeleteRow}>행 삭제</Button>
      <Button type="button" onClick={handleDeleteTable}>테이블 삭제</Button>
    </div>
  );
};
