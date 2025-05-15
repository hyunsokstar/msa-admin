import React, { useState } from 'react';

// 효과 카드 컴포넌트
interface BenefitCardProps {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, children, icon, isExpanded, onToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl mb-6">
      <div 
        className={`px-6 py-4 cursor-pointer flex justify-between items-center ${isExpanded ? 'bg-blue-600 text-white' : 'bg-gray-50'}`}
        onClick={onToggle}
      >
        <h2 className="text-xl font-bold flex items-center">
          <span className="mr-3 text-2xl">{icon}</span>
          {title}
        </h2>
        <span className="text-xl">
          {isExpanded ? '−' : '+'}
        </span>
      </div>
      
      {isExpanded && (
        <div className="px-6 py-4 bg-white border-t border-gray-100">
          <div className="text-gray-700">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// 이점 항목 컴포넌트
interface BenefitItemProps {
  title: string;
  children: React.ReactNode;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, children }) => {
  return (
    <div className="mb-3">
      <h3 className="font-semibold text-blue-700 mb-1">{title}</h3>
      <p className="text-gray-600 ml-1">{children}</p>
    </div>
  );
};

// 요약 섹션 컴포넌트
const SummarySection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 my-8 shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">요약 및 보충 정리</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-blue-600 mb-2">표준화된 계약(Contract)</h3>
          <p>스키마를 중심으로 한 계약 기반 협업으로 API 변경에 따른 리스크 최소화</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-blue-600 mb-2">개발자 생산성 향상</h3>
          <p>Self-service 탐색·실시간 타입 검사로 장애 추적과 개발 속도를 동시에 개선</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-blue-600 mb-2">데이터 최적화 및 AI 친화성</h3>
          <p>필요한 데이터만 요청 가능한 구조로 네트워크·처리 비용 절감, AI 연계 간소화</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold text-blue-600 mb-2">유지보수성 및 안정성 제고</h3>
          <p>비파괴적 스키마 확장, 문서화된 API 계약 강제화로 운영 안정성 확보</p>
        </div>
        <div className="bg-white p-4 rounded shadow md:col-span-2">
          <h3 className="font-bold text-blue-600 mb-2">DDD 적합성</h3>
          <p>도메인 모델과 스키마 일치, Aggregate 단위 노출로 도메인 경계 명확화</p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-blue-100 rounded-lg">
        <p className="italic text-blue-800">
          이처럼 GraphQL은 단순한 데이터 조회 방식을 넘어, 조직의 협업 구조, 개발자 경험, 시스템 안정성, 도메인 모델링까지 아우르는 강력한 플랫폼 역할을 합니다.
        </p>
      </div>
    </div>
  );
};

// 메인 컴포넌트
const GraphQLBenefits = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(1);
  
  const toggleSection = (section: number) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">실질적인 GraphQL 도입 효과</h1>
        <p className="text-gray-600">
          단순한 기술 전환을 넘어 조직 프로세스와 비즈니스 가치를 향상시키는 다섯 가지 주요 효과
        </p>
      </div>
      
      <BenefitCard 
        title="협업을 위한 체계적·구조적 시스템 개선" 
        icon="🤝" 
        isExpanded={expandedSection === 1}
        onToggle={() => toggleSection(1)}
      >
        <BenefitItem title="타입 명세 통합">
          스키마 정의를 통해 프론트·백엔드·QA·문서화 팀이 동일한 계약(contract)을 공유
        </BenefitItem>
        <BenefitItem title="자동 문서화">
          GraphQL 스키마로부터 자동 생성되는 문서(GraphiQL/GraphQL Playground)를 통해 API 이해도 향상
        </BenefitItem>
        <BenefitItem title="버전 관리 최소화">
          필드 추가만으로 호환성 유지를 보장해, REST 버전별 엔드포인트 관리의 부담 완화
        </BenefitItem>
      </BenefitCard>
      
      <BenefitCard 
        title="문제 해결에 진심인 개발자를 위한 시스템 기반" 
        icon="🛠️" 
        isExpanded={expandedSection === 2}
        onToggle={() => toggleSection(2)}
      >
        <BenefitItem title="셀프 서비스 API 탐색">
          개발자 스스로 쿼리 작성·실행 가능 → 문제 재현 및 디버깅 속도 대폭 향상
        </BenefitItem>
        <BenefitItem title="실시간 피드백">
          IDE(예: VSCode) 및 코드 생성 툴로부터 스키마 오류 즉시 감지
        </BenefitItem>
        <BenefitItem title="강력한 타입 안정성">
          컴파일 단계에서 오류 검출 → 런타임 에러 감소
        </BenefitItem>
      </BenefitCard>
      
      <BenefitCard 
        title="AI 활용 등 복잡해지는 개발 환경에서의 개발 효율성·기술 수준 달성" 
        icon="🤖" 
        isExpanded={expandedSection === 3}
        onToggle={() => toggleSection(3)}
      >
        <BenefitItem title="정형화된 데이터 구조">
          AI 모델이 참조하기 쉬운 일관된 JSON 형태 응답 제공
        </BenefitItem>
        <BenefitItem title="맞춤형 데이터 페칭">
          필요한 필드만 쿼리해 전송량 최적화 → 대용량 데이터 환경에서도 효율적
        </BenefitItem>
        <BenefitItem title="코드 생성·타입 추출">
          GraphQL Code Generator 등을 통해 클라이언트 타입·리졸버 스텁 자동 생성
        </BenefitItem>
      </BenefitCard>
      
      <BenefitCard 
        title="장기적 유지보수 및 안정성 제고" 
        icon="🛡️" 
        isExpanded={expandedSection === 4}
        onToggle={() => toggleSection(4)}
      >
        <BenefitItem title="비파괴적 스키마 확장">
          기존 쿼리는 그대로 두고 필드 추가만으로 기능 확장 가능
        </BenefitItem>
        <BenefitItem title="스키마 강제성(enforcement)">
          문서화된 계약 위반 시 빌드/배포 단계에서 차단
        </BenefitItem>
        <BenefitItem title="의존성 최소화">
          프론트엔드 변경 없이 백엔드 로직 교체 가능 → 롤백·A/B 테스트 용이
        </BenefitItem>
      </BenefitCard>
      
      <BenefitCard 
        title="DDD(Domain-Driven Design)를 위한 거의 유일한 대안" 
        icon="🏗️" 
        isExpanded={expandedSection === 5}
        onToggle={() => toggleSection(5)}
      >
        <BenefitItem title="도메인 모델 스키마화">
          GraphQL 스키마가 도메인 언어(Ubiquitous Language) 역할
        </BenefitItem>
        <BenefitItem title="Aggregates 단위 노출">
          DDD의 Aggregate를 하나의 타입으로 표현해, 경계를 명확히 유지
        </BenefitItem>
        <BenefitItem title="리졸버 계층에서 도메인 서비스 호출">
          비즈니스 로직 분리·재사용성 극대화
        </BenefitItem>
      </BenefitCard>
      
      <SummarySection />
    </div>
  );
};

export default GraphQLBenefits;