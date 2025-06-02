// src/components/ProductivityStrategies.tsx

'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StrategyItem {
  id: number;
  title: string;
  description: string;
  expectedEffect: string;
}

const strategies: StrategyItem[] = [
  {
    id: 1,
    title: '많이 만들고 수정 (앤드류 응)',
    description:
      '반복적 프로토타이핑 및 개발 방식을 통해 빠르게 아이디어를 시도하고 피드백을 반영합니다. 초기에는 완벽함보다는 기능을 구현하는 속도를 중시합니다.',
    expectedEffect:
      '아이디어 검증 속도가 빨라지고, 실패를 통해 얻는 학습 효과를 극대화할 수 있습니다. 초기 버그 발생 시점이 앞당겨져 빠른 수정이 용이해집니다.',
  },
  {
    id: 2,
    title: '디자인 시스템 (스토리북 등)',
    description:
      'Storybook 등 도구를 활용해 재사용 가능한 UI 컴포넌트를 한곳에 모아두고, 디자이너와 개발자가 동일한 설계 가이드라인을 공유합니다.',
    expectedEffect:
      'UI 일관성이 유지되며, 새로운 화면을 만들 때마다 디자인 검토 시간을 절약할 수 있습니다. 재사용 가능한 컴포넌트가 많아질수록 개발 속도가 가속화됩니다.',
  },
  {
    id: 3,
    title: 'Boiler-plate 활용 (GitHub)',
    description:
      '프로젝트 시작 시 기본 설정(디렉터리 구조, ESLint, Tailwind 설정, 샘플 라우트 등)이 이미 갖춰진 템플릿 저장소를 사용합니다.',
    expectedEffect:
      '초기 세팅 시간이 거의 0에 가깝게 단축되어 바로 비즈니스 로직에 집중할 수 있습니다. 조직 내 여러 프로젝트 간 기술 스택 표준화에 도움이 됩니다.',
  },
  {
    id: 4,
    title: 'Backend는 BFF (Backend For Frontend)',
    description:
      'Front-End에 최적화된 API 게이트웨이 레이어를 두어, REST/GraphQL 호출을 프론트 요구사항에 맞게 조정해주는 BFF 패턴을 적용합니다.',
    expectedEffect:
      '프론트엔드 개발자가 불필요한 데이터 가공 로직을 작성하지 않아도 되며, 네트워크 요청 횟수와 payload 크기를 최소화해 퍼포먼스를 향상시킵니다.',
  },
  {
    id: 5,
    title: 'MCP 활용 시스템 구축 (Figma MCP, Cursor, Windsurf 등)',
    description:
      '디자인 및 개발 전 과정에서 AI 보조 도구, 로우코드/노코드 플랫폼, 디자인 협업 툴 등을 적극 활용해 반복 작업을 줄입니다.',
    expectedEffect:
      '디자인 시안과 실제 구현 간 괴리감을 최소화하고, 반자동화된 코드 생성으로 단순한 UI 레이아웃 구성 시간을 크게 단축할 수 있습니다.',
  },
  {
    id: 6,
    title: '업무 관리 사이트 (코딩 컨벤션, 노트 공유)',
    description:
      '사내 위키나 노트 시스템에 코딩 컨벤션, 베스트 프랙티스, 회고 기록, API 문서 등을 모아 체계적으로 관리합니다.',
    expectedEffect:
      '팀원 간 지식 격차를 줄이고, 신규 합류 인원이 빠르게 생산성을 내도록 돕습니다. 버그 재발 방지를 위해 사례 공유가 활성화됩니다.',
  },
  {
    id: 7,
    title: '최대한 Full Stack (시스템, 디자인, 백엔드, 프론트엔드, 테스트, DevOps, DDD)',
    description:
      '팀원마다 한 가지 분야에만 국한되지 않고, 설계부터 배포까지 전 과정을 이해하고 참여할 수 있도록 크로스-펑셔널 스킬을 장려합니다.',
    expectedEffect:
      '전체 시스템을 바라보는 시야가 넓어져 각 계층 간 협업 효율이 높아집니다. 장애 발생 시 빠른 원인 파악 및 수정이 가능해집니다.',
  },
  {
    id: 8,
    title: '자동화된 테스트 및 CI/CD 파이프라인 구축',
    description:
      '반복적인 테스트 작업을 Jest, React Testing Library, Playwright/Cypress 등으로 자동화하고, GitHub Actions 또는 Jenkins를 통해 빌드→테스트→배포까지 자동으로 실행되도록 설정합니다.',
    expectedEffect:
      '버그 조기 발견 및 수정이 쉬워지며, 배포 시간이 단축되고 안정성이 향상됩니다. 개발자는 핵심 로직 개발에 더 집중할 수 있습니다. 품질 일관성 유지가 가능합니다.',
  },
  {
    id: 9,
    title: '최신 기술 및 AI 기반 개발 도구 적극 도입 및 활용',
    description:
      'GitHub Copilot, Cursor와 같은 AI 코드 어시스턴트, 로우코드/노코드 플랫폼, 고급 디버깅·성능 분석 도구 등을 적극 탐색하여 필요 시 도입합니다.',
    expectedEffect:
      '반복적인 코드 작성 시간이 단축되고, 새로운 기술 학습 곡선을 완화할 수 있습니다. 복잡한 문제 해결이 쉬워지며 전반적인 개발 경험이 향상됩니다.',
  },
  {
    id: 10,
    title: '애자일 방법론 도입 및 주기적인 회고',
    description:
      '스크럼, 칸반 등의 애자일 프레임워크를 프로젝트 특성에 맞게 적용하여 짧은 주기의 반복 개발(Iteration)과 지속적인 피드백을 수행합니다. 주기적인 회고를 통해 프로세스를 점검하고 개선합니다.',
    expectedEffect:
      '요구사항 변경에 빠르게 대응할 수 있고, 고객 및 이해관계자와 긴밀하게 소통할 수 있습니다. 팀 생산성과 협업 효율이 증진되며, 지속적인 프로세스 개선이 이루어집니다.',
  },
];

const ProductivityStrategies: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        차기 CTI 프로젝트 개발 생산성 향상 전략
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {`${item.id}. ${item.title}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm text-gray-700">
                {item.description}
              </CardDescription>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-800">기대 효과:</p>
                <p className="text-sm text-gray-600">{item.expectedEffect}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <a href="#top">위로 가기</a>
        </Button>
      </div>
    </div>
  );
};

export default ProductivityStrategies;
