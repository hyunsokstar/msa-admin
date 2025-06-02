// src/components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils'; // className 병합 유틸 (없으면 템플릿 문자열로 대체 가능)

interface SectionLink {
  id: string;
  label: string;
}

// “C 기본” 그룹 내부 섹션
const cBasics: SectionLink[] = [
  { id: 'note-c-basics', label: 'C 기본 (1)' },
  { id: 'note-c-structs', label: 'C 기본 (2)' },
];

// 그 외 섹션
const otherSections: SectionLink[] = [
  { id: 'introduction', label: '서론' },
  { id: 'technical-issues', label: '기술적 문제' },
  // “C 기본”은 group으로 따로 분리했으므로 여기선 제외
  { id: 'reference-materials', label: '참고 자료' },
  { id: 'reference-lectures', label: '강의 자료' },
  { id: 'fullstack-cti', label: 'for fullstack' },
  { id: 'productivity-strategies', label: '생산성 전략' },
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

            // “C 기본” 그룹 안의 항목(id)이 보이면 아코디언을 열어둠
            if (cBasics.some((item) => item.id === id)) {
              setIsCBasicsOpen(true);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -35% 0px' }
    );

    // 모든 섹션 요소를 관찰
    [...otherSections, ...cBasics].forEach((section) => {
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
    <div className="hidden lg:flex flex-col fixed top-1/2 right-8 transform -translate-y-1/2 space-y-1 z-50 w-max px-2 py-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
      {/* ─────────────[1] 일반 섹션들(서론, 기술적 문제 등)───────────── */}
      {otherSections.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <button
            key={sec.id}
            onClick={() => {
              scrollToSection(sec.id);
              setActiveSection(sec.id); // ← 클릭 시에도 activeSection 즉시 업데이트
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
                isActive
                  ? 'opacity-100 rotate-90'
                  : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-1'
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

      {/* ─────────────[2] “C 기본” 그룹 아코디언───────────── */}
      <details
        className="group relative w-full"
        open={isCBasicsOpen}
        onToggle={(e) => setIsCBasicsOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary
          className={cn(
            'flex items-center justify-between cursor-pointer px-3 py-2 text-sm rounded-md transition-all duration-200',
            cBasics.some((item) => item.id === activeSection)
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          )}
          onClick={() => setIsCBasicsOpen(!isCBasicsOpen)} // summary 클릭 시 펼치기/접기
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
              'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full transition-all',
              cBasics.some((item) => item.id === activeSection)
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            )}
          />
        </summary>

        <div className="mt-1 pl-4 space-y-1">
          {cBasics.map((sub) => {
            const isActive = activeSection === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  scrollToSection(sub.id);
                  setActiveSection(sub.id); // ← 클릭 시 activeSection 동기화
                }}
                className={cn(
                  'relative w-full text-left px-3 py-1 text-sm rounded-md transition-all duration-200 flex items-center justify-between group',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow'
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
                    'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full transition-all',
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  )}
                />
              </button>
            );
          })}
        </div>
      </details>

      {/* ─────────────[3] 나머지 섹션은 otherSections에서 이미 처리했으므로 생략 ───────────── */}
    </div>
  );
};

export default RightSidebar;
