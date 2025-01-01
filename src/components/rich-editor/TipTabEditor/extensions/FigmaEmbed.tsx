// extensions/FigmaEmbed.tsx
import React, { useState } from 'react';
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';

const FigmaPreviewComponent = ({ node }: { node: any }) => {
 const [showEmbed, setShowEmbed] = useState(false);
 const { src } = node.attrs;
 
 const fileId = src.split('/').pop();
 const previewUrl = `https://www.figma.com/file/${fileId}`;

 return (
   <NodeViewWrapper>
     <div className="border rounded-lg overflow-hidden my-4">
       {!showEmbed ? (
         <div className="relative">
           <div className="aspect-video bg-gray-100 flex items-center justify-center">
             <button
               type='button'
               onClick={() => setShowEmbed(true)}
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
             >
               Figma 파일 보기
             </button>
           </div>
           <a 
             href={previewUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="absolute bottom-2 right-2 text-sm text-blue-500 hover:text-blue-600 bg-white px-2 py-1 rounded shadow"
           >
             Figma에서 열기
           </a>
         </div>
       ) : (
         <div className="relative">
           <iframe
             width="100%"
             height="600"
             src={`https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(src)}`}
             allowFullScreen
             className="border-0"
           />
           <button
           type='button'
             onClick={() => setShowEmbed(false)}
             className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
           >
             <span className="sr-only">닫기</span>
             ✕
           </button>
         </div>
       )}
     </div>
   </NodeViewWrapper>
 );
};

const FigmaEmbed = Node.create({
 name: 'figmaEmbed',
 group: 'block',
 atom: true,

 addAttributes() {
   return {
     src: {
       default: null,
     }
   };
 },

 parseHTML() {
   return [
     {
       tag: 'iframe[src*="figma.com"]',
       getAttrs: (node: any) => ({
         src: node.getAttribute('src')
       })
     }
   ];
 },

 renderHTML({ HTMLAttributes }) {
   const figmaUrl = HTMLAttributes.src;
   return [
     'iframe',
     {
       src: `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(figmaUrl)}`,
       width: '100%',
       height: '600',
       allowfullscreen: 'true',
       style: 'border: none;',
       class: 'figma-embed'
     }
   ];
 },

 addNodeView() {
   return ReactNodeViewRenderer(FigmaPreviewComponent);
 },
});

export { FigmaEmbed, FigmaPreviewComponent };