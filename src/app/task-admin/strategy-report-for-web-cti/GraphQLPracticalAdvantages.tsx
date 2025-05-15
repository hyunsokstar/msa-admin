import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  GitBranch, 
  Book, 
  LayoutTemplate, 
  Users, 
  Layers, 
  FileCode,
  CodepenIcon,
  GitMerge,
  BarChart,
  Boxes
} from 'lucide-react';

const GraphQLPracticalAdvantages = () => {
  return (
    <div className="w-full space-y-6 my-12">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>실무적 관점에서의 GraphQL 유용성</CardTitle>
          <CardDescription>
            코드 아키텍처와 유지보수 측면에서 바라본 GraphQL의 이점과 활용 전략
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="architecture" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="architecture">코드 아키텍처 이점</TabsTrigger>
              <TabsTrigger value="maintainability">유지보수성 & 확장성</TabsTrigger>
              <TabsTrigger value="codeexamples">실제 코드 패턴</TabsTrigger>
            </TabsList>

            <TabsContent value="architecture" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">선언적 아키텍처: React와 GraphQL의 유사성</h3>
                <p className="text-sm text-gray-600 mb-4">
                  GraphQL은 API를 위한 선언적 접근 방식을 제공하며, 이는 React와 같은 현대적 프론트엔드 
                  프레임워크의 철학과 자연스럽게 조화됩니다. 이 선언적 특성이 코드 구조와 아키텍처에 가져오는 
                  이점을 살펴봅니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <ArchitectureCard 
                    title="계층 분리와 관심사 분리"
                    description="GraphQL 서버는 스키마 정의, 리졸버, 데이터 액세스, 비즈니스 로직 계층의 명확한 분리를 통해 코드의 모듈성을 향상시킵니다."
                    benefits={[
                      "각 계층이 단일 책임을 가지고 독립적으로 테스트/개발 가능",
                      "비즈니스 로직과 데이터 액세스 로직의 명확한 분리",
                      "팀 간 작업 경계의 명확한 구분",
                      "특정 계층의 기술 변경이 다른 계층에 영향 최소화"
                    ]}
                    icon={<Layers size={20} className="text-purple-600" />}
                  />
                  
                  <ArchitectureCard 
                    title="스키마 중심 설계"
                    description="GraphQL의 스키마 정의는 API 계약을 코드로 명시함으로써 시스템 전반의 일관성과 예측 가능성을 제공합니다."
                    benefits={[
                      "API 스키마가 코드 기반 문서 역할 수행",
                      "타입 시스템을 통한 컴파일 타임 오류 검출",
                      "스키마 우선 개발 방식으로 명확한 API 명세",
                      "도메인 모델과 API 표현의 직접적 매핑"
                    ]}
                    icon={<FileCode size={20} className="text-blue-600" />}
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <h4 className="text-md font-semibold flex items-center mb-2">
                    <Code2 size={18} className="text-blue-600 mr-2" />
                    REST API vs GraphQL: 코드 구조 비교
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h5 className="text-sm font-medium text-red-700 mb-1">REST API 구조</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <span className="text-red-500 mr-1">•</span>
                          <span>엔드포인트별 컨트롤러 메소드 중복 발생</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-1">•</span>
                          <span>유사 기능의 API가 여러 컨트롤러에 분산</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-1">•</span>
                          <span>요구사항 변경 시 여러 엔드포인트 수정 필요</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-500 mr-1">•</span>
                          <span>클라이언트별 맞춤형 API 구현 중복</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <h5 className="text-sm font-medium text-green-700 mb-1">GraphQL 구조</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          <span>도메인 객체 중심의 통합 스키마</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          <span>기능별로 구성된 리졸버 계층</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          <span>공통 데이터 로직의 효율적 재사용</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          <span>도메인 모델과 API 표현 간 직접적 매핑</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">도메인 중심 설계와의 시너지</h3>
                <p className="text-sm text-gray-600 mb-4">
                  GraphQL의 타입 시스템과 스키마 구조는 DDD(Domain-Driven Design)의 
                  핵심 원칙과 자연스럽게 조화되며, 이는 복잡한 비즈니스 도메인을 효과적으로 
                  모델링하는 데 큰 이점을 제공합니다.
                </p>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h5 className="font-medium mb-2 flex items-center">
                    <Book size={16} className="text-amber-600 mr-2" />
                    도메인 모델링과 GraphQL의 시너지
                  </h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-1">•</span>
                      <span>스키마가 바운디드 컨텍스트 정의에 도움</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-1">•</span>
                      <span>타입과 인터페이스로 도메인 관계 명확화</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-1">•</span>
                      <span>Federation을 통한 컨텍스트 간 통합 용이</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-500 mr-1">•</span>
                      <span>도메인 이벤트를 구독으로 자연스럽게 매핑</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="maintainability" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">확장성과 유지보수성 관점의 GraphQL</h3>
              <p className="text-sm text-gray-600 mb-4">
                GraphQL이 제공하는 구조적 이점은 대규모 시스템과 팀에서 특히 빛을 발합니다. 
                REST API와 다르게 GraphQL은 시스템 확장에 따라 관리 복잡성이 선형적으로 증가하지 않습니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <MaintainabilityCard 
                  title="API 엔드포인트 증식 방지"
                  description="REST API에서 자주 발생하는 엔드포인트 수의 기하급수적 증가 문제를 GraphQL은 단일 엔드포인트 접근 방식으로 해결합니다."
                  beforeAfter={{
                    before: "클라이언트별 최적화된 엔드포인트 계속 추가",
                    after: "단일 스키마 확장으로 모든 클라이언트 지원"
                  }}
                  icon={<GitBranch size={24} className="text-red-600" />}
                />
                
                <MaintainabilityCard 
                  title="유연한 API 진화"
                  description="GraphQL은 기존 타입에 비파괴적으로 새 필드를 추가하는 방식으로 API를 확장할 수 있어 버전 관리 부담이 크게 줄어듭니다."
                  beforeAfter={{
                    before: "API 변경 시 버전 관리 및 하위 호환성 유지 필요",
                    after: "필드 추가만으로 확장 가능, 기존 클라이언트 영향 없음"
                  }}
                  icon={<GitMerge size={24} className="text-green-600" />}
                />
                
                <MaintainabilityCard 
                  title="요구사항 변경에 대한 적응성"
                  description="새로운 비즈니스 요구사항이 발생했을 때 GraphQL은 기존 구조를 변경하지 않고도 필요한 데이터를 노출할 수 있습니다."
                  beforeAfter={{
                    before: "요구사항 변경 시 새 엔드포인트 생성 또는 기존 엔드포인트 수정",
                    after: "스키마 확장으로 새 요구사항 수용, 기존 쿼리 유지"
                  }}
                  icon={<Boxes size={24} className="text-blue-600" />}
                />
                
                <MaintainabilityCard 
                  title="통합 개발 환경"
                  description="GraphQL 스키마는 백엔드와 프론트엔드 간의 명확한 계약 역할을 함으로써 팀 간 협업 효율성을 증대시킵니다."
                  beforeAfter={{
                    before: "API 문서와 실제 구현 간 불일치 발생 가능",
                    after: "자체 문서화된 스키마로 항상 최신 상태 유지"
                  }}
                  icon={<Users size={24} className="text-purple-600" />}
                />
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <BarChart size={18} className="text-green-600 mr-2" />
                  대규모 시스템에서의 확장성 비교
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <ScalabilityComparisonCard 
                    metric="코드베이스 증가율"
                    restApi="API 엔드포인트 수에 비례하여 선형적 증가"
                    graphql="타입 및 리졸버 중심으로 느린 증가율"
                    conclusion="GraphQL이 더 효율적인 코드 확장성 제공"
                  />
                  
                  <ScalabilityComparisonCard 
                    metric="팀 간 협업 부담"
                    restApi="백엔드/프론트엔드 간 잦은 커뮤니케이션 필요"
                    graphql="스키마 기반 계약으로 독립적 작업 가능"
                    conclusion="GraphQL이 팀 확장성 향상"
                  />
                  
                  <ScalabilityComparisonCard 
                    metric="API 변경 전파"
                    restApi="특정 엔드포인트에 의존하는 클라이언트 파악 어려움"
                    graphql="필드별 사용 분석으로 영향 범위 가시화"
                    conclusion="GraphQL이 더 안전한 API 진화 지원"
                  />
                </div>
              </div>
              
              <h4 className="text-md font-medium mb-2">REST에서 GraphQL로의 전환 관리</h4>
              <p className="text-sm text-gray-600 mb-4">
                기존 REST API를 GraphQL로 점진적으로 전환하는 전략과 이를 통해 얻을 수 있는 
                구조적 이점을 알아봅니다.
              </p>
              
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">점진적 전환 전략</h5>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">1.</span>
                    <span>GraphQL 게이트웨이 도입: 기존 REST API 위에 GraphQL 레이어 구축</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">2.</span>
                    <span>도메인별 점진적 마이그레이션: 핵심 도메인부터 GraphQL 네이티브 구현</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">3.</span>
                    <span>Federation 구조 도입: 마이크로서비스별 독립 GraphQL 스키마 통합</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">4.</span>
                    <span>모니터링 및 측정: 코드 품질, 개발 속도, 유지보수 용이성 지표 추적</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="codeexamples" className="space-y-6">
              <h3 className="text-lg font-semibold mb-3">실제 코드 패턴 비교</h3>
              <p className="text-sm text-gray-600 mb-4">
                N+1 문제 해결과 같은 성능 최적화에서 GraphQL과 REST API의 실제 코드 패턴을 비교하여
                코드 가독성과 유지보수성 측면에서의 차이를 살펴봅니다.
              </p>
              
              <div className="grid grid-cols-1 gap-6 mb-6">
                <CodePatternCard 
                  title="N+1 문제 해결 패턴"
                  description="GraphQL의 DataLoader 패턴은 N+1 문제 해결을 위한 구조적 접근법을 제공합니다."
                  restExample={`// REST API 컨트롤러 - Entity 조회 + 연관 데이터 최적화
@GetMapping("/consultants/{id}")
public ConsultantDetailDTO getConsultantDetail(@PathVariable Long id) {
  // 단일 컨설턴트 조회
  Consultant consultant = consultantRepository.findById(id)
    .orElseThrow(() -> new ResourceNotFoundException("Consultant not found"));
  
  // 연관된 상담 내역 일괄 조회 (N+1 방지)
  List<Consultation> consultations = consultationRepository
    .findByConsultantIdWithCustomerInfo(id);
  
  // DTO 변환 및 반환
  return new ConsultantDetailDTO(consultant, consultations);
}

// 다른 엔드포인트에서 유사한 로직 중복 발생 가능
@GetMapping("/customers/{id}/consultants")
public List<ConsultantSummaryDTO> getCustomerConsultants(@PathVariable Long id) {
  // 또 다른 최적화 로직 구현...
}`}
                  graphqlExample={`// GraphQL 스키마 정의
type Consultant {
  id: ID!
  name: String!
  specialty: String
  consultations: [Consultation!]
}

type Consultation {
  id: ID!
  date: String!
  customer: Customer!
}

// 리졸버 구현
const resolvers = {
  Query: {
    consultant: (_, { id }, context) => 
      context.consultantRepository.findById(id)
  },
  Consultant: {
    // DataLoader를 통한 N+1 문제 해결
    consultations: (consultant, _, context) => 
      context.loaders.consultationsByConsultantId.load(consultant.id)
  }
};

// DataLoader 설정 (N+1 문제 방지)
const createLoaders = () => ({
  consultationsByConsultantId: new DataLoader(async (consultantIds) => {
    // 한 번의 쿼리로 여러 컨설턴트의 상담 내역 조회
    const consultations = await consultationRepository
      .findByConsultantIdIn(consultantIds);
    
    // 컨설턴트 ID별로 그룹화하여 반환
    return consultantIds.map(id => 
      consultations.filter(c => c.consultantId === id)
    );
  })
});`}
                />
                
                <CodePatternCard 
                  title="코드 재사용 및 모듈화"
                  description="GraphQL은 도메인 객체 중심의 리졸버 구조를 통해 코드 재사용성과 모듈화를 향상시킵니다."
                  restExample={`// REST API에서의 코드 중복 가능성
@GetMapping("/consultants")
public List<ConsultantDTO> getAllConsultants() {
  return consultantService.findAll()
    .stream()
    .map(this::convertToDTO)
    .collect(Collectors.toList());
}

@GetMapping("/teams/{teamId}/consultants")
public List<ConsultantDTO> getTeamConsultants(@PathVariable Long teamId) {
  return consultantService.findByTeamId(teamId)
    .stream()
    .map(this::convertToDTO)
    .collect(Collectors.toList());
}

// 각 컨트롤러 메서드마다 유사한 변환 로직 반복
private ConsultantDTO convertToDTO(Consultant consultant) {
  ConsultantDTO dto = new ConsultantDTO();
  dto.setId(consultant.getId());
  dto.setName(consultant.getName());
  // 다른 필드 설정...
  return dto;
}`}
                  graphqlExample={`// GraphQL 스키마 정의를 통한 통합 API
type Query {
  consultants: [Consultant!]!
  team(id: ID!): Team
}

type Team {
  id: ID!
  name: String!
  consultants: [Consultant!]!
}

type Consultant {
  id: ID!
  name: String!
  specialty: String
}

// 모듈화된 리졸버 구현
const resolvers = {
  Query: {
    consultants: (_, __, context) => 
      context.consultantService.findAll(),
    team: (_, { id }, context) => 
      context.teamService.findById(id)
  },
  Team: {
    consultants: (team, _, context) => 
      context.consultantService.findByTeamId(team.id)
  },
  // 모든 Consultant 타입에 대해 일관된 리졸버 적용
  Consultant: {
    // 필요시 필드별 리졸버 구현
  }
};`}
                />
                
                <CodePatternCard 
                  title="도메인 변경 대응 유연성"
                  description="새로운 요구사항이나 도메인 변화에 대응할 때 두 아키텍처의 코드 변경 방식을 비교합니다."
                  restExample={`// 도메인 변경: 컨설턴트에 평가 정보 추가 시
// 1. 엔티티 변경
public class Consultant {
  // 기존 필드들...
  @OneToMany(mappedBy = "consultant")
  private List<Rating> ratings;
  // 새 필드 추가
}

// 2. 모든 관련 DTO 변경
public class ConsultantDTO {
  // 기존 필드들...
  private Double averageRating;
  private List<RatingDTO> ratings;
}

// 3. 모든 관련 컨트롤러 메서드 수정
@GetMapping("/consultants/{id}")
public ConsultantDTO getConsultant(@PathVariable Long id) {
  Consultant consultant = consultantService.findById(id);
  ConsultantDTO dto = convertToDTO(consultant);
  
  // 새로운 평가 정보 처리 로직 추가
  dto.setAverageRating(ratingService.getAverageForConsultant(id));
  if (includeDetailedRatings) {
    dto.setRatings(ratingService.findByConsultantId(id)
      .stream()
      .map(this::convertRatingToDTO)
      .collect(Collectors.toList()));
  }
  
  return dto;
}

// 다른 모든 컨설턴트 관련 엔드포인트에도 유사한 변경 필요`}
                  graphqlExample={`// 도메인 변경: 컨설턴트에 평가 정보 추가 시
// 1. 스키마 확장
type Consultant {
  id: ID!
  name: String!
  specialty: String
  # 새 필드 추가 - 기존 쿼리 영향 없음
  averageRating: Float
  ratings: [Rating!]
}

type Rating {
  id: ID!
  score: Float!
  comment: String
  createdAt: String!
}

// 2. 리졸버 추가 - 기존 리졸버 변경 없음
const resolvers = {
  Consultant: {
    // 기존 리졸버는 그대로 유지
    
    // 새 필드에 대한 리졸버만 추가
    averageRating: (consultant, _, context) => 
      context.ratingService.getAverageForConsultant(consultant.id),
    
    ratings: (consultant, _, context) => 
      context.loaders.ratingsByConsultantId.load(consultant.id)
  }
};

// 3. DataLoader 추가
const createLoaders = () => ({
  // 기존 DataLoader 유지
  
  // 새 DataLoader 추가
  ratingsByConsultantId: new DataLoader(async (consultantIds) => {
    const ratings = await ratingRepository
      .findByConsultantIdIn(consultantIds);
    
    return consultantIds.map(id => 
      ratings.filter(r => r.consultantId === id)
    );
  })
});`}
                />
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 mb-6">
                <h4 className="text-md font-semibold flex items-center mb-2">
                  <CodepenIcon size={18} className="text-purple-600 mr-2" />
                  코드 구조 핵심 차이점
                </h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-purple-700 font-medium mr-2">1.</span>
                    <span><span className="font-medium">컨트롤러 중심 vs 타입 중심:</span> REST는 엔드포인트별 컨트롤러 메소드 구조, GraphQL은 도메인 타입 중심 구조</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-700 font-medium mr-2">2.</span>
                    <span><span className="font-medium">변환 로직 분산 vs 집중:</span> REST는 컨트롤러마다 DTO 변환 로직 분산, GraphQL은 리졸버에 집중</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-700 font-medium mr-2">3.</span>
                    <span><span className="font-medium">확장 방식:</span> REST는 새 엔드포인트 추가 또는 기존 수정, GraphQL은 타입과 리졸버 확장</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-700 font-medium mr-2">4.</span>
                    <span><span className="font-medium">최적화 패턴:</span> REST는 각 엔드포인트별 최적화, GraphQL은 DataLoader 등 재사용 가능한 패턴</span>
                  </li>
                </ol>
              </div>
              
              <h4 className="text-md font-medium mb-2">CTI 프로젝트에 최적화된 GraphQL 패턴</h4>
              <p className="text-sm text-gray-600 mb-4">
                상담 관리 및 CTI 시스템에 특화된 GraphQL 패턴과 아키텍처를 제안합니다.
              </p>
              
              <div className="p-4 border rounded-lg">
                <h5 className="font-medium mb-2">권장 아키텍처 패턴</h5>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">1.</span>
                    <span><span className="font-medium">도메인 분할:</span> 상담사, 고객, 상담 기록, 통계 등 주요 도메인별 스키마 모듈화</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">2.</span>
                    <span><span className="font-medium">이벤트 기반 구독:</span> 실시간 상담 상태, 큐 상태 등을 GraphQL Subscription으로 구현</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">3.</span>
                    <span><span className="font-medium">Federation 아키텍처:</span> 대규모 시스템으로 확장 시 도메인별 GraphQL 서비스 분리 후 Federation으로 통합</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">4.</span>
                    <span><span className="font-medium">최적화 계층 분리:</span> N+1 문제 해결을 위한 DataLoader와 비즈니스 로직 계층 명확히 분리</span>
                  </li>
                </ol>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// 아키텍처 카드 컴포넌트
interface ArchitectureCardProps {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
}

const ArchitectureCard = ({ title, description, benefits, icon }: ArchitectureCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-start mb-3">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <h4 className="font-medium text-md">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs font-medium text-blue-700 mb-1">주요 이점</p>
      <ul className="space-y-1">
        {benefits.map((benefit, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="text-blue-500 mr-1">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 유지보수성 카드 컴포넌트
interface MaintainabilityCardProps {
  title: string;
  description: string;
  beforeAfter: {
    before: string;
    after: string;
  };
  icon: React.ReactNode;
}

const MaintainabilityCard = ({ title, description, beforeAfter, icon }: MaintainabilityCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium text-md ml-2">{title}</h4>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="space-y-2">
        <div className="bg-red-50 p-2 rounded text-sm">
          <span className="font-medium">Before (REST): </span> 
          {beforeAfter.before}
        </div>
        <div className="bg-green-50 p-2 rounded text-sm">
          <span className="font-medium">After (GraphQL): </span> 
          {beforeAfter.after}
        </div>
      </div>
    </div>
  );
};

// 확장성 비교 카드 컴포넌트
interface ScalabilityComparisonCardProps {
  metric: string;
  restApi: string;
  graphql: string;
  conclusion: string;
}

const ScalabilityComparisonCard = ({ metric, restApi, graphql, conclusion }: ScalabilityComparisonCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm border-b pb-2">
      <div className="font-medium">{metric}</div>
      <div className="md:col-span-1">
        <span className="text-xs text-red-600 block mb-1">REST API:</span>
        {restApi}
      </div>
      <div className="md:col-span-1">
        <span className="text-xs text-green-600 block mb-1">GraphQL:</span>
        {graphql}
      </div>
      <div className="italic">
        <span className="text-xs text-blue-600 block mb-1">결론:</span>
        {conclusion}
      </div>
    </div>
  );
};

// 코드 패턴 비교 카드 컴포넌트
interface CodePatternCardProps {
  title: string;
  description: string;
  restExample: string;
  graphqlExample: string;
}

const CodePatternCard = ({ title, description, restExample, graphqlExample }: CodePatternCardProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h4 className="font-medium text-md mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <LayoutTemplate size={16} className="text-red-600 mr-2" />
            <p className="text-sm font-medium">REST API 코드 패턴</p>
          </div>
          <pre className="text-xs bg-gray-50 p-3 rounded border overflow-x-auto">
            <code>{restExample}</code>
          </pre>
        </div>
        
        <div>
          <div className="flex items-center mb-2">
            <LayoutTemplate size={16} className="text-green-600 mr-2" />
            <p className="text-sm font-medium">GraphQL 코드 패턴</p>
          </div>
          <pre className="text-xs bg-gray-50 p-3 rounded border overflow-x-auto">
            <code>{graphqlExample}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default GraphQLPracticalAdvantages;