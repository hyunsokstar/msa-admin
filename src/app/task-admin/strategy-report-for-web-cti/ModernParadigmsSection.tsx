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
  ExternalLink, 
  Users, 
  Zap, 
  BarChart3, 
  TrendingUp, 
  GitMerge, 
  Code2, 
  RefreshCw, 
  MessageSquare,
  Brain
} from 'lucide-react';

const ModernParadigmsSection = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>현대적 프로그래밍 패러다임 및 개발 역량 강화</CardTitle>
          <CardDescription>
            차기 프로젝트 성공을 위한 핵심 개발 패러다임과 팀 역량 강화 전략
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="modern-paradigms" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="modern-paradigms">현대적 패러다임</TabsTrigger>
              <TabsTrigger value="team-capabilities">팀 역량 강화</TabsTrigger>
              <TabsTrigger value="learning-path">학습 로드맵</TabsTrigger>
            </TabsList>

            <TabsContent value="modern-paradigms" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">개발 패러다임의 변화</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {paradigmShifts.map((shift, index) => (
                    <ParadigmCard 
                      key={index}
                      title={shift.title}
                      description={shift.description}
                      icon={shift.icon}
                    />
                  ))}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <h4 className="text-md font-semibold flex items-center mb-2">
                    <Brain size={18} className="text-blue-600 mr-2" />
                    핵심 인사이트
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    "개발은 더 이상 '개인의 실력'만으로 돌파할 수 없다. 시스템은 더 커졌고, 도구는 더 정교해졌으며, 
                    협업은 더 복잡해졌고, 고객의 기대는 더 높아졌다. 단순한 '코드 짜기'가 아닌
                    '가치 설계'와 '커뮤니케이션'까지 포함하는 '시스템화된 실력'이 중요해졌다."
                  </p>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">기술 스택의 진화</h3>
                <p className="text-sm text-gray-600 mb-4">
                  과거에는 '힙한' 기술로 여겨졌던 것들이 이제는 기본 요구사항이 되었습니다. 
                  최신 도구를 사용하는 것은 트렌드가 아닌 '기본 조건'입니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {techEvolution.map((tech, index) => (
                    <TechEvolutionCard 
                      key={index}
                      title={tech.title}
                      past={tech.past}
                      present={tech.present}
                      icon={tech.icon}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team-capabilities" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">조직 문화와 역량 개발</h3>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <Brain size={18} className="text-amber-600 mr-2" />
                  조직 문화에 대한 통찰
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  "기술보다 리더의 말이 법인 조직은 퇴행적이다. 리더의 말이 기술적 타당성보다 우선시되는 순간, 
                  창의성, 자율성, 책임감이 모두 사라지고 남는 것은 '복종만 남은 IT조직'이다."
                </p>
                <p className="text-sm text-gray-700">
                  "변화에 저항하는 조직은 시대적 민폐다. 스타트업은 변화가 없으면 망하고, 대기업은 변화가 없으면 느리게 망한다. 
                  변화 없는 조직은 학습도, 성장도, 리더십도 없고, 사람들만 고통받고, 병들고, 결국은 외면당한다."
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-md font-medium mb-2">효과적인 팀 역량 강화 방법</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teamCapabilities.map((capability, index) => (
                    <CapabilityCard 
                      key={index}
                      title={capability.title}
                      description={capability.description}
                      icon={capability.icon}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium mb-3">현대 개발자/조직의 요구사항</h4>
                <ul className="grid grid-cols-1 gap-2">
                  {modernRequirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="learning-path" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">차기 프로젝트 학습 로드맵</h3>
              <p className="text-sm text-gray-600 mb-4">
                현대적 개발 패러다임과 GraphQL 기술 스택을 연계한 단계별 학습 경로입니다.
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-4 py-1">
                  <h4 className="font-medium">1단계: 기초 개념 및 패러다임 이해</h4>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">GraphQL 학습을 통한 현대적 API 패러다임 이해</h5>
                      <p className="text-sm text-gray-500">GraphQL 개념과 REST API와의 차이점, 현대적 API 설계 원칙</p>
                    </div>
                    <a href="#graphql-basics" className="text-blue-600 hover:text-blue-800">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">컴포넌트 기반 설계와 현대적 UI 아키텍처</h5>
                      <p className="text-sm text-gray-500">컴포넌트 설계 원칙과 GraphQL 기반 데이터 페칭 전략</p>
                    </div>
                    <a href="#graphql-clients" className="text-blue-600 hover:text-blue-800">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-1">
                  <h4 className="font-medium">2단계: 협업과 시스템 이해</h4>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Netflix DGS를 통한 대규모 시스템 설계</h5>
                      <p className="text-sm text-gray-500">MSA 환경에서의 GraphQL 구현과 팀 간 협업 전략</p>
                    </div>
                    <a href="#dgs" className="text-blue-600 hover:text-blue-800">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">국내 기업 사용 사례 연구</h5>
                      <p className="text-sm text-gray-500">실제 현업에서의 도입 전략과 극복한 기술적 과제들</p>
                    </div>
                    <a href="#case-studies" className="text-blue-600 hover:text-blue-800">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4 py-1">
                  <h4 className="font-medium">3단계: 고급 기술과 시스템화된 실력 개발</h4>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">GraphQL Federation과 마이크로서비스 통합</h5>
                      <p className="text-sm text-gray-500">대규모 시스템에서의 그래프 통합과 확장성 확보 전략</p>
                    </div>
                    <a href="#dgs-federation" className="text-blue-600 hover:text-blue-800">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <h5 className="font-medium">성능 최적화와 모니터링</h5>
                      <p className="text-sm text-gray-500">GraphQL 쿼리 최적화, N+1 문제 해결, 캐싱 전략</p>
                    </div>
                    <a href="#graphql-tools" className="text-blue-600 hover:text-blue-800">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
                <h4 className="text-md font-semibold mb-2">학습 계획 수립 방법</h4>
                <p className="text-sm text-gray-700 mb-2">
                  1. 개인 역량 평가: 현재의 기술적 이해도와 경험을 평가하고 부족한 부분을 식별하세요.
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  2. 팀 기반 학습: 위에 제시된 자료를 팀원들과 함께 학습하고 정기적인 지식 공유 세션을 진행하세요.
                </p>
                <p className="text-sm text-gray-700">
                  3. 실습 중심 접근: 실제 프로젝트와 유사한 소규모 프로토타입을 구현하며 학습한 개념을 적용해보세요.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// 패러다임 변화 카드 컴포넌트
interface ParadigmCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ParadigmCard: React.FC<ParadigmCardProps> = ({ title, description, icon }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-md mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

// 기술 진화 카드 컴포넌트
interface TechEvolutionCardProps {
  title: string;
  past: string;
  present: string;
  icon: React.ReactNode;
}

const TechEvolutionCard: React.FC<TechEvolutionCardProps> = ({ title, past, present, icon }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start mb-2">
        <div className="flex-shrink-0 mr-3 mt-1">
          {icon}
        </div>
        <h4 className="font-medium text-md">{title}</h4>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 mb-1">과거 (선택사항)</p>
          <p className="text-sm text-gray-600">{past}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">현재 (필수)</p>
          <p className="text-sm font-medium text-blue-800">{present}</p>
        </div>
      </div>
    </div>
  );
};

// 역량 카드 컴포넌트
interface CapabilityCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CapabilityCard: React.FC<CapabilityCardProps> = ({ title, description, icon }) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-1">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-md mb-1">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

// 패러다임 변화 데이터
const paradigmShifts = [
  {
    title: "개인 역량에서 시스템화된 실력으로",
    description: "단일 개발자의 기술적 우수성보다 팀 전체의 시스템화된 방법론과 협업 능력이 중요해짐",
    icon: <Users size={20} className="text-blue-600" />
  },
  {
    title: "기능 구현에서 가치 설계로",
    description: "코드를 작성하는 것을 넘어 비즈니스 가치를 창출하는 솔루션을 설계하는 방향으로 진화",
    icon: <Zap size={20} className="text-purple-600" />
  },
  {
    title: "정적 아키텍처에서 적응형 아키텍처로",
    description: "변화를 수용하고 확장 가능한 유연한 아키텍처 설계가 기본 요구사항이 됨",
    icon: <BarChart3 size={20} className="text-green-600" />
  },
  {
    title: "수직적 의사결정에서 증거 기반 의사결정으로",
    description: "권위 기반이 아닌 데이터와 증거에 기반한 의사결정 프로세스 확립",
    icon: <TrendingUp size={20} className="text-orange-600" />
  }
];

// 기술 진화 데이터
const techEvolution = [
  {
    title: "API 설계",
    past: "REST API 중심, 느슨한 표준",
    present: "GraphQL, 강력한 타입 시스템, 클라이언트 주도 설계",
    icon: <Code2 size={20} className="text-blue-600" />
  },
  {
    title: "프론트엔드 상태 관리",
    past: "전역 상태 저장소, 복잡한 보일러플레이트",
    present: "TanStack Query, Zustand, 선언적 상태 관리",
    icon: <RefreshCw size={20} className="text-purple-600" />
  },
  {
    title: "마이크로서비스 통합",
    past: "개별 API 게이트웨이, 중복된 데이터 요청",
    present: "GraphQL Federation, DGS, Schema Stitching",
    icon: <GitMerge size={20} className="text-green-600" />
  },
  {
    title: "협업 방식",
    past: "분리된 팀, 순차적 작업 방식",
    present: "크로스 펑셔널 팀, 병렬 개발, 실시간 피드백",
    icon: <MessageSquare size={20} className="text-orange-600" />
  }
];

// 팀 역량 데이터
const teamCapabilities = [
  {
    title: "지속적인 학습 문화",
    description: "새로운 기술과 방법론에 대한 팀 차원의 학습을 장려하고 정기적인 지식 공유 세션 진행",
    icon: <Brain size={20} className="text-blue-600" />
  },
  {
    title: "실험 주도 접근법",
    description: "가설을 세우고 작은 실험을 통해 검증하는 문화, 실패를 학습의 기회로 삼는 마인드셋",
    icon: <Zap size={20} className="text-purple-600" />
  },
  {
    title: "투명한 피드백 시스템",
    description: "권위가 아닌 기술적 타당성에 기반한 건설적인 피드백 교환 시스템 구축",
    icon: <MessageSquare size={20} className="text-green-600" />
  },
  {
    title: "시스템 사고 능력",
    description: "개별 컴포넌트가 아닌 전체 시스템의 맥락에서 문제를 바라보는 관점 개발",
    icon: <BarChart3 size={20} className="text-orange-600" />
  }
];

// 현대적 개발자/조직 요구사항
const modernRequirements = [
  "시스템과 협업을 이해하고 전체적인 맥락에서 개발을 바라볼 수 있어야 함",
  "기술을 빠르게 받아들이고 실천할 수 있는 적응력을 갖추어야 함",
  "끊임없이 스스로를 업그레이드하고 새로운 패러다임을 학습해야 함",
  "자기 의견을 실증 가능한 방식으로 설득할 수 있는 커뮤니케이션 능력 필요",
  "권위가 아니라 증거와 실력에 기반한 의사결정을 추구해야 함"
];

export default ModernParadigmsSection;