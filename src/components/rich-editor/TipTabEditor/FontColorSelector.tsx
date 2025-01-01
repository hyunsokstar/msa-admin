// components/FontColorSelector.tsx
import React from 'react';
import { Editor } from '@tiptap/react';
import { Check } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface FontColorSelectorProps {
  editor: Editor;
}

const colors = [
  { name: '검정', value: '#000000' },
  { name: '회색', value: '#4B5563' },
  { name: '빨강', value: '#EF4444' },
  { name: '주황', value: '#F97316' },
  { name: '황갈색', value: '#F59E0B' },
  { name: '노랑', value: '#EAB308' },
  { name: '라임', value: '#84CC16' },
  { name: '초록', value: '#22C55E' },
  { name: '에메랄드', value: '#10B981' },
  { name: '청록', value: '#14B8A6' },
  { name: '시안', value: '#06B6D4' },
  { name: '하늘', value: '#0EA5E9' },
  { name: '파랑', value: '#3B82F6' },
  { name: '남색', value: '#6366F1' },
  { name: '보라', value: '#8B5CF6' },
  { name: '자주', value: '#A855F7' },
  { name: '푸시아', value: '#D946EF' },
  { name: '분홍', value: '#EC4899' },
  { name: '장미', value: '#F43F5E' },
  { name: '흰색', value: '#FFFFFF' },
];

const FontColorSelector = ({ editor }: FontColorSelectorProps) => {
  const currentColor = editor.getAttributes('textStyle').color || '#000000';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="h-8 w-8 p-0 relative border-2"
          style={{ backgroundColor: currentColor }}
        >
          <span className="sr-only">글자 색상 선택</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-1 p-2">
          {colors.map((color) => (
            <button
              key={color.value}
              className="relative h-8 w-8 rounded cursor-pointer border border-gray-200 hover:border-gray-400"
              style={{ backgroundColor: color.value }}
              onClick={() => {
                editor.chain().focus().setColor(color.value).run();
              }}
              title={color.name}
            >
              {currentColor === color.value && (
                <Check 
                  className="absolute inset-0 m-auto" 
                  color={color.value === '#FFFFFF' ? '#000000' : '#FFFFFF'} 
                  size={16} 
                />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FontColorSelector;