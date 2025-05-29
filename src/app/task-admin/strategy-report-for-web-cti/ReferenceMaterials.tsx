// src/components/ReferenceMaterials.tsx
'use client';

import React, { useState } from 'react';
import {
  Search,
  Code2,
  BookOpen,
  FileText,
  Zap,
  Database,
  Github,
  ExternalLink,
  Star,
  Tag as TagIcon,
  User,
  Code2 as LanguageIcon,
  Calendar as CalendarIcon,
  Download,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Reference {
  id: number;
  type: 'repository' | 'documentation';
  title: string;
  description: string;
  url: string;
  author: string;
  tags: string[];
  language?: string;
  stars?: string;
  lastUpdated?: string;
  category: 'boilerplate' | 'tutorial';
  features: string[];
  step?: number;
}

const ReferenceMaterials: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'boilerplate' | 'tutorial'>('all');

  const references: Reference[] = [
    { id: 1, type: 'repository', title: 'GraphQL 보일러플레이트 프로젝트', description: 'NestJS + GraphQL + Prisma를 활용한 완전한 백엔드 보일러플레이트', url: 'https://github.com/hyunsokstar/my-graphql-project', author: 'hyunsokstar', tags: ['NestJS', 'GraphQL', 'Prisma', 'TypeScript', 'JWT'], language: 'TypeScript', stars: '⭐ 실제 프로젝트', lastUpdated: '2024년', category: 'boilerplate', features: ['JWT 인증 시스템', 'GraphQL API', 'Prisma ORM', 'TypeScript 완전 지원', 'Docker 설정 포함'] },
    { id: 2, type: 'documentation', title: '1단계: NestJS 프로젝트 생성 및 기본 설정', description: 'NestJS 프로젝트 초기 설정부터 GraphQL 환경 구성까지 완벽 가이드', url: 'https://nexus-task-master.shop/note-admin/notes/69/note-contents?collectionId=51&noteTitle=nest%20project%20%EC%83%9D%EC%84%B1%20%EB%B0%8F%20%EA%B8%B0%EB%B3%B8%20%EC%84%A4%EC%A0%95(for%20graphql)', author: 'Nexus Task Master', tags: ['NestJS', 'GraphQL', '초기설정', '프로젝트생성'], language: 'Korean', category: 'tutorial', step: 1, features: ['NestJS CLI 설치 및 프로젝트 생성', 'GraphQL 모듈 설정', '기본 구조 설정', '개발 환경 구성', '필수 패키지 설치'] },
    { id: 3, type: 'documentation', title: '2단계: ORM 및 데이터베이스 설정', description: 'Prisma ORM을 활용한 데이터베이스 연동 및 설정 완벽 가이드', url: 'https://nexus-task-master.shop/note-admin/notes/75/note-contents?collectionId=51&noteTitle=orm%20,%20db%20%EC%84%A4%EC%A0%95%20%ED%95%98%EA%B8%B0orm%20,%20db%20%EC%84%A4%EC%A0%95%20%ED%95%98%EA%B8%B0', author: 'Nexus Task Master', tags: ['Prisma', 'ORM', 'Database', 'PostgreSQL'], language: 'Korean', category: 'tutorial', step: 2, features: ['Prisma 설치 및 초기 설정', '데이터베이스 연결 설정', 'Schema 파일 작성', 'Migration 실행', 'Prisma Client 생성'] },
    { id: 4, type: 'documentation', title: '3단계: 유저 엔티티 설계 → 리졸버 → 테스트', description: '사용자 모델 설계부터 GraphQL 리졸버 구현 및 테스트까지', url: 'https://nexus-task-master.shop/note-admin/notes/74/note-contents?collectionId=51&noteTitle=%EC%9C%A0%EC%A0%80%20%EC%97%94%ED%8B%B0%ED%8B%B0%20%EC%84%A4%EA%B3%84%20=%3E%20%EB%A6%AC%EC%A1%B8%EB%B2%84%20=%3E%20%ED%85%8C%EC%8A%A4%ED%8A%B8', author: 'Nexus Task Master', tags: ['Entity', 'Resolver', 'GraphQL', 'Test'], language: 'Korean', category: 'tutorial', step: 3, features: ['사용자 엔티티 모델링', 'GraphQL 스키마 정의', 'Resolver 함수 구현', 'Query 및 Mutation 작성', '통합 테스트 실행'] },
    { id: 5, type: 'documentation', title: '5단계: 기본 로그인 구현 (2) Frontend', description: '프론트엔드에서 기본 로그인 화면 및 기능 구현 가이드', url: 'https://nexus-task-master.shop/note-admin/notes/77/note-contents?collectionId=51&noteTitle=%EA%B8%B0%EB%B3%B8%20%EB%A1%9C%EA%B7%B8%EC%9D%B8%20%EA%B5%AC%ED%98%84%20(2)%20frontend', author: 'Nexus Task Master', tags: ['Login', 'Frontend', 'Form', 'Authentication'], language: 'Korean', category: 'tutorial', step: 5, features: ['Login UI 컴포넌트 구현', 'API 연동 및 인증 처리', 'Form validation', '토큰 저장 및 관리', '페이지 보호 라우트 설정'] },
  ];

  const categories = [
    { key: 'all', label: '전체', icon: <Search size={16} /> },
    { key: 'boilerplate', label: '보일러플레이트', icon: <Code2 size={16} /> },
    { key: 'tutorial', label: '튜토리얼', icon: <BookOpen size={16} /> },
  ];

  const filteredReferences = filter === 'all' ? references : references.filter(ref => ref.category === filter);

  const getTypeIcon = (type: string) => {
    if (type === 'repository') return <Github size={20} className="text-gray-700" />;
    return <BookOpen size={20} className="text-blue-600" />;
  };

  const getTypeLabel = (type: string) => (type === 'repository' ? '저장소' : '문서/가이드');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <FileText size={32} className="text-blue-600" />
          GraphQL 보일러플레이트 참고자료
        </h1>
        <p className="text-lg text-gray-600">실제 프로젝트와 상세한 구현 가이드로 빠르게 학습하세요</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 p-4 bg-gray-50 rounded-lg">
        {categories.map(cat => (
          <Button
            key={cat.key}
            size="sm"
            variant={filter === cat.key ? 'default' : 'outline'}
            onClick={() => setFilter(cat.key as any)}
            className="flex items-center gap-2"
          >
            {cat.icon}
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Reference Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReferences.map(ref => (
          <Card key={ref.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(ref.type)}
                  <span className="text-sm font-medium text-gray-600">{getTypeLabel(ref.type)}</span>
                </div>
                {ref.stars && <span className="text-sm text-yellow-600 font-medium">{ref.stars}</span>}
              </div>
              <CardTitle>{ref.title}</CardTitle>
              <CardDescription>{ref.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {ref.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    <TagIcon size={12} className="mr-1" />{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  {ref.author}
                </div>
                {ref.language && (
                  <div className="flex items-center gap-1">
                    <LanguageIcon size={14} />
                    {ref.language}
                  </div>
                )}
                {ref.lastUpdated && (
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={14} />
                    {ref.lastUpdated}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Star size={16} className="text-yellow-500" /> 주요 특징
              </h4>
              <ul className="list-disc list-inside space-y-2 mb-6 text-sm text-gray-600">
                {ref.features.map((feature, i) => <li key={i}>{feature}</li>)}
              </ul>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex gap-3 w-full">
                <Button asChild className="flex-1">
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <ExternalLink size={16} />{ref.type === 'repository' ? '코드 보기' : '가이드 보기'}
                  </a>
                </Button>
                {ref.type === 'repository' && ( <Button variant="outline" asChild><a className="flex items-center justify-center gap-2"><Download size={16} />Clone</a></Button> )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Quick Start Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap size={24} className="text-blue-600" /> 빠른 시작 가이드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2"><Github size={20} className="text-gray-700" /><span className="font-medium">1. 프로젝트 클론</span></div>
            <p className="text-sm text-gray-600">GitHub 레파지토리에서 보일러플레이트 코드를 다운로드하고 로컬 환경에 설정하세요</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-2"><BookOpen size={20} className="text-blue-600" /><span className="font-medium">2. 가이드 따라하기</span></div>
            <p className="text-sm text-gray-600">상세한 튜토리얼을 참고해 인증 모듈부터 단계별로 구현하세요</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-2"><Zap size={20} className="text-green-600" /><span className="font-medium">3. 확장 및 커스터마이징</span></div>
            <p className="text-sm text-gray-600">기본 구조를 바탕으로 프로젝트 요구사항에 맞게 자유롭게 확장하세요</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Overview */}
      <div className="bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database size={24} className="text-purple-600" /> 사용된 기술 스택
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: 'NestJS', color: 'bg-red-100 text-red-700' },
            { name: 'GraphQL', color: 'bg-pink-100 text-pink-700' },
            { name: 'JWT', color: 'bg-green-100 text-green-700' },
            { name: 'PostgreSQL', color: 'bg-indigo-100 text-indigo-700' },
          ].map(tech => (
            <div key={tech.name} className={`px-3 py-2 rounded-lg text-center text-sm font-medium ${tech.color}`}> {tech.name} </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ReferenceMaterials;
