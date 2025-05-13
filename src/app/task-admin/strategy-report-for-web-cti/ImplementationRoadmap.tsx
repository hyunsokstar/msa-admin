// components/ImplementationRoadmap.tsx

import React from 'react';

const ImplementationRoadmap = () => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b pb-2">4. 구현 로드맵 및 타임라인</h2>
      <p className="text-lg mb-6">
        제안된 기술 스택과 아키텍처 변경을 체계적으로 구현하기 위한 단계별 로드맵으로, 약 5개월(20주) 기간으로 계획되었습니다.
        프로젝트 규모와 팀 역량에 따라 일정 조정이 가능합니다.
      </p>

      {/* 1단계: 준비 및 계획 */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">1단계: 준비 및 계획 (2주)</h3>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">1주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">기술 스택 준비 및 학습</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>팀 구성 및 역할 분담</li>
              <li>Next.js, Zustand, TanStack Query, GraphQL 기술 스택 학습 세션</li>
              <li>개발 환경 구성 및 도구 설정 (GitHub 설정, CI/CD 파이프라인)</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">2주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">상세 설계 및 프로토타입</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>상세 아키텍처 설계 문서 작성</li>
              <li>GraphQL 스키마 초안 설계</li>
              <li>UI/UX 와이어프레임 및 프로토타입 제작</li>
              <li>기술적 위험 요소 평가 및 대응 계획 수립</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 2단계: 기초 인프라 구축 */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">2단계: 기초 인프라 구축 (3주)</h3>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">3주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">백엔드 기초 작업</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Spring Boot + DGS Framework 초기 설정</li>
              <li>기본 GraphQL 스키마 및 리졸버 구현</li>
              <li>데이터베이스 설계 및 연결</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">4주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">프론트엔드 기초 작업</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Next.js 프로젝트 초기화 및 FSD 아키텍처 폴더 구조 구성</li>
              <li>공통 UI 컴포넌트 라이브러리 구축</li>
              <li>Zustand 상태 관리 스토어 설계 및 기본 구현</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">5주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">기본 통합 작업</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>GraphQL 클라이언트 설정 및 TanStack Query 통합</li>
              <li>기본 API 연동 테스트</li>
              <li>GitHub Actions를 통한 CI/CD 파이프라인 구축</li>
              <li>AI 코드 리뷰 시스템 구성</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 3단계: 핵심 기능 개발 */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">3단계: 핵심 기능 개발 (6주)</h3>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">6-7주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">탭 관리 시스템 구현</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Zustand 기반 탭 관리 스토어 완성</li>
              <li>다중 탭 UI 컴포넌트 구현</li>
              <li>패널 분할 및 크기 조정 기능 구현</li>
              <li>탭 콘텐츠 동적 로딩 시스템 구현</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">8-9주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">실시간 모니터링 기능 개발</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>실시간 데이터 구독을 위한 GraphQL Subscription 구현</li>
              <li>캠페인-상담원-상태 계층형 데이터 조회 API 완성</li>
              <li>모니터링 대시보드 UI 구현</li>
              <li>실시간 데이터 시각화 컴포넌트 개발</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">10-11주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">상담 관리 기능 개발</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>상담원 정보 관리 기능 구현</li>
              <li>고객 정보 관리 기능 구현</li>
              <li>통화 내역 관리 기능 구현</li>
              <li>폼 관리 최적화 (React Hook Form 활용)</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 4단계: 고급 기능 개발 */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">4단계: 고급 기능 개발 (4주)</h3>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">12-13주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">AI 통화 분석 시스템 통합</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>음성-텍스트 변환 API 통합</li>
              <li>감정 분석 기능 구현</li>
              <li>통화 요약 및 키워드 추출 기능 구현</li>
              <li>분석 결과 시각화 대시보드 개발</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">14-15주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">고급 UI/UX 기능 개발</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>드래그 앤 드롭 인터페이스 개선</li>
              <li>사용자 맞춤형 레이아웃 저장 기능</li>
              <li>다크 모드 / 라이트 모드 지원</li>
              <li>접근성 및 반응형 디자인 최적화</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 5단계: 테스트 및 최적화 */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">5단계: 테스트 및 최적화 (3주)</h3>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">16주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">테스트 자동화</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>단위 테스트 작성 및 실행 자동화</li>
              <li>통합 테스트 시나리오 구현</li>
              <li>엔드투엔드 테스트 구성</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">17주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">성능 최적화</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>번들 크기 최적화</li>
              <li>렌더링 성능 분석 및 개선</li>
              <li>API 응답 시간 최적화</li>
              <li>캐싱 전략 최적화</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">18주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">보안 및 안정성 강화</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>보안 취약점 검사 및 수정</li>
              <li>에러 처리 및 로깅 시스템 강화</li>
              <li>부하 테스트 및 확장성 검증</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 6단계: 배포 및 이관 */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">6단계: 배포 및 이관 (2주)</h3>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">19주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">스테이징 환경 배포</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>스테이징 환경 구성</li>
              <li>사용자 수용 테스트 진행</li>
              <li>피드백 수집 및 최종 조정</li>
            </ul>
          </div>
        </div>
        
        <div className="flex mb-4 border-l-4 border-blue-500">
          <div className="w-32 font-semibold pl-4">20주차</div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-700 mb-2">프로덕션 배포 및 안정화</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>프로덕션 환경 배포</li>
              <li>모니터링 시스템 가동</li>
              <li>사용자 교육 및 문서화</li>
              <li>유지보수 계획 수립</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* 주요 마일스톤 */}
      <div className="mb-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">주요 마일스톤</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-blue-200 rounded-lg p-4 bg-white">
            <div className="flex items-center mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">M1</span>
              <h4 className="font-semibold text-blue-800">설계 문서 및 프로토타입 승인</h4>
            </div>
            <p className="text-gray-700 pl-11">2주차 완료</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-white">
            <div className="flex items-center mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">M2</span>
              <h4 className="font-semibold text-blue-800">기초 인프라 구축 완료</h4>
            </div>
            <p className="text-gray-700 pl-11">5주차 완료</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-white">
            <div className="flex items-center mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">M3</span>
              <h4 className="font-semibold text-blue-800">핵심 기능 개발 완료</h4>
            </div>
            <p className="text-gray-700 pl-11">11주차 완료</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-white">
            <div className="flex items-center mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">M4</span>
              <h4 className="font-semibold text-blue-800">모든 기능 개발 완료</h4>
            </div>
            <p className="text-gray-700 pl-11">15주차 완료</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-white">
            <div className="flex items-center mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">M5</span>
              <h4 className="font-semibold text-blue-800">테스트 및 최적화 완료</h4>
            </div>
            <p className="text-gray-700 pl-11">18주차 완료</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-white">
            <div className="flex items-center mb-2">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">M6</span>
              <h4 className="font-semibold text-blue-800">프로덕션 배포 및 프로젝트 완료</h4>
            </div>
            <p className="text-gray-700 pl-11">20주차 완료</p>
          </div>
        </div>
      </div>
      
      {/* 리소스 할당 */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">리소스 할당</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-700 mb-2">프론트엔드 팀 (3-4명)</h4>
            <p className="text-gray-700">Next.js, TanStack Query, Zustand, 컴포넌트 개발</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-700 mb-2">백엔드 팀 (2-3명)</h4>
            <p className="text-gray-700">GraphQL API, DGS Framework, WebSocket 구현</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-700 mb-2">AI/ML 팀 (1-2명)</h4>
            <p className="text-gray-700">통화 분석, 감정 분석, 텍스트 추출 기능</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-700 mb-2">QA 팀 (2명)</h4>
            <p className="text-gray-700">테스트 자동화, 품질 보증</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-blue-700 mb-2">DevOps 팀 (1명)</h4>
            <p className="text-gray-700">CI/CD, 배포 자동화, 모니터링</p>
          </div>
        </div>
      </div>
      
      {/* 위험 요소 및 완화 전략 */}
      <div className="mb-4">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">위험 요소 및 완화 전략</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h4 className="font-semibold text-yellow-700 mb-2">기술 스택 학습 곡선</h4>
            <p className="text-gray-700"><span className="font-medium">완화:</span> 초기 학습 기간 확보, 페어 프로그래밍, 외부 전문가 컨설팅</p>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h4 className="font-semibold text-yellow-700 mb-2">복잡한 UI 상태 관리</h4>
            <p className="text-gray-700"><span className="font-medium">완화:</span> 초기 프로토타입 검증, 점진적 구현, 코드 리뷰 강화</p>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h4 className="font-semibold text-yellow-700 mb-2">실시간 데이터 처리 성능</h4>
            <p className="text-gray-700"><span className="font-medium">완화:</span> 초기 부하 테스트, 확장 가능한 아키텍처 설계</p>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <h4 className="font-semibold text-yellow-700 mb-2">AI 통합 복잡성</h4>
            <p className="text-gray-700"><span className="font-medium">완화:</span> MVP 단계적 접근, 외부 API 활용, 대체 솔루션 준비</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationRoadmap;