// src/app/strategy-report-for-web-cti/TechnicalIssues.tsx
'use client';

import React, { useState } from 'react';

export const TechnicalIssues: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // 탭 콘텐츠 제목
  const tabTitles = [
    "복잡한 폼 구현의 문제",
    "복잡한 모니터링 페이지의 문제",
    "복잡한 UI 구현의 문제"
  ];

  return (
    <section className="mb-16">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">기존 프로젝트의 주요 기술적 문제</h3>
      
      {/* 탭 네비게이션 */}
      <div className="flex border-b mb-6">
        {tabTitles.map((title, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === index 
                ? 'border-b-2 border-blue-500 text-blue-700 -mb-px' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {index + 1}. {title}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 - 복잡한 폼 */}
      {activeTab === 0 && (
        <div className="mb-6 animate-fadeIn">
          <h4 className="text-xl font-medium text-blue-500 mb-2">1. 복잡한 폼 구현의 문제</h4>
          <p className="text-base text-gray-800">
            기존 프로젝트에서는 다양한 입력 필드가 포함된 복잡한 폼을 <code>useState</code>와 <code>props drilling</code> 방식으로 관리하면서,
            코드 가독성 및 유지보수성이 크게 떨어졌습니다. 입력값 검증, 상태 초기화, 동적 필드 처리에 있어 비효율적이며 오류를 유발하기 쉬운 구조였습니다.
            상태 관리를 <code>Zustand</code> 기반으로 전환하여 글로벌 스토어를 중심으로 구성하면, 로직 분리와 재사용성이 크게 개선될 수 있습니다.
          </p>
          
          <div className="mt-4 bg-gray-100 p-4 rounded-md text-sm font-mono text-gray-700">
            <p className="mb-1 font-bold">기존 방식 (문제):</p>
            <pre>{`// 부모 컴포넌트
function ParentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  // ... 수십 개의 useState

  const validateEmail = (email) => {
    // 이메일 검증 로직
  };

  const validatePhone = (phone) => {
    // 전화번호 검증 로직
  };

  // ... 기타 검증 함수들

  return (
    <form>
      <PersonalInfoFields
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        validateEmail={validateEmail}
      />
      <ContactFields
        phone={phone}
        setPhone={setPhone}
        validatePhone={validatePhone}
      />
      {/* 더 많은 props drilling이 발생하는 자식 컴포넌트들 */}
    </form>
  );
}`}</pre>
          </div>
          
          <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-200">
            <h5 className="font-semibold text-blue-700 mb-2">💡 Zustand를 활용한 해결책</h5>
            <pre className="bg-white p-3 rounded text-sm overflow-auto border border-gray-200">
{`// store/formStore.ts
import { create } from 'zustand';

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  errors: Record<string, string>;
  
  setField: (field: string, value: string) => void;
  validateField: (field: string) => boolean;
  resetForm: () => void;
}

export const useFormStore = create<FormState>((set, get) => ({
  name: '',
  email: '',
  phone: '',
  address: '',
  errors: {},
  
  setField: (field, value) => {
    set({ [field]: value });
    // 입력 시 해당 필드 오류 초기화
    set(state => ({
      errors: {
        ...state.errors,
        [field]: ''
      }
    }));
  },
  
  validateField: (field) => {
    const state = get();
    let isValid = true;
    let errorMessage = '';
    
    // 필드별 검증 로직
    switch (field) {
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);
        errorMessage = isValid ? '' : '유효한 이메일 주소를 입력해주세요';
        break;
      case 'phone':
        isValid = /^\d{3}-\d{3,4}-\d{4}$/.test(state.phone);
        errorMessage = isValid ? '' : '000-0000-0000 형식으로 입력해주세요';
        break;
      // 다른 필드 검증 로직...
    }
    
    // 오류 상태 업데이트
    set(state => ({
      errors: {
        ...state.errors,
        [field]: errorMessage
      }
    }));
    
    return isValid;
  },
  
  resetForm: () => {
    set({
      name: '',
      email: '',
      phone: '',
      address: '',
      errors: {}
    });
  }
}));`}</pre>
            
            <p className="mt-4 text-gray-800">
              이제 모든 컴포넌트에서 직접 스토어에 접근하면 props drilling 없이 상태 관리가 가능합니다:
            </p>
            
            <pre className="mt-2 bg-white p-3 rounded text-sm overflow-auto border border-gray-200">
{`// EmailField.tsx
import { useFormStore } from '../store/formStore';

export const EmailField = () => {
  const { email, errors, setField, validateField } = useFormStore();
  
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setField('email', e.target.value)}
        onBlur={() => validateField('email')}
      />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
    </div>
  );
};`}</pre>
          </div>
        </div>
      )}

      {/* 탭 콘텐츠 - 복잡한 모니터링 */}
      {activeTab === 1 && (
        <div className="mb-6 animate-fadeIn">
          <h4 className="text-xl font-medium text-blue-500 mb-2">2. 복잡한 모니터링 페이지의 문제</h4>

          <div className="mb-3">
            <p className="text-base text-gray-800 font-semibold mb-1">🔴 문제</p>
            <ul className="list-disc pl-6 text-base text-gray-800 space-y-1">
              <li>계층형 데이터를 각각 <code>useEffect</code>로 API 호출 → 과도한 요청 발생</li>
              <li>중첩된 상태 로직과 비동기 처리로 인해 유지보수 어려움</li>
              <li>렌더링 및 트래픽 부하로 인해 성능 저하 발생</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-md text-sm font-mono text-gray-700 mb-3">
            <p className="mb-1 font-bold">기존 코드 예시 (문제):</p>
            <pre>{`// MonitoringPage.tsx
import { useState, useEffect } from 'react';

export default function MonitoringPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [agents, setAgents] = useState({});
  const [agentStatuses, setAgentStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // 1. 캠페인 목록 가져오기
  useEffect(() => {
    fetch('/api/campaigns')
      .then(res => res.json())
      .then(data => setCampaigns(data))
      .catch(err => setError('캠페인 정보를 불러오는데 실패했습니다.'));
  }, []);
  
  // 2. 각 캠페인별 상담원 목록 가져오기
  useEffect(() => {
    if (campaigns.length > 0) {
      const newAgents = {};
      
      // 각 캠페인마다 API 호출 - 과도한 요청 발생!
      campaigns.forEach(campaign => {
        fetch(\`/api/campaigns/\${campaign.id}/agents\`)
          .then(res => res.json())
          .then(data => {
            newAgents[campaign.id] = data;
            setAgents(prev => ({ ...prev, [campaign.id]: data }));
          })
          .catch(err => setError('상담원 정보를 불러오는데 실패했습니다.'));
      });
    }
  }, [campaigns]);
  
  // 3. 각 상담원별 상태 정보 가져오기
  useEffect(() => {
    const allAgents = [];
    Object.values(agents).forEach(campaignAgents => {
      allAgents.push(...campaignAgents);
    });
    
    // 각 상담원마다 별도 API 호출 - 과도한 요청 발생!
    allAgents.forEach(agent => {
      fetch(\`/api/agents/\${agent.id}/status\`)
        .then(res => res.json())
        .then(data => {
          setAgentStatuses(prev => ({ ...prev, [agent.id]: data }));
        })
        .catch(err => console.error(err));
    });
    
    if (allAgents.length > 0) {
      setLoading(false);
    }
  }, [agents]);
  
  // 렌더링...
}`}</pre>
          </div>

          <div className="mb-3">
            <p className="text-base text-gray-800 font-semibold mb-1">🛠️ 백엔드 개선 방향</p>
            <p className="text-base text-gray-800">
              하나의 호출로 필요한 모든 데이터를 내려주는 <strong>배치 API 또는 Full DTO</strong> 제공이 필요합니다.
            </p>
            <div className="bg-gray-100 p-4 rounded-md text-sm font-mono text-gray-700 mt-2">
              <pre>{`GET /api/monitoring/overview`}</pre>
              <pre>{`[
  {
    "campaignId": 1,
    "campaignName": "A 캠페인",
    "agents": [
      { "id": 101, "name": "홍길동", "status": "통화중" },
      { "id": 102, "name": "김영희", "status": "대기" }
    ]
  }
]`}</pre>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-base text-red-700 font-semibold mb-1">⚠️ 병렬 요청은 관리형 프로젝트에서 <strong>안티 패턴</strong></p>
            <p className="text-base text-gray-800">
              대량의 계층형 데이터를 실시간으로 다루는 모니터링 페이지에서는 병렬 요청이 서버 과부하, 트래픽 병목, 리렌더링 지옥을 유발합니다.
            </p>
          </div>

          <div className="mb-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-base text-gray-800 font-semibold mb-1">✅ 구조적 대안 - GraphQL</p>
            <p className="text-base text-gray-800 mb-2">
              GraphQL을 도입하면 캠페인-상담원-상태 데이터를 <strong>단일 쿼리</strong>로 받아올 수 있어,
              복잡한 연쇄 요청을 제거하고 프론트 구조를 단순화할 수 있습니다.
            </p>
            
            <pre className="bg-white p-3 rounded text-sm overflow-auto border border-gray-200">
{`// GraphQL 쿼리 예시
const MONITORING_QUERY = gql\`
  query GetMonitoringOverview {
    campaigns {
      id
      name
      agents {
        id
        name
        status {
          status
          lastUpdated
          currentCall {
            customerId
            startTime
            duration
          }
        }
      }
    }
  }
\`;

// React 컴포넌트에서 사용
function MonitoringPage() {
  const { loading, error, data } = useQuery(MONITORING_QUERY, {
    pollInterval: 5000, // 5초마다 실시간 업데이트
  });
  
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} />;
  
  return (
    <div>
      {data.campaigns.map(campaign => (
        <CampaignCard 
          key={campaign.id}
          campaign={campaign}
        />
      ))}
    </div>
  );
}`}</pre>
          </div>
        </div>
      )}

      {/* 탭 콘텐츠 - 복잡한 UI */}
      {activeTab === 2 && (
        <div className="mb-6 animate-fadeIn">
          <h4 className="text-xl font-medium text-blue-500 mb-2">3. 복잡한 UI 구현의 문제</h4>
          <p className="text-base text-gray-800 mb-4">
            기존 프로젝트의 다중 탭 UI 및 분할 콘텐츠 영역은 UI 중심 설계에 치우쳐 있어 컴포넌트 간 상태 공유, 탭 전환 시 동기화 이슈가 자주 발생했습니다.
            복잡한 탭 구조에서는 UI보다 먼저 <strong>탭, 패널, 활성 상태 등의 상태 모델을 Zustand로 정의하고, UI는 그 결과로 구성</strong>되어야 합니다.
          </p>

          {/* UI 중심 설계의 문제점 예시 추가 */}
          <div className="mb-5 bg-gray-100 p-4 rounded-md">
            <p className="text-base font-semibold text-red-700 mb-2">UI 중심 설계 예시 (문제)</p>
            <pre className="text-sm font-mono text-gray-700 overflow-auto">
{`// UI 중심 설계 - 문제가 많은 접근법
function WorkspaceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([
    { title: '상담원 정보' },
    { title: '고객 정보' }
  ]);
  
  // 새 탭 추가 함수
  const addTab = (title) => {
    setTabs([...tabs, { title }]);
    setActiveTab(tabs.length); // 새 탭으로 이동
  };
  
  // 분할 보기 구현 (복잡한 UI 변환 로직)
  const [isSplit, setIsSplit] = useState(false);
  const [splitTabs, setSplitTabs] = useState({ left: [], right: [] });
  
  const splitView = () => {
    // 복잡한 상태 변환 및 UI 분할 로직
    setIsSplit(true);
    setSplitTabs({
      left: tabs.slice(0, Math.ceil(tabs.length / 2)),
      right: tabs.slice(Math.ceil(tabs.length / 2))
    });
    // 동기화 문제: 각 영역의 활성 탭은 어떻게 관리?
  };

  return (
    <div>
      {!isSplit ? (
        <div>
          <div className="tab-headers">
            {tabs.map((tab, index) => (
              <button 
                key={index}
                onClick={() => setActiveTab(index)}
                className={activeTab === index ? 'active' : ''}
              >
                {tab.title}
              </button>
            ))}
            <button onClick={() => addTab('새 탭')}>+</button>
          </div>
          <div className="tab-content">
            {activeTab === 0 && <AgentInfoContent />}
            {activeTab === 1 && <CustomerInfoContent />}
            {/* 각 탭마다 조건부 렌더링... 확장성 떨어짐 */}
          </div>
          <button onClick={splitView}>화면 분할</button>
        </div>
      ) : (
        <SplitViewComponent 
          leftTabs={splitTabs.left} 
          rightTabs={splitTabs.right} 
        />
        // 분할 후 상태 관리 복잡성 증가, 동기화 문제 발생
      )}
    </div>
  );
}`}</pre>
          </div>

          {/* 데이터 중심 탭 관리 구조 */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h5 className="text-lg font-semibold text-blue-700 mb-3">데이터 중심 탭 관리 구조</h5>
            
            <div className="mb-4">
              <h6 className="text-base font-semibold text-blue-600 mb-2">패널과 탭의 관계 구조</h6>
              <ul className="list-disc pl-6 text-base text-gray-800 space-y-1">
                <li><strong>패널은 트리 구조:</strong> 패널은 탭을 담는 말단 노드이거나, 자식 패널을 포함하는 컨테이너 노드</li>
                <li><strong>패널 유형:</strong> 탭 홀더 패널(tabs 속성) 또는 컨테이너 패널(children 속성)</li>
                <li><strong>탭은 항상 패널에 속함:</strong> 모든 탭은 panelId로 소속 패널을 참조</li>
              </ul>
            </div>
            
            <div className="mb-4">
              <h6 className="text-base font-semibold text-blue-600 mb-2">데이터 흐름 프로세스</h6>
              <ol className="list-decimal pl-6 text-base text-gray-800 space-y-1">
                <li><strong>패널 생성:</strong> 최초 'main' 패널에서 시작해 분할/추가로 패널 트리 구성</li>
                <li><strong>탭 추가:</strong> 특정 패널에 탭 추가 시 해당 패널의 tabs 배열에 탭 ID 추가</li>
                <li><strong>패널 분할:</strong> 기존 패널은 컨테이너가 되고, 새 자식 패널들에 탭 분배</li>
                <li><strong>UI 자동 구성:</strong> 패널-탭 상태 기반으로 UI 컴포넌트 자동 렌더링</li>
              </ol>
            </div>
            
            {/* 패널 상태 모델 예시 코드 */}
            <div className="mb-4">
              <h6 className="text-base font-semibold text-blue-600 mb-2">상태 모델 예시:</h6>
              <pre className="bg-white p-3 rounded text-sm font-mono overflow-auto border border-gray-200">
{`// Zustand 스토어 예시
export const useTabStore = create((set) => ({
  // 상태
  tabs: {
    'tab-1': { id: 'tab-1', title: '상담원 정보', panelId: 'main', content: <AgentInfo /> },
    'tab-2': { id: 'tab-2', title: '고객 정보', panelId: 'main', content: <CustomerInfo /> }
  },
  panels: {
    'main': { id: 'main', tabs: ['tab-1', 'tab-2'] }
  },
  activeTabIds: { 'main': 'tab-1' },
  
  // 액션 함수
  addTab: (tab) => { /* 구현 */ },
  splitPanel: (panelId, direction) => { /* 구현 */ },
  moveTab: (tabId, targetPanelId) => { /* 구현 */ }
}))`}</pre>
            </div>
            
            {/* 구현 예시 - 재귀적 패널 렌더링 */}
            <div>
              <h6 className="text-base font-semibold text-blue-600 mb-2">구현 예시 - TabPanel 컴포넌트</h6>
              <pre className="bg-white p-3 rounded text-sm font-mono overflow-auto border border-gray-200">
{`// TabPanel.tsx - 재귀적 렌더링으로 복잡한 UI 구현
export const TabPanel = ({ panelId }) => {
  const { tabs, panels, activeTabIds } = useTabStore();
  const panel = panels[panelId];
  
  if (!panel) return null;
  
  // 컨테이너 패널이면 자식 패널들을 분할 뷰로 렌더링
  if (panel.children && panel.children.length > 0) {
    return <SplitView direction={panel.direction} panelIds={panel.children} />;
  }
  
  // 탭 홀더 패널이면 탭 헤더와 내용 렌더링
  const activeTabId = activeTabIds[panelId];
  const activeTab = activeTabId ? tabs[activeTabId] : null;
  
  return (
    <div className="flex flex-col h-full border">
      <div className="flex border-b">
        {panel.tabs.map(tabId => (
          <TabHeader key={tabId} tab={tabs[tabId]} isActive={tabId === activeTabId} />
        ))}
        <button>+</button>
      </div>
      <div className="flex-grow overflow-auto">
        {activeTab ? activeTab.content : <div>선택된 탭 없음</div>}
      </div>
    </div>
  );
};`}</pre>
            </div>
          </div>

          {/* 데이터 중심 설계의 이점 */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
            <h5 className="text-lg font-semibold text-green-700 mb-3">데이터 중심 설계의 핵심 이점</h5>
            <ul className="list-disc pl-6 text-base text-gray-800 space-y-2">
              <li><strong>상태와 UI의 명확한 분리:</strong> 데이터 구조가 먼저, UI는 그에 따른 결과물</li>
              <li><strong>확장성:</strong> 새 기능 추가 시 상태 모델만 확장하면 UI 자동 반영</li>
              <li><strong>디버깅 용이성:</strong> 상태 변화만 추적하면 되어 복잡한 UI 버그 해결 쉬움</li>
              <li><strong>예측 가능한 데이터 흐름:</strong> 모든 UI 변경은 상태 액션을 통해서만 발생</li>
              <li><strong>테스트 용이성:</strong> UI와 분리된 상태 로직은 단위 테스트 간단</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

// 애니메이션 스타일 추가
export default TechnicalIssues;