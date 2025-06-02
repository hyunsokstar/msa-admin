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
  { id: 'next-gen-arch', label: '차세대 아키텍처' },
  { id: 'note-c-basics', label: 'C 기본 카드' },
  { id: 'note-c-structs', label: 'C 구조체 카드' },
  { id: 'reference-materials', label: '참고 자료' },
  { id: 'reference-lectures', label: '강의 자료' },
  { id: 'fullstack-cti', label: 'Full Stack CTI' },
  { id: 'productivity-strategies', label: '생산성 전략' },
];

const RightSidebar: React.FC = () => {
  return (
    // lg 이상 화면에서만 보이도록, 화면 높이의 절반쯤에 고정
    <div className="hidden lg:block fixed top-1/4 right-8 space-y-2 z-50">
      {sections.map((sec) => (
        <Button
          key={sec.id}
          variant="ghost"
          size="sm"
          className="px-3 py-1 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
