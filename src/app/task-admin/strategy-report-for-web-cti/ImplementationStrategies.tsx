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
  Code2, 
  GitMerge, 
  ArrowRight, 
  BarChart2, 
  Server,
  Users,
  TestTube,
  Clock,
  Layers,
  Database,
  RefreshCw,
  Check
} from 'lucide-react';

const ImplementationStrategies = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>차기 CTI 프로젝트 구현 전략</CardTitle>
          <CardDescription>
            아키텍처 유연성, 팀 문화, 운영 체계 및 실행 로드맵을 포함한 종합적인 구현 접근법
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="architecture" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="architecture">아키텍처 유연성</TabsTrigger>
              <TabsTrigger value="team-culture">팀 역량 및 문화</TabsTrigger>
              <TabsTrigger value="operations">운영 및 모니터링</TabsTrigger>
              <TabsTrigger value="roadmap">실행 로드맵</TabsTrigger>
            </TabsList>

            <TabsContent value="architecture" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">아키텍처 유연성 확보</h3>
                <p className="text-sm text-gray-600 mb-4">
                  차기 CTI 프로젝트는 처음부터 유연하고 확장 가능한 아키텍처를 설계하여 
                  변화하는 요구사항에 신속하게 대응할 수 있는 구조를 갖추어야 합니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <ArchitectureCard 
                    title="모던 스택 기반 설계"
                    description="최신 기술 스택을 활용한 유연한 아키텍처 구성"
                    technologies={[
                      "GraphQL/BFF - 효율적인 데이터 요청 및 클라이언트 맞춤형 API",
                      "SSE(Server-Sent Events) - 실시간 이벤트 스트림 처리",
                      "Redis Streams - 확장 가능한 메시지 브로커로 활용", 
                      "Next.js App Router - 통합된 프론트엔드/백엔드 환경"
                    ]}
                    icon={<Code2 size={24} className="text-blue-600" />}
                  />
                  
                  <ArchitectureCard 
                    title="서비스 구조 최적화"
                    description="책임 경계가 명확한 서비스 아키텍처 구성"
                    technologies={[
                      "Monorepo 구조 - nx 또는 turborepo를 활용한 코드 공유 및 통합",
                      "마이크로서비스 경계 정의 - 도메인 기반 서비스 분할",
                      "독립 배포 파이프라인 - 서비스별 독립적인 CI/CD",
                      "Federation - GraphQL 기반 서비스 통합"
                    ]}
                    icon={<Layers size={24} className="text-purple-600" />}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <h4 className="text-md font-semibold flex items-center mb-2">
                    <GitMerge size={18} className="text-blue-600 mr-2" />
                    아키텍처 결정 프레임워크
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    주요 아키텍처 결정을 위한 구조화된 접근 방식과 의사결정 프레임워크를 제시합니다.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                    <DecisionFrameworkCard
                      title="기술 선택 기준"
                      items={[
                        "팀 적합성 - 현재 역량과 학습 곡선",
                        "유지보수성 - 문서화 수준과 커뮤니티 지원",
                        "확장성 - 예상 트래픽 및 사용자 증가 대응 능력",
                        "통합성 - 기존 시스템과의 연동 용이성"
                      ]}
                    />
                    
                    <DecisionFrameworkCard
                      title="의사결정 문서화"
                      items={[
                        "ADR(Architecture Decision Records) 작성",
                        "대안 분석 및 트레이드오프 명시",
                        "기술적 부채 관리 계획 포함",
                        "도입 타임라인 및 마일스톤 정의"
                      ]}
                    />
                    
                    <DecisionFrameworkCard
                      title="검증 프로세스"
                      items={[
                        "개념 증명(PoC) 구현 및 평가",
                        "벤치마킹 및 성능 테스트",
                        "보안 및 규정 준수 검토",
                        "외부 전문가 검토 및 피드백"
                      ]}
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">보완 요소: 인프라 및 플랫폼 전략</h3>
                <p className="text-sm text-gray-600 mb-4">
                  시스템의 안정적인 운영과 효율적인 관리를 위한 인프라 및 플랫폼 선택 전략을 제시합니다.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="text-md font-semibold mb-3">플랫폼·인프라 선택 가이드</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-2 px-3 text-left">플랫폼 옵션</th>
                          <th className="py-2 px-3 text-left">장점</th>
                          <th className="py-2 px-3 text-left">단점</th>
                          <th className="py-2 px-3 text-left">적합한 사용 사례</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-200">
                          <td className="py-2 px-3 font-medium">Kubernetes</td>
                          <td className="py-2 px-3">
                            <ul className="list-disc list-inside">
                              <li>높은 확장성</li>
                              <li>세밀한 자원 제어</li>
                              <li>자동 복구 기능</li>
                            </ul>
                          </td>
                          <td className="py-2 px-3">
                            <ul className="list-disc list-inside">
                              <li>높은 복잡성</li>
                              <li>운영 오버헤드</li>
                            </ul>
                          </td>
                          <td className="py-2 px-3">대규모 마이크로서비스 아키텍처</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="py-2 px-3 font-medium">Docker Compose</td>
                          <td className="py-2 px-3">
                            <ul className="list-disc list-inside">
                              <li>단순한 설정</li>
                              <li>빠른 개발 환경 구성</li>
                            </ul>
                          </td>
                          <td className="py-2 px-3">
                            <ul className="list-disc list-inside">
                              <li>제한된 확장성</li>
                              <li>제한된 오케스트레이션</li>
                            </ul>
                          </td>
                          <td className="py-2 px-3">개발 환경 및 소규모 배포</td>
                        </tr>
                        <tr className="border-t border-gray-200">
                          <td className="py-2 px-3 font-medium">Vercel/Netlify</td>
                          <td className="py-2 px-3">
                            <ul className="list-disc list-inside">
                              <li>빠른 배포 속도</li>
                              <li>통합된 CI/CD</li>
                              <li>낮은 운영 복잡성</li>
                            </ul>
                          </td>
                          <td className="py-2 px-3">
                            <ul className="list-disc list-inside">
                              <li>제한된 런타임 환경</li>
                              <li>벤더 종속성</li>
                            </ul>
                          </td>
                          <td className="py-2 px-3">
                            Next.js 기반 애플리케이션과 서버리스 API
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team-culture" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">팀 역량 및 문화 장려</h3>
              <p className="text-sm text-gray-600 mb-4">
                새로운 기술과 방법론을 성공적으로 도입하기 위해서는 팀 문화와 역량 개발이 핵심입니다.
                실험과 학습을 장려하는 환경을 조성하고 체계적인 품질 관리 방법을 도입합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <TeamCultureCard 
                  title="실험과 학습 문화 구축"
                  description="팀원들이 새로운 기술을 안전하게 시도하고 학습할 수 있는 환경 조성"
                  practices={[
                    {
                      name: "PoC → 전파 → 확장 사이클 공식화",
                      details: "실패에 대한 부담 없이 새로운 기술을 실험하고 성공 사례를 팀 내에 전파할 수 있는 체계적인 프로세스 수립"
                    },
                    {
                      name: "기술 챔피언 제도",
                      details: "특정 기술이나 영역에 대한 전문성을 개발하고 팀 내에서 멘토링하는 역할 부여"
                    },
                    {
                      name: "학습 시간 보장",
                      details: "정기적인 학습 세션이나 해커톤을 통해 팀원들의 기술적 성장 장려"
                    }
                  ]}
                  icon={<Users size={24} className="text-blue-600" />}
                />
                
                <TeamCultureCard 
                  title="품질 관리 체계화"
                  description="코드 품질과 API 설계의 일관성을 보장하는 체계적인 접근법"
                  practices={[
                    {
                      name: "코드 리뷰 가이드라인",
                      details: "GraphQL SDL, 타입 정의, API 문서를 포함한 명확한 코드 리뷰 체크리스트 정의"
                    },
                    {
                      name: "PR 템플릿 및 자동화",
                      details: "일관된 PR 형식과 자동화된 검증을 통한 품질 보장"
                    },
                    {
                      name: "통합 문서화 전략",
                      details: "코드와 함께 발전하는 자동화된 문서 생성 및 관리 시스템"
                    }
                  ]}
                  icon={<Check size={24} className="text-green-600" />}
                />
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <Users size={18} className="text-purple-600 mr-2" />
                  GraphQL 프로젝트를 위한 코드 리뷰 체크리스트
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-purple-700 mb-2">스키마 설계 체크리스트</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <Check size={14} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span>네이밍 컨벤션 준수 (PascalCase 타입, camelCase 필드)</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span>필요한 주석 및 디렉티브 포함</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span>인터페이스/유니언 타입 적절한 활용</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span>페이지네이션 패턴 일관성 (Connection 패턴 등)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-700 mb-2">리졸버 구현 체크리스트</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <Check size={14} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span>N+1 문제 방지 (DataLoader 패턴 활용)</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span>적절한 에러 처리 및 예외 상황 대응</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span>인증/인가 로직 일관성 있게 적용</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                        <span>성능 지표 측정 포인트 포함</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">보완 요소: 테스트 전략</h3>
              <p className="text-sm text-gray-600 mb-4">
                높은 품질의 소프트웨어를 지속적으로 제공하기 위한 포괄적인 테스트 전략을 수립합니다.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <TestTube size={20} className="text-amber-600 mr-2" />
                  <h4 className="text-md font-medium">다층적 테스트 전략</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-blue-700 mb-2">단위 테스트</h5>
                    <ul className="space-y-1">
                      <li>• 리졸버 단위 테스트</li>
                      <li>• 서비스 레이어 테스트</li>
                      <li>• React 컴포넌트 테스트</li>
                      <li>• 유틸리티 함수 테스트</li>
                    </ul>
                    <p className="mt-2 text-xs text-gray-600">권장 도구: Jest, React Testing Library</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-green-700 mb-2">통합 테스트</h5>
                    <ul className="space-y-1">
                      <li>• GraphQL API 통합 테스트</li>
                      <li>• 데이터베이스 연동 테스트</li>
                      <li>• 마이크로서비스 간 통신 테스트</li>
                      <li>• 외부 API 통합 테스트</li>
                    </ul>
                    <p className="mt-2 text-xs text-gray-600">권장 도구: Supertest, Testcontainers</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-purple-700 mb-2">E2E 테스트</h5>
                    <ul className="space-y-1">
                      <li>• 주요 사용자 흐름 테스트</li>
                      <li>• CTI 특화 시나리오 테스트</li>
                      <li>• 성능 및 부하 테스트</li>
                      <li>• 브라우저 호환성 테스트</li>
                    </ul>
                    <p className="mt-2 text-xs text-gray-600">권장 도구: Playwright, Cypress, k6</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="operations" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">운영·모니터링 체계 선제 구축</h3>
              <p className="text-sm text-gray-600 mb-4">
                프로젝트 초기부터 견고한 운영 및 모니터링 체계를 구축하여 
                안정적인 서비스 운영과 신속한 문제 해결을 가능하게 합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <OperationsCard 
                  title="분산 추적 및 로깅 시스템"
                  description="복잡한 시스템에서의 문제 진단 및 추적을 위한 통합 로깅 체계"
                  features={[
                    "Sentry - 에러 추적 및 실시간 알림",
                    "LogRocket - 사용자 세션 기록 및 재현",
                    "OpenTelemetry - 분산 추적 구현",
                    "Structured Logging - JSON 형식의 통합 로그 관리"
                  ]}
                  benefits="문제 재현 시간과 장애 복구 시간을 획기적으로 단축"
                  icon={<Server size={24} className="text-blue-600" />}
                />
                
                <OperationsCard 
                  title="성능 모니터링 및 용량 관리"
                  description="성능 지표 추적 및 트래픽 증가에 대응하는 용량 계획 시스템"
                  features={[
                    "Prometheus + Grafana - 시계열 데이터 수집 및 시각화",
                    "Redis Streams 모니터링 - 메시지 처리량 및 지연 시간 추적",
                    "GraphQL 쿼리 복잡성 분석 - 리소스 집약적 쿼리 식별",
                    "자동 스케일링 정책 - 부하에 따른 리소스 조정"
                  ]}
                  benefits="트래픽 증가에 따른 용량 계획(Capacity Planning) 수립 용이"
                  icon={<BarChart2 size={24} className="text-green-600" />}
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <Database size={18} className="text-blue-600 mr-2" />
                  GraphQL 특화 모니터링 전략
                </h4>
                <p className="text-sm text-gray-700 mb-3">
                  GraphQL API의 특성을 고려한 맞춤형 모니터링 및 분석 전략을 구현합니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-blue-700 mb-2">쿼리 복잡성 모니터링</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <Check size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>쿼리 깊이 및 너비 분석</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>리졸버별 실행 시간 추적</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>데이터베이스 쿼리 수 및 실행 시간 측정</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>복잡한 쿼리의 자동 제한 및 최적화 제안</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-blue-700 mb-2">클라이언트 사용 패턴 분석</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <Check size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>자주 요청되는 필드 및 타입 식별</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>클라이언트별 쿼리 패턴 분석</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>사용되지 않는 필드 및 타입 탐지</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={14} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                        <span>스키마 진화에 대한 영향 분석</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">보완 요소: CI/CD 파이프라인 정의</h3>
              <p className="text-sm text-gray-600 mb-4">
                지속적 통합 및 배포를 위한 효율적인 파이프라인을 구축하여 개발 생산성과 배포 안정성을 확보합니다.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <RefreshCw size={20} className="text-purple-600 mr-2" />
                  <h4 className="text-md font-medium">CI/CD 파이프라인 구성</h4>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-purple-700 mb-2">통합 배포 흐름 구성</h5>
                    <p className="text-sm mb-2">
                      Next.js API 라우트와 백엔드 서비스가 함께 배포되는 통합된 파이프라인 구성으로 
                      프론트엔드와 백엔드 간의 일관성을 유지합니다.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        GitHub Actions
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        CircleCI
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                        Jenkins
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-purple-700 mb-2">고급 배포 전략</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h6 className="font-medium mb-1">카나리 배포 (Canary Deployment)</h6>
                        <p className="text-xs text-gray-600">
                          일부 사용자에게만 새 버전을 점진적으로 롤아웃하여 위험을 최소화하는 전략
                        </p>
                      </div>
                      <div>
                        <h6 className="font-medium mb-1">블루-그린 배포 (Blue-Green Deployment)</h6>
                        <p className="text-xs text-gray-600">
                          두 개의 동일한 환경을 운영하며 한 환경에서만 트래픽을 처리하여 무중단 배포 실현
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-purple-700 mb-2">자동화된 품질 게이트</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <div>
                        <h6 className="font-medium mb-1">코드 품질</h6>
                        <ul className="text-xs space-y-1">
                          <li>• ESLint/TSLint 검사</li>
                          <li>• 코드 중복 분석</li>
                          <li>• 복잡도 측정</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium mb-1">테스트 커버리지</h6>
                        <ul className="text-xs space-y-1">
                          <li>• 단위 테스트 실행</li>
                          <li>• 통합 테스트 검증</li>
                          <li>• 커버리지 임계값 검사</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium mb-1">보안 검사</h6>
                        <ul className="text-xs space-y-1">
                          <li>• 의존성 취약점 검사</li>
                          <li>• SAST(정적 보안 분석)</li>
                          <li>• 비밀 정보 노출 확인</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="roadmap" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">실행 로드맵 및 단계적 접근</h3>
              <p className="text-sm text-gray-600 mb-4">
                차기 CTI 프로젝트의 성공적인 구현을 위한 단계별 접근법과 로드맵을 제시합니다.
                각 단계는 명확한 목표와 성과 지표를 포함하며, 점진적으로 확장합니다.
              </p>
              
              <div className="relative flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-4 pb-6">
                <div className="hidden md:block absolute top-7 left-8 right-8 h-1 bg-blue-100"></div>
                
                <RoadmapPhaseCard 
                  phase="1단계"
                  weeks="1–2주차"
                  title="핵심 기능 PoC"
                  activities={[
                    "GraphQL 게이트웨이 + 간단한 인증/조회 API",
                    "기본 프로젝트 구조 및 환경 설정",
                    "주요 기술 스택 검증",
                    "핵심 비즈니스 로직 구현"
                  ]}
                  outcomes={[
                    "기술 스택 검증 완료",
                    "기본 아키텍처 수립",
                    "개발 환경 구축"
                  ]}
                />
                
                <RoadmapPhaseCard 
                  phase="2단계"
                  weeks="3–4주차"
                  title="내부 워크숍"
                  activities={[
                    "PoC 결과 공유, 코드 리뷰 세션",
                    "모니터링 및 로깅 시스템 셋업",
                    "팀 역량 개발 워크숍",
                    "피드백 수렴 및 개선점 도출"
                  ]}
                  outcomes={[
                    "팀 전체 지식 공유",
                    "모니터링 체계 구축",
                    "코드 리뷰 가이드라인 확립"
                  ]}
                />
                
                <RoadmapPhaseCard 
                  phase="3단계"
                  weeks="5–8주차"
                  title="본격 스캐폴딩"
                  activities={[
                    "프로젝트 템플릿(Boilerplate) 완성",
                    "CI/CD 파이프라인 통합",
                    "테스트 자동화 구축",
                    "보안 및 성능 최적화"
                  ]}
                  outcomes={[
                    "템플릿 코드 완성",
                    "자동화된 배포 파이프라인",
                    "품질 게이트 구축"
                  ]}
                />
                
                <RoadmapPhaseCard 
                  phase="4단계"
                  weeks="9주차~"
                  title="단계적 기능 개발"
                  activities={[
                    "SSE 기반 알림 시스템",
                    "Redis Streams 기반 데이터 집계",
                    "추가 서비스 마이그레이션",
                    "사용자 피드백 기반 개선"
                  ]}
                  outcomes={[
                    "전체 기능 구현 완료",
                    "성능 및 안정성 검증",
                    "사용자 만족도 평가"
                  ]}
                />
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <Clock size={18} className="text-amber-600 mr-2" />
                  주요 마일스톤 및 성공 지표
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-amber-700 mb-2">기술적 마일스톤</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <ArrowRight size={14} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <span><span className="font-medium">2주차:</span> 핵심 GraphQL API 기능 구현 완료</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight size={14} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <span><span className="font-medium">4주차:</span> 모니터링 및 로깅 시스템 구축 완료</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight size={14} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <span><span className="font-medium">6주차:</span> CI/CD 파이프라인 및 자동화 테스트 완료</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight size={14} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <span><span className="font-medium">10주차:</span> 실시간 기능 및 데이터 집계 시스템 구현</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-medium text-amber-700 mb-2">성공 지표</h5>
                    <ul className="space-y-1">
                      <li className="flex items-start">
                        <ArrowRight size={14} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <span><span className="font-medium">개발 속도:</span> REST API 대비 기능 개발 시간 50% 단축</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight size={14} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <span><span className="font-medium">시스템 성능:</span> 페이지 로딩 시간 30% 개선, API 응답 시간 40% 단축</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight size={14} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <span><span className="font-medium">코드 품질:</span> 테스트 커버리지 80% 이상, 정적 분석 이슈 0개</span>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight size={14} className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <span><span className="font-medium">운영 안정성:</span> 장애 평균 복구 시간(MTTR) 50% 단축</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg bg-gray-50">
                <h4 className="font-medium mb-3 flex items-center">
                  <GitMerge size={18} className="text-gray-700 mr-2" />
                  효과적인 실행을 위한 팁
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-1">단계적 접근 마인드셋</p>
                    <p className="text-gray-600">
                      완벽한 시스템을 한번에 구축하기보다는 작은 단위로 점진적으로 
                      개발하고 검증하는 방식으로 접근하세요. 빠른 피드백 루프를 통해 
                      방향을 지속적으로 조정할 수 있습니다.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">핵심에 집중</p>
                    <p className="text-gray-600">
                      CTI 프로젝트의 핵심 가치인 상담 효율성과 고객 경험 향상에 
                      집중하세요. 기술적 완성도보다 비즈니스 가치 창출을 우선시하고, 
                      사용자 피드백을 지속적으로 반영하세요.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// 아키텍처 카드 컴포넌트
