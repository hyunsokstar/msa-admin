// src/components/RightSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SectionLink {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

const sections: SectionLink[] = [
  { id: 'introduction', label: '서론' },
  { id: 'technical-issues', label: '기술적 문제' },
  { id: 'note-c-basics', label: 'C 기본 (1)' },
  { id: 'note-c-structs', label: 'C 기본 (2)' },
  { id: 'reference-materials', label: '참고 자료' },
  { id: 'reference-lectures', label: '강의 자료' },
  { id: 'fullstack-cti', label: 'for fullstack' },
  { id: 'productivity-strategies', label: '생산성 전략' },
];

const RightSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -35% 0px' }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide sidebar when near top or bottom
      setIsVisible(scrollY > 100 && scrollY < documentHeight - windowHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div 
      className={`hidden lg:flex flex-col fixed top-1/2 right-6 transform -translate-y-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}
    >
      {/* Background with glassmorphism effect */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 -z-10" />
      
      {/* Navigation items */}
      <div className="p-3 space-y-1 min-w-[180px]">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`group relative w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 ease-out ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md transform scale-[1.02]' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80'
              }`}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Active indicator */}
              <div 
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-full transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              />
              
              {/* Content */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium transition-all duration-200 ${
                  isActive ? 'translate-x-0' : 'group-hover:translate-x-1'
                }`}>
                  {section.label}
                </span>
                
                <ChevronRight 
                  className={`w-3 h-3 transition-all duration-200 ${
                    isActive 
                      ? 'opacity-100 transform rotate-90' 
                      : 'opacity-0 group-hover:opacity-60 group-hover:translate-x-1'
                  }`}
                />
              </div>
              
              {/* Hover effect background */}
              <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-600/10 transition-all duration-300 ${
                isActive ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
              }`} />
            </button>
          );
        })}
      </div>
      
      {/* Progress indicator */}
      <div className="px-3 pb-3">
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
          <span className="text-xs text-gray-500 font-medium">목차</span>
          <span className="text-xs text-gray-400">
            {sections.findIndex(s => s.id === activeSection) + 1}/{sections.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;