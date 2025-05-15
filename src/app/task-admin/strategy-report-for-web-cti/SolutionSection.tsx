import React, { useState, ReactNode } from 'react';
import ResourceCard from './ResourceCard';

interface SolutionSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

const SolutionSection = ({ title, description, children }: SolutionSectionProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 border border-gray-200">
      <div
        className="p-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
        <span className="text-blue-500">
          {expanded ? '▲' : '▼'}
        </span>
      </div>

      <div className={`transition-all duration-300 ${expanded ? 'max-h-[3000px]' : 'max-h-0'} overflow-hidden`}>
        <div className="p-5">
          <p className="text-gray-700 mb-4">{description}</p>
          {children}
        </div>
      </div>
    </div>
  );
};


interface CodeExampleProps {
  title: string;
  language: string;
  code: string;
}

const CodeExample = ({ title, language, code }: CodeExampleProps) => (
  <div className="mb-5">
    <p className="text-sm font-medium mb-1 text-gray-700">{title}</p>
    <div className="bg-gray-800 rounded-md overflow-hidden">
      <div className="px-4 py-2 bg-gray-700 text-gray-200 text-xs font-mono">{language}</div>
      <pre className="p-4 text-xs text-gray-300 font-mono overflow-x-auto">
        {code}
      </pre>
    </div>
  </div>
);

const StarBullet = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start mb-2">
    <span className="text-yellow-400 mr-2">★</span>
    <span>{children}</span>
  </div>
);

