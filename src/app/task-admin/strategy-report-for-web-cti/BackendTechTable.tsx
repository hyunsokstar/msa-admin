// components/BackendTechTable.tsx
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

const techList = [
    {
        category: '언어',
        tech: 'Java / TypeScript',
        description:
            'Spring 기반 주요 언어, 안정성과 생태계 우수 | 프론트엔드와 백엔드 모두에서 사용되는 강력한 언어입니다. 타입 안정성과 대규모 프로젝트에서의 유지보수성이 장점입니다.',
        alternatives: 'Kotlin, Go',
        link: 'https://dev.java',
        summary: 'Spring 핵심 언어',
        tip: 'Java 버전은 17 이상 권장',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: '프레임워크',
        tech: 'Spring Boot',
        description: 'Java 기반 마이크로서비스 및 REST API 개발 표준 프레임워크',
        alternatives: 'Micronaut, Quarkus',
        link: 'https://spring.io/projects/spring-boot',
        summary: 'Java의 핵심 백엔드 프레임워크',
        tip: 'Spring Initializr로 빠르게 시작 가능',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: 'ORM',
        tech: 'JPA',
        description: 'Java Persistence API. 엔티티-DB 매핑용 표준 ORM',
        alternatives: 'MyBatis, jOOQ',
        link: 'https://spring.io/projects/spring-data-jpa',
        summary: 'Spring과 잘 통합되는 ORM',
        tip: '복잡한 쿼리 작성엔 QueryDSL 병행 권장',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: 'ORM',
        tech: 'QueryDSL',
        description: '타입 안전한 JPQL 작성 지원 도구',
        alternatives: 'jOOQ, MyBatis',
        link: 'https://querydsl.com',
        summary: '정적 쿼리 생성용 DSL',
        tip: 'QClass 자동 생성 환경 구축 필요',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: 'ORM',
        tech: 'jOOQ',
        description: '타입 안전성과 가독성이 우수한 SQL DSL. 복잡한 쿼리 작성에 적합',
        alternatives: 'QueryDSL, MyBatis',
        link: 'https://www.jooq.org/',
        summary: 'SQL 중심 개발에 적합',
        tip: 'MySQL/PostgreSQL은 무료',
        learningCurve: 4,
        importance: 4,
        required: false,
    },
    {
        category: 'ORM',
        tech: 'MyBatis',
        description: 'XML 기반 SQL 매퍼 프레임워크. 복잡한 쿼리에 강점',
        alternatives: 'JPA, jOOQ',
        link: 'https://mybatis.org',
        summary: 'SQL 완전 제어 가능',
        tip: 'SQL 일일이 작성해야 하므로 생산성 저하 주의',
        learningCurve: 3,
        importance: 4,
        required: false,
    },
    {
        category: '데이터베이스',
        tech: 'PostgreSQL',
        description: '신뢰성과 기능이 풍부한 오픈소스 RDBMS. JSON, Full Text 지원',
        alternatives: 'MySQL, MariaDB',
        link: 'https://www.postgresql.org/',
        summary: '엔터프라이즈 급 기능 지원',
        tip: 'CTE, JSON 쿼리 등 고급 기능 활용 가능',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '데이터베이스',
        tech: 'Redis',
        description: '인메모리 기반 고속 캐시/큐/세션 관리용 NoSQL DB',
        alternatives: 'Memcached',
        link: 'https://redis.io/',
        summary: '캐시 및 pub/sub 핵심',
        tip: 'pub/sub 외에도 Sorted Set 활용 가능',
        learningCurve: 2,
        importance: 5,
        required: true,
    },
    {
        category: 'API Gateway',
        tech: 'Nginx',
        description: '고성능 Reverse Proxy 및 API Gateway. 로드밸런싱과 SSL 처리에 강점',
        alternatives: 'Kong, Zuul',
        link: 'https://nginx.org',
        summary: '실전 운영에 최적화',
        tip: '로드밸런싱 + 캐시 서버로 병행 활용',
        learningCurve: 3,
        importance: 5,
        required: true,
    },
    {
        category: '테스트',
        tech: 'Testcontainers',
        description: 'Docker 기반 테스트 컨테이너를 이용해 실제 DB/서비스 환경을 에뮬레이션하며 테스트를 수행할 수 있게 해주는 라이브러리입니다. 주로 통합 테스트, 부하 테스트, CI 환경에서 사용됩니다.',
        alternatives: 'H2, Mockito, Embedded DB',
        link: 'https://www.testcontainers.org/',
        summary: '컨테이너 기반 테스트 자동화',
        tip: 'CI/CD에 통합하면 실제 서비스와 거의 동일한 테스트 환경 구성 가능',
        learningCurve: 3,
        importance: 4,
        required: false,
    }
    // 나머지 20개 기술도 이 형식으로 이어서 추가 예정
];

const BackendTechTable = () => {
    return (
        <div className="w-full overflow-x-auto py-10">
            <table className="min-w-full border border-gray-300 text-sm">
                <thead className="bg-gray-100 text-gray-900">
                    <tr>
                        <th className="border px-4 py-2">분류</th>
                        <th className="border px-4 py-2">기술</th>
                        <th className="border px-4 py-2">설명</th>
                        <th className="border px-4 py-2">대안</th>
                        <th className="border px-4 py-2">공식 문서</th>
                        <th className="border px-4 py-2">요약</th>
                        <th className="border px-4 py-2">팀 내 팁</th>
                        <th className="border px-4 py-2">러닝 커브</th>
                        <th className="border px-4 py-2">중요도</th>
                        <th className="border px-4 py-2">필수 여부</th>
                    </tr>
                </thead>
                <tbody>
                    {techList.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 whitespace-nowrap">{item.category}</td>
                            <td className="border px-4 py-2 font-medium text-gray-800">{item.tech}</td>
                            <td className="border px-4 py-2 text-gray-700">{item.description}</td>
                            <td className="border px-4 py-2 text-gray-600">{item.alternatives}</td>
                            <td className="border px-4 py-2">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    링크
                                </a>
                            </td>
                            <td className="border px-4 py-2 text-gray-700">{item.summary}</td>
                            <td className="border px-4 py-2 text-gray-700">{item.tip}</td>
                            <td className="border px-4 py-2 text-center">{item.learningCurve}</td>
                            <td className="border px-4 py-2 text-center">{item.importance}</td>
                            <td className="border px-4 py-2 text-center">
                                {item.required ? '✅ 필수' : '⚪ 비필수'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BackendTechTable;
