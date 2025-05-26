import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Server, 
  Database, 
  MessageSquare, 
  Zap, 
  GitBranch,
  Monitor,
  Layout,
  Code,
  Timer,
  CheckCircle,
  Globe,
  Settings,
  Users,
  FileText,
  Calendar,
  Target,
  TrendingUp,
  Award,
  Cpu,
  Network,
  Shield,
  BarChart2
} from 'lucide-react';

const CTIMSAImplementationPlan = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">차세대 웹 CTI MSA 아키텍처 2주 구현 계획</CardTitle>
          <CardDescription>
            현대적 마이크로서비스 아키텍처 기반 콜센터 솔루션 보일러플레이트 구축 로드맵
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* 아키텍처 개요 섹션 */}
            <ImplementationCategorySection 
              title="핵심 아키텍처 구성" 
              icon={<Network className="text-blue-500" size={24} />}
              description="GraphQL Federation 기반 마이크로서비스와 실시간 통신을 지원하는 현대적 아키텍처"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImplementationCard
                  title="NestJS GraphQL Gateway + Schema Federation"
                  description="마이크로서비스별 스키마 통합, 클라이언트 단일 진입점 제공"
                  icon={<Server size={24} className="text-pink-600" />}
                  timeEstimate="1-2일"
                />
                
                <ImplementationCard
                  title="Spring Boot 마이크로서비스 (실시간 통신, 상담 관리, 사용자 관리)"
                  description="JPA 기반 CRUD API, 도메인별 책임 분리"
                  icon={<Code size={24} className="text-green-600" />}
                  timeEstimate="3-4일"
                />
                
                <ImplementationCard
                  title="Redis/RabbitMQ/Kafka 메시지 큐 시스템"
                  description="비동기 이벤트 전파, 서비스 간 느슨한 결합"
                  icon={<MessageSquare size={24} className="text-orange-600" />}
                  timeEstimate="2-3일"
                />

                <ImplementationCard
                  title="PostgreSQL/MySQL + Redis 캐시"
                  description="관계형 DB 설계, 성능 최적화를 위한 캐시 계층"
                  icon={<Database size={24} className="text-indigo-600" />}
                  timeEstimate="1일"
                />
              </div>
            </ImplementationCategorySection>

            {/* 1주차 계획 */}
            <ImplementationCategorySection 
              title="1주차: 인프라 기반 구축" 
              icon={<Calendar className="text-green-600" size={24} />}
              description="개발 환경 셋업 및 핵심 마이크로서비스 구현"
            >
              <div className="space-y-4">
                <WeeklyPlan weekNumber="1" days={[
                  {
                    day: "1-2일차",
                    title: "프로젝트 기반 환경 구축",
                    tasks: [
                      "Docker Compose 멀티 서비스 환경 구성",
                      "NestJS API Gateway + GraphQL Federation 기본 설정",
                      "Service Discovery (Consul/Eureka) 구성",
                      "개발용 데이터베이스 스키마 초기 설계"
                    ],
                    icon: <Settings size={20} className="text-blue-600" />
                  },
                  {
                    day: "3-4일차", 
                    title: "핵심 마이크로서비스 개발",
                    tasks: [
                      "실시간 통신 서비스 (WebSocket + Spring Boot)",
                      "상담 관리 서비스 (상담 세션, 통화 이력 CRUD)",
                      "사용자 관리 서비스 (상담원, 고객 관리)",
                      "각 서비스별 JPA Entity 매핑 완료"
                    ],
                    icon: <Code size={20} className="text-green-600" />
                  },
                  {
                    day: "5일차",
                    title: "데이터베이스 연동 및 기본 테스트",
                    tasks: [
                      "PostgreSQL/MySQL 스키마 적용",
                      "Redis 캐시 연동 및 세션 관리",
                      "기본 CRUD API 동작 확인",
                      "서비스 간 Health Check 구현"
                    ],
                    icon: <Database size={20} className="text-purple-600" />
                  }
                ]} />
              </div>
            </ImplementationCategorySection>

            {/* 2주차 계획 */}
            <ImplementationCategorySection 
              title="2주차: 실시간 기능 및 통합" 
              icon={<Calendar className="text-orange-600" size={24} />}
              description="실시간 채팅, 이벤트 시스템 구현 및 GraphQL Federation 통합"
            >
              <div className="space-y-4">
                <WeeklyPlan weekNumber="2" days={[
                  {
                    day: "6-8일차",
                    title: "실시간 채팅/메신저 시스템",
                    tasks: [
                      "WebSocket 서버 구현 (Socket.IO + NestJS)",
                      "Redis Pub/Sub 메시지 브로드캐스팅",
                      "채팅방 관리 (1:1 상담, 그룹 채팅)",
                      "메시지 히스토리 저장 및 조회 API"
                    ],
                    icon: <MessageSquare size={20} className="text-blue-600" />
                  },
                  {
                    day: "9-10일차",
                    title: "이벤트 전파 시스템 구축",
                    tasks: [
                      "RabbitMQ/Kafka 이벤트 버스 연동",
                      "상담원 상태 변경 이벤트 (Available, Busy, Away)",
                      "통화 상태 이벤트 전파 (Incoming, Active, Ended)",
                      "마이크로서비스 간 비동기 통신 테스트"
                    ],
                    icon: <Zap size={20} className="text-yellow-600" />
                  },
                  {
                    day: "11-12일차",
                    title: "GraphQL Federation 통합",
                    tasks: [
                      "각 마이크로서비스 GraphQL 스키마 정의",
                      "Schema Federation으로 통합 API 구성",
                      "프론트엔드 연동 테스트 (Apollo Client)",
                      "실시간 Subscription 기능 테스트"
                    ],
                    icon: <Globe size={20} className="text-indigo-600" />
                  },
                  {
                    day: "13-14일차",
                    title: "테스트 & 문서화",
                    tasks: [
                      "통합 테스트 시나리오 작성 및 실행",
                      "GraphQL Playground API 문서 정리",
                      "Docker Compose 배포 스크립트 최적화",
                      "README 및 아키텍처 문서 작성"
                    ],
                    icon: <FileText size={20} className="text-green-600" />
                  }
                ]} />
              </div>
            </ImplementationCategorySection>

            {/* 기술 스택 상세 */}
            <ImplementationCategorySection 
              title="핵심 기술 스택 선택 근거" 
              icon={<Cpu className="text-purple-600" size={24} />}
              description="검증된 기술과 최신 패러다임을 결합한 최적의 기술 조합"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ImplementationCard
                  title="NestJS (API Gateway)"
                  description="GraphQL Federation 네이티브 지원, TypeScript 기반, 엔터프라이즈 아키텍처 패턴"
                  icon={<Server size={24} className="text-red-600" />}
                  timeEstimate="선택 이유: 확장성"
                />
                
                <ImplementationCard
                  title="Spring Boot (마이크로서비스)"
                  description="엔터프라이즈급 안정성, JPA/Hibernate ORM, 풍부한 생태계"
                  icon={<Shield size={24} className="text-green-700" />}
                  timeEstimate="선택 이유: 신뢰성"
                />
                
                <ImplementationCard
                  title="Redis (캐시 + 메시징)"
                  description="세션 관리, 캐시, Pub/Sub 메시징을 하나의 솔루션으로"
                  icon={<Zap size={24} className="text-orange-600" />}
                  timeEstimate="선택 이유: 성능"
                />

                <ImplementationCard
                  title="Docker + Docker Compose"
                  description="개발환경 일관성, 마이크로서비스 배포 및 오케스트레이션 편의성"
                  icon={<Layout size={24} className="text-blue-700" />}
                  timeEstimate="선택 이유: 효율성"
                />
              </div>
            </ImplementationCategorySection>

            {/* 구현 후 확장 포인트 */}
            <ImplementationCategorySection 
              title="단계별 확장 로드맵" 
              icon={<TrendingUp className="text-teal-600" size={24} />}
              description="MVP 완성 후 점진적 기능 확장 및 운영 최적화 계획"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-700 flex items-center">
                    <Target size={18} className="mr-2" />
                    Phase 1 (3-4주차)
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>JWT + OAuth 2.0 인증/인가</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Circuit Breaker 패턴</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>API Rate Limiting</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-700 flex items-center">
                    <Monitor size={18} className="mr-2" />
                    Phase 2 (5-6주차)
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Prometheus + Grafana 모니터링</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>ELK Stack 로깅</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Jenkins/GitHub Actions CI/CD</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-purple-700 flex items-center">
                    <Users size={18} className="mr-2" />
                    Phase 3 (7-8주차)
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Kubernetes 배포</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>CDN + Load Balancer</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle size={16} className="text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Auto Scaling 정책</span>
                    </div>
                  </div>
                </div>
              </div>
            </ImplementationCategorySection>

            {/* 예상 어려움 & 해결방안 */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="text-lg font-semibold flex items-center mb-4">
                <Timer size={24} className="text-yellow-600 mr-2" />
                <span>예상 챌린지 & 해결 전략</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-yellow-100">
                    <h5 className="font-medium text-yellow-800 mb-2">서비스 간 통신 지연</h5>
                    <p className="text-sm text-gray-700">
                      <strong>해결책:</strong> Redis 캐시 활용, GraphQL DataLoader로 N+1 문제 해결, 비동기 메시징 패턴 적용
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-yellow-100">
                    <h5 className="font-medium text-yellow-800 mb-2">분산 트랜잭션 관리</h5>
                    <p className="text-sm text-gray-700">
                      <strong>해결책:</strong> Saga 패턴 또는 Event Sourcing 도입, 보상 트랜잭션 구현
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-lg border border-yellow-100">
                    <h5 className="font-medium text-yellow-800 mb-2">스키마 버전 관리</h5>
                    <p className="text-sm text-gray-700">
                      <strong>해결책:</strong> GraphQL Federation의 스키마 진화 전략, 하위 호환성 유지 규칙 수립
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-yellow-100">
                    <h5 className="font-medium text-yellow-800 mb-2">실시간 성능 최적화</h5>
                    <p className="text-sm text-gray-700">
                      <strong>해결책:</strong> WebSocket 연결 풀링, Redis Cluster, 메시지 배치 처리
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 성공 지표 */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h4 className="text-lg font-semibold flex items-center mb-4">
                <BarChart2 size={24} className="text-blue-600 mr-2" />
                <span>2주 MVP 완성 성공 지표</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h5 className="font-medium text-blue-700 mb-2 flex items-center">
                    <Award size={18} className="mr-2" />
                    기능적 완성도
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li>• 실시간 채팅 정상 동작</li>
                    <li>• CRUD API 100% 구현</li>
                    <li>• GraphQL 통합 완료</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h5 className="font-medium text-blue-700 mb-2 flex items-center">
                    <Zap size={18} className="mr-2" />
                    성능 기준
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li>• API 응답시간 &lt; 200ms</li>
                    <li>• WebSocket 지연 &lt; 50ms</li>
                    <li>• 동시 접속 1000명 지원</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100">
                  <h5 className="font-medium text-blue-700 mb-2 flex items-center">
                    <GitBranch size={18} className="mr-2" />
                    개발 생산성
                  </h5>
                  <ul className="text-sm space-y-1">
                    <li>• Docker 환경 5분 내 구동</li>
                    <li>• 신규 개발자 온보딩 1일</li>
                    <li>• API 문서 자동 생성</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 구현 카테고리 섹션 컴포넌트
interface ImplementationCategorySectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

const ImplementationCategorySection = ({ title, icon, description, children }: ImplementationCategorySectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="text-xl font-semibold ml-2">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {children}
    </div>
  );
};

// 구현 카드 컴포넌트
interface ImplementationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  timeEstimate?: string;
}

const ImplementationCard = ({ title, description, icon, timeEstimate }: ImplementationCardProps) => {
  return (
    <div className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {icon}
          <h4 className="font-medium text-md ml-2">{title}</h4>
        </div>
        {timeEstimate && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
            {timeEstimate}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

// 주간 계획 컴포넌트
interface WeeklyPlanProps {
  weekNumber: string;
  days: {
    day: string;
    title: string;
    tasks: string[];
    icon: React.ReactNode;
  }[];
}

const WeeklyPlan = ({ weekNumber, days }: WeeklyPlanProps) => {
  return (
    <div className="space-y-4">
      {days.map((dayPlan, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center mb-3">
            {dayPlan.icon}
            <div className="ml-2">
              <h4 className="font-semibold text-gray-800">{dayPlan.day}</h4>
              <p className="text-sm text-gray-600">{dayPlan.title}</p>
            </div>
          </div>
          <ul className="space-y-1 ml-6">
            {dayPlan.tasks.map((task, taskIndex) => (
              <li key={taskIndex} className="text-sm flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CTIMSAImplementationPlan;