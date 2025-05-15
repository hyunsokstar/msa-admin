import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  Zap, 
  BarChart2, 
  GitMerge,
  GitBranch,
  Clock,
  Repeat,
  Share2,
  PieChart,
  MessageSquare,
  Code,
  AlertCircle,
  Check,
  Award
} from 'lucide-react';

const TechAdoptionStrategies = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>최신 스택 적용과 팀 역량 현실화 전략</CardTitle>
          <CardDescription>
            GraphQL과 같은 첨단 기술을 도입하고 팀 전체가 효과적으로 활용하기 위한 실용적 접근법
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="adoption" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="adoption">기술 도입 전략</TabsTrigger>
              <TabsTrigger value="learning">지식 공유 문화</TabsTrigger>
              <TabsTrigger value="monitoring">모니터링 & 피드백</TabsTrigger>
              <TabsTrigger value="collaboration">협업 실천 방안</TabsTrigger>
            </TabsList>

            <TabsContent value="adoption" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">우아한 아키텍처를 현실화하는 전략</h3>
                <p className="text-sm text-gray-600 mb-4">
                  GraphQL과 같은 최신 기술 스택은 많은 장점을 제공하지만, 성공적인 도입을 위해서는 단계적이고 
                  체계적인 접근이 필요합니다. 팀 역량과 비즈니스 요구사항에 맞춘 현실적인 도입 전략을 살펴봅니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <StrategyCard 
                    title="단계적 도입 (Phased Adoption)"
                    description="전체 시스템을 한 번에 바꾸는 대신, 점진적으로 새로운 기술을 도입하는 접근법"
                    steps={[
                      "1단계: PoC(개념 증명) - 비핵심 기능에 GraphQL 적용",
                      "2단계: 확장 - 일부 주요 기능 마이그레이션",
                      "3단계: 최적화 - 성능 및 구조 개선",
                      "4단계: 표준화 - 전체 시스템 표준으로 확립"
                    ]}
                    icon={<GitBranch size={24} className="text-blue-600" />}
                  />
                  
                  <StrategyCard 
                    title="역량 기반 접근 (Capability-based Approach)"
                    description="팀의 현재 기술 역량을 고려한 현실적인 도입 계획 수립"
                    steps={[
                      "기초 역량 평가 - 프로그래밍, 시스템 이해도 진단",
                      "학습 로드맵 설계 - 필요 지식과 기술 식별",
                      "성과 지표 설정 - 진행 상황 측정 방법 정의",
                      "멘토링 체계 구축 - 지식 전파 경로 확립"
                    ]}
                    icon={<Users size={24} className="text-purple-600" />}
                  />
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
                  <h4 className="text-md font-semibold flex items-center mb-2">
                    <AlertCircle size={18} className="text-amber-600 mr-2" />
                    도입 시 주의해야 할 함정
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PitfallCard 
                      title="신기술 집착 (Shiny Object Syndrome)"
                      description="최신 기술의 장점만 보고 팀 역량과 프로젝트 요구사항을 충분히 고려하지 않는 오류"
                      solutions={[
                        "기술 선택에 비즈니스 가치 중심 기준 적용",
                        "팀 역량과 학습 곡선 현실적 평가",
                        "ROI(투자수익률) 분석 수행"
                      ]}
                    />
                    <PitfallCard 
                      title="과도한 설계 (Over-engineering)"
                      description="필요 이상으로 복잡한 아키텍처를 구축하여 유지보수와 이해도를 어렵게 만드는 문제"
                      solutions={[
                        "MVP(최소 기능 제품) 접근법 활용",
                        "점진적 복잡성 증가 전략 채택",
                        "주기적 아키텍처 검토 및 간소화"
                      ]}
                    />
                  </div>
                </div>
                
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">효과적인 지식 공유 문화 구축</h3>
              <p className="text-sm text-gray-600 mb-4">
                새로운 기술 스택을 도입할 때 가장 중요한 것은 팀 전체가 함께 성장할 수 있는 학습 문화입니다.
                지식이 특정 개발자에게 고립되지 않고 전체 팀에 효과적으로 전파되는 방법을 살펴봅니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <LearningCultureCard 
                  title="정기적 지식 공유 세션"
                  description="팀 내에서 정기적으로 기술 지식을 공유하는 문화 확립"
                  practices={[
                    {
                      name: "주간 Tech Talk",
                      details: "30분 길이의 짧은 발표, 한 가지 개념이나 문제 해결 사례에 집중"
                    },
                    {
                      name: "월간 심층 워크숍",
                      details: "2-3시간 실습 중심의 심층 주제 학습, 팀 전체 참여"
                    },
                    {
                      name: "라이트닝 토크",
                      details: "5분 길이의 초간단 발표, 새로운 발견이나 팁 공유"
                    }
                  ]}
                  icon={<Share2 size={24} className="text-blue-600" />}
                />
                
                <LearningCultureCard 
                  title="체계적 문서화"
                  description="학습 내용과 문제 해결 과정을 체계적으로 기록하고 공유"
                  practices={[
                    {
                      name: "레시피 문서",
                      details: "문제-원인-해결-배운점 형식의 표준화된 문서 템플릿"
                    },
                    {
                      name: "코드 예제 라이브러리",
                      details: "실제 프로젝트에서 사용된 패턴과 예제 코드 모음"
                    },
                    {
                      name: "아키텍처 결정 기록(ADR)",
                      details: "주요 기술적 결정의 이유와 대안, 영향을 기록"
                    }
                  ]}
                  icon={<BookOpen size={24} className="text-green-600" />}
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <Zap size={18} className="text-blue-600 mr-2" />
                  GraphQL 특화 학습 전략
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Check size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">스키마 설계 워크숍:</span> 팀 전체가 참여하여 주요 도메인 엔티티의 GraphQL 스키마를 함께 설계하는 세션
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">리졸버 패턴 가이드:</span> 공통 리졸버 패턴과 N+1 문제 해결 방법 등을 정리한 가이드북 제작
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">쿼리 최적화 챌린지:</span> 실제 성능 문제가 있는 GraphQL 쿼리를 최적화하는 팀 챌린지
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium">API 소비자 관점 실습:</span> 프론트엔드 개발자 입장에서 GraphQL API를 사용하는 경험 공유
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <ResourceCard 
                  title="팀 내 GraphQL 학습 로드맵 예시"
                  content={
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm">
                      <div className="bg-gray-50 p-3 rounded border">
                        <h6 className="font-medium text-blue-700 mb-2">1단계: 기초</h6>
                        <ul className="space-y-1">
                          <li>• GraphQL 개념과 철학</li>
                          <li>• 쿼리, 뮤테이션, 구독 기본</li>
                          <li>• 스키마 정의 언어(SDL)</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border">
                        <h6 className="font-medium text-blue-700 mb-2">2단계: 실무 적용</h6>
                        <ul className="space-y-1">
                          <li>• 리졸버 구현 및 최적화</li>
                          <li>• N+1 문제 해결 전략</li>
                          <li>• 에러 처리 및 보안</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border">
                        <h6 className="font-medium text-blue-700 mb-2">3단계: 아키텍처</h6>
                        <ul className="space-y-1">
                          <li>• 스키마 설계 모범 사례</li>
                          <li>• 마이크로서비스 통합</li>
                          <li>• 코드 생성 및 타입 안전성</li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border">
                        <h6 className="font-medium text-blue-700 mb-2">4단계: 고급</h6>
                        <ul className="space-y-1">
                          <li>• Federation 아키텍처</li>
                          <li>• 실시간 데이터 처리</li>
                          <li>• 성능 모니터링 및 최적화</li>
                        </ul>
                      </div>
                    </div>
                  }
                />
                
                <ResourceCard 
                  title="실천 가능한 학습 활동 계획"
                  content={
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <span className="font-medium bg-blue-100 text-blue-800 px-2 rounded mr-2 whitespace-nowrap">매주 금요일</span>
                        <span>"Tech Share" 데이: 한 달간 겪은 문제·해결책을 30분씩 발표</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium bg-green-100 text-green-800 px-2 rounded mr-2 whitespace-nowrap">격주 화요일</span>
                        <span>특정 GraphQL 주제에 대한 2시간 실습 세션 (예: "이번 주는 DataLoader 완전 정복")</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium bg-purple-100 text-purple-800 px-2 rounded mr-2 whitespace-nowrap">매월 첫째 주</span>
                        <span>기술 스터디 & 챌린지: 예를 들어 "React Suspense 이해하기", "Redis Streams PoC"</span>
                      </div>
                      <div className="flex items-start">
                        <span className="font-medium bg-amber-100 text-amber-800 px-2 rounded mr-2 whitespace-nowrap">매일 15분</span>
                        <span>"Today I Learned" 짧은 기록 작성 및 팀 채널 공유</span>
                      </div>
                    </div>
                  }
                />
              </div>
            </TabsContent>
            
            <TabsContent value="monitoring" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">업무 모니터링과 피드백 루프</h3>
              <p className="text-sm text-gray-600 mb-4">
                새로운 기술 도입의 성공을 위해서는 지속적인 모니터링과 피드백이 필수적입니다. 
                GraphQL과 같은 최신 기술을 적용하면서 성과를 측정하고 개선점을 찾는 방법을 살펴봅니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <MonitoringCard 
                  title="실시간 성능 모니터링"
                  description="GraphQL API의 성능과 사용 패턴을 실시간으로 추적"
                  metrics={[
                    {
                      name: "쿼리 복잡성 지표",
                      details: "필드 깊이, 요청 노드 수 등 쿼리 복잡성 측정"
                    },
                    {
                      name: "리졸버 성능 추적",
                      details: "개별 리졸버의 실행 시간 및 데이터베이스 쿼리 수 모니터링"
                    },
                    {
                      name: "클라이언트별 사용 패턴",
                      details: "각 클라이언트가 요청하는 필드와 패턴 분석"
                    }
                  ]}
                  tools={["Apollo Studio", "GraphQL Metrics", "Prometheus + Grafana"]}
                  icon={<BarChart2 size={24} className="text-blue-600" />}
                />
                
                <MonitoringCard 
                  title="정기적 회고와 개선"
                  description="도입 과정과 결과를 주기적으로 검토하고 개선점 도출"
                  metrics={[
                    {
                      name: "기술 부채 측정",
                      details: "코드 품질, 테스트 커버리지, 문서화 수준 등 평가"
                    },
                    {
                      name: "개발자 경험 피드백",
                      details: "API 사용성, 도구 효율성에 대한 정기적 피드백"
                    },
                    {
                      name: "비즈니스 성과 지표",
                      details: "개발 속도, 기능 출시 주기, 버그 발생률 등 측정"
                    }
                  ]}
                  tools={["Sprint 회고", "기술 부채 대시보드", "개발자 경험 설문"]}
                  icon={<Repeat size={24} className="text-green-600" />}
                />
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <PieChart size={18} className="text-green-600 mr-2" />
                  GraphQL 도입 성과 측정 지표
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MetricCard 
                    category="개발 생산성"
                    metrics={[
                      "API 변경 요청 처리 시간 단축률",
                      "프론트엔드 개발 주기 단축률",
                      "코드 재사용성 향상도"
                    ]}
                  />
                  <MetricCard 
                    category="시스템 성능"
                    metrics={[
                      "네트워크 요청 감소율",
                      "전송 데이터량 최적화율",
                      "Query 응답 시간 개선율"
                    ]}
                  />
                  <MetricCard 
                    category="팀 역량"
                    metrics={[
                      "GraphQL 지식 습득 진행률",
                      "기술 버전 최신화 달성률",
                      "코드 품질 지표 향상률"
                    ]}
                  />
                </div>
              </div>
              
              <h4 className="text-md font-medium mb-2">자동화된 피드백 시스템 구축</h4>
              <p className="text-sm text-gray-600 mb-4">
                팀의 지속적인 개선을 위한 자동화된 피드백 시스템을 구축하는 방법입니다.
              </p>
              
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">자동화 피드백 구현 예시</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded border">
                    <h6 className="font-medium text-purple-700 mb-2">CI/CD 파이프라인 연동</h6>
                    <ul className="space-y-1">
                      <li>• 빌드 오류나 테스트 실패 시 Slack 알림</li>
                      <li>• 코드 커버리지 하락 시 PR에 자동 코멘트</li>
                      <li>• 스키마 변경 시 영향 받는 쿼리 자동 분석</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-3 rounded border">
                    <h6 className="font-medium text-purple-700 mb-2">실시간 대시보드</h6>
                    <ul className="space-y-1">
                      <li>• 팀 공간에 실시간 성능 지표 디스플레이</li>
                      <li>• 에러율, 응답시간 임계치 초과 시 알림</li>
                      <li>• 주간/월간 트렌드 자동 리포트 생성</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="collaboration" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">효과적인 협업 실천 방안</h3>
              <p className="text-sm text-gray-600 mb-4">
                GraphQL과 같은 복잡한 기술을 팀 전체가 효과적으로 활용하기 위해서는 
                강력한 협업 문화와 실천 방안이 필요합니다. 팀워크를 강화하고 기술 격차를 좁히는 방법을 살펴봅니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <CollaborationCard 
                  title="페어/모브 프로그래밍"
                  description="복잡한 문제를 함께 풀어나가는 협업 프로그래밍 방식"
                  practices={[
                    "주 2회 페어 프로그래밍 세션 정례화",
                    "복잡한 GraphQL 스키마 설계 시 모브 프로그래밍 활용",
                    "경험 많은 개발자와 주니어 개발자 교차 페어링",
                    "페어 로테이션을 통한 지식 확산"
                  ]}
                  benefits="기술 격차 감소, 코드 품질 향상, 암묵지 공유"
                  icon={<Users size={24} className="text-blue-600" />}
                />
                
                <CollaborationCard 
                  title="아키텍처 거버넌스"
                  description="기술적 의사결정을 체계적으로 관리하고 공유하는 방법"
                  practices={[
                    "2-3명의 아키텍처 워킹 그룹 구성",
                    "주요 설계 결정을 ADR(Architecture Decision Records)로 문서화",
                    "격주 아키텍처 리뷰 세션 운영",
                    "설계 가이드라인 및 패턴 카탈로그 유지"
                  ]}
                  benefits="일관된 아키텍처 방향성, 의사결정 투명성, 지식 공유"
                  icon={<GitMerge size={24} className="text-purple-600" />}
                />
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <MessageSquare size={18} className="text-purple-600 mr-2" />
                  효과적인 커뮤니케이션 전략
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-700 mb-1">기술적 의사소통 구조화</h5>
                    <p>복잡한 GraphQL 개념과 구현 세부사항을 명확하게 전달하기 위한 구조화된 커뮤니케이션 방식:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• 문제 설명 → 관련 개념 → 구현 옵션 → 추천안 → 근거 순으로 논의</li>
                      <li>• 다이어그램과 시각 자료 활용 (특히 스키마 관계 표현 시)</li>
                      <li>• 코드 예제와 함께 설명하여 이해도 향상</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-700 mb-1">다중 채널 활용</h5>
                    <p>다양한 커뮤니케이션 채널을 목적에 맞게 활용하여 지식 공유 효율 증대:</p>
                    <ul className="mt-1 space-y-1">
                      <li>• 동기식: 페어 프로그래밍, 모브 세션, 실시간 코드 리뷰</li>
                      <li>• 비동기식: 문서화된 가이드, 코드 주석, PR 설명</li>
                      <li>• 혼합: 기록이 남는 디지털 화이트보드 세션, 녹화된 지식 공유</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h4 className="text-md font-medium mb-2">팀 문화 구축 사례</h4>
              <p className="text-sm text-gray-600 mb-4">
                GraphQL을 성공적으로 도입한 팀들이 어떻게 협업 문화를 구축했는지 살펴봅니다.
              </p>
              
              <div className="space-y-4">
                <TeamCultureCard 
                  company="국내 대형 전자상거래 기업"
                  practices={[
                    "GraphQL 길드(Guild) 운영: 부서 간 GraphQL 전문가 모임",
                    "월간 GraphQL 오픈 스페이스: 자유로운 문제 해결 세션",
                    "도메인별 스키마 책임제: 각 도메인 팀이 스키마 일부 소유",
                    "내부 GraphQL 컨퍼런스: 분기별 성과와 학습 공유"
                  ]}
                  outcomes="18개월 내 15개 마이크로서비스를 Federation으로 통합, 개발자 만족도 67% 증가"
                />
                
                <TeamCultureCard 
                  company="해외 SaaS 기업 국내 지사"
                  practices={[
                    "T자형 인재 육성: 모든 개발자가 최소 하나의 GraphQL 전문 영역 보유",
                    "학습 바우처 제도: GraphQL 관련 교육에 분기별 예산 할당",
                    "사내 멘토링 시스템: 주니어-시니어 개발자 1:1 멘토링",
                    "기술 도입 로드맵 공유: 6개월 단위 기술 방향성 공개 논의"
                  ]}
                  outcomes="GraphQL 관련 버그 60% 감소, 신규 기능 개발 속도 40% 향상, 이직률 15% 감소"
                />
              </div>
              
              <div className="p-4 border rounded-lg mt-4">
                <h5 className="font-medium mb-2 flex items-center">
                  <Award size={16} className="text-amber-600 mr-2" />
                  CTI 프로젝트에 최적화된 협업 전략
                </h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><span className="font-medium">도메인 전문가 연계:</span> 상담사와 개발자 간 직접 소통 채널 구축으로 실제 요구사항 이해 심화</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><span className="font-medium">실시간 프로토타이핑:</span> GraphQL 스키마 변경 시 즉시 프론트엔드와 함께 테스트하는 문화 확립</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><span className="font-medium">통합 테스트 세션:</span> 주간 통합 테스트 데이로 실제 CTI 시나리오 시뮬레이션 및 피드백 수집</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    <span><span className="font-medium">점진적 복잡성 도입:</span> 기본 쿼리부터 시작해 구독(Subscription) 등 고급 기능을 단계적으로 추가</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// 전략 카드 컴포넌트
