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

        {/* Zustand vs 직접 구독 비교 */}
        <section data-section="zustand-comparison">
          <h3 className="text-2xl font-bold mb-6 text-purple-700 border-b-2 border-purple-200 pb-3">
            Zustand vs 직접 이벤트 구독
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="shadow-md border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  직접 이벤트 구독 (권장)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-green-700 text-sm">
                  <div><strong>적합한 용도:</strong> 실시간 데이터 (상담원 상태, 통화 정보)</div>
                  <div><strong>장점:</strong> 명확한 데이터 흐름, 성능 최적화, 디버깅 용이</div>
                  <div><strong>단점:</strong> 컴포넌트별 구독 관리 필요</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Settings className="h-5 w-5" />
                  Zustand Store
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-blue-700 text-sm">
                  <div><strong>적합한 용도:</strong> 여러 컴포넌트 공유 (사용자 설정, 테마)</div>
                  <div><strong>장점:</strong> 중앙 집중식 관리, 전역 상태 공유</div>
                  <div><strong>단점:</strong> 간접적 데이터 흐름, 불필요한 리렌더링</div>
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

        {/* 구현 권장사항 */}
        <section data-section="implementation-guide">
          <h3 className="text-2xl font-bold mb-6 text-indigo-700 border-b-2 border-indigo-200 pb-3">
            구현 권장사항
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="shadow-md border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  추천 패턴
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-green-700 text-sm">
                  <div>• <strong>실시간 데이터:</strong> 직접 이벤트 구독 사용</div>
                  <div>• <strong>데이터 변환:</strong> 커스텀 훅으로 분리</div>
                  <div>• <strong>컴포넌트:</strong> UI 표현에만 집중</div>
                  <div>• <strong>에러 처리:</strong> 연결 상태 및 재연결 로직 포함</div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Settings className="h-5 w-5" />
                  성능 최적화
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-blue-700 text-sm">
                  <div>• <strong>선택적 구독:</strong> 필요한 컴포넌트에서만</div>
                  <div>• <strong>메모이제이션:</strong> 불필요한 재계산 방지</div>
                  <div>• <strong>배치 업데이트:</strong> 여러 이벤트 동시 처리</div>
                  <div>• <strong>연결 풀링:</strong> 중복 구독 방지</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 참고 자료 */}
        <section data-section="references">
          <h3 className="text-2xl font-bold mb-6 text-amber-700 border-b-2 border-amber-200 pb-3">
            참고 자료
          </h3>

          <Card className="shadow-md border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <FileText className="h-5 w-5" />
                구현 가이드 및 협의 문서
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">📄</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-amber-800 mb-2">Redis 이벤트 구독 방식 상세 가이드</h4>
                      <a
                        href="https://nexus-task-master.shop/note-admin/notes/90/note-contents?collectionId=54&noteTitle=reids%20이벤트%20구독%20방식%20정리"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors underline text-sm"
                      >
                        📡 Redis 구독 및 UI 연동 실제 구현 예시 보기
                      </a>
                      <p className="text-amber-700 text-sm mt-1">
                        프로덕션 코드 예시, 에러 처리 패턴, 성능 최적화 기법 포함
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">📋</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-amber-800 mb-2">백엔드 협의 상세 문서</h4>
                      <a
                        href="#additional-requirements"
                        className="text-blue-600 hover:text-blue-800 transition-colors underline text-sm"
                      >
                        📋 프론트엔드 Pub/Sub 구조 요약서 보기
                      </a>
                      <p className="text-amber-700 text-sm mt-1">
                        채널 설계, 인증 처리, 데이터 명세 등 상세 협의 사항
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm">🔐</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-amber-800 mb-2">인증 및 보안 가이드</h4>
                      <a
                        href="#authentication"
                        className="text-blue-600 hover:text-blue-800 transition-colors underline text-sm"
                      >
                        🔐 웹 CTI 인증 프로세스 가이드 보기
                      </a>
                      <p className="text-amber-700 text-sm mt-1">
                        토큰 공유, 세션 관리, API 인증 방식 상세 안내
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-100 border border-amber-300 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-1">기술 지원</h4>
                    <p className="text-amber-700 text-sm">
                      Redis 이벤트 구독 구현 및 백엔드 연동 과정에서 기술적 이슈나 궁금한 사항이 있으시면
                      언제든 문의 부탁드립니다. 코드 리뷰 및 최적화 방안도 함께 논의 가능합니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default RedisEventGuide;