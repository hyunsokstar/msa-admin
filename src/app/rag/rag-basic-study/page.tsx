'use client';

import React, { useState } from 'react';
import {
    Copy, Check, ExternalLink, Code, Terminal, Database,
    Search, MessageCircle, /* ArrowDown, */ ArrowRight, BookOpen,
    Video, FileText, /* Globe, */ Layers, Brain, Zap, FileCode
} from 'lucide-react';

// 상태/섹션 아이디 타입 명시
type SectionId = 'overview' | 'architecture' | 'implementation' | 'database' | 'resources';

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
                type="button"
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 bg-white border border-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white"
            >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
        </div>
    );
};

// RAG 아키텍처 다이어그램
const RAGArchitecture = () => {
    return (
        <div className="border border-black p-6 bg-gray-50">
            <h4 className="font-bold mb-6 text-center text-lg">RAG Chain with PGVector 아키텍처</h4>

            {/* Data Ingestion Pipeline */}
            <div className="mb-8">
                <h5 className="font-bold mb-4 text-center bg-blue-100 p-2 border border-black">📥 데이터 수집 & 저장 파이프라인</h5>
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="border border-black p-3 bg-white text-center text-sm min-w-[140px]">
                        <FileText className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">문서 수집</div>
                        <div className="text-xs">Markdown, JSON, PDF</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div className="border border-black p-3 bg-white text-center text-sm min-w-[140px]">
                        <Layers className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">청킹</div>
                        <div className="text-xs">1000토큰 단위</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div className="border border-black p-3 bg-white text-center text-sm min-w-[140px]">
                        <Brain className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">임베딩</div>
                        <div className="text-xs">OpenAI text-embedding-3</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div className="border border-black p-3 bg-white text-center text-sm min-w-[140px]">
                        <Database className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">PGVector 저장</div>
                        <div className="text-xs">PostgreSQL + Vector</div>
                    </div>
                </div>
            </div>

            {/* Query Processing Pipeline */}
            <div>
                <h5 className="font-bold mb-4 text-center bg-green-100 p-2 border border-black">🔍 실시간 질의 응답 파이프라인</h5>
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="border border-black p-3 bg-white text-center text-sm min-w-[140px]">
                        <MessageCircle className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">사용자 질문</div>
                        <div className="text-xs">"Next.js 인증?"</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div className="border border-black p-3 bg-white text-center text-sm min-w-[140px]">
                        <Search className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">벡터 검색</div>
                        <div className="text-xs">코사인 유사도 0.5↑</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div className="border border-black p-3 bg-white text-center text-sm min-w-[140px]">
                        <Code className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">컨텍스트 구성</div>
                        <div className="text-xs">Top-5 문서 조합</div>
                    </div>
                    <ArrowRight className="w-6 h-6" />
                    <div className="border border-black p-3 bg-white text-center text-sm min-w-[140px]">
                        <Zap className="w-6 h-6 mx-auto mb-1" />
                        <div className="font-bold">LLM 응답</div>
                        <div className="text-xs">ChatGPT 스트리밍</div>
                    </div>
                </div>
            </div>

            {/* Data Flow */}
            <div className="mt-6 p-4 bg-yellow-50 border border-black">
                <h6 className="font-bold mb-2">🔄 데이터 흐름</h6>
                <div className="text-sm space-y-1">
                    <div>• <strong>저장 시:</strong> 문서 → 청킹 → 임베딩 → PGVector 테이블</div>
                    <div>• <strong>검색 시:</strong> 질문 → 임베딩 → 유사도 검색 → 관련 문서 반환</div>
                    <div>• <strong>응답 시:</strong> 관련 문서 + 질문 → ChatGPT → 컨텍스트 기반 답변</div>
                </div>
            </div>
        </div>
    );
};

