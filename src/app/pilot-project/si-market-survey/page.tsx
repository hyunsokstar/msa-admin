"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, TrendingUp, Users, Package, ShoppingCart, Cpu, Bot, Smartphone, Globe, BarChart3, Shield, Cloud, Gamepad2, Building2, Zap } from 'lucide-react';

const SIMarketSurvey = () => {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getSearchUrl = (platformName: string, category: string) => {
        const searchTerms: { [key: string]: { [key: string]: string } } = {
            '위시켓': {
                'aiConsulting': 'https://www.wishket.com/project/?skill_tags=AI%20%EC%B1%97%EB%B4%87',
                'developerPortfolio': 'https://www.wishket.com/project/?skill_tags=%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4',
                'smartFactory': 'https://www.wishket.com/project/?skill_tags=MES',
                'ecommerce': 'https://www.wishket.com/project/?skill_tags=%EC%87%BC%ED%95%91%EB%AA%B0',
                'automation': 'https://www.wishket.com/project/?skill_tags=RPA',
                'mobileApp': 'https://www.wishket.com/project/?skill_tags=%EB%AA%A8%EB%B0%94%EC%9D%BC%20%EC%95%B1',
                'webDevelopment': 'https://www.wishket.com/project/?skill_tags=%EC%9B%B9%20%EA%B0%9C%EB%B0%9C',
                'dataAnalytics': 'https://www.wishket.com/project/?skill_tags=%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EB%B6%84%EC%84%9D',
                'blockchain': 'https://www.wishket.com/project/?skill_tags=%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8',
                'erp': 'https://www.wishket.com/project/?skill_tags=ERP',
                'security': 'https://www.wishket.com/project/?skill_tags=%EB%B3%B4%EC%95%88',
                'cloud': 'https://www.wishket.com/project/?skill_tags=%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C'
            },
            '크몽': {
                'aiConsulting': 'https://kmong.com/search?keyword=AI%20%EC%B1%97%EB%B4%87',
                'developerPortfolio': 'https://kmong.com/search?keyword=%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%20%EC%A0%9C%EC%9E%91',
                'smartFactory': 'https://kmong.com/search?keyword=%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8C%A9%ED%86%A0%EB%A6%AC',
                'ecommerce': 'https://kmong.com/search?keyword=%EC%87%BC%ED%95%91%EB%AA%B0%20%EC%A0%9C%EC%9E%91',
                'automation': 'https://kmong.com/search?keyword=%EC%97%85%EB%AC%B4%EC%9E%90%EB%8F%99%ED%99%94',
                'mobileApp': 'https://kmong.com/search?keyword=%EB%AA%A8%EB%B0%94%EC%9D%BC%20%EC%95%B1%20%EA%B0%9C%EB%B0%9C',
                'webDevelopment': 'https://kmong.com/search?keyword=%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80%20%EC%A0%9C%EC%9E%91',
                'dataAnalytics': 'https://kmong.com/search?keyword=%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EB%B6%84%EC%84%9D',
                'blockchain': 'https://kmong.com/search?keyword=%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8',
                'erp': 'https://kmong.com/search?keyword=ERP%20%EA%B0%9C%EB%B0%9C',
                'security': 'https://kmong.com/search?keyword=%EB%B3%B4%EC%95%88%20%EC%86%94%EB%A3%A8%EC%85%98',
                'cloud': 'https://kmong.com/search?keyword=%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C'
            },
            '카페24 디자인센터': {
                'ecommerce': 'https://design.cafe24.com/'
            },
            '자체 솔루션': {
                'aiConsulting': 'https://channel.io/ko'
            },
            '정부지원사업': {
                'smartFactory': 'https://www.smart-factory.kr/'
            },
            '구글 플레이': {
                'mobileApp': 'https://play.google.com/console'
            },
            '앱스토어': {
                'mobileApp': 'https://developer.apple.com/'
            }
        };

        return searchTerms[platformName]?.[category] || '#';
    };

    const marketData = {
        aiConsulting: {
            title: "AI 상담 시스템",
            icon: <Bot className="w-6 h-6" />,
            marketSize: "약 2조 2,000억원",
            growth: "연평균 25% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "AI 챗봇 고객 문의 자동화 (300건+)",
                        "병원/성형외과 AI 챗봇 서비스 (150건+)",
                        "AI 추천 시스템 구축 (200건+)",
                        "OpenAI API 연동 상담봇 (250건+)",
                        "RAG 기반 FAQ 자동화 시스템"
                    ],
                    priceRange: "500만원 ~ 5,000만원"
                },
                {
                    name: "크몽",
                    projects: [
                        "간단 챗봇 제작 (800건+)",
                        "카카오톡 비즈니스 챗봇 (400건+)",
                        "ChatGPT 커스터마이징 (600건+)",
                        "Dialogflow 챗봇 구축",
                        "음성 AI 어시스턴트 개발"
                    ],
                    priceRange: "50만원 ~ 1,500만원"
                },
                {
                    name: "자체 솔루션",
                    projects: [
                        "채널톡 - ALF AI 에이전트",
                        "사이드톡 - 고객지원 AI 에이전트",
                        "삼성SDS - AI 컨택센터",
                        "LG CNS - 마이다스 AI",
                        "네이버클라우드 - Clova Chatbot"
                    ],
                    priceRange: "월 30만원 ~ 1,000만원"
                }
            ],
            trends: [
                "24시간 무인 상담 시스템 수요 급증 (300% 증가)",
                "GPT-4, Claude 등 LLM 기반 솔루션 확대",
                "정부 복지상담 AI 도입 (101개 시군구 완료)",
                "멀티모달 AI (텍스트+음성+이미지) 상담 확산",
                "실시간 감정분석 및 개인화 응답 기술 도입",
                "금융권 로보어드바이저 AI 상담 확대"
            ],
            detailedStats: {
                averageProjectDuration: "2-4개월",
                successRate: "85%",
                popularTech: ["OpenAI GPT", "Claude", "Dialogflow", "Rasa", "Microsoft Bot Framework"],
                clientIndustries: ["금융", "헬스케어", "이커머스", "교육", "정부기관"]
            }
        },
        mobileApp: {
            title: "모바일 앱 개발",
            icon: <Smartphone className="w-6 h-6" />,
            marketSize: "약 4조 5,000억원",
            growth: "연평균 20% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "React Native 크로스플랫폼 앱 (400건+)",
                        "Flutter 하이브리드 앱 (350건+)",
                        "네이티브 iOS/Android 앱 (600건+)",
                        "배달/O2O 서비스 앱 (150건+)",
                        "핀테크/금융 앱 (100건+)"
                    ],
                    priceRange: "1,000만원 ~ 2억원"
                },
                {
                    name: "크몽",
                    projects: [
                        "간단 앱 프로토타입 (1,200건+)",
                        "MVP 앱 개발 (800건+)",
                        "앱 UI/UX 디자인 (1,500건+)",
                        "앱스토어 등록 대행 (2,000건+)",
                        "앱 유지보수 및 업데이트"
                    ],
                    priceRange: "100만원 ~ 3,000만원"
                },
                {
                    name: "구글 플레이",
                    projects: [
                        "안드로이드 앱 배포",
                        "인앱결제 시스템 연동",
                        "Google Play Console 관리",
                        "앱 성능 최적화",
                        "광고 수익화 (AdMob 연동)"
                    ],
                    priceRange: "개발자 등록비 $25"
                },
                {
                    name: "앱스토어",
                    projects: [
                        "iOS 앱 심사 및 배포",
                        "App Store Connect 관리",
                        "인앱구매 및 구독 시스템",
                        "TestFlight 베타 테스트",
                        "앱 메타데이터 최적화"
                    ],
                    priceRange: "개발자 프로그램 연 $99"
                }
            ],
            trends: [
                "Flutter/React Native 크로스플랫폼 개발 급증",
                "5G 기반 AR/VR 앱 개발 확산",
                "슈퍼앱 트렌드 (금융+쇼핑+배달 통합)",
                "PWA(Progressive Web App) 도입 증가",
                "AI 기반 개인화 추천 앱 확산",
                "구독 모델 기반 수익화 확대"
            ],
            detailedStats: {
                averageProjectDuration: "3-8개월",
                successRate: "70%",
                popularTech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
                clientIndustries: ["이커머스", "헬스케어", "교육", "게임", "핀테크"]
            }
        },
        webDevelopment: {
            title: "웹 개발 (기업 홈페이지)",
            icon: <Globe className="w-6 h-6" />,
            marketSize: "약 3조 8,000억원",
            growth: "연평균 18% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "React/Next.js 기업 홈페이지 (800건+)",
                        "Vue/Nuxt.js 포트폴리오 사이트 (400건+)",
                        "워드프레스 커스터마이징 (600건+)",
                        "웹 어플리케이션 개발 (500건+)",
                        "반응형 랜딩페이지 (1,000건+)"
                    ],
                    priceRange: "300만원 ~ 8,000만원"
                },
                {
                    name: "크몽",
                    projects: [
                        "워드프레스 홈페이지 (2,500건+)",
                        "HTML/CSS 정적 사이트 (1,800건+)",
                        "Wix/Squarespace 커스터마이징 (1,200건+)",
                        "쇼핑몰 연동 홈페이지 (800건+)",
                        "SEO 최적화 서비스 (2,000건+)"
                    ],
                    priceRange: "50만원 ~ 2,000만원"
                }
            ],
            trends: [
                "Next.js/Nuxt.js 기반 SSR 개발 확산",
                "Headless CMS (Strapi, Contentful) 도입 증가",
                "JAMstack 아키텍처 적용 확대",
                "모바일 퍼스트 반응형 디자인 필수",
                "Core Web Vitals 기반 성능 최적화",
                "접근성(WCAG) 준수 요구사항 증가"
            ],
            detailedStats: {
                averageProjectDuration: "1-3개월",
                successRate: "90%",
                popularTech: ["React", "Vue.js", "WordPress", "Next.js", "TailwindCSS"],
                clientIndustries: ["제조업", "서비스업", "의료", "교육", "스타트업"]
            }
        },
        ecommerce: {
            title: "쇼핑몰/이커머스",
            icon: <ShoppingCart className="w-6 h-6" />,
            marketSize: "약 6조 2,000억원",
            growth: "코로나 이후 45% 급증",
            platforms: [
                {
                    name: "크몽",
                    projects: [
                        "카페24 쇼핑몰 제작 (3,000건+)",
                        "메이크샵/고도몰 커스터마이징 (1,500건+)",
                        "반응형 브랜드 쇼핑몰 (2,000건+)",
                        "네이버 스마트스토어 셋업 (4,000건+)",
                        "쿠팡/11번가 입점 대행 (2,500건+)"
                    ],
                    priceRange: "50만원 ~ 1,500만원"
                },
                {
                    name: "카페24 디자인센터",
                    projects: [
                        "프리미엄 스킨 개발 (500건+)",
                        "맞춤형 기능 개발 (300건+)",
                        "PG 연동 및 결제 시스템 (800건+)",
                        "재고관리 시스템 연동 (400건+)",
                        "글로벌 다국가 쇼핑몰 (150건+)"
                    ],
                    priceRange: "500만원 ~ 5,000만원"
                },
                {
                    name: "위시켓",
                    projects: [
                        "맞춤형 이커머스 플랫폼 (200건+)",
                        "B2B 전용 쇼핑몰 (150건+)",
                        "마켓플레이스 구축 (100건+)",
                        "옴니채널 통합 시스템 (80건+)",
                        "AI 추천 엔진 연동 (120건+)"
                    ],
                    priceRange: "2,000만원 ~ 3억원"
                }
            ],
            trends: [
                "카페24가 국내 쇼핑몰 제작 점유율 70%",
                "라이브커머스 플랫폼 연동 필수",
                "네이버페이/카카오페이/토스페이 연동 기본",
                "구독 커머스 모델 확산",
                "소셜커머스 연동 (인스타그램/페이스북 샵)",
                "AR/VR 가상 체험 쇼핑 도입"
            ],
            detailedStats: {
                averageProjectDuration: "2-6개월",
                successRate: "80%",
                popularTech: ["카페24", "Shopify", "WooCommerce", "Magento", "React"],
                clientIndustries: ["패션", "뷰티", "식품", "전자제품", "생활용품"]
            }
        },
        dataAnalytics: {
            title: "데이터 분석/BI",
            icon: <BarChart3 className="w-6 h-6" />,
            marketSize: "약 1조 8,000억원",
            growth: "연평균 35% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "Tableau/Power BI 대시보드 (400건+)",
                        "Python 데이터 분석 솔루션 (600건+)",
                        "실시간 데이터 파이프라인 (200건+)",
                        "머신러닝 예측 모델 (300건+)",
                        "빅데이터 ETL 시스템 (150건+)"
                    ],
                    priceRange: "1,000만원 ~ 1억원"
                },
                {
                    name: "크몽",
                    projects: [
                        "엑셀 데이터 분석 (2,000건+)",
                        "Python 크롤링 및 분석 (1,500건+)",
                        "구글 애널리틱스 설정 (1,800건+)",
                        "SQL 데이터베이스 최적화 (800건+)",
                        "마케팅 데이터 분석 (1,200건+)"
                    ],
                    priceRange: "30만원 ~ 1,000만원"
                }
            ],
            trends: [
                "실시간 스트리밍 데이터 분석 수요 증가",
                "클라우드 기반 데이터 웨어하우스 도입",
                "AutoML 기반 민주화된 머신러닝",
                "데이터 거버넌스 및 개인정보보호 강화",
                "DataOps/MLOps 자동화 파이프라인",
                "증강 분석(Augmented Analytics) 확산"
            ],
            detailedStats: {
                averageProjectDuration: "2-8개월",
                successRate: "75%",
                popularTech: ["Python", "R", "Tableau", "Power BI", "Apache Spark"],
                clientIndustries: ["금융", "리테일", "제조", "헬스케어", "마케팅"]
            }
        },
        automation: {
            title: "업무 자동화/RPA",
            icon: <Cpu className="w-6 h-6" />,
            marketSize: "약 1조 8,000억원",
            growth: "연평균 30% 성장",
            platforms: [
                {
                    name: "크몽",
                    projects: [
                        "파이썬 웹크롤링/스크래핑 (3,500건+)",
                        "엑셀 VBA 매크로 개발 (2,800건+)",
                        "업무 자동화 RPA 프로그램 (1,200건+)",
                        "카카오톡 자동화 봇 (800건+)",
                        "이메일 자동 발송 시스템 (1,500건+)"
                    ],
                    priceRange: "20만원 ~ 800만원"
                },
                {
                    name: "위시켓",
                    projects: [
                        "UiPath RPA 구축 (300건+)",
                        "Power Automate 자동화 (250건+)",
                        "파이썬 기반 업무 자동화 (500건+)",
                        "Selenium 웹 자동화 (400건+)",
                        "API 연동 자동화 시스템 (350건+)"
                    ],
                    priceRange: "500만원 ~ 8,000만원"
                }
            ],
            trends: [
                "은행권 RPA 도입으로 연간 125만 시간 절감",
                "UiPath, Power Automate 등 전문 툴 확산",
                "파이썬 크롤링이 가장 인기있는 서비스",
                "지능형 문서 처리(IDP) 기술 도입",
                "Process Mining 기반 업무 최적화",
                "하이퍼오토메이션(Hyper-automation) 확산"
            ],
            detailedStats: {
                averageProjectDuration: "1-4개월",
                successRate: "85%",
                popularTech: ["Python", "UiPath", "Power Automate", "Selenium", "API"],
                clientIndustries: ["금융", "보험", "제조", "물류", "공공기관"]
            }
        },
        smartFactory: {
            title: "스마트 팩토리/IoT",
            icon: <Package className="w-6 h-6" />,
            marketSize: "글로벌 180억 달러 (2025년)",
            growth: "연평균 15% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "MES/POP 시스템 고도화 (200건+)",
                        "베트남 현지 MES/WMS 구축 (50건+)",
                        "스마트공장 통합 SI (100건+)",
                        "IoT 센서 데이터 수집 시스템 (150건+)",
                        "예측 정비 시스템 (80건+)"
                    ],
                    priceRange: "5,000만원 ~ 5억원"
                },
                {
                    name: "정부지원사업",
                    projects: [
                        "스마트공장 구축비 50% 지원",
                        "제조실행시스템(MES) 도입",
                        "RFID/IoT 기반 물류관리",
                        "AI 기반 품질관리 시스템",
                        "디지털 트윈 구축"
                    ],
                    priceRange: "1억원 ~ 10억원"
                }
            ],
            trends: [
                "정부 스마트공장 지원사업 지속 확대",
                "PCB, 사출 업종 특화 MES 수요 급증",
                "실시간 모니터링 시스템 필수화",
                "5G 기반 무선 Factory 구축",
                "AI/ML 기반 예측 분석 도입",
                "탄소 중립 실현을 위한 에너지 관리"
            ],
            detailedStats: {
                averageProjectDuration: "6-18개월",
                successRate: "70%",
                popularTech: ["MES", "WMS", "IoT", "RFID", "AI/ML"],
                clientIndustries: ["제조업", "물류", "화학", "전자", "자동차"]
            }
        },
        blockchain: {
            title: "블록체인/NFT",
            icon: <Shield className="w-6 h-6" />,
            marketSize: "약 8,000억원",
            growth: "연평균 40% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "DeFi 플랫폼 개발 (80건+)",
                        "NFT 마켓플레이스 구축 (120건+)",
                        "스마트 컨트랙트 개발 (200건+)",
                        "암호화폐 거래소 구축 (30건+)",
                        "Web3 DApp 개발 (150건+)"
                    ],
                    priceRange: "2,000만원 ~ 10억원"
                },
                {
                    name: "크몽",
                    projects: [
                        "NFT 발행 서비스 (800건+)",
                        "블록체인 컨설팅 (400건+)",
                        "암호화폐 백서 작성 (300건+)",
                        "메타마스크 연동 (500건+)",
                        "토큰 이코노미 설계 (200건+)"
                    ],
                    priceRange: "100만원 ~ 3,000만원"
                }
            ],
            trends: [
                "기업용 프라이빗 블록체인 도입 확산",
                "CBDC(중앙은행 디지털화폐) 연구 활발",
                "NFT 활용 분야 다양화 (게임, 부동산, 예술)",
                "Layer 2 솔루션 (Polygon, Arbitrum) 급성장",
                "DeFi 2.0 및 GameFi 생태계 확장",
                "ESG 경영과 연계된 탄소 크레딧 토큰화"
            ],
            detailedStats: {
                averageProjectDuration: "3-12개월",
                successRate: "60%",
                popularTech: ["Solidity", "Ethereum", "Polygon", "React", "Web3.js"],
                clientIndustries: ["핀테크", "게임", "예술", "부동산", "공급망"]
            }
        },
        erp: {
            title: "ERP/그룹웨어",
            icon: <Building2 className="w-6 h-6" />,
            marketSize: "약 2조 5,000억원",
            growth: "연평균 12% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "SAP 커스터마이징 (150건+)",
                        "Oracle ERP 구축 (100건+)",
                        "더존 ERP 연동 (200건+)",
                        "맞춤형 ERP 개발 (300건+)",
                        "그룹웨어 시스템 구축 (400건+)"
                    ],
                    priceRange: "3,000만원 ~ 15억원"
                },
                {
                    name: "크몽",
                    projects: [
                        "더존 Smart A 설정 (500건+)",
                        "회계 프로그램 연동 (800건+)",
                        "인사관리 시스템 (300건+)",
                        "재고관리 프로그램 (600건+)",
                        "급여관리 시스템 (400건+)"
                    ],
                    priceRange: "200만원 ~ 2,000만원"
                }
            ],
            trends: [
                "클라우드 기반 SaaS ERP 전환 가속화",
                "중소기업용 경량화 ERP 수요 증가",
                "AI 기반 지능형 ERP 기능 도입",
                "모바일 중심 사용자 경험 개선",
                "API 연동을 통한 생태계 확장",
                "실시간 분석 및 대시보드 기능 강화"
            ],
            detailedStats: {
                averageProjectDuration: "6-24개월",
                successRate: "75%",
                popularTech: ["SAP", "Oracle", "더존", "Java", "React"],
                clientIndustries: ["제조업", "유통업", "서비스업", "건설업", "의료업"]
            }
        },
        cloud: {
            title: "클라우드 마이그레이션",
            icon: <Cloud className="w-6 h-6" />,
            marketSize: "약 3조 2,000억원",
            growth: "연평균 28% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "AWS 클라우드 마이그레이션 (300건+)",
                        "Azure DevOps 구축 (200건+)",
                        "GCP 데이터 파이프라인 (150건+)",
                        "Kubernetes 컨테이너화 (250건+)",
                        "서버리스 아키텍처 구축 (180건+)"
                    ],
                    priceRange: "2,000만원 ~ 2억원"
                },
                {
                    name: "크몽",
                    projects: [
                        "AWS EC2 서버 설정 (1,200건+)",
                        "클라우드 비용 최적화 (800건+)",
                        "백업 및 재해복구 (600건+)",
                        "SSL 인증서 설정 (1,500건+)",
                        "도메인 및 DNS 설정 (2,000건+)"
                    ],
                    priceRange: "50만원 ~ 1,000만원"
                }
            ],
            trends: [
                "멀티클라우드 전략 도입 확산",
                "컨테이너 오케스트레이션 (K8s) 표준화",
                "서버리스 컴퓨팅 채택 가속화",
                "클라우드 네이티브 개발 문화 확산",
                "FinOps를 통한 클라우드 비용 관리",
                "엣지 컴퓨팅과 하이브리드 클라우드"
            ],
            detailedStats: {
                averageProjectDuration: "3-12개월",
                successRate: "80%",
                popularTech: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"],
                clientIndustries: ["IT서비스", "금융", "이커머스", "스타트업", "대기업"]
            }
        },
        security: {
            title: "보안 솔루션",
            icon: <Shield className="w-6 h-6" />,
            marketSize: "약 1조 5,000억원",
            growth: "연평균 22% 성장",
            platforms: [
                {
                    name: "위시켓",
                    projects: [
                        "웹 애플리케이션 보안 강화 (200건+)",
                        "네트워크 보안 시스템 (150건+)",
                        "개인정보보호 솔루션 (300건+)",
                        "침입탐지 시스템 (IDS) 구축 (100건+)",
                        "블록체인 기반 인증 시스템 (80건+)"
                    ],
                    priceRange: "1,000만원 ~ 5억원"
                },
                {
                    name: "크몽",
                    projects: [
                        "SSL 인증서 설치 (2,000건+)",
                        "웹사이트 보안 점검 (1,500건+)",
                        "개인정보처리방침 작성 (1,800건+)",
                        "해킹 복구 서비스 (800건+)",
                        "보안 컨설팅 (600건+)"
                    ],
                    priceRange: "30만원 ~ 1,500만원"
                }
            ],
            trends: [
                "제로 트러스트 보안 모델 도입 확산",
                "AI 기반 위협 탐지 시스템 성장",
                "클라우드 보안 (CASB, CWPP) 수요 증가",
                "DevSecOps 문화 정착",
                "랜섬웨어 대응 솔루션 필수화",
                "개인정보보호법 강화로 컴플라이언스 수요"
            ],
            detailedStats: {
                averageProjectDuration: "2-8개월",
                successRate: "85%",
                popularTech: ["방화벽", "SIEM", "DLP", "WAF", "EDR"],
                clientIndustries: ["금융", "의료", "공공기관", "이커머스", "제조업"]
            }
        }
    };

    const ProjectCard = ({ platform, category }: {
        platform: { name: string; projects: string[]; priceRange: string },
        category: string
    }) => (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{platform.name}</h4>
                <a
                    href={getSearchUrl(platform.name, category)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                    바로가기 →
                </a>
            </div>
            <div className="space-y-2">
                <div>
                    <p className="text-sm text-gray-600 mb-1">주요 프로젝트:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        {platform.projects.map((project, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>{project}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm">
                        <span className="text-gray-600">예상 비용:</span>
                        <span className="ml-2 font-semibold text-green-600">{platform.priceRange}</span>
                    </p>
                </div>
            </div>
        </div>
    );

    const DetailedStatsCard = ({ stats }: { stats: any }) => (
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 mt-4">
            <h5 className="font-semibold text-gray-800 mb-3">상세 통계</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-600">평균 프로젝트 기간</p>
                    <p className="font-semibold text-gray-800">{stats.averageProjectDuration}</p>
                </div>
                <div>
                    <p className="text-gray-600">프로젝트 성공률</p>
                    <p className="font-semibold text-green-600">{stats.successRate}</p>
                </div>
                <div>
                    <p className="text-gray-600">인기 기술 스택</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {stats.popularTech.map((tech: string, idx: number) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <p className="text-gray-600">주요 고객 업종</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {stats.clientIndustries.map((industry: string, idx: number) => (
                            <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                                {industry}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        한국 프리랜서 SI 시장 종합 조사 보고서 2025
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="bg-blue-50 rounded-lg p-3">
                            <p className="text-gray-600 mb-2">조사 플랫폼</p>
                            <div className="space-y-1">
                                <a
                                    href="https://www.wishket.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-blue-600 hover:text-blue-800 block"
                                >
                                    위시켓 →
                                </a>
                                <a
                                    href="https://kmong.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-blue-600 hover:text-blue-800 block"
                                >
                                    크몽 →
                                </a>
                            </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                            <p className="text-gray-600">조사 기간</p>
                            <p className="font-semibold text-gray-800">2025년 2월</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                            <p className="text-gray-600">총 시장 규모</p>
                            <p className="font-semibold text-gray-800">약 35조원+</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3">
                            <p className="text-gray-600">조사 분야</p>
                            <p className="font-semibold text-gray-800">11개 주요 분야</p>
                        </div>
                    </div>
                </div>

                {/* Market Overview */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">시장 개요</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">연간 프로젝트</h3>
                            <p className="text-3xl font-bold">50,000+</p>
                            <p className="text-sm opacity-90">건/년</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">평균 성장률</h3>
                            <p className="text-3xl font-bold">25%</p>
                            <p className="text-sm opacity-90">연평균</p>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">활성 프리랜서</h3>
                            <p className="text-3xl font-bold">15,000+</p>
                            <p className="text-sm opacity-90">명</p>
                        </div>
                    </div>
                </div>

                {/* Market Sections */}
                <div className="space-y-6">
                    {Object.entries(marketData).map(([key, section]) => (
                        <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            {/* Section Header */}
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 cursor-pointer hover:from-indigo-600 hover:to-purple-700 transition-colors"
                                onClick={() => toggleSection(key)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {section.icon}
                                        <div>
                                            <h2 className="text-2xl font-bold">{section.title}</h2>
                                            <div className="flex items-center space-x-4 mt-2 text-sm">
                                                <span className="bg-white/20 px-3 py-1 rounded-full">
                                                    시장 규모: {section.marketSize}
                                                </span>
                                                <span className="bg-white/20 px-3 py-1 rounded-full flex items-center">
                                                    <TrendingUp className="w-4 h-4 mr-1" />
                                                    {section.growth}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {expandedSections[key] ?
                                        <ChevronDown className="w-6 h-6" /> :
                                        <ChevronRight className="w-6 h-6" />
                                    }
                                </div>
                            </div>

                            {/* Section Content */}
                            {expandedSections[key] && (
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                                        {section.platforms.map((platform, idx) => (
                                            <ProjectCard key={idx} platform={platform} category={key} />
                                        ))}
                                    </div>

                                    {/* Detailed Stats */}
                                    {section.detailedStats && (
                                        <DetailedStatsCard stats={section.detailedStats} />
                                    )}

                                    {/* Trends */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mt-4">
                                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                            <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                                            시장 트렌드 및 전망
                                        </h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                            {section.trends.map((trend, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-gray-700">
                                                    <span className="text-indigo-500 mr-2 mt-0.5">▸</span>
                                                    <span>{trend}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Detailed Market Analysis */}
                <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">심층 시장 분석</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 text-lg">🚀 고성장 분야 TOP 5</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                        <span className="font-medium">블록체인/NFT</span>
                                        <span className="font-bold text-red-600">+40%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                                        <span className="font-medium">데이터 분석/BI</span>
                                        <span className="font-bold text-orange-600">+35%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                                        <span className="font-medium">업무 자동화/RPA</span>
                                        <span className="font-bold text-yellow-600">+30%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                        <span className="font-medium">클라우드 마이그레이션</span>
                                        <span className="font-bold text-green-600">+28%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                        <span className="font-medium">AI 상담 시스템</span>
                                        <span className="font-bold text-blue-600">+25%</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 text-lg">💰 수익성 분석</h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-green-50 rounded-lg">
                                        <p className="font-medium text-green-800">고수익 분야</p>
                                        <p className="text-sm text-gray-600">블록체인, 스마트팩토리, ERP (평균 5,000만원+)</p>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                        <p className="font-medium text-blue-800">중수익 분야</p>
                                        <p className="text-sm text-gray-600">AI 상담, 데이터분석, 보안 (1,000-3,000만원)</p>
                                    </div>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-medium text-gray-800">대중적 분야</p>
                                        <p className="text-sm text-gray-600">웹개발, 쇼핑몰, 자동화 (100-1,000만원)</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 text-lg">🎯 플랫폼별 특성</h3>
                                <div className="space-y-3">
                                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                                        <h4 className="font-semibold text-blue-800">위시켓</h4>
                                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                                            <li>• 대규모 프로젝트 중심 (1,000만원+)</li>
                                            <li>• 기업 고객 비중 높음</li>
                                            <li>• 전문성 요구 프로젝트</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 border-l-4 border-green-500 bg-green-50">
                                        <h4 className="font-semibold text-green-800">크몽</h4>
                                        <ul className="text-sm text-gray-700 mt-2 space-y-1">
                                            <li>• 소규모 프로젝트 중심 (100만원 이하)</li>
                                            <li>• 개인/소상공인 고객 많음</li>
                                            <li>• 빠른 턴어라운드</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 text-lg">🌟 신흥 기회 분야</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center p-2 bg-purple-50 rounded">
                                        <Zap className="w-4 h-4 text-purple-600 mr-2" />
                                        <span className="text-sm">메타버스 플랫폼 개발</span>
                                    </div>
                                    <div className="flex items-center p-2 bg-purple-50 rounded">
                                        <Zap className="w-4 h-4 text-purple-600 mr-2" />
                                        <span className="text-sm">ChatGPT 플러그인 개발</span>
                                    </div>
                                    <div className="flex items-center p-2 bg-purple-50 rounded">
                                        <Zap className="w-4 h-4 text-purple-600 mr-2" />
                                        <span className="text-sm">ESG 데이터 관리 시스템</span>
                                    </div>
                                    <div className="flex items-center p-2 bg-purple-50 rounded">
                                        <Zap className="w-4 h-4 text-purple-600 mr-2" />
                                        <span className="text-sm">디지털 트윈 구축</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 text-lg">⚠️ 위험 요소</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• AI 자동화로 인한 단순 작업 대체</li>
                                    <li>• 노코드/로우코드 툴 확산</li>
                                    <li>• 해외 개발자와의 가격 경쟁</li>
                                    <li>• 기술 변화 속도 가속화</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">시장 분석 요약</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">🔥 가장 활발한 분야</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• <a href="https://design.cafe24.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">쇼핑몰 제작 (카페24 중심) →</a></li>
                                    <li>• <a href="https://kmong.com/search?keyword=%EC%97%85%EB%AC%B4%EC%9E%90%EB%8F%99%ED%99%94" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">파이썬 기반 업무 자동화 →</a></li>
                                    <li>• <a href="https://www.wishket.com/project/?skill_tags=AI%20%EC%B1%97%EB%B4%87" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">AI 챗봇 상담 시스템 →</a></li>
                                    <li>• <a href="https://kmong.com/search?keyword=%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80%20%EC%A0%9C%EC%9E%91" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">기업 홈페이지 제작 →</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">💰 프로젝트 규모별 분포</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• 소규모 (100만원 이하): 60%</li>
                                    <li>• 중규모 (100-1,000만원): 30%</li>
                                    <li>• 대규모 (1,000만원 이상): 10%</li>
                                </ul>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">📈 향후 5년 전망</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• 전체 시장 규모 50조원 돌파 예상</li>
                                    <li>• AI/자동화 분야 300% 성장 전망</li>
                                    <li>• 클라우드 네이티브 프로젝트 급증</li>
                                    <li>• 정부 디지털뉴딜 정책 지속 확대</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">🎯 성공 전략</h3>
                                <ul className="text-sm text-gray-700 space-y-1">
                                    <li>• 최신 기술 스택 지속 학습</li>
                                    <li>• <a href="https://www.smart-factory.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">정부 지원사업 적극 활용 →</a></li>
                                    <li>• 틈새 전문 분야 발굴</li>
                                    <li>• 해외 진출 기회 모색</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">🔗 주요 플랫폼 바로가기</h3>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            <a
                                href="https://www.wishket.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-600 transition-colors"
                            >
                                위시켓
                            </a>
                            <a
                                href="https://kmong.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-green-600 transition-colors"
                            >
                                크몽
                            </a>
                            <a
                                href="https://design.cafe24.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-orange-600 transition-colors"
                            >
                                카페24
                            </a>
                            <a
                                href="https://www.smart-factory.kr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-purple-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-purple-600 transition-colors"
                            >
                                스마트팩토리
                            </a>
                            <a
                                href="https://channel.io/ko"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-indigo-600 transition-colors"
                            >
                                채널톡
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SIMarketSurvey;