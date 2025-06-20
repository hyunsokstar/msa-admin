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
  { id: 'cti-task-master-progress', label: 'Personal App' },
  { id: 'tauri-native-features', label: '네이티브 활용' },
  { id: 'reference-sites', label: '참고 사이트' },
];

const RightSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  useEffect(() => {
    // 더 유연한 Intersection Observer 설정
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px', // 더 유연한 감지 범위
      threshold: [0, 0.1, 0.3, 0.5] // 여러 threshold 값
    };

    let currentIntersecting: string[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!currentIntersecting.includes(entry.target.id)) {
            currentIntersecting.push(entry.target.id);
          }
        } else {
          currentIntersecting = currentIntersecting.filter(id => id !== entry.target.id);
        }
      });

      // 가장 위에 있는 섹션을 활성화
      if (currentIntersecting.length > 0) {
        const topSection = sidebarOrder.find(section =>
          currentIntersecting.includes(section.id)
        );
        if (topSection) {
          setActiveSection(topSection.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 스크롤 기반 폴백 시스템
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 페이지 하단 근처에 도달했을 때 마지막 섹션 활성화
      if (scrollY + windowHeight >= documentHeight - 100) {
        setActiveSection(sidebarOrder[sidebarOrder.length - 1].id);
        return;
      }

      // 일반적인 스크롤 기반 감지
      let currentSection = 'introduction';
      sidebarOrder.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;

          if (scrollY + 150 >= elementTop) {
            currentSection = section.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // 모든 섹션 관찰 시작
    sidebarOrder.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // 스크롤 이벤트도 등록 (폴백용)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 초기 설정
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // 헤더 오프셋 줄임
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