"use client";
import React, { useState } from 'react';
import { ExternalLink, BookOpen, TrendingUp, Zap, Brain, Target, Star, Clock, ArrowRight, Globe, Code, Rocket, DollarSign } from 'lucide-react';

interface Props {

}

const RefArticleForVibeCoding = (props: Props) => {
    const [hoveredArticle, setHoveredArticle] = useState<number | null>(null);

    // 제공된 실제 링크들을 기반으로 한 필독 자료 (실제 검색한 제목들)
    const mainArticles = [
        {
            id: 1,
            title: "[GN#303] Vibe 코딩 이후, 우리가 생각해야 할 것들",
            description: "바이브 코딩은 빠른 개발과 창의성을 촉진하지만, 품질 없는 속도는 기술 부채와 보안 취약점을 초래합니다. AI의 속도와 인간의 전문성을 결합해 품질 높은 소프트웨어를 만들어야 합니다.",
            url: "https://news.hada.io/weekly/202517",
            category: "바이브 코딩",
            icon: <Zap className="w-5 h-5" />,
            tags: ["바이브코딩", "품질", "속도"],
            readTime: "8분",
            priority: "높음"
        },
        {
            id: 2,
            title: "[GN#307] 당신의 '화목한' 팀이 실패하는 이유",
            description: "팀의 심리적 안전은 표면적 화목함이 아니라 아이디어 도전과 생산적 불일치에서 비롯됩니다. 효과적인 팀은 문제 집중 토론과 건설적 논쟁을 통해 혁신과 지속적 성장이 가능해집니다.",
            url: "https://news.hada.io/weekly/202521",
            category: "팀 리더십",
            icon: <Target className="w-5 h-5" />,
            tags: ["리더십", "팀관리", "매니지먼트"],
            readTime: "10분",
            priority: "높음"
        },
        {
            id: 3,
            title: "[GN#313] AI의 새로운 핵심 역량은 프롬프트가 아닌 '컨텍스트 엔지니어링'",
            description: "컨텍스트란 단순한 프롬프트 문장이 아니라 LLM이 답변 생성 전 볼 수 있는 모든 정보를 의미합니다. AI 에이전트의 성공은 이제 모델 성능보다 컨텍스트의 질에 달려 있습니다.",
            url: "https://news.hada.io/weekly/202527",
            category: "AI 개발",
            icon: <BookOpen className="w-5 h-5" />,
            tags: ["컨텍스트", "AI에이전트", "LLM"],
            readTime: "7분",
            priority: "높음"
        },
        {
            id: 4,
            title: "[GN#315] 소프트웨어를 빠르게 개발하는 방법",
            description: "소프트웨어 개발에서 빠른 개발과 적정 품질의 균형은 현실적으로 중요하며, 러프 드래프트로 전체 구조를 신속히 잡은 뒤 점진적으로 다듬는 접근이 효과적입니다.",
            url: "https://news.hada.io/weekly/202529",
            category: "개발 방법론",
            icon: <TrendingUp className="w-5 h-5" />,
            tags: ["생산성", "개발속도", "품질"],
            readTime: "12분",
            priority: "높음"
        },
        {
            id: 5,
            title: "50대 1인 개발자 살아남기",
            description: "개인사업자로 창립 2주년, 1인 개발자 독립 5주년을 맞이해 살아남으며 느낀 점을 정리. 성실함과 신뢰를 통한 월 단위 유지보수 계약으로 안정적인 수입 확보 전략",
            url: "https://news.hada.io/topic?id=21244",
            category: "수익화",
            icon: <DollarSign className="w-5 h-5" />,
            tags: ["1인개발자", "프리랜서", "유지보수"],
            readTime: "15분",
            priority: "높음"
        },
        {
            id: 6,
            title: "[GN#308] AI 시대의 새로운 개발자 패턴들",
            description: "AI를 단순한 도구가 아닌 기반 기술로 다루는 개발 문화가 형성되고 있으며, 버전 관리부터 문서화까지 모든 개발 패턴이 AI 중심으로 재편되고 있습니다.",
            url: "https://news.hada.io/weekly/202522",
            category: "AI 개발",
            icon: <Brain className="w-5 h-5" />,
            tags: ["AI패턴", "개발문화", "MCP"],
            readTime: "9분",
            priority: "높음"
        }
    ];

    // 추가 필수 자료들 (바이브 코딩 실전 적용 및 최신 개발 트렌드)
    const additionalArticles = [
        {
            id: 7,
            title: "Claude로 실제 코드를 배포하며 얻은 실전 노트",
            description: "AI 도구인 Claude를 실제 서비스에 적용하며 개발 생산성 10배 향상 달성 노하우",
            url: "https://news.hada.io/topic?id=21352",
            category: "바이브 코딩 실전",
            icon: <Code className="w-5 h-5" />,
            tags: ["Claude", "바이브코딩", "실전경험"],
            readTime: "12분",
            priority: "높음"
        },
        {
            id: 8,
            title: "[개발일지] 비개발자가 바이브코딩으로 소울라이크 게임 개발",
            description: "비개발자가 Cursor + Claude 조합으로 모바일 게임을 개발한 1.5개월 여정",
            url: "https://news.hada.io/topic?id=21499",
            category: "바이브 코딩 사례",
            icon: <Rocket className="w-5 h-5" />,
            tags: ["Cursor", "게임개발", "비개발자"],
            readTime: "18분",
            priority: "높음"
        },
        {
            id: 9,
            title: "Cursor를 더 똑똑하게 사용하고 싶은 분들을 위한 팁 12개",
            description: "Cursor IDE를 효과적으로 활용하기 위한 전략적 모델 선택과 실전 팁 모음",
            url: "https://news.hada.io/topic?id=21608",
            category: "AI 도구 활용",
            icon: <Zap className="w-5 h-5" />,
            tags: ["Cursor", "IDE", "생산성"],
            readTime: "15분",
            priority: "높음"
        },
        {
            id: 10,
            title: "Builder.io 개발자가 Claude Code를 사용하는 방법 (+ best tips)",
            description: "18,000줄 React 컴포넌트를 다루는 실무진의 Claude Code 활용 노하우와 팁",
            url: "https://news.hada.io/topic?id=22034",
            category: "Claude Code",
            icon: <Brain className="w-5 h-5" />,
            tags: ["ClaudeCode", "React", "대규모코드"],
            readTime: "10분",
            priority: "높음"
        },
        {
            id: 11,
            title: "시스템 디자인 인터뷰 - 대규모 시스템 설계 가이드",
            description: "확장성 있는 시스템 아키텍처 설계의 핵심 원칙과 실전 예제 모음",
            url: "https://github.com/donnemartin/system-design-primer",
            category: "시스템 설계",
            icon: <Target className="w-5 h-5" />,
            tags: ["시스템설계", "아키텍처", "확장성"],
            readTime: "30분",
            priority: "높음"
        },
        {
            id: 12,
            title: "24시간 만에 10억 웹페이지를 크롤링한 대규모 크롤러 구축기",
            description: "현대적인 하드웨어와 클라우드 인프라로 비용 효율적인 대규모 크롤링 시스템 설계",
            url: "https://news.hada.io/topic?id=22118",
            category: "대규모 시스템",
            icon: <Globe className="w-5 h-5" />,
            tags: ["크롤링", "대규모", "시스템"],
            readTime: "20분",
            priority: "중간"
        }
    ];

    const allArticles = [...mainArticles, ...additionalArticles];

    const resourceCategories = [
        {
            title: "바이브 코딩 필수 도구",
            items: [
                { name: "Cursor IDE", description: "AI 기반 코드 에디터의 혁신", url: "https://cursor.sh/" },
                { name: "Claude Code", description: "Anthropic의 터미널 AI 어시스턴트", url: "https://claude.ai/code" },
                { name: "GitHub Copilot", description: "OpenAI 기반 AI 코딩 어시스턴트", url: "https://github.com/features/copilot" },
                { name: "Claude AI", description: "고급 프로그래밍 대화형 AI", url: "https://claude.ai/" }
            ]
        },
        {
            title: "바이브 코딩 학습 자료",
            items: [
                { name: "GeekNews", description: "개발 트렌드와 바이브 코딩 소식", url: "https://news.hada.io/" },
                { name: "AI Code Review 가이드", description: "AI와 협업하는 코드 리뷰", url: "https://github.com/features/copilot" },
                { name: "Prompt Engineering for Devs", description: "개발자를 위한 프롬프트 엔지니어링", url: "https://platform.openai.com/docs/guides/prompt-engineering" },
                { name: "Modern Development Workflow", description: "AI 시대의 개발 워크플로우", url: "https://docs.github.com/en/get-started" }
            ]
        },
        {
            title: "개발자 커뮤니티 & 성장",
            items: [
                { name: "GeekNews 위클리", description: "매주 엄선된 개발 뉴스", url: "https://news.hada.io/weekly" },
                { name: "Reddit r/programming", description: "글로벌 개발자 토론", url: "https://reddit.com/r/programming" },
                { name: "Dev.to", description: "개발자 블로그 플랫폼", url: "https://dev.to/" },
                { name: "Stack Overflow", description: "개발자 Q&A의 성지", url: "https://stackoverflow.com/" }
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
        <div className="bg-muted/30 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
                            <BookOpen className="w-4 h-4" />
                            <span>Essential Reading & Resources</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            바이브 코딩 필독서 & 실전 자료
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            실제 GeekNews 기사들과 바이브 코딩 실전 경험담으로 구성된 엄선된 학습 자료
                        </p>
                    </div>

                    {/* GeekNews 메인 아티클 */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
                            <Rocket className="w-6 h-6 text-primary" />
                            GeekNews 바이브 코딩 핵심 아티클
                        </h3>
                        <p className="text-muted-foreground mb-6 text-center">
                            실제 바이브 코딩 트렌드를 다룬 GeekNews Weekly 기사들
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mainArticles.map((article) => (
                                <a
                                    key={article.id}
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group block p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 ${hoveredArticle === article.id ? 'ring-2 ring-primary ring-offset-2' : ''
                                        }`}
                                    onMouseEnter={() => setHoveredArticle(article.id)}
                                    onMouseLeave={() => setHoveredArticle(null)}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                                                {article.icon}
                                            </div>
                                            <div>
                                                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                                    {article.category}
                                                </span>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(article.priority)}`}>
                                                        {article.priority}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Clock className="w-3 h-3" />
                                                        {article.readTime}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <ExternalLink className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${hoveredArticle === article.id ? 'translate-x-0.5 -translate-y-0.5' : ''
                                            }`} />
                                    </div>

                                    {/* Content */}
                                    <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        {article.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {article.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 추가 필수 자료 */}
                    <div className="mb-16">
                        <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
                            <Code className="w-6 h-6 text-primary" />
                            바이브 코딩 실전 경험담 & 도구 가이드
                        </h3>
                        <p className="text-muted-foreground mb-6 text-center">
                            실제로 바이브 코딩을 적용한 개발자들의 경험담과 도구 활용 노하우
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            {additionalArticles.map((article) => (
                                <a
                                    key={article.id}
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group block p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 ${hoveredArticle === article.id ? 'ring-2 ring-primary ring-offset-2' : ''
                                        }`}
                                    onMouseEnter={() => setHoveredArticle(article.id)}
                                    onMouseLeave={() => setHoveredArticle(null)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                            {article.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                                                    {article.category}
                                                </span>
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(article.priority)}`}>
                                                    {article.priority}
                                                </span>
                                            </div>
                                            <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {article.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                                {article.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-wrap gap-2">
                                                    {article.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Clock className="w-3 h-3" />
                                                    {article.readTime}
                                                </span>
                                            </div>
                                        </div>
                                        <ExternalLink className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${hoveredArticle === article.id ? 'translate-x-0.5 -translate-y-0.5' : ''
                                            }`} />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 도구 및 리소스 */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {resourceCategories.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="space-y-4">
                                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                    <ArrowRight className="w-5 h-5 text-primary" />
                                    {section.title}
                                </h4>
                                <div className="space-y-3">
                                    {section.items.map((item, itemIndex) => (
                                        <a
                                            key={itemIndex}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block p-4 rounded-lg border bg-card text-card-foreground hover:shadow-sm hover:ring-1 hover:ring-primary transition-all duration-200"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-medium text-foreground text-sm">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1">
                                                        {item.description}
                                                    </div>
                                                </div>
                                                <ExternalLink className="w-3 h-3 text-muted-foreground" />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16 p-8 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="text-xl font-bold text-foreground mb-2">
                            바이브 코딩의 최신 동향이 궁금하신가요?
                        </h4>
                        <p className="text-muted-foreground mb-4">
                            GeekNews에서 매주 업데이트되는 AI 개발 도구와 바이브 코딩 실전 사례를 확인하세요
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="https://news.hada.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
                            >
                                <Globe className="w-4 h-4" />
                                <span>GeekNews 방문하기</span>
                            </a>
                            <a
                                href="https://news.hada.io/weekly"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md font-medium hover:bg-secondary/90 transition-colors"
                            >
                                <BookOpen className="w-4 h-4" />
                                <span>위클리 뉴스레터 구독</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefArticleForVibeCoding;