// app/strategy-report-for-web-cti/page.tsx

'use client';

import React from 'react';
import KeyStrategies from './SolutionSection';
import ImplementationRoadmap from './ImplementationRoadmap';
import EnhancedLearningResources from './EnhancedLearningResources';

const StrategyReport = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        차기 웹 CTI 프로젝트 전략 보고서
      </h1>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4 text-blue-700 border-b pb-2">1. 서론</h2>
        <p className="text-lg mb-4">
          본 보고서는 차기 웹 CTI(Computer Telephony Integration) 프로젝트의 효율적인 개발 방향을 수립하기 위해 작성되었습니다.
          실시간 상담 시스템, 모니터링 기능, 다중 탭 UI 등 복잡한 요구사항을 가진 기존 프로젝트에서 발견된 핵심 기술적 문제를 바탕으로,
          생산성 향상과 유지보수성 개선을 위한 전략적 기술 스택 도입과 설계 전환이 필요합니다.
        </p>
        <p className="text-lg mb-4">
          특히, Next.js 기반의 프론트엔드 구조는 최신 트렌드인 Zustand, TanStack Query, GraphQL 등을 적극 활용함으로써
          데이터 흐름 중심의 구조로 개선할 수 있으며, 이는 개발 속도는 물론 사용자 경험까지 크게 향상시킬 수 있습니다.
        </p>
      </section>

      <section className="mb-16">
        <h3 className="text-2xl font-semibold text-blue-600 mb-4">기존 프로젝트의 주요 기술적 문제</h3>

        {/* ✅ 1. 복잡한 폼 */}
        <div className="mb-6">
          <h4 className="text-xl font-medium text-blue-500 mb-2">1. 복잡한 폼 구현의 문제</h4>
          <p className="text-base text-gray-800">
            기존 프로젝트에서는 다양한 입력 필드가 포함된 복잡한 폼을 <code>useState</code>와 <code>props drilling</code> 방식으로 관리하면서,
            코드 가독성 및 유지보수성이 크게 떨어졌습니다. 입력값 검증, 상태 초기화, 동적 필드 처리에 있어 비효율적이며 오류를 유발하기 쉬운 구조였습니다.
            상태 관리를 <code>Zustand</code> 기반으로 전환하여 글로벌 스토어를 중심으로 구성하면, 로직 분리와 재사용성이 크게 개선될 수 있습니다.
          </p>
        </div>

        {/* ✅ 2. 복잡한 모니터링 */}
        <div className="mb-6">
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
            <p className="mb-1 font-bold">예시 코드:</p>
            <pre>{`useEffect(() => {
  fetch('/api/campaigns');
  fetch('/api/campaigns/1/agents');
  fetch('/api/campaigns/2/agents');
  fetch('/api/agents/1/status');
}, []);`}</pre>
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

          <div className="mb-3">
            <p className="text-base text-gray-800 font-semibold mb-1">✅ 구조적 대안 - GraphQL</p>
            <p className="text-base text-gray-800">
              GraphQL을 도입하면 캠페인-상담원-상태 데이터를 <strong>단일 쿼리</strong>로 받아올 수 있어,
              복잡한 연쇄 요청을 제거하고 프론트 구조를 단순화할 수 있습니다.
            </p>
          </div>
        </div>

        {/* ✅ 3. UI 구조 문제 - 코드 예제 추가 */}
        <div className="mb-6">
          <h4 className="text-xl font-medium text-blue-500 mb-2">3. 복잡한 UI 구현의 문제</h4>
          <p className="text-base text-gray-800 mb-4">
            기존 프로젝트의 다중 탭 UI 및 분할 콘텐츠 영역은 UI 중심 설계에 치우쳐 있어 컴포넌트 간 상태 공유, 탭 전환 시 동기화 이슈가 자주 발생했습니다.
            복잡한 탭 구조에서는 UI보다 먼저 <strong>탭, 패널, 활성 상태 등의 상태 모델을 Zustand로 정의하고, UI는 그 결과로 구성</strong>되어야 합니다.
          </p>

          {/* 데이터 중심 탭 관리 구조 설명 */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h5 className="text-lg font-semibold text-blue-700 mb-3">데이터 중심 탭 관리 구조</h5>

            {/* 패널-탭 구조 설명 추가 */}
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

            {/* 1단계 - 기본 1분할 구조 */}
            <div className="mb-4 border-b pb-4">
              <h6 className="text-base font-semibold text-blue-600 mb-2">1단계: 초기 1분할 구조</h6>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold mb-2">📊 상태 구조:</p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {`{
  tabs: {
    'tab-1': { id: 'tab-1', title: '상담원 정보', panelId: 'main' },
    'tab-2': { id: 'tab-2', title: '고객 정보', panelId: 'main' },
    'tab-3': { id: 'tab-3', title: '통화 내역', panelId: 'main' }
  },
  panels: {
    'main': { 
      id: 'main', 
      tabs: ['tab-1', 'tab-2', 'tab-3'] 
    }
  },
  activeTabIds: {
    'main': 'tab-1'
  }
}`}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">🖥️ UI 구조:</p>
                  <div className="font-mono text-xs whitespace-pre overflow-x-auto bg-gray-100 p-3 rounded">
                    {`+----------------------------------------------+
