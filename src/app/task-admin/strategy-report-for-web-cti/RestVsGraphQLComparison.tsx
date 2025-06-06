import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Code2,
    ArrowLeftRight,
    Database,
    FileText,
    Settings,
    Zap,
    CheckCircle,
    XCircle,
    GitCompare,
    Server,
    Globe,
    Box,
} from 'lucide-react';

const RestVsGraphQLComparison = () => {
    const [activeTab, setActiveTab] = useState('structure');

    const structureComparison = [
        {
            component: 'API 명세 정의',
            rest: {
                title: 'OpenAPI / Swagger',
                description: 'YAML/JSON 형태로 엔드포인트별 명세 작성',
                icon: <FileText className="w-5 h-5" />,
                code: `# OpenAPI 명세 예시
/api/users:
  get:
    summary: 사용자 목록 조회
    responses:
      200:
        schema:
          type: array
          items:
            $ref: '#/definitions/User'
            
/api/users/{id}:
  get:
    summary: 특정 사용자 조회`
            },
            graphql: {
                title: 'schema.graphqls',
                description: '단일 스키마 파일로 모든 타입과 쿼리 정의',
                icon: <Code2 className="w-5 h-5" />,
                code: `# GraphQL 스키마 정의
type Query {
  users: [User!]!
  user(id: ID!): User
  posts(userId: ID): [Post!]!
}

type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}`
            }
        },
        {
            component: 'API 구현부',
            rest: {
                title: '@RestController',
                description: '엔드포인트별로 개별 컨트롤러 메서드 구현',
                icon: <Server className="w-5 h-5" />,
                code: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public List<UserDto> getUsers() {
        return userService.getAllUsers();
    }
    
    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    
    @PostMapping
    public UserDto createUser(@RequestBody CreateUserRequest request) {
        return userService.createUser(request);
    }
}`
            },
            graphql: {
                title: '@DgsQuery, @DgsMutation',
                description: '단일 클래스에서 관련 쿼리들을 그룹화하여 구현',
                icon: <Box className="w-5 h-5" />,
                code: `@DgsComponent
public class UserDataFetcher {
    
    @DgsQuery
    public List<User> users() {
        return userService.getAllUsers();
    }
    
    @DgsQuery
    public User user(@InputArgument String id) {
        return userService.getUserById(id);
    }
    
    @DgsMutation
    public User createUser(@InputArgument UserInput input) {
        return userService.createUser(input);
    }
    
    @DgsData(parentType = "User", field = "posts")
    public List<Post> posts(DgsDataFetchingEnvironment dfe) {
        User user = dfe.getSource();
        return postService.getPostsByUserId(user.getId());
    }
}`
            }
        },
        {
            component: '서비스 계층',
            rest: {
                title: 'Service 구현',
                description: 'REST와 동일한 서비스 패턴',
                icon: <Settings className="w-5 h-5" />,
                code: `@Service
public class UserService {
    
    public List<UserDto> getAllUsers() {
        return userRepository.findAll()
            .stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
        return convertToDto(user);
    }
}`
            },
            graphql: {
                title: 'Service 구현',
                description: 'REST와 동일하지만 N+1 문제 해결 고려',
                icon: <Settings className="w-5 h-5" />,
                code: `@Service
public class UserService {
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public User getUserById(String id) {
        return userRepository.findById(Long.valueOf(id))
            .orElseThrow(() -> new UserNotFoundException(id));
    }
    
    // DataLoader를 활용한 배치 로딩으로 N+1 문제 해결
    public CompletableFuture<List<Post>> getPostsBatch(List<String> userIds) {
        return postRepository.findByUserIdIn(userIds);
    }
}`
            }
        },
        {
            component: '데이터 모델',
            rest: {
                title: 'DTO 클래스',
                description: '엔드포인트별 응답 형태에 맞춘 DTO',
                icon: <Database className="w-5 h-5" />,
                code: `// 사용자 목록용 DTO
public class UserListDto {
    private Long id;
    private String name;
    private String email;
    // posts 필드 제외
}

// 사용자 상세용 DTO  
public class UserDetailDto {
    private Long id;
    private String name;
    private String email;
    private List<PostDto> posts; // 포함
}

// 별도의 DTO 클래스들이 필요`
            },
            graphql: {
                title: '통합 타입 정의',
                description: '단일 타입으로 클라이언트가 필요한 필드만 선택',
                icon: <Database className="w-5 h-5" />,
                code: `// 단일 User 타입으로 모든 케이스 처리
public class User {
    private String id;
    private String name;
    private String email;
    private List<Post> posts;
    
    // 클라이언트 쿼리에 따라
    // 필요한 필드만 해석됨
}

// 클라이언트 쿼리 예시
query {
  users {
    id
    name
    # email과 posts는 요청하지 않음
  }
}`
            }
        }
    ];

    const conceptComparison = [
        {
            aspect: '요청 방식',
            rest: {
                title: '다중 엔드포인트',
                description: '리소스별로 개별 URL 엔드포인트',
                example: 'GET /api/users/1\nGET /api/users/1/posts\nGET /api/posts/123/comments',
                pros: ['직관적인 URL 구조', '캐싱이 용이', 'HTTP 메서드 활용'],
                cons: ['Over-fetching 발생', '여러 요청 필요', '엔드포인트 증가']
            },
            graphql: {
                title: '단일 엔드포인트',
                description: '모든 요청이 하나의 URL을 통해 처리',
                example: 'POST /graphql\n\nquery {\n  user(id: "1") {\n    name\n    posts {\n      title\n      comments { content }\n    }\n  }\n}',
                pros: ['정확한 데이터 요청', '단일 요청으로 처리', '유연한 쿼리'],
                cons: ['캐싱 복잡성', 'HTTP 활용 제한', '러닝 커브']
            }
        },
        {
            aspect: '데이터 페칭',
            rest: {
                title: '고정된 응답 구조',
                description: '서버에서 정의한 고정 형태로 응답',
                example: '{\n  "id": 1,\n  "name": "John",\n  "email": "john@example.com",\n  "createdAt": "2024-01-01",\n  "posts": [...]\n}',
                pros: ['예측 가능한 응답', '간단한 구현', '명확한 계약'],
                cons: ['불필요한 데이터 전송', '부족한 데이터로 추가 요청', '버전 관리 필요']
            },
            graphql: {
                title: '선택적 필드 요청',
                description: '클라이언트가 필요한 필드만 요청',
                example: 'query {\n  user(id: "1") {\n    name\n    posts {\n      title\n    }\n  }\n}\n\n# id, email, createdAt 등은 응답에서 제외',
                pros: ['효율적인 네트워크 사용', '단일 요청으로 복합 데이터', '강타입 시스템'],
                cons: ['쿼리 복잡성', '서버 부하 예측 어려움', 'N+1 문제 가능성']
            }
        },
        {
            aspect: '타입 시스템',
            rest: {
                title: '문서 기반 명세',
                description: 'OpenAPI/Swagger로 타입 정의',
                example: 'components:\n  schemas:\n    User:\n      type: object\n      properties:\n        id:\n          type: integer\n        name:\n          type: string',
                pros: ['표준화된 문서', '코드 생성 가능', '널리 사용됨'],
                cons: ['런타임 검증 부족', '문서와 구현 불일치 가능', '별도 도구 필요']
            },
            graphql: {
                title: '내장 타입 시스템',
                description: '스키마 자체가 강타입 정의',
                example: 'type User {\n  id: ID!\n  name: String!\n  email: String\n  posts: [Post!]!\n}\n\n# ! 는 Non-null을 의미',
                pros: ['런타임 타입 검증', '자동 문서 생성', '개발 도구 지원'],
                cons: ['스키마 복잡성', '버전 관리 어려움', '학습 비용']
            }
        }
    ];

    const implementationExample = {
        scenario: "사용자 정보와 최근 게시글 3개를 함께 조회하는 경우",
        rest: {
            requests: [
                "GET /api/users/123",
                "GET /api/users/123/posts?limit=3"
            ],
            code: `// 1. 사용자 정보 조회
const user = await fetch('/api/users/123');
const userData = await user.json();

// 2. 사용자의 게시글 조회 (추가 요청)
const posts = await fetch('/api/users/123/posts?limit=3');
const postsData = await posts.json();

// 3. 클라이언트에서 데이터 조합
const result = {
  ...userData,
  recentPosts: postsData
};`,
            issues: ["2번의 네트워크 요청", "클라이언트에서 데이터 조합 필요", "불필요한 사용자 정보도 포함될 수 있음"]
        },
        graphql: {
            requests: [
                "POST /graphql (단일 요청)"
            ],
            code: `// 단일 쿼리로 필요한 데이터만 요청
const query = \`
  query UserWithPosts($id: ID!) {
    user(id: $id) {
      name
      email
      posts(limit: 3) {
        title
        createdAt
      }
    }
  }
\`;

const response = await fetch('/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query,
    variables: { id: '123' }
  })
});

const result = await response.json();`,
            benefits: ["단일 네트워크 요청", "정확히 필요한 데이터만 전송", "서버에서 데이터 조합 처리"]
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mx-auto mb-6">
                        <GitCompare className="w-6 h-6 text-blue-600" />
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                            Architecture Comparison
                        </span>
                    </div>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                        REST API vs GraphQL
                    </h1>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-6">
                        구조와 구현 방식의 결정적 차이점
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        동일한 기능을 구현할 때 REST API와 GraphQL이 어떻게 다른 접근 방식을 취하는지,
                        <strong> 구조적 차이점</strong>과 <strong>실제 코드 구현</strong>을 통해 비교 분석합니다.
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white/70 backdrop-blur-sm rounded-full p-1 shadow-lg">
                        {[
                            { id: 'structure', label: '구조 비교', icon: <Box className="w-4 h-4" /> },
                            { id: 'concepts', label: '개념 차이', icon: <ArrowLeftRight className="w-4 h-4" /> },
                            { id: 'implementation', label: '구현 예제', icon: <Code2 className="w-4 h-4" /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Structure Comparison Tab */}
                {activeTab === 'structure' && (
                    <div className="space-y-12">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">아키텍처 구성 요소 비교</h3>
                            <p className="text-gray-600">각 구성 요소가 REST와 GraphQL에서 어떻게 다르게 구현되는지 살펴보세요</p>
                        </div>

                        {structureComparison.map((item, index) => (
                            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                                <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-8 py-4">
                                    <h4 className="text-xl font-bold text-white flex items-center gap-3">
                                        <Globe className="w-6 h-6" />
                                        {item.component}
                                    </h4>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                                    {/* REST Side */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                {item.rest.icon}
                                            </div>
                                            <div>
                                                <h5 className="text-lg font-bold text-blue-800">REST API</h5>
                                                <p className="text-sm text-blue-600">{item.rest.title}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4">{item.rest.description}</p>
                                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                                            <pre className="text-sm text-green-400 whitespace-pre-wrap">
                                                <code>{item.rest.code}</code>
                                            </pre>
                                        </div>
                                    </div>

                                    {/* GraphQL Side */}
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                {item.graphql.icon}
                                            </div>
                                            <div>
                                                <h5 className="text-lg font-bold text-purple-800">GraphQL</h5>
                                                <p className="text-sm text-purple-600">{item.graphql.title}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-4">{item.graphql.description}</p>
                                        <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                                            <pre className="text-sm text-pink-400 whitespace-pre-wrap">
                                                <code>{item.graphql.code}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Concepts Tab */}
                {activeTab === 'concepts' && (
                    <div className="space-y-8">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">핵심 개념 차이점</h3>
                            <p className="text-gray-600">동일한 기능을 구현할 때 두 방식이 보이는 근본적인 접근 방식의 차이</p>
                        </div>

                        {conceptComparison.map((item, index) => (
                            <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                                <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <CardTitle className="text-xl flex items-center gap-3">
                                        <ArrowLeftRight className="w-6 h-6" />
                                        {item.aspect}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                                        {/* REST */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                <h4 className="font-bold text-blue-800">{item.rest.title}</h4>
                                            </div>

                                            <p className="text-gray-600 mb-4">{item.rest.description}</p>

                                            <div className="bg-slate-100 rounded-lg p-4 mb-4">
                                                <pre className="text-sm text-slate-800 whitespace-pre-wrap">
                                                    <code>{item.rest.example}</code>
                                                </pre>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <h5 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                                                        <CheckCircle className="w-4 h-4" />
                                                        장점
                                                    </h5>
                                                    <ul className="space-y-1">
                                                        {item.rest.pros.map((pro, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                                <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                                                {pro}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h5 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                                                        <XCircle className="w-4 h-4" />
                                                        단점
                                                    </h5>
                                                    <ul className="space-y-1">
                                                        {item.rest.cons.map((con, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                                <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                                                {con}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* GraphQL */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                                <h4 className="font-bold text-purple-800">{item.graphql.title}</h4>
                                            </div>

                                            <p className="text-gray-600 mb-4">{item.graphql.description}</p>

                                            <div className="bg-slate-100 rounded-lg p-4 mb-4">
                                                <pre className="text-sm text-slate-800 whitespace-pre-wrap">
                                                    <code>{item.graphql.example}</code>
                                                </pre>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <h5 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                                                        <CheckCircle className="w-4 h-4" />
                                                        장점
                                                    </h5>
                                                    <ul className="space-y-1">
                                                        {item.graphql.pros.map((pro, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                                <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                                                {pro}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h5 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                                                        <XCircle className="w-4 h-4" />
                                                        단점
                                                    </h5>
                                                    <ul className="space-y-1">
                                                        {item.graphql.cons.map((con, i) => (
                                                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                                <span className="w-1 h-1 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                                                                {con}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Implementation Example Tab */}
                {activeTab === 'implementation' && (
                    <div className="space-y-8">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">실제 구현 예제</h3>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                동일한 요구사항을 REST API와 GraphQL로 각각 구현했을 때의 차이점을 실제 코드로 비교해보세요
                            </p>
                        </div>

                        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                            <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                                <CardTitle className="text-xl flex items-center gap-3">
                                    <Zap className="w-6 h-6" />
                                    실사용 시나리오: {implementationExample.scenario}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                                    {/* REST Implementation */}
                                    <div className="p-6">
                                        <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                                            <Server className="w-5 h-5" />
                                            REST API 구현
                                        </h4>

                                        <div className="mb-4">
                                            <h5 className="font-semibold mb-2">필요한 요청:</h5>
                                            <div className="space-y-2">
                                                {implementationExample.rest.requests.map((req, i) => (
                                                    <div key={i} className="bg-blue-100 px-3 py-2 rounded-lg text-sm font-mono">
                                                        {req}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 rounded-lg p-4 mb-4">
                                            <pre className="text-sm text-green-400 whitespace-pre-wrap overflow-x-auto">
                                                <code>{implementationExample.rest.code}</code>
                                            </pre>
                                        </div>

                                        <div>
                                            <h5 className="font-semibold text-red-700 mb-2">발생하는 문제:</h5>
                                            <ul className="space-y-1">
                                                {implementationExample.rest.issues.map((issue, i) => (
                                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                                        {issue}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* GraphQL Implementation */}
                                    <div className="p-6">
                                        <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                                            <Box className="w-5 h-5" />
                                            GraphQL 구현
                                        </h4>

                                        <div className="mb-4">
                                            <h5 className="font-semibold mb-2">필요한 요청:</h5>
                                            <div className="space-y-2">
                                                {implementationExample.graphql.requests.map((req, i) => (
                                                    <div key={i} className="bg-purple-100 px-3 py-2 rounded-lg text-sm font-mono">
                                                        {req}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-slate-900 rounded-lg p-4 mb-4">
                                            <pre className="text-sm text-pink-400 whitespace-pre-wrap overflow-x-auto">
                                                <code>{implementationExample.graphql.code}</code>
                                            </pre>
                                        </div>

                                        <div>
                                            <h5 className="font-semibold text-green-700 mb-2">얻는 이점:</h5>
                                            <ul className="space-y-1">
                                                {implementationExample.graphql.benefits.map((benefit, i) => (
                                                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        {benefit}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Key Takeaways */}
                        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-xl text-amber-800 flex items-center gap-3">
                                    <Zap className="w-6 h-6" />
                                    핵심 인사이트
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h5 className="font-bold text-gray-900 mb-3">REST API를 선택해야 하는 경우:</h5>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• 단순하고 예측 가능한 데이터 구조</li>
                                            <li>• HTTP 캐싱을 적극 활용해야 하는 경우</li>
                                            <li>• 팀의 GraphQL 학습 비용이 부담되는 경우</li>
                                            <li>• 파일 업로드가 빈번한 시스템</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900 mb-3">GraphQL을 선택해야 하는 경우:</h5>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• 클라이언트별로 다른 데이터 요구사항</li>
                                            <li>• 모바일 앱 등 네트워크 효율성이 중요한 경우</li>
                                            <li>• 복잡한 관계형 데이터를 다루는 경우</li>
                                            <li>• 빠른 프론트엔드 개발이 필요한 경우</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            어떤 방식을 선택하시겠나요?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            프로젝트의 요구사항과 팀의 상황을 고려하여 최적의 API 아키텍처를 선택하세요.
                            두 방식 모두 각각의 장단점이 명확하므로, 상황에 맞는 선택이 중요합니다.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                                REST API 상세 가이드
                            </Button>
                            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                                GraphQL 구현 가이드
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestVsGraphQLComparison;