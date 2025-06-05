// components/StrategyReport.tsx
'use client';

import React from 'react';
import Introduction from './Introduction';
import TechnicalIssues from './TechnicalIssues';
import NextGenerationArchitectureWithRedisScaling2 from './NextGenerationArchitectureWithRedisScaling2';
import ClangBasicNote1 from './ClangBasicNote1';
import NoteCardsForCStructs from './ClangBasicNote2';
import ReferenceMaterials from './ReferenceMaterials';
import ReferenceLectures from './ReferenceLectures';
import RightSidebar from './RightSidebar';
import BackendTechTable from './BackendTechTable';
import FrontendTechTable from './FrontendTechTable';
import DatabaseTechGuide from './DatabaseTechGuide';
import DGSGraphQLPilotProject from './DGSGraphQLPilotProject';
import WhyChooseJooq from './WhyChooseJooq ';
import CQRSJooqN1Solution from './CQRSJooqN1Solution';

// 섹션 구분 컴포넌트 (파스텔톤 그라디언트 선)
const SectionDivider = ({
  gradient = 'from-blue-500 to-purple-600',
  margin = 'my-16',
}: {
  gradient?: string;
  margin?: string;
}) => (
  <div className={`${margin} flex items-center justify-center`}>
    <div className="flex-1 max-w-xl">
      <div className={`h-px bg-gradient-to-r ${gradient} opacity-60`} />
    </div>
    <div className="mx-3">
      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`} />
    </div>
    <div className="flex-1 max-w-xl">
      <div className={`h-px bg-gradient-to-l ${gradient} opacity-60`} />
    </div>
  </div>
);

// 메인 섹션 구분 컴포넌트 (강조용)
const MainSectionDivider = () => (
  <div className="my-20 flex items-center justify-center">
    <div className="flex-1 w-full">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-purple-600 opacity-80"></div>
    </div>
    <div className="mx-3 flex space-x-2">
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
    <div className="relative">
      {/** 오른쪽에 고정된 사이드바 **/}
      <RightSidebar />

      <div className="w-[80%] mx-auto py-12 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen px-4">
        {/* 메인 타이틀 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-800 to-purple-700 bg-clip-text text-transparent">
            차기 웹 CTI 프로젝트 전략 보고서
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* 1. 서론 섹션 */}
        <section id="introduction" className="mb-8">
          <Introduction />
        </section>

        <MainSectionDivider />

        {/* 2. 기술적 문제 섹션 */}
        <section id="technical-issues" className="mb-8">
          <TechnicalIssues />
        </section>

        <SectionDivider gradient="from-green-500 to-blue-600" />

        {/* 3. 차세대 아키텍처 */}
        <section id="next-gen-arch" className="mb-8">
          <NextGenerationArchitectureWithRedisScaling2 />
        </section>

        <SectionDivider gradient="from-purple-500 to-pink-600" />

        {/* <section id="reference-materials" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nest Js + GraphQL 기본 튜토리얼</h2>
          <ReferenceMaterials />
        </section>

        <SectionDivider gradient="from-purple-500 to-pink-600" />

        <section id="reference-lectures" className="mb-8">
          <ReferenceLectures />
        </section>

        <SectionDivider gradient="from-purple-500 to-pink-600" /> */}

        {/* 8. 백엔드 기술 목록 */}
        <section id="backend-tech-table" className="mb-8">
          <BackendTechTable />
        </section>

        <SectionDivider gradient="from-purple-500 to-pink-600" />

        {/* 9. 프론트엔드 기술 목록 */}
        <section id="frontend-tech-table" className="mb-8">
          <FrontendTechTable />
        </section>

        <SectionDivider gradient="from-purple-500 to-pink-600" />

        {/* 10. DB 기술 가이드 */}
        <section id="fullstack-cti" className="mb-8">
          <DatabaseTechGuide />
        </section>

        <SectionDivider gradient="from-purple-500 to-pink-600" />

        {/* 11. JOOQ 선택 이유 */}
        <section id="cqrs-jooq-n1-solution" className="mb-8">
          <CQRSJooqN1Solution />
        </section>

        <SectionDivider gradient="from-blue-500 to-green-600" />

        {/* 12. DGS 파일럿 프로젝트 */}
        <section id="dgs-pilot-project" className="mb-8">
          <DGSGraphQLPilotProject />
        </section>

        <div className="h-16" />
      </div>
    </div>
  );
};

export default StrategyReport;