// src/components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionLink {
  id: string;
  label: string;
}

type SidebarItem = 
  | { type: 'item'; id: string; label: string }
  | { type: 'group'; label: string; items: SectionLink[] };

// “C 기본” 그룹 내부 섹션 (4번, 5번)
const cBasics: SectionLink[] = [
  { id: 'note-c-basics', label: 'C 기본 (1)' },
  { id: 'note-c-structs', label: 'C 기본 (2)' },
];

// 전체 사이드바 순서를 page.tsx 순서에 맞춰 정의
const sidebarOrder: SidebarItem[] = [
  { type: 'item', id: 'introduction',        label: '서론' },
  { type: 'item', id: 'technical-issues',    label: '기술적 문제' },
  { type: 'item', id: 'next-gen-arch',       label: '차세대 아키텍처' },
  { type: 'group', label: 'C 기본', items: cBasics },
  { type: 'item', id: 'reference-materials', label: '참고 자료' },
  { type: 'item', id: 'reference-lectures',  label: '강의 자료' },
  { type: 'item', id: 'fullstack-cti',       label: 'for fullstack' },
  { type: 'item', id: 'productivity-strategies', label: '생산성 전략' },
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
            // “C 기본” 그룹 내부 섹션이 보이면 반드시 그룹을 연다
            if (cBasics.some((item) => item.id === id)) {
              setIsCBasicsOpen(true);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -35% 0px' }
    );

    // page.tsx에 정의된 모든 섹션 아이디를 관찰
    sidebarOrder.forEach((entry) => {
      if (entry.type === 'item') {
        const el = document.getElementById(entry.id);
        if (el) observer.observe(el);
      } else if (entry.type === 'group') {
        entry.items.forEach((sub) => {
          const el = document.getElementById(sub.id);
          if (el) observer.observe(el);
        });
      }
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
      {sidebarOrder.map((entry, idx) => {
        if (entry.type === 'item') {
          const isActive = activeSection === entry.id;
          return (
            <button
              key={entry.id}
              onClick={() => {
                scrollToSection(entry.id);
                setActiveSection(entry.id);
              }}
              className={cn(
                'relative w-full text-left px-2 py-1 text-xs rounded-md transition-all duration-150 flex items-center justify-between group',
                isActive
                  ? 'bg-gradient-to-r from-blue-200 to-purple-200 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              )}
            >
              <span className="truncate">{entry.label}</span>
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
        } else {
          // entry.type === 'group'
          const groupActive = cBasics.some((sub) => sub.id === activeSection);
          return (
            <details
              key={`group-${idx}`}
              className="group relative w-full"
              open={isCBasicsOpen}
              onToggle={(e) => setIsCBasicsOpen((e.target as HTMLDetailsElement).open)}
            >
              <summary
                className={cn(
                  'flex items-center justify-between cursor-pointer px-2 py-1 text-xs rounded-md transition-all duration-150',
                  groupActive
                    ? 'bg-gradient-to-r from-blue-200 to-purple-200 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                )}
                onClick={() => setIsCBasicsOpen(!isCBasicsOpen)}
              >
                <span className="truncate">{entry.label}</span>
                <ChevronDown
                  className={cn(
                    'w-3 h-3 transition-transform',
                    isCBasicsOpen ? 'opacity-100 rotate-180' : 'opacity-50'
                  )}
                />
                <div
                  className={cn(
                    'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-gradient-to-b from-blue-200 to-purple-200 rounded-r-full transition-all',
                    groupActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  )}
                />
              </summary>

              <div className="mt-1 pl-3 space-y-0.5">
                {entry.items.map((sub) => {
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
          );
        }
      })}
    </div>
  );
};

export default RightSidebar;
