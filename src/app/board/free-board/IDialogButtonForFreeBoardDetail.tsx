"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface IDialogButtonForFreeBoardDetailProps {
  title: string;
  content: string;
  createdAt: string;
}

const IDialogButtonForFreeBoardDetail: React.FC<IDialogButtonForFreeBoardDetailProps> = ({
  title,
  content,
  createdAt,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="text-blue-600 hover:text-blue-800 hover:underline text-left focus:outline-none"
      >
        <span className="line-clamp-1">
          {title}
        </span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-white max-w-4xl w-[90vw] h-[90vh] p-0 rounded-xl shadow-xl flex flex-col overflow-hidden">
          <DialogHeader className="px-8 py-6 border-b bg-white sticky top-0 z-10">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {title}
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  작성일: {new Date(createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <DialogClose className="rounded-full p-2 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200">
                <X className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="flex-1 px-8 py-6 overflow-y-auto bg-white">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 
                prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-500 
                prose-img:rounded-lg prose-hr:border-gray-200"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IDialogButtonForFreeBoardDetail;