'use client';

import React, { useState, useMemo } from 'react';
import {
    Search, X, ChevronDown, ChevronRight, Copy, Check,
    Folder, Code, Database, Bug, Brain, Star, Lightbulb,
    Monitor, Keyboard, Settings, BookOpen, Zap, Target,
    Command, ArrowRight, Filter, Download, Share2
} from 'lucide-react';

interface Shortcut {
    key: string;
    description: string;
    category: string;
    importance: 'high' | 'medium' | 'low';
    tags: string[];
}

interface ShortcutCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    shortcuts: Shortcut[];
}

const IntelliJShortcutsGuide = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        file: true,
        code: false,
        mybatis: false,
        debug: false,
        ai: false
    });
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const shortcutCategories: ShortcutCategory[] = [
        {
            id: 'file',
            title: '파일 탐색 단축키',
            icon: <Folder className="w-5 h-5" />,
            color: 'blue',
            shortcuts: [
                {
                    key: 'Ctrl + E',
                    description: '최근 연 파일 목록 보기',
                    category: 'file',
                    importance: 'high',
                    tags: ['navigation', 'recent', 'files']
                },
                {
                    key: 'Ctrl + Shift + E',
                    description: '최근 편집한 파일만 보기',
                    category: 'file',
                    importance: 'medium',
                    tags: ['navigation', 'recent', 'edited']
                },
                {
                    key: 'Ctrl + N',
                    description: '클래스/DTO 빠른 탐색 (ex. CenterDTO)',
                    category: 'file',
                    importance: 'high',
                    tags: ['navigation', 'class', 'search']
                },
                {
                    key: 'Ctrl + Shift + N',
                    description: '파일명으로 탐색 (ex. center.js)',
                    category: 'file',
                    importance: 'high',
                    tags: ['navigation', 'file', 'search']
                },
                {
                    key: 'Ctrl + Alt + Shift + N',
                    description: '심볼/함수 탐색 (getUserName() 등)',
                    category: 'file',
                    importance: 'medium',
                    tags: ['navigation', 'symbol', 'function']
                },
                {
                    key: 'Double Shift',
                    description: '모든 것(클래스, 파일, 심볼, 액션) 통합 검색',
                    category: 'file',
                    importance: 'high',
                    tags: ['navigation', 'search', 'all']
                },
                {
                    key: 'Alt + F1 → Enter',
                    description: '현재 파일을 프로젝트 트리에서 위치 찾기',
                    category: 'file',
                    importance: 'low',
                    tags: ['navigation', 'locate', 'tree']
                }
            ]
        },
        {
            id: 'code',
            title: '코드 생산성 단축키',
            icon: <Code className="w-5 h-5" />,
            color: 'green',
            shortcuts: [
                {
                    key: 'Ctrl + /',
                    description: '한 줄 주석',
                    category: 'code',
                    importance: 'high',
                    tags: ['comment', 'line']
                },
                {
                    key: 'Ctrl + Shift + /',
                    description: '여러 줄 블록 주석',
                    category: 'code',
                    importance: 'medium',
                    tags: ['comment', 'block']
                },
                {
                    key: 'Ctrl + Alt + L',
                    description: '코드 정렬 (자동 포맷팅)',
                    category: 'code',
                    importance: 'high',
                    tags: ['format', 'clean']
                },
                {
                    key: 'Ctrl + Alt + O',
                    description: '사용되지 않는 import 제거',
                    category: 'code',
                    importance: 'medium',
                    tags: ['import', 'clean']
                },
                {
                    key: 'Ctrl + D',
                    description: '한 줄 복사',
                    category: 'code',
                    importance: 'high',
                    tags: ['copy', 'duplicate']
                },
                {
                    key: 'Ctrl + Y',
                    description: '한 줄 삭제',
                    category: 'code',
                    importance: 'high',
                    tags: ['delete', 'line']
                },
                {
                    key: 'Ctrl + Shift + ↑/↓',
                    description: '코드 블록 위/아래 이동',
                    category: 'code',
                    importance: 'medium',
                    tags: ['move', 'block']
                },
                {
                    key: 'Shift + F6',
                    description: '변수/함수/파일명 이름 변경 (리팩토링 포함)',
                    category: 'code',
                    importance: 'high',
                    tags: ['rename', 'refactor']
                },
                {
                    key: 'Alt + Enter',
                    description: '빠른 수정 제안, 자동 import 등',
                    category: 'code',
                    importance: 'high',
                    tags: ['fix', 'suggestion', 'import']
                },
                {
                    key: 'Ctrl + Q',
                    description: '해당 함수/클래스의 설명 툴팁 보기',
                    category: 'code',
                    importance: 'medium',
                    tags: ['documentation', 'tooltip']
                }
            ]
        },
        {
            id: 'mybatis',
            title: 'MyBatis, JSP 연동 탐색',
            icon: <Database className="w-5 h-5" />,
            color: 'purple',
            shortcuts: [
                {
                    key: 'Ctrl + Click (XML ↔ Mapper)',
                    description: 'MyBatis XML에서 Java Mapper 이동 (반대도 가능)',
                    category: 'mybatis',
                    importance: 'high',
                    tags: ['mybatis', 'xml', 'mapper']
                },
                {
                    key: 'Ctrl + B or Ctrl + Click',
                    description: '메서드 정의로 바로 이동',
                    category: 'mybatis',
                    importance: 'high',
                    tags: ['navigation', 'method', 'definition']
                },
                {
                    key: 'Ctrl + Alt + B',
                    description: '인터페이스 구현체 찾기 (Mapper 인터페이스 → XML 매핑)',
                    category: 'mybatis',
                    importance: 'medium',
                    tags: ['interface', 'implementation', 'mapper']
                },
                {
                    key: 'Ctrl + Shift + I',
                    description: '메서드/SQL 내용 미리 보기 (hover 안 뜰 때 강제 미리보기)',
                    category: 'mybatis',
                    importance: 'medium',
                    tags: ['preview', 'sql', 'method']
                },
                {
                    key: 'Alt + F7',
                    description: '사용처 찾기 (Find Usages)',
                    category: 'mybatis',
                    importance: 'high',
                    tags: ['usage', 'find', 'reference']
                },
                {
                    key: 'Ctrl + Shift + Alt + T',
                    description: '리팩토링 메뉴 호출 (메서드 추출 등)',
                    category: 'mybatis',
                    importance: 'low',
                    tags: ['refactor', 'extract', 'menu']
                }
            ]
        },
        {
            id: 'debug',
            title: '디버깅 & 런타임',
            icon: <Bug className="w-5 h-5" />,
            color: 'red',
            shortcuts: [
                {
                    key: 'Shift + F10',
                    description: '최근 실행한 애플리케이션 실행',
                    category: 'debug',
                    importance: 'high',
                    tags: ['run', 'execute', 'recent']
                },
                {
                    key: 'Shift + F9',
                    description: '디버그 모드 실행',
                    category: 'debug',
                    importance: 'high',
                    tags: ['debug', 'mode']
                },
                {
                    key: 'F8',
                    description: '다음 줄 실행 (Step Over)',
                    category: 'debug',
                    importance: 'high',
                    tags: ['debug', 'step', 'over']
                },
                {
                    key: 'F7',
                    description: '함수 내부로 진입 (Step Into)',
                    category: 'debug',
                    importance: 'high',
                    tags: ['debug', 'step', 'into']
                },
                {
                    key: 'Alt + F8',
                    description: '런타임 중 값 평가',
                    category: 'debug',
                    importance: 'medium',
                    tags: ['debug', 'evaluate', 'runtime']
                },
                {
                    key: 'Ctrl + F8',
                    description: '현재 줄 브레이크포인트 토글',
                    category: 'debug',
                    importance: 'high',
                    tags: ['debug', 'breakpoint', 'toggle']
                }
            ]
        },
        {
            id: 'ai',
            title: 'IntelliJ AI Assistant 활용',
            icon: <Brain className="w-5 h-5" />,
            color: 'indigo',
            shortcuts: [
                {
                    key: 'Alt + Enter + "AI Explain Code"',
                    description: '선택한 코드에 대한 설명 받기',
                    category: 'ai',
                    importance: 'medium',
                    tags: ['ai', 'explain', 'code']
                },
                {
                    key: '// TODO: use ai to refactor',
                    description: '주석 기반 AI 리팩토링 요청',
                    category: 'ai',
                    importance: 'low',
                    tags: ['ai', 'refactor', 'todo']
                },
                {
                    key: 'AI Assistant 패널',
                    description: '자연어 입력으로 코드 생성/수정 요청',
                    category: 'ai',
                    importance: 'medium',
                    tags: ['ai', 'assistant', 'natural-language']
                },
                {
                    key: 'View > Tool Windows > AI Assistant',
                    description: 'AI 채팅 패널 열기',
                    category: 'ai',
                    importance: 'low',
                    tags: ['ai', 'panel', 'view']
                }
            ]
        }
    ];

    // 검색 및 필터링 로직
    const filteredShortcuts = useMemo(() => {
        const allShortcuts = shortcutCategories.flatMap(cat => cat.shortcuts);

        return allShortcuts.filter(shortcut => {
            const matchesSearch = searchQuery === '' ||
                shortcut.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shortcut.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCategory = selectedCategory === 'all' || shortcut.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const toggleAllSections = (open: boolean) => {
        const newState: Record<string, boolean> = {};
        shortcutCategories.forEach(cat => {
            newState[cat.id] = open;
        });
        setOpenSections(newState);
    };

    const copyToClipboard = (key: string) => {
        navigator.clipboard.writeText(key);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const getColorClasses = (color: string) => {
        const colorMap = {
            blue: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-200',
            green: 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 text-green-800 dark:text-green-200',
            purple: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 text-purple-800 dark:text-purple-200',
            red: 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 text-red-800 dark:text-red-200',
            indigo: 'from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 text-indigo-800 dark:text-indigo-200'
        };
        return colorMap[color as keyof typeof colorMap] || colorMap.blue;
    };

    const getImportanceBadge = (importance: string) => {
        const badges = {
            high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        };
        const labels = { high: '필수', medium: '추천', low: '선택' };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[importance as keyof typeof badges]}`}>
                {labels[importance as keyof typeof labels]}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-900 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                <Keyboard className="text-white w-8 h-8" />
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                IntelliJ IDEA 단축키 가이드
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                            개발 생산성을 극대화하는 필수 단축키 모음
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            MyBatis, JSP, AI Assistant 포함 | 실전 환경 최적화
                        </p>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="단축키 또는 기능 검색..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm focus:shadow-md transition-shadow outline-none text-gray-700 dark:text-gray-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-500" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm outline-none text-gray-700 dark:text-gray-300"
                            >
                                <option value="all">전체 카테고리</option>
                                {shortcutCategories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                                ))}
                            </select>
                        </div>

                        {/* Toggle Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => toggleAllSections(true)}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm"
                            >
                                <ChevronDown className="w-4 h-4" />
                                모두 열기
                            </button>
                            <button
                                onClick={() => toggleAllSections(false)}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm"
                            >
                                <ChevronRight className="w-4 h-4" />
                                모두 닫기
                            </button>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">33</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">총 단축키</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">카테고리</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">18</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">필수 단축키</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                            <div className="text-2xl font-bold text-red-600 dark:text-red-400">90%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">생산성 향상</div>
                        </div>
                    </div>
                </div>

                {/* Search Results */}
                {searchQuery && (
                    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">
                            검색 결과 ({filteredShortcuts.length}개)
                        </h3>
                        <div className="space-y-2">
                            {filteredShortcuts.map((shortcut, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">
                                                {shortcut.key}
                                            </kbd>
                                            <span className="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                                            {getImportanceBadge(shortcut.importance)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(shortcut.key)}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                    >
                                        {copiedKey === shortcut.key ? (
                                            <Check className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-gray-500" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Categories */}
                {!searchQuery && shortcutCategories.map(category => (
                    <div key={category.id} className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => toggleSection(category.id)}
                            className={`w-full px-6 py-4 bg-gradient-to-r ${getColorClasses(category.color)} flex items-center justify-between hover:opacity-90 transition-opacity`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`${category.color === 'blue' ? 'text-blue-600 dark:text-blue-300' :
                                    category.color === 'green' ? 'text-green-600 dark:text-green-300' :
                                        category.color === 'purple' ? 'text-purple-600 dark:text-purple-300' :
                                            category.color === 'red' ? 'text-red-600 dark:text-red-300' :
                                                'text-indigo-600 dark:text-indigo-300'}`}>
                                    {category.icon}
                                </div>
                                <h2 className="text-xl font-bold">{category.title}</h2>
                                <span className="px-2 py-1 bg-white bg-opacity-70 rounded-full text-xs font-medium">
                                    {category.shortcuts.length}개
                                </span>
                            </div>
                            {openSections[category.id] ? (
                                <ChevronDown className="text-current" />
                            ) : (
                                <ChevronRight className="text-current" />
                            )}
                        </button>

                        {openSections[category.id] && (
                            <div className="px-6 py-4">
                                <div className="space-y-3">
                                    {category.shortcuts.map((shortcut, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono font-semibold">
                                                        {shortcut.key}
                                                    </kbd>
                                                    {getImportanceBadge(shortcut.importance)}
                                                </div>
                                                <p className="text-gray-700 dark:text-gray-300 ml-0">{shortcut.description}</p>
                                                <div className="flex gap-1 mt-2">
                                                    {shortcut.tags.map(tag => (
                                                        <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-xs text-gray-600 dark:text-gray-400">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(shortcut.key)}
                                                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded ml-4"
                                                title="클립보드에 복사"
                                            >
                                                {copiedKey === shortcut.key ? (
                                                    <Check className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <Copy className="w-4 h-4 text-gray-500" />
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Tips Section */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        단축키 마스터하는 팁
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded p-4">
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">플러그인 활용</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Key Promoter X 플러그인으로 자동 단축키 추천 받기</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded p-4">
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">생산성 측정</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Productivity Guide로 가장 많이 쓰는 기능 통계 확인</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded p-4">
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">개인화</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">자주 쓰는 단축키는 keymap 설정으로 커스터마이징</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        "효율적인 개발은 도구의 숙련도에서 시작됩니다"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        IntelliJ IDEA Ultimate 2024.3 기준 | MyBatis, Spring, JSP 환경 최적화
                    </p>
                    <div className="flex justify-center gap-4 mt-3">
                        <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            치트시트 다운로드
                        </button>
                        <span className="text-xs text-gray-400">|</span>
                        <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                            <Share2 className="w-3 h-3" />
                            공유하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IntelliJShortcutsGuide;