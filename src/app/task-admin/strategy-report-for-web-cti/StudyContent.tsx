import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, BookOpen, FileText, Wrench, Code, Globe, BarChart, Compass } from 'lucide-react';

const StudyContent: React.FC = () => {
  return (
    <div className="w-full space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>차기 프로젝트 스펙을 위한 학습 권장 리스트</CardTitle>
          <CardDescription>
            프로젝트 준비를 위한 필수 학습 자료 및 추천 과정
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="graphql-basics" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="graphql-basics">GraphQL 기초</TabsTrigger>
              <TabsTrigger value="dgs">DGS 프레임워크</TabsTrigger>
              <TabsTrigger value="case-studies">GraphQL 사용기</TabsTrigger>
            </TabsList>

            <TabsContent value="graphql-basics" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">GraphQL 기초 노트 정리</h3>
                <div className="grid grid-cols-1 gap-3">
                  {graphqlBasicsNotes.map((resource, index) => (
                    <ResourceCard 
                      key={index}
                      title={resource.title}
                      url={resource.url}
                      description={resource.description}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">관련 자료</h3>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  {relatedResources.map((resource, index) => (
                    <ResourceCard 
                      key={index}
                      title={resource.title}
                      url={resource.url}
                      description={resource.description}
                      icon={resource.icon}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-3">GraphQL 생태계 정보</h3>
                <p className="text-sm text-gray-600 mb-4">
                  GraphQL 개발에 활용할 수 있는 주요 도구와 클라이언트 라이브러리입니다.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <h4 className="text-md font-medium col-span-full mb-1">인기 GraphQL 클라이언트</h4>
                  {graphqlClients.map((client, index) => (
                    <EcosystemCard 
                      key={index}
                      title={client.title}
                      url={client.url}
                      description={client.description}
                      icon={<Code size={16} className="text-purple-500" />}
                    />
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <h4 className="text-md font-medium col-span-full mb-1">GraphQL 개발 도구</h4>
                  {graphqlTools.map((tool, index) => (
                    <EcosystemCard 
                      key={index}
                      title={tool.title}
                      url={tool.url}
                      description={tool.description}
                      icon={<Wrench size={16} className="text-green-500" />}
                    />
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <a 
                    href="https://apidog.com/kr/blog/best-graphql-clients-2/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    더 많은 GraphQL 클라이언트 비교 정보 보기
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dgs" className="space-y-4">
              <h3 className="text-lg font-semibold">Netflix DGS 프레임워크 학습</h3>
              <p className="text-sm text-gray-600 mb-4">대규모 GraphQL 시스템을 위한 Netflix DGS 프레임워크 학습 경로입니다.</p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <h4 className="font-medium">1단계: DGS 프레임워크 입문</h4>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <ResourceCard 
                    title="Netflix DGS 공식 문서"
                    url="https://netflix.github.io/dgs/"
                    description="Netflix Domain Graph Service 프레임워크 공식 문서"
                  />
                  <ResourceCard 
                    title="DGS 프레임워크 시작하기"
                    url="https://netflix.github.io/dgs/getting-started/"
                    description="첫 DGS 애플리케이션 구축 방법 안내"
                  />
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <h4 className="font-medium">2단계: DGS 실전 활용</h4>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <ResourceCard 
                    title="인프런 - DGS Netflix 스프링부트 대용량트래픽 처리"
                    url="https://www.inflearn.com/course/dgs-netflix-스프링부트-대용량트래픽-처리"
                    description="DGS를 활용한 대용량 트래픽 처리 실전 강의"
                    badge="필수"
                  />
                  <ResourceCard 
                    title="DGS 코드 생성"
                    url="https://netflix.github.io/dgs/generating-code-from-schema/"
                    description="GraphQL 스키마에서 코드 생성하기"
                  />
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-1">
                  <h4 className="font-medium">3단계: DGS 심화 및 확장</h4>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <ResourceCard 
                    title="DGS Federation"
                    url="https://netflix.github.io/dgs/federation/"
                    description="DGS에서 GraphQL Federation 구현하기"
                  />
                  <ResourceCard 
                    title="DGS GitHub 저장소"
                    url="https://github.com/Netflix/dgs-framework"
                    description="Netflix DGS 프레임워크 소스 코드 및 예제"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="case-studies" className="space-y-4">
              <h3 className="text-lg font-semibold">국내 기업 GraphQL 사용기</h3>
              <p className="text-sm text-gray-600 mb-4">국내 기업들의 GraphQL 도입 및 활용 사례를 통해 실무에서의 적용 방법과 이점을 알아봅니다.</p>
              
              <div className="grid grid-cols-1 gap-4">
                {graphqlCaseStudies.map((study, index) => (
                  <CaseStudyCard 
                    key={index}
                    title={study.title}
                    url={study.url}
                    company={study.company}
                    description={study.description}
                    tags={study.tags}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface ResourceProps {
  title: string;
  url: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
}

const ResourceCard: React.FC<ResourceProps> = ({ title, url, description, badge, icon }) => {
  return (
    <Card className="w-full shadow-sm hover:shadow transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {icon && <div>{icon}</div>}
              <h4 className="font-medium text-md">{title}</h4>
              {badge && (
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const EcosystemCard: React.FC<ResourceProps> = ({ title, url, description, icon }) => {
  return (
    <Card className="w-full shadow-sm hover:shadow transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start">
          <div className="mt-1 mr-3">
            {icon}
          </div>
          <div className="flex-1">
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              {title}
            </a>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CaseStudyProps {
  title: string;
  company: string;
  url: string;
  description: string;
  tags: string[];
}

const CaseStudyCard: React.FC<CaseStudyProps> = ({ title, company, url, description, tags }) => {
  return (
    <Card className="w-full shadow-sm hover:shadow transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <FileText size={16} className="text-blue-500" />
              <h4 className="font-medium text-md">{title}</h4>
            </div>
            <div className="mb-2">
              <span className="text-sm font-medium text-gray-700">{company}</span>
            </div>
            <p className="text-sm text-gray-500 mb-3">{description}</p>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

// GraphQL 기초 노트 데이터
const graphqlBasicsNotes = [
  {
    title: 'GraphQL 기초 (1)',
    url: 'http://nexus-task-master.shop/note-admin/notes/64/note-contents?collectionId=50&noteTitle=그래프큐엘 기초(1)',
    description: 'GraphQL 소개 및 기본 개념 이해'
  },
  {
    title: 'GraphQL 기초 (2)',
    url: 'http://nexus-task-master.shop/note-admin/notes/65/note-contents?collectionId=50&noteTitle=그래프큐엘 기초(2)',
    description: 'GraphQL 스키마 및 타입 시스템'
  },
  {
    title: 'GraphQL 기초 (3)',
    url: 'http://nexus-task-master.shop/note-admin/notes/66/note-contents?collectionId=50&noteTitle=그래프큐엘 기초(3)',
    description: 'GraphQL 쿼리와 뮤테이션'
  },
  {
    title: 'GraphQL 기초 (4)',
    url: 'http://nexus-task-master.shop/note-admin/notes/67/note-contents?collectionId=50&noteTitle=그래프큐엘 기초(4)',
    description: 'GraphQL 리졸버 및 컨텍스트'
  },
  {
    title: 'GraphQL 기초 (5)',
    url: 'http://nexus-task-master.shop/note-admin/notes/68/note-contents?collectionId=50&noteTitle=그래프큐엘 기초(5)',
    description: 'GraphQL 고급 개념 및 모범 사례'
  },
];

// 관련 자료 데이터
const relatedResources = [
  {
    title: 'Codenary - GraphQL 기술 스택',
    url: 'https://www.codenary.co.kr/techstack/detail/graphql',
    description: 'GraphQL을 사용하는 회사 목록과 관련 채용 정보, 기술 동향 파악',
    icon: <BarChart size={16} className="text-blue-500" />
  },
  {
    title: 'How to GraphQL - 종합 학습 튜토리얼',
    url: 'https://www.howtographql.com/',
    description: 'GraphQL 풀스택 튜토리얼 및 다양한 언어/프레임워크 별 가이드',
    icon: <Compass size={16} className="text-blue-500" />
  },
  {
    title: 'The Guild - GraphQL 도구 모음',
    url: 'https://the-guild.dev/',
    description: 'GraphQL 개발을 위한 다양한 도구와 라이브러리 정보 제공',
    icon: <Globe size={16} className="text-blue-500" />
  }
];

// GraphQL 클라이언트 데이터
const graphqlClients = [
  {
    title: 'Apollo Client',
    url: 'https://www.apollographql.com/docs/react/',
    description: 'React, Angular, Vue 등 다양한 프레임워크를 지원하는 가장 인기 있는 GraphQL 클라이언트'
  },
  {
    title: 'Relay',
    url: 'https://relay.dev/',
    description: 'Facebook에서 개발한 React 전용 GraphQL 클라이언트, 대규모 애플리케이션에 최적화'
  },
  {
    title: 'URQL',
    url: 'https://formidable.com/open-source/urql/',
    description: '고도로 커스터마이징 가능한 경량 GraphQL 클라이언트 라이브러리'
  },
  {
    title: 'GraphQL Request',
    url: 'https://github.com/prisma-labs/graphql-request',
    description: '가볍고 단순한 GraphQL HTTP 클라이언트, 간단한 쿼리에 적합'
  }
];

// GraphQL 도구 데이터
const graphqlTools = [
  {
    title: 'GraphQL Playground',
    url: 'https://github.com/graphql/graphql-playground',
    description: 'GraphQL API를 탐색하고 테스트할 수 있는 강력한 IDE'
  },
  {
    title: 'GraphiQL',
    url: 'https://github.com/graphql/graphiql',
    description: 'GraphQL 쿼리 작성 및 테스트를 위한 브라우저 기반 IDE'
  },
  {
    title: 'GraphQL Code Generator',
    url: 'https://www.graphql-code-generator.com/',
    description: 'GraphQL 스키마에서 TypeScript 타입 및 코드 자동 생성 도구'
  },
  {
    title: 'Apollo Studio',
    url: 'https://www.apollographql.com/studio/',
    description: 'GraphQL API를 모니터링하고 관리하기 위한 통합 플랫폼'
  }
];

// GraphQL 사용기 데이터
const graphqlCaseStudies = [
  {
    title: 'GraphQL을 이용한 QueryFacade 개발기',
    company: '당근마켓',
    url: 'https://medium.com/daangn/graphql을-이용한-queryfacade-개발기-d764fd300067',
    description: '당근마켓에서 GraphQL을 도입하여 QueryFacade 패턴을 적용한 사례와 MSA 환경에서의 효율적인 데이터 통신 방법을 소개합니다.',
    tags: ['GraphQL', 'QueryFacade', 'MSA', 'API Gateway']
  },
  {
    title: 'GraphQL 적용기: 컴포넌트 기반 설계를 위하여',
    company: '토스',
    url: 'https://toss.tech/article/graphql-for-component',
    description: '토스에서 컴포넌트 기반 UI 설계에 GraphQL을 적용하여 데이터 요청 효율화 및 개발 생산성을 높인 경험을 공유합니다.',
    tags: ['GraphQL', '컴포넌트 기반 설계', 'React', 'Apollo Client']
  },
  {
    title: '우아한형제들의 GraphQL 도입기',
    company: '우아한형제들',
    url: 'https://techblog.woowahan.com/2147/',
    description: '배달의민족을 운영하는 우아한형제들이 GraphQL을 도입하여 API 개발 방식을 개선하고 프론트엔드와 백엔드 간 효율적인 협업을 이룬 사례를 소개합니다.',
    tags: ['GraphQL', 'REST API', '마이크로서비스', '협업']
  },
  {
    title: 'GraphQL 기반 마이크로서비스 구축기',
    company: '카카오',
    url: 'https://tech.kakao.com/blog/2019/08/01/graphql-based-microservice-architecture/',
    description: '카카오에서 다양한 서비스를 통합하는 GraphQL 기반 마이크로서비스 아키텍처를 구축한 경험과 도전 과제를 다룹니다.',
    tags: ['GraphQL', '마이크로서비스', 'Federation', 'Schema Stitching']
  },
  {
    title: '네이버 쇼핑 검색 GraphQL 적용기',
    company: '네이버',
    url: 'https://d2.naver.com/helloworld/4245995',
    description: '네이버 쇼핑에서 검색 서비스에 GraphQL을 도입하여 복잡한 검색 조건과 다양한 필터링을 효율적으로 처리한 사례를 설명합니다.',
    tags: ['GraphQL', '검색 서비스', '성능 최적화', 'N+1 문제 해결']
  }
];

export default StudyContent;