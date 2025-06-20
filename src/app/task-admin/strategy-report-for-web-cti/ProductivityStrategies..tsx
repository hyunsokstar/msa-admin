// src/components/ProductivityStrategies.tsx
'use client';

import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Code2,
  Palette,
  Github,
  Server,
  Bot,
  Users,
  TestTube,
  Zap,
  RefreshCw,
  BookOpen,
  Radio,
} from 'lucide-react';

interface StrategyItem {
  id: number;
  title: string;
  description: string;
  expectedEffect: string;
  icon: React.ReactNode;
  gradient: string;
}

const strategies: StrategyItem[] = [
  {
    id: 1,
    title: '클린 아키텍처 + 리팩토링 + 테스트 기반 반복 개발 (feat. Andrew Ng)',
    description:
      '이 전략은 클린 아키텍처 원칙을 기반으로 초기 시스템 구조를 설계한 뒤, 지속적인 리팩토링을 통해 코드의 응집도와 결합도를 개선합니다. 또한 앤드류 응 교수의 "많이 만들어 보고, 반복 개선하라"는 철학을 따라 테스트 주도 개발(TDD)을 적용하여 기능 단위로 빠르게 구현하고 검증하면서 점진적으로 품질을 높여 나갑니다.',
    expectedEffect:
      '이 과정을 통해 모듈 간 책임이 명확해지고, 테스트 커버리지를 확보함으로써 코드 안정성을 높일 수 있습니다. 반복적인 리팩토링과 TDD 사이클을 통해 구조적 결함을 조기에 발견하고 개선하여 유지보수성을 극대화하며, 사용자 피드백을 신속하게 반영할 수 있습니다.',
    icon: <Code2 className="w-6 h-6" />,
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    title: '통합 디자인 시스템 구축 (Tailwind CSS + shadcn-ui/Radix UI + Storybook)',
    description:
      'Tailwind CSS 기반 공통 스타일을 정의하고, shadcn-ui 또는 Radix UI로 재사용 가능한 컴포넌트를 구성합니다. Storybook을 사용해 Next.js 내부에서 컴포넌트를 독립적으로 문서화·테스트하여 디자이너와 개발자가 동일한 설계 가이드라인을 공유합니다.',
    expectedEffect:
      'UI 일관성을 확보하고, 컴포넌트 재사용을 통해 신규 화면 개발 속도를 가속화합니다. Storybook 문서화를 통해 디자인 리뷰 단계가 간소화되고 QA 과정에서 시각적 오차를 사전 방지할 수 있습니다.',
    icon: <Palette className="w-6 h-6" />,
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 3,
    title: 'Boiler-plate 활용 (GitHub)',
    description:
      '프로젝트 초기 세팅(디렉터리 구조, ESLint/Prettier, Tailwind CSS 설정, 샘플 라우트 등)이 미리 갖춰진 템플릿 저장소를 사용합니다. 해당 템플릿은 조직 내 표준을 반영하여 유지 보수성을 고려한 구성을 제공합니다.',
    expectedEffect:
      '초기 세팅 시간을 획기적으로 단축하여 비즈니스 로직 구현에 더 빠르게 착수할 수 있으며, 조직 내 프로젝트 간 기술 표준화를 통해 코드 일관성을 유지할 수 있습니다.',
    icon: <Github className="w-6 h-6" />,
    gradient: 'from-gray-700 to-gray-900',
  },
  {
    id: 4,
    title: 'Backend는 BFF (Backend For Frontend)',
    description:
      'Next.js API Routes 또는 Spring Boot 기반 BFF 마이크로서비스를 통해 클라이언트 요구사항에 맞춘 데이터를 가공하여 제공합니다. 이를 통해 프론트엔드에서 불필요한 데이터 가공 로직을 줄이고, API 호출 횟수를 최소화합니다.',
    expectedEffect:
      '프론트엔드 개발자는 데이터 가공에 신경 쓰지 않아도 되어 생산성이 향상되며, 여러 클라이언트(웹, 모바일, 관리자 콘솔)가 동일한 로직을 재사용할 수 있어 유지 보수가 용이해집니다.',
    icon: <Server className="w-6 h-6" />,
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 5,
    title: 'AI·MCP 도구 적극 도입 (GitHub Copilot, Figma 플러그인, Cursor, Windsurf)',
    description:
      'GitHub Copilot, Tabnine 같은 AI 코드 어시스턴트를 활용해 반복적인 코드 생성을 자동화하고, Figma to React, Anima, Windsurf 등의 플러그인을 통해 디자인 시안에서 Next.js 컴포넌트를 반자동으로 생성합니다. Cursor 등 AI 기반 편집기 확장 도구로 리팩토링을 지원받습니다.',
    expectedEffect:
      '단순한 UI 레이아웃 및 CRUD 코드 생성을 자동화해 개발 속도를 가속화하고, 디자인 시안과 실제 구현 간 격차를 줄여 협업 효율을 증대시킵니다.',
    icon: <Bot className="w-6 h-6" />,
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 6,
    title: '협업 허브 및 업무 관리 (https://nexus-task-master.shop/)',
    description:
      'nexus-task-master.shop을 업무 관리 허브로 활용하여 "코딩 컨벤션, 베스트 프랙티스, 회고 기록, API 문서" 등을 중앙 집중 관리합니다. 이슈 트래킹, 백로그 관리 기능을 통해 실시간 협업과 지식 공유를 활성화합니다.',
    expectedEffect:
      '신규 합류자는 문서를 통해 빠르게 프로젝트 컨텍스트를 파악할 수 있어 온보딩 속도가 빨라지고, 지식 사일로를 방지하며 협업 효율을 극대화할 수 있습니다.',
    icon: <Users className="w-6 h-6" />,
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 7,
    title: '자동화된 테스트 & CI/CD 파이프라인 구축',
    description:
      '프론트엔드(Next.js)에서는 Jest와 React Testing Library로 Unit/Integration 테스트를 작성하고, Playwright/Cypress로 E2E 테스트를 자동화합니다. 백엔드(Spring Boot)에서는 JUnit5 + MockMVC(또는 WebTestClient)로 테스트를 수행하며, CI/CD는 GitHub Actions를 통해 빌드→테스트→Docker 이미지 빌드→Kubernetes(또는 ArgoCD) 배포까지 자동화합니다.',
    expectedEffect:
      '코드 변경 시 회귀 버그를 빠르게 감지할 수 있고, 배포 시간을 단축하여 안정성을 확보합니다. 무중단 배포를 통해 서비스 가용성을 유지하고, 필요 시 신속한 롤백이 가능합니다.',
    icon: <TestTube className="w-6 h-6" />,
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 8,
    title: '최신 기술·AI 기반 개발 도구 적극 도입',
    description:
      'GitHub Copilot, Tabnine, Cursor 같은 AI 기반 코드 어시스턴트를 사용해 반복 코드를 자동화하고, Figma to React, Anima, Windsurf 등 디자인 협업 툴을 통해 UI를 반자동으로 코드화합니다. 성능 분석 도구(Chrome DevTools, VSCode Profiler 등)도 도입해 개발 생산성을 향상시킵니다.',
    expectedEffect:
      'AI 도구를 통해 반복 작업 시간을 단축하고, 복잡한 문제 해결을 지원받아 개발 경험이 향상되며, 새로운 기술 학습 곡선을 완화할 수 있습니다.',
    icon: <Zap className="w-6 h-6" />,
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    id: 9,
    title: '애자일 & 지속적 리팩토링 문화 (스크럼/칸반 + 기술 부채 관리)',
    description:
      '스크럼 또는 칸반 방식으로 스프린트 백로그를 관리하고, 데일리 스탠드업 → 스프린트 회고 → 백로그 정비 사이클을 준수합니다. PR 머지 전 리팩토링 체크리스트를 통과하도록 하며, 정기적 리팩토링 스프린트를 통해 누적된 기술 부채를 해소합니다.',
    expectedEffect:
      '유연한 애자일 프로세스를 통해 변화에 민첩하게 대응하고, 주기적 회고를 통해 지속적인 코드 품질 개선과 팀 생산성 향상을 이룰 수 있습니다.',
    icon: <RefreshCw className="w-6 h-6" />,
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 10,
    title: '최신 프론트엔드 개발 학습 (FSD + Zustand + TanStack Query)',
    description:
      'Feature-Sliced Design(FSD) 아키텍처에 따라 비즈니스 도메인별로 코드를 구조화하고, Zustand를 활용한 간결한 상태 관리 패턴을 학습합니다. TanStack Query로 서버 상태 자동 캐싱·재요청 전략을 적용하여 데이터 동기화를 단순화합니다. 공식 문서를 기반으로 Boiler-plate 예제를 제작해 베스트 프랙티스를 습득합니다.',
    expectedEffect:
      '모듈별 책임이 명확해져 코드 확장성과 유지 보수성이 향상되며, 상태 관리 복잡도를 줄여 개발 속도를 높일 수 있습니다.',
    icon: <BookOpen className="w-6 h-6" />,
    gradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 11,
    title: '실시간 기능 학습 (WebSocket + Redis Pub/Sub + Kafka + Supabase 등)',
    description:
      'WebSocket을 통해 양방향 실시간 통신을 구현하는 방법을 학습하고, Redis Pub/Sub로 인스턴스 간 실시간 메시지 전파를 실습합니다. Apache Kafka로 분산 메시징 및 이벤트 스트리밍 개념을 이해하며, Supabase Realtime 기능을 활용해 PostgreSQL 기반 실시간 구독을 구현합니다. 추가로 Redis Streams, Kafka Streaming 등을 병행 학습해 복합 실시간 처리 아키텍처를 탐구합니다.',
    expectedEffect:
      '실시간 알림, 채팅, 대시보드 등 사용자 경험을 향상시키고, 확장성과 신뢰성을 갖춘 분산 메시징 아키텍처를 설계할 수 있습니다.',
    icon: <Radio className="w-6 h-6" />,
    gradient: 'from-rose-500 to-pink-600',
  },
];

