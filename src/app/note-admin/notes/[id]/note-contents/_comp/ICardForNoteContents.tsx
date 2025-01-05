// src/components/notes/ICardForNoteContents.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NoteContent } from "@/types/notes/typeForNoteContents";
import useApiForDeleteNoteContent from "@/hook/notes/useApiForDeleteNoteContent";
import IDialogButtonForDeleteNoteContents from "./IDialogButtonForDeleteNoteContents";

interface ICardForNoteContentsProps {
  content: NoteContent;
  isSelected: boolean;
  onClick: () => void;
  onTitleChange?: (value: string) => void;
  onPathChange?: (value: string) => void;
  noteId: string;
  pageNum?: number;
}

const ICardForNoteContents = ({ 
  content, 
  isSelected, 
  onClick,
  onTitleChange,
  onPathChange,
  noteId,
  pageNum
}: ICardForNoteContentsProps) => {
  const { deleteNoteContent, isLoading, error } = useApiForDeleteNoteContent({
    noteId,
    pageNum
  });

  const handleDelete = () => {
    deleteNoteContent(content.id);
  };

  return (
    <Card 
      className={`mb-4 transition-all hover:shadow-md relative bg-white rounded-xl border border-gray-200
        ${isSelected ? 'ring-1 ring-blue-400 shadow-md' : 'hover:border-gray-300'}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-5 mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">{content.order}</span>
          </div>

          <div className="relative group">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src={content.writer?.profile_image_url} 
                alt={content.writer?.full_name || '사용자'} 
              />
              <AvatarFallback>
                {content.writer?.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded 
              opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
              {content.writer?.full_name || '사용자'}
            </div>
          </div>

          <div className="flex-grow grid grid-cols-[1fr,1fr,auto] gap-4 items-center">
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

            <IDialogButtonForDeleteNoteContents
              onConfirm={handleDelete}
              isLoading={isLoading}
            />
          </div>
        </div>

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