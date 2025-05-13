// app/enhanced-learning-resources/page.tsx
"use client";

import React from "react";

interface LearningResourceProps {
  title: string;
  link: string;
  description: string;
  type: string;
  difficulty?: string;
}

const LearningResource = ({
  title,
  link,
  description,
  type,
  difficulty = "중급",
}: LearningResourceProps) => {
  const getTypeStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case "course":
        return { icon: "🎓", bgColor: "bg-blue-100", textColor: "text-blue-700" };
      case "blog":
        return { icon: "📝", bgColor: "bg-green-100", textColor: "text-green-700" };
      case "video":
        return { icon: "🎥", bgColor: "bg-red-100", textColor: "text-red-700" };
      case "docs":
        return { icon: "📚", bgColor: "bg-purple-100", textColor: "text-purple-700" };
      case "github":
        return { icon: "💻", bgColor: "bg-gray-100", textColor: "text-gray-700" };
      default:
        return { icon: "📄", bgColor: "bg-yellow-100", textColor: "text-yellow-700" };
    }
  };
  const { icon, bgColor, textColor } = getTypeStyles(type);

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "입문":
        return "bg-green-50 text-green-700";
      case "중급":
        return "bg-blue-50 text-blue-700";
      case "고급":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };
  const difficultyClass = getDifficultyColor(difficulty);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow mb-3">
      <div className="flex items-start">
        <div className={`${bgColor} ${textColor} p-3 rounded-full text-xl mr-4`}>
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

const ResourceSection = ({ title, description, resources }: ResourceSectionProps) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    {description && <p className="text-gray-600 mb-4">{description}</p>}
    <div className="grid gap-4">
      {resources.map((res, idx) => (
        <LearningResource key={idx} {...res} />
      ))}
    </div>
  </div>
);

