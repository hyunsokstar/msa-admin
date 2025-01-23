// DevSpecTree.tsx
import React, { useState, useEffect } from 'react';
import { FolderClosed, Play, CircleDot, ChevronRight, ChevronDown, Plus, Minus } from 'lucide-react';
import { PersonalDevSpec } from '@/types/typeForProfile';
import CommonButton from '@/components/common/CommonButton';
import { DialogButtonForEditDevSpecs } from './DialogButtonForEditDevSpecs';
import { DialogButtonForCreateDevSpecForProfilePage } from './DialogButtonForCreateDevSpecForProfilePage';
import { useUserStore } from '@/store/useUserStore';

interface DevSpecTreeProps {
 items: PersonalDevSpec[];
}

const DevSpecTree = ({ items }: DevSpecTreeProps) => {
 const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
 const [isAllExpanded, setIsAllExpanded] = useState(true);
 const user = useUserStore(state => state.user);

 useEffect(() => {
   if (isAllExpanded) {
     const allNodes = new Set<string>();
     const collectNodeIds = (nodes: PersonalDevSpec[]) => {
       nodes.forEach(node => {
         if (node.children?.length) {
           allNodes.add(String(node.id));
           collectNodeIds(node.children);
         }
       });
     };
     collectNodeIds(items);
     setExpandedNodes(allNodes);
   } else {
     setExpandedNodes(new Set());
   }
 }, [items, isAllExpanded]);

 const handleToggle = (nodeId: string) => {
   setExpandedNodes(prev => {
     const next = new Set(prev);
     if (next.has(nodeId)) {
       next.delete(nodeId);
     } else {
       next.add(nodeId);
     }
     return next;
   });
 };

 const handleToggleAll = () => {
   setIsAllExpanded(!isAllExpanded);
 };

 const renderNode = (node: PersonalDevSpec, level: number = 0) => {
   const hasChildren = (node.children?.length ?? 0) > 0;
   const isExpanded = expandedNodes.has(String(node.id));
   const paddingLeft = `${level * 24}px`;
   const isFolder = hasChildren || node.is_folder;

   return (
     <div key={node.id} className="my-2 group">
       <div className="flex items-center justify-between hover:bg-gray-50 rounded">
         <div 
           className="flex items-center gap-2 cursor-pointer p-1 flex-1"
           style={{ paddingLeft }}
           onClick={() => handleToggle(String(node.id))}
         >
           {hasChildren && (
             isExpanded ? 
               <ChevronDown className="h-4 w-4 text-gray-500" /> :
               <ChevronRight className="h-4 w-4 text-gray-500" />
           )}
           {isFolder ? (
             <FolderClosed className="h-4 w-4 text-yellow-500" />
           ) : (
             node.status === 'active' ? (
               <Play className="h-4 w-4 text-green-500 fill-green-500" />
             ) : (
               <CircleDot className="h-4 w-4 text-gray-500" />
             )
           )}
           <span className="text-sm font-medium">{node.name}</span>
         </div>
         {user && (
           <div className="flex items-center gap-1 pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
             {isFolder && (
               <DialogButtonForCreateDevSpecForProfilePage 
                 parentId={String(node.id)}
                 parentName={node.name}
               />
             )}
             <DialogButtonForEditDevSpecs spec={node} />
           </div>
         )}
       </div>
       
       {hasChildren && isExpanded && (
         <div className="border-l border-gray-200 ml-5">
           {(node.children ?? []).map(child => renderNode(child, level + 1))}
         </div>
       )}
     </div>
   );
 };

 return (
   <div>
     <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
       <span className="text-sm font-medium text-gray-700">개발 스펙</span>
       <div className="flex items-center gap-3">
         {user && (
           <DialogButtonForCreateDevSpecForProfilePage 
             parentId="0"
             parentName="Root"
           />
         )}
         <CommonButton
           variant="outline"
           size="icon"
           onClick={handleToggleAll}
           className="h-8 w-8 min-w-[32px] bg-white"
         >
           {isAllExpanded ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
         </CommonButton>
       </div>
     </div>
     <div className="pt-2">
       {items.map(item => renderNode(item))}
     </div>
   </div>
 );
};

export default DevSpecTree;

