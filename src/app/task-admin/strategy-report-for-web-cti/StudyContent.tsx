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
      title: "DGS: NETFLIX가 스프링 부트로 대용량 트래픽을 처리하는 방법",
      link: "https://www.inflearn.com/course/dgs-netflix-스프링부트-대용량트래픽-처리",
      description: "Netflix의 DGS 프레임워크를 활용한 스프링 부트 기반 대용량 트래픽 처리 방법",
      type: "course",
      difficulty: "중급"
    },
    {
      title: "GraphQL: REST API를 대체할 기술",
      link: "https://www.inflearn.com/course/graphql-rest-api를-대체할-기술",
      description: "GraphQL의 개념과 REST API와의 차이점 및 실제 구현 방법",
      type: "course",
      difficulty: "입문"
    },
    {
      title: "MSA + GraphQL",
      link: "https://fastcampus.co.kr/dev_online_api3",
      description: "마이크로서비스 아키텍처와 GraphQL을 결합한 API 개발 방법론",
      type: "course",
      difficulty: "고급"
    }
  ];

  [
    {
      "title": "한 입 크기로 잘라먹는 Next.js(v15)",
      "link": "https://www.inflearn.com/course/%ED%95%9C%EC%9E%85-%ED%81%AC%EA%B8%B0-nextjs",
      "description": "세상에서 가장 친절하고 디테일 한 Next.js(15+)강의. App Router 뿐만 아니라 Page Router까지 프로젝트를 통해 살펴봅니다.",
      "type": "course",
      "difficulty": "입문"
    },
    {
      "title": "Next.js 공식 학습 과정",
      "link": "https://nextjs.org/learn",
      "description": "Next.js 팀이 제공하는 단계별 학습 과정, 한글 번역 지원",
      "type": "docs",
      "difficulty": "입문"
    },
    {
      "title": "Next.js로 웹서비스 만들기",
      "link": "https://codingapple.com/course/next-js/",
      "description": "자바스크립트 기초 지식만으로 시작하는 Next.js 웹 서비스 개발 강의",
      "type": "course",
      "difficulty": "입문"
    },
    {
      "title": "Next.js 공식 대시보드 튜토리얼을 차근차근 따라해보자",
      "link": "https://velog.io/@bbbjihan/Next.js-%EA%B3%B5%EC%8B%9D-%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%EC%9D%84-%EC%B0%A8%EA%B7%BC%EC%B0%A8%EA%B7%BC-%EB%94%B0%EB%9D%BC%ED%95%B4%EB%B3%B4%EC%9E%90.-%EC%A0%84%ED%8E%B8",
      "description": "Next.js 공식 튜토리얼(대시보드 만들기) 한글 설명",
      "type": "tutorial",
      "difficulty": "입문"
    },
    {
      "title": "7개 프로젝트로 완벽 대비하는 Next.js 실무 (ft. 성능 개선)",
      "link": "https://fastcampus.co.kr/dev_online_nextjs7",
      "description": "7개 프로젝트로 Next.js의 상황별 활용법, 현업 프로세스, 성능 개선 전략 학습",
      "type": "course",
      "difficulty": "중급"
    },
    {
      "title": "Next + React Query로 SNS 서비스 만들기 (ZeroCho)",
      "link": "https://www.inflearn.com/tag-curation/skill/next-js",
      "description": "Next.js와 React Query를 활용한 실전 SNS 서비스 구축 강의 (ZeroCho)",
      "type": "course",
      "difficulty": "중급"
    },
    {
      "title": "[내돈내산] Next.js 강의 추천 -12버전부터 실무까지-",
      "link": "https://heeeming.tistory.com/entry/%EB%82%B4%EB%8F%88%EB%82%B4%EC%82%B0-Nextjs-%EA%B0%95%EC%9D%98-%EC%B6%94%EC%B2%9C12%EB%B2%84%EC%A0%84%EB%B6%80%ED%84%B0-%EC%8B%A4%EB%AC%B4%EA%B9%8C%EC%A7%80",
      "description": "이정환, 하조은, 조현영 등 여러 Next.js 유료 강의 비교 및 추천 블로그",
      "type": "blog",
      "difficulty": "중급"
    }
  ]

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
      title: "Framer Motion 튜토리얼 (GitHub Pages)",
      link: "https://e-fais.github.io/framer-motion-articles/",
      description: "Framer Motion의 기본 개념부터 다양한 애니메이션 기법까지 단계별로 학습할 수 있는 튜토리얼입니다.",
      type: "tutorial",
      difficulty: "입문"
    },
    {
      title: "React용 Motion 시작하기 (공식 문서)",
      link: "https://motion.dev/docs/react-quick-start",
      description: "Framer Motion (현 Motion)의 공식 문서로, React 환경에서 Motion을 시작하는 방법과 기본적인 사용법을 안내합니다.",
      type: "docs",
      difficulty: "입문"
    },
    {
      title: "Motion 공식 예제 모음",
      link: "https://examples.motion.dev/",
      description: "기본적인 애니메이션부터 복잡한 인터랙션까지 다양한 Framer Motion 공식 예제들을 직접 확인하고 코드를 살펴볼 수 있습니다.",
      type: "docs",
      difficulty: "중급"
    }
  ];

  [
    {
      "title": "OpenAI API 개발자 퀵스타트",
      "link": "https://platform.openai.com/docs/quickstart",
      "description": "OpenAI API를 사용하여 텍스트 생성, 이미지 분석 등을 시작하는 공식 가이드",
      "type": "docs",
      "difficulty": "입문"
    },
    {
      "title": "처음부터 RAG 애플리케이션 구축하기 (초보자 가이드)",
      "link": "https://learnbybuilding.ai/tutorials/rag-from-scratch",
      "description": "라이브러리 없이 RAG 시스템의 기본 구성 요소를 단계별로 구축하는 튜토리얼",
      "type": "tutorial",
      "difficulty": "입문"
    },
    {
      "title": "LangChain Crash Course For Beginners (codebasics)",
      "link": "http://www.youtube.com/watch?v=nAmC7SoVLd8",
      "description": "LangChain 프레임워크를 사용한 LLM 애플리케이션 개발 입문 영상 튜토리얼",
      "type": "video",
      "difficulty": "입문"
    },
      {
      "title": "How I'd Learn AI in 2025 (if I could start over)",
      "link": "http://www.youtube.com/watch?v=h2FDq3agImI",
      "description": "2025년 기준 AI 학습 로드맵 및 방법에 대한 조언 영상",
      "type": "video",
      "difficulty": "입문"
    },
    {
      "title": "OpenAI API 웹 Q&A 임베딩 튜토리얼",
      "link": "https://platform.openai.com/docs/tutorials/web-qa-embeddings",
      "description": "웹사이트를 크롤링하고 임베딩을 사용하여 질문 답변 시스템을 구축하는 튜토리얼",
      "type": "tutorial",
      "difficulty": "중급"
    },
    {
      "title": "LangChain 한국어 튜토리얼 (GitHub)",
      "link": "https://github.com/teddylee777/langchain-kr",
      "description": "LangChain 공식 문서 및 실용 예제를 바탕으로 한 한국어 튜토리얼 모음",
      "type": "tutorial",
      "difficulty": "중급"
    },
    {
      "title": "LangChain 공식 튜토리얼 (Build RAG App)",
      "link": "https://python.langchain.com/docs/tutorials/rag/",
      "description": "LangChain을 사용하여 RAG(Retrieval Augmented Generation) 애플리케이션을 구축하는 공식 튜토리얼",
      "type": "tutorial",
      "difficulty": "중급"
    },
    {
      "title": "인공지능 개발 강의 (Inflearn)",
      "link": "https://www.inflearn.com/ko/courses/artificial-intelligence",
      "description": "딥러닝, 컴퓨터 비전, AI Agent 등 다양한 한국어 AI 개발 강의 모음",
      "type": "course",
      "difficulty": "중급"
    }
  ]

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

  [
    {
      "title": "가장 많이 사용되는 아키텍처 패턴 Top 5 (ByteByteGo)",
      "link": "http://www.youtube.com/watch?v=f6zXyq4VPP8",
      "description": "가장 널리 사용되는 소프트웨어 아키텍처 패턴 5가지(Layered, Client-Server 등) 소개 영상",
      "type": "video",
      "difficulty": "입문"
    },
    {
      "title": "Feature-Sliced Design 공식 문서",
      "link": "https://feature-sliced.design/",
      "description": "프론트엔드 프로젝트를 위한 아키텍처 방법론 공식 문서 (계층, 슬라이스, 세그먼트 설명)",
      "type": "docs",
      "difficulty": "중급"
    },
    {
      "title": "Feature-Sliced Design: 최고의 프론트엔드 아키텍처 (DEV Community)",
      "link": "https://dev.to/m_midas/feature-sliced-design-the-best-frontend-architecture-4noj",
      "description": "FSD의 계층 구조, 슬라이스, 세그먼트 및 Public API 개념 설명, 장점 분석",
      "type": "blog",
      "difficulty": "중급"
    },
    {
      "title": "클린 아키텍처 개념 및 원칙 (Tistory)",
      "link": "https://daryeou.tistory.com/280",
      "description": "클린 아키텍처의 정의, 계층 구조(엔티티, 유스케이스 등), SOLID 원칙과의 관계 설명",
      "type": "blog",
      "difficulty": "중급"
    },
    {
      "title": "마이크로서비스 아키텍처 스타일 (Microsoft Learn)",
      "link": "https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/microservices",
      "description": "Azure 아키텍처 센터의 마이크로서비스 정의, 특징, 모범 사례 및 관련 패턴 가이드",
      "type": "docs",
      "difficulty": "중급"
    },
    {
      "title": "Microservice 설계 및 구현 (K-MOOC)",
      "link": "https://www.kmooc.kr/view/course/detail/3268",
      "description": "마이크로서비스 아키텍처 정의, 패턴, 도메인 주도 설계와의 연관성 학습 강의",
      "type": "course",
      "difficulty": "중급"
    },
    {
      "title": "소프트웨어 아키텍처 가이드 (Martin Fowler)",
      "link": "https://martinfowler.com/architecture/",
      "description": "Martin Fowler의 웹사이트 내 소프트웨어 아키텍처 관련 글 모음 (마이크로서비스, 애플리케이션 경계 등)",
      "type": "guide",
      "difficulty": "고급"
    }
  ]

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