|                    main                     |
+----------------------------------------------+
| [Tab-1] [Tab-2] [Tab-3]                     |
|----------------------------------------------|
|                                              |
|                                              |
|             (활성 탭 내용)                   |
|                                              |
|                                              |
+----------------------------------------------+`}
                  </div>
                </div>
              </div>
            </div>

            {/* 2단계 - 2분할 구조 */}
            <div className="mb-4 border-b pb-4">
              <h6 className="text-base font-semibold text-blue-600 mb-2">2단계: 2분할 구조 (수평)</h6>
              <p className="text-sm mb-2">main 패널을 수평으로 분할 (<code>splitPanel('main', 'horizontal')</code>):</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold mb-2">📊 상태 구조:</p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {`{
  tabs: {
    'tab-1': { id: 'tab-1', title: '상담원 정보', panelId: 'panel-left' },
    'tab-2': { id: 'tab-2', title: '고객 정보', panelId: 'panel-left' },
    'tab-3': { id: 'tab-3', title: '통화 내역', panelId: 'panel-right' }
  },
  panels: {
    'main': { 
      id: 'main', 
      tabs: [], 
      children: ['panel-left', 'panel-right'],
      direction: 'horizontal'
    },
    'panel-left': {
      id: 'panel-left',
      tabs: ['tab-1', 'tab-2'],
      parentId: 'main',
      size: 50
    },
    'panel-right': {
      id: 'panel-right',
      tabs: ['tab-3'],
      parentId: 'main',
      size: 50
    }
  },
  activeTabIds: {
    'panel-left': 'tab-1',
    'panel-right': 'tab-3'
  }
}`}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">🖥️ UI 구조:</p>
                  <div className="font-mono text-xs whitespace-pre overflow-x-auto bg-gray-100 p-3 rounded">
                    {`+----------------------------------------------+