const KeyStrategies = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">차기 CTI 프로젝트 핵심 해결책</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            기존 CTI 프로젝트의 문제점 분석을 바탕으로, 생산성 향상과 유지보수성 개선을 위한 3가지 핵심 해결책을 제안합니다.
            각 해결책은 개발 생산성을 높이고 코드 품질을 향상시키며 프로젝트의 성공 가능성을 크게 높일 것입니다.
          </p>
        </div>

        {/* 해결책 1: GraphQL 및 DGS 도입 */}
        <SolutionSection
          title="1. GraphQL 및 Netflix DGS 도입의 필요성"
          description="계층형 데이터를 효율적으로 처리하고 실시간 기능을 구현하기 위한 최신 API 아키텍처 도입"
        >
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-3 text-blue-700">핵심 문제 해결</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✘</span>
                  <div>
                    <span className="font-medium">기존 문제: REST API의 계층형 데이터 호출 문제</span>
                    <p className="text-sm text-gray-600">모니터링 페이지에서 계층형 데이터를 여러 API 호출로 가져오면서 성능 저하 및 코드 복잡성 증가</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium">해결책: GraphQL을 통한 단일 요청 구현</span>
                    <p className="text-sm text-gray-600">캠페인-상담원-상태 데이터를 단일 쿼리로 가져오는 구조로 전환하여 비효율적인 API 호출 제거</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3 text-blue-700">GraphQL + DGS 주요 이점</h4>
                <ul className="space-y-2">
                  <StarBullet>
                    <span className="font-medium">단일 요청으로 필요 데이터 조회</span>
                    <p className="text-sm text-gray-600">언더페칭/오버페칭 문제 해결</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">타입 시스템을 통한 API 자체 문서화</span>
                    <p className="text-sm text-gray-600">Schema-first 개발로 API 일관성 확보</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">Subscription을 통한 실시간 업데이트</span>
                    <p className="text-sm text-gray-600">WebSocket 기반 데이터 스트림으로 실시간 모니터링 구현</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">Federation 아키텍처 지원</span>
                    <p className="text-sm text-gray-600">마이크로서비스 환경에서 API 통합 용이</p>
                  </StarBullet>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3 text-blue-700">Netflix DGS 선택 이유</h4>
                <ul className="space-y-2">
                  <StarBullet>
                    <span className="font-medium">Spring Boot 생태계와의 완벽한 통합</span>
                    <p className="text-sm text-gray-600">기존 Spring Boot 백엔드와 원활한 연동</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">엔터프라이즈급 성능과 안정성</span>
                    <p className="text-sm text-gray-600">Netflix에서 검증된 대규모 트래픽 처리 능력</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">코드 생성 도구 지원</span>
                    <p className="text-sm text-gray-600">스키마에서 타입 안전한 코드 자동 생성</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">Federation 지원으로 확장성 확보</span>
                    <p className="text-sm text-gray-600">마이크로서비스 간 데이터 통합 용이</p>
                  </StarBullet>
                </ul>
              </div>
            </div>

            <CodeExample
              title="GraphQL 스키마 예시 (CTI 모니터링 시스템)"
              language="graphql"
              code={`type Query {
  # 캠페인 목록 조회 (계층형 데이터를 단일 요청으로)
  campaigns: [Campaign]
  # 특정 캠페인 조회
  campaign(id: ID!): Campaign
  # 상담원 목록 조회 (캠페인 필터링 가능)
  agents(campaignId: ID): [Agent]
}

# 실시간 업데이트를 위한 Subscription
type Subscription {
  # 상담원 상태 변경 구독
  agentStatusChanged: Agent
  # 새 통화 생성 구독
  callCreated: Call
}

# 캠페인 정보
type Campaign {
  id: ID!
  name: String!
  description: String
  # 캠페인에 속한 상담원들 (N+1 문제 없이 함께 조회)
  agents: [Agent]
  # 캠페인 통계 (한 번에 조회)
  stats: CampaignStats
}

# 상담원 정보
type Agent {
  id: ID!
  name: String!
  extension: String
  status: AgentStatus!
  # 현재 진행 중인 통화 (있는 경우)
  currentCall: Call
  # 상담원 성과 지표
  performance: AgentPerformance
}

# 통화 정보
type Call {
  id: ID!
  startTime: DateTime
  endTime: DateTime
  duration: Int
  customerId: ID
  customerName: String
  status: CallStatus
  recordingUrl: String
  # 통화 분석 결과 (AI 분석)
  analysis: CallAnalysis
}

# 상담원 상태 열거형
enum AgentStatus {
  AVAILABLE
  BUSY
  BREAK
  OFFLINE
}

# 통화 상태 열거형
enum CallStatus {
  RINGING
  IN_PROGRESS
  COMPLETED
  TRANSFERRED
  DROPPED
}

# 캠페인 통계
type CampaignStats {
  totalCalls: Int!
  avgCallDuration: Float
  completionRate: Float
  customerSatisfaction: Float
}

# 상담원 성과 지표
type AgentPerformance {
  callsHandled: Int
  avgHandlingTime: Float
  customerRating: Float
}

# 통화 분석 결과 (AI)
type CallAnalysis {
  transcription: String
  sentiment: SentimentAnalysis
  keywords: [String]
  summary: String
}

# 감정 분석 결과
type SentimentAnalysis {
  overall: Float
  anger: Float
  joy: Float
  sadness: Float
}`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <CodeExample
                title="DGS Framework Resolver 구현 예시"
                language="java"
                code={`@DgsComponent
public class CampaignDataFetcher {
    
    private final CampaignService campaignService;
    private final AgentService agentService;
    
    @Autowired
    public CampaignDataFetcher(
        CampaignService campaignService, 
        AgentService agentService
    ) {
        this.campaignService = campaignService;
        this.agentService = agentService;
    }
    
    // 캠페인 목록 조회 Query
    @DgsQuery
    public List<Campaign> campaigns() {
        return campaignService.getAllCampaigns();
    }
    
    // 캠페인에 속한 상담원 목록 조회 (DataLoader 패턴)
    @DgsData(parentType = "Campaign", field = "agents")
    public CompletableFuture<List<Agent>> agents(DgsDataFetchingEnvironment dfe) {
        Campaign campaign = dfe.getSource();
        
        // BatchLoader를 통해 N+1 문제 방지
        DataLoader<String, List<Agent>> agentsLoader = 
            dfe.getDataLoader("agentsByCampaign");
            
        return agentsLoader.load(campaign.getId());
    }
    
    // 상담원 상태 변경 Subscription
    @DgsSubscription
    public Publisher<Agent> agentStatusChanged() {
        return agentService.getAgentStatusPublisher();
    }
}`}
              />

              <CodeExample
                title="TanStack Query로 GraphQL 데이터 조회 (프론트엔드)"
                language="javascript"
                code={`import { useQuery, useQueryClient } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';

// GraphQL 쿼리 정의 (계층형 데이터를 단일 요청으로)
const CAMPAIGNS_QUERY = gql\`
  query GetCampaignsWithAgents {
    campaigns {
      id
      name
      stats {
        totalCalls
        avgCallDuration
        completionRate
      }
      agents {
        id
        name
        status
        currentCall {
          id
          customerName
          status
        }
      }
    }
  }
\`;

// Custom Hook - 캠페인 및 에이전트 데이터 조회
function useCampaignsQuery() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const data = await request('/graphql', CAMPAIGNS_QUERY);
      return data.campaigns;
    },
    // 30초마다 자동 갱신 (실시간성 확보)
    refetchInterval: 30000,
  });
}

// GraphQL Subscription 사용 (실시간 상태 변경)
function useAgentStatusChanges() {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const subscription = createSubscription(
      gql\`subscription { agentStatusChanged { id status } }\`,
      {
        onData: (data) => {
          // 캐시 업데이트
          queryClient.setQueryData(
            ['campaigns'], 
            updateAgentStatus(data.agentStatusChanged)
          );
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [queryClient]);
}

// 컴포넌트에서 사용
function CampaignMonitoring() {
  const { data, isLoading, error } = useCampaignsQuery();
  
  // 실시간 상태 업데이트 구독
  useAgentStatusChanges();
  
  if (isLoading) return <LoadingComponent />;
  if (error) return <ErrorComponent error={error} />;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map(campaign => (
        <CampaignCard 
          key={campaign.id} 
          campaign={campaign} 
          // 중첩 데이터 props drilling 필요 없음
          agents={campaign.agents} 
        />
      ))}
    </div>
  );
}`}
              />
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3 text-blue-700">추천 교육 자료 및 도구</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResourceCard
                  title="Netflix DGS Framework"
                  description="대규모 트래픽을 위한 GraphQL 프레임워크 공식 문서"
                  link="https://netflix.github.io/dgs/"
                  imageUrl="https://cdn.jsdelivr.net/gh/Netflix/dgs-framework@main/docs/images/Netflix-DGS-Logo.png"
                />
                <ResourceCard
                  title="GraphQL 기초 강의"
                  description="REST API를 대체하는 GraphQL 기본 개념 및 실습"
                  link="https://www.inflearn.com/course/graphql-rest-api를-대체할-기술"
                />
                <ResourceCard
                  title="DGS Code Generation"
                  description="스키마에서 타입 안전한 코드 자동 생성 도구"
                  link="https://netflix.github.io/dgs/generating-code-from-schema/"
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mt-6">
              <h4 className="font-medium mb-2 text-yellow-800">구현 전략 및 로드맵</h4>
              <ol className="list-decimal pl-6 space-y-1 text-yellow-800">
                <li><span className="font-medium">초기 파일럿 프로젝트</span>: 가장 중요한 데이터 모델(캠페인-상담원-통화)에 대한 GraphQL 스키마 설계</li>
                <li><span className="font-medium">DGS 프레임워크 구성</span>: Spring Boot 애플리케이션에 DGS 통합 구현</li>
                <li><span className="font-medium">REST API 래핑</span>: 기존 REST API를 GraphQL 리졸버로 래핑하여 점진적 마이그레이션</li>
                <li><span className="font-medium">데이터 로더 패턴 적용</span>: N+1 문제 해결을 위한 배치 로딩 구현</li>
                <li><span className="font-medium">Subscription 구현</span>: 실시간 업데이트를 위한 WebSocket 기반 구독 기능 구현</li>
                <li><span className="font-medium">Federation 설계</span>(선택): 마이크로서비스 환경에서 여러 GraphQL 서비스 통합</li>
              </ol>
            </div>
          </div>
        </SolutionSection>

        {/* 해결책 2: TanStack Query, Zustand, FSD 활용 */}
        <SolutionSection
          title="2. TanStack Query, Zustand, FSD의 전면적 활용"
          description="서버 상태와 클라이언트 상태의 명확한 분리, 데이터 중심 UI 설계로 복잡한 인터페이스 구현"
        >
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-3 text-blue-700">핵심 문제 해결</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✘</span>
                  <div>
                    <span className="font-medium">기존 문제: useState와 props drilling으로 인한 복잡성</span>
                    <p className="text-sm text-gray-600">다중 탭 UI, 분할 패널 등 복잡한 인터페이스 상태 관리의 어려움</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium">해결책: 데이터 중심 UI 설계와 상태 관리 패턴 적용</span>
                    <p className="text-sm text-gray-600">TanStack Query로 서버 상태 관리, Zustand로 UI 상태 관리 분리</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3 text-blue-700">TanStack Query 활용</h4>
                <ul className="space-y-2">
                  <StarBullet>
                    <span className="font-medium">서버 상태 관리 전문화</span>
                    <p className="text-sm text-gray-600">캐싱, 동기화, 백그라운드 갱신 등 자동화</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">GraphQL 연동 최적화</span>
                    <p className="text-sm text-gray-600">복잡한 계층형 데이터 처리 간소화</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">로딩/에러 상태 관리</span>
                    <p className="text-sm text-gray-600">상태 처리 로직 간소화 및 일관성 확보</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">Stale-While-Revalidate 패턴</span>
                    <p className="text-sm text-gray-600">빠른 UI 응답과 최신 데이터 보장</p>
                  </StarBullet>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3 text-blue-700">Zustand 활용</h4>
                <ul className="space-y-2">
                  <StarBullet>
                    <span className="font-medium">최소한의 보일러플레이트</span>
                    <p className="text-sm text-gray-600">Redux 대비 90% 이상 코드 감소</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">직관적인 API</span>
                    <p className="text-sm text-gray-600">간결한 상태 접근 및 업데이트 방식</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">상태 구독 최적화</span>
                    <p className="text-sm text-gray-600">불필요한 리렌더링 방지로 성능 향상</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">컴포넌트 외부 접근</span>
                    <p className="text-sm text-gray-600">상태를 React 외부에서도 접근 가능</p>
                  </StarBullet>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3 text-blue-700">FSD 아키텍처 활용</h4>
                <ul className="space-y-2">
                  <StarBullet>
                    <span className="font-medium">기능 중심 폴더 구조</span>
                    <p className="text-sm text-gray-600">효율적인 코드 탐색 및 관리</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">의존성 규칙 명확화</span>
                    <p className="text-sm text-gray-600">계층화된 아키텍처로 의존성 관리</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">팀 협업 효율화</span>
                    <p className="text-sm text-gray-600">기능별 작업 분배 용이</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">확장성 보장</span>
                    <p className="text-sm text-gray-600">새로운 기능 추가가 쉽고 명확함</p>
                  </StarBullet>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <CodeExample
                title="Zustand 기반 탭 관리 스토어"
                language="typescript"
                code={`// store/tabStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// 인터페이스 정의
interface Tab {
  id: string;
  title: string;
  panelId: string;
  content: React.ReactNode;
  isDirty?: boolean;
}

interface Panel {
  id: string;
  tabs: string[];
  parentId?: string;
  direction?: 'horizontal' | 'vertical';
  size?: number;
  children?: string[];
}

interface TabState {
  tabs: Record<string, Tab>;
  panels: Record<string, Panel>;
  activeTabIds: Record<string, string>;
  
  // 액션
  activateTab: (tabId: string) => void;
  addTab: (tab: Omit<Tab, 'id'>) => string;
  splitPanel: (panelId: string, direction: 'horizontal' | 'vertical') => void;
  moveTab: (tabId: string, targetPanelId: string) => void;
  removeTab: (tabId: string) => void;
  resizePanel: (panelId: string, size: number) => void;
}

// Zustand 스토어 생성 (Immer 미들웨어 사용)
export const useTabStore = create<TabState>()(
  immer((set) => ({
    // 초기 상태
    tabs: {},
    panels: { 'main': { id: 'main', tabs: [] } },
    activeTabIds: {},
    
    // 탭 활성화
    activateTab: (tabId) => set((state) => {
      const tab = state.tabs[tabId];
      if (!tab) return;
      
      state.activeTabIds[tab.panelId] = tabId;
    }),
    
    // 탭 추가
    addTab: (tab) => {
      const id = \`tab-\${Date.now()}\`;
      
      set((state) => {
        const panel = state.panels[tab.panelId];
        if (!panel) return;
        
        state.tabs[id] = { ...tab, id };
        state.panels[tab.panelId].tabs.push(id);
        state.activeTabIds[tab.panelId] = id;
      });
      
      return id;
    },
    
    // 패널 분할
    splitPanel: (panelId, direction) => set((state) => {
      const panel = state.panels[panelId];
      if (!panel) return;
      
      // 새 패널 ID 생성
      const leftId = \`panel-\${Date.now()}-left\`;
      const rightId = \`panel-\${Date.now()}-right\`;
      
      // 탭 분배 (반반씩)
      const tabs = [...panel.tabs];
      const leftTabs = tabs.slice(0, Math.ceil(tabs.length / 2));
      const rightTabs = tabs.slice(Math.ceil(tabs.length / 2));
      
      // 1. 원본 패널을 컨테이너로 변경
      state.panels[panelId] = {
        ...panel,
        tabs: [],
        direction,
        children: [leftId, rightId]
      };
      
      // 2. 왼쪽/오른쪽 패널 생성
      state.panels[leftId] = {
        id: leftId,
        tabs: leftTabs,
        parentId: panelId,
        size: 50
      };
      
      state.panels[rightId] = {
        id: rightId,
        tabs: rightTabs,
        parentId: panelId,
        size: 50
      };
      
      // 3. 탭의 소속 패널 업데이트
      leftTabs.forEach(tabId => {
        state.tabs[tabId].panelId = leftId;
      });
      
      rightTabs.forEach(tabId => {
        state.tabs[tabId].panelId = rightId;
      });
      
      // 4. 활성 탭 설정
      delete state.activeTabIds[panelId];
      
      if (leftTabs.length > 0) {
        state.activeTabIds[leftId] = leftTabs[0];
      }
      
      if (rightTabs.length > 0) {
        state.activeTabIds[rightId] = rightTabs[0];
      }
    }),
    
    // 탭 이동
    moveTab: (tabId, targetPanelId) => set((state) => {
      const tab = state.tabs[tabId];
      if (!tab) return;
      
      const sourcePanel = state.panels[tab.panelId];
      const targetPanel = state.panels[targetPanelId];
      if (!sourcePanel || !targetPanel) return;
      
      // 1. 원본 패널에서 탭 제거
      const tabIndex = sourcePanel.tabs.indexOf(tabId);
      if (tabIndex !== -1) {
        sourcePanel.tabs.splice(tabIndex, 1);
      }
      
      // 2. 대상 패널에 탭 추가
      targetPanel.tabs.push(tabId);
      
      // 3. 탭의 패널 ID 업데이트
      tab.panelId = targetPanelId;
      
      // 4. 활성 탭 업데이트
      if (sourcePanel.tabs.length > 0) {
        state.activeTabIds[sourcePanel.id] = sourcePanel.tabs[0];
      } else {
        delete state.activeTabIds[sourcePanel.id];
      }
      
      state.activeTabIds[targetPanelId] = tabId;
    }),
    
    // 탭 제거
    removeTab: (tabId) => set((state) => {
      const tab = state.tabs[tabId];
      if (!tab) return;
      
      const panel = state.panels[tab.panelId];
      if (!panel) return;
      
      // 1. 패널에서 탭 제거
      const tabIndex = panel.tabs.indexOf(tabId);
      if (tabIndex !== -1) {
        panel.tabs.splice(tabIndex, 1);
      }
      
      // 2. 탭 객체 제거
      delete state.tabs[tabId];
      
      // 3. 활성 탭 업데이트
      if (state.activeTabIds[tab.panelId] === tabId) {
        if (panel.tabs.length > 0) {
          state.activeTabIds[tab.panelId] = panel.tabs[0];
        } else {
          delete state.activeTabIds[tab.panelId];
        }
      }
    }),
    
    // 패널 크기 조정
    resizePanel: (panelId, size) => set((state) => {
      const panel = state.panels[panelId];
      if (!panel) return;
      
      panel.size = size;
    })
  }))
);`}
              />

              <CodeExample
                title="FSD 아키텍처 기반 폴더 구조"
                language="bash"
                code={`src/
├── app/              # 애플리케이션 진입점 (메인 레이아웃)
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
│
├── shared/           # 공유 리소스 (전역에서 재사용)
│   ├── api/          # API 클라이언트, 타입
│   ├── lib/          # 유틸리티, 헬퍼 함수
│   ├── config/       # 환경 설정, 상수
│   └── ui/           # 기본 UI 컴포넌트 (버튼, 입력 등)
│
├── entities/         # 비즈니스 엔티티 (도메인 모델)
│   ├── campaign/     # 캠페인 관련 
│   │   ├── ui/       # 재사용 가능한 관련 컴포넌트
│   │   ├── model/    # 타입, 인터페이스, 스토어
│   │   └── api/      # 엔티티 관련 API 호출
│   │
│   ├── agent/        # 상담원 관련
│   └── call/         # 통화 관련
│
├── features/         # 기능 구현 (사용자 역량)
│   ├── create-campaign/
│   ├── filter-agents/
│   ├── monitor-calls/
│   └── tab-management/   # 탭 관리 기능
│       ├── ui/           # 탭 UI 컴포넌트
│       ├── model/        # 탭 상태 관리 (Zustand 스토어)
│       └── lib/          # 헬퍼 함수
│
├── widgets/          # 복합 UI 컴포넌트 (페이지의 구성 요소)
│   ├── header/
│   ├── sidebar/
│   ├── campaign-list/
│   ├── agent-monitor/
│   └── call-dashboard/
│
└── pages/            # 페이지 컴포넌트 (URL 라우트)
    ├── dashboard/
    ├── campaigns/
    ├── agents/
    ├── calls/
    └── settings/`}
              />
            </div>

            <CodeExample
              title="TanStack Query + GraphQL + Zustand 통합 예시"
              language="typescript"
              code={`// features/monitor-calls/model/use-calls-data.ts
import { useQuery } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';
import { useCallsStore } from './calls-store';
import { useTabStore } from '@/features/tab-management/model/tab-store';

// GraphQL 쿼리 정의
const ACTIVE_CALLS_QUERY = gql\`
  query GetActiveCalls($campaignId: ID!) {
    campaign(id: $campaignId) {
      id
      name
      activeCalls {
        id
        startTime
        duration
        customerName
        status
        agentId
        agent {
          name
          status
        }
      }
    }
  }
\`;

// TanStack Query + GraphQL + Zustand 통합 커스텀 훅
export function useActiveCalls(campaignId: string) {
  const { setActiveCalls, selectCall } = useCallsStore();
  const { addTab } = useTabStore();
  
  // TanStack Query로 GraphQL 데이터 가져오기
  const queryResult = useQuery({
    queryKey: ['activeCalls', campaignId],
    queryFn: async () => {
      const data = await request('/graphql', ACTIVE_CALLS_QUERY, { campaignId });
      return data.campaign.activeCalls;
    },
    // 실시간 요구사항에 맞게 자동 갱신 주기 설정
    refetchInterval: 5000,
    // 데이터 변경 시 Zustand 스토어 업데이트
    onSuccess: (data) => {
      setActiveCalls(data);
    }
  });
  
  // 통화 세부 정보 탭으로 열기 함수
  const openCallDetails = (callId: string) => {
    const callData = queryResult.data?.find(c => c.id === callId);
    if (!callData) return;
    
    // 1. Zustand 상태 업데이트로 선택 통화 설정
    selectCall(callId);
    
    // 2. 탭 관리 스토어를 통해 새 탭 생성
    addTab({
      title: "통화:" + callData.customerName,
      panelId: 'main',
      content: <CallDetailsPanel callId={callId} />
    });
  };
  
  return {
    ...queryResult,
    openCallDetails
  };
}

// 컴포넌트에서 사용
function ActiveCallsMonitor({ campaignId }) {
  const { data, isLoading, error, openCallDetails } = useActiveCalls(campaignId);
  
  if (isLoading) return <Spinner />;
  if (error) return <ErrorAlert message={error.message} />;
  
  return (
    <div className="grid gap-4">
      {data.map(call => (
        <CallCard 
          key={call.id}
          call={call}
          onClick={() => openCallDetails(call.id)}
        />
      ))}
    </div>
  );
}`}
            />

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3 text-blue-700">추천 교육 자료 및 도구</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResourceCard
                  title="TanStack Query"
                  description="서버 상태 관리 라이브러리 공식 문서"
                  link="https://tanstack.com/query/latest/docs/react/overview"
                />
                <ResourceCard
                  title="Zustand"
                  description="간결한, 고성능 상태 관리 라이브러리"
                  link="https://zustand-demo.pmnd.rs/"
                />
                <ResourceCard
                  title="Feature-Sliced Design"
                  description="프론트엔드 아키텍처 방법론"
                  link="https://feature-sliced.design/"
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mt-6">
              <h4 className="font-medium mb-2 text-yellow-800">구현 전략 및 로드맵</h4>
              <ol className="list-decimal pl-6 space-y-1 text-yellow-800">
                <li><span className="font-medium">FSD 아키텍처 설계</span>: 프로젝트 폴더 구조 재구성, 의존성 규칙 설정</li>
                <li><span className="font-medium">Zustand 스토어 설계</span>: 핵심 UI 상태(탭, 패널 등) 모델링</li>
                <li><span className="font-medium">TanStack Query 통합</span>: GraphQL 클라이언트 구성 및 커스텀 훅 개발</li>
                <li><span className="font-medium">컴포넌트 리팩토링</span>: 데이터 중심 UI 패턴으로 컴포넌트 전환</li>
                <li><span className="font-medium">재사용 가능한 패턴 추출</span>: 공통 패턴을 shared/entities 레이어로 분리</li>
                <li><span className="font-medium">스토리북 문서화</span>: 컴포넌트 문서화 및 시각적 테스트</li>
              </ol>
            </div>
          </div>
        </SolutionSection>

        {/* 해결책 3: 업무 관리 프로젝트 및 AI 활용 */}
        <SolutionSection
          title="3. 업무 관리 프로젝트 고도화 및 AI 활용 능력 강화"
          description="팀 역량 향상과 지식 공유, AI 기반 코드 품질 개선 및 CTI 시스템의 인공지능 기능 구현"
        >
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-3 text-blue-700">핵심 접근 방식</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium">AI 코드 리뷰 및 품질 개선 자동화</span>
                    <p className="text-sm text-gray-600">GitHub Actions와 AI를 활용한 코드 품질 자동 검사 및 개선 제안</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium">CTI 시스템의 AI 기능 구현</span>
                    <p className="text-sm text-gray-600">음성 분석, 감정 분석, 통화 요약 등 AI 기반 고급 기능 도입</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <div>
                    <span className="font-medium">학습 공유 시스템 구축</span>
                    <p className="text-sm text-gray-600">지식 베이스 구축 및 정기적인 기술 교육으로 팀 역량 향상</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium mb-3 text-blue-700">AI 코드 리뷰 시스템</h4>
                <ul className="space-y-2">
                  <StarBullet>
                    <span className="font-medium">GitHub Actions 통합 자동화</span>
                    <p className="text-sm text-gray-600">PR 제출 시 자동 코드 리뷰 실행</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">코드 품질 체크 자동화</span>
                    <p className="text-sm text-gray-600">패턴 준수, 성능 이슈, 보안 취약점 검사</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">리팩토링 제안</span>
                    <p className="text-sm text-gray-600">더 나은 패턴 및 최적화 방법 제안</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">코드 스타일 일관성 유지</span>
                    <p className="text-sm text-gray-600">팀 코딩 컨벤션 자동 적용 및 검사</p>
                  </StarBullet>
                </ul>

                <div className="mt-4">
                  <CodeExample
                    title="AI 코드 리뷰 GitHub Actions 설정"
                    language="yaml"
                    code={`# .github/workflows/ai-code-review.yml
name: AI Code Review

on:
  pull_request:
    types: [opened, synchronize]
    
jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
          
      - name: Get changed files
        id: changed-files
        uses: tj-actions/changed-files@v35
          
      - name: Run AI Code Review
        uses: anthropic/claude-code-review@v1
        with:
          api-key: \${{ secrets.CLAUDE_API_KEY }}
          files: \${{ steps.changed-files.outputs.all_changed_files }}
          rules: |
            - GraphQL 쿼리 패턴 검증
            - TanStack Query 패턴 검사
            - Zustand 스토어 설계 검증
            - FSD 폴더 구조 준수 여부
            - 성능 최적화 제안
            - 타입 안전성 검사
            
      - name: Comment PR
        uses: actions/github-script@v6
        with:
          github-token: \${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review.md', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: review
            });`}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-3 text-blue-700">CTI 시스템의 AI 기능</h4>
                <ul className="space-y-2">
                  <StarBullet>
                    <span className="font-medium">음성-텍스트 변환 (STT)</span>
                    <p className="text-sm text-gray-600">실시간 통화 내용 텍스트 변환</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">고객 감정 분석</span>
                    <p className="text-sm text-gray-600">통화 중 감정 변화 감지 및 알림</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">통화 자동 요약</span>
                    <p className="text-sm text-gray-600">핵심 내용 추출 및 요약 생성</p>
                  </StarBullet>
                  <StarBullet>
                    <span className="font-medium">상담원 응대 추천</span>
                    <p className="text-sm text-gray-600">RAG 기반 실시간 대응 스크립트 제안</p>
                  </StarBullet>
                </ul>

                <div className="mt-4">
                  <CodeExample
                    title="통화 분석 AI 통합 예시"
                    language="typescript"
                    code={`// features/call-analytics/api/analyze-call.ts
import { OpenAI } from 'openai';
import { CallAnalysis, SentimentAnalysis } from '../model/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeCallAudio(audioUrl: string): Promise<CallAnalysis> {
  try {
    // 1. 음성-텍스트 변환 (Whisper API)
    const transcription = await openai.audio.transcriptions.create({
      file: await fetchAudioFile(audioUrl),
      model: "whisper-1",
      language: "ko",
    });
    
    // 2. 텍스트 기반 감정 분석
    const sentimentResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "고객 통화 내용에서 감정 상태를 분석하세요. 전체적인 감정 상태와 분노, 기쁨, 슬픔 등의 감정 수치를 0-1 사이로 반환하세요."
        },
        {
          role: "user",
          content: transcription.text
        }
      ],
      response_format: { type: "json_object" }
    });
    
    // 3. 통화 내용 요약 생성
    const summaryResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "고객 통화 내용을 3-5문장으로 요약하세요. 핵심 요점, 고객 요청사항, 주요 문제점을 포함하세요."
        },
        {
          role: "user",
          content: transcription.text
        }
      ]
    });
    
    // 4. 키워드 추출
    const keywordsResponse = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "고객 통화 내용에서 핵심 키워드 5-10개를 추출하세요. JSON 배열 형태로 반환하세요."
        },
        {
          role: "user",
          content: transcription.text
        }
      ],
      response_format: { type: "json_object" }
    });
    
    // 결과 통합 및 반환
    const sentiment = JSON.parse(sentimentResponse.choices[0].message.content) as SentimentAnalysis;
    const keywords = JSON.parse(keywordsResponse.choices[0].message.content).keywords;
    
    return {
      transcription: transcription.text,
      sentiment,
      keywords,
      summary: summaryResponse.choices[0].message.content
    };
  } catch (error) {
    console.error('Call analysis failed:', error);
    throw new Error('통화 분석 중 오류가 발생했습니다');
  }
}`}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3 text-blue-700">학습 공유 시스템 구축</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h5 className="font-medium text-blue-600 mb-2">정기 기술 스터디</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>주간 기술 세미나 (2시간)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>핵심 기술별 담당자 지정</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>실습 중심 워크숍</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>녹화 및 자료 아카이빙</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h5 className="font-medium text-blue-600 mb-2">지식 베이스 구축</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Notion/Confluence 위키</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>설계 문서 및 아키텍처 다이어그램</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>트러블슈팅 사례 공유</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>모범 사례 및 패턴 문서화</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h5 className="font-medium text-blue-600 mb-2">맞춤형 학습 경로</h5>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>개발자별 역량 진단</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>맞춤형 학습 계획 수립</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>멘토링 시스템 운영</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>정기 역량 평가 및 피드백</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-medium mb-3 text-blue-700">추천 교육 자료 및 도구</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ResourceCard
                  title="OpenAI API 활용"
                  description="AI 기능 구현을 위한 OpenAI API 활용법"
                  link="https://platform.openai.com/docs/guides/speech-to-text"
                />
                <ResourceCard
                  title="RAG 기반 AI 상담 지원"
                  description="검색 증강 생성 기반 AI 응대 시스템 구축"
                  link="https://github.com/vercel-labs/ai-chatbot"
                />
                <ResourceCard
                  title="AI 코드 리뷰 도구"
                  description="GitHub Actions를 활용한 자동화된 코드 리뷰"
                  link="https://github.com/marketplace/actions/ai-code-reviewer"
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mt-6">
              <h4 className="font-medium mb-2 text-yellow-800">구현 전략 및 로드맵</h4>
              <ol className="list-decimal pl-6 space-y-1 text-yellow-800">
                <li><span className="font-medium">AI 코드 리뷰 파이프라인 구축</span>: GitHub Actions 워크플로우 설정 및 규칙 정의</li>
                <li><span className="font-medium">CTI 음성 분석 PoC 개발</span>: 음성-텍스트 변환, 감정 분석 기능 프로토타입 구현</li>
                <li><span className="font-medium">지식 베이스 템플릿 구축</span>: Notion/Confluence 지식 베이스 구조 설계</li>
                <li><span className="font-medium">주간 기술 스터디 계획 수립</span>: 6개월 로드맵 설계 및 담당자 지정</li>
                <li><span className="font-medium">온보딩 프로세스 개선</span>: 신규 개발자를 위한 체계적인 온보딩 시스템 구축</li>
                <li><span className="font-medium">RAG 기반 상담 지원 시스템 개발</span>: 상담사 실시간 응대 지원 시스템 구축</li>
              </ol>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-3 text-blue-700">보일러플레이트 템플릿 제안</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h5 className="font-medium text-blue-600 mb-2">GraphQL + Spring Boot DGS</h5>
                  <p className="text-sm mb-3">DGS 프레임워크 기반 GraphQL API 서버 템플릿</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Federation 및 Subscription 지원</li>
                    <li>• 배치 로더 패턴 구현</li>
                    <li>• 코드 생성 자동화 설정</li>
                  </ul>
                  <div className="mt-3 text-right">
                    <a href="https://github.com/Netflix/dgs-framework-java" className="text-blue-600 hover:text-blue-800 text-sm">참고 소스</a>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h5 className="font-medium text-blue-600 mb-2">Next.js + TanStack Query + Zustand</h5>
                  <p className="text-sm mb-3">현대적 프론트엔드 상태 관리 템플릿</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• GraphQL 클라이언트 통합</li>
                    <li>• FSD 아키텍처 폴더 구조</li>
                    <li>• 데이터 중심 UI 패턴</li>
                  </ul>
                  <div className="mt-3 text-right">
                    <a href="https://github.com/trpc/trpc-next-app-dir-example" className="text-blue-600 hover:text-blue-800 text-sm">참고 소스</a>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h5 className="font-medium text-blue-600 mb-2">TAP UI 시스템</h5>
                  <p className="text-sm mb-3">패널 분할 및 탭 관리 UI 시스템 템플릿</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 드래그 앤 드롭 패널 이동</li>
                    <li>• 크기 조절 가능한 분할 패널</li>
                    <li>• 상태 기반 UI 구현</li>
                  </ul>
                  <div className="mt-3 text-right">
                    <a href="https://github.com/react-grid-layout/react-grid-layout" className="text-blue-600 hover:text-blue-800 text-sm">참고 소스</a>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h5 className="font-medium text-blue-600 mb-2">RAG 기반 AI 상담 지원 시스템</h5>
                  <p className="text-sm mb-3">상담사 실시간 지원 AI 시스템 템플릿</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• OpenAI/Claude API 통합</li>
                    <li>• 벡터 DB 기반 지식 검색</li>
                    <li>• 실시간 응대 추천</li>
                  </ul>
                  <div className="mt-3 text-right">
                    <a href="https://github.com/vercel-labs/ai-chatbot" className="text-blue-600 hover:text-blue-800 text-sm">참고 소스</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SolutionSection>


      </div>
    </div>
  );
};

export default KeyStrategies;