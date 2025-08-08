// C:\Users\terec\msa-admin\src\app\pilot-project\vibe-coding-conecpt\page.tsx

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Code2,
    Rocket,
    GitBranch,
    Layers,
    Cloud,
    BookOpen,
    Cpu,
    Brain,
    Terminal,
    Server,
    ChevronRight,
    CheckCircle2,
    TrendingUp,
    Clock,
    Users,
    Zap,
    Package,
    Palette,
    Database,
    MessageSquare,
    BarChart3,
    AlertCircle,
    LucideIcon
} from "lucide-react";

// 타입 정의
interface Strategy {
    id: number;
    title: string;
    category: string;
    description: string;
    details: string;
    implementation: string[];
    tools: Tool[];
    metrics: Metric[];
    difficulty: "초급" | "중급" | "고급";
    timeToImplement: string;
    roi: number;
    icon: LucideIcon;
    tags: string[];
    bestPractices?: string[];
    codeExample?: string;
}

interface Tool {
    name: string;
    type: string;
    url?: string;
    description?: string;
}

interface Metric {
    name: string;
    value: string;
    improvement: string;
}

// 전략 데이터
const strategies: Strategy[] = [
    {
        id: 1,
        title: "차세대 보일러플레이트 & 스타터 킷",
        category: "개발 기초",
        description: "2025년 최신 프레임워크 기반 프로덕션 레디 템플릿",
        details: `Next.js 14+, React 19, TypeScript 5+를 기반으로 한 최신 보일러플레이트는 
    인증, 데이터베이스 관리, 블로그 시스템 등 필수 기능을 사전 구성하여 프로젝트 설정 시간을 80% 단축합니다. 
    Vite 기반 템플릿은 ESLint, Prettier, CommitLint, Husky, Lint-Staged를 포함한 
    완벽한 개발 환경을 제공합니다.`,
        implementation: [
            "Next.js 14 App Router + Server Components 활용",
            "Tailwind CSS + shadcn/ui 컴포넌트 라이브러리 통합",
            "Prisma/Drizzle ORM + PostgreSQL/Supabase 설정",
            "NextAuth.js v5 또는 Clerk 인증 시스템 구축",
            "Stripe 결제 통합 및 구독 관리 시스템"
        ],
        tools: [
            { name: "Create T3 App", type: "풀스택", description: "TypeScript, Next.js, Prisma, tRPC 통합" },
            { name: "Next.js SaaS Starter", type: "SaaS", description: "Stripe, Auth.js, Resend 포함" },
            { name: "Superplate", type: "커스텀", description: "30+ 플러그인 선택 가능" },
            { name: "Vite + React", type: "프론트엔드", description: "초고속 빌드 도구" }
        ],
        metrics: [
            { name: "초기 설정 시간", value: "30분", improvement: "-80%" },
            { name: "개발 속도", value: "3배 향상", improvement: "+200%" },
            { name: "코드 품질", value: "95점", improvement: "+40%" }
        ],
        difficulty: "초급",
        timeToImplement: "1-2일",
        roi: 95,
        icon: Rocket,
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "보일러플레이트"],
        bestPractices: [
            "프로젝트 요구사항에 맞는 보일러플레이트 선택",
            "불필요한 의존성 제거 및 최적화",
            "커스텀 환경 변수 설정 및 보안 관리"
        ],
        codeExample: `// Next.js 14 App Router 예시
// app/page.tsx
export default async function HomePage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache',
    next: { revalidate: 3600 }
  });
  
  return (
    <main className="container mx-auto px-4">
      <h1 className="text-4xl font-bold">Welcome</h1>
      {/* Server Component로 데이터 렌더링 */}
    </main>
  );
}`
    },
    {
        id: 2,
        title: "AI 코딩 어시스턴트 마스터리",
        category: "AI 도구",
        description: "Claude Code, Cursor, GitHub Copilot을 활용한 AI 페어 프로그래밍",
        details: `Claude Sonnet 4는 GitHub Copilot의 기본 모델로 채택되어 
    이전 세대 대비 10% 향상된 성능을 보여줍니다. 
    Cursor의 Composer 기능은 여러 파일을 동시에 수정하고, 
    프로젝트 전체 컨텍스트를 이해하여 정확한 코드를 생성합니다.
    GitHub Copilot은 Claude Sonnet 3.7, Google Gemini 2.0 Flash 등 
    다양한 모델 간 전환이 가능합니다.`,
        implementation: [
            "Cursor Pro ($20/월) 또는 GitHub Copilot ($10/월) 구독",
            "VSCode/JetBrains IDE 통합 설정",
            "프롬프트 엔지니어링 및 컨텍스트 최적화",
            "Code Connect로 디자인-코드 연결",
            "AI 생성 코드 리뷰 및 테스트 자동화"
        ],
        tools: [
            { name: "Cursor", type: "IDE", description: "AI 네이티브 에디터, 멀티 모델 지원" },
            { name: "GitHub Copilot", type: "확장", description: "IDE 통합, 엔터프라이즈 지원" },
            { name: "Claude Code", type: "에이전트", description: "MCP 프로토콜, 자율 코딩" },
            { name: "Windsurf", type: "IDE", description: "차세대 AI 코딩 환경" }
        ],
        metrics: [
            { name: "코딩 속도", value: "55% 향상", improvement: "+55%" },
            { name: "개발자 만족도", value: "75% 증가", improvement: "+75%" },
            { name: "버그 감소율", value: "30%", improvement: "-30%" }
        ],
        difficulty: "중급",
        timeToImplement: "1주일",
        roi: 85,
        icon: Brain,
        tags: ["AI", "Copilot", "Claude", "Cursor", "생산성"],
        bestPractices: [
            "명확하고 구체적인 프롬프트 작성",
            "생성된 코드 항상 검토 및 테스트",
            "보안 민감 코드는 수동으로 작성"
        ]
    },
    {
        id: 3,
        title: "Figma Dev Mode & MCP 통합",
        category: "디자인-개발",
        description: "디자인에서 코드로의 완벽한 자동화 워크플로우",
        details: `Figma Dev Mode MCP 서버는 VS Code, Cursor, Windsurf, Claude와 
    같은 AI 코딩 도구에 디자인 컨텍스트를 직접 제공합니다.
    MCP는 컴포넌트 참조, 스타일링 변수, 시각적 컨텍스트를 AI 도구에 제공하여 
    디자인 사양과 팀의 코딩 규칙을 모두 반영한 코드를 생성합니다.`,
        implementation: [
            "Figma Dev Mode 활성화 및 팀 권한 설정",
            "MCP 서버 설치 및 IDE 연동",
            "Code Connect로 컴포넌트 매핑",
            "디자인 토큰 자동 추출 및 CSS 변수 생성",
            "Component Playground로 인터랙션 테스트"
        ],
        tools: [
            { name: "Figma Dev Mode", type: "디자인", description: "개발자 중심 인터페이스" },
            { name: "MCP Server", type: "통합", description: "AI 도구 브릿지" },
            { name: "Code Connect", type: "매핑", description: "디자인-코드 연결" },
            { name: "Variables Converter", type: "플러그인", description: "토큰 변환 도구" }
        ],
        metrics: [
            { name: "초기 개발 시간", value: "50-70% 단축", improvement: "-60%" },
            { name: "디자인 일관성", value: "95%", improvement: "+45%" },
            { name: "재작업 감소", value: "80%", improvement: "-80%" }
        ],
        difficulty: "중급",
        timeToImplement: "2-3일",
        roi: 80,
        icon: Palette,
        tags: ["Figma", "Dev Mode", "MCP", "디자인 시스템"],
        codeExample: `// Figma MCP를 통한 컴포넌트 생성
// Cursor IDE에서 Figma 선택 후 프롬프트
"선택한 Figma 디자인을 React 컴포넌트로 변환해줘.
Tailwind CSS와 우리 디자인 토큰을 사용해."

// 자동 생성된 코드 (예시)
export const Card = ({ title, description }) => {
  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
};`
    },
    {
        id: 4,
        title: "마이크로서비스 & 이벤트 기반 아키텍처",
        category: "아키텍처",
        description: "Kafka, RabbitMQ를 활용한 확장 가능한 분산 시스템",
        details: `이벤트 기반 아키텍처(EDA)는 실시간으로 발생하는 이벤트에 
    애플리케이션이 반응하는 현대적이고 동적인 소프트웨어 설계 접근법입니다.
    Kafka는 높은 처리량과 낮은 지연시간이 필요한 분산 데이터 스트리밍에 이상적이며, 
    RabbitMQ는 복잡한 라우팅 시나리오와 유연한 메시지 처리가 필요한 경우에 적합합니다.`,
        implementation: [
            "도메인 기반 마이크로서비스 분리",
            "API Gateway 패턴 구현 (Kong, Traefik)",
            "메시지 브로커 선택 및 설정 (Kafka/RabbitMQ)",
            "이벤트 소싱 및 CQRS 패턴 적용",
            "분산 트레이싱 구현 (Jaeger, Zipkin)"
        ],
        tools: [
            { name: "Apache Kafka", type: "스트리밍", description: "고처리량 이벤트 스트리밍" },
            { name: "RabbitMQ", type: "메시징", description: "유연한 메시지 라우팅" },
            { name: "Redis", type: "캐싱", description: "인메모리 데이터 저장" },
            { name: "Docker/K8s", type: "컨테이너", description: "서비스 오케스트레이션" }
        ],
        metrics: [
            { name: "시스템 처리량", value: "10배 증가", improvement: "+900%" },
            { name: "장애 격리", value: "95%", improvement: "+95%" },
            { name: "배포 주기", value: "일 단위", improvement: "-85%" }
        ],
        difficulty: "고급",
        timeToImplement: "2-4주",
        roi: 75,
        icon: Server,
        tags: ["마이크로서비스", "Kafka", "RabbitMQ", "이벤트 기반"],
        bestPractices: [
            "이벤트 스키마 버전 관리",
            "멱등성 보장 설계",
            "서킷 브레이커 패턴 적용"
        ]
    },
    {
        id: 5,
        title: "차세대 DevOps & CI/CD 파이프라인",
        category: "DevOps",
        description: "GitHub Actions, Terraform을 활용한 완전 자동화 인프라",
        details: `Terrateam은 GitHub에서 인프라를 코드로 관리하는 팀을 위한 
    2025년 최고의 Terraform CI/CD 솔루션입니다.
    HashiCorp 연구에 따르면 자동화된 Terraform 워크플로우를 사용하는 조직은 
    수동 프로세스에 비해 인프라 변경을 89% 더 빠르게 배포합니다.`,
        implementation: [
            "GitHub Actions 워크플로우 설정",
            "Terraform으로 IaC 구현",
            "ArgoCD/Flux로 GitOps 구축",
            "Prometheus + Grafana 모니터링",
            "보안 스캐닝 자동화 (Trivy, Snyk)"
        ],
        tools: [
            { name: "GitHub Actions", type: "CI/CD", description: "네이티브 GitHub 통합" },
            { name: "Terraform", type: "IaC", description: "인프라 코드화" },
            { name: "Spacelift", type: "관리", description: "Terraform 워크플로우" },
            { name: "Grafana", type: "모니터링", description: "실시간 메트릭 시각화" }
        ],
        metrics: [
            { name: "배포 속도", value: "89% 향상", improvement: "+89%" },
            { name: "인프라 비용", value: "40% 절감", improvement: "-40%" },
            { name: "복구 시간", value: "90% 단축", improvement: "-90%" }
        ],
        difficulty: "고급",
        timeToImplement: "1-2주",
        roi: 90,
        icon: Cloud,
        tags: ["DevOps", "CI/CD", "Terraform", "GitHub Actions"],
        codeExample: `# GitHub Actions Terraform 워크플로우
name: Terraform CI/CD
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: hashicorp/setup-terraform@v2
      
      - name: Terraform Init
        run: terraform init
        
      - name: Terraform Plan
        if: github.event_name == 'pull_request'
        run: terraform plan -no-color
        
      - name: Terraform Apply
        if: github.ref == 'refs/heads/main'
        run: terraform apply -auto-approve`
    },
    {
        id: 6,
        title: "Storybook 기반 컴포넌트 문서화",
        category: "문서화",
        description: "디자인 시스템 구축과 컴포넌트 주도 개발",
        details: `Storybook은 UI 컴포넌트의 '알려진 좋은' 상태를 캡처하여 
    자동화된 테스트를 구동하고 WCAG 및 ARIA 이슈를 체크합니다.
    MDX 파일로 마크다운 기반 문서를 작성하고 JavaScript를 지원하여 
    컴포넌트와 Storybook Blocks를 가져와 문서 페이지에 표시할 수 있습니다.`,
        implementation: [
            "Storybook 7+ 설치 및 설정",
            "컴포넌트 Story 작성",
            "MDX로 문서화 작성",
            "Chromatic으로 비주얼 테스팅",
            "디자인 토큰 통합"
        ],
        tools: [
            { name: "Storybook", type: "문서화", description: "컴포넌트 워크샵" },
            { name: "Chromatic", type: "테스팅", description: "비주얼 회귀 테스트" },
            { name: "Zeroheight", type: "문서", description: "디자인 시스템 문서" },
            { name: "Bit", type: "공유", description: "컴포넌트 공유 플랫폼" }
        ],
        metrics: [
            { name: "컴포넌트 재사용률", value: "70%", improvement: "+70%" },
            { name: "UI 버그", value: "50% 감소", improvement: "-50%" },
            { name: "개발 일관성", value: "85%", improvement: "+85%" }
        ],
        difficulty: "중급",
        timeToImplement: "3-5일",
        roi: 70,
        icon: BookOpen,
        tags: ["Storybook", "디자인 시스템", "문서화", "테스팅"]
    },
    {
        id: 7,
        title: "프론트엔드 성능 최적화 전략",
        category: "성능",
        description: "2025년 최신 웹 성능 최적화 기법",
        details: `WebGPU 확장으로 고성능 그래픽 렌더링이 표준이 되고, 
    몰입형 웹 경험 창출이 가능해졌습니다.
    WebAssembly는 비디오 편집, 3D 렌더링, 게임 등 
    계산 집약적 작업을 브라우저에서 직접 처리할 수 있게 합니다.`,
        implementation: [
            "React 19 Server Components 활용",
            "Vue 3 Vapor Mode 적용",
            "번들 크기 최적화 (Tree Shaking, Code Splitting)",
            "이미지 최적화 (WebP, AVIF, lazy loading)",
            "Edge Computing 활용"
        ],
        tools: [
            { name: "Vite", type: "빌드", description: "10배 빠른 빌드" },
            { name: "Partytown", type: "최적화", description: "Web Worker 활용" },
            { name: "Million.js", type: "렌더링", description: "Virtual DOM 최적화" },
            { name: "WebAssembly", type: "성능", description: "네이티브급 성능" }
        ],
        metrics: [
            { name: "초기 로딩 시간", value: "2초 이하", improvement: "-70%" },
            { name: "Lighthouse 점수", value: "95+", improvement: "+30%" },
            { name: "FCP", value: "1.5초", improvement: "-50%" }
        ],
        difficulty: "고급",
        timeToImplement: "1-2주",
        roi: 85,
        icon: Zap,
        tags: ["성능", "최적화", "WebAssembly", "Server Components"]
    },
    {
        id: 8,
        title: "실시간 협업 도구 통합",
        category: "협업",
        description: "개발 워크플로우에 실시간 협업 기능 통합",
        details: "Linear, Notion, Slack을 개발 프로세스에 완벽하게 통합하여 팀 생산성을 극대화합니다. AI 도구와 연동하여 자동으로 이슈를 생성하고 PR 리뷰를 관리합니다.",
        implementation: [
            "Linear/Jira 이슈 트래킹 자동화",
            "Slack 워크플로우 빌더 활용",
            "Notion API로 문서 자동 생성",
            "GitHub Projects v2 활용",
            "실시간 코드 리뷰 세션 도구 설정"
        ],
        tools: [
            { name: "Linear", type: "이슈 트래킹", description: "개발자 중심 프로젝트 관리" },
            { name: "Tuple", type: "페어 프로그래밍", description: "실시간 코드 협업" },
            { name: "CodeTogether", type: "IDE 공유", description: "크로스 IDE 협업" },
            { name: "Loom", type: "비디오", description: "비동기 커뮤니케이션" }
        ],
        metrics: [
            { name: "팀 응답 시간", value: "60% 단축", improvement: "-60%" },
            { name: "프로젝트 가시성", value: "100%", improvement: "+50%" },
            { name: "커뮤니케이션 효율", value: "2배", improvement: "+100%" }
        ],
        difficulty: "초급",
        timeToImplement: "2-3일",
        roi: 65,
        icon: Users,
        tags: ["협업", "Linear", "Slack", "생산성"]
    },
    {
        id: 9,
        title: "저수준 코어 최적화",
        category: "고급 기술",
        description: "V8 엔진 레벨 최적화와 메모리 관리",
        details: `JavaScript 엔진의 내부 동작을 이해하고 최적화하여 
    애플리케이션 성능을 극대화합니다. 메모리 누수 방지와 
    가비지 컬렉션 최적화를 통해 안정성을 향상시킵니다.`,
        implementation: [
            "V8 최적화 기법 적용 (Hidden Classes, Inline Caching)",
            "메모리 프로파일링 및 누수 탐지",
            "Web Workers 활용한 병렬 처리",
            "SharedArrayBuffer로 스레드 간 데이터 공유",
            "SIMD 연산 활용"
        ],
        tools: [
            { name: "Chrome DevTools", type: "프로파일링", description: "성능 분석 도구" },
            { name: "Clinic.js", type: "진단", description: "Node.js 성능 진단" },
            { name: "0x", type: "플레임 그래프", description: "CPU 프로파일링" },
            { name: "why-is-node-running", type: "디버깅", description: "프로세스 분석" }
        ],
        metrics: [
            { name: "메모리 사용량", value: "40% 감소", improvement: "-40%" },
            { name: "CPU 사용률", value: "30% 감소", improvement: "-30%" },
            { name: "처리 속도", value: "5배 향상", improvement: "+400%" }
        ],
        difficulty: "고급",
        timeToImplement: "2-3주",
        roi: 60,
        icon: Cpu,
        tags: ["V8", "최적화", "메모리", "성능"],
        codeExample: `// V8 최적화 예시: Hidden Classes 활용
// 나쁜 예 - Hidden Class 변경 유발
function Point(x, y) {
  this.x = x;
  this.y = y;
}
const p1 = new Point(1, 2);
p1.z = 3; // Hidden Class 변경!

// 좋은 예 - Hidden Class 유지
class Point3D {
  constructor(x, y, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z; // 처음부터 모든 속성 정의
  }
}

// 메모리 효율적인 배열 처리
const buffer = new SharedArrayBuffer(1024);
const view = new Int32Array(buffer);
// Web Worker에서 동시 접근 가능`
    },
    {
        id: 10,
        title: "엔터프라이즈 솔루션 활용",
        category: "인프라",
        description: "대규모 시스템을 위한 엔터프라이즈급 도구 통합",
        details: `이벤트 기반 아키텍처는 현대 플랫폼이 요구하는 
    응답성, 디커플링, 확장성을 제공합니다.
    대용량 트래픽과 복잡한 비즈니스 로직을 처리하기 위한 
    엔터프라이즈급 솔루션을 통합합니다.`,
        implementation: [
            "Kubernetes 오케스트레이션 구축",
            "Service Mesh (Istio/Linkerd) 구현",
            "분산 캐싱 전략 (Redis Cluster)",
            "CDN 및 Edge Computing 활용",
            "옵저버빌리티 스택 구축"
        ],
        tools: [
            { name: "Kubernetes", type: "오케스트레이션", description: "컨테이너 관리" },
            { name: "Istio", type: "서비스 메시", description: "트래픽 관리" },
            { name: "DataDog", type: "모니터링", description: "통합 옵저버빌리티" },
            { name: "HashiCorp Vault", type: "보안", description: "시크릿 관리" }
        ],
        metrics: [
            { name: "가용성", value: "99.99%", improvement: "+50%" },
            { name: "확장성", value: "무제한", improvement: "+∞" },
            { name: "운영 비용", value: "30% 절감", improvement: "-30%" }
        ],
        difficulty: "고급",
        timeToImplement: "4-6주",
        roi: 70,
        icon: Database,
        tags: ["Kubernetes", "엔터프라이즈", "확장성", "인프라"]
    }
];

