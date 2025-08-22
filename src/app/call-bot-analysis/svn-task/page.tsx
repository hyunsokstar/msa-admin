import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Code2, GitBranch, Download, Upload, History, RefreshCw, Undo2, FileText, Lightbulb, ExternalLink } from 'lucide-react'

/**
 * Eclipse SVN 사용법 가이드
 * - Git 명령어와 SVN 메뉴 매핑
 * - Eclipse에서 SVN 핵심 사용법
 */
export default function SvnTaskPage() {
    const gitSvnMappings = [
        {
            git: 'git add .',
            svn: '자동 처리됨',
            desc: 'SVN은 Git처럼 add 별도로 안 해도, 파일 추가/수정/삭제 시 상태창에 자동 표시됨. (단, 새 파일은 Add to Version Control 필요)',
            icon: <Upload className="h-4 w-4" />
        },
        {
            git: 'git commit -m "msg"',
            svn: 'Team → Commit...',
            desc: '로컬 변경분을 SVN 서버에 커밋. 커밋 메시지도 입력 가능.',
            icon: <FileText className="h-4 w-4" />
        },
        {
            git: 'git push',
            svn: 'Commit 하면 바로 서버 반영',
            desc: 'SVN은 Git처럼 로컬/원격 따로 안 나눔. Commit = 곧 서버 반영됨. (즉 push 단계 없음)',
            icon: <Upload className="h-4 w-4" />
        },
        {
            git: 'git pull',
            svn: 'Team → Update to HEAD',
            desc: '서버 최신 리비전 받아오기.',
            icon: <Download className="h-4 w-4" />
        },
        {
            git: 'git log',
            svn: 'Team → Show History',
            desc: '커밋 이력 보기.',
            icon: <History className="h-4 w-4" />
        },
        {
            git: 'git checkout -- file',
            svn: 'Team → Revert...',
            desc: '로컬 변경사항 취소.',
            icon: <Undo2 className="h-4 w-4" />
        },
        {
            git: 'git branch',
            svn: 'Team → Branch/Tag...',
            desc: '브랜치/태그 생성.',
            icon: <GitBranch className="h-4 w-4" />
        },
        {
            git: 'git checkout branch',
            svn: 'Team → Switch to another Branch/Tag/Revision...',
            desc: '특정 브랜치나 리비전으로 전환.',
            icon: <RefreshCw className="h-4 w-4" />
        }
    ];

    return (
        <div className="relative min-h-screen px-6 py-10 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950">
            {/* Background Pattern */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,black,transparent_85%)] bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
            {/* Accent Glows */}
            <div aria-hidden className="absolute -z-10 top-0 left-1/3 h-[300px] w-[600px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
            <div aria-hidden className="absolute -z-10 bottom-20 right-10 h-60 w-60 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_70%)]" />
            
            <div className="max-w-6xl mx-auto space-y-10">
                <header className="space-y-3">
                    <h1 className="text-3xl font-bold tracking-tight">Eclipse SVN 사용법 가이드</h1>
                    <p className="text-muted-foreground">Git 명령어와 SVN 메뉴 비교 및 Eclipse에서 SVN 핵심 사용법</p>
                </header>

                <Alert className="border-blue-200/70 bg-blue-50/60 dark:border-blue-800/50 dark:bg-blue-950/30">
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                        <strong>핵심 차이점:</strong> SVN은 Git과 달리 로컬/원격 저장소 구분이 없습니다. Commit하면 바로 서버에 반영됩니다.
                    </AlertDescription>
                </Alert>

                {/* Git vs SVN 매핑 테이블 */}
                <Card className="relative overflow-hidden border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Code2 className="h-5 w-5" />
                            Git 명령어 ↔ SVN 메뉴 매핑
                        </CardTitle>
                        <div className="mt-1 h-px bg-gradient-to-r from-blue-400/60 via-transparent to-purple-400/50" />
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-slate-200/70 dark:border-slate-700/70">
                                        <TableHead className="w-[180px] font-semibold">Git 명령어</TableHead>
                                        <TableHead className="w-[220px] font-semibold">SVN 메뉴</TableHead>
                                        <TableHead className="font-semibold">설명</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {gitSvnMappings.map((mapping, index) => (
                                        <TableRow key={index} className="border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                                            <TableCell className="font-mono text-sm bg-slate-100/70 dark:bg-slate-800/50 rounded-md">
                                                <div className="flex items-center gap-2">
                                                    {mapping.icon}
                                                    <code className="text-xs">{mapping.git}</code>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium text-blue-700 dark:text-blue-300">
                                                {mapping.svn}
                                            </TableCell>
                                            <TableCell className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                {mapping.desc}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* SVN 핵심 사용법 */}
                <Card className="relative overflow-hidden border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-green-400/70" />
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <GitBranch className="h-5 w-5" />
                            SVN 핵심 사용법 (Eclipse 기준)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-3">
                                <h3 className="font-semibold text-base flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">기본</Badge>
                                    일상 작업 흐름
                                </h3>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li><strong>Update:</strong> 작업 시작 전 Team → Update to HEAD</li>
                                    <li><strong>편집:</strong> 파일 수정/추가/삭제</li>
                                    <li><strong>확인:</strong> Package Explorer에서 변경된 파일 상태 확인</li>
                                    <li><strong>Commit:</strong> Team → Commit... → 메시지 입력 후 확정</li>
                                </ol>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-semibold text-base flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs">고급</Badge>
                                    충돌 해결
                                </h3>
                                <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li><strong>Update 시 충돌:</strong> 충돌 파일에 빨간 표시</li>
                                    <li><strong>Merge Tool:</strong> 더블클릭으로 병합 도구 실행</li>
                                    <li><strong>수동 편집:</strong> 또는 직접 파일 열어서 수정</li>
                                    <li><strong>Mark Resolved:</strong> Team → Mark Resolved 후 Commit</li>
                                </ol>
                            </div>
                        </div>

                        <div className="border-t border-slate-200/60 dark:border-slate-700/60 pt-4">
                            <h3 className="font-semibold text-base mb-3">자주 사용하는 Eclipse SVN 메뉴</h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-lg p-3 space-y-2">
                                    <h4 className="font-medium text-sm">Team 메뉴</h4>
                                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                                        <li>• Commit...</li>
                                        <li>• Update to HEAD</li>
                                        <li>• Show History</li>
                                        <li>• Revert...</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-lg p-3 space-y-2">
                                    <h4 className="font-medium text-sm">상태 확인</h4>
                                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                                        <li>• 📄 수정됨 (노란 표시)</li>
                                        <li>• ➕ 추가됨 (파란 표시)</li>
                                        <li>• ❌ 삭제됨 (회색 표시)</li>
                                        <li>• ⚠️ 충돌 (빨간 표시)</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-50/70 dark:bg-slate-800/40 rounded-lg p-3 space-y-2">
                                    <h4 className="font-medium text-sm">브랜치 작업</h4>
                                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                                        <li>• Branch/Tag...</li>
                                        <li>• Switch to...</li>
                                        <li>• Merge...</li>
                                        <li>• Compare with...</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 참고 자료 */}
                <Card className="relative overflow-hidden border border-slate-300/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-purple-400/70" />
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <FileText className="h-5 w-5" />
                            참고 자료 및 추가 정보
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-3">
                                <h3 className="font-semibold text-base">Eclipse SVN 플러그인</h3>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li className="flex items-center gap-2">
                                        <ExternalLink className="h-3 w-3" />
                                        <span><strong>Subversive:</strong> Eclipse 공식 SVN 플러그인</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ExternalLink className="h-3 w-3" />
                                        <span><strong>Subclipse:</strong> 서드파티 인기 플러그인</span>
                                    </li>
                                    <li className="text-xs text-slate-500 dark:text-slate-500 pl-5">
                                        Help → Eclipse Marketplace에서 설치 가능
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-semibold text-base">유용한 팁</h3>
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                    <li>• <strong>Perspective:</strong> SVN Repository Exploring 사용</li>
                                    <li>• <strong>Ignore:</strong> .svnignore 파일로 제외 설정</li>
                                    <li>• <strong>Lock:</strong> 바이너리 파일은 Lock 후 수정</li>
                                    <li>• <strong>Properties:</strong> svn:keywords로 자동 치환</li>
                                </ul>
                            </div>
                        </div>

                        <Alert className="border-amber-200/70 bg-amber-50/60 dark:border-amber-800/50 dark:bg-amber-950/30">
                            <Lightbulb className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                                <strong>Pro Tip:</strong> Eclipse에서 SVN 작업 시 항상 Update → 편집 → Commit 순서를 지키세요. 
                                충돌을 최소화하고 팀 협업이 원활해집니다.
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
