'use client';

import React, { useState, ReactNode } from 'react';
import {
  BookOpen, Bot, Wrench, Rocket, Settings, Terminal, Code2,
  ChevronRight, CheckCircle2, Copy, CheckCheck, Keyboard, GitBranch, Wand2
} from 'lucide-react';

type TabId = 'overview' | 'chatbot' | 'editors' | 'agents' | 'workflow';

interface TabButtonProps {
  id: TabId;
  active: boolean;
  onClick: (id: TabId) => void;
  icon: React.ComponentType<{ className?: string }>;
  children: ReactNode;
}

interface CardProps {
  title?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

interface CodeBlockProps {
  id: string;
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

const TabButton: React.FC<TabButtonProps> = ({ id, active, onClick, icon: Icon, children }) => (
  <button
    type="button"
    onClick={() => onClick(id)}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
      ${active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
  >
    <Icon className="w-4 h-4" />
    {children}
  </button>
);

const Card: React.FC<CardProps> = ({ title, icon: Icon, children, className = '', subtitle }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm ${className}`}>
    {(title || Icon) && (
      <div className="px-6 pt-5">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-slate-500" />}
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
        </div>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
    )}
    <div className={`${title ? 'px-6 pb-6 pt-4' : 'p-6'}`}>{children}</div>
  </div>
);

const CodeBlock: React.FC<CodeBlockProps> = ({ id, code, language = 'bash', filename, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };
  return (
    <div className={`relative group ${className}`}>
      {!!filename && (
        <div className="bg-slate-900 text-slate-400 px-4 py-2 text-xs font-mono rounded-t-xl border-b border-slate-800">
          {filename}
        </div>
      )}
      <div className={`bg-slate-950 ${filename ? 'rounded-b-xl' : 'rounded-xl'} p-4 overflow-x-auto border border-slate-800`}>
        <pre className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
          <code className={`language-${language}`}>{code}</code>
        </pre>
        <button
          type="button"
          aria-label="Copy code"
          onClick={onCopy}
          className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
        >
          {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
        </button>
      </div>
    </div>
  );
};

export default function AIDevStrategyPage() {
  const [active, setActive] = useState<TabId>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">AI 개발 전략 매뉴얼</h1>
              <p className="text-slate-600 mt-2">
                현업에서 바로 쓰는 AI 개발 흐름: 챗봇 직접 활용 → 에디터/IDE 통합 → 채팅 에이전트 → 워크플로 자동화
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">실무 가이드</span>
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">v1.0</span>
            </div>
          </div>

          <nav className="mt-6 flex flex-wrap gap-2">
            <TabButton id="overview" active={active === 'overview'} onClick={setActive} icon={BookOpen}>개요</TabButton>
            <TabButton id="chatbot" active={active === 'chatbot'} onClick={setActive} icon={Bot}>챗봇 직접 활용</TabButton>
            <TabButton id="editors" active={active === 'editors'} onClick={setActive} icon={Wrench}>에디터/IDE 통합</TabButton>
            <TabButton id="agents" active={active === 'agents'} onClick={setActive} icon={Wand2}>채팅 에이전트</TabButton>
            <TabButton id="workflow" active={active === 'workflow'} onClick={setActive} icon={Rocket}>워크플로/자동화</TabButton>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {active === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <Card title="전략 핵심" icon={BookOpen}>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> 문제를 명확히 정의하고 프롬프트를 구조화합니다.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> 에디터/IDE와 깊게 통합하여 문맥(코드/파일/진행상황)을 활용합니다.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> 채팅 에이전트로 반복 작업(생성/리팩터/리뷰/테스트)을 자동화합니다.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /> 데이터/보안/버전 관리 원칙을 수립하고 로그로 재현성을 확보합니다.</li>
              </ul>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card title="필수 도구" icon={Settings}>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• VS Code / IntelliJ</li>
                  <li>• Cursor / Windsurf</li>
                  <li>• Claude Code, Copilot Chat</li>
                  <li>• Git, Issue/PR 템플릿</li>
                </ul>
              </Card>
              <Card title="추천 워크플로" icon={Rocket}>
                <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
                  <li>이슈 정의 → 요구사항 프롬프트</li>
                  <li>스캐폴딩/코드 생성</li>
                  <li>로컬 실행/테스트</li>
                  <li>리팩터/리뷰/문서화</li>
                </ol>
              </Card>
              <Card title="보안/가버넌스" icon={Settings}>
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• 비공개 키/비밀은 환경변수(.env)로 관리</li>
                  <li>• 고객/개인정보는 프롬프트에 포함 금지</li>
                  <li>• 모델 호출/결과는 로그로 저장</li>
                </ul>
              </Card>
            </div>
          </div>
        )}

        {active === 'chatbot' && (
          <div className="space-y-6 animate-fadeIn">
            <Card title="프롬프트 기본기" icon={Bot} subtitle="역할(Role) → 목표(Goal) → 제약(Constraints) → 산출물(Output) → 예시(Examples)">
              <CodeBlock
                id="prompt-framework"
                language="text"
                code={`역할: 당신은 시니어 풀스택 개발자입니다.
목표: Next.js + Tailwind로 반응형 랜딩 페이지를 생성하세요.
제약: 접근성(ARIA) 준수, 한국어 UI, 모바일 우선, 컴포넌트화.
산출물: page.tsx 전체 코드와 필요한 스타일.
예시: 버튼/히어로/푸터 섹션 포함.`}
              />
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                <div>
                  <div className="font-semibold mb-1">좋은 프롬프트 팁</div>
                  <ul className="space-y-1">
                    <li>• 입력 컨텍스트를 구체화 (파일 경로, 에러 로그 포함)</li>
                    <li>• 포맷 명시 (파일 전체/패치/테스트 등)</li>
                    <li>• 실패 시 재시도 전략 지시 ( 단계별로 묻기 )</li>
                  </ul>
                </div>
                <div>
                  <div className="font-semibold mb-1">확인 질문 예시</div>
                  <ul className="space-y-1">
                    <li>• 현재 디자인 시스템/컴포넌트 유무?</li>
                    <li>• 최소 지원 브라우저/디바이스?</li>
                    <li>• 성능/SEO 제약?</li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card title="디버깅/리팩터링 프롬프트" icon={Wrench}>
                <CodeBlock
                  id="debug-refactor"
                  language="text"
                  code={`문제: [에러 메시지/로그/스크린샷 요약]
코드: [관련 함수/컴포넌트 전체]
요구: 원인 분석 → 최소 수정으로 해결책 제시 → 성능/가독성 개선 포인트 3가지.`}
                />
              </Card>
              <Card title="테스트/문서화 프롬프트" icon={Code2}>
                <CodeBlock
                  id="test-docs"
                  language="text"
                  code={`대상: src/components/Button.tsx
요구: Jest/RTL 단위 테스트 5개 이상 + 스토리북 문서 생성.
제약: AAA 패턴, 경계값, 접근성 이벤트 포함.`}
                />
              </Card>
            </div>
          </div>
        )}

        {active === 'editors' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card title="VS Code 설정" icon={Wrench} subtitle="확장: GitHub Copilot, GitHub Copilot Chat, ESLint, Prettier">
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>1) Ctrl+Shift+X → 확장 검색: "GitHub Copilot", "Copilot Chat"</li>
                  <li>2) Ctrl+, → settings.json에 포맷/정렬 규칙 설정</li>
                </ul>
                <CodeBlock
                  id="vscode-settings"
                  filename=".vscode/settings.json"
                  language="json"
                  code={`{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.eol": "\\n",
  "typescript.tsserver.maxTsServerMemory": 4096,
  "editor.inlineSuggest.enabled": true,
  "github.copilot.enable": {
    "*": true,
    "plaintext": true,
    "markdown": true,
    "scminput": true
  }
}`}
                />
                <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                  <Keyboard className="w-4 h-4" /> 제안 수락: Tab / 인라인 프롬프트: Ctrl+I
                </div>
              </Card>

              <Card title="IntelliJ 설정" icon={Wrench} subtitle="플러그인: GitHub Copilot, AI Assistant(제공 시)">
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>1) File → Settings → Plugins → "GitHub Copilot"</li>
                  <li>2) Editor → Code Style/Inspections 구성</li>
                  <li>3) AI Assistant(제공 시) 활성화 후 프로젝트 컨텍스트로 질의</li>
                </ul>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card title="Cursor 활용" icon={Terminal} subtitle="파일/폴더 선택 → Command K → 목표 설명">
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• 대규모 리팩터: 폴더 단위 선택 → 변경 요약 요구</li>
                  <li>• 가드레일: 테스트 추가, 타입 강화 지시</li>
                  <li>• Commit Plan 생성 → diff 검토 후 적용</li>
                </ul>
              </Card>
              <Card title="Windsurf 활용" icon={Terminal} subtitle="Agent 탭에서 작업 계획 생성 → 멀티스텝 실행">
                <ul className="text-sm text-slate-700 space-y-1">
                  <li>• Issue 템플릿 붙여넣고 세부 작업 쪼개기</li>
                  <li>• 에이전트 실행 전 변경 범위/리스크 명시</li>
                  <li>• 각 스텝 후 실제 파일 diff 확인</li>
                </ul>
              </Card>
            </div>
          </div>
        )}

        {active === 'agents' && (
          <div className="space-y-6 animate-fadeIn">
            <Card title="Claude Code (VS Code 확장)" icon={Bot} subtitle="파일 컨텍스트와 대화형 리팩터, 테스트 생성, 오류 분석">
              <ul className="text-sm text-slate-700 space-y-1">
                <li>1) 확장: "Claude for VS Code" 설치</li>
                <li>2) 워크스페이스 설명 제공: 기술스택/규칙/테스트 정책</li>
                <li>3) 명령 예: "이 폴더 Jest 커버리지 80%까지 테스트 추가"</li>
              </ul>
              <CodeBlock
                id="claude-tasks"
                language="text"
                code={`역할: 시니어 테스트 엔지니어
목표: src/utils/* 유틸 함수 단위 테스트 추가 (커버리지 80%+)
제약: Jest + @testing-library, 경계값/에러케이스 포함
산출물: 테스트 파일들 + 실행 스크립트 + 요약 리포트`}
              />
            </Card>

            <Card title="GitHub Copilot Chat" icon={Bot} subtitle="에디터 내 컨텍스트 기반 질의/명령, 터미널/PR 리뷰 연계">
              <ul className="text-sm text-slate-700 space-y-1">
                <li>• 커서 위치/선택 영역 기반 답변</li>
                <li>• /fix, /explain, /tests 명령으로 빠른 작업</li>
                <li>• PR 설명/커밋 메시지 자동 생성</li>
              </ul>
              <CodeBlock
                id="copilot-pr"
                language="text"
                code={`요청: 변경 사항 요약 → Conventional Commits 규칙으로 커밋 메시지 3안 제안
컨텍스트: 현재 변경된 파일들(diff) 기반`}
              />
            </Card>
          </div>
        )}

        {active === 'workflow' && (
          <div className="space-y-6 animate-fadeIn">
            <Card title="이슈 → 구현 → PR 자동화" icon={Rocket}>
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <div className="font-semibold text-slate-800 mb-2">1) 이슈 템플릿</div>
                  <CodeBlock
                    id="issue-template"
                    filename=".github/ISSUE_TEMPLATE/feature.yml"
                    language="yaml"
                    code={`name: Feature
description: 새로운 기능 추가
body:
  - type: textarea
    id: context
    attributes:
      label: 배경/컨텍스트
  - type: textarea
    id: acceptance
    attributes:
      label: 수용 기준 (Given-When-Then)`}
                  />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 mb-2">2) 커밋/PR 템플릿</div>
                  <CodeBlock
                    id="commit-template"
                    filename=".github/pull_request_template.md"
                    language="markdown"
                    code={`## 변경 요약
- 

## 체크리스트
- [ ] 테스트 통과
- [ ] 문서 업데이트
- [ ] 브레이킹 체인지 없음

## 관련 이슈
Closes #`}
                  />
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card title="스캐폴딩 자동화 (npm 스크립트)" icon={Terminal}>
                <CodeBlock
                  id="scaffold-script"
                  filename="package.json (scripts)"
                  language="json"
                  code={`{
  "scripts": {
    "g:page": "hygen page new --name",
    "test": "jest --passWithNoTests",
    "lint": "eslint . --ext .ts,.tsx",
    "typecheck": "tsc --noEmit"
  }
}`}
                />
              </Card>

              <Card title="리뷰 가이드 프롬프트" icon={Code2}>
                <CodeBlock
                  id="review-prompt"
                  language="text"
                  code={`역할: 시니어 리뷰어
목표: 변경 코드의 안전성/성능/가독성 리뷰
제약: 타입 안정성, 경계값, 접근성, 보안 취약점
요구:
1) 리스크 목록
2) 개선 제안 (코드 예시)
3) 테스트 보완 포인트`}
                />
              </Card>
            </div>

            <Card title="로컬 검증 파이프라인" icon={Settings} subtitle="커밋 전 자동 검사로 품질 확보">
              <CodeBlock
                id="husky"
                filename=".husky/pre-commit"
                language="bash"
                code={`#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔎 Lint, Test, Typecheck..."
npm run lint && npm run typecheck && npm test`}
              />
            </Card>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn .25s ease; }
      `}</style>
    </div>
  );
}