import React from 'react';

const TechMasteryCertificationSystem = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        기술 숙련도 인증 시스템: SI 환경에서의 혁신적 조직 모델
      </h2>

      {/* 개요 섹션 */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="bg-indigo-700 px-4 py-3">
          <h3 className="text-lg font-semibold text-white">개요</h3>
        </div>
        
        <div className="p-5">
          <p className="text-gray-700 mb-4">
            특히 기술 도입이 더디고 "야근 = 충성" 같은 문화가 남아있는 SI 조직일수록 기술적 성장과 
            동기부여를 병렬적으로 자극할 수 있는 아이디어가 절실합니다. 이는 단순한 "자격증 놀음"이 아니라, 
            팀 문화 + 기술 수준 + 보상 구조를 동시에 혁신하는 실험적인 조직 모델입니다.
          </p>
        </div>
      </div>

      {/* 혁신적인 이유 섹션 */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="bg-green-700 px-4 py-3">
          <h3 className="text-lg font-semibold text-white">✅ 이 아이디어가 혁신적인 이유</h3>
        </div>
        
        <div className="p-5">
          {/* 이유 1 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">1. 학습의 구조화</h4>
            <p className="text-gray-700 mb-3">
              그냥 "배워봐"가 아니라 로드맵과 실습, 사이드 프로젝트, 배포까지 포함된 실전 퀘스트.
            </p>
            <p className="text-gray-700">
              명확한 기준: "graphql 세미프로2"까지는 누구나 갈 수 있음 → "프로3"은 실무+리더 경험까지 요구.
            </p>
          </div>
          
          {/* 이유 2 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">2. 성과 기반 보상 설계</h4>
            <p className="text-gray-700 mb-3">
              그냥 열심히 한다고 보상이 아니라, "기술적 성과"를 증명하면 혜택을 준다는 점에서 매우 공정함.
            </p>
            <p className="text-gray-700">
              연봉 인상, 주4일제, 휴가, 해외 컨퍼런스 참석 등은 회사도 팀도 성장한 증거로 환원됨.
            </p>
          </div>
          
          {/* 이유 3 */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">3. 기술 도입 저항 최소화</h4>
            <p className="text-gray-700 mb-3">
              새로운 기술을 도입할 때마다 "누구는 했고, 누구는 안 함" → 기술 격차 + 피로감 → 조직 갈등 유발됨.
            </p>
            <p className="text-gray-700">
              근데 자격 제도를 도입하면 도전은 자유지만 보상은 공정하게 → 오히려 건강한 경쟁 유도 가능.
            </p>
          </div>
        </div>
      </div>

      {/* 구체적인 예시 설계 섹션 */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="bg-purple-700 px-4 py-3">
          <h3 className="text-lg font-semibold text-white">💡 구체적인 예시 설계: GraphQL 등 기술 단위로</h3>
        </div>
        
        <div className="p-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">단계</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">레벨명</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">요건</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">보상 예시</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lv1</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">GraphQL 기본 1~3</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">강의 수료 + 개념 정리</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">사내 배지, Slack 인증, 스터디 가산점</td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lv2</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">세미프로 1~3</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">보일러플레이트 구현 + 노트 정리</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">도서비 지원, 스터디 발표 우선권</td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lv3</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">프로 1</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">실무 적용 + 배포</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">연봉 인센티브 3%, 자유 프로젝트 허용</td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lv4</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">프로 2</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">실무 리딩 + 문제 해결</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">주 4일제 3개월, 팀 발표 세션</td>
              </tr>
              <tr>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Lv5</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">프로 3</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">기술 리더 + 평가 참여</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">해외 컨퍼런스 티켓, 연 1회 장기휴가</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 확장 아이디어 섹션 */}
      <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
        <div className="bg-yellow-600 px-4 py-3">
          <h3 className="text-lg font-semibold text-white">🧠 확장 아이디어</h3>
        </div>
        
        <div className="p-5">
          {/* 기술별 인증 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">기술별로 인증:</h4>
            <p className="text-gray-700 mb-3">
              GraphQL, NestJS, Redis, Tanstack Query, Zustand, Turborepo, BFF, SSE, Playwright 등등
            </p>
            <p className="text-gray-700">
              → 직무와 기술 역량을 수평적으로 정의 가능해짐.
            </p>
          </div>
          
          {/* 플랫폼 도입 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">플랫폼 도입:</h4>
            <p className="text-gray-700 mb-3">
              Notion, Supabase, 혹은 내부 인증 시스템으로 정리
            </p>
            <p className="text-gray-700">
              → 인증 요청 → 코드 리뷰 → PR 머지 후 자동 레벨 인증 + NFT 뱃지처럼 시각화 가능
            </p>
          </div>
          
          {/* 연말 이벤트 */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">연말 이벤트:</h4>
            <p className="text-gray-700">
              "올해의 기술 마스터" 투표 or 기술 공헌 포인트 집계
            </p>
          </div>
        </div>
      </div>
      
      {/* 도입 시 고려할 점 섹션 */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-red-600 px-4 py-3">
          <h3 className="text-lg font-semibold text-white">⚠️ 도입 시 고려할 점</h3>
        </div>
        
        <div className="p-5">
          {/* PM/임원 눈치 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">PM/임원 눈치:</h4>
            <p className="text-gray-700 mb-3">
              "이게 왜 필요한데?"라는 반응 나올 수 있음
            </p>
            <p className="text-gray-700">
              → KPI나 비용 효과 측정치로 미리 준비 (예: 도입 전후 배포 속도 비교, 버그율 감소 등)
            </p>
          </div>
          
          {/* 비강제, 자발성 */}
          <div className="mb-5 pb-5 border-b border-gray-200">
            <h4 className="font-bold text-gray-800 mb-2">비강제, 자발성 유지:</h4>
            <p className="text-gray-700 mb-3">
              억지로 하게 되면 오히려 역효과
            </p>
            <p className="text-gray-700">
              → "진짜 하고 싶은 사람만, 대신 혜택은 확실히"가 핵심
            </p>
          </div>
          
          {/* 기술 편중 주의 */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">기술 편중 주의:</h4>
            <p className="text-gray-700 mb-3">
              특정 기술에만 올인하지 말고, 범용적인 구조로 설계 필요
            </p>
            <p className="text-gray-700">
              → 기술 영역별 Level Map을 구성하면 좋음
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechMasteryCertificationSystem;