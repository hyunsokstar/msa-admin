'use client';

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface User {
    id: number;
    username: string;
    email: string;
}

const CSSCounterManual = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userIdCounter, setUserIdCounter] = useState(1);
    const [performanceStats, setPerformanceStats] = useState({
        renderTime: '0',
        deleteTime: '0',
        userCount: 0,
    });

    // Inject CSS Counter styles
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
      .counter-container { counter-reset: item-counter; }
      .counter-item { counter-increment: item-counter; }
      .counter-item::before {
        content: counter(item-counter) ". ";
        font-weight: 600;
        color: #2563eb; /* blue-600 */
        font-size: 14px;
        margin-right: 12px;
        background: #eef2ff; /* indigo-50 */
        padding: 4px 10px;
        border-radius: 6px;
        min-width: 36px;
        text-align: center;
        display: inline-block;
      }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const loadUsers = (count: number): void => {
        const startTime = performance.now();
        const newUsers: User[] = Array.from({ length: count }, (_, i) => ({
            id: i + 1,
            username: `user${i + 1}`,
            email: `user${i + 1}@example.com`,
        }));
        setUsers(newUsers);
        const endTime = performance.now();
        setPerformanceStats((prev) => ({
            ...prev,
            renderTime: (endTime - startTime).toFixed(2),
            userCount: count,
        }));
    };

    const addUser = () => {
        const nextId = userIdCounter;
        const newUser = { id: nextId, username: `user${nextId}`, email: `user${nextId}@example.com` };
        setUsers((prev) => [...prev, newUser]);
        setUserIdCounter(nextId + 1);
        setPerformanceStats((prev) => ({ ...prev, userCount: users.length + 1 }));
    };

    const deleteUser = (userId: number): void => {
        const startTime = performance.now();
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        const endTime = performance.now();
        setPerformanceStats((prev) => ({
            ...prev,
            deleteTime: (endTime - startTime).toFixed(2),
            userCount: Math.max(0, users.length - 1),
        }));
    };

    const clearUsers = () => {
        setUsers([]);
        setUserIdCounter(1);
        setPerformanceStats({ renderTime: '0', deleteTime: '0', userCount: 0 });
    };

    // Code samples
    const cssCode = `.counter-container {
  counter-reset: item-counter;     /* 1. 카운터 초기화 */
}
.counter-item {
  counter-increment: item-counter; /* 2. 각 아이템마다 +1 */
}
.counter-item::before {
  content: counter(item-counter) ". ";  /* 3. 번호 출력 */
  font-weight: bold;
  color: #007bff;
}`;
    const jsDeleteCode = `// 삭제 함수 - 핵심!
async function deleteUser(userId, buttonElement) {
  const response = await fetch('/api/users/' + userId, { method: 'DELETE' });
  if (response.ok) {
    buttonElement.closest('.user-item').remove(); // 번호는 CSS가 자동 재정렬
  }
}`;
    const renderCode = `// 유저 렌더링
data.users.forEach((user) => {
  const userDiv = document.createElement('div');
  userDiv.className = 'counter-item user-item';  // CSS Counter 적용
  userDiv.innerHTML = 
    '<div class="user-info">' +
      '<strong>' + user.username + '</strong> - ' + user.email +
    '</div>' +
    '<button onclick="deleteUser(' + user.id + ', this)">삭제</button>';
  container.appendChild(userDiv);
});`;
    const htmlCode = `<div id="user-list" class="user-list counter-container">
  <!-- 유저 데이터가 여기에 렌더링 -->
</div>`;

    useEffect(() => {
        loadUsers(5);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">CSS Counter 매뉴얼</h1>
                    <p className="text-sm text-gray-600 mt-2">
                        중간 항목을 삭제해도 전체 재렌더링 없이 번호가 자동 재정렬되는 방법
                    </p>
                </header>

                {/* 3 steps */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold mb-3">1</div>
                        <h3 className="text-base font-semibold text-gray-900 mb-3">CSS Counter 설정</h3>
                        <SyntaxHighlighter language="css" style={vscDarkPlus} className="rounded-md">
                            {`.list { counter-reset: row; }
.item { counter-increment: row; }
.item::before { content: counter(row) ". "; }`}
                        </SyntaxHighlighter>
                        <p className="text-sm text-gray-600 mt-3">counter-reset, counter-increment, ::before content만 기억하세요.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold mb-3">2</div>
                        <h3 className="text-base font-semibold text-gray-900 mb-3">삭제 시 DOM만 제거</h3>
                        <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="rounded-md">
                            {`function deleteUser(userId, btn) {
  btn.closest('.user-item').remove();
}`}
                        </SyntaxHighlighter>
                        <p className="text-sm text-gray-600 mt-3">번호는 CSS가 관리합니다. JS는 요소만 제거합니다.</p>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-semibold mb-3">3</div>
                        <h3 className="text-base font-semibold text-gray-900 mb-3">번호는 자동 재정렬</h3>
                        <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="rounded-md">
                            {`// JS에서 번호 재계산 불필요
// CSS 엔진이 자동으로 ::before를 다시 그림`}
                        </SyntaxHighlighter>
                        <p className="text-sm text-gray-600 mt-3">대량 데이터에서도 반응성을 유지합니다.</p>
                    </div>
                </section>

                {/* Complete JSP code */}
                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">완성 코드</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">CSS</h3>
                            <SyntaxHighlighter language="css" style={vscDarkPlus} className="rounded-md">
                                {cssCode}
                            </SyntaxHighlighter>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">HTML</h3>
                            <SyntaxHighlighter language="html" style={vscDarkPlus} className="rounded-md">
                                {htmlCode}
                            </SyntaxHighlighter>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">JavaScript (렌더링)</h3>
                            <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="rounded-md">
                                {renderCode}
                            </SyntaxHighlighter>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">JavaScript (삭제)</h3>
                            <SyntaxHighlighter language="javascript" style={vscDarkPlus} className="rounded-md">
                                {jsDeleteCode}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </section>

                {/* Live demo */}
                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-10">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">라이브 데모</h2>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <button onClick={addUser} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                            유저 추가
                        </button>
                        <button onClick={() => loadUsers(10)} className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black">
                            10명 로드
                        </button>
                        <button onClick={() => loadUsers(100)} className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                            100명 로드
                        </button>
                        <button onClick={() => loadUsers(1000)} className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800">
                            1000명 로드
                        </button>
                        <button onClick={clearUsers} className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                            초기화
                        </button>
                    </div>

                    <div className="counter-container border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50 mb-4">
                        {users.length === 0 ? (
                            <p className="text-center text-gray-500 py-10">위 버튼으로 유저를 로드하세요.</p>
                        ) : (
                            users.map((user) => (
                                <div key={user.id} className="counter-item flex items-center p-3 mb-2 bg-white border border-gray-200 rounded-md">
                                    <div className="flex-1">
                                        <span className="font-medium text-gray-900">{user.username}</span>
                                        <span className="text-gray-600 ml-2">- {user.email}</span>
                                        <span className="text-xs text-gray-400 ml-2">(ID: {user.id})</span>
                                    </div>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                    >
                                        삭제
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                            <p className="text-xs text-gray-600 mb-1">유저 수</p>
                            <p className="text-xl font-semibold text-gray-900">{users.length}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                            <p className="text-xs text-gray-600 mb-1">렌더링 시간</p>
                            <p className="text-xl font-semibold text-gray-900">{performanceStats.renderTime}ms</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                            <p className="text-xs text-gray-600 mb-1">삭제 시간</p>
                            <p className="text-xl font-semibold text-gray-900">{performanceStats.deleteTime}ms</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                            <p className="text-xs text-gray-600 mb-1">CSS 재계산</p>
                            <p className="text-xl font-semibold text-gray-900">자동</p>
                        </div>
                    </div>
                </section>

                {/* Comparison */}
                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">성능 비교</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left text-gray-700">구분</th>
                                    <th className="p-3 text-left text-gray-700">JavaScript 방식</th>
                                    <th className="p-3 text-left text-gray-700">CSS Counter 방식</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 font-medium text-gray-900">삭제 시 동작</td>
                                    <td className="p-3 text-gray-600">모든 요소 순회하며 번호 업데이트</td>
                                    <td className="p-3 text-gray-900 font-semibold">DOM 제거만 (번호는 CSS 처리)</td>
                                </tr>
                                <tr className="border-b bg-gray-50">
                                    <td className="p-3 font-medium text-gray-900">코드량</td>
                                    <td className="p-3 text-gray-600">번호 관리 로직 필요</td>
                                    <td className="p-3 text-gray-900 font-semibold">CSS 3줄 + remove() 1줄</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium text-gray-900">성능 (20,000명)</td>
                                    <td className="p-3 text-gray-600">O(n) - 느림</td>
                                    <td className="p-3 text-gray-900 font-semibold">O(1) - 빠름</td>
                                </tr>
                                <tr>
                                    <td className="p-3 font-medium text-gray-900">DOM 조작</td>
                                    <td className="p-3 text-gray-600">모든 요소 textContent 변경</td>
                                    <td className="p-3 text-gray-900 font-semibold">제거할 요소만 remove()</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CSSCounterManual;