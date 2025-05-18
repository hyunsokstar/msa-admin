// src/components/notes/ICardForUpdateNoteContents.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { NoteContent } from "@/types/notes/typeForNoteContents";
import LexicalEditor from "@/components/rich-editor/LexicalEditor";
import { toast } from "react-toastify";
import useApiForUpdateNoteContents from "@/hook/notes/useApiForUpdateNoteContents";
import TiptapEditor from "@/components/rich-editor/TibTabEditor";

const isValidLexicalJson = (value: string) => {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && "root" in parsed;
  } catch {
    return false;
  }
};

const defaultEmptyLexicalJson = JSON.stringify({
  root: {
    children: [],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

interface Props {
  content: NoteContent;
  isSelected: boolean;
  onClick: () => void;
  onCancel?: () => void;
  noteId: string;
  pageNum?: number;
}

const ICardForUpdateNoteContents = ({
  content,
  isSelected,
  onClick,
  onCancel,
  noteId,
  pageNum,
}: Props) => {
  const { updateNoteContent, isLoading } = useApiForUpdateNoteContents({
    noteId,
    pageNum,
  });

  const [formData, setFormData] = useState({
    title: content.title || "",
    path: content.path || "",
    content:
      content.content && isValidLexicalJson(content.content)
        ? content.content
        : content.content || defaultEmptyLexicalJson,
  });

  const handleUpdate = async () => {
    try {
      await updateNoteContent(content.id, {
        title: formData.title,
        path: formData.path,
        content: formData.content,
      });

      toast.success("노트 내용이 성공적으로 수정되었습니다.", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error("노트 내용 수정 중 오류가 발생했습니다.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      title: content.title || "",
      path: content.path || "",
      content:
        content.content && isValidLexicalJson(content.content)
          ? content.content
          : content.content || defaultEmptyLexicalJson,
    });
    onCancel?.();
  };

  return (
    <Card
      className={`mb-4 transition-all hover:shadow-md relative bg-white rounded-xl border border-gray-200 ${isSelected ? "ring-1 ring-blue-400 shadow-md" : "hover:border-gray-300"
        }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-5 mb-5">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {content.order}
            </span>
          </div>

          <div className="relative group">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={content.writer?.profile_image_url}
                alt={content.writer?.full_name || "사용자"}
              />
              <AvatarFallback>
                {content.writer?.full_name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-grow grid grid-cols-2 gap-4 items-center">
            <Input
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="제목 입력"
              className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
            />
            <Input
              value={formData.path}
              onChange={(e) => setFormData((prev) => ({ ...prev, path: e.target.value }))}
              placeholder="경로 입력"
              className="h-10 px-4 bg-gray-50 border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 rounded-lg transition-all"
            />
          </div>
        </div>

        <div className="min-h-[180px] border border-gray-200 rounded-lg bg-white">
          {isValidLexicalJson(formData.content) ? (
            <LexicalEditor
              content={formData.content}
              onChange={(newContent) =>
                setFormData((prev) => ({ ...prev, content: newContent }))
              }
            />
          ) : (
            <TiptapEditor
              content={formData.content}
              onChange={(newContent) =>
                setFormData((prev) => ({ ...prev, content: newContent }))
              }
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleUpdate}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white"
          >
            <Check className="w-4 h-4" />
            {isLoading ? "수정 중..." : "수정 완료"}
          </Button>
          <Button
            onClick={handleCancel}
            disabled={isLoading}
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