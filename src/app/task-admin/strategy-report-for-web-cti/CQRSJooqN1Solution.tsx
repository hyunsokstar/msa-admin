import React, { useState, ReactNode } from 'react';
import { CheckCircle, AlertCircle, Code, Database, Zap, ArrowRight, X } from 'lucide-react';

interface SolutionCardProps {
  level: number;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  needsDataLoader: boolean;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  level,
  title,
  description,
  pros,
  cons,
  needsDataLoader,
}) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
          level === 1 ? 'bg-green-500' : level === 2 ? 'bg-blue-500' : 'bg-purple-500'
        }`}
      >
        {level}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>

    <p className="text-gray-600 mb-4">{description}</p>

    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-green-50 p-3 rounded">
        <h4 className="font-medium text-green-800 mb-2 flex items-center gap-1">
          <CheckCircle className="w-4 h-4" /> 장점
        </h4>
        <ul className="text-sm text-green-700 space-y-1">
          {pros.map((pro, idx) => (
            <li key={idx}>• {pro}</li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50 p-3 rounded">
        <h4 className="font-medium text-red-800 mb-2 flex items-center gap-1">
          <X className="w-4 h-4" /> 한계
        </h4>
        <ul className="text-sm text-red-700 space-y-1">
          {cons.map((con, idx) => (
            <li key={idx}>• {con}</li>
          ))}
        </ul>
      </div>
    </div>

    <div
      className={`p-3 rounded-lg ${
        needsDataLoader ? 'bg-yellow-50 border border-yellow-200' : 'bg-blue-50 border border-blue-200'
      }`}
    >
      <div className="flex items-center gap-2">
        <AlertCircle className={`w-4 h-4 ${needsDataLoader ? 'text-yellow-600' : 'text-blue-600'}`} />
        <span className={`font-medium ${needsDataLoader ? 'text-yellow-800' : 'text-blue-800'}`}>
          DataLoader 필요성: {needsDataLoader ? '권장' : '선택사항'}
        </span>
      </div>
      <p className={`text-sm mt-1 ${needsDataLoader ? 'text-yellow-700' : 'text-blue-700'}`}>
        {needsDataLoader
          ? 'GraphQL에서 완전한 N+1 해결을 위해 DataLoader 추가 권장'
          : '이미 상당한 N+1 문제가 해결됨, DataLoader는 추가 최적화용'}
      </p>
    </div>
  </div>
);

interface CodeExampleProps {
  title: string;
  code: string;
  language?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ title, code }) => (
  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
      <h4 className="font-semibold text-gray-800">{title}</h4>
    </div>
    <div className="p-4">
      <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  </div>
);

const TabButton: React.FC<{ id: string; label: string; isActive: boolean; onClick: (id: string) => void }> = ({
  id,
  label,
  isActive,
  onClick,
}) => (
  <button
    onClick={() => onClick(id)}
    className={`px-6 py-3 font-medium rounded-t-lg transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white border-b-2 border-blue-600'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }`}
    type="button"
  >
    {label}
  </button>
);

