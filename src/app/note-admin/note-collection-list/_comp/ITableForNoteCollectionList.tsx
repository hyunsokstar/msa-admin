"use client";

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
import { Check } from "lucide-react";
import { IDialogButtonForEditNoteCollection } from '@/components/dialog/IDialogButtonForEditNoteCollection';
import { IDialogButtonForDeleteNoteCollection } from '@/components/dialog/IDialogButtonForDeleteNoteCollection';
import { NoteCollection, PaginatedResponse } from '@/types/typeForNoteCollections';

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
        <div className="flex gap-2 justify-end">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </TableCell>
    </TableRow>
  ));
};

interface ITableForNoteCollectionListProps {
  data?: PaginatedResponse<NoteCollection[]>;
  isLoading: boolean;
  onCollectionSelect?: (id: string) => void;
  selectedCollectionId?: string | null;
}

export const ITableForNoteCollectionList: React.FC<ITableForNoteCollectionListProps> = ({
  data,
  isLoading,
  onCollectionSelect,
  selectedCollectionId
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-slate-50/50 hover:bg-slate-50/50">
          <TableHead className="w-[300px]">Writer</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="w-[180px]">Created</TableHead>
          <TableHead className="w-[100px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          data?.data.map((collection) => (
            <TableRow
              key={collection.id}
              className={`group hover:bg-blue-50/30 cursor-pointer
                ${selectedCollectionId === String(collection.id) ? 'bg-blue-50/50' : ''}`}
              onClick={() => onCollectionSelect?.(String(collection.id))}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="border-2 border-white shadow-sm">
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
                  <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                    {collection.name}
                  </span>
                  {selectedCollectionId === String(collection.id) && (
                    <div className="h-6 w-6 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <time className="text-sm text-slate-500">
                  {new Date(collection.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
              </TableCell>
              <TableCell>
                <div className="flex gap-2 justify-end">
                  <IDialogButtonForEditNoteCollection
                    collectionId={collection.id}
                    initialName={collection.name}
                  />
                  <IDialogButtonForDeleteNoteCollection
                    collectionId={collection.id}
                    collectionName={collection.name}
                  />
                </div>
              </TableCell>  
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};