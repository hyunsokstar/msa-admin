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
  { id: 'introduction', label: '프로젝트 구성' },
  { id: 'cti-main-progress', label: 'CTI 메인 현황' },
  { id: 'cti-task-master-progress', label: 'Task Master 현황' },
];

const RightSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  useEffect(() => {
    // Intersection Observer를 사용한 더 정확한 섹션 감지
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // 상단 20%, 하단 60% 여백에서 감지
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 모든 섹션 관찰 시작
    sidebarOrder.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // 페이지 로드 시 초기 활성 섹션 설정
    const setInitialActiveSection = () => {
      const scrollY = window.scrollY;
      let currentSection = 'introduction';

      sidebarOrder.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;

          if (scrollY + 200 >= elementTop) {
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // 초기 설정 및 리사이즈 시 재계산
    setInitialActiveSection();
    window.addEventListener('resize', setInitialActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', setInitialActiveSection);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // 고정 헤더나 여백 고려
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setActiveSection(sectionId);
    }
  };

  return (
    <aside
      className="
        hidden lg:flex flex-col fixed
        top-1/2 right-4 transform -translate-y-1/2
        space-y-2 z-50 w-48 px-3 py-4
        bg-white/95 backdrop-blur-lg
        rounded-xl shadow-xl border border-white/30
        transition-all duration-300
        max-h-[80vh] overflow-y-auto
      "
    >
      <div className="text-center mb-4">
        <h3 className="text-sm font-bold text-blue-600 tracking-wide">목차</h3>
        <div className="w-10 h-px bg-blue-300 mx-auto rounded-full mt-2"></div>
      </div>

      {sidebarOrder.map((sec) => {
        const isActive = activeSection === sec.id;

        return (
          <div key={sec.id} className="space-y-1">
            <button
              onClick={() => scrollToSection(sec.id)}
              className={cn(
                'relative w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-200 flex items-center justify-between group',
                isActive
                  ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 shadow-inner font-semibold'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
              )}
            >
              <span className="truncate font-medium">{sec.label}</span>
              <ChevronRight
                className={cn(
                  'w-4 h-4 transition-transform flex-shrink-0 ml-2',
                  isActive
                    ? 'opacity-100 rotate-90 text-blue-500'
                    : 'opacity-60 group-hover:opacity-80 group-hover:translate-x-0.5'
                )}
              />
              <div
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all',
                  isActive
                    ? 'bg-gradient-to-b from-blue-400 to-purple-400 opacity-100 scale-100'
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