interface ArchitectureCardProps {
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
}

const ArchitectureCard = ({ title, description, technologies, icon }: ArchitectureCardProps) => {
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
        {technologies.map((tech, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="text-blue-500 mr-1">•</span>
            <span>{tech}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 의사결정 프레임워크 카드 컴포넌트
interface DecisionFrameworkCardProps {
  title: string;
  items: string[];
}

const DecisionFrameworkCard = ({ title, items }: DecisionFrameworkCardProps) => {
  return (
    <div className="bg-white p-3 rounded border border-gray-200">
      <h5 className="text-sm font-medium text-blue-700 mb-2">{title}</h5>
      <ul className="space-y-1 text-xs">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-500 mr-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 팀 문화 카드 컴포넌트
interface Practice {
  name: string;
  details: string;
}

interface TeamCultureCardProps {
  title: string;
  description: string;
  practices: Practice[];
  icon: React.ReactNode;
}

const TeamCultureCard = ({ title, description, practices, icon }: TeamCultureCardProps) => {
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

// 운영 카드 컴포넌트
interface OperationsCardProps {
  title: string;
  description: string;
  features: string[];
  benefits: string;
  icon: React.ReactNode;
}

const OperationsCard = ({ title, description, features, benefits, icon }: OperationsCardProps) => {
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
        {features.map((feature, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="text-green-500 mr-1">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="bg-green-50 p-2 rounded text-sm">
        <span className="font-medium">기대 효과:</span> {benefits}
      </div>
    </div>
  );
};

// 로드맵 단계 카드 컴포넌트
interface RoadmapPhaseCardProps {
  phase: string;
  weeks: string;
  title: string;
  activities: string[];
  outcomes: string[];
}

const RoadmapPhaseCard = ({ phase, weeks, title, activities, outcomes }: RoadmapPhaseCardProps) => {
  return (
    <div className="flex-1 p-4 border rounded-lg bg-white shadow-sm relative">
      <div className="md:absolute md:-top-3 left-1/2 md:transform md:-translate-x-1/2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full mb-2 md:mb-0">
        {phase}
      </div>
      <div className="md:mt-4">
        <div className="text-blue-800 font-medium text-sm mb-1">{weeks}</div>
        <h4 className="font-medium text-md mb-2">{title}</h4>
        <div className="space-y-2 text-sm">
          <div>
            <p className="font-medium text-gray-700 mb-1">주요 활동:</p>
            <ul className="space-y-1">
              {activities.map((activity, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-1">•</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-700 mb-1">기대 성과:</p>
            <ul className="space-y-1">
              {outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <Check size={14} className="text-green-500 mt-1 mr-1 flex-shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationStrategies;