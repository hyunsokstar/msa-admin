// src/app/strategy-report-for-web-cti/Introduction.tsx
import React from 'react';

export const Introduction: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-4 text-blue-700 border-b pb-2">1. 서론</h2>
      <p className="text-lg mb-4">
        본 보고서는 차기 웹 CTI(Computer Telephony Integration) 프로젝트의 효율적인 개발 방향을 수립하기 위해 작성되었습니다.
        실시간 상담 시스템, 모니터링 기능, 다중 탭 UI 등 복잡한 요구사항을 가진 기존 프로젝트에서 발견된 핵심 기술적 문제를 바탕으로,
        생산성 향상과 유지보수성 개선을 위한 전략적 기술 스택 도입과 설계 전환이 필요합니다.
      </p>
      <p className="text-lg mb-4">
        특히, Next.js 기반의 프론트엔드 구조는 최신 트렌드인 Zustand, TanStack Query, GraphQL 등을 적극 활용함으로써
        데이터 흐름 중심의 구조로 개선할 수 있으며, 이는 개발 속도는 물론 사용자 경험까지 크게 향상시킬 수 있습니다.
      </p>
    </section>
  );
};

export default Introduction;