|                    main                     |
+----------------------------------------------+
|                     |                        |
|                     |                        |
|                     |                        |
|                     |                        |
|    panel-left       |      panel-right       |
|  [Tab-1] [Tab-2]    |      [Tab-3]           |
|                     |                        |
|                     |                        |
|                     |                        |
+---------------------+------------------------+`}
                  </div>
                </div>
              </div>
            </div>

            {/* 3단계 - 3분할 구조 */}
            <div className="mb-4">
              <h6 className="text-base font-semibold text-blue-600 mb-2">3단계: 3분할 구조 (수직 분할 추가)</h6>
              <p className="text-sm mb-2">왼쪽 패널을 수직으로 분할 (<code>splitPanel('panel-left', 'vertical')</code>):</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold mb-2">📊 상태 구조:</p>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                    {`{
  tabs: {
    'tab-1': { id: 'tab-1', title: '상담원 정보', panelId: 'panel-left-top' },
    'tab-2': { id: 'tab-2', title: '고객 정보', panelId: 'panel-left-bottom' },
    'tab-3': { id: 'tab-3', title: '통화 내역', panelId: 'panel-right' }
  },
  panels: {
    'main': { 
      id: 'main', 
      tabs: [], 
      children: ['panel-left', 'panel-right'],
      direction: 'horizontal'
    },
    'panel-left': {
      id: 'panel-left',
      tabs: [],
      parentId: 'main',
      size: 50,
      children: ['panel-left-top', 'panel-left-bottom'],
      direction: 'vertical'
    },
    'panel-left-top': {
      id: 'panel-left-top',
      tabs: ['tab-1'],
      parentId: 'panel-left',
      size: 50
    },
    'panel-left-bottom': {
      id: 'panel-left-bottom',
      tabs: ['tab-2'],
      parentId: 'panel-left',
      size: 50
    },
    'panel-right': {
      id: 'panel-right',
      tabs: ['tab-3'],
      parentId: 'main',
      size: 50
    }
  },
  activeTabIds: {
    'panel-left-top': 'tab-1',
    'panel-left-bottom': 'tab-2',
    'panel-right': 'tab-3'
  }
}`}
                  </pre>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">🖥️ UI 구조:</p>
                  <div className="font-mono text-xs whitespace-pre overflow-x-auto bg-gray-100 p-3 rounded">
                    {`+----------------------------------------------+
|                    main                     |
+----------------------------------------------+
|                     |                        |
|   panel-left-top    |                        |
|     [Tab-1]         |                        |
|---------------------|     panel-right        |
|                     |                        |
| panel-left-bottom   |       [Tab-3]          |
|     [Tab-2]         |                        |
|                     |                        |
+---------------------+------------------------+`}
                  </div>
                </div>
              </div>
            </div>

            {/* 4단계 - 복잡한 다중 분할 */}
            <div className="mb-4">
              <h6 className="text-base font-semibold text-blue-600 mb-2">4단계: 복잡한 다중 분할 구조</h6>
              <p className="text-sm mb-2">추가 탭이 있는 복잡한 다중 분할 레이아웃:</p>

              <div className="font-mono text-xs mb-4 whitespace-pre overflow-x-auto bg-gray-100 p-3 rounded">
                {`+-----------------------------------------------------------------------------------------------+
