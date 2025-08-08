"use client";

import React, { useState, ReactNode, MouseEvent } from 'react';
import {
    CheckCircle2,
    Circle,
    Copy,
    Terminal,
    Database,
    FileCode,
    AlertCircle,
    ChevronRight,
    CheckCheck,
    BookOpen,
    Rocket,
    Settings,
    TestTube,
    Code2,
    FileText,
    Play,
    Zap,
    GitBranch,
    Package,
    ArrowRight,
    Sparkles
} from 'lucide-react';

// 타입 정의
type TabId = 'overview' | 'setup' | 'implementation' | 'testing';

interface CodeBlockProps {
    code: string;
    language?: string;
    id: string;
    filename?: string;
    className?: string;
}

interface CardProps {
    children: ReactNode;
    className?: string;
}

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
}

interface StepCardProps {
    number: string;
    title: string;
    children?: ReactNode;
    id: string;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
}

type AlertVariant = 'info' | 'warning' | 'success';

interface AlertProps {
    children: ReactNode;
    variant?: AlertVariant;
    title?: string;
}

interface QuickActionProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    href: string;
}

const RAGPgVectorManual = () => {
    const [copiedCode, setCopiedCode] = useState<string | null>(null);
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState<TabId>('overview');

    const copyToClipboard = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const toggleStep = (stepId: string) => {
        setCompletedSteps(prev => {
            const newCompleted = new Set(prev);
            if (newCompleted.has(stepId)) {
                newCompleted.delete(stepId);
            } else {
                newCompleted.add(stepId);
            }
            return newCompleted;
        });
    };

    const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', id, filename, className = '' }) => (
        <div className={`relative group ${className}`}>
            {filename && (
                <div className="bg-slate-900 text-slate-400 px-4 py-2 text-xs font-mono rounded-t-xl border-b border-slate-800">
                    <span className="text-slate-500">{filename}</span>
                </div>
            )}
            <div className={`bg-slate-950 ${filename ? 'rounded-b-xl' : 'rounded-xl'} p-4 overflow-x-auto border border-slate-800`}>
                <pre className="text-sm text-slate-300 font-mono leading-relaxed">
                    <code>{code}</code>
                </pre>
                <button
                    type="button"
                    onClick={() => copyToClipboard(code, id)}
                    className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                    {copiedCode === id ? (
                        <CheckCheck className="w-4 h-4 text-emerald-400" />
                    ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                    )}
                </button>
            </div>
        </div>
    );

    const Card: React.FC<CardProps> = ({ children, className = '' }) => (
        <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 ${className}`}>
            {children}
        </div>
    );

    const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children, icon: Icon }) => (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${active
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
        >
            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );

    const StepCard: React.FC<StepCardProps> = ({ number, title, children, id, icon: Icon, description }) => (
        <Card className="mb-4 overflow-hidden">
            <div
                className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                onClick={() => toggleStep(id)}
            >
                <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${completedSteps.has(id)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}>
                        {completedSteps.has(id) ? (
                            <CheckCircle2 className="w-5 h-5" />
                        ) : (
                            <span className="text-sm font-bold">{number}</span>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            {Icon && <Icon className="w-5 h-5 text-slate-500" />}
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
                        </div>
                        {description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
                        )}
                    </div>
                </div>
            </div>
            {children && (
                <div className="px-6 pb-6 border-t border-slate-100 dark:border-slate-800 pt-4">
                    {children}
                </div>
            )}
        </Card>
    );

    const Alert: React.FC<AlertProps> = ({ children, variant = 'info', title }) => {
        const variants = {
            info: {
                bg: 'bg-blue-50 dark:bg-blue-950/20',
                border: 'border-blue-200 dark:border-blue-900',
                text: 'text-blue-900 dark:text-blue-400',
                icon: 'text-blue-500'
            },
            warning: {
                bg: 'bg-amber-50 dark:bg-amber-950/20',
                border: 'border-amber-200 dark:border-amber-900',
                text: 'text-amber-900 dark:text-amber-400',
                icon: 'text-amber-500'
            },
            success: {
                bg: 'bg-emerald-50 dark:bg-emerald-950/20',
                border: 'border-emerald-200 dark:border-emerald-900',
                text: 'text-emerald-900 dark:text-emerald-400',
                icon: 'text-emerald-500'
            }
        };

        const style = variants[variant];

        return (
            <div className={`${style.bg} ${style.border} border rounded-xl p-4 mb-4`}>
                <div className="flex gap-3">
                    <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${style.icon}`} />
                    <div className="flex-1">
                        {title && <div className={`font-medium mb-1 ${style.text}`}>{title}</div>}
                        <div className={`text-sm ${style.text} opacity-90`}>{children}</div>
                    </div>
                </div>
            </div>
        );
    };

    const QuickAction: React.FC<QuickActionProps> = ({ icon: Icon, title, description, href }) => (
        <a href={href} className="group">
            <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
            </Card>
        </a>
    );

    // 전체 코드 정의
    const dockerComposeYml = `version: "3.8"
services:
  postgres:
    image: pgvector/pgvector:pg16  # pgvector extension이 포함된 이미지
    container_name: security_demo_db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: pilotdb
      POSTGRES_USER: pilot
      POSTGRES_PASSWORD: pilot1234
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - backend

volumes:
  pgdata:

networks:
  backend:`;

    const initSql = `-- pgvector extension 활성화
CREATE EXTENSION IF NOT EXISTS vector;

-- 벡터 스토어 테이블 생성
CREATE TABLE IF NOT EXISTS vector_store (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT,
    metadata JSONB,
    embedding vector(1536),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성 (성능 최적화)
CREATE INDEX ON vector_store USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_metadata ON vector_store USING gin (metadata);
CREATE INDEX idx_created_at ON vector_store (created_at DESC);`;

    const applicationYml = `spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/pilotdb
    username: pilot
    password: pilot1234
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    database-platform: org.hibernate.dialect.PostgreSQLDialect

  # Spring AI 설정
  ai:
    openai:
      api-key: \${OPENAI_API_KEY}
      embedding:
        model: text-embedding-3-small
        options:
          dimensions: 1536

    vectorstore:
      pgvector:
        host: localhost
        port: 5432
        database: pilotdb
        username: pilot
        password: pilot1234
        schema-name: public
        table-name: vector_store
        dimension: 1536
        distance-type: COSINE_DISTANCE
        remove-existing-vector-store-table: false
        index-type: HNSW
        initialize-schema: true

# 로깅 설정
logging:
  level:
    org.springframework.ai: DEBUG
    org.springframework.ai.vectorstore: DEBUG`;

    const buildGradle = `dependencies {
    // Spring Boot Starter
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    
    // PostgreSQL & PGVector
    implementation 'org.postgresql:postgresql'
    implementation 'com.pgvector:pgvector:0.1.4'
    
    // Spring AI
    implementation 'org.springframework.ai:spring-ai-openai-spring-boot-starter:0.8.0'
    implementation 'org.springframework.ai:spring-ai-pgvector-store-spring-boot-starter:0.8.0'
    
    // Lombok (Optional)
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}`;

    const vectorStoreConfig = `@Configuration
@EnableConfigurationProperties(PgVectorProperties.class)
public class VectorStoreConfig {
    
    @Bean
    public VectorStore vectorStore(
            JdbcTemplate jdbcTemplate, 
            EmbeddingClient embeddingClient,
            PgVectorProperties properties) {
        
        return PgVectorStore.builder(jdbcTemplate, embeddingClient)
                .withSchemaName(properties.getSchemaName())
                .withTableName(properties.getTableName())
                .withDimension(properties.getDimension())
                .withDistanceType(properties.getDistanceType())
                .withRemoveExistingVectorStoreTable(properties.isRemoveExistingVectorStoreTable())
                .withIndexType(properties.getIndexType())
                .withInitializeSchema(properties.isInitializeSchema())
                .build();
    }
}`;

    const vectorService = `@Service
@RequiredArgsConstructor
@Slf4j
public class VectorStoreService {
    
    private final VectorStore vectorStore;
    private final EmbeddingClient embeddingClient;
    
    // 문서 저장
    public void saveDocument(String content, Map<String, Object> metadata) {
        log.info("Saving document with metadata: {}", metadata);
        
        Document document = new Document(content, metadata);
        vectorStore.add(List.of(document));
        
        log.info("Document saved successfully");
    }
    
    // 유사도 검색
    public List<Document> searchSimilar(String query, int topK) {
        log.info("Searching for: {} (top {})", query, topK);
        
        SearchRequest searchRequest = SearchRequest.query(query)
                .withTopK(topK)
                .withSimilarityThreshold(0.7);
                
        List<Document> results = vectorStore.similaritySearch(searchRequest);
        
        log.info("Found {} similar documents", results.size());
        return results;
    }
    
    // 필터링된 검색
    public List<Document> searchWithFilter(String query, int topK, Map<String, Object> filterMetadata) {
        SearchRequest searchRequest = SearchRequest.query(query)
                .withTopK(topK)
                .withFilterExpression(new Filter.Expression(
                    Filter.ExpressionType.AND,
                    filterMetadata.entrySet().stream()
                        .map(e -> new Filter.Expression(
                            Filter.ExpressionType.EQ,
                            new Filter.Key(e.getKey()),
                            new Filter.Value(e.getValue())
                        ))
                        .toList()
                ));
                
        return vectorStore.similaritySearch(searchRequest);
    }
    
    // 임베딩 생성 테스트
    public List<Double> createEmbedding(String text) {
        return embeddingClient.embed(text);
    }
    
    // 문서 삭제
    public void deleteByIds(List<String> ids) {
        vectorStore.delete(ids);
        log.info("Deleted {} documents", ids.size());
    }
}`;

    const ragController = `@RestController
@RequestMapping("/api/rag")
@RequiredArgsConstructor
@Slf4j
public class RAGController {
    
    private final VectorStoreService vectorStoreService;
    
    @PostMapping("/documents")
    public ResponseEntity<Map<String, Object>> addDocument(@RequestBody DocumentRequest request) {
        try {
            Map<String, Object> metadata = new HashMap<>();
            metadata.put("source", request.getSource());
            metadata.put("type", request.getType());
            metadata.put("timestamp", Instant.now().toString());
            
            vectorStoreService.saveDocument(request.getContent(), metadata);
            
            return ResponseEntity.ok(Map.of(
                "status", "success",
                "message", "Document added successfully",
                "timestamp", Instant.now()
            ));
        } catch (Exception e) {
            log.error("Error adding document", e);
            return ResponseEntity.status(500).body(Map.of(
                "status", "error",
                "message", e.getMessage()
            ));
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<SearchResponse> search(
            @RequestParam String query,
            @RequestParam(defaultValue = "5") int topK) {
        
        List<Document> documents = vectorStoreService.searchSimilar(query, topK);
        
        List<SearchResult> results = documents.stream()
                .map(doc -> SearchResult.builder()
                        .content(doc.getContent())
                        .metadata(doc.getMetadata())
                        .score(doc.getScore())
                        .build())
                .toList();
        
        return ResponseEntity.ok(SearchResponse.builder()
                .query(query)
                .results(results)
                .count(results.size())
                .timestamp(Instant.now())
                .build());
    }
    
    @PostMapping("/search/filter")
    public ResponseEntity<SearchResponse> searchWithFilter(@RequestBody FilteredSearchRequest request) {
        List<Document> documents = vectorStoreService.searchWithFilter(
            request.getQuery(),
            request.getTopK(),
            request.getFilters()
        );
        
        // ... response mapping
        return ResponseEntity.ok(/* mapped response */);
    }
    
    @DeleteMapping("/documents")
    public ResponseEntity<Map<String, Object>> deleteDocuments(@RequestBody List<String> ids) {
        vectorStoreService.deleteByIds(ids);
        
        return ResponseEntity.ok(Map.of(
            "status", "success",
            "deleted", ids.size()
        ));
    }
}`;

    const dtoClasses = `// DocumentRequest.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentRequest {
    private String content;
    private String source;
    private String type;
}

// SearchResult.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchResult {
    private String content;
    private Map<String, Object> metadata;
    private Float score;
}

// SearchResponse.java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchResponse {
    private String query;
    private List<SearchResult> results;
    private int count;
    private Instant timestamp;
}

// FilteredSearchRequest.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FilteredSearchRequest {
    private String query;
    private int topK = 5;
    private Map<String, Object> filters;
}`;

    const testCommands = `# 1. Docker Compose 실행
docker-compose up -d

# 2. 컨테이너 상태 확인
docker ps

# 3. 데이터베이스 접속 테스트
docker exec -it security_demo_db psql -U pilot -d pilotdb -c "\\dx"

# 4. Spring Boot 애플리케이션 실행
./gradlew bootRun

# 5. 환경변수 설정 (Windows)
set OPENAI_API_KEY=your-api-key

# 5. 환경변수 설정 (Mac/Linux)
export OPENAI_API_KEY=your-api-key`;

    const curlCommands = `# 문서 추가
curl -X POST http://localhost:8080/api/rag/documents \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Spring AI는 AI 애플리케이션 개발을 위한 혁신적인 프레임워크입니다.",
    "source": "documentation",
    "type": "technical"
  }'

# 유사도 검색
curl "http://localhost:8080/api/rag/search?query=Spring AI란 무엇인가요?&topK=5"

# 필터링된 검색
curl -X POST http://localhost:8080/api/rag/search/filter \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "Spring AI 사용법",
    "topK": 3,
    "filters": {
      "type": "technical",
      "source": "documentation"
    }
  }'

# 문서 삭제
curl -X DELETE http://localhost:8080/api/rag/documents \\
  -H "Content-Type: application/json" \\
  -d '["document-id-1", "document-id-2"]'`;

    const troubleshooting = `# PGVector Extension 확인
SELECT * FROM pg_extension WHERE extname = 'vector';

# 테이블 구조 확인
\\d+ vector_store

# 인덱스 확인
\\di vector_store*

# 샘플 데이터 직접 조회
SELECT id, content, metadata, 
       embedding <-> '[0.1, 0.2, ...]'::vector as distance
FROM vector_store
ORDER BY distance
LIMIT 5;

# 벡터 차원 확인
SELECT vector_dims(embedding) FROM vector_store LIMIT 1;`;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                                    <Database className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                                    RAG PGVector 학습 메뉴얼
                                </h1>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400">
                                Spring AI와 PostgreSQL PGVector를 활용한 벡터 데이터베이스 구축 완벽 가이드
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm font-medium">
                                v1.0.0
                            </div>
                            <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-medium">
                                Spring AI 0.8.0
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Progress Section */}
                <div className="mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">학습 진행률</h2>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    총 7단계 중 {completedSteps.size}단계 완료
                                </p>
                            </div>
                            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                {Math.round((completedSteps.size / 7) * 100)}%
                            </div>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(completedSteps.size / 7) * 100}%` }}
                            />
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <QuickAction
                        icon={Rocket}
                        title="빠른 시작"
                        description="5분 안에 RAG 시스템 구축하기"
                        href="#quick-start"
                    />
                    <QuickAction
                        icon={GitBranch}
                        title="GitHub 예제"
                        description="완성된 프로젝트 소스코드"
                        href="#github"
                    />
                    <QuickAction
                        icon={BookOpen}
                        title="API 문서"
                        description="상세한 API 레퍼런스"
                        href="#api-docs"
                    />
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
                    <TabButton
                        active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                        icon={Sparkles}
                    >
                        개요
                    </TabButton>
                    <TabButton
                        active={activeTab === 'setup'}
                        onClick={() => setActiveTab('setup')}
                        icon={Settings}
                    >
                        설정
                    </TabButton>
                    <TabButton
                        active={activeTab === 'implementation'}
                        onClick={() => setActiveTab('implementation')}
                        icon={Code2}
                    >
                        구현
                    </TabButton>
                    <TabButton
                        active={activeTab === 'testing'}
                        onClick={() => setActiveTab('testing')}
                        icon={TestTube}
                    >
                        테스트
                    </TabButton>
                </div>

                {/* Main Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-4">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                                🎯 학습 목표
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-slate-900 dark:text-slate-100">PGVector 이해</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            PostgreSQL 기반 벡터 데이터베이스 구축
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-slate-900 dark:text-slate-100">Spring AI 통합</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            OpenAI 임베딩과 벡터 스토어 연동
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-slate-900 dark:text-slate-100">RAG 구현</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            실제 동작하는 RAG 시스템 개발
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-slate-900 dark:text-slate-100">성능 최적화</div>
                                        <div className="text-sm text-slate-600 dark:text-slate-400">
                                            인덱싱 및 쿼리 최적화 기법
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                                📋 사전 준비사항
                            </h2>
                            <div className="space-y-3">
                                {[
                                    { name: 'Docker & Docker Compose', version: 'latest', required: true },
                                    { name: 'Java', version: '17+', required: true },
                                    { name: 'Spring Boot', version: '3.x', required: true },
                                    { name: 'OpenAI API Key', version: '-', required: true },
                                    { name: 'PostgreSQL Client', version: 'optional', required: false }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Package className="w-5 h-5 text-slate-500" />
                                            <span className="font-medium text-slate-900 dark:text-slate-100">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-slate-600 dark:text-slate-400">{item.version}</span>
                                            {item.required ? (
                                                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded text-xs font-medium">
                                                    필수
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs font-medium">
                                                    선택
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                )}

                {activeTab === 'setup' && (
                    <div className="space-y-4">
                        <StepCard
                            number="1"
                            title="기존 PostgreSQL 정리"
                            id="step1"
                            icon={Database}
                            description="깨끗한 환경을 위한 기존 컨테이너 정리"
                        >
                            <Alert variant="warning" title="주의">
                                기존 데이터베이스가 있다면 반드시 백업 후 진행하세요.
                            </Alert>
                            <CodeBlock
                                code={`# 기존 컨테이너 중지 및 삭제