const SimpleN1SolutionGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'basic' | 'comparison' | 'examples'>('basic');

  const renderBasic = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">💡 핵심 답변</h2>
        <div className="text-lg text-gray-700 space-y-2">
          <p>
            <strong>JPA + jOOQ만으로도 N+1 문제 상당 부분 해결됩니다!</strong>
          </p>
          <p>
            DataLoader는 <span className="text-blue-600 font-medium">GraphQL에서 완벽한 최적화</span>를 원할 때 추가하면 좋습니다.
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <SolutionCard
          level={1}
          title="JPA만 사용 (기본)"
          description="JPA의 Join Fetch, Entity Graph 등을 활용한 기본 해결책"
          pros={['설정이 간단함', '기존 코드 변경 최소', 'Spring Data JPA와 잘 연동']}
          cons={['복잡한 쿼리 최적화 어려움', '여전히 일부 N+1 발생 가능', '성능 한계 존재']}
          needsDataLoader={true}
        />

        <SolutionCard
          level={2}
          title="JPA + jOOQ 조합 (권장)"
          description="JPA는 간단한 CRUD, jOOQ는 복잡한 조회 쿼리로 역할 분담"
          pros={['N+1 문제 대부분 해결', '복잡한 쿼리 최적화 가능', '타입 안전한 SQL 작성']}
          cons={['두 기술 학습 필요', '설정 복잡도 증가', '코드베이스 분산']}
          needsDataLoader={false}
        />

        <SolutionCard
          level={3}
          title="JPA + jOOQ + DataLoader (완벽)"
          description="GraphQL 환경에서 완벽한 N+1 해결을 위한 최종 조합"
          pros={['GraphQL N+1 완전 해결', '배치 쿼리 최적화', '캐싱 효과까지 제공']}
          cons={['높은 복잡도', '오버엔지니어링 위험', '많은 학습 비용']}
          needsDataLoader={false}
        />
      </div>
    </div>
  );

  const renderComparison = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🔍 상세 비교</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">항목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">JPA만</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">JPA + jOOQ</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">+ DataLoader</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">N+1 해결률</td>
                <td className="px-6 py-4 text-yellow-600">60-70%</td>
                <td className="px-6 py-4 text-green-600">85-95%</td>
                <td className="px-6 py-4 text-green-700">95-99%</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">구현 난이도</td>
                <td className="px-6 py-4 text-green-600">쉬움</td>
                <td className="px-6 py-4 text-yellow-600">보통</td>
                <td className="px-6 py-4 text-red-600">어려움</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">복잡한 쿼리</td>
                <td className="px-6 py-4 text-red-600">제한적</td>
                <td className="px-6 py-4 text-green-600">강력함</td>
                <td className="px-6 py-4 text-green-700">최강</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">유지보수</td>
                <td className="px-6 py-4 text-green-600">간단</td>
                <td className="px-6 py-4 text-yellow-600">보통</td>
                <td className="px-6 py-4 text-yellow-600">복잡</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium text-gray-900">GraphQL 최적화</td>
                <td className="px-6 py-4 text-red-600">부족</td>
                <td className="px-6 py-4 text-yellow-600">양호</td>
                <td className="px-6 py-4 text-green-700">완벽</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 text-lg mb-3">🎯 추천 방식</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <h4 className="font-medium text-blue-800">일반 웹 애플리케이션</h4>
              <p className="text-blue-700 text-sm">JPA + jOOQ 조합으로 충분함</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <h4 className="font-medium text-blue-800">GraphQL API 서비스</h4>
              <p className="text-blue-700 text-sm">JPA + jOOQ + DataLoader 고려</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <h4 className="font-medium text-blue-800">고성능 요구사항</h4>
              <p className="text-blue-700 text-sm">필요에 따라 단계적 적용</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExamples = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">💻 실제 코드 예시</h2>

      <div className="grid gap-6">
        <CodeExample
          title="❌ N+1 문제 발생하는 코드"
          code={`// N+1 문제 발생!
@Entity
public class Author {
    @OneToMany(mappedBy = "author")
    private List<Book> books; // Lazy Loading
}

// 이렇게 하면 N+1 발생
List<Author> authors = authorRepository.findAll(); // 1번 쿼리
for (Author author : authors) {
    author.getBooks().size(); // N번 쿼리 (각 작가마다)
}`}
        />

        <CodeExample
          title="✅ JPA Join Fetch로 해결"
          code={`// JPA Join Fetch 사용
@Query("SELECT a FROM Author a JOIN FETCH a.books")
List<Author> findAllWithBooks();

// 또는 Entity Graph 사용
@EntityGraph(attributePaths = {"books"})
@Query("SELECT a FROM Author a")
List<Author> findAllWithBooksGraph();`}
        />

        <CodeExample
          title="⚡ jOOQ로 더 강력한 해결"
          code={`// jOOQ 사용 - 복잡한 조회도 한번에
public List<AuthorWithStatsDTO> getAuthorsWithStats() {
    return dslContext
        .select(
            AUTHOR.NAME,
            AUTHOR.EMAIL,
            count(BOOK.ID).as("bookCount"),
            avg(BOOK.RATING).as("avgRating"),
            sum(BOOK.SALES).as("totalSales")
        )
        .from(AUTHOR)
        .leftJoin(BOOK).on(AUTHOR.ID.eq(BOOK.AUTHOR_ID))
        .where(AUTHOR.ACTIVE.eq(true))
        .groupBy(AUTHOR.ID, AUTHOR.NAME, AUTHOR.EMAIL)
        .orderBy(count(BOOK.ID).desc())
        .fetchInto(AuthorWithStatsDTO.class);
}`}
        />

        <CodeExample
          title="🚀 GraphQL + DataLoader (선택사항)"
          code={`// DataLoader 설정 (GraphQL에서 완벽한 최적화를 원할 때)
@DgsDataLoader(name = "books")
public class BookDataLoader implements BatchLoader<Long, List<Book>> {
    
    @Override
    public CompletionStage<List<List<Book>>> load(List<Long> authorIds) {
        // jOOQ로 배치 조회
        Map<Long, List<Book>> booksByAuthor = dslContext
            .selectFrom(BOOK)
            .where(BOOK.AUTHOR_ID.in(authorIds))
            .fetchGroups(BOOK.AUTHOR_ID, Book.class);
            
        return CompletableFuture.completedFuture(
            authorIds.stream()
                .map(id -> booksByAuthor.getOrDefault(id, List.of()))
                .collect(Collectors.toList())
        );
    }
}`}
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-800 text-lg mb-3">🔧 실무 팁</h3>
        <ul className="space-y-2 text-yellow-700">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-yellow-600" />
            <span>
              <strong>점진적 적용:</strong> 먼저 JPA Join Fetch부터 시작해서 필요시 jOOQ 추가
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-yellow-600" />
            <span>
              <strong>측정 우선:</strong> 실제 N+1 문제가 있는지 먼저 확인 (jOOQ DiagnosticsConnection 활용)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-yellow-600" />
            <span>
              <strong>역할 분담:</strong> 간단한 CRUD는 JPA, 복잡한 조회는 jOOQ
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 mt-0.5 text-yellow-600" />
            <span>
              <strong>DataLoader:</strong> GraphQL + 높은 트래픽 환경에서만 고려
            </span>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">🚀 간단한 N+1 문제 해결 가이드</h1>
          <p className="text-green-100">JPA + jOOQ로 N+1 문제 해결하기 (DataLoader는 선택사항)</p>
        </div>

        {/* Navigation */}
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="flex space-x-1 p-1">
            <TabButton id="basic" label="기본 이해" isActive={activeSection === 'basic'} onClick={(id) => setActiveSection(id as 'basic' | 'comparison' | 'examples')} />
            <TabButton id="comparison" label="상세 비교" isActive={activeSection === 'comparison'} onClick={(id) => setActiveSection(id as 'basic' | 'comparison' | 'examples')} />
            <TabButton id="examples" label="코드 예시" isActive={activeSection === 'examples'} onClick={(id) => setActiveSection(id as 'basic' | 'comparison' | 'examples')} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeSection === 'basic' && renderBasic()}
          {activeSection === 'comparison' && renderComparison()}
          {activeSection === 'examples' && renderExamples()}
        </div>
      </div>
    </div>
  );
};

export default SimpleN1SolutionGuide;