export default function RAGSystemGuide() {
    const [activeSection, setActiveSection] = useState<SectionId>('overview');

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Header */}
            <header className="border-b-2 border-black">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <h1 className="text-3xl font-bold">RAG Chain with PGVector 구현 가이드</h1>
                    <p className="mt-1">Retrieval Augmented Generation 시스템 완벽 분석</p>
                </div>
            </header>

            {/* Navigation */}
            <nav className="border-b border-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex overflow-x-auto">
                        <button
                            onClick={() => setActiveSection('overview')}
                            className={`px-6 py-3 border-r border-black font-medium transition-colors whitespace-nowrap ${activeSection === 'overview' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                        >
                            시스템 개요
                        </button>
                        <button
                            onClick={() => setActiveSection('architecture')}
                            className={`px-6 py-3 border-r border-black font-medium transition-colors whitespace-nowrap ${activeSection === 'architecture' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                        >
                            아키텍처
                        </button>
                        <button
                            onClick={() => setActiveSection('implementation')}
                            className={`px-6 py-3 border-r border-black font-medium transition-colors whitespace-nowrap ${activeSection === 'implementation' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                        >
                            코드 구현
                        </button>
                        <button
                            onClick={() => setActiveSection('database')}
                            className={`px-6 py-3 border-r border-black font-medium transition-colors whitespace-nowrap ${activeSection === 'database' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                        >
                            DB 구조
                        </button>
                        <button
                            onClick={() => setActiveSection('resources')}
                            className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeSection === 'resources' ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                        >
                            참고 자료
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-8">

                {/* 시스템 개요 */}
                {activeSection === 'overview' && (
                    <div className="space-y-6">
                        <section className="border border-black">
                            <h2 className="font-bold text-xl p-4 border-b border-black bg-gray-50">
                                🎯 RAG 시스템이란?
                            </h2>
                            <div className="p-6 space-y-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-bold mb-3">기존 ChatGPT 방식</h3>
                                        <div className="border border-red-300 p-4 bg-red-50">
                                            <div className="text-sm space-y-2">
                                                <div>❌ <strong>일반적인 답변:</strong> "Next.js에서 인증을 구현하는 방법을 설명드리겠습니다..."</div>
                                                <div>❌ <strong>실시간 정보 부족:</strong> 최신 라이브러리나 프로젝트 정보 없음</div>
                                                <div>❌ <strong>구체성 부족:</strong> 실제 사용 가능한 코드나 프로젝트 링크 제공 불가</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold mb-3">RAG 방식</h3>
                                        <div className="border border-green-300 p-4 bg-green-50">
                                            <div className="text-sm space-y-2">
                                                <div>✅ <strong>실제 프로젝트 기반:</strong> "Next.js Auth Boilerplate를 추천드립니다"</div>
                                                <div>✅ <strong>구체적 정보:</strong> GitHub URL, 기술스택, 사용법 제공</div>
                                                <div>✅ <strong>최신 정보:</strong> 실제 저장된 프로젝트 데이터 활용</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border border-black p-4 bg-blue-50">
                                    <h4 className="font-bold mb-2">💡 핵심 원리</h4>
                                    <p className="text-sm">
                                        <strong>RAG(Retrieval Augmented Generation)</strong>는 사용자 질문과 관련된 정보를
                                        벡터 데이터베이스에서 <strong>실시간으로 검색</strong>하여, 그 정보를
                                        <strong>컨텍스트로 제공</strong>해 ChatGPT가 더 정확하고 구체적인 답변을 생성하도록 하는 기술입니다.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="border border-black">
                            <h2 className="font-bold text-xl p-4 border-b border-black bg-gray-50">
                                📊 우리 시스템 데이터
                            </h2>
                            <div className="p-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="border border-black p-4 text-center">
                                        <Database className="w-8 h-8 mx-auto mb-2" />
                                        <div className="font-bold text-lg">5개 프로젝트</div>
                                        <div className="text-sm text-gray-600">Next.js, React, Vue, Node.js</div>
                                    </div>
                                    <div className="border border-black p-4 text-center">
                                        <Brain className="w-8 h-8 mx-auto mb-2" />
                                        <div className="font-bold text-lg">1536차원 벡터</div>
                                        <div className="text-sm text-gray-600">OpenAI Embedding</div>
                                    </div>
                                    <div className="border border-black p-4 text-center">
                                        <Search className="w-8 h-8 mx-auto mb-2" />
                                        <div className="font-bold text-lg">0.5+ 유사도</div>
                                        <div className="text-sm text-gray-600">코사인 유사도 임계값</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* 아키텍처 */}
                {activeSection === 'architecture' && (
                    <div className="space-y-6">
                        <RAGArchitecture />

                        <section className="border border-black">
                            <h2 className="font-bold text-xl p-4 border-b border-black bg-gray-50">
                                🔧 기술 스택
                            </h2>
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="font-bold mb-3">Backend (Spring Boot)</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Code className="w-4 h-4" />
                                                <strong>Spring AI:</strong> ChatGPT API 연동, 임베딩 생성
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Database className="w-4 h-4" />
                                                <strong>PostgreSQL + PGVector:</strong> 벡터 데이터 저장/검색
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-4 h-4" />
                                                <strong>WebFlux:</strong> 실시간 스트리밍 응답
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold mb-3">Frontend (Tauri + React)</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <MessageCircle className="w-4 h-4" />
                                                <strong>Server-Sent Events:</strong> 실시간 스트리밍
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Terminal className="w-4 h-4" />
                                                <strong>TanStack Query:</strong> 비동기 상태 관리
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FileCode className="w-4 h-4" />
                                                <strong>TypeScript:</strong> 타입 안전성
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* 코드 구현 */}
                {activeSection === 'implementation' && (
                    <div className="space-y-6">
                        <section className="border border-black">
                            <h2 className="font-bold text-xl p-4 border-b border-black bg-gray-50">
                                💻 핵심 코드 분석
                            </h2>
                            <div className="p-6 space-y-6">

                                {/* VectorService */}
                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-gray-100">
                                        📁 VectorService.java - 벡터 저장 & 검색
                                    </h3>
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2">문서 저장</h4>
                                        <CodeBlock code={`public void saveDocument(String text, String title, String domain, Map<String, Object> meta) {
    // 1. 메타데이터 준비
    Map<String, Object> metadata = new HashMap<>();
    String documentId = UUID.randomUUID().toString();
    metadata.put("id", documentId);
    metadata.put("title", title);
    metadata.put("domain", domain);
    metadata.putAll(meta); // tags, stack, githubUrl 등
    
    // 2. Document 생성 (Spring AI가 자동으로 임베딩 생성)
    Document doc = new Document(documentId, text, metadata);
    
    // 3. PGVector에 저장
    vectorStore.add(List.of(doc));
}`} language="java" />

                                        <h4 className="font-bold mb-2 mt-4">유사도 검색</h4>
                                        <CodeBlock code={`public List<ProjectInfo> findProjectsWithDetails(String question, int count) {
    // 1. 검색 요청 생성
    SearchRequest searchRequest = SearchRequest.query(question)
            .withTopK(count)                    // 상위 N개
            .withSimilarityThreshold(0.5);      // 유사도 0.5 이상
    
    // 2. 벡터 검색 실행 (코사인 유사도)
    List<Document> documents = vectorStore.similaritySearch(searchRequest);
    
    // 3. ProjectInfo로 변환
    return documents.stream()
            .map(this::convertToProjectInfo)
            .toList();
}`} language="java" />
                                    </div>
                                </div>

                                {/* ChatGptService */}
                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-gray-100">
                                        🤖 ChatGptService.java - RAG 프롬프트 생성
                                    </h3>
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2">컨텍스트 구성</h4>
                                        <CodeBlock code={`private String buildContextFromProjects(List<ProjectInfo> projects) {
    StringBuilder context = new StringBuilder();
    context.append("다음은 검색된 관련 프로젝트/보일러플레이트 정보입니다:\\n\\n");
    
    for (int i = 0; i < projects.size(); i++) {
        ProjectInfo project = projects.get(i);
        context.append(String.format("## %d. %s\\n", i + 1, project.getTitle()));
        context.append(String.format("**설명**: %s\\n", project.getDescription()));
        context.append(String.format("**GitHub**: %s\\n", project.getGithubUrl()));
        context.append(String.format("**기술스택**: %s\\n", String.join(", ", project.getStack())));
        // ... 더 많은 정보
    }
    return context.toString();
}`} language="java" />

                                        <h4 className="font-bold mb-2 mt-4">RAG 프롬프트</h4>
                                        <CodeBlock code={`private String buildEnhancedPrompt(String userMessage, String context) {
    return String.format("""
        사용자 질문: %s
        
        %s
        
        위의 검색 결과를 바탕으로 사용자의 질문에 대해 구체적이고 도움이 되는 답변을 제공해주세요.
        
        답변 가이드라인:
        - 검색된 프로젝트들 중에서 가장 관련 있는 것들을 우선으로 설명
        - GitHub URL이 있다면 링크로 제공
        - 기술스택과 태그 정보를 활용하여 구체적인 설명 제공
        - 실용적인 사용법이나 설치 방법 포함
        """, userMessage, context);
}`} language="java" />
                                    </div>
                                </div>

                                {/* Controller */}
                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-gray-100">
                                        🌐 ChatGptController.java - 스트리밍 API
                                    </h3>
                                    <div className="p-4">
                                        <CodeBlock code={`@PostMapping(value = "/stream/{streamId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
public Flux<String> streamChatWithId(
        @PathVariable String streamId,
        @RequestBody ChatRequest request,
        @RequestParam(defaultValue = "5") int vectorCount) {
    
    // RAG 파이프라인: 질문 → 벡터 검색 → 컨텍스트 구성 → ChatGPT 스트리밍
    return chatGptService.streamChatWithVector(
        request.getMessage(), 
        streamId, 
        vectorCount
    );
}`} language="java" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* DB 구조 */}
                {activeSection === 'database' && (
                    <div className="space-y-6">
                        <section className="border border-black">
                            <h2 className="font-bold text-xl p-4 border-b border-black bg-gray-50">
                                🗄️ PGVector 데이터베이스 구조
                            </h2>
                            <div className="p-6 space-y-6">

                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-gray-100">
                                        📋 vector_store 테이블 스키마
                                    </h3>
                                    <div className="p-4">
                                        <CodeBlock code={`CREATE TABLE vector_store (
    id UUID PRIMARY KEY,                    -- 문서 고유 ID
    content TEXT NOT NULL,                  -- 원본 텍스트 내용
    metadata JSONB,                         -- 메타데이터 (title, tags, stack 등)
    embedding VECTOR(1536)                  -- OpenAI 임베딩 벡터 (1536차원)
);

-- 벡터 유사도 검색을 위한 인덱스
CREATE INDEX idx_vector_store_embedding ON vector_store 
USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);`} language="sql" />
                                    </div>
                                </div>

                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-gray-100">
                                        💾 실제 저장된 데이터 예시
                                    </h3>
                                    <div className="p-4">
                                        <CodeBlock code={`{
  "id": "9108b3b7-7a47-48a0-8dbb-95c4c02e14c8",
  "content": "Next.js 15와 Shadcn/ui를 사용한 최신 인증 보일러플레이트입니다...",
  "metadata": {
    "title": "Next.js Auth Boilerplate",
    "domain": "boilerplate",
    "githubUrl": "https://github.com/terec/nextjs-auth",
    "stack": ["Next.js", "React", "TypeScript", "NextAuth.js"],
    "tags": ["auth", "nextjs", "shadcn", "authentication"],
    "author": "terec",
    "version": "1.0.0",
    "timestamp": 1754808253919
  },
  "embedding": [0.001234, -0.005678, 0.009876, ... ] // 1536개 실수 배열
}`} language="json" />
                                    </div>
                                </div>

                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-gray-100">
                                        🔍 벡터 검색 쿼리
                                    </h3>
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2">유사도 검색 SQL</h4>
                                        <CodeBlock code={`-- 코사인 유사도 기반 검색
SELECT id, content, metadata, 
       (embedding <=> $1) AS distance
FROM vector_store 
WHERE (embedding <=> $1) < 0.5  -- 유사도 임계값
ORDER BY distance 
LIMIT 5;

-- $1: 질문의 임베딩 벡터 [0.001, -0.002, ...]`} language="sql" />

                                        <h4 className="font-bold mb-2 mt-4">유사도 계산 원리</h4>
                                        <div className="bg-blue-50 border border-blue-300 p-4">
                                            <div className="text-sm space-y-2">
                                                <div><strong>코사인 유사도:</strong> 두 벡터 간의 각도를 측정</div>
                                                <div><strong>거리 값:</strong> 0에 가까울수록 유사함 (0 = 완전 동일)</div>
                                                <div><strong>임계값 0.5:</strong> 이보다 작은 값만 검색 결과로 반환</div>
                                                <div><strong>정렬:</strong> 거리 순으로 정렬하여 가장 유사한 문서부터 반환</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* 참고 자료 */}
                {activeSection === 'resources' && (
                    <div className="space-y-6">
                        <section className="border border-black">
                            <h2 className="font-bold text-xl p-4 border-b border-black bg-gray-50">
                                📚 RAG 학습 자료
                            </h2>
                            <div className="p-6 space-y-6">

                                {/* 강의 */}
                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-blue-50 flex items-center gap-2">
                                        <Video className="w-5 h-5" />
                                        🎥 추천 강의
                                    </h3>
                                    <div className="p-4 space-y-4">
                                        <div className="border-l-4 border-blue-500 pl-4">
                                            <h4 className="font-bold">DeepLearning.AI - Building RAG Systems</h4>
                                            <p className="text-sm text-gray-600 mb-2">Andrew Ng의 RAG 구축 실전 강의</p>
                                            <a href="https://www.deeplearning.ai/short-courses/building-applications-with-vector-databases/"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                deeplearning.ai/short-courses
                                            </a>
                                        </div>

                                        <div className="border-l-4 border-green-500 pl-4">
                                            <h4 className="font-bold">LangChain Academy</h4>
                                            <p className="text-sm text-gray-600 mb-2">RAG 파이프라인 구축 실습</p>
                                            <a href="https://academy.langchain.com/"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-green-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                academy.langchain.com
                                            </a>
                                        </div>

                                        <div className="border-l-4 border-purple-500 pl-4">
                                            <h4 className="font-bold">Pinecone Learn - Vector Database Course</h4>
                                            <p className="text-sm text-gray-600 mb-2">벡터 데이터베이스 완전 정복</p>
                                            <a href="https://www.pinecone.io/learn/"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-purple-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                pinecone.io/learn
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* 문서 */}
                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-green-50 flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        📖 공식 문서
                                    </h3>
                                    <div className="p-4 space-y-4">
                                        <div className="border-l-4 border-orange-500 pl-4">
                                            <h4 className="font-bold">Spring AI Documentation</h4>
                                            <p className="text-sm text-gray-600 mb-2">Vector Store, ChatGPT 연동 가이드</p>
                                            <a href="https://docs.spring.io/spring-ai/reference/"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-orange-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                docs.spring.io/spring-ai
                                            </a>
                                        </div>

                                        <div className="border-l-4 border-blue-500 pl-4">
                                            <h4 className="font-bold">PGVector Documentation</h4>
                                            <p className="text-sm text-gray-600 mb-2">PostgreSQL 벡터 확장 사용법</p>
                                            <a href="https://github.com/pgvector/pgvector"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                github.com/pgvector/pgvector
                                            </a>
                                        </div>

                                        <div className="border-l-4 border-green-500 pl-4">
                                            <h4 className="font-bold">OpenAI Embeddings Guide</h4>
                                            <p className="text-sm text-gray-600 mb-2">텍스트 임베딩 API 사용법</p>
                                            <a href="https://platform.openai.com/docs/guides/embeddings"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-green-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                platform.openai.com/docs/guides/embeddings
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* 논문 & 리서치 */}
                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-yellow-50 flex items-center gap-2">
                                        <BookOpen className="w-5 h-5" />
                                        🔬 논문 & 리서치
                                    </h3>
                                    <div className="p-4 space-y-4">
                                        <div className="border-l-4 border-red-500 pl-4">
                                            <h4 className="font-bold">RAG 원본 논문</h4>
                                            <p className="text-sm text-gray-600 mb-2">Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks</p>
                                            <a href="https://arxiv.org/abs/2005.11401"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-red-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                arxiv.org/abs/2005.11401
                                            </a>
                                        </div>

                                        <div className="border-l-4 border-indigo-500 pl-4">
                                            <h4 className="font-bold">Vector Database Survey</h4>
                                            <p className="text-sm text-gray-600 mb-2">벡터 데이터베이스 비교 분석 논문</p>
                                            <a href="https://arxiv.org/abs/2310.11703"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-indigo-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                arxiv.org/abs/2310.11703
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* 실습 자료 */}
                                <div className="border border-black">
                                    <h3 className="font-bold p-3 border-b border-black bg-pink-50 flex items-center gap-2">
                                        <Code className="w-5 h-5" />
                                        💻 실습 자료
                                    </h3>
                                    <div className="p-4 space-y-4">
                                        <div className="border-l-4 border-cyan-500 pl-4">
                                            <h4 className="font-bold">우리 프로젝트 GitHub</h4>
                                            <p className="text-sm text-gray-600 mb-2">완전한 RAG 시스템 구현 예제</p>
                                            <div className="space-y-1">
                                                <a href="https://github.com/hyunsokstar/study-spring-security"
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="text-cyan-600 hover:underline text-sm flex items-center gap-1">
                                                    <ExternalLink className="w-4 h-4" />
                                                    Backend (Spring Boot + Spring AI)
                                                </a>
                                                <a href="https://github.com/hyunsokstar/nexus-call-hub"
                                                    target="_blank" rel="noopener noreferrer"
                                                    className="text-cyan-600 hover:underline text-sm flex items-center gap-1">
                                                    <ExternalLink className="w-4 h-4" />
                                                    Frontend (Tauri + React)
                                                </a>
                                            </div>
                                        </div>

                                        <div className="border-l-4 border-violet-500 pl-4">
                                            <h4 className="font-bold">LangChain Templates</h4>
                                            <p className="text-sm text-gray-600 mb-2">RAG 구현 템플릿 모음</p>
                                            <a href="https://github.com/langchain-ai/langchain/tree/master/templates"
                                                target="_blank" rel="noopener noreferrer"
                                                className="text-violet-600 hover:underline text-sm flex items-center gap-1">
                                                <ExternalLink className="w-4 h-4" />
                                                github.com/langchain-ai/langchain/templates
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Quick Start */}
                        <section className="border-2 border-black bg-gray-50">
                            <h2 className="font-bold text-xl p-4 border-b border-black">
                                🚀 빠른 시작 가이드
                            </h2>
                            <div className="p-6">
                                <h3 className="font-bold mb-3">환경 설정</h3>
                                <CodeBlock code={`# 1. PostgreSQL + PGVector 설치
docker run -d \\
  --name pgvector \\
  -e POSTGRES_PASSWORD=password \\
  -p 5432:5432 \\
  pgvector/pgvector:pg16

# 2. 프로젝트 클론 & 실행
git clone https://github.com/hyunsokstar/study-spring-security
cd study-spring-security
./gradlew bootRun

# 3. 프론트엔드 실행
git clone https://github.com/hyunsokstar/nexus-call-hub
cd nexus-call-hub
npm install
npm run tauri dev`} />

                                <div className="mt-4 p-4 bg-blue-100 border border-blue-300">
                                    <h4 className="font-bold mb-2">💡 학습 순서 추천</h4>
                                    <ol className="text-sm space-y-1 list-decimal list-inside">
                                        <li>RAG 기본 개념 이해 (DeepLearning.AI 강의)</li>
                                        <li>벡터 데이터베이스 원리 학습 (Pinecone Learn)</li>
                                        <li>Spring AI 공식 문서 읽기</li>
                                        <li>우리 프로젝트 코드 분석</li>
                                        <li>직접 RAG 시스템 구현해보기</li>
                                    </ol>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

            </main>
        </div>
    );
}