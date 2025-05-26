import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  BookOpen, 
  Star,
  Code2,
  FileText,
  Zap,
  Shield,
  Database,
  Search,
  Calendar,
  User,
  Tag,
  Eye,
  Download
} from 'lucide-react';

interface Reference {
  id: number;
  type: string;
  title: string;
  description: string;
  url: string;
  author: string;
  tags: string[];
  language?: string;
  stars?: string;
  lastUpdated?: string;
  category: string;
  features: string[];
}

const ReferenceMaterials = () => {
  const [filter, setFilter] = useState('all');

  const references = [
    {
      id: 1,
      type: 'repository',
      title: 'GraphQL 보일러플레이트 프로젝트',
      description: 'NestJS + GraphQL + Prisma를 활용한 완전한 백엔드 보일러플레이트',
      url: 'https://github.com/hyunsokstar/my-graphql-project',
      author: 'hyunsokstar',
      tags: ['NestJS', 'GraphQL', 'Prisma', 'TypeScript', 'JWT'],
      language: 'TypeScript',
      stars: '⭐ 실제 프로젝트',
      lastUpdated: '2024년',
      category: 'boilerplate',
      features: [
        'JWT 인증 시스템',
        'GraphQL API',
        'Prisma ORM',
        'TypeScript 완전 지원',
        'Docker 설정 포함'
      ]
    },
    {
      id: 2,
      type: 'documentation',
      title: 'Auth 모듈 생성 + 인증 기능 구현',
      description: '실제 프로젝트에서 사용한 인증 모듈 구현 과정과 상세한 코드 설명',
      url: 'https://nexus-task-master.shop/note-admin/notes/76/note-contents?collectionId=51&noteTitle=auth%20모듈%20생성%20+%20인증%20기능%20구현',
      author: 'Nexus Task Master',
      tags: ['인증', 'JWT', 'NestJS', '실습', '코드'],
      language: 'Korean',
      category: 'tutorial',
      features: [
        '단계별 구현 가이드',
        '실제 코드 예제',
        '복사 가능한 코드 블럭',
        '에러 해결 방법',
        '베스트 프랙티스'
      ]
    }
  ];

  const categories = [
    { key: 'all', label: '전체', icon: <Search size={16} /> },
    { key: 'boilerplate', label: '보일러플레이트', icon: <Code2 size={16} /> },
    { key: 'tutorial', label: '튜토리얼', icon: <BookOpen size={16} /> },
  ];

  const filteredReferences = filter === 'all' 
    ? references 
    : references.filter(ref => ref.category === filter);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <FileText className="text-blue-600" size={32} />
          GraphQL 보일러플레이트 참고자료
        </h1>
        <p className="text-lg text-gray-600">
          실제 프로젝트와 상세한 구현 가이드로 빠르게 학습하세요
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-50 rounded-lg">
        {categories.map(category => (
          <button
            key={category.key}
            onClick={() => setFilter(category.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === category.key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-blue-50'
            }`}
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>

      {/* Reference Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReferences.map(ref => (
          <ReferenceCard key={ref.id} reference={ref} />
        ))}
      </div>

      {/* Quick Start Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="text-blue-600" size={24} />
          빠른 시작 가이드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Github className="text-gray-700" size={20} />
              <span className="font-medium">1. 프로젝트 클론</span>
            </div>
            <p className="text-sm text-gray-600">
              GitHub 레포지토리에서 보일러플레이트 코드를 다운로드하고 로컬 환경에 설정
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-blue-600" size={20} />
              <span className="font-medium">2. 가이드 따라하기</span>
            </div>
            <p className="text-sm text-gray-600">
              상세한 노트를 참고하여 인증 모듈부터 단계별로 구현
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-green-600" size={20} />
              <span className="font-medium">3. 확장 및 커스터마이징</span>
            </div>
            <p className="text-sm text-gray-600">
              기본 구조를 바탕으로 프로젝트 요구사항에 맞게 확장
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Overview */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="text-purple-600" size={24} />
          사용된 기술 스택
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'NestJS', color: 'bg-red-100 text-red-700' },
{ name: 'GraphQL', color: 'bg-pink-100 text-pink-700' },
{ name: 'JWT', color: 'bg-green-100 text-green-700' },
            { name: 'PostgreSQL', color: 'bg-indigo-100 text-indigo-700' }
          ].map(tech => (
            <div key={tech.name} className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${tech.color}`}>
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Reference Card Component
const ReferenceCard = ({ reference }: { reference: Reference }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'repository':
        return <Github className="text-gray-700" size={20} />;
      case 'documentation':
        return <BookOpen className="text-blue-600" size={20} />;
      default:
        return <FileText className="text-gray-600" size={20} />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'repository':
        return '저장소';
      case 'documentation':
        return '문서/가이드';
      default:
        return '참고자료';
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getTypeIcon(reference.type)}
            <span className="text-sm font-medium text-gray-600">
              {getTypeLabel(reference.type)}
            </span>
          </div>
          {reference.stars && (
            <span className="text-sm text-yellow-600 font-medium">
              {reference.stars}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {reference.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {reference.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {reference.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
            >
              <Tag size={10} className="inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <User size={14} />
            {reference.author}
          </div>
          {reference.language && (
            <div className="flex items-center gap-1">
              <Code2 size={14} />
              {reference.language}
            </div>
          )}
          {reference.lastUpdated && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {reference.lastUpdated}
            </div>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
          <Star className="text-yellow-500" size={16} />
          주요 특징
        </h4>
        <ul className="space-y-2 mb-6">
          {reference.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              {feature}
            </li>
          ))}
        </ul>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <a
            href={reference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <ExternalLink size={16} />
            {reference.type === 'repository' ? '코드 보기' : '가이드 보기'}
          </a>
          {reference.type === 'repository' && (
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2">
              <Download size={16} />
              Clone
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferenceMaterials;