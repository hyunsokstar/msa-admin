'use client';

import React, { useState, useMemo } from 'react';
import {
    Search, X, ChevronDown, ChevronRight, Copy, Check,
    Folder, Code, Database, Bug, Brain, Star, Lightbulb,
    Monitor, Keyboard, Settings, BookOpen, Zap, Target,
    Command, ArrowRight, Filter, Download, Share2, Sparkles,
    Cpu, GitBranch, Package, Layers, Activity, Gauge,
    Workflow, FileText, Eye, Maximize, Timer, Shield,
    Puzzle, Wrench, Users, TrendingUp, CheckCircle,
    AlertCircle, Info, PlayCircle, PauseCircle
} from 'lucide-react';

interface Shortcut {
    key: string;
    description: string;
    category: string;
    importance: 'high' | 'medium' | 'low';
    tags: string[];
}

interface Tip {
    title: string;
    description: string;
    category: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    impact: 'high' | 'medium' | 'low';
    steps?: string[];
}

interface ShortcutCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    shortcuts: Shortcut[];
}

interface TipCategory {
    id: string;
    title: string;
    icon: React.ReactNode;
    color: string;
    tips: Tip[];
}

const IntelliJMasterGuide = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [activeTab, setActiveTab] = useState('shortcuts'); // shortcuts, tips, plugins
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        file: true,
        code: false,
        mybatis: false,
        debug: false,
        ai: false,
        productivity: false,
        advanced: false,
        workflow: false,
        plugins: false
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
                },
                {
                    key: 'Ctrl + Tab',
                    description: '최근 파일 간 빠른 전환',
                    category: 'file',
                    importance: 'high',
                    tags: ['navigation', 'switch', 'recent']
                },
                {
                    key: 'Ctrl + F12',
                    description: '현재 파일의 구조 팝업 (메서드, 필드 등)',
                    category: 'file',
                    importance: 'medium',
                    tags: ['structure', 'popup', 'methods']
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
                },
                {
                    key: 'Ctrl + Space',
                    description: '기본 자동완성',
                    category: 'code',
                    importance: 'high',
                    tags: ['autocomplete', 'basic']
                },
                {
                    key: 'Ctrl + Shift + Space',
                    description: '스마트 자동완성 (타입 기반)',
                    category: 'code',
                    importance: 'high',
                    tags: ['autocomplete', 'smart', 'type']
                },
                {
                    key: 'Ctrl + J',
                    description: '라이브 템플릿 삽입',
                    category: 'code',
                    importance: 'medium',
                    tags: ['template', 'live', 'snippet']
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
                },
                {
                    key: 'Shift + F8',
                    description: '함수에서 나가기 (Step Out)',
                    category: 'debug',
                    importance: 'medium',
                    tags: ['debug', 'step', 'out']
                },
                {
                    key: 'F9',
                    description: '다음 브레이크포인트까지 실행',
                    category: 'debug',
                    importance: 'high',
                    tags: ['debug', 'resume', 'breakpoint']
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

    const tipCategories: TipCategory[] = [
        {
            id: 'productivity',
            title: '생산성 극대화 팁',
            icon: <Zap className="w-5 h-5" />,
            color: 'yellow',
            tips: [
                {
                    title: '멀티 커서 마스터하기',
                    description: '동일한 단어를 한 번에 편집하여 생산성 극대화',
                    category: 'productivity',
                    difficulty: 'beginner',
                    impact: 'high',
                    steps: [
                        'Alt + J: 다음 동일한 단어 선택',
                        'Ctrl + Alt + Shift + J: 파일 내 모든 동일한 단어 선택',
                        'Alt + Shift + 마우스클릭: 원하는 위치에 커서 추가',
                        'Shift + Alt + Insert: 컬럼 선택 모드 토글'
                    ]
                },
                {
                    title: '라이브 템플릿 활용',
                    description: '자주 사용하는 코드 패턴을 템플릿으로 만들어 빠른 작성',
                    category: 'productivity',
                    difficulty: 'intermediate',
                    impact: 'high',
                    steps: [
                        'File > Settings > Editor > Live Templates',
                        '새 템플릿 그룹 생성 (예: MyTemplates)',
                        'psvm → public static void main 자동 생성',
                        'sout → System.out.println() 자동 생성',
                        '커스텀 템플릿 생성: 자주 쓰는 try-catch, for문 등'
                    ]
                },
                {
                    title: '코드 완성 설정 최적화',
                    description: '자동완성 기능을 극한까지 활용하는 설정',
                    category: 'productivity',
                    difficulty: 'intermediate',
                    impact: 'medium',
                    steps: [
                        'Settings > Editor > General > Code Completion',
                        'Case sensitive completion: None으로 설정',
                        'Auto insert single suggestions: 체크',
                        'Show suggestions as you type: 체크',
                        'Parameter hints: 모두 활성화'
                    ]
                },
                {
                    title: '빠른 문서화 작성',
                    description: 'JavaDoc과 주석을 효율적으로 작성하는 방법',
                    category: 'productivity',
                    difficulty: 'beginner',
                    impact: 'medium',
                    steps: [
                        '메서드 위에서 /** 입력 후 Enter → 자동 JavaDoc 템플릿',
                        'Ctrl + Shift + A → "Generate" → Documentation Comment',
                        'TODO 주석 활용: // TODO: 설명',
                        'FIXME 주석으로 버그 표시: // FIXME: 문제 설명'
                    ]
                }
            ]
        },
        {
            id: 'advanced',
            title: '고급 기능 활용',
            icon: <Cpu className="w-5 h-5" />,
            color: 'purple',
            tips: [
                {
                    title: '데이터베이스 도구 통합 활용',
                    description: 'IntelliJ 내장 DB 도구로 개발 환경 통합',
                    category: 'advanced',
                    difficulty: 'advanced',
                    impact: 'high',
                    steps: [
                        'View > Tool Windows > Database',
                        'MySQL, PostgreSQL, Oracle 등 연결 설정',
                        'SQL 쿼리 직접 실행 및 결과 확인',
                        'ERD 다이어그램 자동 생성',
                        'MyBatis XML과 실제 DB 스키마 검증'
                    ]
                },
                {
                    title: 'Git 통합 워크플로우',
                    description: 'IntelliJ Git 도구로 버전 관리 마스터',
                    category: 'advanced',
                    difficulty: 'intermediate',
                    impact: 'high',
                    steps: [
                        'Ctrl + K: Git Commit 창 열기',
                        'Ctrl + Shift + K: Git Push',
                        'Alt + 9: Git 툴 윈도우 열기',
                        'Local Changes에서 변경사항 청크별 커밋',
                        'Annotate 기능으로 코드 변경 이력 추적'
                    ]
                },
                {
                    title: '프로파일링과 성능 분석',
                    description: '애플리케이션 성능 병목 지점 찾기',
                    category: 'advanced',
                    difficulty: 'advanced',
                    impact: 'high',
                    steps: [
                        'Run > Profile 모드로 실행',
                        'CPU 사용량 실시간 모니터링',
                        'Memory 사용량 분석',
                        'Hot Spots 찾기',
                        'Call Tree로 메서드 호출 분석'
                    ]
                },
                {
                    title: 'REST Client 내장 도구',
                    description: 'Postman 없이도 API 테스트하기',
                    category: 'advanced',
                    difficulty: 'intermediate',
                    impact: 'medium',
                    steps: [
                        '.http 파일 생성',
                        'GET http://localhost:8080/api/users',
                        'POST 요청에 JSON 데이터 포함',
                        '환경별 변수 설정 (dev, prod)',
                        '응답 결과 자동 저장 및 검증'
                    ]
                }
            ]
        },
        {
            id: 'workflow',
            title: '워크플로우 최적화',
            icon: <Workflow className="w-5 h-5" />,
            color: 'green',
            tips: [
                {
                    title: '멀티 프로젝트 관리',
                    description: '여러 프로젝트를 효율적으로 관리하는 방법',
                    category: 'workflow',
                    difficulty: 'intermediate',
                    impact: 'high',
                    steps: [
                        'File > New > Project from Existing Sources',
                        'Project Structure에서 모듈 추가/제거',
                        'Project 창에서 프로젝트 간 빠른 전환',
                        'Run Configuration을 프로젝트별로 관리',
                        'VCS 설정을 프로젝트별로 분리'
                    ]
                },
                {
                    title: '작업 공간 레이아웃 설정',
                    description: '개발 스타일에 맞는 인터페이스 커스터마이징',
                    category: 'workflow',
                    difficulty: 'beginner',
                    impact: 'medium',
                    steps: [
                        'Window > Store Current Layout as Default',
                        'Tool Windows를 필요에 따라 도킹/언도킹',
                        'Editor 탭을 세로로 분할하여 비교 작업',
                        'Distraction Free Mode 활용',
                        'Full Screen Mode로 몰입도 향상'
                    ]
                },
                {
                    title: '검색과 교체 마스터',
                    description: '프로젝트 전체에서 효율적인 검색과 교체',
                    category: 'workflow',
                    difficulty: 'intermediate',
                    impact: 'high',
                    steps: [
                        'Ctrl + Shift + F: 프로젝트 전체 검색',
                        'Ctrl + Shift + R: 프로젝트 전체 교체',
                        '정규식 활용한 패턴 검색',
                        '파일 유형별 필터링',
                        'Scope 설정으로 검색 범위 제한'
                    ]
                },
                {
                    title: '태스크와 컨텍스트 관리',
                    description: '작업 단위별 컨텍스트를 저장하고 전환',
                    category: 'workflow',
                    difficulty: 'advanced',
                    impact: 'medium',
                    steps: [
                        'Tools > Tasks & Contexts > Open Task',
                        '작업별로 열린 파일과 브레이크포인트 저장',
                        '브랜치와 태스크 연동',
                        'Time Tracking으로 작업 시간 측정',
                        'JIRA, Trello 등 이슈 트래커 연동'
                    ]
                }
            ]
        },
        {
            id: 'plugins',
            title: '필수 플러그인 활용',
            icon: <Puzzle className="w-5 h-5" />,
            color: 'blue',
            tips: [
                {
                    title: 'Key Promoter X',
                    description: '단축키 학습을 자동화하는 필수 플러그인',
                    category: 'plugins',
                    difficulty: 'beginner',
                    impact: 'high',
                    steps: [
                        'Plugins > Marketplace에서 "Key Promoter X" 설치',
                        '마우스로 클릭할 때마다 해당 단축키 알림',
                        '통계 기능으로 가장 많이 사용하는 기능 확인',
                        '학습 진도에 따라 알림 빈도 조절',
                        '단축키 사용 횟수 목표 설정'
                    ]
                },
                {
                    title: 'Rainbow Brackets',
                    description: '괄호를 색상으로 구분하여 가독성 향상',
                    category: 'plugins',
                    difficulty: 'beginner',
                    impact: 'medium',
                    steps: [
                        '"Rainbow Brackets" 플러그인 설치',
                        '중첩된 괄호들이 다른 색상으로 표시',
                        '매칭되는 괄호 쌍 하이라이트',
                        'JSON, XML 등에서 특히 유용',
                        '색상 테마에 맞게 커스터마이징 가능'
                    ]
                },
                {
                    title: 'SonarLint',
                    description: '실시간 코드 품질 검사와 보안 취약점 탐지',
                    category: 'plugins',
                    difficulty: 'intermediate',
                    impact: 'high',
                    steps: [
                        '"SonarLint" 플러그인 설치',
                        '타이핑하는 즉시 코드 품질 이슈 탐지',
                        'Security Hotspots 자동 감지',
                        'SonarQube 서버와 연동 가능',
                        '팀 규칙을 로컬에서 실시간 적용'
                    ]
                },
                {
                    title: 'GitToolBox',
                    description: 'Git 정보를 더욱 상세하게 표시',
                    category: 'plugins',
                    difficulty: 'intermediate',
                    impact: 'medium',
                    steps: [
                        '"GitToolBox" 플러그인 설치',
                        '각 라인별 마지막 커밋 정보 표시',
                        '브랜치별 ahead/behind 카운트',
                        'Auto-fetch 기능으로 원격 변경사항 추적',
                        '커밋 메시지 포맷 자동 검증'
                    ]
                },
                {
                    title: 'String Manipulation',
                    description: '문자열 변환 작업을 한 번에 처리',
                    category: 'plugins',
                    difficulty: 'beginner',
                    impact: 'medium',
                    steps: [
                        '"String Manipulation" 플러그인 설치',
                        'camelCase ↔ snake_case 변환',
                        'Base64 인코딩/디코딩',
                        'URL 인코딩/디코딩',
                        'JSON 포맷팅 및 압축',
                        'Alt + M으로 변환 메뉴 호출'
                    ]
                }
            ]
        }
    ];

    // 검색 및 필터링 로직
    const filteredItems = useMemo(() => {
        if (activeTab === 'shortcuts') {
            const allShortcuts = shortcutCategories.flatMap(cat => cat.shortcuts);
            return allShortcuts.filter(shortcut => {
                const matchesSearch = searchQuery === '' ||
                    shortcut.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    shortcut.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

                const matchesCategory = selectedCategory === 'all' || shortcut.category === selectedCategory;

                return matchesSearch && matchesCategory;
            });
        } else {
            const allTips = tipCategories.flatMap(cat => cat.tips);
            return allTips.filter(tip => {
                const matchesSearch = searchQuery === '' ||
                    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    tip.description.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;

                return matchesSearch && matchesCategory;
            });
        }
    }, [searchQuery, selectedCategory, activeTab]);

    const toggleSection = (sectionId: string) => {
        setOpenSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const toggleAllSections = (open: boolean) => {
        const newState: Record<string, boolean> = {};
        const categories = activeTab === 'shortcuts' ? shortcutCategories : tipCategories;
        categories.forEach(cat => {
            newState[cat.id] = open;
        });
        setOpenSections(newState);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(text);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    const getColorClasses = (color: string) => {
        const colorMap = {
            blue: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-200',
            green: 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 text-green-800 dark:text-green-200',
            purple: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 text-purple-800 dark:text-purple-200',
            red: 'from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 text-red-800 dark:text-red-200',
            indigo: 'from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 text-indigo-800 dark:text-indigo-200',
            yellow: 'from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-200'
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

    const getDifficultyBadge = (difficulty: string) => {
        const badges = {
            beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };
        const labels = { beginner: '초급', intermediate: '중급', advanced: '고급' };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[difficulty as keyof typeof badges]}`}>
                {labels[difficulty as keyof typeof labels]}
            </span>
        );
    };

    const getImpactBadge = (impact: string) => {
        const badges = {
            high: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
        };
        const labels = { high: '고효과', medium: '중효과', low: '저효과' };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[impact as keyof typeof badges]}`}>
                {labels[impact as keyof typeof labels]}
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
                                IntelliJ IDEA 마스터 가이드
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
                            단축키부터 고급 활용법까지 - 개발 생산성 극대화 완전 가이드
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            MyBatis, JSP, AI Assistant, 플러그인 포함 | 초급자부터 전문가까지
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
                            <button
                                onClick={() => setActiveTab('shortcuts')}
                                className={`px-6 py-2 rounded-md flex items-center gap-2 transition-colors ${activeTab === 'shortcuts'
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Keyboard className="w-4 h-4" />
                                단축키 (35개)
                            </button>
                            <button
                                onClick={() => setActiveTab('tips')}
                                className={`px-6 py-2 rounded-md flex items-center gap-2 transition-colors ${activeTab === 'tips'
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Lightbulb className="w-4 h-4" />
                                고급 활용법 (16개)
                            </button>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-6">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={activeTab === 'shortcuts' ? '단축키 또는 기능 검색...' : '팁 제목 또는 설명 검색...'}
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
                                {(activeTab === 'shortcuts' ? shortcutCategories : tipCategories).map(cat => (
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
                        {activeTab === 'shortcuts' ? (
                            <>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">37</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">총 단축키</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">카테고리</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">22</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">필수 단축키</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">90%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">생산성 향상</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">16</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">활용 팁</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">카테고리</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">200%</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">효율성 향상</div>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">필수 플러그인</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Search Results */}
                {searchQuery && (
                    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">
                            검색 결과 ({filteredItems.length}개)
                        </h3>
                        <div className="space-y-2">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex-1">
                                        {activeTab === 'shortcuts' ? (
                                            <div className="flex items-center gap-3">
                                                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm font-mono">
                                                    {(item as Shortcut).key}
                                                </kbd>
                                                <span className="text-gray-700 dark:text-gray-300">{item.description}</span>
                                                {getImportanceBadge((item as Shortcut).importance)}
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{(item as Tip).title}</h4>
                                                    {getDifficultyBadge((item as Tip).difficulty)}
                                                    {getImpactBadge((item as Tip).impact)}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(activeTab === 'shortcuts' ? (item as Shortcut).key : (item as Tip).title)}
                                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                    >
                                        {copiedKey === (activeTab === 'shortcuts' ? (item as Shortcut).key : (item as Tip).title) ? (
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
                {!searchQuery && (activeTab === 'shortcuts' ? shortcutCategories : tipCategories).map(category => (
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
                                                category.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-300' :
                                                    'text-indigo-600 dark:text-indigo-300'}`}>
                                    {category.icon}
                                </div>
                                <h2 className="text-xl font-bold">{category.title}</h2>
                                <span className="px-2 py-1 bg-white bg-opacity-70 rounded-full text-xs font-medium">
                                    {activeTab === 'shortcuts' ? (category as ShortcutCategory).shortcuts.length : (category as TipCategory).tips.length}개
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
                                <div className="space-y-4">
                                    {activeTab === 'shortcuts'
                                        ? (category as ShortcutCategory).shortcuts.map((shortcut, index) => (
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
                                        ))
                                        : (category as TipCategory).tips.map((tip, index) => (
                                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{tip.title}</h4>
                                                        {getDifficultyBadge(tip.difficulty)}
                                                        {getImpactBadge(tip.impact)}
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(tip.title)}
                                                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                                        title="제목 복사"
                                                    >
                                                        {copiedKey === tip.title ? (
                                                            <Check className="w-4 h-4 text-green-600" />
                                                        ) : (
                                                            <Copy className="w-4 h-4 text-gray-500" />
                                                        )}
                                                    </button>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-400 mb-3">{tip.description}</p>
                                                {tip.steps && (
                                                    <div className="bg-white dark:bg-gray-800 rounded p-3">
                                                        <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                                            실행 단계
                                                        </h5>
                                                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                                            {tip.steps.map((step, stepIndex) => (
                                                                <li key={stepIndex}>{step}</li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Additional Tips Section - Only show when not searching and on tips tab */}
                {!searchQuery && activeTab === 'tips' && (
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 rounded-lg p-6 mb-6">
                        <h3 className="font-bold text-orange-800 dark:text-orange-200 mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            마스터 레벨 달성 로드맵
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-gray-800 rounded p-4">
                                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    1단계: 기초 다지기 (1-2주)
                                </h4>
                                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• 필수 단축키 10개 완전 숙달</li>
                                    <li>• Key Promoter X 플러그인 설치</li>
                                    <li>• 라이브 템플릿 기본 활용</li>
                                    <li>• Git 통합 기능 사용</li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded p-4">
                                <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    2단계: 심화 활용 (3-4주)
                                </h4>
                                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• 고급 검색/교체 기능 마스터</li>
                                    <li>• 데이터베이스 도구 연동</li>
                                    <li>• 커스텀 라이브 템플릿 제작</li>
                                    <li>• 디버깅 고급 기능 활용</li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded p-4">
                                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    3단계: 전문가 레벨 (5-8주)
                                </h4>
                                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                                    <li>• AI Assistant 고급 활용</li>
                                    <li>• 프로파일링 및 성능 분석</li>
                                    <li>• 멀티 프로젝트 워크플로우</li>
                                    <li>• 팀 설정 및 코드 스타일 관리</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Reference Card */}
                {activeTab === 'shortcuts' && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900 rounded-lg p-6 mb-6">
                        <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
                            <Star className="w-5 h-5" />
                            하루에 하나씩 외우는 필수 단축키 TOP 10
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-gray-800 rounded p-4">
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">🥇 절대 필수 (매일 사용)</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>파일 검색</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + N</kbd>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>전체 검색</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Double Shift</kbd>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>빠른 수정</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Alt + Enter</kbd>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>코드 정렬</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + Alt + L</kbd>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>이름 변경</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Shift + F6</kbd>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded p-4">
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">🥈 매우 유용 (자주 사용)</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>최근 파일</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + E</kbd>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>한 줄 복사</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + D</kbd>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>정의 이동</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Ctrl + B</kbd>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>실행</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Shift + F10</kbd>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>디버그</span>
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">Shift + F9</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        "효율적인 개발은 도구의 숙련도에서 시작됩니다"
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
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
                        <span className="text-xs text-gray-400">|</span>
                        <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            JetBrains 공식 문서
                        </button>
                    </div>

                    {/* Performance Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-lg font-bold text-green-600 dark:text-green-400">3x</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">코딩 속도 향상</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">80%</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">반복 작업 감소</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">50%</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">디버깅 시간 단축</div>
                            </div>
                            <div>
                                <div className="text-lg font-bold text-red-600 dark:text-red-400">95%</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">개발자 만족도</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pro Tips Alert */}
                <div className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">💡 프로 개발자만 아는 숨겨진 팁</h3>
                            <div className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                                <p><strong>Ctrl + Shift + A:</strong> 모든 액션 검색 - 메뉴를 뒤질 필요 없이 원하는 기능을 바로 찾기</p>
                                <p><strong>Ctrl + Shift + V:</strong> 클립보드 히스토리 - 이전에 복사한 내용들을 다시 붙여넣기</p>
                                <p><strong>Alt + Insert:</strong> 생성자, getter/setter, toString 등 자동 생성</p>
                                <p><strong>Ctrl + Alt + T:</strong> 선택한 코드를 if, try-catch, synchronized 등으로 감싸기</p>
                                <p><strong>F2 / Shift + F2:</strong> 다음/이전 오류로 빠르게 이동</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Keyboard Layout Guide */}
                <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                        <Keyboard className="w-5 h-5" />
                        키보드 레이아웃별 최적화 팁
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">🇰🇷 한국어 키보드 사용자</h4>
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <p>• <strong>Ctrl + Shift + F12:</strong> 모든 툴 윈도우 숨기기 (한/영 전환과 겹치지 않음)</p>
                                <p>• <strong>Alt + ` (백틱):</strong> VCS Operations 팝업 (한글 키보드에서 접근하기 쉬움)</p>
                                <p>• <strong>Keymap 변경:</strong> File → Settings → Keymap에서 "Korean" 선택</p>
                                <p>• <strong>한글 변수명:</strong> Settings → Editor → General → Appearance에서 "Show whitespaces" 활성화</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">⌨️ 맥북 사용자 (Mac Keymap)</h4>
                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <p>• <strong>⌘ + O:</strong> 클래스로 이동 (Ctrl + N과 동일)</p>
                                <p>• <strong>⌘ + Shift + O:</strong> 파일로 이동 (Ctrl + Shift + N과 동일)</p>
                                <p>• <strong>⌘ + E:</strong> 최근 파일 (Ctrl + E와 동일)</p>
                                <p>• <strong>⌘ + ⌥ + L:</strong> 코드 정렬 (Ctrl + Alt + L과 동일)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Troubleshooting Section */}
                <div className="mt-6 bg-red-50 dark:bg-red-900 rounded-lg p-6">
                    <h3 className="font-bold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        자주 발생하는 문제와 해결책
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">🐛 성능 관련 문제</h4>
                            <div className="space-y-3 text-sm">
                                <div className="bg-white dark:bg-gray-800 rounded p-3">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">느린 인덱싱</p>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">File → Invalidate Caches and Restart → Just Restart</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded p-3">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">메모리 부족</p>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">Help → Change Memory Settings에서 힙 메모리 증가 (8GB+ 권장)</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded p-3">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">프로젝트 로딩 지연</p>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">Settings → Build → Compiler에서 "Build project automatically" 비활성화</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-3">🔧 설정 관련 문제</h4>
                            <div className="space-y-3 text-sm">
                                <div className="bg-white dark:bg-gray-800 rounded p-3">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">단축키 충돌</p>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">Settings → Keymap에서 중복 단축키 확인 및 재할당</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded p-3">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">플러그인 충돌</p>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">Safe Mode로 재시작 후 플러그인 하나씩 활성화하여 원인 찾기</p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 rounded p-3">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">JDK 인식 문제</p>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">File → Project Structure → SDKs에서 JDK 경로 재설정</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Version Update Info */}
                <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                    <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        최신 버전 업데이트 정보 (2024.3)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">🆕 새로운 기능</h4>
                            <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                                <li>• AI Assistant 성능 대폭 개선</li>
                                <li>• 새로운 UI 테마 및 아이콘</li>
                                <li>• Git 브랜치 관리 개선</li>
                                <li>• 데이터베이스 도구 업그레이드</li>
                                <li>• Spring Boot 3.2 완전 지원</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">⚡ 성능 개선</h4>
                            <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                                <li>• 인덱싱 속도 30% 향상</li>
                                <li>• 메모리 사용량 20% 감소</li>
                                <li>• 코드 완성 응답 속도 개선</li>
                                <li>• 대용량 프로젝트 로딩 최적화</li>
                                <li>• Gradle 빌드 성능 향상</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Learning Resources */}
                <div className="mt-6 bg-green-50 dark:bg-green-900 rounded-lg p-6">
                    <h3 className="font-bold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        추가 학습 리소스
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">📚 공식 문서</h4>
                            <ul className="space-y-2 text-sm text-green-600 dark:text-green-400">
                                <li>• JetBrains 공식 가이드</li>
                                <li>• IntelliJ IDEA Help</li>
                                <li>• 키맵 레퍼런스</li>
                                <li>• 플러그인 개발 가이드</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">🎥 비디오 강의</h4>
                            <ul className="space-y-2 text-sm text-green-600 dark:text-green-400">
                                <li>• JetBrains YouTube 채널</li>
                                <li>• IntelliJ IDEA Tips 시리즈</li>
                                <li>• 개발자 컨퍼런스 세션</li>
                                <li>• 실무 활용 워크샵</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-3">🌐 커뮤니티</h4>
                            <ul className="space-y-2 text-sm text-green-600 dark:text-green-400">
                                <li>• JetBrains 공식 포럼</li>
                                <li>• Stack Overflow</li>
                                <li>• Reddit r/IntelliJ</li>
                                <li>• 한국 개발자 커뮤니티</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white text-center">
                    <h3 className="text-xl font-bold mb-2">🚀 지금 바로 시작하세요!</h3>
                    <p className="mb-4 opacity-90">
                        이 가이드를 북마크하고, 매일 하나씩 새로운 단축키를 익혀보세요.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            7일 챌린지 시작
                        </button>
                        <button className="bg-indigo-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-300 transition-colors flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            커뮤니티 참여
                        </button>
                    </div>
                    <p className="mt-4 text-sm opacity-75">
                        "마스터가 되는 것은 하루아침에 이루어지지 않습니다. 하지만 시작은 지금 할 수 있습니다."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default IntelliJMasterGuide;