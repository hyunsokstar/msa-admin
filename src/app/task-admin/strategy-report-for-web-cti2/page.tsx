// components/StrategyReport.tsx
'use client';

import React from 'react';
import Introduction from './Introduction';
import RightSidebar from './RightSidebar';
import CTITaskMasterProgress from './PersonalToolProgress';
import CTIMainProgress from './CTIMainProgress';
import ReferenceForCti from './ReferenceForCti';

const MainSectionDivider = () => (
  <div className="my-8 flex items-center justify-center">
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
        <section id="introduction" className="min-h-[400px]">
          <Introduction />
        </section>

        <MainSectionDivider />

        {/* CTI 메인 시스템 진행현황 */}
        <section id="cti-main-progress" className="min-h-[300px]">
          <CTIMainProgress />
        </section>

        <MainSectionDivider />

        {/* CTI Task Master 개인도구 진행현황 */}
        <section id="cti-task-master-progress" className="min-h-[500px]">
          <CTITaskMasterProgress />
        </section>

        <MainSectionDivider />

        {/* Tauri 네이티브 기능 활용 방안 */}
        <section id="tauri-native-features" className="min-h-[600px]">
          <ReferenceForCti />
        </section>

        {/* 추가 여백으로 마지막 섹션 감지 보장 */}
        <div className="h-32" />
      </div>
    </div>
  );
};

export default StrategyReport;