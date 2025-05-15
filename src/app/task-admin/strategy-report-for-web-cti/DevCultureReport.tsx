import React from 'react';

const DevCultureReport = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        개발 조직 문화적 장애 요소 및 해결 방안
      </h2>

      {/* 문제점 섹션 */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="bg-red-700 px-4 py-3">
          <h3 className="text-lg font-semibold text-white">주요 문제점</h3>
        </div>
        
        <div className="p-5">
          {/* 문제점 1 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">권위 기반 의사결정 구조</h4>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>논리적 타당성보다 서열이 의사결정 주도</li>
              <li>기득권 보호 메커니즘으로 작용</li>
            </ul>
          </div>
          
          {/* 문제점 2 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">관성 중심 프로세스</h4>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>도구와 방법론의 실효성보다 단순 도입 여부를 평가 지표로 활용</li>
              <li>변화 시도에 대한 업무량 증가 우려로 혁신 저항</li>
              <li>관행 유지가 효율성보다 우선시됨</li>
            </ul>
          </div>
          
          {/* 문제점 3 */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">혁신 제안의 왜곡된 해석</h4>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>시스템 개선 제안이 기존 체제 비판으로 오인</li>
              <li>건설적 피드백이 개인적 평가로 왜곡</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 해결 방안 섹션 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-700 px-4 py-3">
          <h3 className="text-lg font-semibold text-white">해결 방안</h3>
        </div>
        
        <div className="p-5">
          {/* 해결 방안 1 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">객관적 평가 시스템 구축</h4>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>아이디어 가치를 서열과 분리한 블라인드 평가 체계 도입</li>
              <li>기술적 타당성 중심의 의사결정 프로세스 확립</li>
              <li>성과 측정 지표를 실질적 결과물 기반으로 재정의</li>
            </ul>
          </div>
          
          {/* 해결 방안 2 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">혁신 친화적 조직 구조 재편</h4>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>관성적 프로세스의 실효성 정기 평가 체계 마련</li>
              <li>개선 제안에 대한 리스크-리워드 분석 정례화</li>
              <li>변화 관리 전담 역할 지정 및 권한 부여</li>
            </ul>
          </div>
          
          {/* 해결 방안 3 */}
          <div className="mb-5">
            <h4 className="font-bold text-gray-800 mb-2">문화적 변화 관리</h4>
            <ul className="list-disc ml-5 text-gray-700 space-y-1">
              <li>건설적 비판과 개인 평가의 명확한 구분 교육</li>
              <li>혁신 제안자 보호 및 인센티브 제도 마련</li>
              <li>성공적 변화 사례의 가시화 및 보상 체계 구축</li>
            </ul>
          </div>
          
          {/* 결론 */}
          <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200 text-gray-700">
            이러한 구조적 개선은 단순 기술 도입보다 조직 문화 변화에 중점을 두어 장기적 혁신 역량 강화의 기반이 될 것임.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevCultureReport;