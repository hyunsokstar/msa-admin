import React from 'react';

interface LearningResourceProps {
  title: string;
  link: string;
  description: string;
  type: string;
  difficulty?: string;
}

const LearningResource = ({ title, link, description, type, difficulty = "중급" }: LearningResourceProps) => {
  // 자원 유형에 따른 아이콘과 색상 설정
  const getTypeStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case 'course':
        return { icon: '🎓', bgColor: 'bg-blue-100', textColor: 'text-blue-700' };
      case 'blog':
        return { icon: '📝', bgColor: 'bg-green-100', textColor: 'text-green-700' };
      case 'video':
        return { icon: '🎥', bgColor: 'bg-red-100', textColor: 'text-red-700' };
      case 'docs':
        return { icon: '📚', bgColor: 'bg-purple-100', textColor: 'text-purple-700' };
      case 'github':
        return { icon: '💻', bgColor: 'bg-gray-100', textColor: 'text-gray-700' };
      default:
        return { icon: '📄', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' };
    }
  };

  const { icon, bgColor, textColor } = getTypeStyles(type);

  // 난이도에 따른 색상
  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case '입문':
        return 'bg-green-50 text-green-700';
      case '중급':
        return 'bg-blue-50 text-blue-700';
      case '고급':
        return 'bg-purple-50 text-purple-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const difficultyClass = getDifficultyColor(difficulty);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow mb-3">
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${bgColor} ${textColor} p-3 rounded-full text-xl mr-4`}>
          {icon}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium">{title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${difficultyClass}`}>
              {difficulty}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block mt-2 px-3 py-1 rounded text-sm ${textColor} ${bgColor} hover:opacity-80 transition-opacity`}
          >
            View Resource
          </a>
        </div>
      </div>
    </div>
  );
};

interface ResourceSectionProps {
  title: string;
  description?: string;
  resources: LearningResourceProps[];
}

const ResourceSection = ({ title, description, resources }: ResourceSectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      <div className="grid gap-4">
        {resources.map((resource, index) => (
          <LearningResource key={index} {...resource} />
        ))}
      </div>
    </div>
  );
};

const EnhancedLearningResources = () => {
  const graphqlResources = [
    {
      title: "GraphQL로 영화 API 만들기",
      link: "https://nomadcoders.co/graphql-for-beginners",
      description: "GraphQL 기초부터 Apollo Server 구현까지 실습 위주로 배우는 강의",
      type: "course",
      difficulty: "입문"
    },
    {
      title: "Netflix DGS Framework 공식 문서",
      link: "https://netflix.github.io/dgs/",
      description: "Netflix에서 제공하는 DGS 프레임워크 공식 가이드 및 베스트 프랙티스",
      type: "docs",
      difficulty: "중급"
    },
    {
      title: "GraphQL Korea 블로그",
      link: "https://medium.com/graphql-korea",
      description: "한국 GraphQL 커뮤니티의 튜토리얼과 최신 소식",
      type: "blog",
      difficulty: "중급"
    },
    {
      title: "Production Ready GraphQL",
      link: "https://book.productionreadygraphql.com/",
      description: "실제 프로덕션 환경에서 GraphQL을 사용하기 위한 패턴과 베스트 프랙티스",
      type: "docs",
      difficulty: "고급"
    },
    // 새로 추가된 강의들
    {
      title: "인프런 - GraphQL로 영화 API 만들기",
      link: "https://www.inflearn.com/course/graphql-영화-api-만들기",
      description: "GraphQL API 개발과 클라이언트 연동을 실무적으로 배우는 한국어 강의",
      type: "course",
      difficulty: "입문"
    },
    {
      title: "인프런 - 스프링부트 GraphQL과 리액트",
      link: "https://www.inflearn.com/course/스프링부트-graphql-리액트",
      description: "스프링부트와 GraphQL을 결합하여 백엔드 API를 구축하고 리액트로 연동하는 방법",
      type: "course",
      difficulty: "중급"
    },
    {
      title: "패스트캠퍼스 - GraphQL로 개발하는 Flutter+Firebase SNS 앱",
      link: "https://fastcampus.co.kr/dev_online_fltfire",
      description: "GraphQL과 Flutter, Firebase를 활용한 SNS 애플리케이션 개발 완성 과정",
      type: "course",
      difficulty: "중급"
    },
    {
      title: "패스트캠퍼스 - 백엔드 개발자를 위한 아키텍처 with GraphQL",
      link: "https://fastcampus.co.kr/dev_red_sdkst",
      description: "The RED 시리즈로, 엔터프라이즈급 GraphQL 아키텍처 설계와 구현 방법론",
      type: "course",
      difficulty: "고급"
    }
  ];

  const nextjsResources = [
    {
      title: "실전 Next.js 완전 정복",
      link: "https://fastcampus.co.kr/dev_online_nextjs",
      description: "App Router, 서버 컴포넌트, 최적화까지 Next.js의 모든 것",
      type: "course",
      difficulty: "중급"
    },
    {
      title: "Next.js 공식 학습 과정",
      link: "https://nextjs.org/learn",
      description: "Next.js 팀이 제공하는 단계별 학습 과정, 한글 번역 지원",
      type: "docs",
      difficulty: "입문"
    },
    {
      title: "Lee Robinson의 블로그",
      link: "https://leerob.io/",
      description: "Vercel DX 책임자가 작성한 Next.js 관련 심층 기술 블로그",
      type: "blog",
      difficulty: "중급"
    },
    {
      title: "Theo의 Next.js Edge API 구현 가이드",
      link: "https://www.youtube.com/watch?v=J1gzN1SAhyM",
      description: "Next.js의 Edge 런타임을 활용한 고성능 API 구현 방법",
      type: "video",
      difficulty: "고급"
    },
  ];

  const frontendResources = [
    {
      title: "Zustand 마스터 클래스",
      link: "https://ui.dev/zustand",
      description: "Zustand의 내부 작동 원리부터 복잡한 상태 관리까지",
      type: "course",
      difficulty: "중급"
    },
    {
      title: "TanStack 완벽 가이드",
      link: "https://tkdodo.eu/blog/practical-react-query",
      description: "TanStack Query의 깊이 있는 이해와 실전 패턴",
      type: "blog",
      difficulty: "중급"
    },
    {
      title: "Shadcn UI 마스터하기",
      link: "https://ui.shadcn.com/docs",
      description: "재사용 가능한 컴포넌트 설계와 테마 커스터마이징",
      type: "docs",
      difficulty: "중급"
    },
    {
      title: "코딩애플 Framer Motion 강의",
      link: "https://codingapple.com/course/framer-motion-basic/",
      description: "웹 애니메이션의 기초부터 고급 인터랙션까지",
      type: "course",
      difficulty: "입문"
    },
  ];

  const aiResources = [
    {
      title: "OpenAI API 마스터 클래스",
      link: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
      description: "Andrew Ng과 OpenAI가 함께 제작한 무료 AI 개발 강의",
      type: "course",
      difficulty: "입문"
    },
    {
      title: "RAG 튜토리얼 with LangChain",
      link: "https://python.langchain.com/docs/use_cases/question_answering/",
      description: "Retrieval-Augmented Generation(RAG) 시스템 구축 가이드",
      type: "docs",
      difficulty: "중급"
    },
    {
      title: "Vercel AI SDK 튜토리얼",
      link: "https://sdk.vercel.ai/docs",
      description: "Next.js 환경에서 AI 기능 구현을 위한 공식 가이드",
      type: "docs",
      difficulty: "중급"
    },
    {
      title: "대화형 AI 시스템 구축하기",
      link: "https://www.youtube.com/watch?v=0vLtc_3KlUc",
      description: "웹 애플리케이션에 AI 챗봇 기능 통합하는 방법",
      type: "video",
      difficulty: "중급"
    },
  ];

  const visualizationResources = [
    {
      title: "Three.js Journey",
      link: "https://threejs-journey.com/",
      description: "WebGL과 Three.js를 활용한 3D 그래픽 구현 마스터 코스",
      type: "course",
      difficulty: "중급"
    },
    {
      title: "D3.js 실전 데이터 시각화",
      link: "https://www.inflearn.com/course/d3-js-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%8B%9C%EA%B0%81%ED%99%94",
      description: "웹 기반 인터랙티브 데이터 시각화 구현 기법",
      type: "course",
      difficulty: "중급"
    },
    {
      title: "React Three Fiber 튜토리얼",
      link: "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction",
      description: "React 환경에서 3D 그래픽 구현을 위한 공식 가이드",
      type: "docs",
      difficulty: "중급"
    },
    {
      title: "GSAP 애니메이션 마스터하기",
      link: "https://greensock.com/learning/",
      description: "고급 웹 애니메이션 및 인터랙션 구현 테크닉",
      type: "docs",
      difficulty: "고급"
    },
  ];

  const architectureResources = [
    {
      title: "데이터 중심 아키텍처 설계",
      link: "https://martinfowler.com/architecture/",
      description: "마틴 파울러의 소프트웨어 아키텍처 패턴 가이드",
      type: "blog",
      difficulty: "고급"
    },
    {
      title: "FSD(Feature-Sliced Design) 공식 문서",
      link: "https://feature-sliced.design/",
      description: "확장 가능한 프론트엔드 아키텍처 방법론 가이드",
      type: "docs",
      difficulty: "중급"
    },
    {
      title: "Clean Architecture in JavaScript",
      link: "https://github.com/falsy/react-with-clean-architecture",
      description: "React와 TypeScript로 구현하는 클린 아키텍처 예제",
      type: "github",
      difficulty: "고급"
    },
    {
      title: "마이크로 프론트엔드 아키텍처 가이드",
      link: "https://micro-frontends.org/",
      description: "확장 가능한 프론트엔드 시스템 구축 방법론",
      type: "docs",
      difficulty: "고급"
    },
  ];

  const communityResources = [
    {
      title: "AWSKRUG GraphQL 모임",
      link: "https://www.meetup.com/ko-KR/awskrug/",
      description: "한국 AWS 사용자 그룹의 GraphQL 관련 커뮤니티 및 밋업",
      type: "blog",
      difficulty: "중급"
    },
    {
      title: "프론트엔드 개발자 컨퍼런스 (FEConf)",
      link: "https://feconf.kr/",
      description: "한국 최대 프론트엔드 개발 컨퍼런스 자료 및 영상",
      type: "video",
      difficulty: "중급"
    },
    {
      title: "Infcon 기술 컨퍼런스",
      link: "https://inflearn.com/infcon",
      description: "인프런에서 주최하는 다양한 웹 기술 세션",
      type: "video",
      difficulty: "중급"
    },
    {
      title: "DevTalk 팟캐스트",
      link: "https://www.podbbang.com/channels/1778409",
      description: "최신 개발 트렌드와 기술에 대한 한국 개발자 팟캐스트",
      type: "video",
      difficulty: "입문"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">웹 CTI 프로젝트를 위한 학습 자료</h1>
      <p className="text-lg text-center mb-12 text-gray-700">
        최신 웹 기술을 활용한 CTI 시스템 개발을 위한 추천 학습 자료 모음입니다.
      </p>

      <ResourceSection
        title="GraphQL + Spring Boot 학습 자료"
        description="GraphQL 기초 및 Spring Boot와의 통합을 위한 리소스"
        resources={graphqlResources}
      />

      <ResourceSection
        title="Next.js 최신 기술 학습 자료"
        description="Next.js 15와 함께 제공되는 최신 기능 학습 리소스"
        resources={nextjsResources}
      />

      <ResourceSection
        title="최신 프론트엔드 기술 학습 자료"
        description="Zustand, TanStack Query, Shadcn UI 등 현대적 프론트엔드 기술 학습 리소스"
        resources={frontendResources}
      />

      <ResourceSection
        title="AI 통합 기술 학습 자료"
        description="CTI 시스템에 AI 기능을 통합하기 위한 학습 리소스"
        resources={aiResources}
      />

      <ResourceSection
        title="데이터 시각화 및 하이엔드 그래픽"
        description="Three.js, D3.js 등을 활용한 고급 시각화 기법 학습 리소스"
        resources={visualizationResources}
      />

      <ResourceSection
        title="아키텍처 패턴 학습 자료"
        description="확장 가능하고 유지보수하기 쉬운 아키텍처 설계 관련 리소스"
        resources={architectureResources}
      />

      <ResourceSection
        title="커뮤니티 및 컨퍼런스"
        description="최신 웹 개발 트렌드를 접할 수 있는 커뮤니티 및 컨퍼런스"
        resources={communityResources}
      />

      <div className="mt-12 p-6 bg-blue-50 rounded-lg text-center">
        <h3 className="text-xl font-bold text-blue-800 mb-3">팀 학습 로드맵 운영 제안</h3>
        <p className="text-gray-700 mb-4">
          각 팀원이 관심 분야별로 학습 자료를 선택하고, 2주에 한 번 학습 내용을 공유하는 기술 세미나를 운영하면
          효과적인 기술 역량 강화가 가능합니다. 또한 모든 학습 자료와 세미나 내용은 내부 위키에 축적하여
          지식 자산화할 것을 권장드립니다.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-blue-800 font-medium">
            학습 → 구현 → 공유 → 개선
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLearningResources;