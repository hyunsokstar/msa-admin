// src/app/note-admin/notes/[id]/note-contents/page.tsx
"use client";

import React, { useState } from 'react';
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { NoteContent } from '@/types/notes/typeForNoteContents';
import { useNoteContents } from '@/hook/notes/useApiForNoteContents';

interface Props {
 params: Promise<{
   id: string;
 }>
}

const NoteContentsForNotePage = ({ params }: Props) => {
 // params를 Promise에서 unwrap
 const resolvedParams = React.use(params);
 const noteId = resolvedParams.id;

 const { data, isLoading, error } = useNoteContents(noteId);

 if (isLoading) return <div>Loading...</div>;
 if (error) return <div>Error occurred</div>;

 return (
   <div className="p-4">
     <div className="flex justify-between items-center mb-4">
       <h1 className="text-2xl font-bold">Note Contents</h1>
       {/* TODO: Add Create Content Button */}
     </div>

     <div className="rounded-md border">
       <Table>
         <TableHeader>
           <TableRow>
             <TableHead className="w-[100px]">Page</TableHead>
             <TableHead>Title</TableHead>
             <TableHead>Content</TableHead>
             <TableHead>Order</TableHead>
             <TableHead>Created At</TableHead>
             {/* <TableHead className="w-[100px] text-right">Actions</TableHead> */}
           </TableRow>
         </TableHeader>
         <TableBody>
           {data?.data.map((content: NoteContent) => (
             <TableRow key={content.id}>
               <TableCell>{content.page}</TableCell>
               <TableCell>{content.title}</TableCell>
               <TableCell>{content.content}</TableCell>
               <TableCell>{content.order}</TableCell>
               <TableCell>
                 {new Date(content.created_at).toLocaleString()}
               </TableCell>
               {/* <TableCell className="text-right space-x-2">
               </TableCell> */}
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </div>
   </div>
 );
};

export default NoteContentsForNotePage;