const EnhancedLearningResources = () => {
  const graphqlResources: LearningResourceProps[] = [
    {
      title: "GraphQL 공식 문서",
      link: "https://graphql.org/learn/",
      description: "GraphQL 사양 및 기본 개념을 다루는 공식 튜토리얼",
      type: "docs",
      difficulty: "입문",
    },
    {
      title: "Spring for GraphQL 공식 가이드",
      link: "https://spring.io/projects/spring-graphql",
      description: "Spring과 GraphQL 통합을 위한 공식 문서",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "Netflix DGS Framework",
      link: "https://netflix.github.io/dgs/",
      description: "Netflix의 DGS 프레임워크 공식 가이드 및 예제",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "Baeldung: Spring GraphQL 튜토리얼",
      link: "https://www.baeldung.com/spring-graphql",
      description: "Baeldung에서 제공하는 Spring GraphQL 입문 및 활용 가이드",
      type: "blog",
      difficulty: "중급",
    },
    {
      title: "Apollo GraphQL 튜토리얼",
      link: "https://www.apollographql.com/docs/tutorial/introduction/",
      description: "Apollo Server를 사용한 GraphQL API 기본 튜토리얼",
      type: "tutorial",
      difficulty: "입문",
    },
  ];

  const nextjsResources: LearningResourceProps[] = [
    {
      title: "Next.js 공식 App Router 문서",
      link: "https://beta.nextjs.org/docs",
      description: "Next.js 14의 App Router 기반 페이지 및 데이터 패칭 가이드",
      type: "docs",
      difficulty: "입문",
    },
    {
      title: "Next.js Learn",
      link: "https://nextjs.org/learn",
      description: "Next.js 팀이 제공하는 단계별 학습 과정",
      type: "tutorial",
      difficulty: "입문",
    },
    {
      title: "Next.js 14 릴리즈 노트",
      link: "https://nextjs.org/blog/next-14",
      description: "Next.js 14의 새로운 기능과 변경사항 요약",
      type: "blog",
      difficulty: "중급",
    },
    {
      title: "Next.js 예제 모음 (GitHub)",
      link: "https://github.com/vercel/next.js/tree/canary/examples",
      description: "Vercel에서 제공하는 Next.js 공식 예제 프로젝트",
      type: "github",
      difficulty: "입문",
    },
  ];

  const frontendResources: LearningResourceProps[] = [
    {
      title: "Zustand 공식 문서",
      link: "https://docs.pmnd.rs/zustand/getting-started",
      description: "경량 상태 관리를 위한 Zustand 사용법",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "TanStack Query 공식 문서",
      link: "https://tanstack.com/query/latest/docs/react/overview",
      description: "React Query의 최신 버전 사용 가이드",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "Shadcn UI 컴포넌트 가이드",
      link: "https://ui.shadcn.com/docs",
      description: "Tailwind CSS 기반 커스텀 컴포넌트 설계",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "Radix UI Primitives",
      link: "https://www.radix-ui.com/docs/primitives/overview/introduction",
      description: "접근성 높은 UI 컴포넌트 라이브러리",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "React Data Grid 설치 가이드",
      link: "https://react-data-grid.github.io/react-data-grid/docs/installation",
      description: "최신 버전 React Data Grid 설치 및 기본 사용법",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "Framer Motion 공식 문서",
      link: "https://www.framer.com/motion",
      description: "React 애니메이션을 위한 Framer Motion 시작 가이드",
      type: "docs",
      difficulty: "입문",
    },
  ];

  const aiResources: LearningResourceProps[] = [
    {
      title: "OpenAI Quickstart 가이드",
      link: "https://platform.openai.com/docs/quickstart",
      description: "OpenAI API를 이용한 텍스트 생성 및 분석 입문",
      type: "docs",
      difficulty: "입문",
    },
    {
      title: "Vercel 가이드: Next.js + OpenAI 챗봇 만들기",
      link: "https://vercel.com/guides/building-a-chatgpt-clone-with-nextjs-openai",
      description: "Next.js와 OpenAI API로 간단한 챗봇 구축 튜토리얼",
      type: "tutorial",
      difficulty: "중급",
    },
    {
      title: "LangChain JS 공식 문서",
      link: "https://js.langchain.com/docs/getting-started/installation",
      description: "LangChain JS 라이브러리 설치 및 기본 예제",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "RAG 시스템 구축 튜토리얼",
      link: "https://python.langchain.com/docs/tutorials/rag/",
      description: "LangChain을 사용한 Retrieval-Augmented Generation 구축",
      type: "tutorial",
      difficulty: "중급",
    },
  ];

  const visualizationResources: LearningResourceProps[] = [
    {
      title: "Three.js 공식 문서",
      link: "https://threejs.org/docs/index.html",
      description: "WebGL 기반 3D 그래픽 구현 가이드",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "React Three Fiber 시작하기",
      link: "https://docs.pmnd.rs/react-three-fiber/getting-started/introduction",
      description: "React 환경에서 Three.js 사용 예제",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "D3.js 공식 홈페이지",
      link: "https://d3js.org/",
      description: "데이터 시각화를 위한 D3.js 라이브러리",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "GSAP 공식 문서",
      link: "https://greensock.com/docs/",
      description: "고급 애니메이션 라이브러리 GSAP 사용법",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "Vega-Lite 튜토리얼",
      link: "https://vega.github.io/vega-lite/",
      description: "선언형 데이터 시각화를 위한 Vega-Lite 가이드",
      type: "docs",
      difficulty: "입문",
    },
  ];

  const architectureResources: LearningResourceProps[] = [
    {
      title: "Feature-Sliced Design 공식 문서",
      link: "https://feature-sliced.design/docs/",
      description: "프론트엔드 아키텍처 방법론 FSD 가이드",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "클린 아키텍처 기본 개념",
      link: "https://blog.cleancoder.com/uncle-bob/2018/09/05/ArchitectureBasics.html",
      description: "Uncle Bob의 클린 아키텍처 소개 블로그",
      type: "blog",
      difficulty: "중급",
    },
    {
      title: "Azure 마이크로서비스 아키텍처",
      link: "https://learn.microsoft.com/azure/architecture/guide/architecture-styles/microservices",
      description: "Microsoft에서 제안하는 마이크로서비스 패턴",
      type: "docs",
      difficulty: "중급",
    },
    {
      title: "Martin Fowler: 도메인 주도 설계",
      link: "https://martinfowler.com/bliki/DomainDrivenDesign.html",
      description: "Martin Fowler의 DDD 개념 블로그 포스트",
      type: "blog",
      difficulty: "고급",
    },
    {
      title: "Azure 아키텍처 패턴",
      link: "https://learn.microsoft.com/azure/architecture/patterns/",
      description: "Azure 아키텍처 센터의 디자인 패턴 모음",
      type: "docs",
      difficulty: "중급",
    },
  ];

  const communityResources: LearningResourceProps[] = [
    {
      title: "GraphQL Summit 2024",
      link: "https://summit.graphql.com/",
      description: "GraphQL 공식 컨퍼런스",
      type: "video",
      difficulty: "중급",
    },
    {
      title: "Next.js Conf 2024",
      link: "https://nextjs.org/conf",
      description: "Next.js 공식 컨퍼런스",
      type: "video",
      difficulty: "입문",
    },
    {
      title: "React Conf",
      link: "https://reactjs.org/conf",
      description: "React 공식 컨퍼런스 정보",
      type: "video",
      difficulty: "입문",
    },
    {
      title: "FEConf",
      link: "https://feconf.kr/",
      description: "한국 프론트엔드 개발자 컨퍼런스",
      type: "video",
      difficulty: "중급",
    },
    {
      title: "dev.to 커뮤니티",
      link: "https://dev.to/",
      description: "글로벌 개발자 블로그 및 커뮤니티",
      type: "blog",
      difficulty: "입문",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">
        CTI 프로젝트를 위한 최신 학습 자료
      </h1>
      <p className="text-lg text-center mb-12 text-gray-700">
        최신 웹·AI 기술을 활용한 CTI 시스템 개발에 추천하는 검증된 리소스 모음입니다.
      </p>

      <ResourceSection
        title="GraphQL + Spring Boot 학습 자료"
        description="GraphQL 기초 및 Spring 통합 리소스"
        resources={graphqlResources}
      />

      <ResourceSection
        title="Next.js 14 학습 자료"
        description="Next.js 14의 최신 기능 학습 리소스"
        resources={nextjsResources}
      />

      <ResourceSection
        title="현대적 프론트엔드 기술"
        description="Zustand, TanStack Query, Shadcn UI 등"
        resources={frontendResources}
      />

      <ResourceSection
        title="AI 통합 기술"
        description="AI 기능을 CTI 시스템에 적용하기 위한 리소스"
        resources={aiResources}
      />

      <ResourceSection
        title="데이터 시각화 및 애니메이션"
        description="Three.js, D3.js, GSAP 등 고급 기법"
        resources={visualizationResources}
      />

      <ResourceSection
        title="소프트웨어 아키텍처 패턴"
        description="확장 가능한 시스템 설계를 위한 패턴"
        resources={architectureResources}
      />

      <ResourceSection
        title="커뮤니티 & 컨퍼런스"
        description="최신 트렌드를 공유하는 공간"
        resources={communityResources}
      />
    </div>
  );
};

export default EnhancedLearningResources;
