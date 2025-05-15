import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  RefreshCw,
  ArrowUpRight,
  Check,
  X,
  BarChart,
  Users,
  Layers
} from 'lucide-react';

const StrategicInsights = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle>전략적 통찰: SI 환경에서의 변화와 혁신</CardTitle>
          <CardDescription>
            기존 SI 환경의 한계를 넘어 모던 아키텍처와 GraphQL로의 전환을 위한 핵심 통찰
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-6 border-b">
            <div className="flex items-center mb-4">
              <Zap size={24} className="text-amber-500 mr-3" />
              <h3 className="text-lg font-semibold">전략적 분석 요약</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              GraphQL과 모던 아키텍처 도입을 위한 CTI 프로젝트 전략 보고서의 핵심 통찰을 요약합니다. 
              기존 SI 환경의 구조적 한계부터 필요한 전환 방향, 그리고 구체적인 실행 방안까지 
              체계적으로 분석한 내용입니다.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <blockquote className="text-sm italic text-gray-700">
                "구조적·체계적 아키텍처 설계가 반드시 뒷받침되어야 하며, 드론·탱크처럼 기술 혁신과 생산성 
                두 축을 동시에 가져가야만 경쟁력이 유지됩니다. 특히 규모와 복잡도가 커진 만큼, 개인 역량에만 
                기대서는 안 되고, 체계적인 플랫폼·아키텍처가 먼저 깔려야 합니다."
              </blockquote>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b">
            <div>
              <div className="flex items-center mb-3">
                <AlertTriangle size={20} className="text-red-500 mr-2" />
                <h4 className="font-semibold">기존 SI의 한계</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <ChallengeItem 
                  challenge="아키텍처 개선 시도 자체가 '너무 어렵다'는 이유로 미루어짐"
                  result="혁신의 지연과 기술 부채 누적"
                />
                <ChallengeItem 
                  challenge="최소한의 기능 구현조차 불안정하게 넘어가는 현실"
                  result="장기적 품질 문제와 유지보수 비용 증가"
                />
                <ChallengeItem 
                  challenge="수직적·단절된 커뮤니케이션 구조"
                  result="정보 흐름 제한 및 협업 효율성 저하"
                />
                <ChallengeItem 
                  challenge="최신 패러다임 도입에 대한 냉소적 태도 ('니가 가라 하와이')"
                  result="기술적 정체와 경쟁력 약화"
                />

              </ul>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <BarChart size={20} className="text-amber-500 mr-2" />
                <h4 className="font-semibold">과거의 도입 장벽</h4>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-4">
                <h5 className="font-medium text-amber-800 mb-2">과거 GraphQL 도입의 주요 장벽</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>러닝 커브가 너무 가파르고</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>기술 성숙도가 미흡하며</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span>도입해도 오버스펙이 될 수 있다는 우려</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex items-center mb-3">
                <TrendingUp size={20} className="text-blue-500 mr-2" />
                <h4 className="font-semibold">현재의 변화된 환경</h4>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <ArrowUpRight size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>프로젝트 규모가 마치 50층 빌딩처럼 거대·복잡해져서</span>
                </li>
                <li className="flex items-start">
                  <ArrowUpRight size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>모던 아키텍처 없이는 감당하기 어려운 상황</span>
                </li>
                <li className="flex items-start">
                  <ArrowUpRight size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>"개발자 개인의 영웅적 활약"에 의존하는 건 비현실적</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <RefreshCw size={20} className="text-green-500 mr-2" />
                <h4 className="font-semibold">필요한 전환</h4>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h5 className="font-medium text-green-800 mb-2">
                  삼성 이건희 회장의 "무조건 바꿔야 한다"는 철학처럼
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>감성·창의성만으로는 부족하고,</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>구조적·체계적 아키텍처 설계가 반드시 뒷받침되어야 함</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>드론·탱크처럼 기술 혁신과 생산성 두 축을 동시에 가져가야만 경쟁력이 유지</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <Layers size={20} className="text-purple-500 mr-2" />
                <h4 className="font-semibold">실행 방향</h4>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">단계별 접근 전략</h5>
                  <Users size={18} className="text-purple-500" />
                </div>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                    <span>작은 성공 사례(PoC)로 모던 스택 도입을 입증하고,</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                    <span>조직 차원의 교육 및 가이드라인을 세워</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                    <span>아키텍처 리뷰 문화를 정착시키는</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                    <span>사이클을 꾸준히 돌린다면, "소수의 창의성"을 넘어 "전체 조직의 혁신"으로 이어질 수 있을 것입니다.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          
          <div className="p-6 pt-0">
            <div className="flex justify-between items-center">
              <div className="flex-1 h-px bg-gray-200"></div>
              <div className="px-4 text-sm font-medium text-gray-500">결론</div>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p>
                  <span className="font-medium">규모와 복잡도가 커진 만큼,</span> 개인 역량에만 기대서는 안 되고, 
                  체계적인 플랫폼·아키텍처가 먼저 깔려야 합니다. GraphQL을 비롯한 모던 아키텍처 도입은 
                  단순한 기술 트렌드 추구가 아닌, 현대 SI 환경에서 프로젝트 성공을 위한 필수적인 전략적 선택입니다.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 도전 과제 아이템 컴포넌트
interface ChallengeItemProps {
  challenge: string;
  result: string;
}

const ChallengeItem = ({ challenge, result }: ChallengeItemProps) => {
  return (
    <li className="flex flex-col space-y-1">
      <div className="flex items-start">
        <X size={14} className="text-red-500 mt-1 mr-2 flex-shrink-0" />
        <span>{challenge}</span>
      </div>
      <div className="ml-6 text-xs text-gray-500">
        → 결과: {result}
      </div>
    </li>
  );
};

export default StrategicInsights;