docker-compose down

# 볼륨까지 완전히 삭제 (데이터 초기화)
docker-compose down -v

# 컨테이너 상태 확인
docker ps -a | grep postgres`}
                                id="cleanup"
                            />
                        </StepCard>

                        <StepCard
                            number="2"
                            title="Docker Compose 설정"
                            id="step2"
                            icon={FileCode}
                            description="PGVector 이미지로 PostgreSQL 구성"
                        >
                            <CodeBlock
                                code={dockerComposeYml}
                                language="yaml"
                                id="docker-compose"
                                filename="docker-compose.yml"
                            />
                        </StepCard>

                        <StepCard
                            number="3"
                            title="초기화 SQL 작성"
                            id="step3"
                            icon={Database}
                            description="PGVector extension 활성화 및 테이블 생성"
                        >
                            <CodeBlock
                                code={initSql}
                                language="sql"
                                id="init-sql"
                                filename="init.sql"
                            />
                        </StepCard>

                        <StepCard
                            number="4"
                            title="의존성 추가"
                            id="step4"
                            icon={Package}
                            description="Spring Boot 프로젝트에 필요한 라이브러리 추가"
                        >
                            <CodeBlock
                                code={buildGradle}
                                language="gradle"
                                id="build-gradle"
                                filename="build.gradle"
                            />
                        </StepCard>

                        <StepCard
                            number="5"
                            title="Application 설정"
                            id="step5"
                            icon={Settings}
                            description="Spring AI와 PGVector 연동 설정"
                        >
                            <CodeBlock
                                code={applicationYml}
                                language="yaml"
                                id="application-yml"
                                filename="application.yml"
                            />
                            <Alert variant="info" title="팁">
                                OPENAI_API_KEY는 환경변수로 설정하거나 .env 파일을 사용하세요.
                            </Alert>
                        </StepCard>
                    </div>
                )}

                {activeTab === 'implementation' && (
                    <div className="space-y-4">
                        <StepCard
                            number="6"
                            title="Vector Store 설정"
                            id="step6"
                            icon={Settings}
                            description="Vector Store Bean 구성"
                        >
                            <CodeBlock
                                code={vectorStoreConfig}
                                language="java"
                                id="vector-config"
                                filename="VectorStoreConfig.java"
                            />
                        </StepCard>

                        <StepCard
                            number="7"
                            title="Service 구현"
                            id="step7"
                            icon={Code2}
                            description="벡터 저장 및 검색 로직 구현"
                        >
                            <CodeBlock
                                code={vectorService}
                                language="java"
                                id="vector-service"
                                filename="VectorStoreService.java"
                            />
                        </StepCard>

                        <StepCard
                            number="8"
                            title="REST API 구현"
                            id="step8"
                            icon={Terminal}
                            description="외부 연동을 위한 REST 엔드포인트"
                        >
                            <CodeBlock
                                code={ragController}
                                language="java"
                                id="rag-controller"
                                filename="RAGController.java"
                            />
                        </StepCard>

                        <StepCard
                            number="9"
                            title="DTO 클래스"
                            id="step9"
                            icon={FileCode}
                            description="요청/응답 데이터 전송 객체"
                        >
                            <CodeBlock
                                code={dtoClasses}
                                language="java"
                                id="dto-classes"
                                filename="DTOs.java"
                            />
                        </StepCard>
                    </div>
                )}

                {activeTab === 'testing' && (
                    <div className="space-y-4">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                <Play className="w-5 h-5 text-emerald-500" />
                                실행 및 테스트
                            </h2>
                            <CodeBlock
                                code={testCommands}
                                id="test-commands"
                                filename="commands.sh"
                                className="mb-4"
                            />
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                <Terminal className="w-5 h-5 text-blue-500" />
                                API 테스트
                            </h2>
                            <CodeBlock
                                code={curlCommands}
                                id="curl-commands"
                                filename="api-test.sh"
                            />
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
                                <Zap className="w-5 h-5 text-amber-500" />
                                문제 해결
                            </h2>
                            <CodeBlock
                                code={troubleshooting}
                                id="troubleshooting"
                                filename="troubleshoot.sql"
                            />
                        </Card>
                    </div>
                )}

                {/* Best Practices */}
                <Card className="p-6 mt-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                    <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">
                        ⚡ 성능 최적화 팁
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                            <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">인덱싱 전략</h3>
                            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                <li>• HNSW 인덱스 사용 (대용량 데이터)</li>
                                <li>• IVFFlat 인덱스 (중소 규모)</li>
                                <li>• 메타데이터 GIN 인덱스 활용</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                            <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">임베딩 최적화</h3>
                            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                <li>• 적절한 차원 선택 (1536 vs 3072)</li>
                                <li>• 배치 처리로 API 호출 최소화</li>
                                <li>• 캐싱 전략 구현</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                            <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">쿼리 성능</h3>
                            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                <li>• Similarity threshold 조정</li>
                                <li>• TopK 값 최적화</li>
                                <li>• 필터링 조건 활용</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                            <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-2">청킹 전략</h3>
                            <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                                <li>• 문서 크기 512-1024 토큰</li>
                                <li>• 오버랩 설정 (10-20%)</li>
                                <li>• 문맥 보존 고려</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
                        <div>
                            © 2024 RAG PGVector Tutorial. Built with Spring AI & PostgreSQL.
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">GitHub</a>
                            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">Documentation</a>
                            <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">Support</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RAGPgVectorManual;