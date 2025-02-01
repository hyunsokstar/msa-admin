import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, FolderPlus } from "lucide-react";
import { IDialogButtonForEditNoteCollection } from '@/components/dialog/IDialogButtonForEditNoteCollection';
import { IDialogButtonForDeleteNoteCollection } from '@/components/dialog/IDialogButtonForDeleteNoteCollection';
import { NoteCollection, PaginatedResponse } from '@/types/typeForNoteCollections';
import CommonButton from '@/components/common/CommonButton';
import Pagination from 'rc-pagination';

interface ITableForNoteCollectionListProps {
  data?: PaginatedResponse<NoteCollection[]>;
  isLoading: boolean;
  onCollectionSelect?: (id: string) => void;
  selectedCollectionId?: string | null;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

const LoadingSkeleton = () => {
  return Array(5).fill(0).map((_, idx) => (
    <TableRow key={idx} className="animate-in fade-in-50 slide-in-from-top-2">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <div className="flex gap-2 justify-center">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  ));
};

const EmptyState = () => (
  <TableRow>
    <TableCell colSpan={4}>
      <div className="h-[400px] flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 shadow-inner">
          <FolderPlus className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          노트 컬렉션이 없습니다
        </h3>
        <p className="text-sm text-gray-500 max-w-[260px]">
          새로운 노트 컬렉션을 추가해서 노트를 관리해보세요
        </p>
      </div>
    </TableCell>
  </TableRow>
);

export const ITableForNoteCollectionList: React.FC<ITableForNoteCollectionListProps> = ({
  data,
  isLoading,
  onCollectionSelect,
  selectedCollectionId,
  currentPage,
  onPageChange,
  pageSize
}) => {
  return (
    <div className="space-y-4">
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
              <TableHead className="w-[250px] text-slate-700">Writer</TableHead>
              <TableHead className="w-[400px] text-slate-700">Name</TableHead>
              <TableHead className="w-[150px] text-slate-700">Created</TableHead>
              <TableHead className="w-[150px] text-center text-slate-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <LoadingSkeleton />
            ) : data?.data.length === 0 ? (
              <EmptyState />
            ) : (
              data?.data.map((collection) => (
                <TableRow
                  key={collection.id}
                  className={`group hover:bg-blue-50/30 cursor-pointer transition-colors duration-200
                    ${selectedCollectionId === String(collection.id) ? 'bg-blue-50/50' : ''}`}
                  onClick={() => onCollectionSelect?.(String(collection.id))}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={collection.writer?.profile_image_url ?? undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
                          {collection.writer?.full_name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-slate-900">
                          {collection.writer?.full_name || 'Anonymous'}
                        </div>
                        <div className="text-sm text-slate-500">Writer</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                          {collection.name}
                        </span>
                        <CommonButton
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 py-1 text-xs font-normal bg-white hover:bg-gray-50"
                        >
                          {collection.note_count || 0} notes
                        </CommonButton>
                      </div>
                      {selectedCollectionId === String(collection.id) && (
                        <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <time className="text-sm text-slate-600">
                      {new Date(collection.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      <IDialogButtonForEditNoteCollection
                        collectionId={collection.id}
                        initialName={collection.name}
                        writerEmail={collection.writer?.email || ''}
                      />
                      <IDialogButtonForDeleteNoteCollection
                        collectionId={collection.id}
                        collectionName={collection.name}
                        writerEmail={collection.writer?.email || ''}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!isLoading && data && data.data && data.data.length > 0 && (
        <div className="flex justify-between items-center bg-slate-50/70 px-4 py-3 border rounded-md">
          <div className="text-sm text-slate-600">
            Total <span className="font-medium text-slate-900">{data?.pagination.total || 0}</span> collections
          </div>
          <Pagination
            current={currentPage}
            total={data?.pagination.total || 0}
            pageSize={pageSize}
            onChange={onPageChange}
            className="rc-pagination-modern"
          />
        </div>
      )}
    </div>
  );
};