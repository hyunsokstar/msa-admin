'use client';

import React, { useState } from 'react';
import {
  ChevronRight, Copy, Check, ExternalLink, Code,
  Terminal, DollarSign, Github, Zap, FileCode
} from 'lucide-react';

const CodeBlock = ({ code, language = 'bash' }: { code: string; language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-white border border-black p-4 font-mono text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-white border border-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export default function AIDevGuide() {
  const [activeTab, setActiveTab] = useState('quick');

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold">AI 개발 도구 실전 가이드</h1>
          <p className="mt-1">프론트엔드 · 백엔드 개발자용</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex">
            <button
              onClick={() => setActiveTab('quick')}
              className={`px-6 py-3 border-r border-black font-medium transition-colors ${activeTab === 'quick' ? 'bg-black text-white' : 'hover:bg-gray-50'
                }`}
            >
              빠른 시작
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-6 py-3 border-r border-black font-medium transition-colors ${activeTab === 'tools' ? 'bg-black text-white' : 'hover:bg-gray-50'
                }`}
            >
              도구 비교
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-6 py-3 border-r border-black font-medium transition-colors ${activeTab === 'agent' ? 'bg-black text-white' : 'hover:bg-gray-50'
                }`}
            >
              에이전트 TOP 3
            </button>
            <button
              onClick={() => setActiveTab('project')}
              className={`px-6 py-3 font-medium transition-colors ${activeTab === 'project' ? 'bg-black text-white' : 'hover:bg-gray-50'
                }`}
            >
              실전 프로젝트
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* 빠른 시작 */}
        {activeTab === 'quick' && (
          <div className="space-y-6">
            <section className="border border-black">
              <h2 className="font-bold text-xl p-4 border-b border-black bg-gray-50">
                🎯 핵심 전략 (3단계)
              </h2>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-black p-4">
                    <h3 className="font-bold mb-2">1. 프롬프트 작성</h3>
                    <pre className="text-xs bg-gray-50 p-2 font-mono">
                      {`역할: 시니어 풀스택 개발자
목표: React 컴포넌트 생성
제약: TypeScript, Tailwind
출력: 전체 코드`}
                    </pre>
                  </div>

                  <div className="border border-black p-4">
                    <h3 className="font-bold mb-2">2. 컨텍스트 제공</h3>
                    <pre className="text-xs bg-gray-50 p-2 font-mono">
                      {`현재 코드: [파일 첨부]
에러 로그: [붙여넣기]
기술 스택: Next.js 14
목표: 버그 수정`}
                    </pre>
                  </div>

                  <div className="border border-black p-4">
                    <h3 className="font-bold mb-2">3. 검증 & 반복</h3>
                    <pre className="text-xs bg-gray-50 p-2 font-mono">
                      {`테스트: Jest 단위 테스트
리뷰: "성능 개선점?"
문서: "JSDoc 추가"
반복: 피드백 적용`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 도구 비교 */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <section className="border border-black">
              <h2 className="font-bold text-xl p-4 border-b border-black bg-gray-50">
                💬 챗봇 직접 활용
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-black">
                      <th className="text-left p-3 font-bold">도구</th>
                      <th className="text-left p-3 font-bold">개발 강점</th>
                      <th className="text-left p-3 font-bold">최적 용도</th>
                      <th className="text-left p-3 font-bold">가격</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black">
                      <td className="p-3">
                        <strong>Claude</strong>
                      </td>
                      <td className="p-3 text-sm">
                        • 200K 토큰 (전체 코드베이스 분석)<br />
                        • Artifacts (즉시 실행 코드)<br />
                        • 정확한 디버깅
                      </td>
                      <td className="p-3 text-sm">
                        리팩토링, 코드 리뷰, 복잡한 디버깅
                      </td>
                      <td className="p-3 font-mono text-sm">$20/월</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-3">
                        <strong>ChatGPT</strong>
                      </td>
                      <td className="p-3 text-sm">
                        • 웹 검색 (최신 라이브러리)<br />
                        • Canvas (실시간 편집)<br />
                        • GPT-4o 빠른 응답
                      </td>
                      <td className="p-3 text-sm">
                        신기술 학습, 아키텍처 설계, 문서 작성
                      </td>
                      <td className="p-3 font-mono text-sm">$20/월</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-3">
                        <strong>Gemini</strong>
                      </td>
                      <td className="p-3 text-sm">
                        • 1M 토큰 (초대용량)<br />
                        • Google Cloud 통합<br />
                        • 빠른 처리 속도
                      </td>
                      <td className="p-3 text-sm">
                        대규모 마이그레이션, GCP 개발
                      </td>
                      <td className="p-3 font-mono text-sm">$20/월</td>
                    </tr>
                    <tr className="border-b border-black">
                      <td className="p-3">
                        <strong>Mistral</strong>
                      </td>
                      <td className="p-3 text-sm">
                        • 오픈소스 (자체 호스팅)<br />
                        • API 유연성<br />
                        • 데이터 보안
                      </td>
                      <td className="p-3 text-sm">
                        온프레미스, 보안 환경
                      </td>
                      <td className="p-3 font-mono text-sm">무료</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* 에이전트 TOP 3 */}
        {activeTab === 'agent' && (
          <div className="space-y-6">
            {/* GitHub Copilot */}
            <section className="border-2 border-black">
              <div className="p-4 border-b border-black bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-lg">1. GitHub Copilot</h3>
                <span className="font-mono text-sm">$10/월 (개인) · $19/월 (비즈니스)</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">핵심 기능</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Tab 자동완성 (인라인 제안)</li>
                      <li>✓ Copilot Chat (VS Code/JetBrains)</li>
                      <li>✓ /fix, /explain, /test 명령어</li>
                      <li>✓ PR 설명 자동 생성</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">설정 방법</h4>
                    <CodeBlock code={`# VS Code 설정
1. 확장 설치: GitHub Copilot
2. GitHub 로그인
3. 설정: Ctrl+Shift+P → Copilot
4. 사용: Tab (수락), Esc (거절)`} />
                  </div>
                </div>
                <div className="border border-black p-3 bg-gray-50">
                  <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer"
                    className="text-sm font-mono flex items-center gap-2 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    docs.github.com/copilot
                  </a>
                </div>
              </div>
            </section>

            {/* Cursor */}
            <section className="border-2 border-black">
              <div className="p-4 border-b border-black bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-lg">2. Cursor</h3>
                <span className="font-mono text-sm">$20/월 (Pro) · $40/월 (Business)</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">핵심 기능</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ Cmd+K (코드 편집)</li>
                      <li>✓ Cmd+L (채팅)</li>
                      <li>✓ 전체 코드베이스 인덱싱</li>
                      <li>✓ 멀티파일 동시 편집</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">프로젝트 설정</h4>
                    <CodeBlock code={`# .cursorrules 파일 생성
"TypeScript 사용"
"함수형 컴포넌트"
"Tailwind CSS"
"에러 처리 필수"`} />
                  </div>
                </div>
                <div className="border border-black p-3 bg-gray-50">
                  <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer"
                    className="text-sm font-mono flex items-center gap-2 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    cursor.sh
                  </a>
                </div>
              </div>
            </section>

            {/* Claude Code */}
            <section className="border-2 border-black">
              <div className="p-4 border-b border-black bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-lg">3. Claude Code</h3>
                <span className="font-mono text-sm">CLI 도구 (Claude API 키 필요)</span>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">핵심 기능</h4>
                    <ul className="text-sm space-y-1">
                      <li>✓ 터미널에서 직접 실행</li>
                      <li>✓ 전체 프로젝트 컨텍스트</li>
                      <li>✓ 자동 파일 생성/수정</li>
                      <li>✓ Git 통합</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">설치 및 사용</h4>
                    <CodeBlock code={`# 설치
npm install -g claude-code

# 사용
claude "버그 수정"
claude "테스트 추가"
claude "리팩토링"`} />
                  </div>
                </div>
                <div className="border border-black p-3 bg-gray-50">
                  <a href="https://docs.anthropic.com/claude-code" target="_blank" rel="noopener noreferrer"
                    className="text-sm font-mono flex items-center gap-2 hover:underline">
                    <ExternalLink className="w-4 h-4" />
                    docs.anthropic.com/claude-code
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* 실전 프로젝트 */}
        {activeTab === 'project' && (
          <div className="space-y-6">
            <section className="border-2 border-black">
              <div className="p-4 border-b border-black bg-gray-50">
                <h2 className="font-bold text-xl">🚀 파일럿 프로젝트: 챗봇 자동 응답 with RAG</h2>
              </div>
              <div className="p-6 space-y-6">

                {/* Frontend */}
                <div className="border border-black">
                  <div className="p-4 border-b border-black bg-gray-50">
                    <h3 className="font-bold flex items-center gap-2">
                      <FileCode className="w-5 h-5" />
                      Frontend
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="font-bold mb-2">기술 스택</p>
                      <div className="flex flex-wrap gap-2">
                        {['Tauri', 'Vite', 'React', 'TanStack Router', 'TanStack Query', 'Tailwind CSS', 'Shadcn UI'].map(tech => (
                          <span key={tech} className="px-2 py-1 border border-black text-sm">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-bold mb-2">프로젝트 구조</p>
                      <CodeBlock code={`src/
├── components/     # 재사용 컴포넌트
├── routes/        # TanStack Router 페이지
├── hooks/         # Custom Hooks
├── services/      # API 통신
├── lib/           # 유틸리티
└── main.tsx       # 엔트리 포인트`} />
                    </div>

                    <div className="flex items-center gap-4">
                      <a href="https://github.com/hyunsokstar/nexus-call-hub" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                        <span className="text-sm">GitHub 저장소</span>
                      </a>
                      <a href="https://github.com/hyunsokstar/nexus-call-hub/releases" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">다운로드</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Backend */}
                <div className="border border-black">
                  <div className="p-4 border-b border-black bg-gray-50">
                    <h3 className="font-bold flex items-center gap-2">
                      <Terminal className="w-5 h-5" />
                      Backend
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="font-bold mb-2">기술 스택</p>
                      <div className="flex flex-wrap gap-2">
                        {['Spring Boot 3', 'Spring Security', 'Spring AI', 'PostgreSQL', 'PGVector'].map(tech => (
                          <span key={tech} className="px-2 py-1 border border-black text-sm">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-bold mb-2">주요 구현</p>
                      <CodeBlock code={`// RAG 파이프라인
1. 문서 임베딩 → PGVector 저장
2. 유사도 검색 (코사인 유사도)
3. 컨텍스트 증강 프롬프트
4. Spring AI로 LLM 호출
5. 스트리밍 응답 반환`} />
                    </div>

                    <div>
                      <a href="https://github.com/hyunsokstar/study-spring-security" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                        <span className="text-sm">GitHub 저장소</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Start */}
                <div className="border border-black bg-gray-50 p-4">
                  <h4 className="font-bold mb-3">빠른 시작</h4>
                  <CodeBlock code={`# Backend 실행
cd study-spring-security
./gradlew bootRun

# Frontend 실행
cd nexus-call-hub
npm install
npm run tauri dev`} />
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}