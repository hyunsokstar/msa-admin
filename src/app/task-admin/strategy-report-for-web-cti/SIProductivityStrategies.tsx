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
  Code, 
  BarChart2, 
  GitBranch, 
  Award,
  Layout,
  Database,
  Cpu,
  Users,
  Layers,
  BookOpen,
  Terminal,
  TrendingUp,
  Server,
  FileText,
  RefreshCw,
  Monitor,
  MessageSquare,
  Wrench,
  Compass,
  Clock
} from 'lucide-react';

const SIProductivityStrategies = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-700">SI 생산성 향상을 위한 20가지 전략</CardTitle>
          <CardDescription>
            혁신적인 개발 방법론과 도구 도입으로 SI 프로젝트 생산성을 극대화하는 전략
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* 프론트엔드 아키텍처 섹션 */}
            <StrategyCategorySection 
              title="프론트엔드 아키텍처 혁신" 
              icon={<Layout className="text-indigo-500" size={24} />}
              description="최신 프론트엔드 패턴과 라이브러리 도입으로 개발 속도와 코드 품질 향상"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StrategyCard
                  title="Shadcn UI 도입으로 일관적이고 접근성 높은 컴포넌트 구축"
                  description="Radix UI 기반의 경량 컴포넌트 사용으로 개발 속도↑, 유지보수성↑"
                  icon={<Layout size={24} className="text-indigo-600" />}
                />
                
                <StrategyCard
                  title="FSD + Zustand + TanStack Query 기반 프론트 아키텍처 확립"
                  description="도메인별 책임 분리, 전역 상태·비동기 상태 관리 최적화"
                  icon={<Layers size={24} className="text-blue-600" />}
                />
                
                <StrategyCard
                  title="디자인 시스템 & Storybook 운영"
                  description="UI 일관성 확보, 컴포넌트 문서화로 온보딩 가속"
                  icon={<FileText size={24} className="text-purple-600" />}
                />

                <StrategyCard
                  title="디자인→코드 자동화 파이프라인"
                  description="Figma to React/Vue 컴포넌트 자동 변환, 디자인-개발 간극 해소"
                  icon={<RefreshCw size={24} className="text-green-600" />}
                />
              </div>
            </StrategyCategorySection>

            {/* 백엔드 아키텍처 섹션 */}
            <StrategyCategorySection 
              title="백엔드 & API 최적화" 
              icon={<Server className="text-red-500" size={24} />}
              description="효율적인 백엔드 설계와 API 구조화로 성능과 개발 생산성 향상"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StrategyCard
                  title="GraphQL & BFF 계층 도입으로 API 효율화"
                  description="프론트엔드 요청 최소화, N+1 문제는 DataLoader 등으로 대응"
                  icon={<Database size={24} className="text-amber-600" />}
                />
                
                <StrategyCard
                  title="이벤트 기반 실시간 아키텍처 학습"
                  description="WebSocket, SSE와 효율적 상태 관리로 실시간 기능 구현 능력 (특히 프로젝트 규모가 커질수록 각종 스케일링 관리 기술들이 필요)"
                  icon={<Zap size={24} className="text-yellow-500" />}
                />
                
                <StrategyCard
                  title="DDD(도메인 주도 설계) 문화 내재화"
                  description="비즈니스 규칙 중심 설계로 코드 품질·유지보수성 강화"
                  icon={<Compass size={24} className="text-blue-700" />}
                />

                <StrategyCard
                  title="nestjs, 함수형 프로그래밍등 차세대 프로그래밍 패러다임 학습 및 도입"
                  description="최신 패러다임 적용으로 코드 품질과 생산성 향상"
                  icon={<Code size={24} className="text-gray-700" />}
                />
              </div>
            </StrategyCategorySection>

            {/* 개발 자동화 & 도구 섹션 */}
            <StrategyCategorySection 
              title="개발 자동화 & 생산성 도구" 
              icon={<Wrench className="text-green-600" size={24} />}
              description="반복 작업 자동화와 효율적인 도구 활용으로 개발 속도 가속화"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StrategyCard
                  title="반복되는 기능은 보일러플레이트화하여 생산성 극대화"
                  description="신규 프로젝트·모듈 온보딩 속도 단축"
                  icon={<Terminal size={24} className="text-gray-800" />}
                />
                
                <StrategyCard
                  title="공통 훅·유틸 보일러플레이트화"
                  description="useQueryWithAuth, usePersistedStore 등 템플릿화로 재사용성↑"
                  icon={<RefreshCw size={24} className="text-indigo-700" />}
                />
                
                <StrategyCard
                  title="Windsurf, VS Code AI 플러그인(Copilot, Cursor) 적극 활용"
                  description="반복 업무 자동 완성, 문서화 보조"
                  icon={<Cpu size={24} className="text-purple-600" />}
                />

                <StrategyCard
                  title="블록체인 기반 코드 기여 보상 시스템"
                  description="팀원 코드 기여도 투명 추적, 자동화된 인센티브 제공으로 동기 부여"
                  icon={<Award size={24} className="text-amber-500" />}
                />
              </div>
            </StrategyCategorySection>

            {/* DevOps & 배포 섹션 */}
            <StrategyCategorySection 
              title="DevOps & 인프라 최적화" 
              icon={<GitBranch className="text-red-600" size={24} />}
              description="자동화된 배포 프로세스와 인프라 관리로 운영 효율성 향상"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StrategyCard
                  title="DevOps·테스트 자동화 강화(CI/CD, Playwright, Swagger Test 등)"
                  description="배포 안정성↑, 회귀 버그↓, 개발↔운영 간 간극 해소"
                  icon={<TrendingUp size={24} className="text-green-600" />}
                />
                
                <StrategyCard
                  title="jenkins, github action, terraform, aws 등 배포 관련 devops 스킬 학습 및 공유"
                  description="Grafana, Sentry 등을 통한 성능·에러 추적"
                  icon={<Monitor size={24} className="text-blue-600" />}
                />
              </div>
            </StrategyCategorySection>

            {/* 프로젝트 관리 & 협업 섹션 */}
            <StrategyCategorySection 
              title="프로젝트 관리 & 지식 공유" 
              icon={<Users className="text-blue-600" size={24} />}
              description="효율적인 협업 체계와 지식 관리로 팀 생산성 극대화"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StrategyCard
                  title="Nexus-Task-Master 기반 통합 업무 관리 시스템 운영"
                  description="진행 상황, 이슈, 테스트, 개발 일지, 회의록, API 문서, 챌린지 등 원스톱 관리"
                  icon={<BarChart2 size={24} className="text-blue-600" />}
                />
                
                <StrategyCard
                  title="단기·중기·장기 로드맵 수립 및 OKR 적용"
                  description="목표 설정→성과 측정→우선순위 조정"
                  icon={<Compass size={24} className="text-amber-700" />}
                />
                
                <StrategyCard
                  title="백엔드 고수들의 설계·최적화 노하우 정기 학습 및 사내 공유"
                  description="MSA, CQRS, 이벤트 기반 설계 등 고급 주제 다룸"
                  icon={<BookOpen size={24} className="text-indigo-600" />}
                />

                <StrategyCard
                  title="사내 기술 위키·블로그 + Nexus-Task-Master 연동"
                  description="기술 아티클·브랜딩 축적, 검색성·참조성 확보"
                  icon={<FileText size={24} className="text-green-700" />}
                />
              </div>
            </StrategyCategorySection>

            {/* 비즈니스 협업 & 혁신 섹션 */}
            <StrategyCategorySection 
              title="비즈니스 협업 & 혁신 생태계" 
              icon={<MessageSquare className="text-purple-600" size={24} />}
              description="비즈니스와 기술 간 원활한 소통과 혁신 문화 조성"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StrategyCard
                  title="비즈니스–기술 간 커뮤니케이션 강화"
                  description="ERD, 유저 시나리오 다이어그램 시각화로 이해도↑"
                  icon={<Users size={24} className="text-teal-600" />}
                />
                
                <StrategyCard
                  title="최신 기술 POC 랩 운영"
                  description="Codex, WASM, Edge Functions 등 실험 → 가능성 타진"
                  icon={<Cpu size={24} className="text-amber-600" />}
                />
                
                <StrategyCard
                  title="정기 기술 세미나·사내 챌린지(주간·월간) 운영"
                  description="학습 동기 부여, 팀 단위 생산성 경쟁"
                  icon={<Award size={24} className="text-blue-600" />}
                />
              </div>
            </StrategyCategorySection>

            {/* 하이라이트 섹션 */}
            <div className="bg-amber-50 p-6 rounded-lg border border-amber-100 mt-8">
              <h4 className="text-lg font-semibold flex items-center mb-4">
                <Zap size={24} className="text-amber-600 mr-2" />
                <span>SI 프로젝트 생산성 1000% 향상의 핵심</span>
              </h4>
              <p className="text-sm mb-4">
                전통적인 SI 방식에서 현대적인 개발 방법론과 도구로 전환할 경우, 아래 핵심 영역에서 극적인 생산성 향상을 기대할 수 있습니다:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-amber-200">
                  <h5 className="font-medium text-amber-700 mb-2 flex items-center">
                    <Clock size={18} className="mr-2" />
                    시간 효율성
                  </h5>
                  <p className="text-sm">
                    보일러플레이트 코드 자동화, 컴포넌트 재사용, AI 도구 활용으로 반복 작업 시간 90% 감소
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-200">
                  <h5 className="font-medium text-amber-700 mb-2 flex items-center">
                    <Users size={18} className="mr-2" />
                    협업 최적화
                  </h5>
                  <p className="text-sm">
                    통합 업무 관리 시스템, 시각화된 커뮤니케이션으로 의사결정 시간 80% 단축
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-amber-200">
                  <h5 className="font-medium text-amber-700 mb-2 flex items-center">
                    <TrendingUp size={18} className="mr-2" />
                    품질 & 확장성
                  </h5>
                  <p className="text-sm">
                    자동화된 테스트, 최신 아키텍처 패턴 적용으로 버그 발생 70% 감소, 유지보수 비용 60% 절감
                  </p>
                </div>
              </div>
            </div>

            {/* 고객 사례 */}
            <div className="p-5 rounded-lg border bg-blue-50 border-blue-100">
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <Award size={22} className="text-blue-600 mr-2" />
                <span>실제 적용 성공 사례</span>
              </h4>
              <p className="text-sm italic mb-3">
                "이러한 혁신적 전략들을 순차적으로 도입한 결과, 기존 SI 프로젝트 대비 개발 기간은 50% 단축되었고, 
                유지보수 비용은 70% 절감되었습니다. 특히 GraphQL과 컴포넌트 기반 아키텍처 도입으로 
                API 호출 수는 85% 감소했으며, 개발자 경험은 획기적으로 개선되었습니다."
              </p>
              <p className="text-sm text-right text-gray-600">
                - 국내 대형 SI 프로젝트 책임자
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// 전략 카테고리 섹션 컴포넌트
interface StrategyCategorySectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}

const StrategyCategorySection = ({ title, icon, description, children }: StrategyCategorySectionProps) => {
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

// 전략 카드 컴포넌트
interface StrategyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StrategyCard = ({ title, description, icon }: StrategyCardProps) => {
  return (
    <div className="p-5 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="font-medium text-md ml-2">{title}</h4>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default SIProductivityStrategies;