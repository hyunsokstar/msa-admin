"use client";

import React, { useState } from 'react';
import {
    Zap, Shield, Rocket, Settings, Server, Eye, Users,
    Users2, Activity, FlaskConical, Plane, CheckCircle,
    Clock, ChevronRight, BookOpen, ExternalLink, Target,
    Star, Code, Package, Wrench
} from 'lucide-react';

interface CommandmentData {
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

const VibeCodingCommandmentV3 = () => {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);

    const commandments: CommandmentData[] = [
        {
            id: 1,
            icon: <Zap className="w-6 h-6" />,
            title: "엘리베이터, 에스컬레이터, 눈치우는 기계 같은 편리함",
            subtitle: "사용자가 생각하기도 전에 문제를 해결하는 직관적 시스템",
            description: "버튼 하나로 모든 것이 해결되는 엘리베이터처럼, 복잡한 비즈니스 로직을 단순하고 직관적인 인터페이스로 추상화하라. 사용자는 내부 구조를 몰라도 되고, 개발자는 확장 가능한 아키텍처를 구축해야 한다. 진정한 편리함은 복잡성을 숨기는 것이 아니라 올바르게 관리하는 것이다.",
            action: "복잡한 워크플로우를 3단계 이하로 단순화, UX 만족도 95% 이상 달성",
            actionPlan: {
                title: "직관적 시스템 설계",
                category: "UX/UI",
                priority: "높음",
                steps: [
                    "사용자 여정 맵핑 및 Pain Point 분석",
                    "원클릭 솔루션 및 자동화 워크플로우 설계",
                    "Progressive Disclosure 패턴으로 복잡성 관리",
                    "A/B 테스트로 사용성 지속 개선",
                    "접근성(WCAG 2.1) 및 반응형 설계 완성"
                ],
                timeframe: "8주",
                tools: ["Figma", "React", "TypeScript", "Framer Motion", "Analytics"]
            },
            references: [
                { title: "사용자 경험 설계", url: "https://www.nngroup.com/articles/" },
                { title: "직관적 인터페이스 원칙", url: "https://lawsofux.com/" },
                { title: "Progressive Disclosure", url: "https://www.interaction-design.org/literature/article/progressive-disclosure" },
                { title: "접근성 가이드라인", url: "https://www.w3.org/WAI/WCAG21/quickref/" },
                { title: "Google Material Design", url: "https://material.io/design" },
                { title: "Apple Human Interface", url: "https://developer.apple.com/design/human-interface-guidelines/" }
            ],
            boilerplates: [
                { title: "React Admin Dashboard", description: "완전한 관리자 대시보드 템플릿", tech: "React + TypeScript", url: "https://github.com/marmelab/react-admin" },
                { title: "Next.js SaaS Starter", description: "SaaS 앱을 위한 완전한 스타터 킷", tech: "Next.js + Prisma", url: "https://github.com/vercel/nextjs-subscription-payments" },
                { title: "Chakra UI Components", description: "접근성을 고려한 UI 컴포넌트 라이브러리", tech: "React + Chakra UI", url: "https://chakra-ui.com/" },
                { title: "Headless UI Templates", description: "완전히 접근 가능한 UI 컴포넌트", tech: "React + Tailwind", url: "https://headlessui.com/" }
            ]
        },
        {
            id: 2,
            icon: <Shield className="w-6 h-6" />,
            title: "전차 부대, 드론 같은 치열함",
            subtitle: "정확하고 빠르며 목표 지향적인 개발 전략",
            description: "전차가 장애물을 뚫고 나아가듯, 드론이 정확한 타겟을 노리듯, 개발에서도 명확한 목표와 전략으로 돌파구를 만들어라. 기술적 부채, 레거시 시스템, 성능 병목을 정면 돌파하고, 경쟁사보다 10배 빠른 솔루션으로 시장을 선점하라. 치열함 없이는 혁신도 없다.",
            action: "핵심 성능 지표 30% 개선, 기술적 부채 50% 감소",
            actionPlan: {
                title: "전략적 돌파 시스템",
                category: "성능최적화",
                priority: "높음",
                steps: [
                    "성능 병목 지점 정밀 분석 및 우선순위 설정",
                    "레거시 코드 리팩토링 전략 수립",
                    "자동화된 성능 모니터링 시스템 구축",
                    "마이크로 최적화 vs 아키텍처 개선 균형점 찾기",
                    "경쟁 분석 및 벤치마킹으로 목표 설정"
                ],
                timeframe: "12주",
                tools: ["Lighthouse", "WebPageTest", "New Relic", "DataDog", "Artillery"]
            },
            references: [
                { title: "웹 성능 최적화", url: "https://web.dev/performance/" },
                { title: "Core Web Vitals", url: "https://web.dev/vitals/" },
                { title: "성능 모니터링", url: "https://developers.google.com/web/tools/lighthouse" },
                { title: "레거시 시스템 개선", url: "https://martinfowler.com/articles/extract-composite-service.html" },
                { title: "기술 부채 관리", url: "https://martinfowler.com/bliki/TechnicalDebt.html" },
                { title: "성능 예산 설정", url: "https://web.dev/performance-budgets-101/" }
            ],
            boilerplates: [
                { title: "Performance Monitoring Kit", description: "실시간 성능 모니터링 대시보드", tech: "Node.js + Grafana", url: "https://github.com/Unitech/pm2" },
                { title: "Webpack Bundle Analyzer", description: "번들 사이즈 최적화 도구", tech: "Webpack Plugin", url: "https://github.com/webpack-contrib/webpack-bundle-analyzer" },
                { title: "Lighthouse CI", description: "자동화된 성능 테스트 파이프라인", tech: "CI/CD + Lighthouse", url: "https://github.com/GoogleChrome/lighthouse-ci" },
                { title: "React Performance Tools", description: "React 앱 성능 최적화 도구 모음", tech: "React + Profiler", url: "https://github.com/facebook/react/tree/main/packages/react-dom" }
            ]
        },
        {
            id: 3,
            icon: <Rocket className="w-6 h-6" />,
            title: "당위적 혁신에 대한 열망",
            subtitle: "기존 방식을 파괴하고 새로운 패러다임을 창조한다",
            description: "단순히 기능을 구현하는 것이 아니라, 왜 이 방식이어야 하는가를 끊임없이 질문하라. iPhone이 휴대폰의 정의를 바꾸고, Tesla가 자동차 산업을 혁신했듯이, 개발에서도 근본적 가정에 도전하고 완전히 새로운 접근 방식을 제시하라. 혁신은 선택이 아닌 당위다.",
            action: "기존 솔루션 대비 혁신적 접근으로 10배 개선된 솔루션 개발",
            actionPlan: {
                title: "패러다임 혁신 프로젝트",
                category: "혁신",
                priority: "높음",
                steps: [
                    "기존 시장 솔루션의 근본적 한계 분석",
                    "First Principles 사고로 문제 재정의",
                    "파괴적 기술(AI, Blockchain, WebAssembly) 적용 실험",
                    "MVP로 혁신적 아이디어 빠른 검증",
                    "특허 출원 및 기술 표준화 기여"
                ],
                timeframe: "지속적",
                tools: ["Figma", "Jupyter", "Docker", "Kubernetes", "TensorFlow"]
            },
            references: [
                { title: "파괴적 혁신 이론", url: "https://hbr.org/2015/12/what-is-disruptive-innovation" },
                { title: "First Principles Thinking", url: "https://jamesclear.com/first-principles" },
                { title: "Design Thinking Process", url: "https://www.interaction-design.org/literature/topics/design-thinking" },
                { title: "Lean Startup 방법론", url: "http://theleanstartup.com/" },
                { title: "혁신의 딜레마", url: "https://www.claytonchristensen.com/books/the-innovators-dilemma/" },
                { title: "Exponential Organizations", url: "https://www.openexo.com/" }
            ],
            boilerplates: [
                { title: "AI-Powered Web App", description: "AI 기능이 통합된 웹 애플리케이션", tech: "Next.js + OpenAI", url: "https://github.com/vercel/ai" },
                { title: "Blockchain DApp Starter", description: "탈중앙화 앱 개발 스타터 킷", tech: "React + Web3.js", url: "https://github.com/austintgriffith/scaffold-eth" },
                { title: "WebAssembly Toolkit", description: "고성능 웹 앱을 위한 WASM 도구", tech: "Rust + WASM", url: "https://github.com/rustwasm/wasm-pack" },
                { title: "Edge Computing Template", description: "엣지 컴퓨팅 애플리케이션 템플릿", tech: "Deno Deploy", url: "https://github.com/denoland/deploy_examples" }
            ]
        },
        {
            id: 4,
            icon: <Settings className="w-6 h-6" />,
            title: "Toss 같은 업무 혁신 시스템 개혁",
            subtitle: "모든 프로세스를 자동화하고 최적화하여 생산성을 극대화",
            description: "Toss가 금융을 단순하게 만들었듯이, 개발 업무의 모든 마찰을 제거하라. 반복 작업은 자동화하고, 의사결정은 데이터로 하며, 협업은 비동기로 최적화하라. 1분이면 되는 일을 10분 걸리게 하는 모든 시스템을 혁신하라. 시간은 가장 소중한 자원이다.",
            action: "개발 프로세스 자동화 80% 달성, 배포 시간 90% 단축",
            actionPlan: {
                title: "업무 혁신 자동화",
                category: "프로세스",
                priority: "높음",
                steps: [
                    "현재 워크플로우의 모든 병목지점 식별",
                    "CI/CD 파이프라인 완전 자동화 구축",
                    "코드 리뷰, 테스트, 배포 자동화 시스템",
                    "Slack Bot, GitHub Actions으로 반복 업무 자동화",
                    "데이터 기반 의사결정을 위한 대시보드 구축"
                ],
                timeframe: "10주",
                tools: ["GitHub Actions", "Jenkins", "Slack API", "Notion API", "Zapier"]
            },
            references: [
                { title: "DevOps 문화와 실천", url: "https://aws.amazon.com/devops/what-is-devops/" },
                { title: "자동화 전략", url: "https://martinfowler.com/articles/deployment-pipeline.html" },
                { title: "지속적 통합/배포", url: "https://www.atlassian.com/continuous-delivery" },
                { title: "애자일 방법론", url: "https://agilemanifesto.org/" },
                { title: "린 소프트웨어 개발", url: "https://www.lean.org/lexicon-terms/lean-software-development/" },
                { title: "생산성 측정", url: "https://blog.gitprime.com/developer-productivity-metrics/" }
            ],
            boilerplates: [
                { title: "GitHub Actions Workflows", description: "완전한 CI/CD 파이프라인 템플릿", tech: "YAML + Actions", url: "https://github.com/actions/starter-workflows" },
                { title: "Slack Bot Framework", description: "업무 자동화를 위한 Slack 봇", tech: "Node.js + Slack API", url: "https://github.com/slackapi/bolt-js" },
                { title: "Terraform Infrastructure", description: "인프라를 코드로 관리하는 템플릿", tech: "Terraform + AWS", url: "https://github.com/terraform-aws-modules" },
                { title: "Monitoring Dashboard", description: "개발팀 생산성 모니터링 대시보드", tech: "Grafana + Prometheus", url: "https://github.com/grafana/grafana" }
            ]
        },
        {
            id: 5,
            icon: <Server className="w-6 h-6" />,
            title: "넷플릭스 같은 초거대규모 서비스에 대한 도전적이고 혁신적 아키텍처",
            subtitle: "수억 명이 동시에 사용해도 끄떡없는 시스템을 설계하라",
            description: "넷플릭스가 전 세계 2억 명의 스트리밍을 감당하듯, 극한의 확장성을 고려한 아키텍처를 설계하라. 마이크로서비스, 이벤트 드리븐, CQRS, 샤딩, 캐싱 전략까지 모든 패턴을 마스터하고 실제로 적용할 수 있어야 한다. 소규모에서 시작해도 언젠가는 글로벌 스케일을 고려하라.",
            action: "동시 접속자 100만 명 처리 가능한 아키텍처 설계 및 구현",
            actionPlan: {
                title: "대규모 시스템 아키텍처",
                category: "아키텍처",
                priority: "높음",
                steps: [
                    "마이크로서비스 아키텍처 패턴 12가지 실습",
                    "이벤트 드리븐 아키텍처 및 메시지 큐 시스템",
                    "데이터베이스 샤딩 및 분산 캐싱 전략",
                    "Circuit Breaker, Bulkhead 패턴으로 장애 격리",
                    "부하 테스트 및 성능 튜닝 실전 경험"
                ],
                timeframe: "6개월",
                tools: ["Kubernetes", "Kafka", "Redis Cluster", "Elasticsearch", "Istio"]
            },
            references: [
                { title: "Netflix 기술 블로그", url: "https://netflixtechblog.com/" },
                { title: "마이크로서비스 패턴", url: "https://microservices.io/patterns/" },
                { title: "시스템 설계 면접", url: "https://github.com/donnemartin/system-design-primer" },
                { title: "대규모 시스템 설계", url: "https://github.com/ByteByteGoHq/system-design-101" },
                { title: "분산 시스템 원칙", url: "https://github.com/aphyr/distsys-class" },
                { title: "AWS 아키텍처 센터", url: "https://aws.amazon.com/architecture/" }
            ],
            boilerplates: [
                { title: "Microservices Starter", description: "Spring Boot 마이크로서비스 템플릿", tech: "Spring Boot + Docker", url: "https://github.com/spring-projects/spring-petclinic-microservices" },
                { title: "Event-Driven Architecture", description: "이벤트 드리븐 시스템 템플릿", tech: "Kafka + Spring Cloud", url: "https://github.com/eventuate-examples" },
                { title: "Kubernetes Manifests", description: "프로덕션 레디 K8s 배포 템플릿", tech: "Kubernetes + Helm", url: "https://github.com/kubernetes/examples" },
                { title: "API Gateway Template", description: "확장 가능한 API 게이트웨이", tech: "Kong + Docker", url: "https://github.com/Kong/kong" }
            ]
        },
        {
            id: 6,
            icon: <Eye className="w-6 h-6" />,
            title: "표범 같은 생존력",
            subtitle: "어떤 환경에서도 적응하고 생존하는 개발자",
            description: "표범이 다양한 환경에서 생존하듯, 개발자도 기술 스택, 도메인, 팀 문화가 바뀌어도 빠르게 적응해야 한다. 새로운 프레임워크를 2주 내에 마스터하고, 다른 산업으로 이직해도 즉시 기여할 수 있는 학습 능력과 적응력을 키워라. 변화는 위기가 아닌 기회다.",
            action: "분기마다 새로운 기술 스택 1개씩 마스터, 다양한 도메인 경험 축적",
            actionPlan: {
                title: "적응력 강화 시스템",
                category: "학습능력",
                priority: "중간",
                steps: [
                    "기술 트렌드 모니터링 및 학습 우선순위 설정",
                    "다양한 도메인(핀테크, 헬스케어, 이커머스) 프로젝트 경험",
                    "크로스 플랫폼 개발 경험 (웹, 모바일, 데스크톱)",
                    "오픈소스 기여로 다양한 코드베이스 경험",
                    "멘토링/교육을 통한 지식 체계화"
                ],
                timeframe: "지속적",
                tools: ["GitHub", "Stack Overflow", "MDN", "Documentation", "Community"]
            },
            references: [
                { title: "효과적 학습법", url: "https://www.coursera.org/learn/learning-how-to-learn" },
                { title: "기술 로드맵", url: "https://roadmap.sh/" },
                { title: "개발자 커리어", url: "https://stackoverflow.blog/2020/10/05/career-advice-for-developers/" },
                { title: "지속적 학습", url: "https://hbr.org/2016/09/the-case-for-continuous-learning" },
                { title: "T자형 인재", url: "https://chiefexecutive.net/ideo-ceo-tim-brown-t-shaped-stars-the-backbone-of-ideoae/" },
                { title: "성장 마인드셋", url: "https://hbr.org/2016/01/what-having-a-growth-mindset-actually-means" }
            ],
            boilerplates: [
                { title: "Full-Stack Template", description: "모던 풀스택 개발 템플릿", tech: "Next.js + TypeScript", url: "https://github.com/vercel/next.js/tree/canary/examples" },
                { title: "Multi-Platform App", description: "크로스 플랫폼 앱 개발 템플릿", tech: "React Native + Expo", url: "https://github.com/expo/examples" },
                { title: "Learning Projects", description: "다양한 기술 스택 학습용 프로젝트", tech: "Various", url: "https://github.com/practical-tutorials/project-based-learning" },
                { title: "Portfolio Template", description: "개발자 포트폴리오 템플릿", tech: "React + Tailwind", url: "https://github.com/soumyajit4419/Portfolio" }
            ]
        },
        {
            id: 7,
            icon: <Users className="w-6 h-6" />,
            title: "항공모함 전단 같은 체계와 강력함, 협동 체계",
            subtitle: "개인의 역량이 팀의 시너지로 증폭되는 협업 시스템",
            description: "항공모함이 수십 개의 전투기와 함께 작전하듯, 개발팀도 각자의 전문성이 완벽하게 조화를 이뤄야 한다. 코드 리뷰, 페어 프로그래밍, 기술 공유, 멘토링까지 팀의 집단 지성을 극대화하는 시스템을 구축하라. 혼자서는 할 수 없는 일을 팀으로 만들어내라.",
            action: "팀 생산성 50% 향상, 코드 품질 지표 90% 이상 달성",
            actionPlan: {
                title: "팀 시너지 최적화",
                category: "협업",
                priority: "높음",
                steps: [
                    "코드 리뷰 문화 및 가이드라인 정립",
                    "페어/몹 프로그래밍 세션 정기화",
                    "기술 공유 세션 및 내부 테크톡 운영",
                    "멘토링 시스템 및 온보딩 프로세스 구축",
                    "팀 KPI 측정 및 지속적 개선"
                ],
                timeframe: "8주",
                tools: ["GitHub", "Slack", "Notion", "Figma", "Linear"]
            },
            references: [
                { title: "효과적 코드 리뷰", url: "https://google.github.io/eng-practices/review/" },
                { title: "페어 프로그래밍 가이드", url: "https://martinfowler.com/articles/on-pair-programming.html" },
                { title: "팀 문화 구축", url: "https://rework.withgoogle.com/guides/" },
                { title: "애자일 팀 구성", url: "https://www.atlassian.com/agile/teams" },
                { title: "심리적 안전감", url: "https://rework.withgoogle.com/guides/understanding-team-effectiveness/" },
                { title: "DevOps 문화", url: "https://aws.amazon.com/devops/what-is-devops/" }
            ],
            boilerplates: [
                { title: "Team Workflow Template", description: "팀 협업을 위한 워크플로우 템플릿", tech: "GitHub + Actions", url: "https://github.com/github/super-linter" },
                { title: "Code Review Checklist", description: "효과적인 코드 리뷰 체크리스트", tech: "Markdown", url: "https://github.com/joho/awesome-code-review" },
                { title: "Documentation Template", description: "팀 문서화 템플릿", tech: "Docusaurus", url: "https://github.com/facebook/docusaurus" },
                { title: "Team Dashboard", description: "팀 생산성 대시보드", tech: "React + Charts", url: "https://github.com/gitpod-io/gitpod" }
            ]
        },
        {
            id: 8,
            icon: <Users2 className="w-6 h-6" />,
            title: "바르셀로나, 맨시티, 파리 생제르망 같은 개인 능력 + 조직력 + 팀전술",
            subtitle: "최고 수준의 개인 기량과 완벽한 팀 플레이의 조화",
            description: "메시, 음바페, 데 브라위너처럼 개인적으로도 최고 수준이면서, 팀 전술에 완벽하게 맞춰 플레이할 수 있어야 한다. 알고리즘 실력, 아키텍처 설계, 코드 품질 등 개인 역량을 극한까지 끌어올리면서도, 팀의 코딩 컨벤션과 협업 방식에 자연스럽게 녹아들어라.",
            action: "개인 기술 역량 Top 10% 달성 + 팀 기여도 최상위 평가",
            actionPlan: {
                title: "개인-팀 밸런스 최적화",
                category: "종합역량",
                priority: "높음",
                steps: [
                    "알고리즘/자료구조 마스터 (LeetCode 상위 5%)",
                    "시스템 설계 전문가 수준 달성",
                    "팀 코딩 스탠다드 및 베스트 프랙티스 정립",
                    "기술 리더십 및 멘토링 역할 수행",
                    "오픈소스 메인테이너로 외부 기여"
                ],
                timeframe: "1년",
                tools: ["LeetCode", "System Design", "GitHub", "Tech Blogs", "Conferences"]
            },
            references: [
                { title: "알고리즘 마스터리", url: "https://leetcode.com/explore/" },
                { title: "시스템 설계 가이드", url: "https://github.com/donnemartin/system-design-primer" },
                { title: "코드 품질 가이드", url: "https://github.com/ryanmcdermott/clean-code-javascript" },
                { title: "기술 리더십", url: "https://www.oreilly.com/library/view/the-manager's-path/9781491973882/" },
                { title: "소프트웨어 장인정신", url: "https://manifesto.softwarecraftsmanship.org/" },
                { title: "효과적 엔지니어", url: "https://www.effectiveengineer.com/" }
            ],
            boilerplates: [
                { title: "Algorithm Practice Kit", description: "알고리즘 문제 해결 템플릿", tech: "Python/Java/JS", url: "https://github.com/kdn251/interviews" },
                { title: "System Design Templates", description: "시스템 설계 템플릿 모음", tech: "Architecture", url: "https://github.com/karanpratapsingh/system-design" },
                { title: "Code Quality Tools", description: "코드 품질 관리 도구 모음", tech: "ESLint + Prettier", url: "https://github.com/typicode/husky" },
                { title: "Tech Leadership Guide", description: "기술 리더를 위한 가이드", tech: "Markdown", url: "https://github.com/LappleApple/awesome-leading-and-managing" }
            ]
        },
        {
            id: 9,
            icon: <Activity className="w-6 h-6" />,
            title: "보더 콜리 같은 에너지와 매와 같은 시야",
            subtitle: "끝없는 에너지와 예리한 통찰력으로 기회를 포착한다",
            description: "보더 콜리의 무한한 에너지와 집중력, 매의 날카로운 시야와 정확한 판단력을 동시에 가져야 한다. 새벽부터 밤까지 코딩에 몰입하면서도, 기술 트렌드와 비즈니스 기회를 놓치지 않는 통찰력을 기르라. 에너지 관리와 전략적 사고의 완벽한 밸런스가 핵심이다.",
            action: "일일 딥워크 6시간 + 주간 트렌드 분석 및 전략 수립",
            actionPlan: {
                title: "에너지-통찰력 시너지",
                category: "생산성",
                priority: "높음",
                steps: [
                    "포모도로 기법으로 집중력 극대화",
                    "기술 트렌드 모니터링 시스템 구축",
                    "주간 회고 및 전략 수정 루틴 정립",
                    "체력 관리(운동, 수면, 영양) 시스템화",
                    "의사결정 프레임워크 구축 및 적용"
                ],
                timeframe: "12주",
                tools: ["Notion", "Toggl", "RescueTime", "Headspace", "Feedly"]
            },
            references: [
                { title: "딥워크 마스터리", url: "https://www.calnewport.com/books/deep-work/" },
                { title: "에너지 관리법", url: "https://hbr.org/2007/10/manage-your-energy-not-your-time" },
                { title: "전략적 사고", url: "https://hbr.org/2019/09/strategic-thinking" },
                { title: "의사결정 과학", url: "https://www.amazon.com/Decisive-Chip-Heath/dp/0307956393" },
                { title: "고성과자의 습관", url: "https://brendon.com/books/high-performance-habits/" },
                { title: "피크 퍼스", url: "https://www.amazon.com/Peak-Performance-Elevate-Burnout-Science/dp/162336793X" }
            ],
            boilerplates: [
                { title: "Productivity Dashboard", description: "개인 생산성 트래킹 대시보드", tech: "React + Chart.js", url: "https://github.com/kamranahmedse/developer-roadmap" },
                { title: "Habit Tracker", description: "습관 관리 및 추적 앱", tech: "React Native", url: "https://github.com/iSoron/uhabits" },
                { title: "Focus Timer", description: "포모도로 기법 타이머 앱", tech: "JavaScript", url: "https://github.com/chrisns/pomodoro" },
                { title: "Trend Monitor", description: "기술 트렌드 모니터링 도구", tech: "Python + RSS", url: "https://github.com/RSS-Bridge/rss-bridge" }
            ]
        },
        {
            id: 10,
            icon: <FlaskConical className="w-6 h-6" />,
            title: "실험 정신 및 개선",
            subtitle: "가설을 세우고, 실험하며, 데이터로 검증하는 과학적 접근",
            description: "모든 것을 가설로 접근하고, A/B 테스트로 검증하며, 데이터로 의사결정을 내려라. 사용자 행동, 성능 개선, 새로운 기술 도입까지 모든 것을 실험으로 접근하라. 실패는 학습이고, 성공은 확장이다. 과학적 방법론을 개발에 적용하는 것이 진정한 전문가의 접근법이다.",
            action: "월 3개 이상 실험 진행, 데이터 기반 의사결정 100% 달성",
            actionPlan: {
                title: "실험 중심 개발 문화",
                category: "실험/데이터",
                priority: "높음",
                steps: [
                    "실험 설계 및 가설 수립 프레임워크 구축",
                    "A/B 테스트 인프라 및 도구 구축",
                    "사용자 행동 분석 및 메트릭 정의",
                    "실험 결과 분석 및 의사결정 프로세스",
                    "실패한 실험에서의 학습 체계화"
                ],
                timeframe: "10주",
                tools: ["Google Analytics", "Mixpanel", "Optimizely", "DataDog", "Jupyter"]
            },
            references: [
                { title: "실험 주도 개발", url: "https://www.thoughtworks.com/insights/articles/how-to-implement-hypothesis-driven-development" },
                { title: "A/B 테스트 가이드", url: "https://blog.optimizely.com/2010/11/29/how-to-run-an-ab-test/" },
                { title: "데이터 분석", url: "https://www.kaggle.com/learn" },
                { title: "린 분석", url: "https://leananalyticsbook.com/" },
                { title: "측정의 과학", url: "https://www.amazon.com/How-Measure-Anything-Intangibles-Business/dp/1452654204" },
                { title: "실험 설계", url: "https://web.stanford.edu/~hastie/Papers/ESLII.pdf" }
            ],
            boilerplates: [
                { title: "A/B Testing Framework", description: "A/B 테스트를 위한 프레임워크", tech: "React + Statistics", url: "https://github.com/Netflix/conductor" },
                { title: "Analytics Dashboard", description: "사용자 분석 대시보드", tech: "D3.js + React", url: "https://github.com/apache/superset" },
                { title: "Experiment Tracker", description: "실험 관리 및 추적 도구", tech: "Python + MLflow", url: "https://github.com/mlflow/mlflow" },
                { title: "Feature Flag System", description: "피처 플래그 관리 시스템", tech: "Node.js + Redis", url: "https://github.com/Unleash/unleash" }
            ]
        },
        {
            id: 11,
            icon: <Plane className="w-6 h-6" />,
            title: "F-22 랩터 같은 초격차 추구",
            subtitle: "압도적 기술력으로 경쟁자들과 차원이 다른 수준을 달성한다",
            description: "F-22 랩터가 다른 전투기들과 비교조차 되지 않는 압도적 성능을 보이듯, 개발자로서도 초격차 기술력을 추구하라. AI, 블록체인, 양자컴퓨팅까지 미래 기술을 선도적으로 학습하고, 10년 후에도 통용될 깊이 있는 컴퓨터 사이언스 지식을 쌓아라. 단순 코딩을 넘어 기술 혁신을 이끄는 리더가 되어야 한다.",
            action: "미래 기술 분야에서 전문가 수준 달성, 기술 혁신 프로젝트 리딩",
            actionPlan: {
                title: "초격차 기술력 구축",
                category: "미래기술",
                priority: "높음",
                steps: [
                    "AI/ML 모델 설계 및 최적화 전문성 구축",
                    "블록체인/Web3 생태계 깊이 있는 이해",
                    "양자컴퓨팅, 엣지컴퓨팅 등 차세대 기술 학습",
                    "오픈소스 프로젝트 리딩 및 기술 표준 기여",
                    "국제 컨퍼런스 발표 및 기술 커뮤니티 리더십"
                ],
                timeframe: "지속적",
                tools: ["TensorFlow", "PyTorch", "Solidity", "Qiskit", "Kubernetes"]
            },
            references: [
                { title: "AI/ML 최신 동향", url: "https://paperswithcode.com/" },
                { title: "블록체인 기술", url: "https://ethereum.org/en/developers/" },
                { title: "양자컴퓨팅", url: "https://qiskit.org/learn/" },
                { title: "미래 기술 트렌드", url: "https://www.gartner.com/en/research/methodologies/gartner-hype-cycle" },
                { title: "연구 논문", url: "https://arxiv.org/" },
                { title: "기술 리더십", url: "https://www.oreilly.com/radar/" }
            ],
            boilerplates: [
                { title: "AI/ML Pipeline", description: "머신러닝 파이프라인 템플릿", tech: "Python + MLOps", url: "https://github.com/microsoft/MLOps" },
                { title: "Blockchain DApp", description: "탈중앙화 애플리케이션 템플릿", tech: "Ethereum + React", url: "https://github.com/austintgriffith/scaffold-eth" },
                { title: "Quantum Computing", description: "양자컴퓨팅 알고리즘 구현", tech: "Qiskit + Python", url: "https://github.com/Qiskit/qiskit-tutorials" },
                { title: "Research Project", description: "연구 프로젝트 템플릿", tech: "Jupyter + LaTeX", url: "https://github.com/jupyter/jupyter" }
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
                        <span className="text-sm font-medium">Version 3.0 Revolutionary</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                        바이브 코딩 11계명
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                        F-22 랩터급 초격차 개발자를 위한 혁명적 실전 가이드
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <Target className="w-4 h-4" />
                            <span>11가지 혁신 영역</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <CheckCircle className="w-4 h-4" />
                            <span>참고자료 + 보일러플레이트</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                            <BookOpen className="w-4 h-4" />
                            <span>실전 템플릿 200+</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Commandments */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-8xl mx-auto">
                    <div className="space-y-12">
                        {commandments.map((commandment) => (
                            <div
                                key={commandment.id}
                                className="group relative"
                                onMouseEnter={() => setHoveredCard(commandment.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* 배경 그라데이션 */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 rounded-2xl transition-all duration-300 ${hoveredCard === commandment.id ? 'from-blue-500/10 via-indigo-500/10 to-purple-500/10 scale-105' : ''
                                    }`}></div>

                                <div className="relative grid lg:grid-cols-3 gap-8 items-stretch p-6">
                                    {/* 첫 번째 열: 계명 + 액션 플랜 */}
                                    <div
                                        className={`relative overflow-hidden rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${hoveredCard === commandment.id || selectedCard === commandment.id
                                            ? 'ring-2 ring-blue-500 ring-offset-2 transform translate-y-[-4px]'
                                            : ''
                                            }`}
                                        onClick={() => setSelectedCard(selectedCard === commandment.id ? null : commandment.id)}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
                                        <div className="p-8 h-full flex flex-col">
                                            {/* Header */}
                                            <div className="flex items-start gap-5 mb-6">
                                                <div className="flex-shrink-0">
                                                    <div className="relative">
                                                        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
                                                            {commandment.icon}
                                                        </div>
                                                        <div className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold shadow-md">
                                                            {commandment.id}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            계명 #{commandment.id}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                                                        {commandment.title}
                                                    </h3>
                                                    <p className="text-sm font-semibold text-indigo-600">
                                                        {commandment.subtitle}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="mb-6">
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    {commandment.description}
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
                                                        {commandment.action}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Action Plan Summary */}
                                            <div className="mt-auto">
                                                <div className="border-t border-gray-200 pt-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h4 className="text-sm font-bold text-gray-900">{commandment.actionPlan.title}</h4>
                                                        <div className="flex gap-2">
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(commandment.actionPlan.priority)}`}>
                                                                {commandment.actionPlan.priority}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{commandment.actionPlan.timeframe}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{commandment.actionPlan.category}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 두 번째 열: 참고 자료 */}
                                    <div className={`rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 ${hoveredCard === commandment.id || selectedCard === commandment.id
                                        ? 'ring-2 ring-indigo-500 ring-offset-2 transform translate-y-[-4px]'
                                        : ''
                                        }`}>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                        <div className="p-8 h-full flex flex-col">
                                            {/* 헤더 */}
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold">
                                                    {commandment.id}
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
                                                    {commandment.references.map((reference, index) => (
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
                                    <div className={`rounded-xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 ${hoveredCard === commandment.id || selectedCard === commandment.id
                                        ? 'ring-2 ring-purple-500 ring-offset-2 transform translate-y-[-4px]'
                                        : ''
                                        }`}>
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
                                        <div className="p-8 h-full flex flex-col">
                                            {/* 헤더 */}
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-bold">
                                                    {commandment.id}
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
                                                    {commandment.boilerplates.map((boilerplate, index) => (
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
                    <h3 className="text-2xl font-bold mb-4">F-22 랩터급 초격차 개발자로 거듭나세요</h3>
                    <p className="text-blue-100 mb-6">
                        바이브 코딩 11계명을 실천하여 압도적 기술력을 갖춘 개발자가 되어보세요
                    </p>
                    <div className="flex items-center justify-center gap-6 text-sm">
                        <span className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            Version 3.0
                        </span>
                        <span className="flex items-center gap-2">
                            <Wrench className="w-4 h-4 text-blue-400" />
                            실전 템플릿
                        </span>
                        <span className="flex items-center gap-2">
                            <Plane className="w-4 h-4 text-purple-400" />
                            초격차 추구
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VibeCodingCommandmentV3;