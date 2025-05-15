import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Database, 
  Code2, 
  ArrowDownSquare, 
  ChevronRight,
  Server,
  RefreshCw,
  Layers,
  GitMerge,
  PhoneCall
} from 'lucide-react';

const GraphQLvsRestComparison = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>GraphQL vs REST: 성능과 N+1 문제에 대한 고찰</CardTitle>
          <CardDescription>
            CTI 프로젝트에서의 API 아키텍처 선택과 N+1 문제 해결 전략
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="n-plus-one" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="n-plus-one">N+1 문제 비교</TabsTrigger>
              <TabsTrigger value="industry-adoption">엔터프라이즈 활용 사례</TabsTrigger>
              <TabsTrigger value="cti-application">CTI 프로젝트 적용성</TabsTrigger>
            </TabsList>

            <TabsContent value="n-plus-one" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">N+1 문제의 기본 이해</h3>
                <p className="text-sm text-gray-600 mb-4">
                  N+1 문제는 ORM을 사용할 때 연관 관계 데이터를 조회하는 과정에서 발생하는 성능 이슈로, 
                  JPA를 사용한 스프링 부트 애플리케이션이나 GraphQL 기반 시스템 모두에서 나타날 수 있습니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <ComparisonCard 
                    title="REST API에서의 N+1 관리"
                    icon={<Server size={20} className="text-blue-600" />}
                    pros={[
                      "엔드포인트별 최적화된 쿼리 작성 가능",
                      "요청 패턴 예측 가능성으로 사전 최적화 용이",
                      "QueryDSL을 통한 타입 안전한 쿼리 최적화",
                      "각 API에 필요한 정확한 JOIN FETCH 구현 가능"
                    ]}
                    cons={[
                      "여러 리소스 조회 시 다중 API 호출 필요",
                      "클라이언트측 데이터 조합 로직 필요",
                      "오버페칭/언더페칭 문제 발생 가능"
                    ]}
                  />
                  
                  <ComparisonCard 
                    title="GraphQL에서의 N+1 관리"
                    icon={<GitMerge size={20} className="text-purple-600" />}
                    pros={[
                      "단일 요청으로 다양한 리소스 조회 가능",
                      "클라이언트 필요에 따른 정확한 데이터 요청",
                      "DataLoader 패턴을 통한 배치 처리 최적화",
                      "스키마 기반 코드 생성 및 타입 안전성"
                    ]}
                    cons={[
                      "동적 쿼리로 인한 최적화 복잡성 증가",
                      "리졸버 기반 구조로 N+1 문제 발생 쉬움",
                      "다양한 필드 조합에 대한 최적화 필요"
                    ]}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <h4 className="text-md font-semibold flex items-center mb-2">
                    <Database size={18} className="text-blue-600 mr-2" />
                    공통된 해결 방법
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span>연관 관계 매핑 시 FetchType 전략 신중한 설계</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span>QueryDSL을 활용한 최적화된 쿼리 작성</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span>JOIN FETCH를 통한 연관 엔티티 일괄 조회</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span>EntityGraph를 활용한 관계 로딩 최적화</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span>BatchSize 설정을 통한 일괄 로딩</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                      <span>DTO 프로젝션으로 필요한 데이터만 조회</span>
                    </li>
                  </ul>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">핵심 차이점</h3>
                <p className="text-sm text-gray-600 mb-4">
                  REST API와 GraphQL 모두 N+1 문제를 다루기 위한 기본 원칙은 동일합니다. 
                  하지만 GraphQL의 동적 쿼리 특성과 리졸버 기반 아키텍처로 인해 추가적인 최적화 계층이 필요할 수 있습니다.
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  <KeyPointCard 
                    title="GraphQL에서 N+1 문제가 더 까다로운 이유"
                    points={[
                      "클라이언트가 요청할 필드 조합을 미리 예측하기 어려움",
                      "각 필드마다 별도의 리졸버가 실행되는 구조적 특성",
                      "중첩된 리졸버 호출로 인한 추가적인 데이터베이스 쿼리 발생 가능성",
                      "다양한 클라이언트 요구사항에 맞춘 유연한 데이터 로딩 전략 필요"
                    ]}
                    icon={<ArrowDownSquare size={20} className="text-amber-600" />}
                  />
                  
                  <KeyPointCard 
                    title="그럼에도 GraphQL이 선택되는 이유"
                    points={[
                      "DataLoader와 같은 특화된 도구를 통한 효과적인 배치 처리",
                      "단일 엔드포인트를 통한 다양한 리소스 접근 용이성",
                      "클라이언트 요구사항 변화에 유연하게 대응 가능",
                      "스키마 기반 계약으로 프론트엔드와 백엔드 팀 간 협업 효율화"
                    ]}
                    icon={<Code2 size={20} className="text-green-600" />}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="industry-adoption" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">빅테크 기업들의 GraphQL 활용 사례</h3>
              <p className="text-sm text-gray-600 mb-4">
                Facebook, Netflix, GitHub와 같은 대규모 데이터를 다루는 기업들이 GraphQL을 채택한 이유와 
                N+1 문제를 어떻게 해결하고 있는지 살펴봅니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <CompanyAdoptionCard 
                  company="Facebook (Meta)"
                  logo={<Code2 size={24} className="text-blue-600" />}
                  caseStudy="GraphQL을 처음 개발한 Facebook은 모바일 앱의 데이터 요청 최적화를 위해 설계했습니다."
                  solutions={[
                    "DataLoader 패턴 개발 및 오픈소스화",
                    "모바일 네트워크 환경에서의 효율적인 데이터 전송 최적화",
                    "GraphQL Relay를 통한 클라이언트 측 캐싱 및 상태 관리"
                  ]}
                />
                
                <CompanyAdoptionCard 
                  company="Netflix"
                  logo={<Layers size={24} className="text-red-600" />}
                  caseStudy="넷플릭스는 마이크로서비스 아키텍처에서 여러 데이터 소스를 통합하기 위해 GraphQL을 도입했습니다."
                  solutions={[
                    "DGS(Domain Graph Service) 프레임워크 개발",
                    "Federation을 통한 대규모 스키마 관리",
                    "JVM 기반 GraphQL 서비스의 성능 최적화 도구"
                  ]}
                />
                
                <CompanyAdoptionCard 
                  company="GitHub"
                  logo={<GitMerge size={24} className="text-gray-800" />}
                  caseStudy="GitHub은 API v4부터 GraphQL을 도입해 API 호출 감소와 개발자 경험 향상을 이루었습니다."
                  solutions={[
                    "Ruby 기반 GraphQL 인프라 최적화",
                    "GraphQL Connection 패턴을 통한 효율적인 페이지네이션",
                    "커스텀 스칼라 타입을 통한 데이터 유효성 검증"
                  ]}
                />
                
                <CompanyAdoptionCard 
                  company="Shopify"
                  logo={<Database size={24} className="text-green-600" />}
                  caseStudy="Shopify는 REST API에서 GraphQL로 전환하여 다양한 클라이언트 요구를 효율적으로 지원하게 되었습니다."
                  solutions={[
                    "GraphQL-Batch 라이브러리 개발 및 오픈소스화",
                    "Ruby 환경에서의 N+1 문제 해결 방안 구현",
                    "스토어프론트 API의 확장성 및 성능 개선"
                  ]}
                />
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <BookOpen size={18} className="text-amber-600 mr-2" />
                  대규모 기업의 GraphQL 도입 이유
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  이러한 기업들이 GraphQL을 선택한 이유는 단순히 N+1 문제를 무시해서가 아니라, 
                  개발 생산성, API 유지보수, 시스템 확장성 측면에서 더 큰 이점을 얻을 수 있었기 때문입니다.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-amber-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>다양한 클라이언트 요구사항에 대응하는 유연성</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-amber-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>마이크로서비스 아키텍처 통합 용이성</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-amber-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>프론트엔드와 백엔드 간 효율적인 커뮤니케이션</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-amber-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>API 버전 관리 부담 감소</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-amber-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>강력한 타입 시스템을 통한 개발 안정성</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-amber-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>Federation을 통한 대규모 API 관리</span>
                  </li>
                </ul>
              </div>
              
              <h4 className="text-md font-medium mb-2">GraphQL의 진화: 2024년 트렌드</h4>
              <p className="text-sm text-gray-600 mb-4">
                최근 GraphQL은 단순한 API 쿼리 언어를 넘어 분산 시스템 통합 플랫폼으로 진화하고 있습니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TrendCard 
                  title="Federation의 부상"
                  description="단일 조직 내 여러 팀이 독립적으로 개발한 GraphQL API를 통합하는 Federation 아키텍처가 주류로 자리잡고 있습니다."
                  icon={<GitMerge size={20} className="text-blue-600" />}
                />
                <TrendCard 
                  title="보안 및 성능 최적화 도구"
                  description="GraphQL의 성능 모니터링, 쿼리 복잡성 제한, 캐싱 전략 등 엔터프라이즈급 도구가 발전하고 있습니다."
                  icon={<RefreshCw size={20} className="text-green-600" />}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="cti-application" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">CTI 프로젝트에서의 GraphQL 적용성</h3>
              <p className="text-sm text-gray-600 mb-4">
                상담 관리나 CTI(Computer Telephony Integration) 프로젝트에서 GraphQL의 적용 가능성과 
                기대할 수 있는 이점, 그리고 N+1 문제 관리 전략을 살펴봅니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <CTIApplicationCard 
                  title="복잡한 데이터 관계 처리"
                  description="상담 기록, 고객 정보, 상담사 정보, 통화 내역 등 다양한 엔티티 간의 복잡한 관계를 한 번의 요청으로 효율적으로 조회할 수 있습니다."
                  benefit="데이터 관계 탐색이 용이하며, 필요한 정보만 선택적으로 요청 가능"
                  icon={<Layers size={24} className="text-blue-600" />}
                />
                
                <CTIApplicationCard 
                  title="다양한 클라이언트 지원"
                  description="상담사 대시보드, 관리자 화면, 모바일 앱 등 다양한 클라이언트가 서로 다른 데이터를 필요로 할 때 GraphQL의 유연성이 큰 장점입니다."
                  benefit="각 클라이언트에 맞춘 별도의 API를 개발할 필요 없음"
                  icon={<PhoneCall size={24} className="text-green-600" />}
                />
                
                <CTIApplicationCard 
                  title="실시간 업데이트"
                  description="GraphQL 구독(Subscription)을 통해 실시간 통화 상태, 상담 큐 등의 정보를 효율적으로 업데이트할 수 있습니다."
                  benefit="WebSocket 기반 실시간 데이터 전송으로 상담 시스템의 반응성 향상"
                  icon={<RefreshCw size={24} className="text-purple-600" />}
                />
                
                <CTIApplicationCard 
                  title="점진적인 마이그레이션"
                  description="기존 REST API가 있더라도, GraphQL을 통해 점진적으로 통합하며 마이그레이션할 수 있습니다."
                  benefit="기존 시스템을 유지하면서 새로운 기능은 GraphQL로 개발 가능"
                  icon={<GitMerge size={24} className="text-amber-600" />}
                />
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
                <h4 className="text-md font-semibold mb-2">CTI 프로젝트에서의 N+1 문제 관리 전략</h4>
                <p className="text-sm text-gray-700 mb-3">
                  CTI 시스템에서 GraphQL을 사용할 때 N+1 문제를 효과적으로 관리하기 위한 전략입니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <StrategyCard 
                    title="핵심 쿼리 패턴 식별 및 최적화"
                    description="자주 사용되는 데이터 조회 패턴을 분석하여 이에 맞게 데이터 로딩 전략을 최적화합니다."
                    steps={[
                      "주요 화면별 데이터 요구사항 분석",
                      "공통 데이터 패턴 식별 및 최적화",
                      "리졸버 로직에 JOIN FETCH 적용"
                    ]}
                  />
                  
                  <StrategyCard 
                    title="DataLoader 활용한 배치 처리"
                    description="연관 데이터를 개별적으로 조회하는 대신 한 번에 배치로 처리하는 패턴을 구현합니다."
                    steps={[
                      "DataLoader 패턴 구현",
                      "연관 엔티티 ID 기반 일괄 조회",
                      "리졸버 결과 캐싱으로 중복 요청 방지"
                    ]}
                  />
                  
                  <StrategyCard 
                    title="QueryDSL 활용한 동적 쿼리 최적화"
                    description="다양한 필드 조합을 효율적으로 처리할 수 있는 동적 쿼리를 구성합니다."
                    steps={[
                      "GraphQL 쿼리 분석 및 필요 필드 추출",
                      "QueryDSL로 필요한 필드만 선택적 조회",
                      "프로젝션을 통한 DTO 기반 결과 반환"
                    ]}
                  />
                  
                  <StrategyCard 
                    title="페이징 및 필터링 최적화"
                    description="대량의 데이터를 효율적으로 페이징하고 필터링하는 전략을 구현합니다."
                    steps={[
                      "Cursor 기반 페이지네이션 구현",
                      "Connection 패턴으로 일관된 페이징 처리",
                      "인덱스 전략을 활용한 필터링 최적화"
                    ]}
                  />
                </div>
              </div>
              
              <h4 className="text-md font-medium mb-2">결론: CTI 프로젝트에서의 API 선택</h4>
              <p className="text-sm text-gray-600 mb-4">
                CTI나 상담 관리 시스템과 같은 프로젝트에서 GraphQL은 N+1 문제를 관리하는 추가 작업이 필요하지만, 
                그 이상의 가치(유연성, 개발 생산성, API 일관성 등)를 제공할 수 있어 충분히 좋은 선택이 될 수 있습니다.
              </p>
              
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">권장 접근 방식</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>비즈니스 요구사항과 데이터 접근 패턴을 기반으로 API 아키텍처 선택</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>GraphQL 도입 시 N+1 문제를 포함한 성능 관리 전략 함께 수립</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>단계적 도입: 핵심 기능부터 GraphQL 적용 후 확장</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={16} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                    <span>성능 모니터링 및 최적화를 위한 도구 구축</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// 비교 카드 컴포넌트
type ComparisonCardProps = {
  title: string;
  icon: React.ReactNode;
  pros: string[];
  cons: string[];
};

