// app/strategy-report-for-web-cti/page.tsx

'use client';

import React from 'react';
import Introduction from './Introduction';
import TechnicalIssues from './TechnicalIssues';
import KeyStrategies from './SolutionSection';
import ImplementationRoadmap from './ImplementationRoadmap';
import EnhancedLearningResources from './StudyContent';
import ModernParadigmsSection from './ModernParadigmsSection';

const StrategyReport = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        차기 웹 CTI 프로젝트 전략 보고서
      </h1>

      {/* 서론 섹션을 컴포넌트로 분리 */}
      <Introduction />
      
      {/* 기술적 문제 섹션을 컴포넌트로 분리 */}
      <TechnicalIssues />

      {/* 나머지 이미 컴포넌트화된 섹션들 */}
      <KeyStrategies />

      <EnhancedLearningResources />

      <ModernParadigmsSection />

    </div>
  );
};

export default StrategyReport;