interface StrategyCardProps {
  title: string;
  description: string;
  steps: string[];
  icon: React.ReactNode;
}

const StrategyCard = ({ title, description, steps, icon }: StrategyCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <h4 className="font-medium text-md">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <ul className="space-y-1">
        {steps.map((step, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="text-blue-500 mr-1">•</span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 함정 카드 컴포넌트
interface PitfallCardProps {
  title: string;
  description: string;
  solutions: string[];
}

const PitfallCard = ({ title, description, solutions }: PitfallCardProps) => {
  return (
    <div className="bg-white p-3 rounded border border-gray-200">
      <h5 className="text-sm font-medium text-red-700 mb-1">{title}</h5>
      <p className="text-xs text-gray-600 mb-2">{description}</p>
      <div className="text-xs">
        <p className="font-medium text-gray-700">해결 방안:</p>
        <ul className="mt-1">
          {solutions.map((solution, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-1">✓</span>
              <span>{solution}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 사례 연구 카드 컴포넌트
interface CaseStudyCardProps {
  company: string;
  challenge: string;
  approach: string[];
  results: string;
}

const CaseStudyCard = ({ company, challenge, approach, results }: CaseStudyCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h4 className="font-medium text-md mb-2">{company}</h4>
      <div className="space-y-2 text-sm">
        <div>
          <p className="font-medium text-gray-700">도전 과제:</p>
          <p className="text-gray-600">{challenge}</p>
        </div>
        <div>
          <p className="font-medium text-gray-700">접근 방법:</p>
          <ul className="mt-1">
            {approach.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-1">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium text-gray-700">결과:</p>
          <p className="text-gray-600">{results}</p>
        </div>
      </div>
    </div>
  );
};

// 학습 문화 카드 컴포넌트
interface Practice {
  name: string;
  details: string;
}

interface LearningCultureCardProps {
  title: string;
  description: string;
  practices: Practice[];
  icon: React.ReactNode;
}

const LearningCultureCard = ({ title, description, practices, icon }: LearningCultureCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <h4 className="font-medium text-md">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="space-y-2">
        {practices.map((practice, index) => (
          <div key={index} className="bg-gray-50 p-2 rounded text-sm">
            <p className="font-medium">{practice.name}</p>
            <p className="text-gray-600 text-xs">{practice.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 리소스 카드 컴포넌트
interface ResourceCardProps {
  title: string;
  content: React.ReactNode;
}

const ResourceCard = ({ title, content }: ResourceCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h4 className="font-medium text-md mb-3">{title}</h4>
      {content}
    </div>
  );
};

// 모니터링 카드 컴포넌트
interface Metric {
  name: string;
  details: string;
}

interface MonitoringCardProps {
  title: string;
  description: string;
  metrics: Metric[];
  tools: string[];
  icon: React.ReactNode;
}

const MonitoringCard = ({ title, description, metrics, tools, icon }: MonitoringCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <h4 className="font-medium text-md">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="space-y-2">
        {metrics.map((metric, index) => (
          <div key={index} className="text-sm">
            <p className="font-medium">{metric.name}</p>
            <p className="text-gray-600 text-xs">{metric.details}</p>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-700">추천 도구:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {tools.map((tool, index) => (
              <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// 지표 카드 컴포넌트
interface MetricCardProps {
  category: string;
  metrics: string[];
}

const MetricCard = ({ category, metrics }: MetricCardProps) => {
  return (
    <div className="bg-white p-3 rounded border border-gray-200">
      <h5 className="text-sm font-medium text-green-700 mb-2">{category}</h5>
      <ul className="space-y-1 text-xs">
        {metrics.map((metric, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-500 mr-1">•</span>
            <span>{metric}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 협업 카드 컴포넌트
interface CollaborationCardProps {
  title: string;
  description: string;
  practices: string[];
  benefits: string;
  icon: React.ReactNode;
}

const CollaborationCard = ({ title, description, practices, benefits, icon }: CollaborationCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <h4 className="font-medium text-md">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <ul className="space-y-1 mb-2">
        {practices.map((practice, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="text-blue-500 mr-1">•</span>
            <span>{practice}</span>
          </li>
        ))}
      </ul>
      <div className="bg-blue-50 p-2 rounded text-sm">
        <span className="font-medium">기대 효과:</span> {benefits}
      </div>
    </div>
  );
};

// 팀 문화 카드 컴포넌트
interface TeamCultureCardProps {
  company: string;
  practices: string[];
  outcomes: string;
}

const TeamCultureCard = ({ company, practices, outcomes }: TeamCultureCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h4 className="font-medium text-md mb-2">{company}</h4>
      <div className="space-y-2 text-sm">
        <div>
          <p className="font-medium text-gray-700">주요 실천 방안:</p>
          <ul className="mt-1">
            {practices.map((practice, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-500 mr-1">•</span>
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-purple-50 p-2 rounded">
          <p className="font-medium text-gray-700">성과:</p>
          <p className="text-gray-600">{outcomes}</p>
        </div>
      </div>
    </div>
  );
};

export default TechAdoptionStrategies;