'use client';

import React, { useState, ReactNode } from 'react';
import {
    ChevronDown, ChevronRight,
    Code, Users, Layers, GitBranch,
    Cloud, Rocket, Terminal, Database, Zap,
    BookOpen, Building2, ExternalLink,
    Target, Lightbulb, Heart, School
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
                className="w-full px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-between hover:from-green-100 hover:to-emerald-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="text-green-600">{icon}</div>
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                </div>
                {isOpen ? (
                    <ChevronDown className="text-gray-600" />
                ) : (
                    <ChevronRight className="text-gray-600" />
                )}
            </button>
            {isOpen && <div className="px-6 py-4">{children}</div>}
        </div>
    );
};

export default function DanggeunReportPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                            <Building2 className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            당근마켓 개발문화 & 기술 현황 보고서
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 mb-2">
                        "스스로 주도, 빠른 실험, 투명한 공유" 중심의 하이퍼로컬 플랫폼
                    </p>
                    <p className="text-sm text-gray-500">
                        2015년 창업 이후 대한민국 대표 중고거래 플랫폼에서 지역 생활 커뮤니티로 진화
                    </p>
                </div>

                {/* 핵심 개발 원칙 */}
                <CollapsibleSection title="🎯 핵심 개발 원칙" icon={<Target className="w-6 h-6" />} defaultOpen>
                    <div className="space-y-4">
                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="font-bold text-green-800 mb-2">당근마켓 Engineering Principles</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>• <strong>사용자 중심:</strong> "당신 근처의 당근마켓" - 지역 기반 서비스의 본질에 집중</li>
                                <li>• <strong>빠른 실험:</strong> MVP 접근법, A/B 테스트 문화, 데이터 기반 의사결정</li>
                                <li>• <strong>투명한 공유:</strong> 주간 타운홀, Tech Spec 공개, 실패 사례 공유</li>
                                <li>• <strong>자율과 책임:</strong> 스쿼드 단위 의사결정, OKR 기반 목표 설정</li>
                                <li>• <strong>기술 부채 관리:</strong> Polishing Week, 리팩토링 스프린트</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 기업 문화 & 조직 */}
                <CollapsibleSection title="🏡 기업 문화 & 조직 구조" icon={<Users className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">조직 구조</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>스쿼드 조직:</strong> 제품 중심의 자율적 소규모 팀 (PM, 디자이너, 엔지니어)</li>
                                <li><strong>챕터 & 길드:</strong> 기술 도메인별 전문가 그룹, 지식 공유 네트워크</li>
                                <li><strong>플랫폼 팀:</strong> 공통 인프라, 개발 도구, 내부 서비스 제공</li>
                                <li><strong>데이터 팀:</strong> 분석 인프라, ML 파이프라인, 실험 플랫폼 운영</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">문화 프로그램</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>피플팀 '문화의 날': 솔직하게 충돌하고 함께 즐기는 연례 행사</li>
                                <li>'Cheer Leaders' 워크샵: 리더십 네트워킹 및 협업 강화</li>
                                <li>팀·기술 밋업: 엔지니어 간 지식 공유 세션</li>
                                <li><strong>Tech Talk:</strong> 월간 기술 세미나, 외부 연사 초청</li>
                                <li><strong>Hack Week:</strong> 연 2회 자유 주제 해커톤</li>
                                <li><strong>Study Group:</strong> 자발적 스터디 그룹 지원 (도서, 강의료 지원)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">개발자 성장 지원</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>연간 컨퍼런스 참가비 지원 (국내외)</li>
                                <li>기술 도서 무제한 구매</li>
                                <li>온라인 강의 플랫폼 구독 지원</li>
                                <li>사내 멘토링 프로그램</li>
                                <li>개인 프로젝트 시간 할당 (20% 타임)</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 기술 스택 & 아키텍처 */}
                <CollapsibleSection title="💻 기술 스택 & 아키텍처" icon={<Code className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">프론트엔드</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>웹:</strong> React, Next.js 14, TypeScript, Tailwind CSS, shadcn-ui, Radix UI</li>
                                <li><strong>모바일:</strong> React Native, Swift (iOS), Kotlin (Android)</li>
                                <li><strong>상태관리:</strong> Zustand, Redux Toolkit, React Query</li>
                                <li><strong>테스트:</strong> Jest, React Testing Library, Cypress</li>
                                <li><strong>빌드도구:</strong> Vite, Webpack, Turbo Repo (모노레포)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">백엔드</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>주요 언어:</strong> Go (신규 서비스), Node.js (레거시), Kotlin (Spring Boot)</li>
                                <li><strong>API:</strong> GraphQL (Apollo Server), gRPC (내부 통신), REST</li>
                                <li><strong>마이크로서비스:</strong> 도메인 중심 설계, Event Driven Architecture</li>
                                <li><strong>메시징:</strong> Apache Kafka, RabbitMQ, Redis Pub/Sub</li>
                                <li><strong>검색:</strong> Elasticsearch, OpenSearch</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">데이터 & AI/ML</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>데이터 파이프라인:</strong> Apache Airflow, Spark, Flink</li>
                                <li><strong>ML 프레임워크:</strong> TensorFlow, PyTorch, Scikit-learn</li>
                                <li><strong>ML 플랫폼:</strong> Kubeflow, MLflow, SageMaker</li>
                                <li><strong>추천 시스템:</strong> 사용자 행동 기반 개인화 알고리즘</li>
                                <li><strong>이미지 처리:</strong> 상품 이미지 분류, 부적절한 콘텐츠 필터링</li>
                                <li><strong>자연어 처리:</strong> 검색 품질 개선, 스팸 필터링</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">인프라 & DevOps</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>클라우드:</strong> AWS (메인), GCP (일부 서비스)</li>
                                <li><strong>컨테이너:</strong> Docker, Kubernetes (EKS), Helm</li>
                                <li><strong>CI/CD:</strong> GitHub Actions, ArgoCD, Spinnaker</li>
                                <li><strong>IaC:</strong> Terraform, AWS CDK, Ansible</li>
                                <li><strong>모니터링:</strong> Prometheus, Grafana, Datadog, New Relic</li>
                                <li><strong>로깅:</strong> ELK Stack, Fluentd, CloudWatch</li>
                                <li><strong>보안:</strong> Vault (시크릿 관리), SIEM, WAF</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">데이터베이스</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>RDBMS:</strong> PostgreSQL (메인), MySQL, Amazon Aurora</li>
                                <li><strong>NoSQL:</strong> MongoDB, DynamoDB, Cassandra</li>
                                <li><strong>캐시:</strong> Redis, Memcached</li>
                                <li><strong>데이터 웨어하우스:</strong> Redshift, BigQuery</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 주요 기술 도전과 해결 사례 */}
                <CollapsibleSection title="💡 주요 기술 도전과 해결 사례" icon={<Lightbulb className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <h3 className="font-bold text-blue-800 mb-2">1. 대규모 트래픽 처리</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>피크 시간대 분당 수백만 요청 처리</li>
                                <li>Redis 기반 분산 캐싱 전략</li>
                                <li>CDN 활용한 정적 자원 최적화</li>
                                <li>데이터베이스 샤딩 및 읽기 전용 복제본 활용</li>
                            </ul>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4">
                            <h3 className="font-bold text-purple-800 mb-2">2. 실시간 채팅 시스템</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>WebSocket 기반 실시간 메시징</li>
                                <li>메시지 순서 보장 및 중복 제거</li>
                                <li>오프라인 메시지 큐잉</li>
                                <li>엔드투엔드 암호화 구현</li>
                            </ul>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4">
                            <h3 className="font-bold text-orange-800 mb-2">3. 위치 기반 서비스 최적화</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>PostGIS를 활용한 지리 공간 쿼리</li>
                                <li>Geohash 기반 인덱싱</li>
                                <li>동네 경계 폴리곤 데이터 관리</li>
                                <li>위치 기반 푸시 알림 최적화</li>
                            </ul>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4">
                            <h3 className="font-bold text-green-800 mb-2">4. 이미지 처리 파이프라인</h3>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                                <li>실시간 이미지 리사이징 및 압축</li>
                                <li>WebP 포맷 자동 변환</li>
                                <li>부적절한 이미지 AI 필터링</li>
                                <li>이미지 CDN 및 lazy loading 최적화</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 기술 부채 해소 전략 */}
                <CollapsibleSection title="🔧 기술 부채 해소 전략" icon={<Rocket className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">체계적 접근법</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li><strong>Polishing Week:</strong> 분기별 1주간 기술 부채 집중 해소 기간</li>
                                <li><strong>Tech Debt Board:</strong> 기술 부채 백로그 관리 및 우선순위화</li>
                                <li><strong>20% Rule:</strong> 스프린트의 20%를 기술 부채 해소에 할당</li>
                                <li><strong>Boy Scout Rule:</strong> "코드를 발견했을 때보다 더 깨끗하게"</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">코드 품질 관리</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>P1–P5 코드 리뷰 우선순위 체계</li>
                                <li>자동화된 코드 품질 검사 (SonarQube, CodeClimate)</li>
                                <li>PR 템플릿 및 체크리스트</li>
                                <li>페어 프로그래밍 세션</li>
                                <li>코드 리뷰 문화 (최소 2명 이상 승인)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">문서화 & 지식 관리</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Tech Spec 작성 의무화</li>
                                <li>Architecture Decision Records (ADR)</li>
                                <li>API 문서 자동화 (Swagger/OpenAPI)</li>
                                <li>내부 위키 및 지식 베이스 운영</li>
                                <li>온보딩 문서 및 튜토리얼</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 주요 서비스 & 제품 */}
                <CollapsibleSection title="📱 주요 서비스 & 제품" icon={<Layers className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">중고거래</h3>
                                <p className="text-sm text-gray-600">핵심 서비스, 지역 기반 C2C 마켓플레이스</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">동네생활</h3>
                                <p className="text-sm text-gray-600">지역 커뮤니티, 정보 공유 플랫폼</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">당근알바</h3>
                                <p className="text-sm text-gray-600">지역 기반 구인구직 서비스</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">당근페이</h3>
                                <p className="text-sm text-gray-600">간편 송금 및 결제 서비스</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">부동산 직거래</h3>
                                <p className="text-sm text-gray-600">중개수수료 없는 부동산 거래</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-bold text-gray-800 mb-2">중고차 직거래</h3>
                                <p className="text-sm text-gray-600">개인 간 중고차 거래 플랫폼</p>
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 현재 상황 & 성과 */}
                <CollapsibleSection title="📈 현재 상황 & 성과" icon={<Zap className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">비즈니스 성과</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>2023년 연매출 약 1,276억 원 달성 및 첫 흑자 전환</li>
                                <li>월간 활성 사용자 1,900만 명, 누적 가입자 3,600만 명 돌파</li>
                                <li>월간 거래액 3조원 돌파</li>
                                <li>일평균 게시글 200만 개 이상</li>
                                <li>평균 응답 시간 1시간 이내 (업계 최고 수준)</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">기술적 성과</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>99.9% 이상 서비스 가용성 유지</li>
                                <li>평균 API 응답시간 100ms 이하</li>
                                <li>모바일 앱 크래시율 0.1% 이하</li>
                                <li>자동화된 배포 파이프라인 (일 평균 50회 이상 배포)</li>
                                <li>마이크로서비스 100개 이상 운영</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">조직 성장</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>전체 직원 수 1,000명 이상</li>
                                <li>엔지니어링 팀 300명 이상</li>
                                <li>글로벌 진출: 일본, 캐나다, 영국, 미국</li>
                                <li>개발자 만족도 90% 이상 (내부 서베이)</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 오픈소스 기여 */}
                <CollapsibleSection title="🌐 오픈소스 기여" icon={<GitBranch className="w-6 h-6" />}>
                    <div className="space-y-2">
                        <p className="text-gray-700 mb-3">당근마켓은 오픈소스 생태계에 적극적으로 기여하고 있습니다.</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            <li><strong>karrot-flex:</strong> React Native 플렉스박스 레이아웃 라이브러리</li>
                            <li><strong>karrot-backend-libraries:</strong> Go 기반 백엔드 유틸리티</li>
                            <li><strong>react-native-image-modal:</strong> 이미지 모달 컴포넌트</li>
                            <li>다양한 오픈소스 프로젝트에 패치 및 기능 기여</li>
                            <li>기술 블로그를 통한 노하우 공유</li>
                        </ul>
                        <div className="mt-3">
                            <a href="https://github.com/daangn" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                GitHub: github.com/daangn
                            </a>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 채용 & 개발자 경험 */}
                <CollapsibleSection title="🎓 채용 & 개발자 경험" icon={<School className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">채용 프로세스</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>서류 전형 → 직무 인터뷰 → 컬처핏 인터뷰 → 최종 합격</li>
                                <li>실무 중심 기술 면접 (라이브 코딩, 시스템 디자인)</li>
                                <li>평균 2-3주 내 채용 프로세스 완료</li>
                                <li>투명한 피드백 제공</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">복지 & 혜택</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>유연 근무제 (자율 출퇴근, 재택근무)</li>
                                <li>최신 장비 지원 (맥북 프로, 모니터 등)</li>
                                <li>종합 건강검진 및 의료비 지원</li>
                                <li>점심/저녁 식대 지원</li>
                                <li>자기계발비 연 200만원</li>
                                <li>리프레시 휴가 및 안식월 제도</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 미래 전망 & 도전 과제 */}
                <CollapsibleSection title="🚀 미래 전망 & 도전 과제" icon={<Rocket className="w-6 h-6" />}>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">기술적 로드맵</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>AI/ML 고도화: 개인화 추천, 자동 가격 책정</li>
                                <li>블록체인 기술 검토: 거래 신뢰성 강화</li>
                                <li>AR 기능 도입: 가상 상품 미리보기</li>
                                <li>실시간 영상 거래 플랫폼</li>
                                <li>글로벌 확장을 위한 다국어 지원 강화</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2">도전 과제</h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>급속한 성장에 따른 기술 부채 관리</li>
                                <li>다양한 서비스 간 일관된 사용자 경험 제공</li>
                                <li>글로벌 시장별 현지화 전략</li>
                                <li>규제 환경 변화 대응 (금융, 개인정보보호)</li>
                                <li>경쟁사 대비 기술 우위 유지</li>
                            </ul>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 참고 자료 및 출처 */}
                <CollapsibleSection title="📚 참고 자료 및 출처" icon={<BookOpen className="w-6 h-6" />}>
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-800">공식 채널</h3>
                            <a href="https://about.daangn.com/culture/" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 당근 팀문화 공식 페이지
                            </a>
                            <a href="https://medium.com/daangn" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 당근마켓 엔지니어링 블로그
                            </a>
                            <a href="https://www.youtube.com/c/DaangnTech" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 당근마켓 Tech 유튜브 채널
                            </a>
                            <a href="https://github.com/daangn" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 당근마켓 GitHub
                            </a>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-800">기술 블로그 주요 아티클</h3>
                            <p className="text-sm text-gray-600">• 당근마켓의 마이크로서비스 여정</p>
                            <p className="text-sm text-gray-600">• PostgreSQL 샤딩 전략</p>
                            <p className="text-sm text-gray-600">• React Native 성능 최적화 사례</p>
                            <p className="text-sm text-gray-600">• 실시간 채팅 시스템 구축기</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-gray-800">채용 정보</h3>
                            <a href="https://about.daangn.com/jobs/" className="block text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                • 당근마켓 채용 페이지
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
                        출처: 당근마켓 공식 블로그, 기술 블로그, 유튜브, GitHub, 채용 페이지 및 언론 보도
                    </p>
                </div>
            </div>
        </div>
    );
}