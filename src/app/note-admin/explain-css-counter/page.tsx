// C:\Users\terec\msa-admin\src\app\note-admin\explain-css-counter\page.tsx
'use client'

import React, { useState } from 'react'

interface Props { }

const Page = (props: Props) => {
    const [activeTab, setActiveTab] = useState<'concept' | 'code' | 'demo'>('concept')

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        CSS Counter로 대량 목록 빠른 삭제 구현
                    </h1>
                    <p className="text-gray-600">
                        JavaScript 없이 CSS만으로 자동 번호 매기기 + DOM 직접 제거로 10,000건도 빠르게 처리
                    </p>
                    <a
                        href="http://43.200.241.26:8080/test/css-counter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        테스트 사이트 바로가기
                    </a>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('concept')}
                                className={`px-6 py-3 font-medium text-sm ${activeTab === 'concept'
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                핵심 개념
                            </button>
                            <button
                                onClick={() => setActiveTab('code')}
                                className={`px-6 py-3 font-medium text-sm ${activeTab === 'code'
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                코드 구현
                            </button>
                            <button
                                onClick={() => setActiveTab('demo')}
                                className={`px-6 py-3 font-medium text-sm ${activeTab === 'demo'
                                        ? 'border-b-2 border-blue-600 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                동작 예시
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'concept' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 왜 CSS Counter인가?</h2>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                            <h3 className="font-bold text-red-800 mb-2">❌ 기존 방식의 문제점</h3>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>• JavaScript로 번호 관리 (배열 인덱스)</li>
                                                <li>• 삭제 시 전체 리스트 재렌더링</li>
                                                <li>• 번호 재계산을 위한 반복문 실행</li>
                                                <li>• 10,000건 처리 시 브라우저 멈춤</li>
                                            </ul>
                                        </div>
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                            <h3 className="font-bold text-green-800 mb-2">✅ CSS Counter 방식</h3>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li>• CSS가 자동으로 번호 관리</li>
                                                <li>• DOM에서 요소만 제거 (remove)</li>
                                                <li>• 번호는 CSS가 자동 재정렬</li>
                                                <li>• 10,000건도 즉시 처리 가능</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">⚡ 핵심 원리</h2>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-start">
                                                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-gray-800">CSS Counter 설정</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        counter-reset으로 초기화, counter-increment로 자동 증가
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-gray-800">DOM 직접 제거</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        element.remove()로 해당 요소만 즉시 제거
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                                                <div className="ml-4">
                                                    <h4 className="font-semibold text-gray-800">자동 번호 재정렬</h4>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        남은 요소들의 번호는 CSS가 자동으로 재계산
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">📊 성능 비교</h2>
                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-300">
                                                    <th className="text-left py-2">항목</th>
                                                    <th className="text-center py-2">기존 방식</th>
                                                    <th className="text-center py-2">CSS Counter</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-200">
                                                    <td className="py-2">10,000건 삭제 시간</td>
                                                    <td className="text-center text-red-600">3~5초</td>
                                                    <td className="text-center text-green-600">0.1초 미만</td>
                                                </tr>
                                                <tr className="border-b border-gray-200">
                                                    <td className="py-2">재렌더링 필요</td>
                                                    <td className="text-center text-red-600">전체 리스트</td>
                                                    <td className="text-center text-green-600">없음</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2">메모리 사용</td>
                                                    <td className="text-center text-red-600">높음</td>
                                                    <td className="text-center text-green-600">최소</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'code' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">📝 CSS 코드</h2>
                                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                                        <pre className="text-sm">
                                            {`.counter-container {
    counter-reset: item-counter;  /* 카운터 초기화 */
}

.counter-item {
    counter-increment: item-counter;  /* 카운터 자동 증가 */
}

.counter-item::before {
    content: counter(item-counter) ". ";  /* 번호 표시 */
    font-weight: bold;
    color: #007bff;
    margin-right: 5px;
}`}</pre>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">📝 HTML 구조</h2>
                                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                                        <pre className="text-sm">
                                            {`<div id="user-list" class="counter-container">
    <div class="counter-item user-item">
        <div class="user-info">
            <strong>홍길동</strong> - hong@example.com (ID: 1)
        </div>
        <button onclick="deleteUser(1, this)">삭제</button>
    </div>
    <div class="counter-item user-item">
        <div class="user-info">
            <strong>김철수</strong> - kim@example.com (ID: 2)
        </div>
        <button onclick="deleteUser(2, this)">삭제</button>
    </div>
    <!-- 10,000개의 아이템... -->
</div>`}</pre>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">📝 JavaScript 삭제 로직</h2>
                                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                                        <pre className="text-sm">
                                            {`async function deleteUser(userId, buttonElement) {
    try {
        // 1. API 호출로 서버에서 삭제
        const response = await fetch(\`/api/users/\${userId}\`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('삭제 실패');
        }
        
        // 2. DOM에서 해당 요소만 제거 (핵심!)
        const userItem = buttonElement.closest('.user-item');
        userItem.remove();  // ✅ 재렌더링 없이 즉시 제거
        
        // 3. 카운트 업데이트
        const currentCount = parseInt(
            document.getElementById('user-count').textContent
        );
        document.getElementById('user-count').textContent = currentCount - 1;
        
        console.log(\`유저 \${userId} 삭제 완료\`);
        
    } catch (error) {
        console.error('삭제 실패:', error);
        alert('삭제에 실패했습니다.');
    }
}`}</pre>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 핵심 포인트</h2>
                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start">
                                                <span className="text-yellow-600 mr-2">💡</span>
                                                <span><strong>remove() 메서드</strong>: jQuery의 remove()가 아닌 네이티브 DOM API 사용</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-yellow-600 mr-2">💡</span>
                                                <span><strong>closest() 메서드</strong>: 클릭한 버튼에서 가장 가까운 .user-item 찾기</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-yellow-600 mr-2">💡</span>
                                                <span><strong>번호 재계산 불필요</strong>: CSS counter가 자동으로 처리</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-yellow-600 mr-2">💡</span>
                                                <span><strong>배열 인덱스 관리 불필요</strong>: CSS가 순서 자동 관리</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'demo' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">🎬 동작 시나리오</h2>
                                    <div className="space-y-4">
                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">초기 상태</h3>
                                            <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                                                <div className="py-1">1. 홍길동 - hong@example.com [삭제]</div>
                                                <div className="py-1">2. 김철수 - kim@example.com [삭제]</div>
                                                <div className="py-1">3. 이영희 - lee@example.com [삭제]</div>
                                                <div className="py-1">4. 박민수 - park@example.com [삭제]</div>
                                                <div className="py-1">...</div>
                                                <div className="py-1">10000. 정다운 - jung@example.com [삭제]</div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">2번 항목 삭제 클릭</h3>
                                            <div className="bg-blue-50 rounded p-3 text-sm">
                                                <p className="mb-2">1️⃣ <code>deleteUser(2, button)</code> 함수 호출</p>
                                                <p className="mb-2">2️⃣ API 요청: <code>DELETE /api/users/2</code></p>
                                                <p className="mb-2">3️⃣ DOM 제거: <code>buttonElement.closest('.user-item').remove()</code></p>
                                                <p>4️⃣ CSS counter가 자동으로 번호 재정렬</p>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-800 mb-3">삭제 후 상태 (자동 번호 재정렬)</h3>
                                            <div className="bg-gray-50 rounded p-3 font-mono text-sm">
                                                <div className="py-1">1. 홍길동 - hong@example.com [삭제]</div>
                                                <div className="py-1 text-green-600 font-bold">2. 이영희 - lee@example.com [삭제] ← 자동으로 3→2</div>
                                                <div className="py-1 text-green-600 font-bold">3. 박민수 - park@example.com [삭제] ← 자동으로 4→3</div>
                                                <div className="py-1">...</div>
                                                <div className="py-1 text-green-600 font-bold">9999. 정다운 - jung@example.com [삭제] ← 자동으로 10000→9999</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-800 mb-4">⏱️ 성능 측정 결과</h2>
                                    <div className="bg-gray-100 rounded-lg p-4">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="bg-white rounded-lg p-4 text-center">
                                                <div className="text-3xl font-bold text-blue-600">847ms</div>
                                                <div className="text-sm text-gray-600 mt-1">API 호출 시간</div>
                                                <div className="text-xs text-gray-500 mt-2">20,000건 로드</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 text-center">
                                                <div className="text-3xl font-bold text-green-600">523ms</div>
                                                <div className="text-sm text-gray-600 mt-1">렌더링 시간</div>
                                                <div className="text-xs text-gray-500 mt-2">DOM 생성</div>
                                            </div>
                                            <div className="bg-white rounded-lg p-4 text-center">
                                                <div className="text-3xl font-bold text-purple-600">&lt;1ms</div>
                                                <div className="text-sm text-gray-600 mt-1">개별 삭제 시간</div>
                                                <div className="text-xs text-gray-500 mt-2">DOM remove()</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-800 mb-2">💡 실제 테스트 해보기</h3>
                                    <p className="text-sm text-gray-700 mb-3">
                                        아래 테스트 사이트에서 20,000건 데이터로 직접 확인해보세요:
                                    </p>
                                    <a
                                        href="http://43.200.241.26:8080/test/css-counter"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        테스트 사이트에서 확인하기 →
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Note */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div className="ml-3">
                            <h4 className="font-semibold text-amber-800">주의사항</h4>
                            <ul className="mt-2 text-sm text-gray-700 space-y-1">
                                <li>• CSS counter는 IE11 이하에서 제한적 지원</li>
                                <li>• 복잡한 번호 체계(1-1, 1-2 등)는 JavaScript 필요</li>
                                <li>• 번호를 데이터로 사용해야 하는 경우 별도 관리 필요</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page