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
import Pagination from "rc-pagination";
import IDialogButtonForFreeBoardDetail from "./IDialogButtonForFreeBoardDetail";
import IDialogButtonForCreateBoardPosting from "./IDialogButtonForCreateBoardPosting";
import "rc-pagination/assets/index.css";

const FreeBoard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useApiForGetFreeBoardList({
    page: currentPage,
    limit,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const totalItems = data?.totalCount || 0;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Free Board2</h1>
        <IDialogButtonForCreateBoardPosting />
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[100px] text-gray-600">번호</TableHead>
              <TableHead className="text-gray-600">제목</TableHead>
              <TableHead className="w-[200px] text-gray-600">작성일</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.items.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium text-gray-600">{post.id}</TableCell>
                <TableCell>
                  <IDialogButtonForFreeBoardDetail
                    title={post.title}
                    content={post.content}
                    createdAt={post.created_at}
                  />
                </TableCell>
                <TableCell className="text-gray-500">
                  {new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={limit}
          onChange={setCurrentPage}
          className="shadow-sm rounded-md"
        />
      </div>
    </div>
  );
};

export default FreeBoard;