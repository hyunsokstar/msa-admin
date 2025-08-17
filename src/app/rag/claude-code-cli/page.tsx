"use client";
import React, { useState } from 'react'
import { Terminal, Code, Settings, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react'

interface Props { }

const page = (props: Props) => {
    const [activeTab, setActiveTab] = useState('setup')

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <Terminal className="w-12 h-12 text-indigo-600 mr-3" />
                        <h1 className="text-4xl font-bold text-gray-800">Claude Code CLI</h1>
                    </div>
                    <p className="text-xl text-gray-600">터미널에서 Claude와 함께 코딩하세요</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-lg p-2">
                    {[
                        { id: 'setup', label: '설치 & 설정', icon: Settings },
                        { id: 'vscode', label: 'VS Code', icon: Code },
                        { id: 'intellij', label: 'IntelliJ', icon: Code },
                        { id: 'troubleshoot', label: '문제해결', icon: AlertCircle }
                    ].map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center px-4 py-2 m-1 rounded-lg transition-all ${activeTab === id
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Icon className="w-4 h-4 mr-2" />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {activeTab === 'setup' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">설치 및 초기 설정</h2>

                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        1. Claude Code CLI 설치
                                    </h3>
                                    <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                        <div># npm을 통한 설치</div>
                                        <div>npm install -g @anthropic-ai/claude-code</div>
                                        <div className="mt-2"># 또는 yarn 사용</div>
                                        <div>yarn global add @anthropic-ai/claude-code</div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        2. 인증 설정
                                    </h3>
                                    <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm mb-3">
                                        <div># 로그인</div>
                                        <div>claude auth login</div>
                                        <div className="mt-2"># 인증 상태 확인</div>
                                        <div>claude auth status</div>
                                    </div>
                                    <p className="text-sm text-gray-600">브라우저가 열리면서 Anthropic 계정으로 로그인하세요.</p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                        3. 기본 사용법
                                    </h3>
                                    <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                        <div># 도움말 보기</div>
                                        <div>claude --help</div>
                                        <div className="mt-2"># 대화형 모드 시작</div>
                                        <div>claude chat</div>
                                        <div className="mt-2"># 파일 작업</div>
                                        <div>claude edit filename.py "함수를 리팩토링해줘"</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vscode' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">VS Code와 함께 사용하기</h2>

                            <div className="space-y-6">
                                <div className="bg-blue-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3">통합 터미널에서 사용</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <strong>1. VS Code 터미널 열기:</strong>
                                            <code className="ml-2 bg-gray-200 px-2 py-1 rounded">Ctrl + `</code>
                                        </div>
                                        <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                            <div># 현재 파일 편집</div>
                                            <div>claude edit ./src/component.tsx "React 훅을 사용해서 최적화해줘"</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3">프로젝트 전체 분석</h3>
                                    <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                        <div># 프로젝트 구조 분석</div>
                                        <div>claude analyze --project</div>
                                        <div className="mt-2"># 특정 폴더 분석</div>
                                        <div>claude analyze ./src --recursive</div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3">유용한 워크플로우</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>• <strong>코드 리뷰:</strong> <code>claude review ./src/main.ts</code></li>
                                        <li>• <strong>테스트 생성:</strong> <code>claude test ./src/utils.js</code></li>
                                        <li>• <strong>문서화:</strong> <code>claude docs ./src/api.ts</code></li>
                                        <li>• <strong>리팩토링:</strong> <code>claude refactor ./legacy-code.js "모던 ES6+ 문법으로"</code></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'intellij' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">IntelliJ IDEA와 함께 사용하기</h2>

                            <div className="space-y-6">
                                <div className="bg-purple-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3">내장 터미널 사용</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <strong>터미널 열기:</strong>
                                            <code className="ml-2 bg-gray-200 px-2 py-1 rounded">Alt + F12</code>
                                        </div>
                                        <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                            <div># 현재 열린 파일 편집</div>
                                            <div>claude edit ./src/main/java/User.java "JPA 엔티티 최적화"</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3">Spring Boot 프로젝트 최적화</h3>
                                    <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                        <div># 컨트롤러 분석 및 개선</div>
                                        <div>claude analyze ./src/main/java/controller/ --spring</div>
                                        <div className="mt-2"># 서비스 레이어 리팩토링</div>
                                        <div>claude refactor ./src/main/java/service/UserService.java "DDD 패턴 적용"</div>
                                    </div>
                                </div>

                                <div className="bg-purple-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-3">Gradle/Maven 프로젝트 지원</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li>• <strong>의존성 분석:</strong> <code>claude analyze build.gradle</code></li>
                                        <li>• <strong>테스트 커버리지:</strong> <code>claude test --coverage ./src/test/</code></li>
                                        <li>• <strong>성능 최적화:</strong> <code>claude optimize ./src/main/java/ --performance</code></li>
                                        <li>• <strong>보안 검토:</strong> <code>claude security-check ./src/</code></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'troubleshoot' && (
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">문제해결</h2>

                            <div className="space-y-6">
                                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-red-800">OAuth 인증 오류</h3>
                                    <div className="text-red-700 mb-3">
                                        <code>API Error: 401 OAuth authentication is currently not supported</code>
                                    </div>
                                    <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                        <div># 인증 재설정</div>
                                        <div>claude auth logout</div>
                                        <div>claude auth login</div>
                                        <div className="mt-2"># 캐시 정리</div>
                                        <div>claude auth clear-cache</div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-yellow-800">설치 관련 문제</h3>
                                    <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                        <div># 완전 재설치</div>
                                        <div>npm uninstall -g @anthropic-ai/claude-code</div>
                                        <div>npm cache clean --force</div>
                                        <div>npm install -g @anthropic-ai/claude-code@latest</div>
                                    </div>
                                </div>

                                <div className="bg-green-50 border-l-4 border-green-400 p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-green-800">버전 확인 및 업데이트</h3>
                                    <div className="bg-black rounded-lg p-4 text-green-400 font-mono text-sm">
                                        <div># 현재 버전 확인</div>
                                        <div>claude --version</div>
                                        <div className="mt-2"># 최신 버전으로 업데이트</div>
                                        <div>npm update -g @anthropic-ai/claude-code</div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border-l-4 border-blue-400 p-6">
                                    <h3 className="text-lg font-semibold mb-3 text-blue-800">추가 도움말</h3>
                                    <p className="text-blue-700 mb-3">더 자세한 정보는 공식 문서를 참조하세요:</p>
                                    <a
                                        href="https://docs.anthropic.com/en/docs/claude-code"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
                                    >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Claude Code 공식 문서
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    <p>Claude Code CLI로 더 효율적인 개발을 경험해보세요!</p>
                </div>
            </div>
        </div>
    )
}

export default page