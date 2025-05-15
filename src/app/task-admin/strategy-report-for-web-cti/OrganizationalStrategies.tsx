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
  Users, 
  GitMerge, 
  AlertTriangle, 
  FileCode,
  UserCheck,
  MessageSquare,
  GitBranch,
  Code2,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';

const OrganizationalStrategies = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>GraphQL 도입의 조직적 측면: 팀 간 갈등 완화 전략</CardTitle>
          <CardDescription>
            API 설계와 소유권 변화에 따른 팀 간 갈등을 방지하고 협업을 강화하기 위한 실질적 접근법
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="conflicts" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="conflicts">잠재적 갈등 요소</TabsTrigger>
              <TabsTrigger value="strategies">갈등 완화 전략</TabsTrigger>
              <TabsTrigger value="implementation">조직 적용 방안</TabsTrigger>
            </TabsList>

            <TabsContent value="conflicts" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">GraphQL 도입에 따른 팀 간 갈등의 본질</h3>
                <p className="text-sm text-gray-600 mb-4">
                  GraphQL 도입은 단순히 기술 스택 하나를 바꾸는 수준이 아니라, API 설계·소유권·개발 워크플로우 
                  전반을 새롭게 정의하는 '거대한 변화'입니다. 특히 SI 조직 특유의 수직적 문화 아래서는 
                  백엔드팀과 프론트엔드팀 간 역할과 책임을 둘러싼 갈등이 발생할 가능성이 큽니다.
                </p>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-6">
                  <h4 className="text-md font-semibold flex items-center mb-3">
                    <AlertTriangle size={18} className="text-red-600 mr-2" />
                    전형적인 팀 간 갈등 시나리오
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ConflictScenarioCard 
                      role="백엔드 시니어"
                      quote="REST도 잘 못 다루면서 왜 이상한 GraphQL을 도입하느냐"
                      concerns={[
                        "성능 이슈(N+1 문제 등)에 대한 우려",
                        "기존 인프라와의 통합 문제",
                        "추가적인 학습 부담",
                        "통제력 상실에 대한 불안"
                      ]}
                      icon={<Code2 size={24} className="text-purple-600" />}
                    />
                    
                    <ConflictScenarioCard 
                      role="프론트엔드 개발자"
                      quote="우리가 원하는 데이터를 빠르게 뽑아오려는데, 백엔드 로직이 발목을 잡는다"
                      concerns={[
                        "API 요청 최적화에 대한 욕구",
                        "클라이언트 개발 속도 지연",
                        "데이터 접근성에 대한 제약",
                        "UI 요구사항에 따른 빠른 변경 필요성"
                      ]}
                      icon={<FileCode size={24} className="text-blue-600" />}
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">갈등의 근본 원인 분석</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <ConflictRootCard 
                    title="소유권 불명확"
                    description="GraphQL 스키마와 API 설계에 대한 소유권과 최종 의사결정 주체가 명확하지 않아 발생하는 갈등"
                    icon={<ShieldCheck size={20} className="text-amber-600" />}
                  />
                  
                  <ConflictRootCard 
                    title="역할 혼란"
                    description="백엔드와 프론트엔드의 전통적 경계가 모호해지면서 발생하는 책임 범위와 역할 충돌"
                    icon={<Users size={20} className="text-amber-600" />}
                  />
                  
                  <ConflictRootCard 
                    title="익숙함에 대한 집착"
                    description="기존 방식에 익숙한 개발자들이 변화에 저항하며 발생하는 심리적 장벽과 갈등"
                    icon={<AlertTriangle size={20} className="text-amber-600" />}
                  />
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <UserCheck size={18} className="text-gray-700 mr-2" />
                    조직 문화의 영향
                  </h4>
                  <p className="text-sm text-gray-600">
                    SI 조직의 수직적 문화는 이러한 갈등을 더욱 심화시킬 수 있습니다. 명확한 의사소통 채널 부재, 
                    부서 간 사일로화, 성과 평가 기준의 차이 등이 기술적 변화에 대한 저항을 증폭시키는 요인이 됩니다. 
                    GraphQL 도입을 성공적으로 이끌기 위해서는 기술적 측면뿐만 아니라 조직 문화적 측면에서의 
                    변화 관리가 필수적입니다.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="strategies" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">팀 간 갈등 최소화를 위한 전략</h3>
              <p className="text-sm text-gray-600 mb-4">
                GraphQL 도입 과정에서 발생할 수 있는 팀 간 갈등을 최소화하고 협업을 강화하기 위한 
                실질적인 전략들을 살펴봅니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <StrategyCard 
                  title="스키마 주도 설계(Contract-First)"
                  description="GraphQL SDL로 먼저 'API 계약(API Contract)'을 모두가 합의하고 문서화"
                  benefits={[
                    "프론트가 필요한 쿼리·타입을 제안하면, 백엔드는 그 SDL을 기반으로 리졸버를 구현",
                    "계약이 명확하니 \"니가 뭔데\" 싸움이 \"이 스키마가 정식 계약이니 따라주세요\" 수준으로 변화",
                    "논쟁의 초점이 개인 선호에서 문서화된 스키마로 이동하여 객관적 소통 가능"
                  ]}
                  icon={<FileCode size={24} className="text-blue-600" />}
                />
                
                <StrategyCard 
                  title="크로스펑셔널 팀 구성"
                  description="기능 단위(예: 로그인, 채팅, 대시보드)로 백엔드·프론트엔드·QA·PO가 한 팀을 이뤄 끝까지 책임"
                  benefits={[
                    "GraphQL 스키마 리뷰, 코드 리뷰도 반드시 해당 기능 팀 내에서 진행",
                    "사일로를 깨고, 서로의 관점(성능, UX, 보안)을 자연스럽게 교환",
                    "공동 책임 의식 형성으로 '우리 vs 그들' 사고방식 탈피"
                  ]}
                  icon={<Users size={24} className="text-green-600" />}
                />
                
                <StrategyCard 
                  title="파일럿 프로젝트(PoC) 운영"
                  description="작은 서비스(예: 메시지 알림) 하나를 GraphQL+BFF로 재구성하며 실증적 경험 축적"
                  benefits={[
                    "성능·운영·개발 생산성 데이터를 정량으로 수집 → 현업 리더에게 제시",
                    "\"성공사례가 있으니, 다음 기능도 이렇게 가보자\"는 선순환 형성",
                    "실패해도 영향이 제한적이며, 학습 기회로 활용 가능"
                  ]}
                  icon={<GitBranch size={24} className="text-purple-600" />}
                />
                
                <StrategyCard 
                  title="기술 중재자(Tech Champion) 지정"
                  description="백·프론트 양쪽 이해도를 가진 개발자 1–2명을 'GraphQL 챔피언'으로 육성"
                  benefits={[
                    "구현·문서화·교육·코드 레벨에서 갈등이 생길 때마다 \"이 부분은 스키마에서 이렇게...\"라고 조율",
                    "외부 컨설팅이나 내부 교육 세션을 정기적으로 운영하여 조직 전반의 러닝 커브 낮춤",
                    "팀 간 소통의 가교 역할 수행으로 갈등 조기 해소"
                  ]}
                  icon={<UserCheck size={24} className="text-amber-600" />}
                />
              </div>
              
              <div className="mb-6">
                <StrategyCard 
                  title="점진적 마이그레이션 & BFF 계층 활용"
                  description="기존 REST 엔드포인트를 한꺼번에 바꾸지 않고, Next.js API 라우트나 별도 BFF 계층에서 GraphQL 껍데기를 띄움"
                  benefits={[
                    "점진적으로 레졸버 내부에서 REST 호출을 GraphQL로 대체",
                    "충돌 지점을 최소화하며, 백엔드 시니어들도 \"당장 전체를 바꾸는 게 아니다\"라는 심적 부담 감소",
                    "검증된 기능부터 단계적으로 전환하여 위험 분산"
                  ]}
                  icon={<GitMerge size={24} className="text-indigo-600" />}
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <CheckCircle size={18} className="text-blue-600 mr-2" />
                  효과적인 전략 적용을 위한 핵심 원칙
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">→</span>
                    <span><span className="font-medium">투명성 유지:</span> 모든 의사결정과 전략의 이유를 투명하게 공유하여 불확실성과 추측 방지</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">→</span>
                    <span><span className="font-medium">점진적 접근:</span> 한 번에 모든 것을 바꾸려 하지 말고, 작은 성공을 통해 신뢰 구축</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">→</span>
                    <span><span className="font-medium">공동 목표 설정:</span> 팀 간 경쟁보다 공통된 비즈니스 가치와 목표에 집중</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">→</span>
                    <span><span className="font-medium">지속적 학습 문화:</span> 실패를 비난하지 않고 학습의 기회로 삼는 문화 조성</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="implementation" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">조직 적용을 위한 실행 계획</h3>
              <p className="text-sm text-gray-600 mb-4">
                앞서 제시한 갈등 완화 전략을 조직에 효과적으로 적용하기 위한 구체적인 실행 계획과 
                단계별 접근법을 살펴봅니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ImplementationCard 
                  phase="1단계: 준비 및 인식 구축"
                  activities={[
                    {
                      title: "GraphQL 워크숍 개최",
                      details: "백엔드와 프론트엔드 개발자들을 위한 공동 워크숍으로 기본 개념과 이점 공유"
                    },
                    {
                      title: "스키마 설계 세션",
                      details: "양 팀이 함께 참여하는 스키마 설계 세션을 통해 API 계약 초안 작성"
                    },
                    {
                      title: "역할 및 책임 정의",
                      details: "GraphQL 도입 과정에서의 각 팀과 구성원의 역할 명확화"
                    }
                  ]}
                  outcomes="GraphQL에 대한 공통 이해 형성 및 초기 스키마 구조 합의"
                />
                
                <ImplementationCard 
                  phase="2단계: 파일럿 프로젝트 실행"
                  activities={[
                    {
                      title: "기능 선정 및 팀 구성",
                      details: "영향이 제한적인 기능을 선정하고 크로스펑셔널 파일럿 팀 구성"
                    },
                    {
                      title: "BFF 계층 구현",
                      details: "Next.js API 라우트 또는 별도 서비스로 GraphQL BFF 구현"
                    },
                    {
                      title: "성과 측정 체계 수립",
                      details: "개발 생산성, 성능, 협업 효율성 등 주요 지표 설정 및 추적"
                    }
                  ]}
                  outcomes="실질적인 GraphQL 구현 경험 축적 및 성과 데이터 확보"
                />
                
                <ImplementationCard 
                  phase="3단계: 조직 확산 및 문화 정착"
                  activities={[
                    {
                      title: "성공 사례 공유 세션",
                      details: "파일럿 프로젝트의 성과와 교훈을 전체 조직에 공유"
                    },
                    {
                      title: "GraphQL 가이드라인 수립",
                      details: "스키마 설계, 네이밍 컨벤션, 성능 최적화 등의 표준 가이드라인 작성"
                    },
                    {
                      title: "기술 중재자 확대",
                      details: "추가 GraphQL 챔피언 육성 및 교육자 역할 부여"
                    }
                  ]}
                  outcomes="GraphQL 접근법의 조직 내 표준화 및 협업 문화 확산"
                />
                
                <ImplementationCard 
                  phase="4단계: 지속적 개선 및 최적화"
                  activities={[
                    {
                      title: "정기적인 회고 및 개선",
                      details: "월간 GraphQL 회고 세션을 통한 문제점 식별 및 해결 방안 모색"
                    },
                    {
                      title: "고급 패턴 도입",
                      details: "Federation, 코드 생성, 캐싱 등 고급 GraphQL 패턴 점진적 도입"
                    },
                    {
                      title: "성과 평가 및 보상 조정",
                      details: "협업과 지식 공유에 기반한 성과 평가 체계 도입"
                    }
                  ]}
                  outcomes="GraphQL 활용의 성숙도 향상 및 협업 문화의 지속적 발전"
                />
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-3 flex items-center">
                  <MessageSquare size={18} className="text-gray-700 mr-2" />
                  커뮤니케이션 전략
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">리더십 설득을 위한 메시징</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        <span>비즈니스 가치와 ROI 중심의 논의</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        <span>위험 관리 및 점진적 접근에 대한 강조</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        <span>경쟁사 사례 및 산업 트렌드 제시</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">개발자 설득을 위한 메시징</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        <span>개발 경험 향상 및 기술적 이점 강조</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        <span>학습 및 성장 기회로서의 프레이밍</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-1">•</span>
                        <span>구체적인 문제 해결 사례 공유</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg mt-4 bg-blue-50 border-blue-100">
                <h4 className="font-medium mb-2 flex items-center">
                  <CheckCircle size={18} className="text-blue-600 mr-2" />
                  결론: 기술을 넘어선 조직 혁신
                </h4>
                <p className="text-sm">
                  SI 조직에서도 "GraphQL 도입 = 팀 간 싸움"으로 끝나지 않으려면, 기술적 로드맵뿐 아니라 
                  조직 구조·문화·프로세스 차원의 준비가 필수적입니다. 리더십이 "이게 왜 필요한지, 어떤 가치를 줄지"를 
                  명확히 제시하고, 위와 같은 전략을 통해 갈등을 예방·조율한다면, 오히려 백엔드·프론트엔드가 
                  동일한 목표 아래 협업하는 발전적 계기로 만들 수 있습니다. GraphQL 도입은 단순한 기술 변화가 아닌, 
                  조직 문화의 혁신을 위한 촉매제가 될 수 있습니다.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// 갈등 시나리오 카드 컴포넌트