const ComparisonCard = ({ title, icon, pros, cons }: ComparisonCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <h4 className="font-medium text-md">{title}</h4>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-green-700 mb-1">장점</p>
          <ul className="space-y-1">
            {pros.map((pro, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-green-500 mr-1">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-red-700 mb-1">단점</p>
          <ul className="space-y-1">
            {cons.map((con, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-red-500 mr-1">✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// 핵심 포인트 카드 컴포넌트
type KeyPointCardProps = {
  title: string;
  points: string[];
  icon: React.ReactNode;
};

const KeyPointCard = ({ title, points, icon }: KeyPointCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="font-medium text-md ml-2">{title}</h4>
      </div>
      <ul className="space-y-1">
        {points.map((point, index) => (
          <li key={index} className="text-sm flex items-start">
            <ChevronRight size={16} className="text-blue-500 mt-0.5 mr-1 flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 기업 도입 사례 카드 컴포넌트
type CompanyAdoptionCardProps = {
  company: string;
  logo: React.ReactNode;
  caseStudy: string;
  solutions: string[];
};

const CompanyAdoptionCard = ({ company, logo, caseStudy, solutions }: CompanyAdoptionCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-3">
        {logo}
        <h4 className="font-medium text-md ml-2">{company}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{caseStudy}</p>
      <p className="text-xs font-medium text-blue-700 mb-1">N+1 문제 해결 방식</p>
      <ul className="space-y-1">
        {solutions.map((solution, index) => (
          <li key={index} className="text-sm flex items-start">
            <ChevronRight size={16} className="text-blue-500 mt-0.5 mr-1 flex-shrink-0" />
            <span>{solution}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 트렌드 카드 컴포넌트
type TrendCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const TrendCard = ({ title, description, icon }: TrendCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium text-md ml-2">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

// CTI 적용성 카드 컴포넌트
type CTIApplicationCardProps = {
  title: string;
  description: string;
  benefit: string;
  icon: React.ReactNode;
};

const CTIApplicationCard = ({ title, description, benefit, icon }: CTIApplicationCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium text-md ml-2">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="bg-gray-50 p-2 rounded text-sm">
        <span className="font-medium">주요 이점:</span> {benefit}
      </div>
    </div>
  );
};

// 전략 카드 컴포넌트
type StrategyCardProps = {
  title: string;
  description: string;
  steps: string[];
};

const StrategyCard = ({ title, description, steps }: StrategyCardProps) => {
  return (
    <div className="p-3 border rounded-lg bg-white">
      <h5 className="font-medium text-sm mb-1">{title}</h5>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <div className="space-y-1">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <span className="bg-green-100 text-green-800 text-xs rounded-full w-4 h-4 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">{index + 1}</span>
            <p className="text-xs">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphQLvsRestComparison;