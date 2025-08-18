'use client'

import React, { useState } from 'react'

const Page: React.FC = () => {
    const [tab, setTab] = useState<'before' | 'after' | 'guide' | 'summary'>('before')

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        목록 삭제 성능 리팩토링: JavaScript 배열 방식 → CSS Counter 방식
                    </h1>
                    <p className="text-gray-600">
                        대용량(1k~20k) 리스트에서 삭제 성능을 확보하는 방법 — before/after 비교와 단계별 구현 가이드
                    </p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex flex-wrap">
                            {[
                                { id: 'before', label: 'Before (JS 배열)' },
                                { id: 'after', label: 'After (CSS Counter)' },
                                { id: 'guide', label: '단계별 구현 가이드' },
                                { id: 'summary', label: '요약 / 권장' }
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id as any)}
                                    className={`px-4 py-3 text-sm font-medium ${tab === t.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6 space-y-6">
                        {tab === 'before' && (
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">Before: 전형적 JavaScript 배열 기반 구현 (문제점)</h2>

                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-red-800 mb-2">핵심 문제</h3>
                                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                        <li>삭제 시 배열을 filter한 뒤 전체 리스트를 innerHTML로 재렌더링 — O(n) DOM 재생성</li>
                                        <li>대량 데이터(수천~만건)에서 브라우저 일시 정지 및 높은 메모리 사용</li>
                                        <li>번호(순번)를 JS에서 재계산하므로 추가 비용 발생</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">대표 코드 (문제의 핵심)</h3>
                                    <div className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto text-xs">
                                        {`// 전역 users 배열 유지
users = users.filter(u => u.id !== userId);

// 전체 재렌더링 (성능 병목)
function renderUserList() {
  let html = '';
  users.forEach((user, index) => {
    html += \`
      <div class="user-item" id="user-\${user.id}">
        <span class="user-number">\${index + 1}.</span>
        <div class="user-info">\${user.name} - \${user.email}</div>
        <button onclick="deleteUser(\${user.id})">삭제</button>
      </div>\`;
  });
  document.getElementById('userList').innerHTML = html;
}`}
                                    </div>
                                </div>

                                <div className="bg-red-100 rounded p-3 text-sm text-red-800">
                                    측정 예: 10,000건에서 개별 삭제 평균 3~5초, 전체 브라우저 블로킹 보고
                                </div>
                            </section>
                        )}

                        {tab === 'after' && (
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">After: CSS Counter + DOM.remove() 접근</h2>

                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-green-800 mb-2">핵심 아이디어</h3>
                                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                                        <li>번호는 CSS counter가 자동으로 관리 (JS로 재계산 불필요)</li>
                                        <li>삭제 시 서버 호출 후 해당 DOM 요소만 제거 (element.remove())</li>
                                        <li>리렌더링 제거로 삭제 처리 시간이 실질적으로 O(1) 수준</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-semibold mb-2">대표 코드 (핵심)</h3>
                                    <div className="bg-gray-900 text-gray-100 rounded p-4 overflow-x-auto text-xs">
                                        {`/* CSS */
.counter-container { counter-reset: item-counter 0; }
.counter-item { counter-increment: item-counter; display:flex; align-items:center; padding:12px; border-bottom:1px solid #e0e0e0; }
.counter-item::before { content: counter(item-counter) ". "; font-weight:bold; color:#007bff; margin-right:12px; }

/* JavaScript: delete */
async function deleteUser(userId, btn) {
  // 1) 서버 삭제 요청
  const res = await fetch(\`/api/users/\${userId}\`, { method: 'DELETE' });
  if (!res.ok) throw new Error('삭제 실패');

  // 2) DOM에서 해당 요소만 즉시 제거
  const userItem = btn.closest('.user-item');
  userItem.remove(); // CSS가 자동으로 번호 재정렬
}`}
                                    </div>
                                </div>

                                <div className="bg-green-100 rounded p-3 text-sm text-green-800">
                                    측정 예: 10,000건에서 개별 삭제 & 번호 갱신 & UI 반영 & 메모리 사용량 대폭 감소 (삭제 & 반응성 & 메모리 모두 개선)
                                </div>
                            </section>
                        )}

                        {tab === 'guide' && (
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">단계별 구현 가이드 (완전 리팩토링)</h2>

                                <ol className="list-decimal pl-5 space-y-4 text-sm text-gray-700">
                                    <li>
                                        <strong>설계(1일)</strong>
                                        <div className="mt-2">
                                            - 번호(순번)를 UI 표시용으로만 사용: DB나 API로 번호를 의존하지 않음.<br />
                                            - 삭제는 서버에서 데이터만 지우고 클라이언트는 DOM만 제거.
                                        </div>
                                    </li>

                                    <li>
                                        <strong>CSS 준비(0.5일)</strong>
                                        <div className="mt-2">
                                            - container에 <code>counter-reset</code>, 각 아이템에 <code>counter-increment</code>와 <code>::before</code>로 번호 표시.
                                        </div>
                                    </li>

                                    <li>
                                        <strong>DOM 구조 및 초기 로드(1일)</strong>
                                        <div className="mt-2">
                                            - 대량 로딩시 DocumentFragment로 일괄 삽입.<br />
                                            - 각 아이템에 <code>data-id</code>와 삭제 버튼(온클릭에 this 전달) 포함.
                                        </div>
                                    </li>

                                    <li>
                                        <strong>삭제 로직(0.5일)</strong>
                                        <div className="mt-2">
                                            - 비동기로 API 삭제 요청, 성공 시 <code>button.closest('.user-item').remove()</code> 호출.<br />
                                            - UI 카운트는 <code>document.querySelectorAll('.user-item').length</code>로 계산하여 표시.
                                        </div>
                                    </li>

                                    <li>
                                        <strong>대량 최적화(1일)</strong>
                                        <div className="mt-2">
                                            - 가상화(virtualization)가 필요하면 IntersectionObserver 또는 windowing 적용 고려.<br />
                                            - DocumentFragment, requestIdleCallback/queueMicrotask로 초기 렌더링 분할.
                                        </div>
                                    </li>

                                    <li>
                                        <strong>테스트 & 모니터링(1일)</strong>
                                        <div className="mt-2">
                                            - 100 / 1,000 / 10,000 / 20,000 건에서 삭제 측정(각 10회 평균).<br />
                                            - 성능 지표: 삭제 응답시간, 메모리 사용, CPU spike, UI jank 여부.
                                        </div>
                                    </li>

                                    <li>
                                        <strong>폴리필 & 호환성</strong>
                                        <div className="mt-2">
                                            - IE11 등 구형 지원 필요 시 <code>closest</code>와 <code>remove</code> 폴리필 추가.
                                        </div>
                                    </li>
                                </ol>

                                <div className="bg-gray-100 rounded p-3 text-sm">
                                    핵심 구현 스니펫(HTML + CSS + JS)은 아래와 같습니다.
                                    <div className="mt-3 bg-gray-900 text-gray-100 rounded p-3 overflow-x-auto text-xs">
                                        {`<!-- HTML -->
<div id="user-list" class="counter-container">
  <div class="counter-item user-item" data-id="1">
    <div class="user-info"><strong>이름</strong> - email@example.com</div>
    <button onclick="deleteUser(1, this)">삭제</button>
  </div>
  <!-- ... -->
</div>

/* CSS (위와 동일) */
.counter-container { counter-reset: item-counter 0; }
.counter-item { counter-increment: item-counter; }
.counter-item::before { content: counter(item-counter) ". "; }

/* JS */
async function deleteUser(userId, btn) {
  const res = await fetch(\`/api/users/\${userId}\`, { method:'DELETE' });
  if (!res.ok) { alert('삭제 실패'); return; }
  btn.closest('.user-item').remove();
  document.getElementById('user-count').textContent = document.querySelectorAll('.user-item').length;
}`}
                                    </div>
                                </div>
                            </section>
                        )}

                        {tab === 'summary' && (
                            <section className="space-y-6">
                                <h2 className="text-xl font-semibold">요약 및 권장</h2>

                                <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-gray-700">
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>간단한 순번 표시와 삭제 동작만 필요한 관리 UI라면 CSS Counter + DOM.remove()가 최적.</li>
                                        <li>데이터가 반드시 순번을 기반으로 정렬/참조해야 한다면 서버/DB에서 정합성 유지 — UI는 표시 전용으로 유지.</li>
                                        <li>초기 로드나 가시성(virtualization)이 필요한 경우, CSS Counter 패턴과 virtualized list를 병행 적용.</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded shadow p-4 text-sm">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="text-center">
                                            <div className="font-bold text-red-600">Before</div>
                                            <div className="text-2xl font-bold">~3-9s</div>
                                            <div className="text-xs text-gray-500">10k 삭제(평균)</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-green-600">After</div>
                                            <div className="text-2xl font-bold">&lt;0.1s</div>
                                            <div className="text-xs text-gray-500">DOM.remove + CSS Counter</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-gray-800">권장</div>
                                            <div className="text-2xl font-bold">CSS Counter</div>
                                            <div className="text-xs text-gray-500">대부분 관리자 목록에 적합</div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Footer note */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                    <strong>주의:</strong> CSS Counter는 표시용 번호에 최적화되어 있습니다. 번호 값을 비즈니스 로직(예: 순번 기반 검색, 외래 키 등)으로 사용하려면 서버측 정합성 및 별도 번호 필드를 유지하세요.
                </div>
            </div>
        </div>
    )
}

export default Page