// 카테고리별 색상
const categoryColors: Record<string, string> = {
    "개발 기초": "bg-blue-500",
    "AI 도구": "bg-purple-500",
    "디자인-개발": "bg-pink-500",
    "아키텍처": "bg-green-500",
    "DevOps": "bg-orange-500",
    "문서화": "bg-indigo-500",
    "성능": "bg-red-500",
    "협업": "bg-cyan-500",
    "고급 기술": "bg-yellow-500",
    "인프라": "bg-gray-500"
};

// 난이도별 색상
const difficultyColors: Record<string, string> = {
    "초급": "text-green-600 bg-green-50",
    "중급": "text-yellow-600 bg-yellow-50",
    "고급": "text-red-600 bg-red-50"
};

export default function VibeCodingReport() {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);

    const categories = ["all", ...Array.from(new Set(strategies.map(s => s.category)))];

    const filteredStrategies = selectedCategory === "all"
        ? strategies
        : strategies.filter(s => s.category === selectedCategory);

    const averageROI = Math.round(
        strategies.reduce((sum, s) => sum + s.roi, 0) / strategies.length
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* 헤더 섹션 */}
            <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                바이브 코딩 활용 전략 보고서 2025
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                최신 개발 트렌드와 AI 도구를 활용한 10가지 핵심 전략
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500">평균 ROI</div>
                            <div className="text-3xl font-bold text-green-600">{averageROI}%</div>
                        </div>
                    </div>

                    {/* 주요 지표 카드 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">개발 속도</p>
                                        <p className="text-2xl font-bold">3x</p>
                                    </div>
                                    <TrendingUp className="h-8 w-8 text-green-500" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">코드 품질</p>
                                        <p className="text-2xl font-bold">+45%</p>
                                    </div>
                                    <CheckCircle2 className="h-8 w-8 text-blue-500" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">배포 주기</p>
                                        <p className="text-2xl font-bold">일 단위</p>
                                    </div>
                                    <Clock className="h-8 w-8 text-purple-500" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-0 shadow-md">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">팀 효율성</p>
                                        <p className="text-2xl font-bold">+75%</p>
                                    </div>
                                    <Users className="h-8 w-8 text-orange-500" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </header>

            {/* 메인 컨텐츠 */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* 카테고리 필터 */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category)}
                                className="capitalize"
                            >
                                {category === "all" ? "전체" : category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* 전략 그리드 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredStrategies.map((strategy) => {
                        const Icon = strategy.icon;
                        return (
                            <Card
                                key={strategy.id}
                                className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0"
                                onClick={() => setSelectedStrategy(strategy)}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-lg ${categoryColors[strategy.category]} bg-opacity-10`}>
                                                <Icon className={`h-6 w-6 ${categoryColors[strategy.category].replace('bg-', 'text-')}`} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-xl">{strategy.title}</CardTitle>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="outline" className="text-xs">
                                                        {strategy.category}
                                                    </Badge>
                                                    <Badge className={difficultyColors[strategy.difficulty]}>
                                                        {strategy.difficulty}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-500">ROI</div>
                                            <div className="text-2xl font-bold text-green-600">{strategy.roi}%</div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {strategy.description}
                                    </p>

                                    {/* 주요 메트릭 */}
                                    <div className="space-y-2 mb-4">
                                        {strategy.metrics.slice(0, 2).map((metric, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">{metric.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{metric.value}</span>
                                                    <span className={`text-xs ${metric.improvement.startsWith('+') ? 'text-green-600' : 'text-blue-600'
                                                        }`}>
                                                        {metric.improvement}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 도구 태그 */}
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {strategy.tools.slice(0, 3).map((tool, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {tool.name}
                                            </Badge>
                                        ))}
                                        {strategy.tools.length > 3 && (
                                            <Badge variant="secondary" className="text-xs">
                                                +{strategy.tools.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* 구현 시간 및 자세히 보기 */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {strategy.timeToImplement}
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm">
                                            자세히 보기
                                            <ChevronRight className="h-4 w-4 ml-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* 상세 모달 */}
                {selectedStrategy && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-2xl">{selectedStrategy.title}</CardTitle>
                                        <CardDescription>{selectedStrategy.description}</CardDescription>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedStrategy(null);
                                        }}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="overview" className="w-full">
                                    <TabsList className="grid w-full grid-cols-4">
                                        <TabsTrigger value="overview">개요</TabsTrigger>
                                        <TabsTrigger value="implementation">구현</TabsTrigger>
                                        <TabsTrigger value="tools">도구</TabsTrigger>
                                        <TabsTrigger value="code">코드</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">상세 설명</h3>
                                            <div
                                                className="text-gray-600 dark:text-gray-300"
                                                dangerouslySetInnerHTML={{ __html: selectedStrategy.details }}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold mb-2">성과 지표</h3>
                                            <div className="space-y-3">
                                                {selectedStrategy.metrics.map((metric, idx) => (
                                                    <div key={idx}>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm">{metric.name}</span>
                                                            <span className="text-sm font-semibold">{metric.value}</span>
                                                        </div>
                                                        <Progress
                                                            value={Math.abs(parseInt(metric.improvement))}
                                                            className="h-2"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedStrategy.bestPractices && (
                                            <div>
                                                <h3 className="font-semibold mb-2">베스트 프랙티스</h3>
                                                <ul className="space-y-1">
                                                    {selectedStrategy.bestPractices.map((practice, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm text-gray-600 dark:text-gray-300">{practice}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="implementation" className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">구현 단계</h3>
                                            <ol className="space-y-2">
                                                {selectedStrategy.implementation.map((step, idx) => (
                                                    <li key={idx} className="flex items-start gap-3">
                                                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-semibold">
                                                            {idx + 1}
                                                        </span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-300">{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="tools" className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {selectedStrategy.tools.map((tool, idx) => (
                                                <Card key={idx}>
                                                    <CardContent className="p-4">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h4 className="font-semibold">{tool.name}</h4>
                                                                <Badge variant="outline" className="mt-1">{tool.type}</Badge>
                                                                {tool.description && (
                                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                                                        {tool.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                            {tool.url && (
                                                                <Button variant="ghost" size="icon">
                                                                    <ChevronRight className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="code">
                                        {selectedStrategy.codeExample ? (
                                            <div>
                                                <h3 className="font-semibold mb-2">코드 예시</h3>
                                                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                                    <code>{selectedStrategy.codeExample}</code>
                                                </pre>
                                            </div>
                                        ) : (
                                            <Alert>
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertDescription>
                                                    이 전략에 대한 코드 예시는 준비 중입니다.
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* 요약 섹션 */}
                <div className="mt-12">
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-0">
                        <CardHeader>
                            <CardTitle className="text-2xl">핵심 요약</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
                                    <Zap className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>즉시 적용 가능:</strong> AI 코딩 어시스턴트(Cursor/Copilot)와
                                        차세대 보일러플레이트를 활용하면 개발 속도를 즉시 3배 향상시킬 수 있습니다.
                                    </AlertDescription>
                                </Alert>

                                <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                                    <TrendingUp className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>최고 ROI:</strong> DevOps 자동화(90%)와 보일러플레이트(95%) 전략이
                                        가장 높은 투자 수익률을 보입니다.
                                    </AlertDescription>
                                </Alert>

                                <Alert className="border-purple-200 bg-purple-50 dark:bg-purple-900/20">
                                    <Brain className="h-4 w-4" />
                                    <AlertDescription>
                                        <strong>2025 트렌드:</strong> Figma Dev Mode MCP, WebAssembly,
                                        이벤트 기반 아키텍처가 차세대 개발의 핵심입니다.
                                    </AlertDescription>
                                </Alert>
                            </div>

                            <div className="mt-6 flex gap-4">
                                <Button size="lg" className="flex-1">
                                    <Package className="mr-2 h-4 w-4" />
                                    전체 가이드 다운로드
                                </Button>
                                <Button size="lg" variant="outline" className="flex-1">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    팀 컨설팅 요청
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 푸터 */}
                <footer className="mt-12 py-6 border-t text-center text-sm text-gray-500">
                    <p>© 2025 바이브 코딩 전략 보고서 | 작성일: {new Date().toLocaleDateString('ko-KR')}</p>
                    <p className="mt-2">
                        본 보고서는 2025년 8월 최신 기술 트렌드와 업계 베스트 프랙티스를 기반으로 작성되었습니다.
                    </p>
                </footer>
            </main>
        </div>
    );
}