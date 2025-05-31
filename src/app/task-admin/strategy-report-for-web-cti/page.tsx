// app/strategy-report-for-web-cti/page.tsx

'use client';

import React from 'react';
import Introduction from './Introduction';
import TechnicalIssues from './TechnicalIssues';

import GraphQLSuccessCases from './GraphQLSuccessCases';
import NextProjectArchetecture from './NextProjectArchetecture';
import ReferenceMaterials from './ReferenceMaterials';
import ReferenceLectures from './ReferenceLectures';
import RedisScalingDiagram from './RedisScalingDiagram';
import NextGenerationArchitectureWithRedisScaling2 from './NextGenerationArchitectureWithRedisScaling2';
import KafkaNecessityAnalysis from './KafkaNecessityAnalysis';
import CtiLearningCurveSummary from './CtiLearningCurveSummary';

// 섹션 구분 컴포넌트
const SectionDivider = ({
  gradient = "from-blue-500 to-purple-600",
  margin = "my-16"
}: {
  gradient?: string;
  margin?: string;
}) => (
  <div className={`${margin} flex items-center justify-center`}>
    <div className="flex-1 max-w-xl">
      <div className={`h-px bg-gradient-to-r ${gradient} opacity-60`}></div>
    </div>
    <div className="mx-3">
      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient} shadow-lg`}></div>
    </div>
    <div className="flex-1 max-w-xl">
      <div className={`h-px bg-gradient-to-l ${gradient} opacity-60`}></div>
    </div>
  </div>
);

// 메인 섹션 구분 컴포넌트 (더 강조)
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

// 서브 섹션 구분 컴포넌트 (더 부드러운)
const SubSectionDivider = () => (
  <div className="my-12 flex justify-center">
    <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  </div>
);

const StrategyReport = () => {
  return (
    <div className="w-[80%] mx-auto px-0 py-12 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* 메인 타이틀 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-800 to-purple-700 bg-clip-text text-transparent">
          차기 웹 CTI 프로젝트 전략 보고서
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>

      {/* 서론 섹션 */}
      <section className="mb-8">
        <Introduction />
      </section>

      <MainSectionDivider />

      {/* 기술적 문제 섹션 */}
      <section className="mb-8">
        <TechnicalIssues />
      </section>

      <SectionDivider gradient="from-green-500 to-blue-600" />

      {/* GraphQL 성공 사례 */}
      <section className="mb-8">
        <GraphQLSuccessCases />
      </section>

      <MainSectionDivider />

      <section className="mb-8">
        <NextGenerationArchitectureWithRedisScaling2 />
      </section>

      <SectionDivider gradient="from-purple-500 to-pink-600" />

      <section className="mb-8">
        <KafkaNecessityAnalysis />
      </section>

      <SectionDivider gradient="from-purple-500 to-pink-600" />

      {/* 차기 프로젝트 아키텍처 */}

      <section className="mb-8">
        <RedisScalingDiagram />
      </section>

      <SectionDivider gradient="from-purple-500 to-pink-600" />

      <section className="mb-8">
        <CtiLearningCurveSummary />
      </section>

      <SectionDivider gradient="from-purple-500 to-pink-600" />

      {/* 기술 습득 러닝 커브 요약 */}


      {/* 참고 자료 */}
      <section className="mb-8">
        <ReferenceMaterials />
      </section>

      <SectionDivider gradient="from-purple-500 to-pink-600" />

      <section className="mb-8">
        <ReferenceLectures />
      </section>

      {/* 하단 여백 */}
      <div className="h-16"></div>
    </div>
  );
};

export default StrategyReport;