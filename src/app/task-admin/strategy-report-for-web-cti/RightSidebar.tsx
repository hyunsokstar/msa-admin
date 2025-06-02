// components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionLink {
  id: string;
  label: string;
}

// 실제 페이지 섹션 id 순서에 맞춰서 정의하세요
const sidebarOrder: SectionLink[] = [
  { id: 'introduction', label: '서론' },
  { id: 'technical-issues', label: '기술적 문제' },
  { id: 'next-gen-arch', label: '차세대 아키텍처' },
  { id: 'note-c-basics', label: 'C 기본 (1)' },
  { id: 'note-c-structs', label: 'C 기본 (2)' },
  { id: 'reference-materials', label: '참고 자료' },
  { id: 'reference-lectures', label: '강의 자료' },
  { id: 'fullstack-cti', label: 'Fullstack CTI' },
  { id: 'backend-tech-table', label: '백엔드 기술 목록' },
  { id: 'frontend-tech-table', label: '프론트엔드 기술 목록' },
  // { id: 'productivity-strategies', label: '생산성 전략' },  // 필요 없으면 주석
];

const RightSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  // 스크롤 위치에 따라 활성화 섹션 업데이트
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = '';
      sidebarOrder.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el) {
          const offsetTop = el.offsetTop;
          if (scrollY + 120 >= offsetTop) {
            current = sec.id;
          }
        }
      });
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <aside
      className="
        hidden lg:flex flex-col fixed top-1/2 right-8 transform -translate-y-1/2
        space-y-2 z-50 w-48 px-2 py-3 bg-white/90 backdrop-blur-md
        rounded-xl shadow-lg border border-white/30
      "
    >
      {/* 사이드바 제목 */}
      <div className="text-center mb-2">
        <h3 className="text-sm font-semibold text-teal-600">목차</h3>
        <div className="w-8 h-0.5 bg-teal-300 mx-auto rounded-full mt-1"></div>
      </div>

      {sidebarOrder.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={cn(
              'relative w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-150 flex items-center justify-between group',
              isActive
                ? 'bg-gradient-to-r from-teal-200 to-pink-200 text-teal-800 shadow-inner'
                : 'text-teal-600 hover:bg-teal-50 hover:text-teal-700'
            )}
          >
            <span className="truncate">{sec.label}</span>
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform',
                isActive
                  ? 'opacity-100 rotate-90 text-teal-500'
                  : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-0.5'
              )}
            />
            <div
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-teal-400 to-pink-400 rounded-r-full transition-all',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              )}
            />
          </button>
        );
      })}
    </aside>
  );
};

export default RightSidebar;
