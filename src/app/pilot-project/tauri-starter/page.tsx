import React from 'react';

const TauriSetupManual = () => {
    const CodeBlock = ({ children, language = 'bash' }: { children: string, language?: string }) => (
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
            <code>{children}</code>
        </pre>
    );

    const SuccessIcon = () => (
        <span className="text-green-500 mr-2">✅</span>
    );

    const configTable = [
        { item: 'Project name', value: 'nexus-call-hub', desc: '프로젝트 폴더명' },
        { item: 'Identifier', value: 'kr.nexus.callhub', desc: '앱 고유 식별자 (한국 회사 기준)' },
        { item: 'Frontend language', value: 'TypeScript', desc: '타입 안정성을 위해 권장' },
        { item: 'Package manager', value: 'npm', desc: '가장 안정적인 패키지 매니저' },
        { item: 'UI template', value: 'React', desc: 'React 프레임워크' },
        { item: 'UI flavor', value: 'TypeScript', desc: 'React + TypeScript 조합' }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white">
            {/* Header */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Nexus Call Hub - Tauri + Vite + React 설치 메뉴얼
                </h1>
            </header>

            {/* Step 1 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 1: 프로젝트 생성</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">1.1 Tauri 프로젝트 초기화</h3>
                    <CodeBlock>npm create tauri-app@latest</CodeBlock>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">1.2 프로젝트 설정</h3>
                    <p className="text-gray-600 mb-4">대화형 설정에서 다음과 같이 입력:</p>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">설정 항목</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">선택값</th>
                                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">설명</th>
                                </tr>
                            </thead>
                            <tbody>
                                {configTable.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2 font-medium">{row.item}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <code className="bg-gray-100 px-2 py-1 rounded text-sm">{row.value}</code>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-gray-600">{row.desc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">1.3 생성 완료 확인</h3>
                    <CodeBlock>
                        {`✅ Project name : nexus-call-hub
✅ Identifier : kr.nexus.callhub  
✅ Choose which language to use for your frontend : TypeScript
✅ Choose your package manager : npm
✅ Choose your UI template : React
✅ Choose your UI flavor : TypeScript

Template created! To get started run:`}
                    </CodeBlock>
                </div>
            </section>

            {/* Step 2 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 2: 프로젝트 설정 및 의존성 설치</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">2.1 프로젝트 폴더로 이동</h3>
                    <CodeBlock>cd nexus-call-hub</CodeBlock>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">2.2 프로젝트 구조 확인</h3>
                    <CodeBlock>ls</CodeBlock>
                    <p className="text-gray-700 font-medium mt-4 mb-2">생성된 파일/폴더:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">[.]</code> - 현재 디렉토리</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">[node_modules]</code> - npm 패키지들</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">[src]</code> - React 소스 코드</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">[src-tauri]</code> - Rust 백엔드 코드</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">package.json</code> - 프로젝트 설정</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">vite.config.ts</code> - Vite 빌드 설정</li>
                        <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">tsconfig.json</code> - TypeScript 설정</li>
                        <li>기타 설정 파일들</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">2.3 의존성 설치</h3>
                    <CodeBlock>npm install</CodeBlock>
                    <p className="text-gray-700 font-medium mt-4 mb-2">설치 결과:</p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li>총 74개 패키지 설치 완료</li>
                        <li>보안 취약점 0개 발견</li>
                        <li>11개 패키지가 funding 지원 요청</li>
                    </ul>
                </div>
            </section>

            {/* Step 3 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 3: 개발 서버 실행</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">3.1 Tauri 개발 서버 시작</h3>
                    <CodeBlock>npm run tauri dev</CodeBlock>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">3.2 실행 결과 확인</h3>
                    <p className="text-gray-700 font-medium mb-2">성공 시 나타나는 것들:</p>
                    <ol className="list-decimal list-inside text-gray-600 space-y-2">
                        <li><strong>터미널</strong>: Rust 컴파일 및 개발 서버 시작 로그</li>
                        <li><strong>데스크톱 앱</strong>: "Welcome to Tauri + React" 화면이 나타남</li>
                        <li><strong>기본 기능</strong>:
                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                                <li>입력 필드 ("Enter a name...")</li>
                                <li>Greet 버튼</li>
                                <li>Tauri, Vite, React 로고 표시</li>
                            </ul>
                        </li>
                    </ol>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">3.3 앱 창 정보</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                        <li><strong>창 제목</strong>: <code className="bg-gray-100 px-2 py-1 rounded text-sm">nexus-call-hub</code></li>
                        <li><strong>프레임워크</strong>: Tauri + Vite + React</li>
                        <li><strong>언어</strong>: TypeScript</li>
                        <li><strong>상태</strong>: <span className="text-green-600 font-medium">정상 실행 중 ✅</span></li>
                    </ul>
                </div>
            </section>

            {/* Step 4 */}
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Step 4: 개발 환경 최종 확인</h2>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">4.1 프로젝트 구조 상세</h3>
                    <CodeBlock language="text">
                        {`nexus-call-hub/
├── src/                    # React 프론트엔드 소스
│   ├── App.tsx            # 메인 App 컴포넌트
│   ├── main.tsx           # React 엔트리 포인트
│   └── styles.css         # 스타일시트
├── src-tauri/             # Rust 백엔드 소스
│   ├── src/
│   │   └── main.rs        # Tauri 메인 파일
│   ├── Cargo.toml         # Rust 의존성 설정
│   └── tauri.conf.json    # Tauri 앱 설정
├── public/                # 정적 파일들
├── package.json           # Node.js 의존성 설정
├── vite.config.ts         # Vite 빌드 설정
└── tsconfig.json          # TypeScript 설정`}
                    </CodeBlock>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">4.2 개발 명령어 정리</h3>
                    <CodeBlock>
                        {`# 데스크톱 개발 서버 실행
npm run tauri dev

# 프로덕션 빌드 (실행 파일 생성)
npm run tauri build

# 앱 아이콘 생성 (필요시)
npm run tauri icon [아이콘파일.png]

# 안드로이드 개발 환경 초기화 (필요시)
npm run tauri android init

# 안드로이드 개발 서버 실행 (필요시)
npm run tauri android dev`}
                    </CodeBlock>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-700 mb-3">4.3 설정 파일 확인사항</h3>

                    <div className="space-y-4">
                        <div>
                            <p className="font-semibold text-gray-700 mb-2">package.json - 주요 의존성:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">@tauri-apps/api</code>: Tauri JavaScript API</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">react</code>: React 프레임워크</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">typescript</code>: TypeScript 지원</li>
                                <li><code className="bg-gray-100 px-2 py-1 rounded text-sm">vite</code>: 번들러</li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-700 mb-2">vite.config.ts - Vite 설정:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>React plugin 활성화</li>
                                <li>개발 서버 포트: 기본 5173</li>
                                <li>Hot Module Replacement (HMR) 지원</li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-700 mb-2">tsconfig.json - TypeScript 설정:</p>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>React JSX 지원</li>
                                <li>ES2020 타겟</li>
                                <li>엄격한 타입 체크 활성화</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-green-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">✨</span>
                    현재 상태: 설치 완료!
                </h2>
                <p className="text-green-700 text-lg">
                    프로젝트가 성공적으로 생성되고 실행되었습니다. 이제 본격적인 전화 상담 시스템 개발을 시작할 수 있습니다!
                </p>
            </section>
        </div>
    );
};

export default TauriSetupManual;