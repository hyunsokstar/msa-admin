// components/PageNavigationForNoteContentList.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PageNavigationProps {
  currentPage: number;
  pages: number[];
  noteId: string;
}

const PageNavigationForNoteContentList = ({ currentPage, pages, noteId }: PageNavigationProps) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/note-admin/notes/${noteId}/note-contents?pageNum=${page}`);
  };

  return (
    <div className="flex flex-wrap gap-1.5 p-4 border-b">
      {pages.map((page) => (
        <Button
          key={page}
          type="button"
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => handlePageChange(page)}
          size="sm"
          className={`min-w-[32px] transition-all duration-200 ${
            currentPage === page 
              ? "bg-blue-50 text-blue-600 border-2 border-blue-200 font-medium hover:bg-blue-100 hover:border-blue-300" 
              : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
          }`}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Page ${page}`}
          role="button"
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default PageNavigationForNoteContentList;