interface ConflictScenarioCardProps {
  role: string;
  quote: string;
  concerns: string[];
  icon: React.ReactNode;
}

const ConflictScenarioCard = ({ role, quote, concerns, icon }: ConflictScenarioCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium text-md ml-2">{role}</h4>
      </div>
      <div className="bg-gray-50 p-3 rounded mb-3 text-sm italic">
        "{quote}"
      </div>
      <p className="text-xs font-medium text-gray-700 mb-1">주요 우려 사항:</p>
      <ul className="space-y-1">
        {concerns.map((concern, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="text-red-500 mr-1">•</span>
            <span>{concern}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 갈등 근본 원인 카드 컴포넌트
interface ConflictRootCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ConflictRootCard = ({ title, description, icon }: ConflictRootCardProps) => {
  return (
    <div className="p-3 border rounded-lg bg-white">
      <div className="flex items-center mb-2">
        {icon}
        <h5 className="font-medium text-sm ml-2">{title}</h5>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
};

// 전략 카드 컴포넌트
interface StrategyCardProps {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
}

const StrategyCard = ({ title, description, benefits, icon }: StrategyCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <h4 className="font-medium text-md">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <ul className="space-y-1">
        {benefits.map((benefit, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="text-green-500 mr-1">→</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 구현 카드 컴포넌트
interface Activity {
  title: string;
  details: string;
}

interface ImplementationCardProps {
  phase: string;
  activities: Activity[];
  outcomes: string;
}

const ImplementationCard = ({ phase, activities, outcomes }: ImplementationCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h4 className="font-medium text-blue-800 mb-3">{phase}</h4>
      <div className="space-y-3 mb-3">
        {activities.map((activity, index) => (
          <div key={index} className="bg-gray-50 p-2 rounded text-sm">
            <p className="font-medium">{activity.title}</p>
            <p className="text-gray-600 text-xs">{activity.details}</p>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 p-2 rounded text-sm">
        <span className="font-medium">기대 성과:</span> {outcomes}
      </div>
    </div>
  );
};

export default OrganizationalStrategies;