|                                           main                                               |
+-----------------------------------------------------------------------------------------------+
|                         |                                                                     |
|                         |                                                                     |
|                         |                              panel-right                            |
|                         |   +----------------------------------------------------------+      |
|                         |   |                |                                          |     |
|                         |   |  panel-right-  |                                          |     |
|        panel-left       |   |     top       |                                          |     |
|                         |   |   [Tab-3]     |           panel-right-bottom             |     |
|                         |   |   [Tab-4]     |                                          |     |
|   [Tab-1]               |   |               |   +-------------------+------------------+     |
|   [Tab-2]               |   |               |   |                   |                  |     |
|                         |   |               |   | panel-right-      | panel-right-     |     |
|                         |   |               |   | bottom-left       | bottom-right     |     |
|                         |   |               |   |                   |                  |     |
|                         |   |               |   | [Tab-5]           | [Tab-6]          |     |
|                         |   |               |   | [Tab-7]           |                  |     |
|                         |   |               |   |                   |                  |     |
+-------------------------+---+---------------+---+-------------------+------------------+-----+`}
              </div>

              <p className="text-sm font-semibold mb-2">📊 복잡한 다중 분할 상태 구조:</p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                {`{
  tabs: {
    'tab-1': { id: 'tab-1', title: '상담원 정보', panelId: 'panel-left', content: ... },
    'tab-2': { id: 'tab-2', title: '고객 정보', panelId: 'panel-left', content: ... },
    'tab-3': { id: 'tab-3', title: '통화 내역', panelId: 'panel-right-top', content: ... },
    'tab-4': { id: 'tab-4', title: '메모', panelId: 'panel-right-top', content: ... },
    'tab-5': { id: 'tab-5', title: '상품 정보', panelId: 'panel-right-bottom-left', content: ... },
    'tab-6': { id: 'tab-6', title: '캠페인 정보', panelId: 'panel-right-bottom-right', content: ... },
    'tab-7': { id: 'tab-7', title: '스크립트', panelId: 'panel-right-bottom-left', content: ... }
  },
  panels: {
    // 최상위 컨테이너 (좌측 패널과 우측 패널로 수평 분할)
    'main': { 
      id: 'main', 
      tabs: [], 
      children: ['panel-left', 'panel-right'], 
      direction: 'horizontal' 
    },
    
    // 좌측 패널 (탭 2개)
    'panel-left': { 
      id: 'panel-left', 
      tabs: ['tab-1', 'tab-2'], 
      parentId: 'main', 
      size: 30 
    },
    
    // 우측 패널 (수직 분할된 컨테이너)
    'panel-right': { 
      id: 'panel-right', 
      tabs: [], 
      children: ['panel-right-top', 'panel-right-bottom'], 
      parentId: 'main', 
      direction: 'vertical',
      size: 70 
    },
    
    // 우측 상단 패널 (탭 2개)
    'panel-right-top': { 
      id: 'panel-right-top', 
      tabs: ['tab-3', 'tab-4'], 
      parentId: 'panel-right', 
      size: 40 
    },
    
    // 우측 하단 패널 (수평 분할된 컨테이너)
    'panel-right-bottom': { 
      id: 'panel-right-bottom', 
      tabs: [], 
      children: ['panel-right-bottom-left', 'panel-right-bottom-right'], 
      parentId: 'panel-right', 
      direction: 'horizontal',
      size: 60 
    },
    
    // 우측 하단 좌측 패널 (탭 2개)
    'panel-right-bottom-left': { 
      id: 'panel-right-bottom-left', 
      tabs: ['tab-5', 'tab-7'], 
      parentId: 'panel-right-bottom', 
      size: 50 
    },
    
    // 우측 하단 우측 패널 (탭 1개)
    'panel-right-bottom-right': { 
      id: 'panel-right-bottom-right', 
      tabs: ['tab-6'], 
      parentId: 'panel-right-bottom', 
      size: 50 
    }
  },
  
  // 각 패널별 활성 탭
  activeTabIds: {
    'panel-left': 'tab-1',
    'panel-right-top': 'tab-3',
    'panel-right-bottom-left': 'tab-5',
    'panel-right-bottom-right': 'tab-6'
  }
}`}
              </pre>
            </div>

            <div className="mb-4">
              <h6 className="text-base font-semibold text-blue-600 mb-2">주요 액션 작동 방식</h6>

              <div className="bg-white p-3 rounded border border-gray-200 mb-3">
                <p className="font-semibold mb-1">📌 패널 분할 액션</p>
                <pre className="text-xs bg-gray-100 p-2 rounded">
                  {`splitPanel('panel-right-bottom-left', 'vertical') 액션 후:

panels: {
  // ... 기존 패널들 ...
  
  // 변경된 패널 (이제 컨테이너가 됨)
  'panel-right-bottom-left': { 
    id: 'panel-right-bottom-left', 
    tabs: [], // 탭이 비워짐
    children: ['panel-rblt', 'panel-rblb'], // 새 자식 패널들
    parentId: 'panel-right-bottom', 
    direction: 'vertical',
    size: 50 
  },
  
  // 새로 생성된 상단 패널
  'panel-rblt': { 
    id: 'panel-rblt', 
    tabs: ['tab-5'], // 탭-5는 상단 패널로
    parentId: 'panel-right-bottom-left', 
    size: 50 
  },
  
  // 새로 생성된 하단 패널
  'panel-rblb': { 
    id: 'panel-rblb', 
    tabs: ['tab-7'], // 탭-7은 하단 패널로
    parentId: 'panel-right-bottom-left', 
    size: 50 
  }
}`}
                </pre>
              </div>

              <div className="bg-white p-3 rounded border border-gray-200">
                <p className="font-semibold mb-1">📌 탭 이동 액션</p>
                <pre className="text-xs bg-gray-100 p-2 rounded">
                  {`moveTab('tab-3', 'panel-right-bottom-right') 액션 후:

tabs: {
  // ... 기존 탭들 ...
  'tab-3': { 
    id: 'tab-3', 
    title: '통화 내역', 
    panelId: 'panel-right-bottom-right', // panelId 변경됨
    content: ... 
  }
},

