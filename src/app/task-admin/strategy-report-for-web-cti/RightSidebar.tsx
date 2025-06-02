// src/components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // className 병합 유틸 (필요 없으면 템플릿 문자열로 교체 가능)

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
  { id: 'introduction', label: '서론' },                     // 1
  { id: 'technical-issues', label: '기술적 문제' },          // 2
  { id: 'next-gen-arch', label: '차세대 아키텍처' },         // 3
  // “C 기본” 그룹(4,5)은 따로 분리
  { id: 'reference-materials', label: '참고 자료' },         // 6
  { id: 'reference-lectures', label: '강의 자료' },          // 7
  { id: 'fullstack-cti', label: 'for fullstack' },           // 8
  { id: 'productivity-strategies', label: '생산성 전략' },    // 9
];

const RightSidebar: React.FC = () => {
  // 현재 화면에 보이는 섹션 ID
  const [activeSection, setActiveSection] = useState<string>('');
  // “C 기본” 그룹 아코디언 열림 여부
  const [isCBasicsOpen, setIsCBasicsOpen] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);

            // 만약 보이는 섹션이 “C 기본 (1)” 또는 “C 기본 (2)”라면 자동으로 그룹을 연다
            if (cBasics.some((item) => item.id === id)) {
              setIsCBasicsOpen(true);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -35% 0px' }
    );

    // 페이지에 선언된 모든 섹션을 관찰
    [...otherSections, ...cBasics].forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 부드럽게 해당 섹션으로 스크롤 이동
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hidden lg:flex flex-col fixed top-1/2 right-8 transform -translate-y-1/2 space-y-1 z-50 w-max px-2 py-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
      {/* ─────────────[1] “서론”, “기술적 문제”, “차세대 아키텍처” 등 일반 섹션 ───────────── */}
      {otherSections.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => {
              scrollToSection(sec.id);
              setActiveSection(sec.id); // 클릭 시 즉시 강조
            }}
            className={cn(
              'relative w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 flex items-center justify-between group',
              isActive
                ? 'bg-gradient-to-r from-blue-300 to-purple-300 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            <span className="truncate">{sec.label}</span>
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform',
                isActive
                  ? 'opacity-100 rotate-90'
                  : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-1'
              )}
            />
            <div
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-blue-300 to-purple-300 rounded-r-full transition-all',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              )}
            />
          </button>
        );
      })}

      {/* ─────────────[2] “C 기본” 아코디언(Disclosure) ───────────── */}
      <details
        className="group relative w-full"
        open={isCBasicsOpen}
        onToggle={(e) => setIsCBasicsOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary
          className={cn(
            'flex items-center justify-between cursor-pointer px-3 py-2 text-sm rounded-md transition-all duration-200',
            cBasics.some((item) => item.id === activeSection)
              ? 'bg-gradient-to-r from-blue-300 to-purple-300 text-white shadow'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          )}
          onClick={() => setIsCBasicsOpen(!isCBasicsOpen)}
        >
          <span className="truncate">C 기본</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              isCBasicsOpen ? 'opacity-100 rotate-180' : 'opacity-50'
            )}
          />
          <div
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-blue-300 to-purple-300 rounded-r-full transition-all',
              cBasics.some((item) => item.id === activeSection)
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            )}
          />
        </summary>

        {/* sub-menu: “C 기본 (1)”, “C 기본 (2)” */}
        <div className="mt-1 pl-4 space-y-1">
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
                  'relative w-full text-left px-3 py-1 text-sm rounded-md transition-all duration-200 flex items-center justify-between group',
                  isActive
                    ? 'bg-gradient-to-r from-blue-300 to-purple-300 text-white shadow'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
              >
                <span className="truncate">{sub.label}</span>
                <ChevronRight
                  className={cn(
                    'w-4 h-4 transition-transform',
                    isActive
                      ? 'opacity-100 rotate-90'
                      : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-1'
                  )}
                />
                <div
                  className={cn(
                    'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-blue-300 to-purple-300 rounded-r-full transition-all',
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  )}
                />
              </button>
            );
          })}
        </div>
      </details>

      {/* ─────────────[3] 나머지 섹션(otherSections) 처리를 이미 했으므로 생략 ───────────── */}
    </div>
  );
};

export default RightSidebar;
