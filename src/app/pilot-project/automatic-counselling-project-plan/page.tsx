"use client";

import React, { useState } from 'react';
import { Calendar, Database, Code, Server, CheckCircle, AlertCircle, ArrowRight, Layers, GitBranch, Target } from 'lucide-react';

const AutomaticCounsellingProjectPlan = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const timelineData = [
        {
            week: '1주차',
            title: '인프라 및 데이터 준비',
            tasks: [
                'PostgreSQL + pgvector 설정',
                '한국관광공사 Tour API 연동',
                '제주 관광지 데이터 1000건 수집',
                'Q&A 형식 데이터 변환'
            ],
            status: 'pending'
        },
        {
            week: '2주차',
            title: '벡터화 파이프라인 구축',
            tasks: [
                'OpenAI Embedding API 연동',
                '데이터 청킹 (500-1000 토큰)',
                '임베딩 생성 및 pgvector 저장',
                'Spring Batch 스케줄러 구현'
            ],
            status: 'pending'
        },
        {
            week: '3주차',
            title: 'RAG 검색 시스템 구현',
            tasks: [
                'Spring AI VectorStore 통합',
                '유사도 검색 API 개발',
                'ChatGPT 프롬프트 최적화',
                'WebSocket 스트리밍 구현'
            ],
            status: 'pending'
        },
        {
            week: '4주차',
            title: '최적화 및 테스트',
            tasks: [
                '하이브리드 검색 구현',
                '리랭킹 알고리즘 적용',
                '성능 테스트 및 평가',
                'Tauri 프론트엔드 통합'
            ],
            status: 'pending'
        }
    ];

    const techStack = {
        backend: ['Spring Boot 3.2', 'Spring Security', 'Spring AI', 'Spring WebFlux'],
        database: ['PostgreSQL 16', 'pgvector Extension', 'Redis (캐싱)'],
        ai: ['OpenAI GPT-4', 'text-embedding-3-small', 'LangChain (옵션)'],
        frontend: ['Tauri', 'React', 'WebSocket'],
        infra: ['Docker', 'Kubernetes (옵션)', 'GitHub Actions']
    };

    const sampleCodes = {
        vectorSetup: `-- pgvector 설정
CREATE EXTENSION vector;

CREATE TABLE faq_embeddings (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100),
    question TEXT,
    answer TEXT,
    source_url TEXT,
    metadata JSONB,
    embedding vector(1536),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ON faq_embeddings 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);`,

        dataIngestion: `@Component
@RequiredArgsConstructor
public class TourDataIngestionService {
    private final TourApiClient tourApiClient;
    private final EmbeddingClient embeddingClient;
    private final VectorStore vectorStore;
    
    @Scheduled(cron = "0 0 2 * * *")
    public void ingestTourData() {
        // 1. Tour API에서 데이터 수집
        List<TourData> tourDataList = tourApiClient.fetchJejuData();
        
        // 2. Q&A 형식으로 변환
        List<Document> documents = tourDataList.stream()
            .map(this::convertToQA)
            .flatMap(List::stream)
            .collect(Collectors.toList());
        
        // 3. 청킹 및 임베딩
        List<Document> chunkedDocs = chunkDocuments(documents);
        
        // 4. 벡터 DB 저장
        vectorStore.add(chunkedDocs);
    }
    
    private List<Document> convertToQA(TourData data) {
        return List.of(
            new Document(
                String.format("Q: %s의 주소는? A: %s", 
                    data.getName(), data.getAddress()),
                Map.of("category", "location", "id", data.getId())
            ),
            new Document(
                String.format("Q: %s 운영시간? A: %s", 
                    data.getName(), data.getOperatingHours()),
                Map.of("category", "hours", "id", data.getId())
            )
        );
    }
}`,

        ragController: `@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {
    private final VectorStore vectorStore;
    private final ChatClient chatClient;
    
    @PostMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamChat(@RequestBody ChatRequest request) {
        // 1. 벡터 유사도 검색
        List<Document> relevantDocs = vectorStore.similaritySearch(
            SearchRequest.query(request.getQuery())
                .withTopK(5)
                .withSimilarityThreshold(0.7)
        );
        
        // 2. 컨텍스트 구성
        String context = relevantDocs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\\n\\n"));
        
        // 3. 프롬프트 생성
        String prompt = buildPrompt(context, request.getQuery());
        
        // 4. 스트리밍 응답
        return chatClient.stream()
            .user(u -> u.text(prompt))
            .content()
            .map(chunk -> chunk + " ");
    }
    
    private String buildPrompt(String context, String query) {
        return String.format("""
            당신은 제주 여행 전문 상담사입니다.
            아래 정보를 바탕으로 질문에 친절하고 정확하게 답변해주세요.
            
            참고 정보:
            %s
            
            질문: %s
            
            답변:
            """, context, query);
    }
}`,

        hybridSearch: `@Service
@RequiredArgsConstructor
public class HybridSearchService {
    private final JdbcTemplate jdbcTemplate;
    private final VectorStore vectorStore;
    
    public List<Document> hybridSearch(String query, int topK) {
        // 1. 키워드 검색 (BM25)
        List<Document> keywordResults = performKeywordSearch(query, topK);
        
        // 2. 벡터 검색
        List<Document> vectorResults = vectorStore.similaritySearch(
            SearchRequest.query(query).withTopK(topK)
        );
        
        // 3. 결과 병합 및 리랭킹
        return rerank(keywordResults, vectorResults, query);
    }
    
    private List<Document> performKeywordSearch(String query, int limit) {
        String sql = """
            SELECT id, question, answer, 
                   ts_rank(to_tsvector('korean', question || ' ' || answer), 
                          plainto_tsquery('korean', ?)) as rank
            FROM faq_embeddings
            WHERE to_tsvector('korean', question || ' ' || answer) 
                  @@ plainto_tsquery('korean', ?)
            ORDER BY rank DESC
            LIMIT ?
            """;
        
        return jdbcTemplate.query(sql, 
            new Object[]{query, query, limit},
            (rs, rowNum) -> new Document(
                rs.getString("answer"),
                Map.of("question", rs.getString("question"),
                      "score", rs.getDouble("rank"))
            )
        );
    }
}`
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        RAG 기반 자동 상담 시스템 구현 계획
                    </h1>
                    <p className="text-gray-600">
                        PostgreSQL + pgvector를 활용한 벡터 검색 기반 챗봇 시스템
                    </p>
                    <div className="flex gap-4 mt-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            <Target className="w-4 h-4 mr-1" />
                            제주항공 콜센터 자동화
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            <Database className="w-4 h-4 mr-1" />
                            한국관광공사 API 활용
                        </span>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            {['overview', 'timeline', 'architecture', 'code', 'devspec', 'publicdata', 'references'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab === 'overview' && '개요'}
                                    {tab === 'timeline' && '타임라인'}
                                    {tab === 'architecture' && '아키텍처'}
                                    {tab === 'code' && '샘플 코드'}
                                    {tab === 'devspec' && '개발 명세'}
                                    {tab === 'publicdata' && '공공 데이터'}
                                    {tab === 'references' && '참고 자료'}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">프로젝트 목표</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                            <span>공공 API (한국관광공사)를 활용한 POC 구현</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                            <span>RAG 패턴 기반 정확도 높은 답변 생성</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                            <span>실시간 스트리밍 응답 지원</span>
                                        </li>
                                        <li className="flex items-start">
                                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                                            <span>제주항공 서비스로 확장 가능한 구조</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">기술 스택</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {Object.entries(techStack).map(([category, techs]) => (
                                            <div key={category} className="bg-gray-50 rounded-lg p-4">
                                                <h4 className="font-medium text-gray-700 mb-2 capitalize">{category}</h4>
                                                <ul className="space-y-1">
                                                    {techs.map((tech) => (
                                                        <li key={tech} className="text-sm text-gray-600">• {tech}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-medium text-yellow-800">핵심 고려사항</h4>
                                            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                                                <li>• 한국어 임베딩 모델 선택 (text-embedding-3-small 권장)</li>
                                                <li>• 의미 단위 청킹 전략 (500-1000 토큰)</li>
                                                <li>• 하이브리드 검색으로 정확도 향상</li>
                                                <li>• 프롬프트 엔지니어링 최적화</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Timeline Tab */}
                        {activeTab === 'timeline' && (
                            <div className="space-y-6">
                                {timelineData.map((week, index) => (
                                    <div key={week.week} className="relative">
                                        <div className="flex items-start">
                                            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white font-bold">
                                                {index + 1}
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-900">{week.week}</h3>
                                                            <p className="text-gray-600">{week.title}</p>
                                                        </div>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${week.status === 'completed'
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                            }`}>
                                                            {week.status === 'completed' ? '완료' : '예정'}
                                                        </span>
                                                    </div>
                                                    <ul className="space-y-1 mt-3">
                                                        {week.tasks.map((task, taskIndex) => (
                                                            <li key={taskIndex} className="flex items-start text-sm text-gray-600">
                                                                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                                                                {task}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {index < timelineData.length - 1 && (
                                            <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Architecture Tab */}
                        {activeTab === 'architecture' && (
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold mb-4">시스템 아키텍처</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                            <div className="flex items-center">
                                                <Layers className="w-8 h-8 text-blue-500 mr-3" />
                                                <div>
                                                    <h4 className="font-medium">Presentation Layer</h4>
                                                    <p className="text-sm text-gray-600">Tauri + React</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-400" />
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                            <div className="flex items-center">
                                                <Server className="w-8 h-8 text-green-500 mr-3" />
                                                <div>
                                                    <h4 className="font-medium">Application Layer</h4>
                                                    <p className="text-sm text-gray-600">Spring Boot + Spring AI</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-400" />
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                            <div className="flex items-center">
                                                <Database className="w-8 h-8 text-purple-500 mr-3" />
                                                <div>
                                                    <h4 className="font-medium">Data Layer</h4>
                                                    <p className="text-sm text-gray-600">PostgreSQL + pgvector</p>
                                                </div>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-400" />
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                            <div className="flex items-center">
                                                <GitBranch className="w-8 h-8 text-orange-500 mr-3" />
                                                <div>
                                                    <h4 className="font-medium">External Services</h4>
                                                    <p className="text-sm text-gray-600">OpenAI API + Tour API</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium mb-2">데이터 플로우</h4>
                                        <ol className="space-y-2 text-sm text-gray-600">
                                            <li>1. 사용자 질문 입력</li>
                                            <li>2. 질문 임베딩 생성</li>
                                            <li>3. pgvector 유사도 검색</li>
                                            <li>4. 관련 문서 추출 (Top-K)</li>
                                            <li>5. GPT-4 프롬프트 구성</li>
                                            <li>6. 스트리밍 응답 생성</li>
                                        </ol>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-medium mb-2">데이터 수집 파이프라인</h4>
                                        <ol className="space-y-2 text-sm text-gray-600">
                                            <li>1. Tour API 데이터 수집</li>
                                            <li>2. Q&A 형식 변환</li>
                                            <li>3. 텍스트 청킹</li>
                                            <li>4. 임베딩 벡터 생성</li>
                                            <li>5. pgvector 저장</li>
                                            <li>6. 인덱스 최적화</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Code Tab */}
                        {activeTab === 'code' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">핵심 구현 코드</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">1. Vector DB 설정</h4>
                                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                                <code>{sampleCodes.vectorSetup}</code>
                                            </pre>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">2. 데이터 수집 서비스</h4>
                                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                                <code>{sampleCodes.dataIngestion}</code>
                                            </pre>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">3. RAG 컨트롤러</h4>
                                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                                <code>{sampleCodes.ragController}</code>
                                            </pre>
                                        </div>

                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-2">4. 하이브리드 검색</h4>
                                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                                <code>{sampleCodes.hybridSearch}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dev Spec Tab */}
                        {activeTab === 'devspec' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">개발 명세서</h3>

                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">시스템 요구사항</h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>• JDK 21 이상</li>
                                                <li>• PostgreSQL 16+ (pgvector 0.7.0+)</li>
                                                <li>• Spring Boot 3.2+</li>
                                                <li>• Node.js 18+ (Tauri 프론트엔드)</li>
                                                <li>• Docker & Docker Compose</li>
                                                <li>• 최소 메모리: 8GB RAM</li>
                                            </ul>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">의존성 관리</h4>
                                            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                {`<!-- pom.xml -->
<dependencies>
  <!-- Spring AI -->
  <dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-pgvector-store-spring-boot-starter</artifactId>
    <version>1.0.0</version>
  </dependency>
  <dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    <version>1.0.0</version>
  </dependency>
  
  <!-- Database -->
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <version>42.7.0</version>
  </dependency>
  
  <!-- WebSocket -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-webflux</artifactId>
  </dependency>
</dependencies>`}
                                            </pre>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">환경 변수 설정</h4>
                                            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                {`# .env
OPENAI_API_KEY=sk-your-api-key
TOUR_API_KEY=your-tour-api-key
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vectordb
DB_USER=postgres
DB_PASSWORD=postgres

# Embedding Configuration
EMBEDDING_MODEL=text-embedding-3-small
EMBEDDING_DIMENSIONS=1536
CHUNK_SIZE=1000
CHUNK_OVERLAP=200

# Vector Search Configuration
SIMILARITY_THRESHOLD=0.7
TOP_K_RESULTS=5`}
                                            </pre>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">Docker Compose 설정</h4>
                                            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                                {`version: '3.8'
services:
  postgres:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_DB: vectordb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

volumes:
  pgdata:
  redisdata:`}
                                            </pre>
                                        </div>

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <h4 className="font-medium text-yellow-800 mb-2">성능 최적화 설정</h4>
                                            <ul className="space-y-1 text-sm text-yellow-700">
                                                <li>• pgvector HNSW 인덱스: m=16, ef_construction=64</li>
                                                <li>• 배치 처리: 100건 단위 임베딩 생성</li>
                                                <li>• 캐싱: Redis TTL 3600초</li>
                                                <li>• Connection Pool: max=20, min=5</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Public Data Tab */}
                        {activeTab === 'publicdata' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">공공 데이터 정보</h3>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                        <h4 className="font-medium text-blue-800 mb-2">한국관광공사 Tour API</h4>
                                        <p className="text-sm text-blue-700 mb-2">
                                            26만 건의 국내 관광 정보를 실시간으로 제공하는 공공 API
                                        </p>
                                        <ul className="space-y-1 text-sm text-blue-600">
                                            <li>• API URL: https://api.visitkorea.or.kr</li>
                                            <li>• 데이터 규모: 약 26만 건</li>
                                            <li>• 업데이트 주기: 실시간</li>
                                            <li>• 인증: API Key 방식</li>
                                        </ul>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">제공 데이터 종류</h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li>✓ 지역기반 관광정보</li>
                                                <li>✓ 위치기반 관광정보</li>
                                                <li>✓ 키워드 검색</li>
                                                <li>✓ 행사정보</li>
                                                <li>✓ 숙박정보</li>
                                                <li>✓ 음식점 정보</li>
                                                <li>✓ 관광코스 정보</li>
                                                <li>✓ 문화시설 정보</li>
                                                <li>✓ 쇼핑 정보</li>
                                                <li>✓ 반려동물 동반정보</li>
                                            </ul>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">API 신청 방법</h4>
                                            <ol className="space-y-2 text-sm text-gray-600">
                                                <li>1. 공공데이터포털 접속<br />
                                                    <span className="text-xs text-gray-500">https://data.go.kr</span>
                                                </li>
                                                <li>2. '한국관광공사' 검색</li>
                                                <li>3. 원하는 API 선택 후 '활용신청'</li>
                                                <li>4. 승인 후 마이페이지에서 인증키 확인</li>
                                                <li>5. Swagger UI로 API 테스트</li>
                                            </ol>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
                                        <h4 className="font-medium text-gray-800 mb-3">Tour API 호출 예시</h4>
                                        <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                                            {`// Tour API Client 구현
@Component
public class TourApiClient {
    @Value("\${tour.api.key}")
    private String apiKey;
    
    private final RestTemplate restTemplate;
    
    public List<TourData> fetchJejuData() {
        String url = "http://apis.data.go.kr/B551011/KorService1/areaBasedList1";
        
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
            .queryParam("serviceKey", apiKey)
            .queryParam("numOfRows", 1000)
            .queryParam("pageNo", 1)
            .queryParam("MobileOS", "ETC")
            .queryParam("MobileApp", "AppTest")
            .queryParam("_type", "json")
            .queryParam("areaCode", 39) // 제주도
            .queryParam("contentTypeId", 12); // 관광지
            
        ResponseEntity<TourApiResponse> response = 
            restTemplate.getForEntity(builder.toUriString(), TourApiResponse.class);
            
        return response.getBody().getItems();
    }
}`}
                                        </pre>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                                        <h4 className="font-medium text-green-800 mb-2">활용 예시 - 제주 관광 Q&A</h4>
                                        <div className="space-y-2 text-sm text-green-700">
                                            <p>Tour API 데이터를 다음과 같은 Q&A 형식으로 변환:</p>
                                            <ul className="ml-4 space-y-1">
                                                <li>• "성산일출봉 입장료는?" → "성인 5,000원, 청소년 2,500원"</li>
                                                <li>• "한라산 등반 시간은?" → "성판악 왕복 9시간, 관음사 왕복 10시간"</li>
                                                <li>• "제주공항에서 중문까지 거리는?" → "약 40km, 차량 50분"</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* References Tab */}
                        {activeTab === 'references' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">참고 자료</h3>

                                    <div className="space-y-4">
                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">📚 공식 문서</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-blue-500 mr-2">→</span>
                                                    <div>
                                                        <a href="https://github.com/pgvector/pgvector" className="text-blue-600 hover:underline">
                                                            pgvector GitHub Repository
                                                        </a>
                                                        <p className="text-xs text-gray-500">PostgreSQL 벡터 확장 공식 저장소</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-blue-500 mr-2">→</span>
                                                    <div>
                                                        <a href="https://docs.spring.io/spring-ai/reference" className="text-blue-600 hover:underline">
                                                            Spring AI Reference Documentation
                                                        </a>
                                                        <p className="text-xs text-gray-500">Spring AI 공식 레퍼런스</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-blue-500 mr-2">→</span>
                                                    <div>
                                                        <a href="https://api.visitkorea.or.kr" className="text-blue-600 hover:underline">
                                                            한국관광공사 TourAPI
                                                        </a>
                                                        <p className="text-xs text-gray-500">관광 정보 공공 API</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-blue-500 mr-2">→</span>
                                                    <div>
                                                        <a href="https://www.data.go.kr" className="text-blue-600 hover:underline">
                                                            공공데이터포털
                                                        </a>
                                                        <p className="text-xs text-gray-500">API Key 발급 및 관리</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">📖 기술 블로그 & 튜토리얼</h4>
                                            <ul className="space-y-2">
                                                <li className="flex items-start">
                                                    <span className="text-green-500 mr-2">→</span>
                                                    <div>
                                                        <a href="https://howtodoinjava.com/spring-ai/spring-ai-pgvectorstore-example/" className="text-blue-600 hover:underline">
                                                            Spring AI PgVectorStore Example
                                                        </a>
                                                        <p className="text-xs text-gray-500">PgVector와 Spring AI 통합 예제</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-500 mr-2">→</span>
                                                    <div>
                                                        <a href="https://www.danvega.dev/blog/getting-started-with-spring-ai-rag" className="text-blue-600 hover:underline">
                                                            Getting Started with Spring AI and RAG
                                                        </a>
                                                        <p className="text-xs text-gray-500">RAG 구현 실전 가이드</p>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-500 mr-2">→</span>
                                                    <div>
                                                        <a href="https://medium.com/@akash4chandran/enhancing-conversational-ai-with-openai-and-spring-ai" className="text-blue-600 hover:underline">
                                                            Building Advanced Conversational AI
                                                        </a>
                                                        <p className="text-xs text-gray-500">OpenAI + Spring AI 고급 활용</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">🛠️ 개발 도구</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700 mb-2">Docker Images</h5>
                                                    <ul className="space-y-1 text-xs text-gray-600">
                                                        <li>• pgvector/pgvector:pg16</li>
                                                        <li>• redis:7-alpine</li>
                                                        <li>• postgres:16-alpine</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-medium text-gray-700 mb-2">Testing Tools</h5>
                                                    <ul className="space-y-1 text-xs text-gray-600">
                                                        <li>• Postman (API 테스트)</li>
                                                        <li>• pgAdmin (DB 관리)</li>
                                                        <li>• k6 (부하 테스트)</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-800 mb-3">📊 벤치마크 & 성능</h4>
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p>pgvector 성능 지표 (1536차원, 100만 벡터 기준):</p>
                                                <ul className="ml-4 space-y-1">
                                                    <li>• HNSW 인덱스 생성: ~10분</li>
                                                    <li>• 유사도 검색 (Top-5): ~50ms</li>
                                                    <li>• 메모리 사용량: ~8GB</li>
                                                    <li>• 정확도 (Recall@5): 95%+</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <h4 className="font-medium text-yellow-800 mb-2">⚠️ 중요 참고사항</h4>
                                            <ul className="space-y-1 text-sm text-yellow-700">
                                                <li>• OpenAI API는 유료 (text-embedding-3-small: $0.02/1M tokens)</li>
                                                <li>• pgvector는 최대 2000차원까지 효율적 (그 이상은 차원 축소 필요)</li>
                                                <li>• Tour API는 일일 호출 제한 있음 (1000회/일)</li>
                                                <li>• 프로덕션 환경에서는 반드시 API Key 암호화</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Migration Plan */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">제주항공 전환 계획</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800 mb-3">
                            POC 완료 후 실제 제주항공 데이터로 전환 시 필요 사항:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ul className="space-y-2 text-sm text-blue-700">
                                <li>• 운항 스케줄 API 연동</li>
                                <li>• 예약/발권 정책 데이터</li>
                                <li>• 수하물 규정 문서화</li>
                                <li>• 환불/변경 규정</li>
                            </ul>
                            <ul className="space-y-2 text-sm text-blue-700">
                                <li>• 마일리지 정책</li>
                                <li>• FAQ 1000건+</li>
                                <li>• 실제 상담 로그 분석</li>
                                <li>• 도메인 특화 프롬프트</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutomaticCounsellingProjectPlan;