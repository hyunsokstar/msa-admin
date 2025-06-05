import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Database, Code, Zap, Settings } from 'lucide-react';

const CQRSJooqN1Solution = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const TabButton = ({ id, label, isActive, onClick }: { id: string; label: string; isActive: boolean; onClick: (id: string) => void }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-6 py-3 font-medium rounded-t-lg transition-all duration-200 ${
        isActive 
          ? 'bg-blue-600 text-white border-b-2 border-blue-600' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const FactCheck = ({ isCorrect, title, content }: { isCorrect: boolean; title: string; content: string }) => (
    <div className={`p-4 rounded-lg border-l-4 ${
      isCorrect 
        ? 'bg-green-50 border-green-500' 
        : 'bg-red-50 border-red-500'
    }`}>
      <div className="flex items-start gap-3">
        {isCorrect ? (
          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
        )}
        <div>
          <h4 className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {title}
          </h4>
          <p className={`mt-1 text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            {content}
          </p>
        </div>
      </div>
    </div>
  );

  const ArchitectureCard = ({ icon: Icon, title, description, benefits }: { icon: React.ComponentType<{ className?: string }>, title: string, description: string, benefits: string[] }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-8 h-8 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Database className="w-6 h-6" />
          CQRS + jOOQ로 N+1 문제 해결
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Command Query Responsibility Segregation (CQRS) 패턴과 jOOQ를 결합하여 
          GraphQL의 N+1 문제를 효과적으로 해결하는 아키텍처 접근법입니다.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ArchitectureCard
          icon={Code}
          title="Command Layer (쓰기)"
          description="JPA를 사용한 도메인 주도 설계로 Aggregate 단위의 트랜잭션 처리"
          benefits={[
            "도메인 로직과 비즈니스 규칙 캡슐화",
            "JPA의 ORM 강점 활용",
            "트랜잭션 무결성 보장",
            "복잡한 도메인 모델 지원"
          ]}
        />
        
        <ArchitectureCard
          icon={Zap}
          title="Query Layer (읽기)"
          description="jOOQ를 활용한 최적화된 읽기 전용 쿼리 처리"
          benefits={[
            "복잡한 Join 쿼리 최적화",
            "Flat DTO로 성능 향상",
            "N+1 문제 원천 차단",
            "타입 안전한 SQL 생성"
          ]}
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800 text-lg">핵심 원리</h3>
            <p className="text-yellow-700 mt-2">
              GraphQL Resolver에서 jOOQ로 조회하면 Lazy Loading 자체가 존재하지 않아 
              N+1 문제가 발생하지 않습니다. 모든 데이터는 명시적으로 로드됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFactCheck = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">GPT 주장 팩트체크</h2>
      
      <div className="space-y-4">
        <FactCheck
          isCorrect={true}
          title="✅ N+1 문제 해결 효과"
          content="Netflix DGS의 DataLoader와 jOOQ의 eager loading 특성으로 N+1 문제를 실제로 해결할 수 있습니다."
        />
        
        <FactCheck
          isCorrect={true}
          title="✅ CQRS 패턴 적용 가능성"
          content="CQRS는 검증된 아키텍처 패턴으로, GraphQL 환경에서 읽기/쓰기 분리를 통해 성능을 향상시킬 수 있습니다."
        />
        
        <FactCheck
          isCorrect={true}
          title="✅ jOOQ의 N+1 방지 효과"
          content="jOOQ는 명시적 쿼리 작성으로 ORM의 lazy loading으로 인한 N+1 문제를 원천적으로 방지합니다."
        />
        
        <FactCheck
          isCorrect={false}
          title="❌ Netflix의 공식 CQRS 사용 주장"
          content="Netflix DGS 공식 문서에는 CQRS 패턴에 대한 명시적 언급이 없습니다. 이는 추측에 기반한 주장입니다."
        />
        
        <FactCheck
          isCorrect={false}
          title="❌ 'Netflix DGS 팀도 이렇게 한다' 주장"
          content="실제로는 검증되지 않은 추측입니다. DGS는 DataLoader 패턴을 공식 지원하지만 CQRS는 명시하지 않습니다."
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 text-lg mb-3">결론</h3>
        <p className="text-blue-700">
          GPT의 기술적 설명은 대부분 정확하지만, Netflix의 실제 사용 사례에 대한 주장은 
          과장되었습니다. CQRS + jOOQ 조합은 실제로 N+1 문제를 해결할 수 있는 
          유효한 아키텍처 패턴입니다.
        </p>
      </div>
    </div>
  );

  const renderImplementation = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">실제 구현 가이드</h2>
      
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">아키텍처 구조</h3>
        </div>
        <div className="p-6">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`            [Client]
               ↓
        [GraphQL Query]
               ↓
         [DGS Resolver]
               ↓
┌──────────────┐ ┌──────────────┐
│Command Layer │ │ Query Layer  │
│   (JPA)      │ │   (jOOQ)     │
└──────────────┘ └──────────────┘

쓰기: JPA → Aggregate + 트랜잭션 관리
읽기: jOOQ → Flat DTO 반환`}</pre>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="bg-green-50 px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-green-800">Command 구현</h4>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 text-green-400 p-3 rounded text-sm font-mono">
              <pre>{`@DgsComponent
public class EmployeeMutation {
  
  @DgsData(parentType = "Mutation")
  public Employee createEmployee(
    @InputArgument CreateEmployeeInput input
  ) {
    // JPA를 사용한 도메인 객체 저장
    Employee employee = new Employee(
      input.getName(),
      input.getDepartment()
    );
    return employeeRepository.save(employee);
  }
}`}</pre>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-blue-800">Query 구현</h4>
          </div>
          <div className="p-6">
            <div className="bg-gray-900 text-blue-400 p-3 rounded text-sm font-mono">
              <pre>{`@DgsComponent
public class EmployeeQuery {
  
  @DgsData(parentType = "Query")
  public List<EmployeeDTO> employees() {
    // jOOQ를 사용한 최적화된 조회
    return dslContext
      .select(EMPLOYEE.NAME,
              DEPARTMENT.NAME)
      .from(EMPLOYEE)
      .join(DEPARTMENT)
      .on(EMPLOYEE.DEPT_ID.eq(DEPARTMENT.ID))
      .fetchInto(EmployeeDTO.class);
  }
}`}</pre>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">구현 시 주의사항</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Settings className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Command와 Query 모델 간 데이터 동기화 전략 수립</span>
          </li>
          <li className="flex items-start gap-2">
            <Settings className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">DataLoader 패턴과 jOOQ 조합으로 배치 쿼리 최적화</span>
          </li>
          <li className="flex items-start gap-2">
            <Settings className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">읽기 전용 DTO와 쓰기용 Entity 분리 설계</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderBenefits = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">장단점 분석</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            장점
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-green-800">🔥 N+1 문제 완전 제거</h4>
                <p className="text-sm text-green-700">jOOQ의 명시적 쿼리로 Lazy Loading 없음</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-green-800">🧱 명확한 책임 분리</h4>
                <p className="text-sm text-green-700">읽기/쓰기 최적화를 독립적으로 수행</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-green-800">📈 성능 향상</h4>
                <p className="text-sm text-green-700">복잡한 조인과 통계 쿼리 최적화</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-green-800">🔧 유지보수성</h4>
                <p className="text-sm text-green-700">Domain 로직과 성능 최적화 분리</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 rounded-lg p-6 border border-red-200">
          <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            단점 및 고려사항
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-red-800">⚡ 복잡성 증가</h4>
                <p className="text-sm text-red-700">두 개의 다른 데이터 접근 방식 관리</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-red-800">🔄 데이터 동기화</h4>
                <p className="text-sm text-red-700">Command와 Query 모델 간 일관성 관리</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-red-800">📚 학습 곡선</h4>
                <p className="text-sm text-red-700">팀의 CQRS와 jOOQ 학습 필요</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="font-medium text-red-800">🎯 초기 과투자</h4>
                <p className="text-sm text-red-700">단순한 프로젝트에는 오버엔지니어링</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 text-lg mb-3">언제 적용해야 할까?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">적합한 경우:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 복잡한 도메인 모델</li>
              <li>• 높은 읽기/쓰기 비율 차이</li>
              <li>• 성능이 중요한 서비스</li>
              <li>• 대용량 데이터 처리</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">부적합한 경우:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 단순한 CRUD 애플리케이션</li>
              <li>• 소규모 팀/프로젝트</li>
              <li>• 빠른 프로토타이핑 필요</li>
              <li>• 리소스 제약이 큰 경우</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">CQRS + jOOQ N+1 문제 해결 분석</h1>
          <p className="text-blue-100">Netflix DGS와 GraphQL에서의 실제 적용 가능성 검토</p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="flex space-x-1 p-1">
            <TabButton 
              id="overview" 
              label="개요" 
              isActive={activeTab === 'overview'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="factcheck" 
              label="팩트체크" 
              isActive={activeTab === 'factcheck'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="implementation" 
              label="구현 가이드" 
              isActive={activeTab === 'implementation'} 
              onClick={setActiveTab} 
            />
            <TabButton 
              id="benefits" 
              label="장단점" 
              isActive={activeTab === 'benefits'} 
              onClick={setActiveTab} 
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'factcheck' && renderFactCheck()}
          {activeTab === 'implementation' && renderImplementation()}
          {activeTab === 'benefits' && renderBenefits()}
        </div>
      </div>
    </div>
  );
};

export default CQRSJooqN1Solution;