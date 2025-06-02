// src/components/RightSidebar.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface SectionLink {
  id: string;
  label: string;
}

const sections: SectionLink[] = [
  { id: 'introduction', label: '서론' },
  { id: 'technical-issues', label: '기술적 문제' },
  { id: 'note-c-basics', label: 'C 기본 (1)' },
  { id: 'note-c-structs', label: 'C 기본 (2)' },
  { id: 'reference-materials', label: '참고 자료' },
  { id: 'reference-lectures', label: '강의 자료' },
  { id: 'fullstack-cti', label: 'for fullstack' },
  { id: 'productivity-strategies', label: '생산성 전략' },
];

const RightSidebar: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col fixed top-1/2 right-8 transform -translate-y-1/2 space-y-2 z-50 w-max">
      {sections.map((sec) => (
        <Button
          key={sec.id}
          variant="ghost"
          size="sm"
          className="w-full justify-start px-3 py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-sm"
          onClick={() => {
            const el = document.getElementById(sec.id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          {sec.label}
        </Button>
      ))}
    </div>
  );
};

export default RightSidebar;
