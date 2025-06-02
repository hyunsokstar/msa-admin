// src/components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // 선택적으로 className join 유틸 사용
import { ChevronRight } from 'lucide-react';
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
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -35% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:flex flex-col fixed top-1/2 right-8 transform -translate-y-1/2 space-y-1 z-50 w-max px-2 py-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => {
              const el = document.getElementById(sec.id);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className={cn(
              'relative w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 flex items-center justify-between group',
              isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <span className="truncate">{sec.label}</span>
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform',
                isActive ? 'opacity-100 rotate-90' : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-1'
              )}
            />
            <div
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full transition-all',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default RightSidebar;