panels: {
  // ... 기존 패널들 ...
  
  // 탭이 제거된 원본 패널
  'panel-right-top': { 
    id: 'panel-right-top', 
    tabs: ['tab-4'], // tab-3 제거됨
    parentId: 'panel-right', 
    size: 40 
  },
  
  // 탭이 추가된 대상 패널
  'panel-right-bottom-right': { 
    id: 'panel-right-bottom-right', 
    tabs: ['tab-6', 'tab-3'], // tab-3 추가됨
    parentId: 'panel-right-bottom', 
    size: 50 
  }
},

// 활성 탭 업데이트
activeTabIds: {
  // ... 기존 활성 탭들 ...
  'panel-right-top': 'tab-4', // tab-4로 변경
  'panel-right-bottom-right': 'tab-3' // 이동된 탭으로 활성화
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Zustand 스토어 핵심 코드 */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold text-blue-600 mb-3">Zustand 탭 관리 스토어 핵심 코드</h5>
            <div className="bg-gray-100 p-4 rounded-md text-sm font-mono text-gray-700 overflow-auto">
              <pre>{`// store/tabStore.ts
import { create } from 'zustand';

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

// 탭 스토어 생성
export const useTabStore = create((set) => ({
  // 상태
  tabs: {},
  panels: { 'main': { id: 'main', tabs: [] } },
  activeTabIds: {},
  
  // 액션 - 필수 핵심 기능만 간략화
  
  // 1. 탭 추가: 특정 패널에 새 탭 추가
  addTab: (tab) => {
    const id = \`tab-\${Date.now()}\`;
    
    set((state) => {
      const { panelId } = tab;
      const panel = state.panels[panelId];
      
      // 패널이 없으면 무시
      if (!panel) return state;
      
      // 패널에 탭 추가 및 활성 탭으로 설정
      return {
        tabs: { ...state.tabs, [id]: { ...tab, id } },
        panels: { 
          ...state.panels, 
          [panelId]: { ...panel, tabs: [...panel.tabs, id] } 
        },
        activeTabIds: { ...state.activeTabIds, [panelId]: id }
      };
    });
    
    return id;
  },
  
  // 2. 패널 분할: 패널을 두 개의 자식 패널로 분할
  splitPanel: (panelId, direction) => {
    set((state) => {
      const panel = state.panels[panelId];
      if (!panel) return state;
      
      // 새 패널 ID 생성
      const leftId = \`panel-\${Date.now()}-left\`;
      const rightId = \`panel-\${Date.now()}-right\`;
      
      // 탭 분배 (반반씩)
      const tabs = [...panel.tabs];
      const leftTabs = tabs.slice(0, Math.ceil(tabs.length / 2));
      const rightTabs = tabs.slice(Math.ceil(tabs.length / 2));
      
      // 업데이트된 상태
      const updatedPanels = { ...state.panels };
      const updatedTabs = { ...state.tabs };
      const updatedActiveTabIds = { ...state.activeTabIds };
      
      // 1. 원본 패널을 컨테이너로 변경
      updatedPanels[panelId] = {
        ...panel,
        tabs: [],
        direction,
        children: [leftId, rightId]
      };
      
      // 2. 왼쪽/오른쪽 패널 생성
      updatedPanels[leftId] = {
        id: leftId,
        tabs: leftTabs,
        parentId: panelId,
        size: 50
      };
      
      updatedPanels[rightId] = {
        id: rightId,
        tabs: rightTabs,
        parentId: panelId,
        size: 50
      };
      
      // 3. 탭의 소속 패널 업데이트
      leftTabs.forEach(tabId => {
        updatedTabs[tabId] = { ...updatedTabs[tabId], panelId: leftId };
      });
      
      rightTabs.forEach(tabId => {
        updatedTabs[tabId] = { ...updatedTabs[tabId], panelId: rightId };
      });
      
      // 4. 활성 탭 설정
      delete updatedActiveTabIds[panelId];
      
      if (leftTabs.length > 0) {
        updatedActiveTabIds[leftId] = leftTabs[0];
      }
      
      if (rightTabs.length > 0) {
        updatedActiveTabIds[rightId] = rightTabs[0];
      }
      
      return {
        tabs: updatedTabs,
        panels: updatedPanels,
        activeTabIds: updatedActiveTabIds
      };
    });
  }
}))`}</pre>
            </div>
          </div>

          {/* 핵심 컴포넌트 - 간략화 */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold text-blue-600 mb-3">핵심 탭 컴포넌트 구조</h5>
            <div className="bg-gray-100 p-4 rounded-md text-sm font-mono text-gray-700 overflow-auto">
              <pre>{`// 핵심 컴포넌트 구조
import React from 'react';
import { useTabStore } from '../store/tabStore';

// 1. 탭 헤더 컴포넌트 - 탭 제목과 닫기 버튼
export const TabHeader = ({ tab, isActive }) => {
  const { activateTab, removeTab } = useTabStore();
  
  return (
    <div 
      className={\`flex items-center px-4 py-2 \${isActive ? 'bg-blue-100 text-blue-700' : ''}\`}
      onClick={() => activateTab(tab.id)}
    >
      <span>{tab.title}</span>
      {tab.isDirty && <span className="text-red-500">●</span>}
      <button onClick={(e) => { e.stopPropagation(); removeTab(tab.id); }}>×</button>
    </div>
  );
};

// 2. 탭 패널 컴포넌트 - 패널 타입에 따라 다르게 렌더링
export const TabPanel = ({ panelId }) => {
  const { tabs, panels, activeTabIds, addTab, splitPanel } = useTabStore();
  const panel = panels[panelId];
  
  // 패널이 없으면 null 반환
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
      {/* 탭 헤더 바 */}
      <div className="flex border-b">
        {panel.tabs.map(tabId => (
          <TabHeader 
            key={tabId} 
            tab={tabs[tabId]} 
            isActive={tabId === activeTabId} 
          />
        ))}
        <button onClick={() => addTab({ title: '새 탭', panelId, content: <div>빈 탭</div> })}>+</button>
      </div>
      
      {/* 탭 내용 */}
      <div className="flex-grow overflow-auto">
        {activeTab ? activeTab.content : <div>선택된 탭 없음</div>}
      </div>
      
      {/* 패널 분할 버튼 */}
      <div className="p-2 flex justify-end">
        <button onClick={() => splitPanel(panelId, 'horizontal')}>수평 분할</button>
        <button onClick={() => splitPanel(panelId, 'vertical')}>수직 분할</button>
      </div>
    </div>
  );
};

// 3. 분할 뷰 컴포넌트 - 패널을 지정된 방향으로 배치
export const SplitView = ({ direction, panelIds }) => {
  const { panels, resizePanel } = useTabStore();
  
  return (
    <div className={\`flex \${direction === 'horizontal' ? 'flex-row' : 'flex-col'} h-full\`}>
      {panelIds.map((panelId, index) => (
        <React.Fragment key={panelId}>
          {/* 패널 */}
          <div 
            style={{ 
              flex: \`\${panels[panelId]?.size || 100/panelIds.length} 1 0%\`
            }}
          >
            <TabPanel panelId={panelId} />
          </div>
          
          {/* 리사이즈 핸들 (마지막 패널 제외) */}
          {index < panelIds.length - 1 && (
            <div 
              className={\`\${direction === 'horizontal' ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'} bg-gray-300\`}
              onMouseDown={/* 리사이즈 로직 */}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};`}</pre>
            </div>
          </div>

          {/* UI 출력 흐름 설명 */}
          <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h5 className="text-lg font-semibold text-yellow-700 mb-3">전체 UI 렌더링 구조 설명</h5>
            <p className="text-base text-gray-800 mb-3">
              <code>panels.main</code>을 그리면 전체 UI가 트리 구조로 자동 렌더링됩니다. 이 재귀적 렌더링 구조는 데이터 중심 설계의 핵심입니다.
            </p>

            <div className="mb-4">
              <h6 className="text-base font-semibold text-yellow-800 mb-2">재귀적 렌더링 흐름</h6>
              <ol className="list-decimal pl-6 text-base text-gray-800 space-y-1">
                <li><strong>시작점 - main 패널:</strong> <code>&lt;TabPanel panelId="main" /&gt;</code> 컴포넌트만 한 번 렌더링</li>
                <li><strong>컨테이너 패널 처리:</strong> 패널에 <code>children</code> 속성이 있으면 → <code>&lt;SplitView /&gt;</code> 컴포넌트로 변환</li>
                <li><strong>자식 패널로 재귀:</strong> <code>&lt;SplitView /&gt;</code>는 모든 자식 패널을 <code>&lt;TabPanel /&gt;</code>로 재귀 렌더링</li>
                <li><strong>탭 홀더 패널 처리:</strong> 패널에 <code>tabs</code> 속성이 있으면 → 헤더와, 활성 탭 내용 렌더링</li>
              </ol>
            </div>

            <div className="mb-4">
              <h6 className="text-base font-semibold text-yellow-800 mb-2">UI 트리 구성 다이어그램</h6>
              <div className="bg-white p-3 rounded border border-gray-200">
                <pre className="text-xs font-mono overflow-auto">
                  {`<TabPanel panelId="main">
  └─ <SplitView direction="horizontal" panelIds={['panel-left', 'panel-right']}>
     ├─ <TabPanel panelId="panel-left">
     │   └─ <SplitView direction="vertical" panelIds={['panel-left-top', 'panel-left-bottom']}>
     │      ├─ <TabPanel panelId="panel-left-top">
     │      │   └─ [탭 내용: 'tab-1']
     │      │
     │      └─ <TabPanel panelId="panel-left-bottom">
     │          └─ [탭 내용: 'tab-2']
     │
     └─ <TabPanel panelId="panel-right">
         └─ [탭 내용: 'tab-3']`}
                </pre>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="text-base font-semibold text-yellow-800 mb-2">애플리케이션 실행 코드 예시</h6>
              <div className="bg-gray-100 p-3 rounded-md text-sm font-mono overflow-auto">
                <pre>{`// App.tsx 또는 페이지 컴포넌트
import React, { useEffect } from 'react';
import { useTabStore } from './store/tabStore';
import { TabPanel } from './components/TabComponents';

const CTIConsole = () => {
  const { addTab } = useTabStore();
  
  // 초기 탭 설정
  useEffect(() => {
    // 초기 탭 추가 (기본으로 모두 'main' 패널에 속함)
    addTab({ 
      title: '상담원 정보', 
      panelId: 'main',
      content: <AgentInfoComponent /> 
    });
    
    addTab({ 
      title: '고객 정보', 
      panelId: 'main',
      content: <CustomerInfoComponent /> 
    });
    
    // ... 더 많은 탭 추가 가능
  }, []);
  
  return (
    <div className="h-screen p-4">
      {/* main 패널 하나만 렌더링하면 전체 UI가 구성됨 */}
      <TabPanel panelId="main" />
    </div>
  );
};`}</pre>
              </div>
            </div>

            <div className="mb-2">
              <h6 className="text-base font-semibold text-yellow-800 mb-2">재귀적 렌더링 구조의 이점</h6>
              <ul className="list-disc pl-6 text-base text-gray-800 space-y-1">
                <li><strong>복잡한 UI도 단순 코드로 구성:</strong> 상태의 복잡성과 무관하게 항상 <code>&lt;TabPanel panelId="main" /&gt;</code> 하나만 렌더링</li>
                <li><strong>자동 UI 구성:</strong> 상태가 변경되면 필요한 UI 부분만 자동으로 변경됨</li>
                <li><strong>분리된 관심사:</strong> 컴포넌트는 상태 모델 구조를 몰라도 자신의 역할만 수행</li>
                <li><strong>선언적 UI:</strong> "어떻게" 그리는지가 아닌 "무엇을" 그리는지에 집중한 구조</li>
              </ul>
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
      </section>

      {/* 키 전략 섹션 */}
      <KeyStrategies />

      <EnhancedLearningResources />
      
      {/* <ImplementationRoadmap /> */}
    </div>
  );
};

export default StrategyReport;