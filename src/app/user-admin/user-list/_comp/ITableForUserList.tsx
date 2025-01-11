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
import { NoteCollection } from '@/types/typeForNoteCollections';
import { IDialogButtonForEditNoteCollection } from '@/components/dialog/IDialogButtonForEditNoteCollection';
import { IDialogButtonForDeleteNoteCollection } from '@/components/dialog/IDialogButtonForDeleteNoteCollection';
import Link from 'next/link';

interface ITableForNoteCollectionListProps {
  data?: {
    data: NoteCollection[];
  };
  isLoading: boolean;
}

const LoadingSkeleton = () => {
  return Array(5).fill(0).map((_, idx) => (
    <TableRow key={idx} className="animate-in fade-in-50 slide-in-from-top-2">
      <TableCell className="text-center">
        <div className="flex items-center gap-3 justify-center">
          <div className="relative">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px] bg-gradient-to-r from-slate-200 to-slate-100" />
            <Skeleton className="h-3 w-[80px] bg-gradient-to-r from-slate-100 to-slate-50" />
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
          <Skeleton className="h-3 w-[180px] bg-gradient-to-r from-slate-100 to-slate-50" />
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-[150px] bg-gradient-to-r from-slate-200 to-slate-100" />
          <Skeleton className="h-3 w-[100px] bg-gradient-to-r from-slate-100 to-slate-50" />
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="inline-flex gap-2 justify-center">
          <Skeleton className="h-8 w-8 rounded-md bg-gradient-to-r from-slate-200 to-slate-100" />
          <Skeleton className="h-8 w-8 rounded-md bg-gradient-to-r from-slate-200 to-slate-100" />
        </div>
      </TableCell>
    </TableRow>
  ));
};

export const ITableForNoteCollectionList: React.FC<ITableForNoteCollectionListProps> = ({
  data,
  isLoading
}) => {
  return (
    <div className="bg-white">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 dark:bg-slate-800/50">
            <TableHead className="w-[250px] text-center">Writer</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="w-[180px] text-center">Created At</TableHead>
            <TableHead className="w-[120px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            data?.data.map((collection: NoteCollection) => (
              <TableRow
                key={collection.id}
                className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors duration-200"
              >
                <TableCell className="text-center">
                  <div className="flex items-center gap-3 justify-center">
                    <Avatar className="border-2 border-white shadow-sm">
                      <AvatarImage src={collection.writer?.profile_image_url || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600">
                        {collection.writer?.full_name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center">
                      <span className="font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                        {collection.writer?.full_name || 'Anonymous'}
                      </span>
                      <span className="text-sm text-slate-500">Writer</span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <Link
                    href={`/note-admin/note-collection-list/${collection.id}/notes`}
                    className="font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {collection.name}
                  </Link>
                </TableCell>

                <TableCell className="text-center">
                  <time className="text-slate-500 text-sm">
                    {new Date(collection.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                </TableCell>

                <TableCell className="text-center py-4">
                  <span className="inline-flex gap-2 justify-center">
                    <IDialogButtonForEditNoteCollection
                      collectionId={collection.id}
                      initialName={collection.name}
                    />
                    <IDialogButtonForDeleteNoteCollection
                      collectionId={collection.id}
                      collectionName={collection.name}
                    />
                  </span>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};