"use client";

import React, { useState } from "react";
import { useApiForGetFreeBoardList } from "@/hook/useApiForGetFreeBoardList";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import IDialogButtonForFreeBoardDetail from "./IDialogButtonForFreeBoardDetail";

const FreeBoard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useApiForGetFreeBoardList({
    page: currentPage,
    limit,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Free Board</h1>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">번호</TableHead>
              <TableHead>제목</TableHead>
              <TableHead className="w-[200px]">작성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.id}</TableCell>
                <TableCell>
                  <IDialogButtonForFreeBoardDetail
                    title={post.title}
                    content={post.content}
                    createdAt={post.created_at}
                  />
                </TableCell>
                <TableCell>
                  {new Date(post.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              if (page === currentPage - 3 || page === currentPage + 3) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink>...</PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default FreeBoard;
