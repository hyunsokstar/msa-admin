// src/components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionLink {
  id: string;
  label: string;
}

// “C 기본” 그룹 내부 섹션 (4번, 5번)
const cBasics: SectionLink[] = [
  { id: 'note-c-basics', label: 'C 기본 (1)' },
  { id: 'note-c-structs', label: 'C 기본 (2)' },
];

// 그 외 섹션 (1, 2, 3, 6, 7, 8, 9)
const otherSections: SectionLink[] = [
  { id: 'introduction',         label: '서론' },                     // 1
  { id: 'technical-issues',     label: '기술적 문제' },          // 2
  { id: 'next-gen-arch',        label: '차세대 아키텍처' },         // 3
  // “C 기본” 그룹(4,5)은 따로 분리
  { id: 'reference-materials',  label: '참고 자료' },         // 6
  { id: 'reference-lectures',   label: '강의 자료' },          // 7
  { id: 'fullstack-cti',        label: 'for fullstack' },           // 8
  { id: 'productivity-strategies', label: '생산성 전략' },    // 9
];

const RightSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isCBasicsOpen, setIsCBasicsOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);

            if (cBasics.some((item) => item.id === id)) {
              setIsCBasicsOpen(true);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -35% 0px' }
    );

    ;[...otherSections, ...cBasics].forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      {/* ─────────────[1] 일반 섹션들(서론, 기술적 문제, 차세대 아키텍처 등) ───────────── */}
      {otherSections.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => {
              scrollToSection(sec.id);
              setActiveSection(sec.id);
            }}
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

      {/* ─────────────[2] “C 기본” 그룹 아코디언 ───────────── */}
      <details
        className="group relative w-full"
        open={isCBasicsOpen}
        onToggle={(e) => setIsCBasicsOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary
          className={cn(
            'flex items-center justify-between cursor-pointer px-2 py-1 text-xs rounded-md transition-all duration-150',
            cBasics.some((item) => item.id === activeSection)
              ? 'bg-gradient-to-r from-blue-200 to-purple-200 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          )}
          onClick={() => setIsCBasicsOpen(!isCBasicsOpen)}
        >
          <span className="truncate">C 기본</span>
          <ChevronDown
            className={cn(
              'w-3 h-3 transition-transform',
              isCBasicsOpen ? 'opacity-100 rotate-180' : 'opacity-50'
            )}
          />
          <div
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-gradient-to-b from-blue-200 to-purple-200 rounded-r-full transition-all',
              cBasics.some((item) => item.id === activeSection)
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            )}
          />
        </summary>

        <div className="mt-1 pl-3 space-y-0.5">
          {cBasics.map((sub) => {
            const isActive = activeSection === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  scrollToSection(sub.id);
                  setActiveSection(sub.id);
                }}
                className={cn(
                  'relative w-full text-left px-2 py-1 text-xs rounded-md transition-all duration-150 flex items-center justify-between group',
                  isActive
                    ? 'bg-gradient-to-r from-blue-200 to-purple-200 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                )}
              >
                <span className="truncate">{sub.label}</span>
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
      </details>

      {/* ─────────────[3] 나머지 섹션(otherSections) 이미 처리 ───────────── */}
    </div>
  );
};

export default RightSidebar;
