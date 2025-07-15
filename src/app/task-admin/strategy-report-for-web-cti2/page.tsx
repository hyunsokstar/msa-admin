// components/StrategyReport.tsx
'use client';
import React from 'react';
import RightSidebar from './RightSidebar';
import RedisEventGuide from './Introduction';

const StrategyReport: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1 w-full">
          <div className="px-8 py-6 max-w-[95%] mx-auto">
            {/* Redis 이벤트 구독 가이드 */}
            <section id="introduction" className="min-h-[400px]">
              <RedisEventGuide />
            </section>

            {/* 추가 여백으로 스크롤 완료 감지 */}
            <div className="h-32" />
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <div className="w-72 flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default StrategyReport;