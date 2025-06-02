// src/components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionLink {
  id: string;
  label: string;
}

// page.tsx 순서 그대로, “C 기본 (1)”과 “C 기본 (2)”를 개별 아이템으로 나열
const sidebarOrder: SectionLink[] = [
  { id: 'introduction',         label: '서론' },
  { id: 'technical-issues',     label: '기술적 문제' },
  { id: 'next-gen-arch',        label: '차세대 아키텍처' },
  { id: 'note-c-basics',        label: 'C 기본 (1)' },
  { id: 'note-c-structs',       label: 'C 기본 (2)' },
  { id: 'reference-materials',  label: '참고 자료' },
  { id: 'reference-lectures',   label: '강의 자료' },
  { id: 'fullstack-cti',        label: 'for fullstack' },
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

    sidebarOrder.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div
      className="
        hidden lg:flex flex-col fixed top-1/2 right-8 transform -translate-y-1/2
        space-y-1 z-50 w-max px-1 py-1 bg-white/60 backdrop-blur-sm
        rounded-lg shadow-lg border border-white/20
      "
    >
      {sidebarOrder.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={cn(
              'relative w-full text-left px-2 py-1 text-xs rounded-md transition-all duration-150 flex items-center justify-between group',
              isActive
                ? 'bg-gradient-to-r from-blue-200 to-purple-200 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
            )}
          >
            <span className="truncate">{sec.label}</span>
            <ChevronRight
              className={cn(
                'w-3 h-3 transition-transform',
                isActive
                  ? 'opacity-100 rotate-90'
                  : 'opacity-0 group-hover:opacity-40 group-hover:translate-x-0.5'
              )}
            />
            <div
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-gradient-to-b from-blue-200 to-purple-200 rounded-r-full transition-all',
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
