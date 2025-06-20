// components/StrategyReport.tsx
'use client';

import React from 'react';
import Introduction from './Introduction';
import RightSidebar from './RightSidebar';
import CTITaskMasterProgress from './PersonalToolProgress';
import CTIMainProgress from './CTIMainProgress';

const MainSectionDivider = () => (
  <div className="my-6 flex items-center justify-center">
    <div className="flex-1 w-full">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-purple-600 opacity-80"></div>
    </div>
    <div className="mx-4 flex space-x-2">
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
      <div className="w-3 h-3 rounded-full bg-purple-600 shadow-lg"></div>
      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
    </div>
    <div className="flex-1 w-full">
      <div className="h-0.5 bg-gradient-to-l from-transparent via-purple-600 to-blue-500 opacity-80"></div>
    </div>
  </div>
);

const StrategyReport: React.FC = () => {
  return (
    <div className="">
      <RightSidebar />

      <div className="w-[80%] mx-auto py-4 bg-gradient-to-br from-slate-50 to-blue-50">

        {/* 프로젝트 구성 및 소개 */}
        <section id="introduction" className="">
          <Introduction />
        </section>

        <MainSectionDivider />

        {/* CTI 메인 시스템 진행현황 */}
        <section id="cti-main-progress" className="">
          <CTIMainProgress />
        </section>

        <MainSectionDivider />

        {/* CTI Task Master 개인도구 진행현황 */}
        <section id="cti-task-master-progress" className="">
          <CTITaskMasterProgress />
        </section>

        <div className="h-8" />
      </div>
    </div>
  );
};

export default StrategyReport;