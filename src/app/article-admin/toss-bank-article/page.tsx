'use client';
import React, { useState } from 'react';
import { Code, GitBranch, Zap, Users, Layers, Database, Cloud, Cpu, Terminal, Rocket, Target, Building2, ExternalLink, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

// CollapsibleSection 컴포넌트 정의
type CollapsibleSectionProps = {
    title: React.ReactNode;
    icon: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean;
};

const CollapsibleSection = ({ title, icon, children, defaultOpen = false }: CollapsibleSectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {icon}
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>
            {isOpen && (
                <div className="px-6 py-4 border-t border-gray-100">
                    {children}
                </div>
            )}
        </div>
    );
};

const TechBadge = ({ title, desc, color }) => (
    <div className={`${color} p-4 rounded-lg`}>
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-xs opacity-80">{desc}</p>
    </div>
);

const ReferenceLink = ({ title, url, description }) => (
    <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start gap-3">
            <ExternalLink className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
            <div>
                <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
                <p className="text-sm text-gray-600 mb-2">{description}</p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-800 underline break-all"
                >
                    {url}
                </a>
            </div>
        </div>
    </div>
);

const TossReportPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                            <Building2 className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            토스 개발문화 & 기술 혁신 보고서
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        개개인의 역량을 극대화하는 수평적 조직과 최첨단 개발 기술의 완벽한 조화
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white p-6">
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold">11년</div>
                            <div className="text-sm opacity-80">창업 후 첫 흑자</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">1,910만</div>
                            <div className="text-sm opacity-80">월간 활성 사용자</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">170배</div>
                            <div className="text-sm opacity-80">거래 성능 개선</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold">무중단</div>
                            <div className="text-sm opacity-80">MSA 전환 완료</div>
                        </div>
                    </div>
                </div>

                {/* 개발 기술 혁신 */}
                <CollapsibleSection
                    title="최신 개발 기술 스택 & 아키텍처"
                    icon={<Code className="w-6 h-6" />}
                    defaultOpen={true}
                >
                    <div className="space-y-6">
                        {/* MSA 아키텍처 */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <Layers className="w-5 h-5 text-green-600" />
                                <h3 className="text-lg font-bold text-green-800">마이크로서비스 아키텍처 (MSA)</h3>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <TechBadge
                                    title="도메인 분리"
                                    desc="모놀리식 → 도메인별 독립 서비스"
                                    color="bg-green-100 text-green-800"
                                />
                                <TechBadge
                                    title="API First"
                                    desc="RESTful API 기반 느슨한 결합"
                                    color="bg-green-100 text-green-800"
                                />
                                <TechBadge
                                    title="오픈소스 기반"
                                    desc="Kubernetes, Docker 컨테이너화"
                                    color="bg-green-100 text-green-800"
                                />
                            </div>
                        </div>

                        {/* 배포 기술 */}
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <GitBranch className="w-5 h-5 text-blue-600" />
                                <h3 className="text-lg font-bold text-blue-800">무중단 배포 & CI/CD</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-blue-700 mb-3">롤링 배포 전략</h4>
                                    <div className="space-y-2">
                                        <div className="bg-blue-100 p-3 rounded text-sm">
                                            <strong>1단계:</strong> 내부 팀원 먼저 배포
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded text-sm">
                                            <strong>2단계:</strong> 일부 고객 대상 카나리 배포
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded text-sm">
                                            <strong>3단계:</strong> 전체 고객 점진적 확산
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-700 mb-3">자동화 파이프라인</h4>
                                    <div className="space-y-2 text-sm text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <Terminal className="w-4 h-4" />
                                            <span>Git 커밋 → 자동 빌드 & 테스트</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Cloud className="w-4 h-4" />
                                            <span>컨테이너 이미지 자동 생성</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Rocket className="w-4 h-4" />
                                            <span>단계별 자동 배포</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 개발 도구 & 프로세스 */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h4 className="font-bold text-purple-800 mb-3">개발 도구 & 라이브러리</h4>
                                <ul className="space-y-1 text-sm text-gray-700">
                                    <li>• <strong>TDS</strong> (Toss Design System) - 통일된 UI 컴포넌트</li>
                                    <li>• <strong>React</strong> + TypeScript 기반 프론트엔드</li>
                                    <li>• <strong>Spring Boot</strong> 마이크로서비스</li>
                                    <li>• <strong>Slack API</strong> 통합 협업 환경</li>
                                </ul>
                            </div>
                            <div className="bg-orange-50 p-4 rounded-lg">
                                <h4 className="font-bold text-orange-800 mb-3">품질 관리 프로세스</h4>
                                <ul className="space-y-1 text-sm text-gray-700">
                                    <li>• <strong>필수 코드 리뷰</strong> - 모든 커밋 검토</li>
                                    <li>• <strong>페어 프로그래밍</strong> - 실시간 협업 개발</li>
                                    <li>• <strong>자동화 테스트</strong> - Unit/Integration 테스트</li>
                                    <li>• <strong>"똥 자랑 대회"</strong> - 실패 공유 문화</li>
                                </ul>
                            </div>
                        </div>

                        {/* 성능 개선 결과 */}
                        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                            <h4 className="font-bold text-yellow-800 mb-3">기술적 성과</h4>
                            <div className="grid md:grid-cols-3 gap-4 text-center">
                                <div className="bg-yellow-100 p-3 rounded">
                                    <div className="text-xl font-bold text-yellow-800">170배</div>
                                    <div className="text-xs text-yellow-600">특정 거래 성능 개선</div>
                                </div>
                                <div className="bg-orange-100 p-3 rounded">
                                    <div className="text-xl font-bold text-orange-800">100%</div>
                                    <div className="text-xs text-orange-600">무중단 서비스 전환</div>
                                </div>
                                <div className="bg-red-100 p-3 rounded">
                                    <div className="text-xl font-bold text-red-800">4주</div>
                                    <div className="text-xs text-red-600">스프린트 사이클</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 수평적 조직의 혁신 */}
                <CollapsibleSection
                    title="개인 역량 극대화를 위한 조직 혁신"
                    icon={<Users className="w-6 h-6" />}
                >
                    <div className="space-y-6">
                        {/* 실로 시스템 */}
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <Target className="w-5 h-5 text-indigo-600" />
                                <h3 className="text-lg font-bold text-indigo-800">실로(Silo) = 미니 스타트업</h3>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-indigo-100 p-4 rounded-lg">
                                    <h4 className="font-semibold text-indigo-800">4-8명 팀</h4>
                                    <p className="text-sm text-indigo-600">완전한 자율권을 가진 미니 스타트업</p>
                                </div>
                                <div className="bg-indigo-100 p-4 rounded-lg">
                                    <h4 className="font-semibold text-indigo-800">미니 CEO</h4>
                                    <p className="text-sm text-indigo-600">Product Owner가 모든 결정권 보유</p>
                                </div>
                                <div className="bg-indigo-100 p-4 rounded-lg">
                                    <h4 className="font-semibold text-indigo-800">크로스펑셔널</h4>
                                    <p className="text-sm text-indigo-600">개발자, 디자이너, PM 통합팀</p>
                                </div>
                            </div>
                        </div>

                        {/* DRI 시스템 */}
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-emerald-800 mb-4">DRI (Directly Responsible Individual) 시스템</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-emerald-700 mb-3">기존 조직 vs 토스</h4>
                                    <div className="space-y-2">
                                        <div className="bg-red-100 p-3 rounded text-sm">
                                            <strong>기존:</strong> 상급자 승인 → 결재 라인 → 느린 결정
                                        </div>
                                        <div className="bg-green-100 p-3 rounded text-sm">
                                            <strong>토스:</strong> 담당자 직접 결정 → 즉시 실행
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-emerald-700 mb-3">권한과 책임</h4>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>• 직급, 경험과 무관한 의사결정권</li>
                                        <li>• 해당 영역의 모든 책임 부여</li>
                                        <li>• 빠른 실행과 빠른 피드백</li>
                                        <li>• 개인 역량에 따른 권한 확대</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 완전한 정보 투명성 */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-purple-800 mb-4">완전한 정보 투명성</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-purple-700 mb-3">주간 타운홀 미팅</h4>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>• 재무 현황 실시간 공유</li>
                                        <li>• 투자 상황 및 전략 공개</li>
                                        <li>• 자회사별 실적 투명 공개</li>
                                        <li>• CEO와 직접 소통</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-purple-700 mb-3">혁신적 신뢰 문화</h4>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>• 법인카드 영수증 제출 불필요</li>
                                        <li>• 완전한 위임(delegation)</li>
                                        <li>• "업무 외에는 신경 쓰지 마세요"</li>
                                        <li>• 결과로만 평가하는 문화</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 개발팀 협업 혁신 */}
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">개발팀 협업 혁신</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-700 mb-2">10분 내 답변</h4>
                                    <p className="text-sm text-gray-600">Slack에서 질문 시 10개 이상 답변</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-700 mb-2">실시간 코드 리뷰</h4>
                                    <p className="text-sm text-gray-600">모든 코드 변경 실시간 검토</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-700 mb-2">Tech Talks</h4>
                                    <p className="text-sm text-gray-600">정기적 기술 지식 공유</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 4주 스프린트 프로세스 */}
                <CollapsibleSection
                    title="애자일 개발 프로세스 & 실행력"
                    icon={<Zap className="w-6 h-6" />}
                >
                    <div className="space-y-6">
                        {/* 스프린트 사이클 */}
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-cyan-800 mb-4">4주 스프린트 = 빠른 실행력</h3>
                            <div className="grid md:grid-cols-4 gap-4">
                                <div className="bg-red-100 p-4 rounded-lg text-center">
                                    <div className="font-bold text-red-800">1주차</div>
                                    <div className="text-sm text-red-600 mt-2">문제 정의<br />솔루션 설계</div>
                                </div>
                                <div className="bg-yellow-100 p-4 rounded-lg text-center">
                                    <div className="font-bold text-yellow-800">2-3주차</div>
                                    <div className="text-sm text-yellow-600 mt-2">집중 개발<br />빠른 반복</div>
                                </div>
                                <div className="bg-blue-100 p-4 rounded-lg text-center">
                                    <div className="font-bold text-blue-800">4주차</div>
                                    <div className="text-sm text-blue-600 mt-2">QA & 테스트<br />최종 검증</div>
                                </div>
                                <div className="bg-green-100 p-4 rounded-lg text-center">
                                    <div className="font-bold text-green-800">5주차</div>
                                    <div className="text-sm text-green-600 mt-2">런칭 또는<br />피벗 결정</div>
                                </div>
                            </div>
                        </div>

                        {/* 성과 지표 */}
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-indigo-800 mb-4">혁신의 결과</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-indigo-700 mb-3">기술적 성과</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between bg-indigo-100 p-3 rounded">
                                            <span className="text-sm font-medium">거래 성능</span>
                                            <span className="text-sm font-bold text-indigo-800">170배 개선</span>
                                        </div>
                                        <div className="flex justify-between bg-indigo-100 p-3 rounded">
                                            <span className="text-sm font-medium">시스템 전환</span>
                                            <span className="text-sm font-bold text-indigo-800">무중단 완료</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-indigo-700 mb-3">비즈니스 성과</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between bg-purple-100 p-3 rounded">
                                            <span className="text-sm font-medium">첫 연간 흑자</span>
                                            <span className="text-sm font-bold text-purple-800">213억원</span>
                                        </div>
                                        <div className="flex justify-between bg-purple-100 p-3 rounded">
                                            <span className="text-sm font-medium">활성 사용자</span>
                                            <span className="text-sm font-bold text-purple-800">1,910만명</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 참고 자료 */}
                <CollapsibleSection
                    title="참고 자료 및 출처"
                    icon={<BookOpen className="w-6 h-6" />}
                >
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 mb-4">
                            본 보고서는 다음 기사, 인터뷰, 기술 블로그를 종합 분석하여 작성되었습니다.
                        </p>

                        <div className="grid gap-4">
                            <ReferenceLink
                                title="토스 문화 에반젤리스트 인터뷰"
                                url="https://toss.im/tossfeed/article/culture-evangelist-interview"
                                description="토스의 기업문화와 조직 운영 철학에 대한 공식 인터뷰"
                            />

                            <ReferenceLink
                                title="토스뱅크 MSA 전환 기술 블로그"
                                url="https://haon.blog/article/toss-slash/core-banking-msa/msa-conversion"
                                description="토스뱅크의 마이크로서비스 아키텍처 전환 과정과 기술적 성과"
                            />

                            <ReferenceLink
                                title="토스뱅크 개발문화 LinkedIn 포스트"
                                url="https://kr.linkedin.com/posts/donghyunpark_토스뱅크-toss-tossbank-activity-6883410354894983168--WIY"
                                description="토스뱅크 개발팀의 협업 문화와 업무 방식 소개"
                            />

                            <ReferenceLink
                                title="토스 핵심 가치 - 토스피드"
                                url="https://blog.toss.im/article/toss-core-values"
                                description="토스의 8가지 핵심 가치와 실천 방안"
                            />

                            <ReferenceLink
                                title="토스 팀 문화 소개 - 토스피드"
                                url="https://blog.toss.im/article/toss-team-culture"
                                description="입사 첫 날 만나는 토스 문화 소개 문서"
                            />

                            <ReferenceLink
                                title="토스 조직문화 실험 - 플래텀"
                                url="https://platum.kr/archives/113582"
                                description="밀레니얼 세대를 위한 토스의 혁신적 조직 문화 실험"
                            />

                            <ReferenceLink
                                title="토스 Slack 협업 문화 사례"
                                url="https://slack.com/intl/ko-kr/customer-stories/toss-story"
                                description="Slack을 통해 완성되는 토스의 조직 문화"
                            />

                            <ReferenceLink
                                title="토스 개발자 회고 - 성장과 리더십"
                                url="https://evan-moon.github.io/2022/05/07/toss-retrospective/"
                                description="토스에서 일하며 깨달은 성장과 리더십에 대한 개발자 회고"
                            />

                            <ReferenceLink
                                title="토스 프론트엔드 챕터 기술 블로그"
                                url="https://tosspayments-dev.oopy.io/cc9367e4-4ff6-4241-8189-9f3cf250f5d2"
                                description="토스 프론트엔드 챕터의 개발 문화와 기술 스택"
                            />

                            <ReferenceLink
                                title="토스 2024년 3분기 실적 발표 - 토스피드"
                                url="https://blog.toss.im/article/2024-3Q"
                                description="토스 3분기 연결 영업수익 5,021억원 달성 공식 발표"
                            />

                            <ReferenceLink
                                title="토스뱅크 첫 흑자 달성 - KoreaTechDesk"
                                url="https://www.koreatechdesk.com/toss-bank-achieves-first-ever-profit-in-2024-paving-the-way-for-global-expansion/"
                                description="토스뱅크 2024년 첫 흑자 달성과 글로벌 확장 계획"
                            />

                            <ReferenceLink
                                title="토스 문화의 정체성 - 디지털조선일보"
                                url="https://digitalchosun.dizzo.com/site/data/html_dir/2023/02/23/2023022380167.html"
                                description="토스의 자율과 책임 기반 기업문화 분석"
                            />

                            <ReferenceLink
                                title="토스 직원들의 솔직한 후기 - 블로터"
                                url="https://www.bloter.net/news/articleView.html?idxno=39858"
                                description="토스 직원들의 워라밸과 업무 문화에 대한 솔직한 평가"
                            />

                            <ReferenceLink
                                title="토스 성장 원동력 분석 - 한국경제"
                                url="https://www.hankyung.com/economy/article/2022020270501"
                                description="토스의 혁신조직과 성장 동력 분석"
                            />

                            <ReferenceLink
                                title="토스 IPO 계획 - KED Global"
                                url="https://www.kedglobal.com/ipos/newsView/ked202410290017"
                                description="토스의 미국 IPO 계획과 한국 상장 계획 변경"
                            />
                        </div>
                    </div>
                </CollapsibleSection>

                {/* 결론 */}
                <div className="mt-8 bg-gradient-to-r from-gray-800 to-blue-900 rounded-lg text-white p-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <Cpu className="w-6 h-6" />
                        토스의 혁신 공식: 기술 × 조직 × 실행력
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 text-sm">
                        <div>
                            <h3 className="font-bold mb-2">최첨단 기술</h3>
                            <p className="text-gray-300">MSA, 무중단 배포, 자동화로 170배 성능 개선</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">수평적 조직</h3>
                            <p className="text-gray-300">DRI 시스템으로 개인 역량을 극대화</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">빠른 실행</h3>
                            <p className="text-gray-300">4주 스프린트로 아이디어를 즉시 현실화</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>본 보고서는 2024년 12월 기준 공개된 자료를 바탕으로 작성되었습니다.</p>
                    <p className="mt-1">모든 참고 자료는 위의 "참고 자료 및 출처" 섹션에서 확인하실 수 있습니다.</p>
                </div>
            </div>
        </div>
    );
};

export default TossReportPage;