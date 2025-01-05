// src/components/notes/ICardForNoteContents.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NoteContent } from "@/types/notes/typeForNoteContents";

interface ICardForNoteContentsProps {
  content: NoteContent;
  isSelected: boolean;
  onClick: () => void;
  onTitleChange?: (value: string) => void;
  onPathChange?: (value: string) => void;
}

const ICardForNoteContents = ({ 
  content, 
  isSelected, 
  onClick,
  onTitleChange,
  onPathChange 
}: ICardForNoteContentsProps) => {
  return (
    <Card 
      className={`mb-4 transition-all hover:shadow-md relative bg-white rounded-xl border border-gray-200
        ${isSelected ? 'ring-1 ring-blue-400 shadow-md' : 'hover:border-gray-300'}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        {/* 상단 입력 영역 */}
        <div className="flex items-start gap-5 mb-5">
          {/* Order 표시 */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">{content.order}</span>
          </div>
          
          {/* Title & Path 입력 영역 */}
          <div className="flex-grow grid grid-cols-2 gap-4">
            <Input
              value={content.title || ''}
              onChange={(e) => onTitleChange?.(e.target.value)}
              placeholder="제목 입력"
              className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
            />
            <Input
              value={content.path || ''}
              onChange={(e) => onPathChange?.(e.target.value)}
              placeholder="경로 입력"
              className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
            />
          </div>
        </div>

        {/* Content 영역 - HTML 렌더링 */}
        <div 
          className="min-h-[180px] p-5 border border-gray-200 rounded-lg bg-gray-50 prose prose-sm max-w-none
            hover:bg-white transition-colors duration-200"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </CardContent>
    </Card>
  );
};

export default ICardForNoteContents;