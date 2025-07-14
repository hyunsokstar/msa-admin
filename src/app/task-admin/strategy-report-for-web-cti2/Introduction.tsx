import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, AlertCircle, Server, Monitor, BarChart3, Database, Globe, Settings, Users, Zap, FileText, Code, ArrowRight, Radio, Timer, Activity, HelpCircle } from 'lucide-react';

const PubSubArchitecture = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">프론트엔드 Pub/Sub 구조 요약서</h1>
        <p className="text-xl text-gray-600">백엔드 공유용 · 실시간 상담사 상태 관리</p>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-3"></div>
      </div>

      {/* 목적 */}
      <section className="mb-10">
        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Activity className="h-6 w-6" />
              목적
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                실시간 상담사 상태(대기/통화/후처리/휴식 등)를 <strong>Redis Pub/Sub 기반</strong>으로 UI에 반영합니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                화면에 표시되는 <strong>상태 아이콘 + 타이머</strong>를 정확히 유지하기 위해 구현되었습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 프론트 구조 요약 */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-3">
          프론트 구조 요약
        </h2>

        {/* 아키텍처 플로우 */}
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Radio className="h-6 w-6" />
              데이터 플로우
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-4 text-center py-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-2">
                  <Database className="h-8 w-8 text-red-600" />
                </div>
                <span className="text-sm font-medium">Redis Pub/Sub</span>
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                  <Settings className="h-8 w-8 text-orange-600" />
                </div>
                <span className="text-sm font-medium">Tauri Backend<br />(Rust)</span>
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Tauri emit<br />(event)</span>
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Monitor className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-sm font-medium">React UI<br />(타이머 + 상태)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 구성 요소 테이블 */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Code className="h-6 w-6" />
              구성 요소
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">구성</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">설명</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-red-600">Redis 채널</td>
                    <td className="py-3 px-4 text-gray-700">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">personal:agent-info:{`{agentId}`}</code>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-orange-600">Rust 수신자</td>
                    <td className="py-3 px-4 text-gray-700">Redis를 subscribe 후 JSON payload 수신</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-purple-600">Tauri emit</td>
                    <td className="py-3 px-4 text-gray-700">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">"redis-agent-status-single"</code> 이벤트로 React에 전달
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-blue-600">React 구독자</td>
                    <td className="py-3 px-4 text-gray-700">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">setupSingleAgentStatusListener()</code>로 수신 → UI 갱신
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-green-600">타이머 로직</td>
                    <td className="py-3 px-4 text-gray-700">
                      상태 변경 시점의 timestamp를 LocalStorage에 저장 후,
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">useAgentTimer()</code>에서 1초 단위 계산
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 수신 데이터 예시 */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b-2 border-blue-200 pb-3">
          수신 데이터 예시
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* JSON Payload */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <FileText className="h-6 w-6" />
                JSON Payload 예시
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                <pre>{`{
  "agentId": 2,
  "name": "홍길동",
  "callStatus": "BUSY"
}`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* 프론트엔드 처리 */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-6 w-6" />
                프론트엔드 처리
              </CardTitle>
              <CardDescription>이 정보로 프론트는:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">상태 변경 시 UI 색상 및 아이콘 전환</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">해당 시점 기준 타이머 시작 (00:00:01부터 증가)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 프론트에서 필요한 조건 */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-6 text-red-700 border-b-2 border-red-200 pb-3">
          프론트에서 필요한 조건 (백엔드 확인 요청)
        </h2>

        <Card className="shadow-lg border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <HelpCircle className="h-6 w-6" />
              백엔드 확인 필요 사항
            </CardTitle>
            <CardDescription>Redis Pub/Sub 구현을 위한 5가지 핵심 질문</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 w-20">순번</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">질문</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-red-50">
                    <td className="py-4 px-4 font-bold text-red-600 text-lg">1</td>
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      <strong>채널명 뭘로 할지?</strong>
                      <div className="text-sm text-gray-500 mt-1">예: agent:status:{`{agentId}`} 형태로 할지, 다른 규칙으로 할지</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="py-4 px-4 font-bold text-red-600 text-lg">2</td>
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      <strong>이벤트 뭐가 날라오는지?</strong>
                      <div className="text-sm text-gray-500 mt-1">상태 변경시만? 주기적으로도? 로그인/로그아웃시도?</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="py-4 px-4 font-bold text-red-600 text-lg">3</td>
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      <strong>그때 데이터 형식</strong>
                      <div className="text-sm text-gray-500 mt-1">JSON 구조, 필드명, timestamp 포함 여부 등</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="py-4 px-4 font-bold text-red-600 text-lg">4</td>
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      <strong>최초 REST API 조회 없이 pub/sub 로만 구현하는지?</strong>
                      <div className="text-sm text-gray-500 mt-1">앱 시작시 현재 상태를 어떻게 가져올지</div>
                    </td>
                  </tr>
                  <tr className="hover:bg-red-50">
                    <td className="py-4 px-4 font-bold text-red-600 text-lg">5</td>
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      <strong>유저 정보는 웹 CTI에서 얻어와야 하는지?</strong>
                      <div className="text-sm text-gray-500 mt-1">로그인 상담사의 agentId, name 등을 어디서 가져올지</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800 mb-1">답변 요청</h4>
                  <p className="text-red-700 text-sm">
                    위 5개 질문에 대한 답변을 받으면 프론트엔드 Pub/Sub 구현을 바로 시작할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PubSubArchitecture;