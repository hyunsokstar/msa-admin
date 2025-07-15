// components/RightSidebar.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

interface SectionLink {
  id: string;
  label: string;
}

// Redis 가이드 내 섹션들 (실제 존재하는 섹션들만)
const sidebarOrder: SectionLink[] = [
  { id: 'redis-architecture', label: '핵심 아키텍처' },
  { id: 'implementation-patterns', label: '구현 패턴 요약' },
  { id: 'backend-collaboration', label: '백엔드 협의사항' },
];

const RightSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('redis-architecture');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 전체 스크롤 진행률 계산
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // 현재 보이는 섹션 감지 (단순한 방식)
      let currentSection = 'redis-architecture';

      // 각 섹션의 위치 확인
      const sections = [
        'redis-architecture',
        'implementation-patterns',
        'zustand-comparison',
        'backend-collaboration',
        'implementation-guide',
        'references'
      ];

      sections.forEach((sectionId) => {
        const element = document.querySelector(`[data-section="${sectionId}"]`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 설정

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      const headerOffset = 80;
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
        <h2 className="text-lg font-bold text-blue-700 mb-2">📡 Redis 가이드</h2>
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
                  'w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-between group',
                  'border border-transparent hover:border-blue-200',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md'
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all',
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
                    'w-3 h-3 transition-all duration-300 flex-shrink-0',
                    isActive
                      ? 'opacity-100 rotate-90 text-white'
                      : 'opacity-60 group-hover:opacity-80 group-hover:translate-x-1'
                  )}
                />
              </button>

              {/* 활성 상태 인디케이터 */}
              <div
                className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r-full transition-all duration-300',
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
            {Math.round(scrollProgress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* 빠른 액션 */}
      <div className="mt-4 space-y-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full text-left p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
        >
          <span className="text-xs text-green-700 font-medium">⬆️ 맨 위로</span>
        </button>

        <button
          onClick={() => window.open('https://nexus-task-master.shop/note-admin/notes/90/note-contents?collectionId=54&noteTitle=reids%20이벤트%20구독%20방식%20정리', '_blank')}
          className="w-full text-left p-2 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors"
        >
          <span className="text-xs text-amber-700 font-medium">📄 상세 가이드</span>
        </button>
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