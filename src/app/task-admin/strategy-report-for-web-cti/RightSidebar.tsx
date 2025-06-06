// components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface SectionLink {
  id: string;
  label: string;
}

const sidebarOrder: SectionLink[] = [
  { id: 'introduction', label: '서론' },
  { id: 'technical-issues', label: '기술적 문제' },
  { id: 'next-gen-arch', label: '차세대 아키텍처' },
  // { id: 'backend-tech-table', label: '백엔드 스킬' },
  // { id: 'frontend-tech-table', label: '프론트 스킬' },
  { id: 'next-project-architecture-report', label: '차세대 아키텍쳐' },
  { id: 'rest-api-vs-graphql', label: 'rest api vs graphql' },
  { id: 'jooq-analysis', label: 'jooq 분석' },
];

const RightSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

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
        hidden lg:flex flex-col fixed
        top-1/2 right-4 transform -translate-y-1/2
        space-y-2 z-50 w-44 px-2 py-3
        bg-white/95 backdrop-blur-lg
        rounded-xl shadow-xl border border-white/30
        transition-all duration-300
        max-h-[80vh] overflow-y-auto
      "
    >
      <div className="text-center mb-3">
        <h3 className="text-sm font-bold text-teal-600 tracking-wide">목차</h3>
        <div className="w-8 h-px bg-teal-300 mx-auto rounded-full mt-1"></div>
      </div>

      {sidebarOrder.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <div key={sec.id} className="space-y-1">
            <button
              onClick={() => scrollToSection(sec.id)}
              className={cn(
                'relative w-full text-left px-3 py-2 text-xs rounded-lg transition-all duration-200 flex items-center justify-between group',
                isActive
                  ? 'bg-gradient-to-r from-teal-200 to-pink-200 text-teal-800 shadow-inner font-bold'
                  : 'text-teal-600 hover:bg-teal-50 hover:text-teal-700'
              )}
            >
              <span className="truncate">{sec.label}</span>
              <ChevronRight
                className={cn(
                  'w-3 h-3 transition-transform',
                  isActive
                    ? 'opacity-100 rotate-90 text-teal-500'
                    : 'opacity-0 group-hover:opacity-50 group-hover:translate-x-0.5'
                )}
              />
              <div
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-r-full transition-all',
                  isActive
                    ? 'bg-gradient-to-b from-teal-400 to-pink-400 opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                )}
              />
            </button>
          </div>
        );
      })}
    </aside>
  );
};

export default RightSidebar;
