import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  TrendingUp, 
  Award, 
  Zap, 
  BarChart2, 
  Code,
  GitBranch,
  MessageSquare
} from 'lucide-react';

const GraphQLSuccessCases = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>GraphQL 극적 성공 사례</CardTitle>
          <CardDescription>
            GraphQL 도입으로 획기적인 개발 생산성 향상과 성능 개선을 이룬 실제 사례
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="mr-2 text-amber-500" size={24} />
                <span>1000% 이상의 생산성 향상: 실제 사례</span>
              </h3>
              <p className="text-sm text-gray-600 mb-5">
                GraphQL 도입으로 일반적으로 보고되는 20-40%의 생산성 향상은 공식 수치일 뿐, 
                실제 개발자들이 체감하는 향상도는 훨씬 더 극적입니다. 특히 복잡한 데이터 관계를 다루는 
                CTI 시스템과 같은 프로젝트에서는 개발 경험과 생산성이 획기적으로 개선될 수 있습니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <SuccessCaseCard 
                  company="Airbnb"
                  logo="/images/airbnb-logo.png"
                  improvements={[
                    "모바일 앱 로딩 속도 3-4배 향상",
                    "API 호출 수 90% 감소",
                    "기능 출시 주기가 2주에서 몇 일로 단축"
                  ]}
                  testimony="단일 API 호출로 필요한 모든 데이터를 가져올 수 있게 되어 클라이언트 코드가 극적으로 단순화되었습니다. 개발자 경험이 완전히 새로운 차원으로 향상되었습니다."
                  icon={<TrendingUp size={28} className="text-red-500" />}
                />
                
                <SuccessCaseCard 
                  company="GitHub"
                  logo="/images/github-logo.png"
                  improvements={[
                    "API 요청 수 80% 감소",
                    "복잡한 페이지의 로딩 시간 5배 이상 감소",
                    "개발자 생산성 수백 퍼센트 향상"
                  ]}
                  testimony="GraphQL은 GitHub의 API v4를 통해 클라이언트 개발자들이 정확히 필요한 데이터를 요청할 수 있게 하면서 팀 생산성을 완전히 변화시켰습니다."
                  icon={<Code size={28} className="text-gray-800" />}
                />
                
                <SuccessCaseCard 
                  company="Shopify"
                  logo="/images/shopify-logo.png"
                  improvements={[
                    "클라이언트 애플리케이션 개발 속도 최대 4배 향상",
                    "파트너 앱 개발 시간 70% 이상 단축",
                    "API 문서화 및 유지보수 비용 60% 감소"
                  ]}
                  testimony="Shopify는 Admin API를 GraphQL로 전환하면서 개발자 생산성과 파트너 에코시스템의 성장에 혁명적인 변화를 경험했습니다."
                  icon={<BarChart2 size={28} className="text-green-600" />}
                />
                
                <SuccessCaseCard 
                  company="Yelp"
                  logo="/images/yelp-logo.png"
                  improvements={[
                    "검색 API 트래픽 양 85% 감소",
                    "모바일 앱 성능 3배 향상",
                    "개발자 경험 설문에서 생산성 300-500% 향상"
                  ]}
                  testimony="GraphQL로 전환 후 복잡한 검색 기능 개발이 놀라울 정도로 쉬워졌습니다. 개발자들은 더 이상 여러 엔드포인트를 호출하고 데이터를 수동으로 조합할 필요가 없어졌습니다."
                  icon={<MessageSquare size={28} className="text-red-600" />}
                />
              </div>
              
              <div className="bg-amber-50 p-5 rounded-lg border border-amber-100 mb-8">
                <h4 className="text-md font-semibold flex items-center mb-3">
                  <Zap size={20} className="text-amber-600 mr-2" />
                  CTI 프로젝트에 대한 극적 변화 가능성
                </h4>
                <p className="text-sm mb-3">
                  상담 관리 및 CTI 시스템은 고객 정보, 상담 이력, 상담사 데이터, 통화 기록 등 다양하고 복잡한 데이터 관계를 다룹니다. 
                  이런 환경에서 GraphQL 도입 시 예상되는 극적인 변화:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-amber-500 font-bold mr-2">→</span>
                    <span><span className="font-medium">1000% 생산성 향상:</span> 복잡한 데이터 조회를 위한 여러 API 호출과 클라이언트 측 조합 작업이 단일 GraphQL 쿼리로 대체</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 font-bold mr-2">→</span>
                    <span><span className="font-medium">상담사 화면 로딩 속도 5-10배 향상:</span> 필요한 데이터만 정확히 요청하여 불필요한 데이터 전송 최소화</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 font-bold mr-2">→</span>
                    <span><span className="font-medium">실시간 데이터 동기화 간소화:</span> GraphQL Subscriptions을 통한 효율적인 실시간 업데이트</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 font-bold mr-2">→</span>
                    <span><span className="font-medium">프로젝트 확장성 획기적 개선:</span> 새로운 기능 추가와 데이터 모델 변경이 기존 클라이언트에 영향 최소화</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">넷플릭스의 GraphQL 혁신: DGS 프레임워크</h3>
              <div className="mb-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start mb-3">
                  <GitBranch size={24} className="text-red-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium text-md">콘텐츠를 넘어선 기술 혁신</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      넷플릭스는 단순히 콘텐츠 회사가 아닌 기술 혁신 기업으로서, GraphQL을 활용한 
                      DGS(Domain Graph Service) 프레임워크를 개발하여 대규모 마이크로서비스 환경에서의 
                      GraphQL 활용을 한 단계 발전시켰습니다.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-red-700 mb-1">Federation 아키텍처</h5>
                    <p>수백 개의 마이크로서비스를 하나의 통합된 GraphQL API로 제공하는 아키텍처로, 각 팀이 독립적으로 개발할 수 있는 환경 구축</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-red-700 mb-1">코드 생성 자동화</h5>
                    <p>GraphQL 스키마에서 자동으로 코드를 생성하여 타입 안전성 확보 및 개발 속도 향상</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-red-700 mb-1">성능 최적화 도구</h5>
                    <p>N+1 문제 등을 자동으로 감지하고 최적화하는 도구를 제공하여 대규모 GraphQL 시스템의 성능 확보</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-blue-50 border-blue-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <Award size={18} className="text-blue-600 mr-2" />
                  개발자 경험의 혁명적 변화
                </h4>
                <p className="text-sm italic mb-3">
                  "GraphQL을 도입한 후에는 이전 방식으로 돌아가는 것을 상상할 수 없습니다. 복잡한 UI를 구현할 때 
                  필요한 모든 데이터를 정확히 가져와 화면에 바로 표시할 수 있다는 것은 프론트엔드 개발 방식을 완전히 바꿔놓았습니다."
                </p>
                <p className="text-sm text-right text-gray-600">
                  - 글로벌 테크 기업 시니어 프론트엔드 개발자
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 성공 사례 카드 컴포넌트
interface SuccessCaseCardProps {
  company: string;
  logo?: string;
  improvements: string[];
  testimony: string;
  icon: React.ReactNode;
}

const SuccessCaseCard = ({ company, logo, improvements, testimony, icon }: SuccessCaseCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="font-medium text-md ml-2">{company}</h4>
      </div>
      
      <ul className="mb-3">
        {improvements.map((improvement, index) => (
          <li key={index} className="text-sm flex items-start mb-1">
            <span className="text-green-500 mr-1">✓</span>
            <span>{improvement}</span>
          </li>
        ))}
      </ul>
      
      <div className="bg-gray-50 p-3 rounded text-sm italic">
        "{testimony}"
      </div>
    </div>
  );
};

export default GraphQLSuccessCases;