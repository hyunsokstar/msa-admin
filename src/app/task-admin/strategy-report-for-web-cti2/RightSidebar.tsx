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
  { id: 'tech-debt-management', label: '기술 부채 관리' },
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
    <aside className="h-screen sticky top-0 p-4 bg-white/80 backdrop-blur-md border-l border-gray-200 shadow-lg">
      {/* 헤더 섹션 */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-blue-700 mb-2">목차</h2>
        <div className="w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
      </div>

      {/* 네비게이션 링크들 */}
      <nav className="space-y-1.5">
        {sidebarOrder.map((sec, index) => {
          const isActive = activeSection === sec.id;

          return (
            <div key={sec.id} className="relative">
              <button
                onClick={() => scrollToSection(sec.id)}
                className={cn(
                  'w-full text-left px-3 py-3 rounded-lg transition-all duration-300 flex items-center justify-between group',
                  'border border-transparent hover:border-blue-200',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                  )}>
                    {index + 1}
                  </div>
                  <span className="font-medium text-xs leading-tight">{sec.label}</span>
                </div>

                <ChevronRight
                  className={cn(
                    'w-4 h-4 transition-all duration-300 flex-shrink-0',
                    isActive
                      ? 'opacity-100 rotate-90 text-white'
                      : 'opacity-60 group-hover:opacity-80 group-hover:translate-x-1'
                  )}
                />
              </button>

              {/* 활성 상태 인디케이터 */}
              <div
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-b from-blue-400 to-purple-500 opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                )}
              />
            </div>
          );
        })}
      </nav>

      {/* 진행률 표시 */}
      <div className="mt-6 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="text-xs text-gray-600 mb-2 flex items-center justify-between">
          <span>읽기 진행률</span>
          <span className="font-semibold text-blue-600">
            {Math.round(((sidebarOrder.findIndex(s => s.id === activeSection) + 1) / sidebarOrder.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full transition-all duration-500"
            style={{
              width: `${((sidebarOrder.findIndex(s => s.id === activeSection) + 1) / sidebarOrder.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* 푸터 정보 */}
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-500 mb-2">총 {sidebarOrder.length}개 섹션</div>
        <div className="flex justify-center space-x-1">
          {sidebarOrder.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-1.5 h-1.5 rounded-full transition-all duration-300',
                index <= sidebarOrder.findIndex(s => s.id === activeSection)
                  ? 'bg-blue-400'
                  : 'bg-gray-300'
              )}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;