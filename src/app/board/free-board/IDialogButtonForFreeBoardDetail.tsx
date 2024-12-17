"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  const toggleDialog = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Button onClick={toggleDialog} variant="link" className="text-blue-500 hover:underline">
        {title}
      </Button>
      <Dialog open={isOpen} onOpenChange={toggleDialog}>
        <DialogContent 
          className="bg-white max-w-2xl w-full h-auto p-6 rounded-lg shadow-lg"
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
            <DialogClose onClick={toggleDialog} />
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-700">{content}</p>
            <p className="text-sm text-gray-500">작성일: {new Date(createdAt).toLocaleDateString()}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IDialogButtonForFreeBoardDetail;