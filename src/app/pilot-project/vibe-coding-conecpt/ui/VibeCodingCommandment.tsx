"use client";

import React, { useState } from 'react';
import {
    Building2, Package, Trophy, Database, Users,
    Workflow, MessageSquare, Rocket, BookOpen,
    Handshake, ChevronRight, ExternalLink, Target,
    Star, Code, Wrench, Clock, CheckCircle, GitBranch,
    Cpu, Cloud, Zap, Layers, Brain
} from 'lucide-react';

interface PrincipleData {
    id: number;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    action: string;
    actionPlan: {
        title: string;
        category: string;
        priority: string;
        steps: string[];
        timeframe: string;
        tools: string[];
    };
    references: { title: string; url: string; }[];
    boilerplates: { title: string; description: string; tech: string; url: string; }[];
}

const DevAssistantPrinciples = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const principles: PrincipleData[] = [
        {
            id: 1,
            icon: <Building2 className="w-6 h-6" />,
            title: "고품질 아키텍쳐",
            subtitle: "대규모 트래픽과 MSA를 위한 리액티브 아키텍처 설계",
            description: "Spring WebFlux, R2DBC, 하이브리드 벡터 스토어 등 최신 기술을 활용한 논블로킹 비동기 아키텍처로 적은 리소스로 대규모 트래픽을 처리합니다. AWS S3 Vector Store처럼 비용 효율적이면서도 확장 가능한 시스템을 구축하여 네카라쿠배 수준의 아키텍처를 구현합니다.",
            action: "논블로킹 리액티브 시스템으로 전환, 리소스 90% 효율화 달성",
            actionPlan: {
                title: "리액티브 아키텍처 전환",
                category: "아키텍처",
                priority: "높음",
                steps: [
                    "Spring WebFlux + Kotlin Coroutine 기반 논블로킹 시스템 구축",
                    "R2DBC를 활용한 비동기 DB 액세스 레이어 구현",
                    "AWS S3 Vector Store로 하이브리드 벡터 스토어 구축",
                    "Event-Driven Architecture로 MSA 간 느슨한 결합",
                    "Circuit Breaker 패턴으로 장애 격리 및 복원력 확보"
                ],
                timeframe: "12주",
                tools: ["Spring WebFlux", "R2DBC", "AWS S3 Vector", "Kafka", "Resilience4j"]
            },
            references: [
                { title: "Spring WebFlux 완전 정복", url: "https://fastcampus.co.kr/dev_online_webflux" },
                { title: "AWS S3 Vector Store 아키텍처", url: "https://news.hada.io/topic?id=22354" },
                { title: "리액티브 프로그래밍 with Spring", url: "https://www.inflearn.com/course/spring-webflux-llm실전구현" },
                { title: "MSA 패턴과 구현", url: "https://microservices.io/patterns/" },
                { title: "NVIDIA 대규모 AI 인프라", url: "https://developer.nvidia.com/blog/" },
                { title: "하이브리드 클라우드 아키텍처", url: "https://aws.amazon.com/hybrid/" }
            ],
            boilerplates: [
                { title: "Spring WebFlux Starter", description: "논블로킹 리액티브 웹 애플리케이션", tech: "WebFlux + R2DBC", url: "https://github.com/spring-projects/spring-boot" },
                { title: "Vector Store Template", description: "하이브리드 벡터 스토어 구현", tech: "AWS S3 + OpenSearch", url: "https://github.com/aws-samples" },
                { title: "MSA Template", description: "마이크로서비스 아키텍처 보일러플레이트", tech: "Spring Cloud", url: "https://github.com/spring-cloud-samples" },
                { title: "Event Sourcing", description: "이벤트 드리븐 시스템 템플릿", tech: "Kafka + Spring", url: "https://github.com/eventuate-examples" }
            ]
        },
        {
            id: 2,
            icon: <Package className="w-6 h-6" />,
            title: "온갖 종류의 파일럿, 보일러플레이트 관리",
            subtitle: "AI로 3시간 만에 $50,000 절감하는 맞춤형 도구 개발",
            description: "AI 비빙 코딩으로 복잡한 내부 도구를 코드 한 줄 없이 구축합니다. Replit, Cursor, Loveable 등의 AI 도구로 기존 SaaS 대비 90% 비용 절감하며, 프로토타입을 몇 시간 만에 완성합니다. OpenAI gpt-oss 같은 오픈소스 모델을 활용해 맞춤형 솔루션을 빠르게 개발합니다.",
            action: "AI 도구로 개발 시간 95% 단축, 연간 $100,000+ 비용 절감",
            actionPlan: {
                title: "AI 기반 도구 자동화",
                category: "생산성",
                priority: "높음",
                steps: [
                    "팀별 요구사항 분석 및 AI 도구 선정",
                    "Replit/Cursor로 내부 도구 비빙 코딩",
                    "OpenAI gpt-oss 모델로 맞춤형 AI 어시스턴트 구축",
                    "보일러플레이트 자동 생성 시스템 구현",
                    "프로토타입 → MVP → 프로덕션 파이프라인 구축"
                ],
                timeframe: "4주",
                tools: ["Replit", "Cursor", "Loveable", "gpt-oss", "Hugging Face"]
            },
            references: [
                { title: "AI로 만든 12개 도구 사례", url: "https://every.to/p/i-found-12-people-who-ditched-their-expensive-software-for-ai-built-tools" },
                { title: "OpenAI gpt-oss 활용 가이드", url: "https://openai.com/index/introducing-gpt-oss/" },
                { title: "비빙 코딩 실전 사례", url: "https://replit.com/gallery" },
                { title: "AI 코딩 어시스턴트", url: "https://github.com/openai/gpt-oss" },
                { title: "노코드 개발 플랫폼", url: "https://bubble.io/" },
                { title: "AI 파일럿 프로젝트", url: "https://www.cursor.com/" }
            ],
            boilerplates: [
                { title: "AI Assistant Template", description: "gpt-oss 기반 어시스턴트", tech: "gpt-oss-120b", url: "https://github.com/openai/gpt-oss" },
                { title: "No-Code Builder", description: "AI로 앱 자동 생성", tech: "Replit Agent", url: "https://replit.com/@templates" },
                { title: "Vendor Portal", description: "95% AI 생성 벤더 관리 시스템", tech: "AI Generated", url: "https://replit.com/gallery/work" },
                { title: "Course Platform", description: "AI로 만든 교육 플랫폼", tech: "Vibe Coded", url: "https://github.com/vibe-coding" }
            ]
        },
        {
            id: 3,
            icon: <Trophy className="w-6 h-6" />,
            title: "고품질 인센티브 지급 시스템",
            subtitle: "문제 해결, 보일러플레이트 기여, 전문 지식에 대한 보상",
            description: "개발자의 기여도를 정량화하고 자동으로 보상하는 시스템을 구축합니다. PR 품질, 코드 리뷰, 보일러플레이트 생성, 기술 문서 작성, 멘토링 등 모든 기여를 추적하고 토큰이나 포인트로 보상합니다. OpenAI의 Red Teaming Challenge처럼 $500,000 규모의 인센티브 프로그램을 운영합니다.",
            action: "자동화된 기여도 측정 시스템으로 팀 생산성 40% 향상",
            actionPlan: {
                title: "기여도 기반 보상 시스템",
                category: "인센티브",
                priority: "높음",
                steps: [
                    "GitHub Actions로 코드 기여도 자동 측정",
                    "보일러플레이트 생성 및 공유 보상 체계",
                    "기술 블로그, 문서화 기여 포인트 시스템",
                    "Bug Bounty 및 Security Challenge 운영",
                    "분기별 MVP 선정 및 특별 보상"
                ],
                timeframe: "8주",
                tools: ["GitHub Actions", "JIRA", "Confluence", "Smart Contract", "Analytics"]
            },
            references: [
                { title: "OpenAI Red Teaming Challenge", url: "https://openai.com/index/introducing-gpt-oss/" },
                { title: "개발자 생산성 측정", url: "https://blog.gitprime.com/developer-productivity-metrics/" },
                { title: "인센티브 시스템 설계", url: "https://hbr.org/2016/01/what-having-a-growth-mindset-actually-means" },
                { title: "오픈소스 기여 가이드", url: "https://opensource.guide/" },
                { title: "Bug Bounty 프로그램", url: "https://www.hackerone.com/" },
                { title: "토큰 이코노미", url: "https://ethereum.org/en/developers/" }
            ],
            boilerplates: [
                { title: "Contribution Tracker", description: "기여도 자동 추적 시스템", tech: "GitHub API", url: "https://github.com/github/super-linter" },
                { title: "Reward System", description: "블록체인 기반 보상 시스템", tech: "Ethereum + Web3", url: "https://github.com/austintgriffith/scaffold-eth" },
                { title: "Bug Bounty Platform", description: "버그 바운티 플랫폼", tech: "Node.js + React", url: "https://github.com/bugcrowd" },
                { title: "Analytics Dashboard", description: "기여도 분석 대시보드", tech: "Grafana", url: "https://github.com/grafana/grafana" }
            ]
        },
        {
            id: 4,
            icon: <Database className="w-6 h-6" />,
            title: "Row 레벨 or Core에 대한 이해",
            subtitle: "저수준 최적화부터 비즈니스 로직까지 깊이 있는 이해",
            description: "Spring WebFlux와 Netty의 내부 코드를 분석하고, 리액터 패턴의 핵심을 이해합니다. 데이터베이스 샤딩, 인덱싱, 쿼리 최적화부터 JVM 튜닝, 가비지 컬렉션까지 시스템의 모든 레이어를 깊이 있게 이해하고 최적화합니다. NVIDIA의 TensorRT처럼 커널 레벨 최적화도 수행합니다.",
            action: "코어 레벨 최적화로 성능 10배 향상, 레이턴시 90% 감소",
            actionPlan: {
                title: "딥 다이브 최적화",
                category: "성능",
                priority: "높음",
                steps: [
                    "Spring WebFlux/Netty 소스 코드 분석",
                    "DB 쿼리 플랜 분석 및 인덱스 최적화",
                    "JVM 프로파일링 및 GC 튜닝",
                    "메모리 레이아웃 및 캐시 최적화",
                    "커널 레벨 시스템 콜 최적화"
                ],
                timeframe: "16주",
                tools: ["JProfiler", "VisualVM", "Perf", "BPF", "Flame Graphs"]
            },
            references: [
                { title: "Netty 내부 구조", url: "https://netty.io/wiki/" },
                { title: "JVM 성능 튜닝", url: "https://docs.oracle.com/javase/8/docs/technotes/guides/vm/performance-enhancements-7.html" },
                { title: "데이터베이스 내부", url: "https://www.databass.dev/" },
                { title: "시스템 성능 분석", url: "https://www.brendangregg.com/perf.html" },
                { title: "NVIDIA 커널 최적화", url: "https://developer.nvidia.com/blog/" },
                { title: "리액터 패턴 심화", url: "https://projectreactor.io/docs" }
            ],
            boilerplates: [
                { title: "Performance Profiler", description: "성능 프로파일링 도구", tech: "Java + JMH", url: "https://github.com/openjdk/jmh" },
                { title: "Query Optimizer", description: "SQL 쿼리 최적화 도구", tech: "PostgreSQL", url: "https://github.com/ankane/pghero" },
                { title: "Memory Analyzer", description: "메모리 분석 도구", tech: "Eclipse MAT", url: "https://github.com/eclipse-mat/mat" },
                { title: "System Monitor", description: "시스템 모니터링 대시보드", tech: "Prometheus", url: "https://github.com/prometheus/prometheus" }
            ]
        },
        {
            id: 5,
            icon: <Users className="w-6 h-6" />,
            title: "인재가 무조건 중요 (AI만 그런게 아님)",
            subtitle: "최고의 인재를 채용하고 성장시키는 체계적 시스템",
            description: "AI 시대에도 인간 개발자의 창의성과 문제 해결 능력은 대체 불가능합니다. T자형 인재를 육성하고, 지속적 학습 문화를 구축합니다. 멘토링, 페어 프로그래밍, 기술 공유 세션을 통해 팀 전체의 역량을 끌어올립니다. 개인의 성장이 곧 회사의 성장임을 인식하고 투자합니다.",
            action: "체계적 인재 육성으로 팀 역량 2배 향상, 이직률 50% 감소",
            actionPlan: {
                title: "인재 육성 시스템",
                category: "인재관리",
                priority: "높음",
                steps: [
                    "기술 역량 평가 매트릭스 구축",
                    "개인별 맞춤형 성장 로드맵 설계",
                    "멘토링 및 코칭 프로그램 운영",
                    "내부 기술 컨퍼런스 및 해커톤 개최",
                    "외부 교육 및 자격증 지원 프로그램"
                ],
                timeframe: "지속적",
                tools: ["LinkedIn Learning", "Coursera", "Udemy", "O'Reilly", "Pluralsight"]
            },
            references: [
                { title: "효과적 학습법", url: "https://www.coursera.org/learn/learning-how-to-learn" },
                { title: "T자형 인재 육성", url: "https://hbr.org/2016/01/what-having-a-growth-mindset-actually-means" },
                { title: "심리적 안전감", url: "https://rework.withgoogle.com/guides/understanding-team-effectiveness/" },
                { title: "개발자 커리어 가이드", url: "https://roadmap.sh/" },
                { title: "멘토링 프로그램", url: "https://www.atlassian.com/team-playbook/plays/mentor-mentee" },
                { title: "기술 리더십", url: "https://www.oreilly.com/library/view/the-managers-path/9781491973882/" }
            ],
            boilerplates: [
                { title: "Skill Matrix", description: "팀 역량 평가 매트릭스", tech: "Excel/Notion", url: "https://github.com/kamranahmedse/developer-roadmap" },
                { title: "Mentorship Platform", description: "멘토링 매칭 플랫폼", tech: "React + Node", url: "https://github.com/mentorship" },
                { title: "Learning Portal", description: "내부 학습 포털", tech: "LMS", url: "https://github.com/edx/edx-platform" },
                { title: "Career Framework", description: "커리어 프레임워크", tech: "Documentation", url: "https://github.com/spotify/backstage" }
            ]
        },
        {
            id: 6,
            icon: <Workflow className="w-6 h-6" />,
            title: "기획 => 개발 과정 간소화",
            subtitle: "PRD 대신 프로토타입, 3일 만에 MVP 출시",
            description: "기획 문서(PRD) 대신 AI로 즉시 프로토타입을 만들어 의사결정을 가속화합니다. Homebase처럼 모든 로드맵 아이템에 Loveable 프로토타입을 첨부하고, 3일 만에 첫 고객을 확보한 GenAIPI 사례처럼 빠른 실행을 추구합니다. 아이디어에서 첫 수익까지 4주 내 달성을 목표로 합니다.",
            action: "프로토타입 중심 개발로 출시 속도 10배 향상",
            actionPlan: {
                title: "래피드 프로토타이핑",
                category: "프로세스",
                priority: "높음",
                steps: [
                    "AI 도구로 즉시 프로토타입 생성",
                    "사용자 피드백 실시간 반영 시스템",
                    "A/B 테스트 자동화 인프라 구축",
                    "Feature Flag로 점진적 배포",
                    "고객 검증 → 개발 → 출시 3일 사이클"
                ],
                timeframe: "2주",
                tools: ["Figma", "Loveable", "Vercel", "PostHog", "LaunchDarkly"]
            },
            references: [
                { title: "프로토타입의 가치", url: "https://every.to/p/i-found-12-people-who-ditched-their-expensive-software-for-ai-built-tools" },
                { title: "린 스타트업", url: "http://theleanstartup.com/" },
                { title: "디자인 씽킹", url: "https://www.interaction-design.org/literature/topics/design-thinking" },
                { title: "애자일 개발", url: "https://agilemanifesto.org/" },
                { title: "MVP 전략", url: "https://www.productplan.com/glossary/minimum-viable-product/" },
                { title: "피처 플래그", url: "https://launchdarkly.com/blog/what-are-feature-flags/" }
            ],
            boilerplates: [
                { title: "Rapid Prototype", description: "AI 프로토타입 템플릿", tech: "Loveable", url: "https://loveable.dev/templates" },
                { title: "MVP Starter", description: "3일 MVP 템플릿", tech: "Next.js", url: "https://github.com/vercel/commerce" },
                { title: "A/B Testing", description: "A/B 테스트 프레임워크", tech: "React + Analytics", url: "https://github.com/growthbook/growthbook" },
                { title: "Feature Flags", description: "피처 플래그 시스템", tech: "Unleash", url: "https://github.com/Unleash/unleash" }
            ]
        },
        {
            id: 7,
            icon: <MessageSquare className="w-6 h-6" />,
            title: "실시간으로 모든 정보가 공유되고 논의",
            subtitle: "비동기 협업과 실시간 피드백의 완벽한 조화",
            description: "Slack, Discord, Notion을 활용한 실시간 정보 공유 체계를 구축합니다. 모든 의사결정 과정을 투명하게 공개하고, AI 봇으로 자동 요약 및 알림을 제공합니다. 시간대가 다른 글로벌 팀도 효율적으로 협업할 수 있는 비동기 커뮤니케이션 문화를 정착시킵니다.",
            action: "정보 공유 지연 시간 95% 감소, 의사결정 속도 3배 향상",
            actionPlan: {
                title: "실시간 협업 시스템",
                category: "커뮤니케이션",
                priority: "높음",
                steps: [
                    "Slack/Discord 채널 체계 최적화",
                    "AI 요약 봇 및 자동 알림 시스템",
                    "Notion 기반 실시간 문서 협업",
                    "비디오 회의 자동 기록 및 공유",
                    "글로벌 비동기 협업 프로토콜 정립"
                ],
                timeframe: "4주",
                tools: ["Slack", "Notion", "Discord", "Loom", "Linear"]
            },
            references: [
                { title: "비동기 협업 가이드", url: "https://about.gitlab.com/company/culture/all-remote/asynchronous/" },
                { title: "투명한 조직 문화", url: "https://buffer.com/resources/transparency/" },
                { title: "효과적 커뮤니케이션", url: "https://basecamp.com/guides/how-we-communicate" },
                { title: "원격 협업 도구", url: "https://remote.tools/" },
                { title: "Slack 활용법", url: "https://slack.com/intl/ko-kr/resources" },
                { title: "정보 공유 문화", url: "https://www.atlassian.com/work-management/knowledge-sharing" }
            ],
            boilerplates: [
                { title: "Slack Bot Framework", description: "팀 협업 자동화 봇", tech: "Node.js + Slack API", url: "https://github.com/slackapi/bolt-js" },
                { title: "Meeting Summarizer", description: "회의 자동 요약 도구", tech: "AI + Transcription", url: "https://github.com/openai/whisper" },
                { title: "Knowledge Base", description: "팀 지식 관리 시스템", tech: "Docusaurus", url: "https://github.com/facebook/docusaurus" },
                { title: "Async Workflow", description: "비동기 워크플로우 템플릿", tech: "GitHub Actions", url: "https://github.com/nektos/act" }
            ]
        },
        {
            id: 8,
            icon: <Rocket className="w-6 h-6" />,
            title: "DevOps는 최첨단이어야 함",
            subtitle: "GitOps, IaC, 서버리스로 배포 시간 90% 단축",
            description: "Kubernetes, ArgoCD, Terraform으로 완전 자동화된 GitOps 파이프라인을 구축합니다. 서버리스와 엣지 컴퓨팅으로 인프라 비용을 최소화하고, 모든 환경을 코드로 관리합니다. NVIDIA GB200처럼 최신 하드웨어도 즉시 활용할 수 있는 유연한 인프라를 구축합니다.",
            action: "배포 주기 1일 10회 이상, 장애 복구 시간 5분 이내",
            actionPlan: {
                title: "차세대 DevOps 구축",
                category: "인프라",
                priority: "높음",
                steps: [
                    "GitOps 기반 자동 배포 파이프라인",
                    "Infrastructure as Code 전면 도입",
                    "서버리스 및 엣지 컴퓨팅 활용",
                    "카나리 배포 및 자동 롤백 시스템",
                    "AI 기반 장애 예측 및 자동 복구"
                ],
                timeframe: "12주",
                tools: ["Kubernetes", "ArgoCD", "Terraform", "Istio", "Prometheus"]
            },
            references: [
                { title: "GitOps 가이드", url: "https://www.weave.works/technologies/gitops/" },
                { title: "Infrastructure as Code", url: "https://www.terraform.io/intro" },
                { title: "서버리스 아키텍처", url: "https://aws.amazon.com/serverless/" },
                { title: "쿠버네티스 베스트 프랙티스", url: "https://kubernetes.io/docs/concepts/cluster-administration/manage-deployment/" },
                { title: "엣지 컴퓨팅", url: "https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/" },
                { title: "SRE 핸드북", url: "https://sre.google/sre-book/table-of-contents/" }
            ],
            boilerplates: [
                { title: "GitOps Pipeline", description: "ArgoCD 기반 GitOps", tech: "K8s + ArgoCD", url: "https://github.com/argoproj/argo-cd" },
                { title: "IaC Templates", description: "Terraform 모듈 라이브러리", tech: "Terraform", url: "https://github.com/terraform-aws-modules" },
                { title: "Serverless Framework", description: "서버리스 애플리케이션", tech: "AWS Lambda", url: "https://github.com/serverless/serverless" },
                { title: "K8s Manifests", description: "프로덕션 레디 K8s 템플릿", tech: "Helm Charts", url: "https://github.com/helm/charts" }
            ]
        },
        {
            id: 9,
            icon: <BookOpen className="w-6 h-6" />,
            title: "교과서를 쓰고, 앞서가야 한다는 마인드",
            subtitle: "업계 표준을 만들고 오픈소스로 기여하는 리더십",
            description: "단순히 기술을 사용하는 것이 아니라 표준을 만들고 교과서를 씁니다. 오픈소스 프로젝트를 리드하고, 기술 블로그와 컨퍼런스 발표로 지식을 공유합니다. OpenAI가 gpt-oss를 오픈소스로 공개한 것처럼, 우리의 혁신을 커뮤니티와 공유하며 생태계를 선도합니다.",
            action: "연간 10개 이상 오픈소스 기여, 기술 표준 2개 이상 제안",
            actionPlan: {
                title: "기술 리더십 확립",
                category: "리더십",
                priority: "높음",
                steps: [
                    "주요 오픈소스 프로젝트 메인테이너 활동",
                    "기술 블로그 주 1회 이상 발행",
                    "국제 컨퍼런스 발표 및 워크샵 진행",
                    "사내 기술을 오픈소스로 공개",
                    "RFC 작성 및 표준화 기구 참여"
                ],
                timeframe: "지속적",
                tools: ["GitHub", "Medium", "Dev.to", "YouTube", "Conferences"]
            },
            references: [
                { title: "오픈소스 가이드", url: "https://opensource.guide/" },
                { title: "기술 블로그 작성법", url: "https://developers.google.com/tech-writing" },
                { title: "컨퍼런스 발표 가이드", url: "https://speaking.io/" },
                { title: "RFC 작성 가이드", url: "https://www.rfc-editor.org/rfc/rfc7322.html" },
                { title: "개발자 브랜딩", url: "https://www.swyx.io/learn-in-public" },
                { title: "기술 표준화", url: "https://www.w3.org/standards/" }
            ],
            boilerplates: [
                { title: "Tech Blog Starter", description: "기술 블로그 템플릿", tech: "Gatsby + MDX", url: "https://github.com/gatsbyjs/gatsby-starter-blog" },
                { title: "OSS Project Template", description: "오픈소스 프로젝트 템플릿", tech: "GitHub Templates", url: "https://github.com/github/opensource.guide" },
                { title: "Documentation Site", description: "기술 문서 사이트", tech: "Docusaurus", url: "https://github.com/facebook/docusaurus" },
                { title: "Conference Talk Kit", description: "컨퍼런스 발표 자료", tech: "Reveal.js", url: "https://github.com/hakimel/reveal.js" }
            ]
        },
        {
            id: 10,
            icon: <Handshake className="w-6 h-6" />,
            title: "협업이 점점 더 중요",
            subtitle: "AI와 인간, 팀과 팀, 회사와 커뮤니티의 시너지",
            description: "AI 도구와 인간 개발자의 협업, 개발팀과 비즈니스팀의 협업, 회사와 오픈소스 커뮤니티의 협업을 극대화합니다. 페어 프로그래밍, 몹 프로그래밍, 크로스 펑셔널 팀을 통해 시너지를 창출합니다. 경계를 넘나드는 협업으로 혁신을 가속화합니다.",
            action: "크로스 팀 협업 프로젝트 월 5개 이상, 커뮤니티 기여도 상위 1%",
            actionPlan: {
                title: "협업 시너지 극대화",
                category: "협업",
                priority: "높음",
                steps: [
                    "AI 페어 프로그래밍 세션 정례화",
                    "크로스 펑셔널 팀 구성 및 운영",
                    "오픈소스 커뮤니티 적극 참여",
                    "파트너사와 공동 개발 프로젝트",
                    "고객과 함께하는 코크리에이션"
                ],
                timeframe: "지속적",
                tools: ["GitHub Copilot", "VS Code Live Share", "Miro", "Figma", "Discord"]
            },
            references: [
                { title: "효과적 페어 프로그래밍", url: "https://martinfowler.com/articles/on-pair-programming.html" },
                { title: "크로스 펑셔널 팀", url: "https://www.atlassian.com/agile/teams" },
                { title: "AI 협업 가이드", url: "https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/" },
                { title: "커뮤니티 참여", url: "https://opensource.guide/how-to-contribute/" },
                { title: "팀 시너지", url: "https://rework.withgoogle.com/guides/" },
                { title: "코크리에이션", url: "https://hbr.org/2018/01/the-value-of-co-creation" }
            ],
            boilerplates: [
                { title: "Pair Programming Setup", description: "원격 페어 프로그래밍 환경", tech: "VS Code + Live Share", url: "https://github.com/MicrosoftDocs/live-share" },
                { title: "Team Collaboration", description: "팀 협업 플랫폼", tech: "Slack + GitHub", url: "https://github.com/integrations/slack" },
                { title: "Community Platform", description: "커뮤니티 플랫폼", tech: "Discourse", url: "https://github.com/discourse/discourse" },
                { title: "Co-creation Toolkit", description: "공동 창작 도구 모음", tech: "Miro + Figma", url: "https://github.com/figma/plugin-samples" }
            ]
        }
    ];

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case '높음': return 'bg-red-100 text-red-800 border-red-200';
            case '중간': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case '낮음': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
                <div className="relative container max-w-6xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-sm font-medium">AI 시대의 개발 혁신</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                        개발 어시스턴트 10대 핵심 원칙
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                        AI와 함께 만드는 차세대 개발 문화와 최첨단 업무 관리 시스템
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Target className="w-4 h-4" />
                            <span>10가지 핵심 원칙</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <CheckCircle className="w-4 h-4" />
                            <span>실전 검증된 방법론</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <BookOpen className="w-4 h-4" />
                            <span>최신 기술 스택</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Principles Grid */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-8xl mx-auto">
                    <div className="space-y-12">
                        {principles.map((principle) => (
                            <div
                                key={principle.id}
                                className="group relative"
                                onMouseEnter={() => setHoveredCard(principle.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* 배경 그라데이션 */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl transition-all duration-300 ${hoveredCard === principle.id ? 'from-blue-500/10 via-indigo-500/10 to-purple-500/10 scale-105' : ''
                                    }`}></div>

                                <div className="relative grid lg:grid-cols-3 gap-8 items-stretch p-6">
                                    {/* 첫 번째 열: 원칙 + 액션 플랜 */}
                                    <div
                                        className={`relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${hoveredCard === principle.id || selectedCard === principle.id
                                            ? 'ring-2 ring-blue-500 ring-offset-2 transform translate-y-[-4px]'
                                            : ''
                                            }`}
                                        onClick={() => setSelectedCard(selectedCard === principle.id ? null : principle.id)}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                                        <div className="p-8 h-full flex flex-col">
                                            {/* Header */}
                                            <div className="flex items-start gap-5 mb-6">
                                                <div className="flex-shrink-0">
                                                    <div className="relative">
                                                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                                                            {principle.icon}
                                                        </div>
                                                        <div className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold shadow-md">
                                                            {principle.id}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            원칙 #{principle.id}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                                                        {principle.title}
                                                    </h3>
                                                    <p className="text-sm font-semibold text-indigo-600">
                                                        {principle.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="mb-6">
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {principle.description}
                                                </p>
                                            </div>

                                            {/* Action */}
                                            <div className="mb-6">
                                                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-200">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Target className="w-4 h-4 text-blue-600" />
                                                        <span className="text-sm font-semibold text-gray-900">목표 액션</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 font-medium">
                                                        {principle.action}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Plan Summary */}
                                            <div className="mt-auto">
                                                <div className="border-t border-gray-200 pt-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="text-sm font-bold text-gray-900">{principle.actionPlan.title}</h4>
                                                        <div className="flex gap-2">
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(principle.actionPlan.priority)}`}>
                                                                {principle.actionPlan.priority}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{principle.actionPlan.timeframe}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{principle.actionPlan.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 두 번째 열: 참고 자료 */}
                                    <div className={`rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 ${hoveredCard === principle.id || selectedCard === principle.id
                                        ? 'ring-2 ring-indigo-500 ring-offset-2 transform translate-y-[-4px]'
                                        : ''
                                        }`}>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                        <div className="p-8 h-full flex flex-col">
                                            {/* 헤더 */}
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold">
                                                    {principle.id}
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    참고 자료
                                                </h3>
                                            </div>

                                            {/* 참고 자료 섹션 */}
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4 text-indigo-600" />
                                                    핵심 레퍼런스
                                                </h4>
                                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                                    {principle.references.map((reference, index) => (
                                                        <a
                                                            key={index}
                                                            href={reference.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all group border border-transparent hover:border-indigo-200"
                                                        >
                                                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 flex-shrink-0 transition-colors" />
                                                            <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-tight font-medium">
                                                                {reference.title}
                                                            </span>
                                                            <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-600 ml-auto opacity-0 group-hover:opacity-100 transition-all" />
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 세 번째 열: 보일러플레이트 */}
                                    <div className={`rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 ${hoveredCard === principle.id || selectedCard === principle.id
                                        ? 'ring-2 ring-purple-500 ring-offset-2 transform translate-y-[-4px]'
                                        : ''
                                        }`}>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                                        <div className="p-8 h-full flex flex-col">
                                            {/* 헤더 */}
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-bold">
                                                    {principle.id}
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">
                                                    보일러플레이트
                                                </h3>
                                            </div>

                                            {/* 보일러플레이트 섹션 */}
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <Package className="w-4 h-4 text-purple-600" />
                                                    실전 템플릿
                                                </h4>
                                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                                    {principle.boilerplates.map((boilerplate, index) => (
                                                        <a
                                                            key={index}
                                                            href={boilerplate.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block p-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all group border border-gray-100 hover:border-purple-200"
                                                        >
                                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                                <h5 className="text-sm font-semibold text-gray-900 group-hover:text-purple-700">
                                                                    {boilerplate.title}
                                                                </h5>
                                                                <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-purple-600 flex-shrink-0 transition-colors" />
                                                            </div>
                                                            <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                                                                {boilerplate.description}
                                                            </p>
                                                            <div className="flex items-center gap-2">
                                                                <Code className="w-3 h-3 text-purple-500" />
                                                                <span className="text-xs font-medium text-purple-600">
                                                                    {boilerplate.tech}
                                                                </span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-12">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">AI 시대의 개발 혁신을 선도하세요</h3>
                    <p className="text-blue-100 mb-6">
                        10대 핵심 원칙을 실천하여 차세대 개발 문화를 만들어가세요
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                        <span className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            최신 기술
                        </span>
                        <span className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-blue-400" />
                            실전 검증
                        </span>
                        <span className="flex items-center gap-2">
                            <Rocket className="w-4 h-4 text-purple-400" />
                            지속적 혁신
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevAssistantPrinciples;