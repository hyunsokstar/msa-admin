// src/app/strategy-report-for-web-cti/TechnicalIssues.tsx
'use client';

import React, { useState } from 'react';

// 가독성을 위해 아이콘 컴포넌트 (실제 프로젝트에서는 SVG 아이콘 라이브러리 사용 권장)
const LightBulbIcon = () => <span className="mr-2">💡</span>;
const WarningIcon = () => <span className="mr-2 text-yellow-500">⚠️</span>;
const CheckIcon = () => <span className="mr-2 text-green-500">✅</span>;
const ProblemIcon = () => <span className="mr-2 text-red-500">🔴</span>;
const CodeIcon = () => <span className="mr-1.5">💻</span>;
const BackendIcon = () => <span className="mr-2">🛠️</span>;


export const TechnicalIssues: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabTitles = [
    "복잡한 폼 구현",
    "복잡한 모니터링",
    "복잡한 UI 구현"
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-slate-50 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold text-slate-800 mb-8 text-center">
        기존 프로젝트의 주요 기술적 과제
      </h3>

      {/* 탭 네비게이션 */}
      <div className="flex justify-center border-b border-slate-300 mb-8">
        {tabTitles.map((title, index) => (
          <button
            key={index}
            className={`px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base transition-all duration-300 ease-in-out transform focus:outline-none
              ${activeTab === index
                ? 'border-b-3 border-blue-600 text-blue-700 scale-105'
                : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-t-md'
              }
            `}
            onClick={() => setActiveTab(index)}
          >
            {index + 1}. {title}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md min-h-[400px]">
        {/* 탭 콘텐츠 - 복잡한 폼 */}
        {activeTab === 0 && (
          <div className="animate-fadeIn">
            <h4 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
              <CodeIcon /> {tabTitles[0]}: 문제점 및 해결 방안
            </h4>
            <p className="text-base text-slate-700 mb-6 leading-relaxed">
              기존 프로젝트에서는 다양한 입력 필드가 포함된 복잡한 폼을 <code>useState</code>와 <code>props drilling</code> 방식으로 관리하면서,
              코드 가독성 및 유지보수성이 크게 저하되었습니다. 입력값 검증, 상태 초기화, 동적 필드 처리에 있어 비효율적이며 오류 발생 가능성이 높은 구조였습니다.
            </p>

            <div className="mb-6 bg-rose-50 p-4 rounded-lg border border-rose-200">
              <p className="mb-2 font-semibold text-rose-700 flex items-center"><ProblemIcon />기존 방식의 주요 문제점:</p>
              <pre className="bg-slate-800 text-slate-100 p-4 rounded-md text-sm font-mono overflow-auto shadow-inner">{
                `// 부모 컴포넌트
function ParentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // ... 수십 개의 useState 선언
  // ... 수많은 검증 함수와 props 전달
  return (
    <form>
      <PersonalInfoFields name={name} setName={setName} ... />
      <ContactFields phone={phone} setPhone={setPhone} ... />
      {/* 더 많은 props drilling... */}
    </form>
  );
}`}</pre>
            </div>

            <div className="bg-sky-50 p-6 rounded-lg border border-sky-200 shadow-sm">
              <h5 className="text-xl font-semibold text-sky-700 mb-3 flex items-center"><LightBulbIcon />Zustand를 활용한 해결책</h5>
              <p className="text-slate-700 mb-4 text-sm">
                상태 관리를 <code>Zustand</code> 기반으로 전환하여 글로벌 스토어를 중심으로 구성하면, 로직 분리와 재사용성이 크게 개선될 수 있습니다.
                모든 컴포넌트에서 직접 스토어에 접근하여 props drilling 없이 상태 관리가 가능해집니다.
              </p>
              <pre className="bg-slate-800 text-slate-100 p-4 rounded-md text-sm font-mono overflow-auto shadow-inner">
                {`// store/formStore.ts
import { create } from 'zustand';

interface FormState { /* ... 상태 및 액션 타입 정의 ... */ }

export const useFormStore = create<FormState>((set, get) => ({
  name: '', email: '', phone: '', address: '', errors: {},
  setField: (field, value) => { /* ... */ },
  validateField: (field) => { /* ... */ },
  resetForm: () => { /* ... */ }
}));

// EmailField.tsx
import { useFormStore } from '../store/formStore';

export const EmailField = () => {
  const { email, errors, setField, validateField } = useFormStore();
  return (
    <div>
      <input /* ... */ />
      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
    </div>
  );
};`}</pre>
            </div>
          </div>
        )}

        {/* 탭 콘텐츠 - 복잡한 모니터링 */}
        {activeTab === 1 && (
          <div className="animate-fadeIn">
            <h4 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
              <CodeIcon /> {tabTitles[1]}: 문제점 및 해결 방안
            </h4>

            <div className="mb-6 bg-rose-50 p-4 rounded-lg border border-rose-200">
              <p className="text-lg font-semibold text-rose-700 mb-2 flex items-center"><ProblemIcon />문제 상황</p>
              <ul className="list-disc pl-6 text-slate-700 space-y-1 leading-relaxed">
                <li>계층형 데이터를 각각 <code>useEffect</code>로 API 호출하여 과도한 요청 발생</li>
                <li>중첩된 상태 로직과 비동기 처리로 인한 유지보수 어려움</li>
                <li>느린 렌더링 및 불필요한 트래픽 유발로 인한 성능 저하</li>
              </ul>
              <p className="mt-3 mb-1 font-semibold text-slate-600 text-sm">기존 코드 예시 (문제점):</p>
              <pre className="bg-slate-800 text-slate-100 p-4 rounded-md text-sm font-mono overflow-auto shadow-inner">{
                `// MonitoringPage.tsx
useEffect(() => { /* 캠페인 목록 가져오기 */ }, []);
useEffect(() => { /* 각 캠페인별 상담원 목록 가져오기 - N번 호출 */ }, [campaigns]);
useEffect(() => { /* 각 상담원별 상태 정보 가져오기 - M번 호출 */ }, [agents]);
// ... 엄청난 수의 API 호출과 복잡한 상태 관리
`}</pre>
            </div>

            <div className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-300">
              <h5 className="text-lg font-semibold text-amber-700 mb-2 flex items-center"><WarningIcon />병렬 요청의 위험성</h5>
              <p className="text-slate-700 leading-relaxed">
                대량의 계층형 데이터를 실시간으로 다루는 모니터링 페이지에서 무분별한 병렬 요청은 서버 과부하, 네트워크 병목, 그리고 프론트엔드의 리렌더링 지옥을 초래하는 주요 <strong>안티 패턴</strong>입니다.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200 shadow-sm">
                <h5 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center"><BackendIcon />백엔드 개선 방향</h5>
                <p className="text-slate-700 mb-2 text-sm">
                  하나의 API 호출로 필요한 모든 데이터를 계층적으로 제공하는 <strong>배치(Batch) API 또는 Full DTO</strong> 방식이 필요합니다.
                </p>
                <pre className="bg-slate-800 text-slate-100 p-3 rounded-md text-xs font-mono overflow-auto shadow-inner">{
                  `// GET /api/monitoring/overview
[
  {
    "campaignId": 1, "campaignName": "A 캠페인",
    "agents": [
      { "id": 101, "name": "홍길동", "status": "통화중" },
      { "id": 102, "name": "김영희", "status": "대기" }
    ]
  }
  // ...
]`}</pre>
              </div>

              <div className="bg-sky-50 p-6 rounded-lg border border-sky-200 shadow-sm">
                <h5 className="text-xl font-semibold text-sky-700 mb-3 flex items-center"><CheckIcon />GraphQL 도입 고려</h5>
                <p className="text-slate-700 mb-2 text-sm">
                  GraphQL을 도입하면 클라이언트가 필요한 데이터 구조를 직접 정의하여 <strong>단일 쿼리</strong>로 받아올 수 있어,
                  복잡한 연쇄 요청을 제거하고 프론트엔드 구조를 단순화할 수 있습니다. 폴링(Polling)을 통한 실시간 업데이트도 용이합니다.
                </p>
                <pre className="bg-slate-800 text-slate-100 p-3 rounded-md text-xs font-mono overflow-auto shadow-inner">
                  {`// GraphQL 쿼리 예시
query GetMonitoringOverview {
  campaigns {
    id name
    agents {
      id name status { status lastUpdated }
    }
  }
}

// React 컴포넌트
const { data } = useQuery(MONITORING_QUERY, { pollInterval: 5000 });`}</pre>
              </div>
            </div>
          </div>
        )}

        {/* 탭 콘텐츠 - 복잡한 UI */}
        {activeTab === 2 && (
          <div className="animate-fadeIn">
            <h4 className="text-2xl font-semibold text-blue-700 mb-6 flex items-center">
              <CodeIcon /> {tabTitles[2]}: 문제점 및 해결 방안
            </h4>
            <p className="text-base text-slate-700 mb-6 leading-relaxed">
              기존 프로젝트의 다중 탭 UI 및 분할 콘텐츠 영역은 UI 중심 설계에 치우쳐 있어 컴포넌트 간 상태 공유, 탭 전환 시 동기화 이슈가 자주 발생했습니다.
              복잡한 동적 UI에서는 먼저 <strong>데이터 모델(상태)을 명확히 정의하고, UI는 이 상태의 결과로 파생</strong>되도록 설계해야 합니다.
            </p>

            <div className="mb-6 bg-rose-50 p-4 rounded-lg border border-rose-200">
              <p className="text-lg font-semibold text-rose-700 mb-2 flex items-center"><ProblemIcon />UI 중심 설계의 문제점 예시</p>
              <p className="text-slate-700 mb-2 text-sm">UI 요소들을 직접 제어하려 할 때 발생하는 복잡성과 상태 동기화 문제입니다.</p>
              <pre className="bg-slate-800 text-slate-100 p-4 rounded-md text-sm font-mono overflow-auto shadow-inner">
                {`// UI 중심 설계 - 문제가 많은 접근법
function WorkspaceTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [tabs, setTabs] = useState([ /* ... */ ]);
  const [isSplit, setIsSplit] = useState(false);
  // ... 수많은 UI 상태와 이를 직접 조작하는 함수들
  // ... 분할 시 각 영역의 활성 탭 관리는? 동기화는?
  
  return ( /* 복잡한 조건부 렌더링과 상태 관리 로직 혼재 */ );
}`}</pre>
            </div>

            <div className="bg-sky-50 p-6 rounded-lg border border-sky-200 shadow-sm mb-6">
              <h5 className="text-xl font-semibold text-sky-700 mb-4 flex items-center"><LightBulbIcon />데이터 중심 탭/패널 관리 구조 (Zustand 활용)</h5>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h6 className="text-md font-semibold text-sky-600 mb-2">패널과 탭의 관계 정의</h6>
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                    <li><strong>패널은 트리 구조:</strong> 탭을 담거나(단말), 자식 패널(컨테이너)을 가짐.</li>
                    <li><strong>패널 유형:</strong> 탭 홀더(<code>tabs</code> 배열) 또는 컨테이너(<code>children</code> 배열).</li>
                    <li><strong>탭은 항상 패널에 속함:</strong> <code>panelId</code>로 소속 패널 참조.</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-md font-semibold text-sky-600 mb-2">데이터 흐름 프로세스</h6>
                  <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
                    <li><strong>패널 생성:</strong> 최초 'root' 패널에서 시작, 분할/추가로 트리 구성.</li>
                    <li><strong>탭 추가:</strong> 특정 패널의 <code>tabs</code> 배열에 탭 ID 추가.</li>
                    <li><strong>패널 분할:</strong> 기존 패널은 컨테이너가 되고, 새 자식 패널들에 탭 분배.</li>
                    <li><strong>UI 자동 구성:</strong> 정의된 패널-탭 상태 모델 기반으로 UI 자동 렌더링.</li>
                  </ol>
                </div>
              </div>

              <h6 className="text-md font-semibold text-sky-600 mb-1">상태 모델 예시 (Zustand):</h6>
              <pre className="bg-slate-800 text-slate-100 p-3 rounded-md text-xs font-mono overflow-auto shadow-inner mb-4">
                {`// useTabStore.ts
export const useTabStore = create((set) => ({
  tabs: { /* 'tab-1': { id, title, panelId, content } */ },
  panels: { /* 'panel-1': { id, tabs: [], children: [], direction: 'horizontal' } */ },
  activeTabIds: { /* 'panel-1': 'tab-1' */ },
  panelTreeRoot: 'rootPanelId', // 패널 트리의 시작점
  
  addTab: (tabData, panelId) => { /* ... */ },
  splitPanel: (panelIdToSplit, direction) => { /* ... */ },
  moveTab: (tabId, targetPanelId) => { /* ... */ },
  setActiveTab: (panelId, tabId) => { /* ... */ },
}))`}</pre>

              <h6 className="text-md font-semibold text-sky-600 mb-1">재귀적 패널 렌더링 컴포넌트 예시:</h6>
              <pre className="bg-slate-800 text-slate-100 p-3 rounded-md text-xs font-mono overflow-auto shadow-inner">
                {`// TabPanel.tsx
export const TabPanel = ({ panelId }) => {
  const panel = useTabStore(s => s.panels[panelId]);
  // ... (zustand에서 필요한 상태와 액션 가져오기)

  if (!panel) return null;

  if (panel.children && panel.children.length > 0) { // 컨테이너 패널
    return (
      <SplitView direction={panel.direction}>
        {panel.children.map(childId => <TabPanel key={childId} panelId={childId} />)}
      </SplitView>
    );
  }
  
  // 탭 홀더 패널 (실제 탭 UI 렌더링)
  const activeTabId = useTabStore(s => s.activeTabIds[panelId]);
  const tabsInPanel = panel.tabs.map(id => useTabStore(s => s.tabs[id]));
  
  return (
    <div>
      <div className="tab-headers">
        {tabsInPanel.map(tab => <TabHeader key={tab.id} tab={tab} isActive={tab.id === activeTabId} />)}
      </div>
      <div className="tab-content">
        {tabsInPanel.find(t => t.id === activeTabId)?.content}
      </div>
    </div>
  );
};`}
              </pre>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200 shadow-sm">
              <h5 className="text-xl font-semibold text-emerald-700 mb-3 flex items-center"><CheckIcon />데이터 중심 설계의 핵심 이점</h5>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 leading-relaxed">
                <li><strong>상태와 UI의 명확한 분리:</strong> 데이터 구조가 UI를 결정합니다.</li>
                <li><strong>예측 가능한 상태 변화:</strong> 모든 UI 변경은 정의된 액션을 통해서만 발생합니다.</li>
                <li><strong>확장성 및 유지보수성 향상:</strong> 새 기능 추가/변경 시 상태 모델 확장이 용이합니다.</li>
                <li><strong>디버깅 용이성:</strong> 상태 변화만 추적하면 되어 복잡한 UI 버그 해결이 쉬워집니다.</li>
                <li><strong>테스트 용이성:</strong> UI와 분리된 상태 로직은 단위 테스트가 간단합니다.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TechnicalIssues;