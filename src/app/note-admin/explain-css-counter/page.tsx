<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Counter 완벽 정리 - 존나 쉬운 3단계</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        h1 {
            color: white;
            text-align: center;
            margin-bottom: 10px;
            font-size: 2.5em;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .subtitle {
            color: rgba(255,255,255,0.9);
            text-align: center;
            margin-bottom: 30px;
            font-size: 1.2em;
        }
        
        /* 핵심 3단계 카드 */
        .core-steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .step-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s;
        }
        
        .step-card:hover {
            transform: translateY(-5px);
        }
        
        .step-number {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 40px;
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 15px;
        }
        
        .step-title {
            font-size: 1.3em;
            color: #333;
            margin-bottom: 15px;
            font-weight: bold;
        }
        
        .step-code {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            overflow-x: auto;
            margin-bottom: 10px;
        }
        
        .step-desc {
            color: #666;
            font-size: 0.95em;
            line-height: 1.6;
        }
        
        /* 완성 코드 섹션 */
        .complete-code {
            background: white;
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .section-title {
            font-size: 1.8em;
            color: #333;
            margin-bottom: 20px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        
        .code-block {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 20px;
            border-radius: 10px;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            overflow-x: auto;
            margin-bottom: 20px;
            position: relative;
        }
        
        .code-label {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #667eea;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 12px;
        }
        
        /* 라이브 데모 */
        .demo-section {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .demo-controls {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .demo-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
            font-weight: bold;
        }
        
        .btn-add {
            background: #28a745;
            color: white;
        }
        
        .btn-add:hover {
            background: #218838;
        }
        
        .btn-reset {
            background: #ffc107;
            color: #333;
        }
        
        .btn-reset:hover {
            background: #e0a800;
        }
        
        .btn-load {
            background: #007bff;
            color: white;
        }
        
        .btn-load:hover {
            background: #0056b3;
        }
        
        /* CSS Counter 실제 적용 */
        .counter-container {
            counter-reset: item-counter;
            border: 2px solid #dee2e6;
            border-radius: 10px;
            padding: 20px;
            max-height: 400px;
            overflow-y: auto;
            background: #f8f9fa;
        }
        
        .counter-item {
            counter-increment: item-counter;
            display: flex;
            align-items: center;
            padding: 12px;
            margin: 8px 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        
        .counter-item:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .counter-item::before {
            content: counter(item-counter) ". ";
            font-weight: bold;
            color: #667eea;
            font-size: 18px;
            margin-right: 15px;
            background: #f0f0ff;
            padding: 5px 10px;
            border-radius: 5px;
            min-width: 40px;
            text-align: center;
        }
        
        .user-info {
            flex: 1;
        }
        
        .delete-btn {
            padding: 6px 12px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
        }
        
        .delete-btn:hover {
            background: #c82333;
        }
        
        /* 성능 정보 */
        .performance-info {
            background: linear-gradient(135deg, #f5f5f5, #e9ecef);
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        
        .perf-item {
            text-align: center;
        }
        
        .perf-label {
            color: #666;
            font-size: 14px;
            margin-bottom: 5px;
        }
        
        .perf-value {
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
        }
        
        /* 핵심 포인트 */
        .key-point {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            font-size: 1.1em;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .highlight {
            background: yellow;
            padding: 2px 5px;
            color: #333;
            border-radius: 3px;
            font-weight: bold;
        }
        
        /* 비교 테이블 */
        .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        
        .comparison-table th {
            background: #667eea;
            color: white;
            padding: 12px;
            text-align: left;
        }
        
        .comparison-table td {
            padding: 12px;
            border: 1px solid #dee2e6;
        }
        
        .comparison-table tr:nth-child(even) {
            background: #f8f9fa;
        }
        
        .good {
            color: #28a745;
            font-weight: bold;
        }
        
        .bad {
            color: #dc3545;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 CSS Counter 완벽 정리</h1>
        <p class="subtitle">JSP 20,000명 유저 관리 - "존나 쉬운" 3단계</p>
        
        <!-- 핵심 3단계 -->
        <div class="core-steps">
            <div class="step-card">
                <div class="step-number">1</div>
                <div class="step-title">CSS로 Counter 설정</div>
                <div class="step-code">.counter-container {
    counter-reset: item-counter;
}
.counter-item {
    counter-increment: item-counter;
}
.counter-item::before {
    content: counter(item-counter) ". ";
}</div>
                <div class="step-desc">
                    딱 3줄! CSS 예약어로 자동 번호 시스템 완성<br>
                    • counter-reset: 카운터 생성<br>
                    • counter-increment: 자동 +1<br>
                    • content: 번호 출력
                </div>
            </div>
            
            <div class="step-card">
                <div class="step-number">2</div>
                <div class="step-title">삭제 시 this의 부모 찾아서 날리기</div>
                <div class="step-code">function deleteUser(userId, buttonElement) {
    // this(버튼)의 부모 찾아서 삭제
    buttonElement.closest('.user-item').remove();
}</div>
                <div class="step-desc">
                    딱 1줄! closest()로 부모 찾고 remove()로 삭제<br>
                    • this = 클릭한 삭제 버튼<br>
                    • closest = 부모 중 .user-item 찾기<br>
                    • remove = 찾은 부모 전체 삭제
                </div>
            </div>
            
            <div class="step-card">
                <div class="step-number">3</div>
                <div class="step-title">CSS가 알아서 번호 재정렬</div>
                <div class="step-code">// JavaScript가 할 일: 없음!
// CSS 엔진이 자동으로:
// 1. 남은 요소 감지
// 2. counter 재계산
// 3. ::before 내용 업데이트</div>
                <div class="step-desc">
                    딱 0줄! CSS 엔진(C++)이 자동 처리<br>
                    • DOM 변경 감지<br>
                    • 번호 자동 재계산<br>
                    • 화면에 즉시 반영
                </div>
            </div>
        </div>
        
        <div class="key-point">
            💡 핵심: JavaScript는 DOM 제거만, <span class="highlight">CSS가 번호를 다시 그린다!</span>
        </div>
        
        <!-- 완성 코드 -->
        <div class="complete-code">
            <h2 class="section-title">📝 JSP 완성 코드</h2>
            
            <div class="code-block">
                <span class="code-label">CSS</span>
                <pre><code>/* 핵심 CSS - 이게 전부입니다! */
.counter-container {
    counter-reset: item-counter;     /* 1. 카운터 초기화 */
}

.counter-item {
    counter-increment: item-counter; /* 2. 각 아이템마다 +1 */
}

.counter-item::before {
    content: counter(item-counter) ". ";  /* 3. 번호 출력 */
    font-weight: bold;
    color: #007bff;
    margin-right: 5px;
}</code></pre>
            </div>
            
            <div class="code-block">
                <span class="code-label">HTML</span>
                <pre><code>&lt;div id="user-list" class="user-list counter-container"&gt;
    &lt;!-- 유저 데이터가 여기에 렌더링 --&gt;
&lt;/div&gt;</code></pre>
            </div>
            
            <div class="code-block">
                <span class="code-label">JavaScript</span>
                <pre><code>// 유저 렌더링
data.users.forEach((user) => {
    const userDiv = document.createElement('div');
    userDiv.className = 'counter-item user-item';  // CSS Counter 적용
    userDiv.innerHTML = 
        '&lt;div class="user-info"&gt;' +
            '&lt;strong&gt;' + user.username + '&lt;/strong&gt; - ' + user.email +
        '&lt;/div&gt;' +
        '&lt;button onclick="deleteUser(' + user.id + ', this)"&gt;삭제&lt;/button&gt;';
    container.appendChild(userDiv);
});

// 삭제 함수 - 핵심!
async function deleteUser(userId, buttonElement) {
    // 서버 삭제 요청
    const response = await fetch('/api/users/' + userId, {
        method: 'DELETE'
    });
    
    if (response.ok) {
        // this의 부모 찾아서 삭제 - 끝!
        buttonElement.closest('.user-item').remove();
        // CSS가 알아서 번호 재정렬함
    }
}</code></pre>
            </div>
        </div>
        
        <!-- 라이브 데모 -->
        <div class="demo-section">
            <h2 class="section-title">🎮 라이브 데모</h2>
            
            <div class="demo-controls">
                <button class="demo-btn btn-add" onclick="addUser()">➕ 유저 추가</button>
                <button class="demo-btn btn-load" onclick="loadUsers(10)">👥 10명 로드</button>
                <button class="demo-btn btn-load" onclick="loadUsers(100)">👥 100명 로드</button>
                <button class="demo-btn btn-load" onclick="loadUsers(1000)">👥 1000명 로드</button>
                <button class="demo-btn btn-reset" onclick="clearUsers()">🔄 초기화</button>
            </div>
            
            <div class="counter-container" id="userList">
                <!-- 유저가 여기에 표시됨 -->
            </div>
            
            <div class="performance-info">
                <div class="perf-item">
                    <div class="perf-label">유저 수</div>
                    <div class="perf-value" id="userCount">0</div>
                </div>
                <div class="perf-item">
                    <div class="perf-label">렌더링 시간</div>
                    <div class="perf-value"><span id="renderTime">0</span>ms</div>
                </div>
                <div class="perf-item">
                    <div class="perf-label">삭제 시간</div>
                    <div class="perf-value"><span id="deleteTime">0</span>ms</div>
                </div>
                <div class="perf-item">
                    <div class="perf-label">CSS 재계산</div>
                    <div class="perf-value good">자동</div>
                </div>
            </div>
        </div>
        
        <!-- 비교 -->
        <div class="complete-code">
            <h2 class="section-title">⚡ 성능 비교</h2>
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>구분</th>
                        <th>JavaScript 방식</th>
                        <th>CSS Counter 방식</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>삭제 시 동작</strong></td>
                        <td class="bad">모든 요소 순회하며 번호 업데이트</td>
                        <td class="good">DOM 제거만 (번호는 CSS가 처리)</td>
                    </tr>
                    <tr>
                        <td><strong>코드량</strong></td>
                        <td class="bad">번호 관리 로직 필요</td>
                        <td class="good">CSS 3줄 + remove() 1줄</td>
                    </tr>
                    <tr>
                        <td><strong>성능 (20,000명)</strong></td>
                        <td class="bad">O(n) - 느림</td>
                        <td class="good">O(1) - 빠름 (C++ 엔진)</td>
                    </tr>
                    <tr>
                        <td><strong>DOM 조작</strong></td>
                        <td class="bad">모든 요소 textContent 변경</td>
                        <td class="good">제거할 요소만 remove()</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="key-point">
            🎯 결론: CSS Counter = <span class="highlight">코드 적고, 빠르고, 자동화!</span><br>
            "CSS가 다시 그린다" = JavaScript 없이 CSS 엔진이 ::before 내용을 자동 업데이트
        </div>
    </div>
    
    <script>
        let userIdCounter = 1;
        
        function loadUsers(count) {
            const startTime = performance.now();
            const container = document.getElementById('userList');
            container.innerHTML = '';
            
            for (let i = 1; i <= count; i++) {
                const userDiv = document.createElement('div');
                userDiv.className = 'counter-item user-item';
                userDiv.innerHTML = `
                    <div class="user-info">
                        <strong>user${i}</strong> - user${i}@example.com (ID: ${i})
                    </div>
                    <button class="delete-btn" onclick="deleteUser(this)">삭제</button>
                `;
                container.appendChild(userDiv);
            }
            
            const endTime = performance.now();
            document.getElementById('renderTime').textContent = (endTime - startTime).toFixed(2);
            updateCount();
        }
        
        function addUser() {
            const container = document.getElementById('userList');
            const userDiv = document.createElement('div');
            userDiv.className = 'counter-item user-item';
            userDiv.innerHTML = `
                <div class="user-info">
                    <strong>user${userIdCounter}</strong> - user${userIdCounter}@example.com
                </div>
                <button class="delete-btn" onclick="deleteUser(this)">삭제</button>
            `;
            container.appendChild(userDiv);
            userIdCounter++;
            updateCount();
        }
        
        function deleteUser(buttonElement) {
            const startTime = performance.now();
            
            // 핵심: this의 부모 찾아서 삭제
            buttonElement.closest('.counter-item').remove();
            
            const endTime = performance.now();
            document.getElementById('deleteTime').textContent = (endTime - startTime).toFixed(2);
            updateCount();
        }
        
        function clearUsers() {
            document.getElementById('userList').innerHTML = '';
            document.getElementById('renderTime').textContent = '0';
            document.getElementById('deleteTime').textContent = '0';
            userIdCounter = 1;
            updateCount();
        }
        
        function updateCount() {
            const count = document.querySelectorAll('.counter-item').length;
            document.getElementById('userCount').textContent = count;
        }
        
        // 초기 데이터 로드
        window.onload = function() {
            loadUsers(5);
        };
    </script>
</body>
</html>