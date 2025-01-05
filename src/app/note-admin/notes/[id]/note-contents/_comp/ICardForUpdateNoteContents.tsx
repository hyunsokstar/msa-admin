// src/components/notes/ICardForUpdateNoteContents.tsx
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { NoteContent } from "@/types/notes/typeForNoteContents";
import TiptapEditor from "@/components/rich-editor/TipTabEditor";

interface Props {
  content: NoteContent;
  isSelected: boolean;
  onClick: () => void;
  onUpdate?: (updatedContent: NoteContent) => void;
  onCancel?: () => void;
}

const ICardForUpdateNoteContents = ({ content, isSelected, onClick, onUpdate, onCancel }: Props) => {
  const [formData, setFormData] = useState({
    title: content.title || '',
    path: content.path || '',
    content: content.content || ''
  });

  const handleUpdate = () => {
    console.log('Update clicked for content:', {
      ...content,
      ...formData
    });
    onUpdate?.({
      ...content,
      ...formData
    });
  };

  const handleCancel = () => {
    console.log('Cancel clicked for content:', content);
    setFormData({
      title: content.title || '',
      path: content.path || '',
      content: content.content || ''
    });
    onCancel?.();
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

          <div className="flex-grow grid grid-cols-2 gap-4 items-center">
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="제목 입력"
              className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
            />
            <Input
              value={formData.path}
              onChange={(e) => setFormData(prev => ({ ...prev, path: e.target.value }))}
              placeholder="경로 입력"
              className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
            />
          </div>
        </div>

        <div className="min-h-[180px] border border-gray-200 rounded-lg bg-white mb-4">
          <TiptapEditor
            content={formData.content}
            onChange={(newContent) => {
              setFormData(prev => ({ ...prev, content: newContent }));
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleUpdate}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
          >
            <Check className="w-4 h-4" />
            수정 완료
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex items-center justify-center gap-2 border-red-500 text-red-500 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
            취소
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ICardForUpdateNoteContents;