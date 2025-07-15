// components/RedisEventGuide.tsx
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Server, Monitor, BarChart3, Database, Globe, Settings, Users, Zap, FileText, Code, ArrowRight, Radio, Timer, Activity, HelpCircle } from 'lucide-react';

const RedisEventGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          📡 Redis 이벤트 구독 방식 정리
        </h2>
        <p className="text-gray-600 text-lg">
          실시간 데이터 동기화를 위한 이벤트 기반 아키텍처
        </p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-3"></div>
      </div>

      <div className="space-y-8">
        {/* 핵심 아키텍처 */}
        <section data-section="redis-architecture">
          <Card className="shadow-md border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Database className="h-5 w-5" />
                핵심 아키텍처
              </CardTitle>
              <CardDescription>
                Redis Pub/Sub → Tauri Backend → Frontend Event → UI Update
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">데이터 플로우</h4>
                    <div className="space-y-1 text-blue-700 text-sm">
                      <div>1. Redis 채널 구독 (Rust)</div>
                      <div>2. Tauri 이벤트 발행</div>
                      <div>3. React 훅에서 수신</div>
                      <div>4. UI 상태 업데이트</div>
                    </div>
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 구현 패턴 요약 */}
        <section data-section="implementation-patterns">
          <h3 className="text-2xl font-bold mb-6 text-green-700 border-b-2 border-green-200 pb-3">
            구현 패턴 요약
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Code className="h-5 w-5" />
                  1. 이벤트 구독
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`// useRedisEvents.ts
export function useSingleAgentStatus() {
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    const unlisten = await listen(
      'redis-agent-status-single',
      (event) => setStatus(event.payload)
    );
    return () => unlisten?.();
  }, []);
  
  return { status, isConnected };
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Monitor className="h-5 w-5" />
                  2. UI 상태 변환
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`// useAgentStatusUI.ts
export function useAgentStatusUI() {
  const { status } = useSingleAgentStatus();
  
  const statusIndex = useMemo(() => 
    mapCallStatusToIndex(status?.callStatus)
  , [status]);
  
  return { statusIndex, agentInfo, ... };
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Activity className="h-5 w-5" />
                  3. 컴포넌트 사용
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                  <pre>{`// Component.tsx
const AgentStatusBox = () => {
  const { 
    statusIndex, 
    agentInfo, 
    isConnected 
  } = useAgentStatusUI();
  
  return (
    <RadarDisplay 
      statusIndex={statusIndex} 
    />
  );
};`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 백엔드 협의 필요 사항 */}
        <section data-section="backend-collaboration">
          <h3 className="text-2xl font-bold mb-6 text-red-700 border-b-2 border-red-200 pb-3">
            백엔드 팀과의 주요 협의 사항
          </h3>

          <div className="space-y-4">
            <Card className="shadow-md border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <HelpCircle className="h-5 w-5" />
                  Redis 구독 관련 협의
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-semibold text-red-800 text-sm">1. 채널명 및 이벤트 명세</h4>
                      <p className="text-red-700 text-xs mt-1">채널명 규칙, 이벤트명, 데이터 구조 스키마</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-semibold text-red-800 text-sm">2. 데이터 조회 프로세스</h4>
                      <p className="text-red-700 text-xs mt-1">최초 조회는 REST API인지 Pub/Sub만 사용인지</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-semibold text-red-800 text-sm">3. 로그인 및 인증 처리</h4>
                      <p className="text-red-700 text-xs mt-1">웹 CTI 연동 방식, 토큰 공유 방법</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-semibold text-red-800 text-sm">4. 바모드/패널모드 데이터</h4>
                      <p className="text-red-700 text-xs mt-1">각 모드에서 필요한 데이터 전체 명세</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-semibold text-red-800 text-sm">5. 큐 관련 설정</h4>
                      <p className="text-red-700 text-xs mt-1">큐 그룹, 스킬 그룹, 라우팅 규칙</p>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <h4 className="font-semibold text-red-800 text-sm">6. 에러 처리 및 재연결</h4>
                      <p className="text-red-700 text-xs mt-1">연결 끊김 시 처리 방안, fallback 전략</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-700">
                  <Globe className="h-5 w-5" />
                  예상 데이터 구조 예시
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">상담원 상태 이벤트</h4>
                    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs">
                      <pre>{`{
  "agentId": 123,
  "name": "홍길동",
  "callStatus": "BUSY",
  "timestamp": 1701234567890,
  "extension": "1001",
  "queueGroups": ["sales", "cs"]
}`}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">큐 상태 이벤트</h4>
                    <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs">
                      <pre>{`{
  "queueId": "sales",
  "waitingCalls": 5,
  "availableAgents": 3,
  "longestWaitTime": 120,
  "totalCalls": 45
}`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>


      </div>
    </div>
  );
};

export default RedisEventGuide;