const ProductivityStrategies: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
      id="top"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/** Header Section **/}
        <div className="text-center mb-16">
          {/* 왼쪽 아이콘과 중앙 텍스트를 inline-flex로 묶고, 배경/블러를 줘서 강조 */}
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mx-auto">
            <Zap className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Development Strategy
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            차기 CTI 프로젝트
          </h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-6">
            개발 생산성 향상 전략
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            현대적이고 효율적인 개발 환경을 구축하여 팀의 생산성을 극대화하는{' '}
            <strong>{strategies.length}가지</strong> 핵심 전략
          </p>
        </div>

        {/** Strategy Cards Grid **/}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {strategies.map((item, index) => (
            <Card
              key={item.id}
              className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/** 왼쪽 상단 아이콘: 절대 위치로 고정 **/}
              <div
                className={`absolute top-4 left-4 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {item.icon}
              </div>

              {/** 오른쪽 상단 넘버 배지: 절대 위치로 고정 **/}
              <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300">
                <span className="text-white font-bold text-sm">{item.id}</span>
              </div>

              {/** CardHeader의 상단 패딩을 충분히 줘서, 절대 위치 아이콘/배지가 겹치지 않도록 함 **/}
              <CardHeader className="pt-20 pb-4 px-6">
                <CardTitle className="text-xl font-bold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 px-6 pb-6">
                <CardDescription className="text-gray-700 leading-relaxed text-sm">
                  {item.description}
                </CardDescription>

                <div className="relative">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <div className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500" />
                      <p className="text-sm font-semibold text-gray-900">
                        기대 효과
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.expectedEffect}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/** Bottom “위로 가기” Section **/}
        <div className="mt-20 flex justify-center">
          <Button
            onClick={() =>
              document
                .getElementById('top')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="mx-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center gap-2">↑ 위로 가기</span>
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          모든 전략을 통해 더 나은 개발 경험을 만들어보세요
        </p>
      </div>
    </div>
  );
};

export default ProductivityStrategies;
