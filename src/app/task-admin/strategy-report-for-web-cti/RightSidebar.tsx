// components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, Database, Code, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionLink {
  id: string;
  label: string;
  subTabs?: { id: string; label: string; icon?: React.ReactNode }[];
}

// StrategyReport.tsx 에 정의된 section id 순서와 동일하게 설정합니다.
const sidebarOrder: SectionLink[] = [
  { id: 'introduction', label: '서론' },
  { id: 'technical-issues', label: '기술적 문제' },
  { id: 'next-gen-arch', label: '차세대 아키텍처' },
  { id: 'note-c-basics', label: 'C 기본 (1)' },
  { id: 'note-c-structs', label: 'C 기본 (2)' },
  { id: 'reference-materials', label: '참고 자료' },
  { id: 'reference-lectures', label: '강의 자료' },
  { id: 'backend-tech-table', label: '백엔드 스킬' },
  { id: 'frontend-tech-table', label: '프론트 스킬' },
  {
    id: 'fullstack-cti',
    label: 'DB 기술 가이드',
    subTabs: [
      { id: 'overview', label: '핵심 비교', icon: <Database className="w-3 h-3" /> },
      { id: 'decision', label: '언제 뭘?', icon: <Lightbulb className="w-3 h-3" /> },
      { id: 'examples', label: '실제 사례', icon: <Code className="w-3 h-3" /> }
    ]
  }
];

const RightSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<string>('overview');
  const [showSubTabs, setShowSubTabs] = useState<boolean>(false);

  // 스크롤 위치에 따라 activeSection 업데이트
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
        // DatabaseTechGuide 섹션인 경우 서브탭 표시
        setShowSubTabs(current === 'fullstack-cti');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // DatabaseTechGuide의 탭 변경을 감지
  useEffect(() => {
    if (activeSection === 'fullstack-cti') {
      const handleTabChange = (event: CustomEvent) => {
        setActiveSubTab(event.detail.tabId);
      };

      window.addEventListener('databaseGuideTabChange', handleTabChange as EventListener);
      return () => window.removeEventListener('databaseGuideTabChange', handleTabChange as EventListener);
    }
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setShowSubTabs(sectionId === 'fullstack-cti');
    }
  };

  const handleSubTabClick = (subTabId: string) => {
    setActiveSubTab(subTabId);
    // DatabaseTechGuide 컴포넌트에 탭 변경 이벤트 전송
    const event = new CustomEvent('sidebarTabChange', {
      detail: { tabId: subTabId }
    });
    window.dispatchEvent(event);
  };

  return (
    <aside
      className="
        hidden lg:flex flex-col fixed
        top-1/2 right-4 transform -translate-y-1/2
        space-y-2 z-50 w-40 px-2 py-3
        bg-white/95 backdrop-blur-lg
        rounded-xl shadow-xl border border-white/30
        transition-all duration-300
      "
    >
      {/* 사이드바 제목 */}
      <div className="text-center mb-3">
        <h3 className="text-sm font-bold text-teal-600">목차</h3>
        <div className="w-8 h-px bg-teal-300 mx-auto rounded-full mt-1"></div>
      </div>

      {sidebarOrder.map((sec) => {
        const isActive = activeSection === sec.id;
        const hasSubTabs = sec.subTabs && sec.subTabs.length > 0;

        return (
          <div key={sec.id} className="space-y-1">
            {/* 메인 섹션 버튼 */}
            <button
              onClick={() => scrollToSection(sec.id)}
              className={cn(
                'relative w-full text-left px-3 py-2 text-xs rounded-lg transition-all duration-200 flex items-center justify-between group',
                isActive
                  ? hasSubTabs
                    ? 'bg-gradient-to-r from-blue-100 to-green-100 text-gray-800 shadow-md border border-blue-200/50'
                    : 'bg-gradient-to-r from-teal-200 to-pink-200 text-teal-800 shadow-inner'
                  : 'text-teal-600 hover:bg-teal-50 hover:text-teal-700'
              )}
            >
              <span className="truncate font-medium">{sec.label}</span>
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
                    ? hasSubTabs
                      ? 'bg-gradient-to-b from-blue-400 to-green-400 opacity-100 scale-100'
                      : 'bg-gradient-to-b from-teal-400 to-pink-400 opacity-100 scale-100'
                    : 'opacity-0 scale-75'
                )}
              />
            </button>

            {/* 서브탭들 (DatabaseTechGuide 전용) */}
            {hasSubTabs && showSubTabs && isActive && (
              <div className="ml-3 space-y-1 border-l-2 border-gray-200 pl-2">
                {sec.subTabs!.map((subTab, index) => {
                  const isSubActive = activeSubTab === subTab.id;
                  return (
                    <button
                      key={subTab.id}
                      onClick={() => handleSubTabClick(subTab.id)}
                      className={cn(
                        'relative w-full text-left px-2 py-2 text-xs rounded-md transition-all duration-200 flex items-center gap-2 group',
                        isSubActive
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                      )}
                    >
                      {/* 아이콘 */}
                      <div className={cn(
                        'flex-shrink-0 transition-colors',
                        isSubActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600'
                      )}>
                        {subTab.icon}
                      </div>

                      {/* 라벨 */}
                      <span className="flex-1 truncate">{subTab.label}</span>

                      {/* 단계 번호 */}
                      <div className={cn(
                        'w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center transition-all',
                        isSubActive
                          ? 'bg-white text-blue-600'
                          : 'bg-gray-200 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                      )}>
                        {index + 1}
                      </div>
                    </button>
                  );
                })}

                {/* 진행률 표시 */}
                <div className="mt-2 px-2">
                  <div className="text-xs text-gray-500 mb-1">진행률</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: `${((sec.subTabs!.findIndex(s => s.id === activeSubTab) + 1) / sec.subTabs!.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};

export default RightSidebar;