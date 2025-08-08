"use client";

import React, { useState } from "react";
import {
  TestTube,
  Settings,
  Upload,
  Search,
  Database,
  ArrowRight,
  Copy,
  CheckCheck,
  AlertCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// ===== Types =====
interface CodeBlockProps {
  code: string;
  language?: string;
  id: string;
  filename?: string;
  className?: string;
  showLineNumbers?: boolean;
}

// ===== Code Block (uses shadcn Button & ScrollArea) =====
const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "bash",
  id,
  filename,
  className = "",
  showLineNumbers = false,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const lines: string[] = code.split("\n");

  const copyToClipboard = (content: string, copyId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedCode(copyId);
    setTimeout(() => setCopiedCode(null), 1600);
  };

  return (
    <div className={`relative rounded-lg border bg-card ${className}`}>
      {filename && (
        <div className="flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground">
          <span className="truncate">{filename}</span>
          <span className="rounded bg-muted px-2 py-0.5">{language}</span>
        </div>
      )}
      <div className={`${filename ? "rounded-b-lg" : "rounded-lg"} relative`}>
        <ScrollArea className="max-h-[420px] w-full">
          <div className="relative">
            {showLineNumbers && (
              <div className="absolute left-0 top-0 bottom-0 w-12 select-none bg-muted/40 border-r text-muted-foreground">
                {lines.map((_, i) => (
                  <div key={i} className="px-3 text-xs leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>
            )}
            <pre
              className={`p-4 text-sm text-foreground font-mono leading-relaxed ${showLineNumbers ? "pl-16" : ""}`}
            >
              <code>{code}</code>
            </pre>
          </div>
        </ScrollArea>
        <div className="absolute right-2 top-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => copyToClipboard(code, id)}
            aria-label="copy"
          >
            {copiedCode === id ? (
              <CheckCheck className="text-emerald-500" />
            ) : (
              <Copy />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ===== Content snippets (core only) =====
const springBootRun = `# 환경변수 설정 (Windows)
set OPENAI_API_KEY=sk-your-api-key-here

# 환경변수 설정 (Mac/Linux)
export OPENAI_API_KEY=sk-your-api-key-here

# Spring Boot 실행
./gradlew bootRun

# 또는 Maven 사용 시
mvn spring-boot:run`;

const checkConnection = `# PostgreSQL 접속 확인
docker exec -it security_demo_db psql -U pilot -d pilotdb -c "SELECT version();"

# pgvector extension 확인
docker exec -it security_demo_db psql -U pilot -d pilotdb -c "\\dx"

# vector_store 테이블 확인
docker exec -it security_demo_db psql -U pilot -d pilotdb -c "\\d vector_store"

# 현재 데이터 개수 확인
docker exec -it security_demo_db psql -U pilot -d pilotdb -c "SELECT COUNT(*) FROM vector_store;"`;

const basicDataInsert = `# 기본 문서 추가
curl -X POST http://localhost:8080/api/rag/documents \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "Spring AI는 AI 애플리케이션 개발을 위한 혁신적인 프레임워크입니다.",
    "source": "documentation",
    "type": "technical"
  }'

# 여러 문서 한번에 추가
curl -X POST http://localhost:8080/api/rag/documents/batch \\
  -H "Content-Type: application/json" \\
  -d '[
    {"content": "PGVector는 PostgreSQL에 벡터 유사도 검색 기능을 추가", "source": "wiki", "type": "technical"},
    {"content": "RAG는 검색과 생성을 결합한 AI 기술", "source": "blog", "type": "concept"}
  ]'`;

const searchQueries = `# 기본 유사도 검색
curl "http://localhost:8080/api/rag/search?query=Spring AI란 무엇인가요?&topK=5"

# 임계값을 설정한 검색
curl "http://localhost:8080/api/rag/search?query=벡터 데이터베이스&topK=3&threshold=0.7"`;

const sqlQueries = `-- 저장된 데이터 확인
SELECT id, content, metadata, created_at 
FROM vector_store 
ORDER BY created_at DESC 
LIMIT 5;

-- 메타데이터로 필터링
SELECT id, content, metadata->>'source' as source 
FROM vector_store 
WHERE metadata->>'type' = 'technical';`;

// ===== Page =====
const RAGStep2Manual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "prepare" | "insert" | "search" | "verify"
  >("prepare");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-2">
                  <TestTube className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold">
                  Step 2: 데이터 입력 및 조회 실습
                </h1>
              </div>
              <p className="text-muted-foreground">
                PGVector에 데이터를 넣고 검색을 수행해 봅니다.
              </p>
            </div>
            <div className="hidden gap-2 md:flex">
              <Badge>실습</Badge>
              <Badge variant="secondary">중급</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as typeof activeTab)}
        >
          <TabsList>
            <TabsTrigger value="prepare">
              <Settings className="mr-2 h-4 w-4" /> 준비
            </TabsTrigger>
            <TabsTrigger value="insert">
              <Upload className="mr-2 h-4 w-4" /> 데이터 입력
            </TabsTrigger>
            <TabsTrigger value="search">
              <Search className="mr-2 h-4 w-4" /> 검색
            </TabsTrigger>
            <TabsTrigger value="verify">
              <Database className="mr-2 h-4 w-4" /> DB 확인
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prepare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-blue-500" /> Spring Boot
                  애플리케이션 실행
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>사전 확인</AlertTitle>
                  <AlertDescription>
                    Docker 컨테이너가 실행 중이고, OpenAI API 키가 설정되었는지
                    확인하세요.
                  </AlertDescription>
                </Alert>
                <CodeBlock
                  code={springBootRun}
                  id="spring-boot-run"
                  filename="start-app.sh"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-500" /> 데이터베이스
                  연결 확인
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={checkConnection}
                  id="check-connection"
                  filename="verify-setup.sh"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insert" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>📝 기본 데이터 입력</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>팁</AlertTitle>
                  <AlertDescription>
                    간단한 문서들을 먼저 입력해 정상 동작을 확인하세요.
                  </AlertDescription>
                </Alert>
                <CodeBlock
                  code={basicDataInsert}
                  id="basic-insert"
                  filename="basic-insert.sh"
                  showLineNumbers
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-purple-500" /> 유사도 검색
                  테스트
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>검색 방식</AlertTitle>
                  <AlertDescription>
                    코사인 유사도로 의미적으로 유사한 문서를 찾습니다.
                  </AlertDescription>
                </Alert>
                <CodeBlock
                  code={searchQueries}
                  id="search-queries"
                  filename="search-examples.sh"
                  showLineNumbers
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verify" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" /> 데이터베이스
                  직접 조회
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock
                  code={sqlQueries}
                  id="sql-queries"
                  filename="database-queries.sql"
                  language="sql"
                  showLineNumbers
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <h3 className="mb-1 text-lg font-semibold">🎉 Step 2 완료!</h3>
              <p className="text-sm text-muted-foreground">
                데이터 입력과 검색의 기본을 마스터했습니다.
              </p>
            </div>
            <Button asChild>
              <Link href="/rag/rag-step3" className="flex items-center gap-2">
                다음 단계로 <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RAGStep2Manual;
