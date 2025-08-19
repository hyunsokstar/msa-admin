import React from 'react'

export default function Page(): JSX.Element {
    const frontendLibs = [
        'Next.js', 'React', 'Vite', 'Tauri', 'TanStack Query', 'Zustand', 'Shadcn/ui',
        'Tailwind', 'Radix UI', 'React Query Devtools', 'SWR', 'React Hook Form', 'Mantine',
        'Framer Motion', 'Headless UI', 'Heroicons', 'clsx', 'date-fns', 'Axios', 'QueryString'
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-5xl">
                <h1 className="text-2xl font-semibold mb-4">Current Dev Study — 핵심 요약</h1>
                <p className="text-sm text-gray-600 mb-6">간략한 공부/검토 목록 (필요하면 항목별 샘플 코드로 확장 가능)</p>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">Topic</th>
                                <th className="p-3 text-left">One-line summary</th>
                                <th className="p-3 text-left">Key items / Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t">
                                <td className="p-3 align-top font-medium">VoIP (한국 콜센터 베스트 2)</td>
                                <td className="p-3 align-top">
                                    Asterisk or FreeSWITCH 기반 스택 — 선택은 규모와 확장성 기준.
                                </td>
                                <td className="p-3">
                                    1) Asterisk + FreePBX + VICIdial — 대중성/중소~중대형.<br />
                                    2) FreeSWITCH + FusionPBX + Kamailio — 고성능/수천~수만 동시콜.
                                </td>
                            </tr>

                            <tr className="border-t">
                                <td className="p-3 align-top font-medium">Spring 생태계</td>
                                <td className="p-3 align-top">엔터프라이즈 기준 핵심 라이브러리 모음.</td>
                                <td className="p-3">
                                    Spring Boot, Spring Security, Spring WebFlux, Spring AI, Spring 기본, Java 21 문법.
                                </td>
                            </tr>

                            <tr className="border-t">
                                <td className="p-3 align-top font-medium">NestJS</td>
                                <td className="p-3 align-top">Node.js 서버 아키텍처(모듈화·데코레이터·DI) — 백엔드 옵션.</td>
                                <td className="p-3">REST/GraphQL 지원, 마이크로서비스, Fastify 호환, TypeScript 우선.</td>
                            </tr>

                            <tr className="border-t">
                                <td className="p-3 align-top font-medium">Frontend — Next.js / Vite / Tauri ecosystem</td>
                                <td className="p-3 align-top">프론트/데스크탑 하이브리드 스택 + 생산성 라이브러리 20선.</td>
                                <td className="p-3">
                                    {frontendLibs.join(', ')}
                                </td>
                            </tr>

                            <tr className="border-t">
                                <td className="p-3 align-top font-medium">DevOps 필수 스펙</td>
                                <td className="p-3 align-top">배포·관측·보안·인프라 자동화의 핵심 요소들.</td>
                                <td className="p-3">
                                    CI/CD (GitHub Actions/GitLab), IaC (Terraform), 컨테이너 오케스트레이션 (K8s),<br />
                                    모니터링/로깅 (Prometheus/Grafana, ELK), 보안/시크릿 관리 (Vault/SealedSecrets).
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                    핵심만 간략히 정리했습니다 — 원하는 항목 골라 상세 가이드/예시 코드 생성해 드립니다.
                </div>
            </div>
        </div>
    )
}