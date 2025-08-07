"use client";

import React, { useState } from 'react';
import {
    ChevronDown, ChevronRight, Code, Database, Globe, Users,
    Building, Plane, BookOpen, Target, Clock, CheckCircle,
    ArrowRight, Zap, Shield, Server, GitBranch, Activity,
    Award, TrendingUp, Package, Layout, MessageSquare,
    FileText, Search, Bot, Cpu, Cloud, Key, Brain,
    Layers, RefreshCw, Sparkles, Workflow, BarChart
} from 'lucide-react';

const PilotProjectManual = () => {
    const [activeSection, setActiveSection] = useState('overview');

    interface ExpandedItems {
        [key: string]: boolean;
    }

    const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

    const toggleExpanded = (id: string): void => {
        setExpandedItems((prev: ExpandedItems) => ({ ...prev, [id]: !prev[id] }));
    };

    // 메뉴 아이템
    const menuItems = [
        { id: 'overview', title: '프로젝트 개요', icon: Layout },
        { id: 'concepts', title: '상담 자동화 개념', icon: Brain },
        { id: 'curriculum', title: '학습 커리큘럼', icon: BookOpen },
        { id: 'project1', title: 'DevTeam Brain', icon: Code },
        { id: 'project2', title: 'Policy Assistant', icon: Building },
        { id: 'project3', title: 'Travel Assistant', icon: Plane },
        { id: 'tech-stack', title: '기술 스택', icon: Server },
        { id: 'trends', title: '최신 기술 트렌드', icon: TrendingUp },
        { id: 'roadmap', title: '개발 로드맵', icon: Target },
        { id: 'resources', title: '학습 리소스', icon: Award }
    ];

    // 강의 커리큘럼 데이터 (실제 수집한 정보 반영)
    const curriculumData = {
        springAI: {
            title: "Spring AI 완전 정복",
            provider: "FastCampus",
            duration: "16주",
            modules: [
                "Part 1: Spring AI 소개 - 오픈소스 프레임워크 이해",
                "Part 2: AI 기본 지식 - Chat, Data, Models",
                "Part 3: Spring AI 개발 맛보기 - Local AI 환경 구성",
                "Part 4: Prompt Engineering - 효과적인 프롬프트 작성",
                "Part 5-6: Chat Architecture & 개발",
                "Part 7: Vector Databases - pgvector 활용",
                "Part 8-9: RAG (Retrieval Augmented Generation) 구현",
                "Part 10-11: Tool Calling - 함수 호출 통합",
                "Part 12-13: MCP (Model Context Protocol) 개발"
            ]
        },
        webflux: {
            title: "Spring WebFlux + LLM 실전구현",
            provider: "Inflearn",
            duration: "8주",
            modules: [
                "WebFlux 비동기 처리 모델 이해",
                "Reactor Pattern과 Mono/Flux",
                "LLM API 연동 (GPT, Claude)",
                "Non-blocking I/O로 성능 최적화",
                "실시간 스트리밍 응답 구현",
                "Redis 캐싱 전략",
                "Docker & GCP 배포"
            ]
        },
        llm: {
            title: "LLM 데이터 분석 & Fine-tuning",
            provider: "Inflearn",
            duration: "6주",
            modules: [
                "LangChain 기초 - 체인 구성",
                "웹 크롤링 & 데이터 수집",
                "임베딩과 벡터 DB 구축",
                "RAG 시스템 설계",
                "프롬프트 엔지니어링",
                "Fine-tuning with LoRA",
                "Multi-Agent 시스템"
            ]
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        {/* 헤더 섹션 */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
                            <h1 className="text-3xl font-bold mb-4">
                                🚀 RAG 기반 자동 응답 시스템 파일럿 프로젝트
                            </h1>
                            <p className="text-lg opacity-90">
                                Spring AI + pgvector로 구축하는 3개 도메인별 지능형 챗봇 시스템
                            </p>
                        </div>

                        {/* 3개 프로젝트 카드 */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                        <Code className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">DevTeam Brain</h3>
                                        <p className="text-sm text-gray-600">개발팀 지식관리</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    10-20명 개발팀의 실시간 업무 현황과 코딩 컨벤션을 통합 관리하는 지식 허브
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        GitHub, Jira, Confluence 연동
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        실시간 업무 현황 파악
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        코딩 컨벤션 즉시 검색
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg border border-green-200 p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="bg-green-100 p-3 rounded-lg mr-4">
                                        <Building className="h-8 w-8 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Policy Assistant</h3>
                                        <p className="text-sm text-gray-600">정부 정책 안내</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    청년/육아/주거 등 정부 정책을 개인 조건에 맞춰 자동 매칭
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        정부24, 복지로 API 연동
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        자격 조건 자동 매칭
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        신청 방법 단계별 안내
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-shadow">
                                <div className="flex items-center mb-4">
                                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                                        <Plane className="h-8 w-8 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Travel Assistant</h3>
                                        <p className="text-sm text-gray-600">교통/항공 정보</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    실시간 항공 운항 정보와 대중교통 도착 시간을 통합 제공
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        공항공사 API 활용
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        실시간 운항 정보
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                        대중교통 통합 안내
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 핵심 성과 지표 */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">📊 예상 성과 지표</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-blue-600">70%</div>
                                    <div className="text-sm text-gray-600 mt-1">반복 질문 감소</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-green-600">50%</div>
                                    <div className="text-sm text-gray-600 mt-1">온보딩 시간 단축</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-purple-600">90%</div>
                                    <div className="text-sm text-gray-600 mt-1">정보 정확도</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center">
                                    <div className="text-3xl font-bold text-orange-600">24/7</div>
                                    <div className="text-sm text-gray-600 mt-1">상시 응답 가능</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'concepts':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">🧠 상담 자동화 기본 개념</h2>
                            <p className="text-gray-700">RAG 기반 지능형 상담 시스템의 핵심 원리와 구현 방법</p>
                        </div>

                        {/* RAG 프로세스 플로우 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">RAG 상담 자동화 프로세스</h3>

                            <div className="space-y-6">
                                {/* Step 1 */}
                                <div className="flex items-start">
                                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                                        1
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-2">데이터 수집 및 전처리</h4>
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <p className="text-gray-700 mb-3">상담 참고 데이터를 카테고리별로 수집하고 정제</p>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>• FAQ, 매뉴얼, 정책 문서 수집</li>
                                                <li>• 텍스트 청킹 (Chunk Size: 512-1024 tokens)</li>
                                                <li>• 메타데이터 태깅 (카테고리, 날짜, 중요도)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-start">
                                    <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                                        2
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-2">임베딩 및 벡터 DB 저장</h4>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <p className="text-gray-700 mb-3">텍스트를 벡터로 변환하여 카테고리별 저장</p>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>• 임베딩 모델: OpenAI text-embedding-3-small</li>
                                                <li>• 벡터 차원: 1536 dimensions</li>
                                                <li>• pgvector에 카테고리별 인덱싱</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex items-start">
                                    <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                                        3
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-2">질의 처리 및 검색</h4>
                                        <div className="bg-purple-50 rounded-lg p-4">
                                            <p className="text-gray-700 mb-3">사용자 질문을 벡터화하여 유사도 검색</p>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>• 질문 임베딩 생성</li>
                                                <li>• Cosine Similarity 기반 검색</li>
                                                <li>• Top-K (K=5) 관련 문서 추출</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="flex items-start">
                                    <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">
                                        4
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-2">LLM 답변 생성</h4>
                                        <div className="bg-orange-50 rounded-lg p-4">
                                            <p className="text-gray-700 mb-3">검색된 컨텍스트를 기반으로 자연스러운 답변 생성</p>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>• 검색 결과를 프롬프트에 주입</li>
                                                <li>• GPT-4 또는 Claude로 답변 생성</li>
                                                <li>• 답변 품질 검증 및 후처리</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 카테고리 구조 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">벡터 DB 카테고리 구조</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">계층적 카테고리 설계</h4>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <pre className="text-sm text-gray-700">
                                            {`📁 상담 데이터
├── 📂 기술 지원
│   ├── 설치/설정
│   ├── 오류 해결
│   └── 성능 최적화
├── 📂 정책/규정
│   ├── 사내 정책
│   ├── 법적 요구사항
│   └── 보안 가이드
└── 📂 일반 문의
    ├── 계정 관리
    ├── 결제/청구
    └── 서비스 이용`}
                                        </pre>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">메타데이터 구조</h4>
                                    <div className="bg-gray-900 rounded-lg p-4 text-green-400">
                                        <pre className="text-sm">
                                            {`{
  "doc_id": "uuid",
  "category": "기술지원",
  "subcategory": "오류해결",
  "content": "텍스트 내용",
  "embedding": [0.1, 0.2, ...],
  "metadata": {
    "created_at": "2025-01-01",
    "priority": "high",
    "tags": ["error", "api"],
    "source": "confluence"
  }
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 핵심 구현 코드 */}
                        <div className="bg-gray-900 rounded-lg p-6 text-green-400">
                            <h3 className="text-white font-bold mb-4">RAG 상담 자동화 구현</h3>
                            <pre className="text-sm overflow-x-auto">
                                {`@Service
public class ConsultationRAGService {
    private final VectorStore vectorStore;
    private final ChatClient chatClient;
    private final EmbeddingClient embeddingClient;
    
    public ConsultationResponse processQuery(String userQuery, String category) {
        // 1. 질문 임베딩 생성
        List<Float> queryEmbedding = embeddingClient
            .embed(userQuery);
        
        // 2. 카테고리별 벡터 검색
        SearchRequest searchRequest = SearchRequest.builder()
            .query(queryEmbedding)
            .topK(5)
            .filter(Filter.eq("category", category))
            .similarityThreshold(0.7)
            .build();
            
        List<Document> relevantDocs = vectorStore
            .similaritySearch(searchRequest);
        
        // 3. 컨텍스트 구성
        String context = buildContext(relevantDocs);
        
        // 4. 프롬프트 템플릿
        String prompt = """
            당신은 전문 상담사입니다.
            다음 참고 자료를 바탕으로 질문에 답변하세요.
            
            참고 자료:
            %s
            
            사용자 질문: %s
            
            답변 지침:
            - 정확하고 도움이 되는 답변 제공
            - 참고 자료에 없는 내용은 추측하지 말 것
            - 필요시 추가 정보 요청
            """.formatted(context, userQuery);
        
        // 5. LLM 답변 생성
        ChatResponse response = chatClient.call(prompt);
        
        // 6. 응답 구성
        return ConsultationResponse.builder()
            .answer(response.getContent())
            .sources(relevantDocs)
            .confidence(calculateConfidence(relevantDocs))
            .build();
    }
    
    private double calculateConfidence(List<Document> docs) {
        // 유사도 점수 기반 신뢰도 계산
        return docs.stream()
            .mapToDouble(Document::getSimilarityScore)
            .average()
            .orElse(0.0);
    }
}`}
                            </pre>
                        </div>
                    </div>
                );

            case 'trends':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">🚀 최신 기술 트렌드</h2>
                            <p className="text-gray-700">2025년 RAG 시스템의 최신 기술 동향과 구현 패턴</p>
                        </div>

                        {/* Hybrid Search */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">1. Hybrid Search (하이브리드 검색)</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">기술 개요</h4>
                                    <p className="text-gray-700 mb-3">
                                        키워드 검색(BM25)과 벡터 검색을 결합하여 검색 정확도 향상
                                    </p>
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• <strong>BM25</strong>: 정확한 키워드 매칭</li>
                                            <li>• <strong>Vector Search</strong>: 의미적 유사도</li>
                                            <li>• <strong>RRF (Reciprocal Rank Fusion)</strong>: 결과 통합</li>
                                            <li>• 검색 정확도 30% 향상</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">구현 예제</h4>
                                    <div className="bg-gray-900 rounded-lg p-4 text-green-400">
                                        <pre className="text-xs">
                                            {`// Hybrid Search 구현
List<Doc> hybridSearch(String query) {
    // 1. BM25 검색
    List<Doc> keyword = elasticSearch
        .search(query);
    
    // 2. Vector 검색  
    List<Doc> semantic = vectorStore
        .similaritySearch(query);
    
    // 3. RRF로 결합
    return rankFusion(keyword, semantic);
}`}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Multi-Query RAG */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">2. Multi-Query RAG</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">개념</h4>
                                    <p className="text-gray-700 mb-3">
                                        하나의 질문을 여러 관점으로 재구성하여 검색 커버리지 확대
                                    </p>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <p className="text-sm font-semibold text-gray-900 mb-2">프로세스:</p>
                                        <ol className="space-y-1 text-sm text-gray-700">
                                            <li>1. 원본 질문 → 3-5개 변형 생성</li>
                                            <li>2. 각 변형으로 독립 검색</li>
                                            <li>3. 결과 통합 및 중복 제거</li>
                                            <li>4. 최종 컨텍스트 구성</li>
                                        </ol>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">활용 예시</h4>
                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <p className="text-sm font-semibold text-gray-900 mb-2">원본 질문:</p>
                                        <p className="text-sm text-gray-700 mb-3">"Spring Boot 성능 최적화 방법"</p>
                                        <p className="text-sm font-semibold text-gray-900 mb-2">생성된 변형:</p>
                                        <ul className="text-sm text-gray-700 space-y-1">
                                            <li>• "Spring Boot 애플리케이션 속도 향상"</li>
                                            <li>• "Spring Boot 메모리 사용량 줄이기"</li>
                                            <li>• "Spring Boot 튜닝 가이드"</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Self-RAG */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">3. Self-RAG (자가 검증 RAG)</h3>
                            <div className="space-y-4">
                                <p className="text-gray-700">
                                    LLM이 스스로 검색 결과의 관련성과 답변 품질을 평가하는 최신 기법
                                </p>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                        <div className="bg-white rounded-lg p-4">
                                            <Sparkles className="h-8 w-8 text-blue-600 mb-2" />
                                            <h5 className="font-semibold text-gray-900 mb-1">Relevance Check</h5>
                                            <p className="text-xs text-gray-600">검색 결과가 질문과 관련있는지 평가</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4">
                                            <Shield className="h-8 w-8 text-green-600 mb-2" />
                                            <h5 className="font-semibold text-gray-900 mb-1">Support Verification</h5>
                                            <p className="text-xs text-gray-600">답변이 컨텍스트에 의해 지원되는지 검증</p>
                                        </div>
                                        <div className="bg-white rounded-lg p-4">
                                            <BarChart className="h-8 w-8 text-purple-600 mb-2" />
                                            <h5 className="font-semibold text-gray-900 mb-1">Utility Score</h5>
                                            <p className="text-xs text-gray-600">답변의 유용성 점수 계산</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Graph RAG */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">4. Graph RAG</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Knowledge Graph 활용</h4>
                                    <p className="text-gray-700 mb-3">
                                        엔티티와 관계를 그래프로 구성하여 복잡한 질의 처리
                                    </p>
                                    <div className="bg-orange-50 rounded-lg p-4">
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• <strong>Neo4j</strong> + Vector Index</li>
                                            <li>• 엔티티 관계 기반 검색</li>
                                            <li>• 다중 홉 추론 가능</li>
                                            <li>• 복잡한 질의 30% 성능 향상</li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">적용 사례</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Workflow className="h-5 w-5 text-blue-600 mr-3" />
                                            <span className="text-sm text-gray-700">조직도 기반 권한 질의</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Layers className="h-5 w-5 text-green-600 mr-3" />
                                            <span className="text-sm text-gray-700">제품 간 의존성 분석</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <RefreshCw className="h-5 w-5 text-purple-600 mr-3" />
                                            <span className="text-sm text-gray-700">프로세스 플로우 질의</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 최적화 기법 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">5. 성능 최적화 기법</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h5 className="font-semibold text-gray-900 mb-2">Quantization</h5>
                                    <p className="text-sm text-gray-700 mb-2">벡터 양자화로 메모리 80% 절감</p>
                                    <div className="bg-white rounded p-2">
                                        <code className="text-xs text-gray-600">
                                            Float32 → Int8<br />
                                            1536D → 384D (PCA)
                                        </code>
                                    </div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h5 className="font-semibold text-gray-900 mb-2">Caching Strategy</h5>
                                    <p className="text-sm text-gray-700 mb-2">다층 캐싱으로 응답 속도 개선</p>
                                    <div className="bg-white rounded p-2">
                                        <code className="text-xs text-gray-600">
                                            L1: Redis (임베딩)<br />
                                            L2: pgvector (벡터)
                                        </code>
                                    </div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <h5 className="font-semibold text-gray-900 mb-2">Streaming</h5>
                                    <p className="text-sm text-gray-700 mb-2">실시간 스트리밍 응답</p>
                                    <div className="bg-white rounded p-2">
                                        <code className="text-xs text-gray-600">
                                            SSE (Server-Sent Events)<br />
                                            WebSocket for chat
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2025 트렌드 요약 */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-4">🎯 2025년 핵심 트렌드</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                                        <span>Small Language Models (SLM) 활용 증가</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                                        <span>Edge RAG - 로컬 디바이스 RAG 구현</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                                        <span>Multi-modal RAG (텍스트 + 이미지)</span>
                                    </li>
                                </ul>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                                        <span>Agentic RAG - 자율 에이전트 시스템</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                                        <span>Privacy-Preserving RAG 기술</span>
                                    </li>
                                    <li className="flex items-start">
                                        <CheckCircle className="h-4 w-4 mr-2 mt-0.5" />
                                        <span>실시간 지식 업데이트 시스템</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );

            case 'curriculum':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 통합 학습 커리큘럼</h2>

                        {/* Spring AI 커리큘럼 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                                        <Cpu className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{curriculumData.springAI.title}</h3>
                                        <p className="text-sm text-gray-600">{curriculumData.springAI.provider} • {curriculumData.springAI.duration}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleExpanded('springai-curriculum')}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    {expandedItems['springai-curriculum'] ?
                                        <ChevronDown className="h-5 w-5 text-gray-600" /> :
                                        <ChevronRight className="h-5 w-5 text-gray-600" />
                                    }
                                </button>
                            </div>

                            {expandedItems['springai-curriculum'] && (
                                <div className="space-y-3 mt-4">
                                    {curriculumData.springAI.modules.map((module, index) => (
                                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700">{module}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* WebFlux + LLM 커리큘럼 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                                        <Zap className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{curriculumData.webflux.title}</h3>
                                        <p className="text-sm text-gray-600">{curriculumData.webflux.provider} • {curriculumData.webflux.duration}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleExpanded('webflux-curriculum')}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    {expandedItems['webflux-curriculum'] ?
                                        <ChevronDown className="h-5 w-5 text-gray-600" /> :
                                        <ChevronRight className="h-5 w-5 text-gray-600" />
                                    }
                                </button>
                            </div>

                            {expandedItems['webflux-curriculum'] && (
                                <div className="space-y-3 mt-4">
                                    {curriculumData.webflux.modules.map((module, index) => (
                                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700">{module}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* LLM 커리큘럼 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                                        <Bot className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{curriculumData.llm.title}</h3>
                                        <p className="text-sm text-gray-600">{curriculumData.llm.provider} • {curriculumData.llm.duration}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleExpanded('llm-curriculum')}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    {expandedItems['llm-curriculum'] ?
                                        <ChevronDown className="h-5 w-5 text-gray-600" /> :
                                        <ChevronRight className="h-5 w-5 text-gray-600" />
                                    }
                                </button>
                            </div>

                            {expandedItems['llm-curriculum'] && (
                                <div className="space-y-3 mt-4">
                                    {curriculumData.llm.modules.map((module, index) => (
                                        <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                            <div className="bg-purple-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700">{module}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'project1':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">💼 DevTeam Brain</h2>
                            <p className="text-gray-700">개발팀 지식관리 자동 응답 시스템</p>
                        </div>

                        {/* 프로젝트 개요 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">프로젝트 개요</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">핵심 목표</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-gray-700">개발팀 업무 현황 실시간 파악</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-gray-700">코딩 컨벤션 및 베스트 프랙티스 즉시 검색</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-gray-700">기술 문서 통합 관리 및 검색</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-gray-700">온보딩 시간 50% 단축</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">데이터 소스</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <GitBranch className="h-5 w-5 text-blue-600 mr-3" />
                                            <span className="text-gray-700">GitHub (커밋, PR, 이슈)</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Activity className="h-5 w-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">Jira (스프린트, 태스크)</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <FileText className="h-5 w-5 text-purple-600 mr-3" />
                                            <span className="text-gray-700">Confluence (문서, 위키)</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <MessageSquare className="h-5 w-5 text-orange-600 mr-3" />
                                            <span className="text-gray-700">Slack (중요 메시지)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 구현 계획 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">구현 계획</h3>
                            <div className="space-y-4">
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-semibold text-gray-900">Week 1-2: 기초 구축</h4>
                                    <p className="text-gray-600 mt-1">Spring AI 설정, pgvector DB 구성, 기본 데이터 모델 설계</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h4 className="font-semibold text-gray-900">Week 3-4: 데이터 수집</h4>
                                    <p className="text-gray-600 mt-1">API 연동, 스케줄러 구현, 데이터 정제 및 임베딩</p>
                                </div>
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <h4 className="font-semibold text-gray-900">Week 5-6: RAG 구현</h4>
                                    <p className="text-gray-600 mt-1">벡터 검색, 프롬프트 엔지니어링, 응답 생성 최적화</p>
                                </div>
                            </div>
                        </div>

                        {/* 코드 예제 */}
                        <div className="bg-gray-900 rounded-lg p-6 text-green-400">
                            <h3 className="text-white font-bold mb-4">구현 예제</h3>
                            <pre className="text-sm overflow-x-auto">
                                {`@Service
public class DevRAGService {
    private final VectorStore vectorStore;
    private final ChatClient chatClient;
    
    public String answer(String question) {
        // 1. 벡터 검색
        List<Document> docs = vectorStore
            .similaritySearch(question, 5);
        
        // 2. 컨텍스트 구성
        String context = docs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\\n"));
        
        // 3. LLM 응답 생성
        return chatClient.call(
            buildPrompt(context, question)
        );
    }
}`}
                            </pre>
                        </div>
                    </div>
                );

            case 'project2':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">🏛️ Policy Assistant</h2>
                            <p className="text-gray-700">정부 정책 맞춤형 안내 시스템</p>
                        </div>

                        {/* 프로젝트 개요 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">프로젝트 개요</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">핵심 기능</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-gray-700">개인 조건별 정책 자동 매칭</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-gray-700">자격 조건 검증 시스템</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-gray-700">신청 절차 단계별 안내</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                            <span className="text-gray-700">중복 수혜 가능 여부 체크</span>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">API 연동</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Building className="h-5 w-5 text-blue-600 mr-3" />
                                            <span className="text-gray-700">정부24 통합 API</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Users className="h-5 w-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">복지로 API</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Award className="h-5 w-5 text-purple-600 mr-3" />
                                            <span className="text-gray-700">청년센터 API</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 사용 시나리오 */}
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">💬 사용 시나리오</h3>
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-4">
                                    <p className="font-semibold text-gray-900 mb-2">Q: "25살 대학생인데 월세 지원 받을 수 있나요?"</p>
                                    <p className="text-gray-700">
                                        A: "네, 받으실 수 있는 지원이 3가지 있습니다:<br />
                                        1. 청년월세 특별지원 (월 최대 20만원)<br />
                                        2. 대학생 주거장학금 (학기당 최대 200만원)<br />
                                        3. 행복주택 청년 우선공급<br />
                                        각 정책의 자세한 신청 방법을 안내해드릴까요?"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 구현 코드 */}
                        <div className="bg-gray-900 rounded-lg p-6 text-green-400">
                            <h3 className="text-white font-bold mb-4">정책 매칭 로직</h3>
                            <pre className="text-sm overflow-x-auto">
                                {`@Service
public class PolicyMatchingService {
    
    public List<Policy> matchPolicies(UserProfile user) {
        // 복합 조건 매칭
        String query = buildQuery(user);
        
        List<Document> policies = vectorStore
            .similaritySearch(query)
            .withFilter(Filter.and(
                Filter.lte("age_min", user.getAge()),
                Filter.gte("age_max", user.getAge()),
                Filter.eq("region", user.getRegion())
            ));
        
        return filterByEligibility(policies, user);
    }
}`}
                            </pre>
                        </div>
                    </div>
                );

            case 'project3':
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">✈️ Travel Assistant</h2>
                            <p className="text-gray-700">실시간 교통/항공 정보 통합 시스템</p>
                        </div>

                        {/* 프로젝트 개요 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">프로젝트 개요</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-purple-900 mb-2">항공 정보</h4>
                                    <ul className="text-sm text-purple-700 space-y-1">
                                        <li>• 실시간 운항 상태</li>
                                        <li>• 지연/결항 알림</li>
                                        <li>• 게이트 정보</li>
                                        <li>• 수하물 규정</li>
                                    </ul>
                                </div>
                                <div className="bg-pink-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-pink-900 mb-2">대중교통</h4>
                                    <ul className="text-sm text-pink-700 space-y-1">
                                        <li>• 버스/지하철 도착</li>
                                        <li>• 실시간 위치</li>
                                        <li>• 막차 정보</li>
                                        <li>• 환승 안내</li>
                                    </ul>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-indigo-900 mb-2">경로 안내</h4>
                                    <ul className="text-sm text-indigo-700 space-y-1">
                                        <li>• 최적 경로 추천</li>
                                        <li>• 예상 시간/요금</li>
                                        <li>• 실시간 교통 상황</li>
                                        <li>• 대안 경로 제시</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* API 통합 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">API 통합 구조</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">실시간 API</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Cloud className="h-5 w-5 text-blue-600 mr-3" />
                                            <span className="text-gray-700">한국공항공사 API</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Globe className="h-5 w-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">Amadeus API (항공편)</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Activity className="h-5 w-5 text-purple-600 mr-3" />
                                            <span className="text-gray-700">서울시 대중교통 API</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">하이브리드 검색</h4>
                                    <p className="text-gray-600 mb-3">실시간 데이터와 정적 정보를 결합한 통합 검색</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start">
                                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                            실시간 API 호출
                                        </li>
                                        <li className="flex items-start">
                                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                            벡터 DB 정적 정보 검색
                                        </li>
                                        <li className="flex items-start">
                                            <ArrowRight className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                                            통합 응답 생성
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 구현 코드 */}
                        <div className="bg-gray-900 rounded-lg p-6 text-green-400">
                            <h3 className="text-white font-bold mb-4">하이브리드 검색 구현</h3>
                            <pre className="text-sm overflow-x-auto">
                                {`@Service
public class TransportService {
    
    public TransportInfo getInfo(String query) {
        // 1. 실시간 API 호출
        FlightInfo flights = airportAPI
            .getRealtimeFlights();
        
        // 2. 정적 정보 벡터 검색
        List<Document> staticInfo = vectorStore
            .similaritySearch(query);
        
        // 3. 통합 응답
        return combineResults(
            flights, staticInfo
        );
    }
}`}
                            </pre>
                        </div>
                    </div>
                );

            case 'tech-stack':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">🛠️ 기술 스택</h2>

                        {/* Backend 기술 스택 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Backend Architecture</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Core Framework</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Server className="h-5 w-5 text-blue-600 mr-3" />
                                                <span className="text-gray-700">Spring Boot 3.2</span>
                                            </div>
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Core</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Cpu className="h-5 w-5 text-green-600 mr-3" />
                                                <span className="text-gray-700">Spring AI</span>
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">AI/ML</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Zap className="h-5 w-5 text-purple-600 mr-3" />
                                                <span className="text-gray-700">Spring WebFlux</span>
                                            </div>
                                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Reactive</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Data & Storage</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Database className="h-5 w-5 text-blue-600 mr-3" />
                                                <span className="text-gray-700">PostgreSQL + pgvector</span>
                                            </div>
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Vector DB</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Shield className="h-5 w-5 text-red-600 mr-3" />
                                                <span className="text-gray-700">Redis</span>
                                            </div>
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Cache</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center">
                                                <Bot className="h-5 w-5 text-green-600 mr-3" />
                                                <span className="text-gray-700">OpenAI / Ollama</span>
                                            </div>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">LLM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Frontend & DevOps */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Frontend & DevOps</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Frontend</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Layout className="h-5 w-5 text-blue-600 mr-3" />
                                            <span className="text-gray-700">Next.js 14 (App Router)</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Package className="h-5 w-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">Tauri (Desktop App)</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <MessageSquare className="h-5 w-5 text-purple-600 mr-3" />
                                            <span className="text-gray-700">WebSocket (실시간 통신)</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">DevOps & Monitoring</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Cloud className="h-5 w-5 text-blue-600 mr-3" />
                                            <span className="text-gray-700">Docker & Kubernetes</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <Activity className="h-5 w-5 text-green-600 mr-3" />
                                            <span className="text-gray-700">Prometheus + Grafana</span>
                                        </div>
                                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <GitBranch className="h-5 w-5 text-purple-600 mr-3" />
                                            <span className="text-gray-700">GitHub Actions CI/CD</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 아키텍처 다이어그램 */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">System Architecture</h3>
                            <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-300">
                                <div className="text-center text-gray-500">
                                    <div className="mb-4">
                                        <Cpu className="h-12 w-12 mx-auto text-gray-400" />
                                    </div>
                                    <p className="text-sm">
                                        Client → API Gateway → Spring Boot → Spring AI<br />
                                        ↓<br />
                                        Vector Store (pgvector) + Redis Cache<br />
                                        ↓<br />
                                        LLM (OpenAI/Ollama)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'roadmap':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">📈 개발 로드맵</h2>

                        {/* 전체 타임라인 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">16주 완성 계획</h3>

                            <div className="space-y-6">
                                {/* Phase 1 */}
                                <div className="relative">
                                    <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                                    <div className="flex items-start">
                                        <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold">
                                            1
                                        </div>
                                        <div className="ml-6 flex-1">
                                            <h4 className="text-lg font-bold text-gray-900">Phase 1: 기초 구축 (1-4주)</h4>
                                            <p className="text-gray-600 mb-3">Spring AI 환경 구성 및 기본 개념 학습</p>
                                            <div className="bg-blue-50 rounded-lg p-4">
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    <li>✓ Spring AI 프레임워크 이해</li>
                                                    <li>✓ pgvector 설치 및 설정</li>
                                                    <li>✓ 기본 Chat 구현</li>
                                                    <li>✓ 임베딩 생성 테스트</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Phase 2 */}
                                <div className="relative">
                                    <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                                    <div className="flex items-start">
                                        <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold">
                                            2
                                        </div>
                                        <div className="ml-6 flex-1">
                                            <h4 className="text-lg font-bold text-gray-900">Phase 2: RAG 구현 (5-8주)</h4>
                                            <p className="text-gray-600 mb-3">벡터 검색 및 RAG 시스템 구축</p>
                                            <div className="bg-green-50 rounded-lg p-4">
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    <li>✓ 데이터 수집 파이프라인</li>
                                                    <li>✓ 벡터 검색 구현</li>
                                                    <li>✓ 프롬프트 엔지니어링</li>
                                                    <li>✓ 응답 품질 최적화</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Phase 3 */}
                                <div className="relative">
                                    <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                                    <div className="flex items-start">
                                        <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold">
                                            3
                                        </div>
                                        <div className="ml-6 flex-1">
                                            <h4 className="text-lg font-bold text-gray-900">Phase 3: 프로젝트 구현 (9-12주)</h4>
                                            <p className="text-gray-600 mb-3">3개 파일럿 프로젝트 개발</p>
                                            <div className="bg-purple-50 rounded-lg p-4">
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    <li>✓ DevTeam Brain 구현</li>
                                                    <li>✓ Policy Assistant 구현</li>
                                                    <li>✓ Travel Assistant 구현</li>
                                                    <li>✓ Tool Calling 통합</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Phase 4 */}
                                <div className="relative">
                                    <div className="flex items-start">
                                        <div className="bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold">
                                            4
                                        </div>
                                        <div className="ml-6 flex-1">
                                            <h4 className="text-lg font-bold text-gray-900">Phase 4: 배포 & 최적화 (13-16주)</h4>
                                            <p className="text-gray-600 mb-3">프로덕션 배포 및 성능 최적화</p>
                                            <div className="bg-orange-50 rounded-lg p-4">
                                                <ul className="space-y-2 text-sm text-gray-700">
                                                    <li>✓ Docker 컨테이너화</li>
                                                    <li>✓ 모니터링 시스템 구축</li>
                                                    <li>✓ 성능 최적화</li>
                                                    <li>✓ 사용자 피드백 반영</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 주간 상세 계획 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">주간 학습 계획</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주차</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학습 내용</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">실습 과제</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">산출물</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1-2주</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">Spring AI 기초</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">Chat 구현</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">기본 챗봇</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3-4주</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">Vector DB 구축</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">pgvector 설정</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">벡터 검색 시스템</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">5-6주</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">RAG 구현</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">문서 검색 챗봇</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">RAG 시스템</td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">7-8주</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">WebFlux 통합</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">비동기 처리</td>
                                            <td className="px-6 py-4 text-sm text-gray-500">스트리밍 응답</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'resources':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 학습 리소스</h2>

                        {/* 강의 목록 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">추천 강의</h3>

                            <div className="space-y-4">
                                {/* FastCampus 강의 */}
                                <div className="border-l-4 border-blue-500 pl-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">Spring AI 컨트리뷰터에게 배우는 LLM & RAG 서비스 개발</h4>
                                            <p className="text-sm text-gray-600 mt-1">FastCampus • Spring AI 프레임워크 완전 정복</p>
                                            <div className="flex items-center mt-2 space-x-4">
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Spring AI</span>
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">RAG</span>
                                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Tool Calling</span>
                                            </div>
                                        </div>
                                        <a href="https://fastcampus.co.kr/dev_online_springai" target="_blank" rel="noopener noreferrer"
                                            className="ml-4 text-blue-600 hover:text-blue-800">
                                            <Key className="h-5 w-5" />
                                        </a>
                                    </div>
                                </div>

                                {/* Inflearn 강의 1 */}
                                <div className="border-l-4 border-green-500 pl-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">Spring WebFlux + LLM 실전구현</h4>
                                            <p className="text-sm text-gray-600 mt-1">Inflearn • 비동기 처리와 LLM API 연동</p>
                                            <div className="flex items-center mt-2 space-x-4">
                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">WebFlux</span>
                                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Reactive</span>
                                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">실시간</span>
                                            </div>
                                        </div>
                                        <a href="https://www.inflearn.com/course/spring-webflux-llm실전구현" target="_blank" rel="noopener noreferrer"
                                            className="ml-4 text-green-600 hover:text-green-800">
                                            <Key className="h-5 w-5" />
                                        </a>
                                    </div>
                                </div>

                                {/* Inflearn 강의 2 */}
                                <div className="border-l-4 border-purple-500 pl-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900">LLM 데이터 분석 - 웹 크롤링부터 추천 시스템까지</h4>
                                            <p className="text-sm text-gray-600 mt-1">Inflearn • LangChain과 데이터 수집/분석</p>
                                            <div className="flex items-center mt-2 space-x-4">
                                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">LangChain</span>
                                                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">크롤링</span>
                                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">데이터분석</span>
                                            </div>
                                        </div>
                                        <a href="https://www.inflearn.com/course/llm-데이터분석-웹크롤링-추천시스템" target="_blank" rel="noopener noreferrer"
                                            className="ml-4 text-purple-600 hover:text-purple-800">
                                            <Key className="h-5 w-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 추가 리소스 */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">추가 학습 자료</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">공식 문서</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center text-sm text-gray-700">
                                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                            Spring AI 공식 문서
                                        </li>
                                        <li className="flex items-center text-sm text-gray-700">
                                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                            pgvector GitHub 문서
                                        </li>
                                        <li className="flex items-center text-sm text-gray-700">
                                            <FileText className="h-4 w-4 text-gray-400 mr-2" />
                                            OpenAI API 가이드
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">커뮤니티</h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-center text-sm text-gray-700">
                                            <Users className="h-4 w-4 text-gray-400 mr-2" />
                                            Spring AI Discord
                                        </li>
                                        <li className="flex items-center text-sm text-gray-700">
                                            <Users className="h-4 w-4 text-gray-400 mr-2" />
                                            한국 Spring 사용자 모임
                                        </li>
                                        <li className="flex items-center text-sm text-gray-700">
                                            <Users className="h-4 w-4 text-gray-400 mr-2" />
                                            LLM 개발자 커뮤니티
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* 학습 팁 */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">💡 학습 팁</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg p-4">
                                    <div className="text-blue-600 mb-2">
                                        <Target className="h-8 w-8" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">단계별 학습</h4>
                                    <p className="text-sm text-gray-600">기초부터 차근차근 진행하며 각 단계를 확실히 이해</p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <div className="text-green-600 mb-2">
                                        <Code className="h-8 w-8" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">실습 중심</h4>
                                    <p className="text-sm text-gray-600">이론보다 실제 코드 작성과 프로젝트 구현에 집중</p>
                                </div>
                                <div className="bg-white rounded-lg p-4">
                                    <div className="text-purple-600 mb-2">
                                        <Users className="h-8 w-8" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 mb-1">커뮤니티 활용</h4>
                                    <p className="text-sm text-gray-600">막히는 부분은 커뮤니티에서 도움 요청</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Bot className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">RAG 파일럿 프로젝트 매뉴얼</h1>
                                <p className="text-sm text-gray-500">Spring AI 기반 자동 응답 시스템 구축 가이드</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">v2.0</span>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">2025</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <nav className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-24">
                            <div className="space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveSection(item.id)}
                                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${activeSection === item.id
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`}
                                        >
                                            <Icon className="h-4 w-4 mr-3" />
                                            {item.title}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="flex-1">
                        {renderContent()}
                    </main>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-sm text-gray-500">
                            Spring AI + pgvector 기반 RAG 시스템 파일럿 프로젝트
                        </p>
                        <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
                            <span>• Spring Boot 3.2</span>
                            <span>• Spring AI</span>
                            <span>• PostgreSQL + pgvector</span>
                            <span>• OpenAI GPT-4</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PilotProjectManual;