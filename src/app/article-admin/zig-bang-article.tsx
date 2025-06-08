'use client';

import React, { useState, ReactNode } from 'react';
import {
    ChevronDown, ChevronRight,
    Users, Code, Cloud, Zap,
    Building2, BookOpen, BarChart,
    Globe, Phone, Cpu, Server,
    GitBranch, Layers, Target,
    Lightbulb, School, Heart,
    Home, Smartphone, Shield,
    TrendingUp, Award, Rocket,
    Calendar, DollarSign, Briefcase
} from 'lucide-react';

interface SectionProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
}

const CollapsibleSection: React.FC<SectionProps> = ({
    title, icon, children, defaultOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
    return (
        <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between hover:from-blue-100 hover:to-indigo-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="text-blue-600">{icon}</div>
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                </div>
                {isOpen ? (
                    <ChevronDown className="text-gray-600" />
                ) : (
                    <ChevronRight className="text-gray-600" />
                )}
            </button>
            {isOpen && <div className="px-6 py-4 text-gray-700">{children}</div>}
        </div>
    );
};

export default function ZigbangReportPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                            <Building2 className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            직방(Zigbang) 기업문화 & 기술 현황 종합 보고서
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 mb-2">
                        대한민국 대표 프롭테크 플랫폼, "Living Forward" 비전으로 주거 혁신 선도
                    </p>
                    <p className="text-sm text-gray-500">
                        2010년 창업 이후 부동산 거래의 디지털 전환을 이끌어온 혁신 기업
                    </p>
                </div>

                {/* 회사 개요 & 연혁 */}
                <CollapsibleSection title="🏢 회사 개요 & 연혁" icon={<Calendar className="w-6 h-6" />} defaultOpen>
                    <div className="space-y-4">
                        <div className="bg-indigo-50 rounded-lg p-4">
                            <h3 className="font-bold text-indigo-800 mb-2">주요 연혁</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• <strong>2010년:</strong> 직방 서비스 시작 (원룸/투룸 중심)</li>
                                <li>• <strong>2015년:</strong> 모바일 앱 출시, 업계 최초 VR 홈투어 도입</li>
                                <li>• <strong>2018년:</strong> 시리즈 D 투자 유치 (누적 1,000억원)</li>
                                <li>• <strong>2019년:</strong> 호갱노노 인수, 부동산 정보 플랫폼 확대</li>
                                <li>• <strong>2021년:</strong> 삼성SDS와 전략적 파트너십 체결</li>
                                <li>• <strong>2022년:</strong> 스마트홈 IoT 사업 본격 진출</li>
                                <li>• <strong>2024년:</strong> SK쉴더스와 스마트홈 보안 협업</li>
                                <li>• <strong>2025년:</strong> 시리즈 F 투자 유치 준비 (600억원 규모)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">기업 정보</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>설립:</strong> 2010년</li>
                                <li><strong>대표이사:</strong> 안성우</li>
                                <li><strong>본사:</strong> 서울특별시 강남구</li>
                                <li><strong>직원 수:</strong> 약 300명 (2024년 기준)</li>
                                <li><strong>주요 주주:</strong> 알토스벤처스, 골드만삭스, IMM PE 등</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 핵심 가치 & 비전 */}
                <CollapsibleSection title="🎯 핵심 가치 & 비전" icon={<Target className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="font-bold text-blue-800 mb-2">Living Forward - 미래 주거의 기준</h3>
                            <p className="text-gray-700 mb-3">
                                직방은 단순한 부동산 정보 제공을 넘어 스마트한 주거 경험을 만들어가고 있습니다.
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li>• <strong>Digital First:</strong> 모든 부동산 거래의 디지털화</li>
                                <li>• <strong>User Centric:</strong> 사용자 중심의 서비스 설계</li>
                                <li>• <strong>Data Driven:</strong> 빅데이터 기반 의사결정 지원</li>
                                <li>• <strong>Innovation:</strong> 프롭테크 기술 혁신 선도</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">핵심 가치 (Core Values)</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Trust:</strong> 투명하고 신뢰할 수 있는 부동산 정보</li>
                                <li><strong>Innovation:</strong> 기술을 통한 지속적인 혁신</li>
                                <li><strong>Excellence:</strong> 최고의 사용자 경험 추구</li>
                                <li><strong>Collaboration:</strong> 팀워크와 협업 문화</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 기업 문화 & 조직 */}
                <CollapsibleSection title="🏡 기업 문화 & 조직 구조" icon={<Users className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">조직 문화 특징</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Communication First:</strong> 2주마다 타운홀 미팅으로 투명한 정보 공유</li>
                                <li><strong>Agility & Predictability:</strong> 애자일 조직 구성으로 빠른 피드백 사이클</li>
                                <li><strong>Remote-first Hybrid:</strong> 원격근무 기본, 필요시 오피스 근무 가능</li>
                                <li><strong>Smart Pioneer:</strong> "Vision Vector" 아래 혁신 추구</li>
                                <li><strong>Fail Fast, Learn Faster:</strong> 실패를 통한 빠른 학습 문화</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">조직 구조</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Product 조직:</strong> 서비스별 독립적인 제품팀 운영</li>
                                <li><strong>Engineering 조직:</strong> 플랫폼팀, 서비스팀, 인프라팀</li>
                                <li><strong>Data 조직:</strong> 데이터 분석, ML/AI, 데이터 엔지니어링</li>
                                <li><strong>Design 조직:</strong> UX/UI, 브랜드 디자인, 리서치</li>
                                <li><strong>Business 조직:</strong> 영업, 마케팅, 파트너십</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">개발 문화</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>스프린트 기반 애자일 개발 프로세스</li>
                                <li>코드 리뷰 필수화 (PR 최소 2명 승인)</li>
                                <li>테스트 주도 개발 (TDD) 권장</li>
                                <li>주간 Tech Talk 및 지식 공유 세션</li>
                                <li>해커톤 및 사내 프로젝트 지원</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 주요 서비스 & 제품 */}
                <CollapsibleSection title="📱 주요 서비스 & 제품" icon={<Smartphone className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">직방 (메인 앱)</h3>
                                <p className="text-sm text-gray-600">원룸, 투룸, 오피스텔, 아파트 등 전체 주거 형태 포괄</p>
                                <ul className="text-sm mt-2 space-y-1">
                                    <li>• 월 활성 사용자 400만+</li>
                                    <li>• 매물 100만+ 건</li>
                                    <li>• VR/3D 투어 지원</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">직방 비즈</h3>
                                <p className="text-sm text-gray-600">상가, 사무실 등 상업용 부동산 전문 플랫폼</p>
                                <ul className="text-sm mt-2 space-y-1">
                                    <li>• B2B 특화 서비스</li>
                                    <li>• 권리금 분석 도구</li>
                                    <li>• 상권 분석 제공</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">호갱노노</h3>
                                <p className="text-sm text-gray-600">아파트 실거래가 및 시세 정보 플랫폼</p>
                                <ul className="text-sm mt-2 space-y-1">
                                    <li>• 실거래가 데이터베이스</li>
                                    <li>• 시세 예측 모델</li>
                                    <li>• 단지 정보 상세 제공</li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">직방 IoT</h3>
                                <p className="text-sm text-gray-600">스마트홈 통합 관리 플랫폼</p>
                                <ul className="text-sm mt-2 space-y-1">
                                    <li>• 스마트 도어락</li>
                                    <li>• 홈 IoT 기기 연동</li>
                                    <li>• SK쉴더스 보안 연계</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">혁신 기능</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>AI 매물 추천:</strong> 사용자 행동 분석 기반 맞춤형 추천</li>
                                <li><strong>3D 단지투어:</strong> 드론 촬영 기반 아파트 단지 3D 뷰</li>
                                <li><strong>VR 홈투어:</strong> 방문 없이 집 내부 가상 체험</li>
                                <li><strong>AI 가격 예측:</strong> 머신러닝 기반 시세 예측 모델</li>
                                <li><strong>스마트 계약:</strong> 전자계약 시스템 (블록체인 검토 중)</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 기술 스택 & 아키텍처 */}
                <CollapsibleSection title="💻 기술 스택 & 아키텍처" icon={<Code className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">프론트엔드</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>웹:</strong> React 18, Next.js 14, TypeScript, Tailwind CSS, Radix UI</li>
                                <li><strong>모바일:</strong> iOS (Swift 5, SwiftUI), Android (Kotlin, Jetpack Compose)</li>
                                <li><strong>상태관리:</strong> Redux Toolkit, React Query, Zustand</li>
                                <li><strong>테스트:</strong> Jest, React Testing Library, Detox (E2E)</li>
                                <li><strong>디자인 시스템:</strong> Storybook 기반 컴포넌트 라이브러리</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">백엔드</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>주요 언어:</strong> Node.js (NestJS), Python (Django/FastAPI), Go (Gin)</li>
                                <li><strong>API:</strong> GraphQL (Apollo), REST, gRPC (내부 통신)</li>
                                <li><strong>마이크로서비스:</strong> 도메인별 분리, Event-driven Architecture</li>
                                <li><strong>메시징:</strong> Apache Kafka, RabbitMQ, AWS SQS</li>
                                <li><strong>검색엔진:</strong> Elasticsearch 7.x, Apache Solr</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">데이터 & AI/ML</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>데이터 파이프라인:</strong> Apache Airflow, AWS Glue, Spark</li>
                                <li><strong>데이터 웨어하우스:</strong> Amazon Redshift, Snowflake</li>
                                <li><strong>ML 프레임워크:</strong> TensorFlow, PyTorch, Scikit-learn</li>
                                <li><strong>ML 플랫폼:</strong> SageMaker, Kubeflow</li>
                                <li><strong>분석 도구:</strong> Tableau, Looker, Jupyter</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">인프라 & DevOps</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>클라우드:</strong> AWS (주력), Azure (일부)</li>
                                <li><strong>컨테이너:</strong> Docker, Kubernetes (EKS), Helm</li>
                                <li><strong>CI/CD:</strong> GitHub Actions, ArgoCD, Jenkins</li>
                                <li><strong>IaC:</strong> Terraform, AWS CDK, Ansible</li>
                                <li><strong>모니터링:</strong> Prometheus, Grafana, Datadog, New Relic</li>
                                <li><strong>보안:</strong> AWS WAF, Vault, SIEM, Pen Testing</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">데이터베이스</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>RDBMS:</strong> PostgreSQL 14+, MySQL 8.0, Aurora</li>
                                <li><strong>NoSQL:</strong> MongoDB, DynamoDB, Redis</li>
                                <li><strong>시계열 DB:</strong> InfluxDB (IoT 데이터)</li>
                                <li><strong>그래프 DB:</strong> Neo4j (추천 시스템)</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 기술적 도전과 해결 사례 */}
                <CollapsibleSection title="💡 기술적 도전과 해결 사례" icon={<Lightbulb className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div className="bg-purple-50 rounded-lg p-4">
                            <h3 className="font-bold text-purple-800 mb-2">1. 대용량 이미지 처리 최적화</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>일 평균 10만+ 매물 이미지 업로드 처리</li>
                                <li>Lambda@Edge를 활용한 실시간 이미지 리사이징</li>
                                <li>WebP 자동 변환으로 50% 용량 절감</li>
                                <li>CloudFront CDN으로 글로벌 배포</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="font-bold text-green-800 mb-2">2. 실시간 매물 동기화</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>중개사 시스템과 실시간 연동</li>
                                <li>Kafka 기반 이벤트 스트리밍</li>
                                <li>중복 매물 자동 필터링 AI</li>
                                <li>5분 이내 매물 업데이트 보장</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="font-bold text-blue-800 mb-2">3. AI 기반 허위매물 탐지</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>이미지 분석으로 중복/도용 사진 탐지</li>
                                <li>자연어 처리로 허위 정보 패턴 분석</li>
                                <li>95% 이상 정확도 달성</li>
                                <li>일 평균 1,000건+ 허위매물 차단</li>
                            </ul>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4">
                            <h3 className="font-bold text-orange-800 mb-2">4. 3D/VR 콘텐츠 스트리밍</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>Matterport 카메라 연동 시스템</li>
                                <li>적응형 비트레이트 스트리밍</li>
                                <li>모바일 최적화 (5G/LTE/WiFi)</li>
                                <li>오프라인 캐싱 지원</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 투자 및 파트너십 */}
                <CollapsibleSection title="💰 투자 및 파트너십" icon={<DollarSign className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">투자 유치 현황</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>시리즈 A (2012):</strong> 30억원 - 알토스벤처스</li>
                                <li><strong>시리즈 B (2014):</strong> 100억원 - 골드만삭스 주도</li>
                                <li><strong>시리즈 C (2016):</strong> 300억원 - 경영참여형 사모펀드</li>
                                <li><strong>시리즈 D (2018):</strong> 500억원 - IMM PE 주도</li>
                                <li><strong>시리즈 E (2021):</strong> 800억원 - 기존 투자사 참여</li>
                                <li><strong>시리즈 F (2025 예정):</strong> 600억원 목표</li>
                                <li><strong>누적 투자액:</strong> 약 2,500억원</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">주요 파트너십</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>삼성SDS:</strong> 클라우드 인프라 및 AI 기술 협력</li>
                                <li><strong>SK쉴더스:</strong> 스마트홈 보안 솔루션 공동 개발</li>
                                <li><strong>KB국민은행:</strong> 주택담보대출 연계 서비스</li>
                                <li><strong>네이버:</strong> 지도 API 및 검색 연동</li>
                                <li><strong>카카오:</strong> 카카오톡 채널 연동</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 채용 & 복지 */}
                <CollapsibleSection title="🎓 채용 & 개발자 복지" icon={<School className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">채용 프로세스</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>서류 전형 (이력서, 포트폴리오)</li>
                                <li>1차 기술 면접 (온라인 코딩 테스트)</li>
                                <li>2차 기술 면접 (시스템 설계, 문제 해결)</li>
                                <li>컬처핏 인터뷰</li>
                                <li>처우 협의 및 최종 합격</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">개발자 복지</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>근무 환경:</strong> 완전 자율 출퇴근, 원격근무 기본</li>
                                <li><strong>장비 지원:</strong> 맥북 프로 16인치, 모니터 2대, 인체공학 의자</li>
                                <li><strong>교육 지원:</strong> 컨퍼런스 참가비, 온라인 강의, 도서 구매 무제한</li>
                                <li><strong>건강 관리:</strong> 종합검진, 단체보험, 헬스장 이용권</li>
                                <li><strong>리프레시:</strong> 연차 15일+, 리프레시 휴가 5일, 경조사 휴가</li>
                                <li><strong>성과 보상:</strong> 스톡옵션, 성과급, 프로젝트 인센티브</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">성장 지원</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>사내 Tech Talk 및 세미나</li>
                                <li>외부 전문가 초청 강연</li>
                                <li>팀 간 로테이션 프로그램</li>
                                <li>오픈소스 기여 시간 할당</li>
                                <li>사내 스터디 그룹 지원</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 현재 상황 & 성과 */}
                <CollapsibleSection title="📈 현재 상황 & 성과" icon={<BarChart className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">재무 성과</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>2024년 연결 매출 1,014억원 (전년 대비 15% 감소)</li>
                                <li>2024년 영업손실 287억원 (전년 대비 30% 개선)</li>
                                <li>2021→2023년 매출 558억→1,200억원 (2년간 2배 성장)</li>
                                <li>2025년 흑자 전환 목표</li>
                                <li>누적 거래액 50조원 돌파</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">서비스 지표</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>MAU:</strong> 400만명+ (2024년 기준)</li>
                                <li><strong>등록 매물:</strong> 100만건+ 실시간 관리</li>
                                <li><strong>중개사 회원:</strong> 5만개+ 중개사무소</li>
                                <li><strong>앱 다운로드:</strong> 누적 2,000만+ 다운로드</li>
                                <li><strong>일 평균 방문자:</strong> 150만명</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">기술적 성과</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>서비스 가용성 99.95% 달성</li>
                                <li>평균 응답 시간 200ms 이하</li>
                                <li>일 평균 API 호출 1억건+ 처리</li>
                                <li>AI 매물 추천 정확도 85%</li>
                                <li>VR 투어 콘텐츠 10만개+ 제공</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 시장 위치 & 경쟁 현황 */}
                <CollapsibleSection title="🏆 시장 위치 & 경쟁 현황" icon={<Award className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">프롭테크 시장 위치</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>국내 부동산 앱 시장 점유율 2위</li>
                                <li>원룸/투룸 시장 1위 (70% 점유율)</li>
                                <li>모바일 중심 세대 선호도 1위</li>
                                <li>VR/3D 기술 선도 기업</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">주요 경쟁사</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>네이버 부동산:</strong> 포털 기반 종합 플랫폼</li>
                                <li><strong>다방:</strong> 원룸 특화 경쟁사</li>
                                <li><strong>매경 부동산:</strong> 아파트 중심 서비스</li>
                                <li><strong>당근마켓:</strong> 부동산 직거래 진출</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">차별화 포인트</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>업계 최초 VR/3D 투어 기술</li>
                                <li>AI 기반 매물 추천 및 가격 예측</li>
                                <li>스마트홈 IoT 통합 플랫폼</li>
                                <li>중개사 전용 B2B 솔루션</li>
                                <li>호갱노노 통한 데이터 시너지</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 미래 전략 & 비전 */}
                <CollapsibleSection title="🚀 미래 전략 & 비전" icon={<Rocket className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">2025-2027 로드맵</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>2025:</strong> 흑자 전환, IPO 준비 시작</li>
                                <li><strong>2026:</strong> 동남아 시장 진출 (베트남, 태국)</li>
                                <li><strong>2027:</strong> 블록체인 기반 부동산 거래 플랫폼 출시</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">기술 혁신 계획</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>AI 고도화:</strong> GPT 기반 부동산 상담 챗봇</li>
                                <li><strong>메타버스:</strong> 가상 부동산 투어 플랫폼</li>
                                <li><strong>블록체인:</strong> 스마트 계약 기반 안전거래</li>
                                <li><strong>빅데이터:</strong> 부동산 시장 예측 모델 고도화</li>
                                <li><strong>IoT 확대:</strong> 통합 스마트홈 관리 시스템</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">사업 확장 전략</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li>부동산 금융 서비스 진출 (대출 중개)</li>
                                <li>인테리어/이사 O2O 서비스 통합</li>
                                <li>PropTech SaaS B2B 사업 확대</li>
                                <li>글로벌 시장 진출 가속화</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 참고 자료 및 출처 */}
                <CollapsibleSection title="📚 참고 자료 및 출처" icon={<BookOpen className="w-6 h-6" />}>
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-800">공식 채널</h3>
                            <a href="https://company.zigbang.com" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 직방 공식 홈페이지
                            </a>
                            <a href="https://career.zigbang.com" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 직방 채용 페이지
                            </a>
                            <a href="https://medium.com/zigbang" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 직방 기술 블로그
                            </a>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-800">언론 보도</h3>
                            <a href="https://company.zigbang.com/newsroom/view?idx=322" className="block text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                                • 직방, 지난해 적자폭 30% 개선 보도자료
                            </a>
                            <a href="https://byline.network/2025/03/11-453/" className="block text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                                • "직방에 봄이 오나" 재무분석 기사
                            </a>
                            <a href="https://plus.hankyung.com/apps/newsinside.view?aid=202505142346r" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 직방 시리즈F 투자 유치 소식
                            </a>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-800">기타 자료</h3>
                            <a href="https://kr.linkedin.com/company/zigbang" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 직방 LinkedIn 페이지
                            </a>
                            <a href="https://fork.ai/lookup/zigbang-227322" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • Fork.ai: 직방 기술 스택 분석
                            </a>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* Footer */}
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600 text-center">
                        본 보고서는 2025년 6월 기준, 공개된 자료를 바탕으로 작성되었습니다.
                    </p>
                    <p className="text-xs text-gray-500 text-center mt-2">
                        출처: 직방 공식 홈페이지, 보도자료, 기술 블로그, LinkedIn, 언론 보도 종합
                    </p>
                </div>
            </div>
        </div>
    );
}