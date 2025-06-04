'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Database, Code, Settings, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoteItem {
    title: string;
    summary: string;
    url: string;
    icon: React.ReactNode;
    tags: string[];
}

const notes: NoteItem[] = [
    {
        title: 'DGS + GraphQL + JPA + JOOQ 프로젝트 시작',
        summary: 'Spring Boot 기반의 DGS GraphQL 프레임워크와 JPA, JOOQ를 통합한 파일럿 프로젝트의 기본 설정 및 구조를 소개합니다. 차기 CTI 백엔드 시스템의 컴포넌트화를 위한 기초 작업입니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/80/note-contents?pageNum=1',
        icon: <Code className="w-5 h-5" />,
        tags: ['DGS', 'GraphQL', 'Spring Boot', '프로젝트 구조']
    },
    {
        title: 'Docker-Compose 설정하기',
        summary: '개발 환경에서 필요한 데이터베이스, Redis 등의 인프라 서비스를 Docker Compose로 구성하는 방법을 설명합니다. 로컬 개발 환경의 일관성을 보장하는 컨테이너 설정을 다룹니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/80/note-contents?pageNum=2',
        icon: <Layers className="w-5 h-5" />,
        tags: ['Docker', 'Compose', '인프라', '개발환경']
    },
    {
        title: 'DGS 설정',
        summary: 'Netflix DGS (Domain Graph Service) 프레임워크의 상세한 설정 방법을 다룹니다. GraphQL 스키마 정의, 데이터 페처 구현, 그리고 JPA/JOOQ와의 연동 설정을 포함합니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/80/note-contents?pageNum=3',
        icon: <Settings className="w-5 h-5" />,
        tags: ['DGS', 'Configuration', 'Data Fetcher', 'Schema']
    }
];

const additionalResources = [
    {
        title: 'JPA + JOOQ 하이브리드 접근법',
        summary: 'JPA의 편의성과 JOOQ의 SQL 제어력을 결합한 하이브리드 데이터 액세스 패턴을 구현하는 방법',
        icon: <Database className="w-5 h-5" />,
        tags: ['JPA', 'JOOQ', 'Data Access', 'Hybrid']
    },
    {
        title: 'GraphQL 스키마 설계 Best Practices',
        summary: 'CTI 백엔드에 최적화된 GraphQL 스키마 설계 원칙과 성능 최적화 전략',
        icon: <Code className="w-5 h-5" />,
        tags: ['GraphQL', 'Schema Design', 'Performance', 'Best Practices']
    }
];

const DGSGraphQLPilotProject: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">
                    🚀 파일럿 프로젝트 for 차기 CTI 백엔드
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    DGS + GraphQL + JPA + JOOQ 통합 아키텍처로 구축하는
                    <span className="font-semibold text-blue-600"> 컴포넌트화된 백엔드 시스템</span>
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Spring Boot</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">DGS GraphQL</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">JPA</span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">JOOQ</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">Docker</span>
                </div>
            </div>

            {/* Main Tutorial Cards */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    📚 핵심 구현 가이드
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {notes.map((note, index) => (
                        <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    {note.icon}
                                    {note.title}
                                </CardTitle>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {note.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                                    {note.summary}
                                </p>
                                <div className="flex justify-center mt-4">
                                    <Button
                                        asChild
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold transition-all duration-300"
                                    >
                                        <a
                                            href={note.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink size={16} /> 상세 보기
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Additional Resources */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    🔧 추가 학습 자료
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {additionalResources.map((resource, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                    {resource.icon}
                                    {resource.title}
                                </CardTitle>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {resource.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {resource.summary}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Architecture Overview */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border border-blue-200">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    🏗️ 아키텍처 개요
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                        <h3 className="font-bold text-blue-800 mb-2">Frontend Layer</h3>
                        <p className="text-sm text-gray-600">React/Next.js with GraphQL Client</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                        <h3 className="font-bold text-purple-800 mb-2">API Gateway</h3>
                        <p className="text-sm text-gray-600">DGS GraphQL Federation</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                        <h3 className="font-bold text-green-800 mb-2">Business Logic</h3>
                        <p className="text-sm text-gray-600">Spring Boot Services</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                        <h3 className="font-bold text-orange-800 mb-2">Data Layer</h3>
                        <p className="text-sm text-gray-600">JPA + JOOQ Hybrid</p>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-2">🎯 프로젝트 목표</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 마이크로서비스 아키텍처를 위한 컴포넌트 분리</li>
                        <li>• GraphQL을 통한 효율적인 API 설계</li>
                        <li>• JPA와 JOOQ의 장점을 결합한 데이터 액세스 최적화</li>
                        <li>• CTI 시스템의 확장 가능한 백엔드 기반 구축</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DGSGraphQLPilotProject;