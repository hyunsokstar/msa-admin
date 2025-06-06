// components/DgsJpaJooqPilotIntro.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DgsJpaJooqPilotIntro = () => {
    return (
        <section id="dgs-jpa-jooq-pilot-intro" className="mb-12">
            <Card className="bg-gradient-to-br from-slate-100 to-white shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-blue-800">
                        DGS + JPA + jOOQ CQRS 구조 파일럿 프로젝트
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-gray-700">
                    <p>
                        이 프로젝트는{' '}
                        <a
                            href="https://github.com/hyunsokstar/dgs-jpa-jooq-pilot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline font-medium"
                        >
                            GitHub 저장소
                        </a>{' '}
                        를 통해 확인할 수 있으며, 다음 기술 스택을 조합하여 구현된 CQRS 기반 GraphQL 백엔드 구조입니다.
                    </p>

                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>DGS</strong> - Netflix의 GraphQL 서버 프레임워크</li>
                        <li><strong>JPA</strong> - 등록/수정/삭제를 담당 (command)</li>
                        <li><strong>jOOQ</strong> - 복잡한 조회 쿼리를 SQL 스타일로 구현 (query)</li>
                        <li><strong>CQRS</strong> - 명확한 역할 분리를 통해 유지보수성과 테스트 용이성 확보</li>
                    </ul>

                    <p>
                        특히 복잡한 조회 요구사항이 많은 SI 환경에서 jOOQ는 높은 가독성과 성능 최적화의 이점을 제공합니다.
                        본 프로젝트는 초기 뼈대 구성을 완료한 상태이며, 이제 비즈니스 로직을 얹는 단계만 남아 있습니다.
                    </p>

                    <Button asChild className="mt-4">
                        <a
                            href="https://github.com/hyunsokstar/dgs-jpa-jooq-pilot"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="mr-2 h-4 w-4" /> GitHub에서 보기
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
};

export default DgsJpaJooqPilotIntro;
