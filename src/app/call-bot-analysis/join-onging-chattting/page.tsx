import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Code2, Activity, MessageSquare, PlugZap, Rocket, FileText, ArrowRight, GitPullRequest } from 'lucide-react'
import Link from 'next/link'

/**
 * 상담사 채팅 중간 참여 가이드
 * - 고객-챗봇 대화 중에 상담사가 중간에 들어가는 방법
 */
export default function Page() {
    return (
        <div className="relative min-h-screen px-6 py-10 bg-gradient-to-br from-slate-50 via-indigo-50/60 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950">
            {/* subtle grid + radial fade pattern */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(circle_at_center,black,transparent_85%)] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:34px_34px]" />
            {/* accent radial glows */}
            <div aria-hidden className="absolute -z-10 top-0 left-1/2 h-[420px] w-[720px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_70%)]" />
            <div aria-hidden className="absolute -z-10 bottom-10 right-0 h-72 w-72 translate-x-1/3 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.18),transparent_70%)]" />
            <div className="max-w-5xl mx-auto space-y-10">
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">상담사 채팅 중간 참여 가이드</h1>
                    <p className="text-muted-foreground">고객이 챗봇과 대화 중일 때 상담사가 중간에 들어가서 직접 응답하는 방법</p>
                </header>

                <Alert className="border-border bg-muted/40">
                    <Activity className="h-4 w-4" />
                    <AlertDescription>
                        <strong>핵심:</strong> 웹소켓은 "데이터가 바뀌었다"는 알림만 보내고, 실제 목록은 서버에서 다시 가져옵니다.
                    </AlertDescription>
                </Alert>
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">상담 채팅 중간 참여(개입) 프로세스 사전 조사</h1>
                    <p className="text-muted-foreground">콜봇 자동응답 진행 중인 채널에 상담사가 실시간 합류(Step-In)하여 대화를 승계 / 지원하는 전체 흐름</p>
                </header>

                <Alert className="border-border bg-muted/40">
                    <Activity className="h-4 w-4" />
                    <AlertDescription>
                        <strong>SockJS</strong> 는 <em>데이터 전송</em>이 아니라 <strong>갱신 트리거(on 신호)</strong> 용도로만 사용됩니다. 목록/카운트 데이터는 항상 별도 AJAX 재호출로 수집됩니다.
                    </AlertDescription>
                </Alert>

                {/* 전체 단계 개요 */}
                <Card className="relative overflow-hidden border border-slate-300/70 dark:border-slate-700/70 bg-gradient-to-br from-white/90 via-white/70 to-slate-50/70 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-950/60 backdrop-blur-sm shadow-sm">
                    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.25] bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(circle_at_85%_60%,rgba(14,165,233,0.30),transparent_65%)]" />
                    <CardHeader className="pb-4 relative z-10">
                        <CardTitle className="flex items-center gap-2 text-lg"><GitPullRequest className="h-5 w-5" />전체 단계 개요</CardTitle>
                        <div className="mt-1 h-px bg-gradient-to-r from-indigo-400/60 via-transparent to-cyan-400/60" />
                    </CardHeader>
                    <CardContent className="relative z-10 grid gap-5 md:grid-cols-4">
                        {(() => {
                            const steps = [
                                { no: '0', label: '연결 준비', desc: '시스템에 연결하고 메시지 받을 준비하기' },
                                { no: '1', label: '목록 가져오기', desc: '현재 진행 중인 채팅 목록과 개수 확인하기' },
                                { no: '2', label: '실시간 업데이트', desc: '변경사항이 있으면 목록 새로고침하기' },
                                { no: '3', label: '채팅 참여', desc: '상담상태를 클릭해서 채팅창 열기' },
                            ];
                            const numColors = [
                                'bg-indigo-600/70 dark:bg-indigo-400/60',
                                'bg-amber-600/70 dark:bg-amber-400/60',
                                'bg-cyan-600/70 dark:bg-cyan-400/60',
                                'bg-rose-600/70 dark:bg-rose-400/60'
                            ];
                            return steps.map((s, i) => (
                                <div
                                    key={s.no}
                                    className="relative group rounded-lg border border-slate-300/60 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-900/55 px-4 py-4 shadow-sm transition-colors duration-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 hover:border-slate-400/70 dark:hover:border-slate-600/70"
                                >
                                    <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] rounded-r bg-gradient-to-b from-slate-300/70 to-slate-200/70 dark:from-slate-700 dark:to-slate-600 group-hover:from-slate-400/80 group-hover:to-slate-300/70 transition-colors" />
                                    <div className="relative space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-6 w-6 shrink-0 rounded-md ${numColors[i]} text-[10px] font-medium grid place-items-center text-white dark:text-slate-900/90 ring-1 ring-white/40 dark:ring-slate-800/60`}>{s.no}</div>
                                            <p className="font-semibold text-sm leading-tight tracking-tight text-slate-800 dark:text-slate-200">
                                                {s.label}
                                            </p>
                                        </div>
                                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {s.desc}
                                        </p>
                                    </div>
                                </div>
                            ));
                        })()}
                    </CardContent>
                </Card>

                {/* Step 1: 목록 + 카운트 초기 조회 (getSocketData 내부 getSystemChannels) */}
                <Card id="step-1" className="group relative overflow-hidden border border-border bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm hover:shadow-md transition">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-indigo-400/80 group-hover:bg-indigo-500" />
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg"><Code2 className="h-5 w-5" />Step 1. 채팅 목록 가져오기</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm leading-relaxed">
                        <p>화면을 처음 열거나 새로고침할 때 <code>getSocketData()</code> 함수가 실행됩니다. 이 함수는 현재 진행 중인 채팅 목록을 서버에서 가져와서 화면에 표시합니다.</p>
                        <pre className="bg-slate-950 text-slate-100 text-xs p-4 rounded-lg overflow-x-auto">
                            {`function getSocketData(){
                getSystemChannels(); // 카운트 선 조회 (전체/사용/대기)
                const mapparam = { cmb_branch_code: $('#cmb_branch_code').val() };
                $('#channelTable > thead, #channelTable > tbody, #channelTable').empty();
                channelTable = $('#channelTable').DataTable({
                    destroy:true, ordering:false, paginate:false, searching:false,
                    ajax:{
                        url:'/admin/getSocketData_channel', type:'POST', dataType:'json', data: mapparam,
                        beforeSend:(xhr)=>xhr.setRequestHeader(header, token)
                    },
                    columns: columns_type,
                    columnDefs:[
                        { targets:0, orderable:false, className:'text-center', render:(d,t,r,meta)=> meta.row + 1 },
                        { targets:['_all'], className:'text-center'}
                    ],
                    drawCallback:(settings)=> getSystemChannels(settings.aoData.length)
                });
            }`}</pre>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                            <li>목록 데이터: <code>/admin/getSocketData_channel</code></li>
                            <li>카운트 데이터: <code>getSystemChannels()</code> 함수</li>
                            <li>언제 실행: 페이지 로드, 지점 변경, 새로고침</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Step 2: WebSocket trigger */}
                <Card id="step-2" className="group relative overflow-hidden border border-border bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm hover:shadow-md transition">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-amber-400/80 group-hover:bg-amber-500" />
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg"><PlugZap className="h-5 w-5" />Step 2. 실시간 업데이트 받기</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm leading-relaxed">
                        <p>서버에서 "목록이 바뀌었어요"라는 신호를 보내면, 목록을 다시 가져와서 화면을 업데이트합니다.</p>
                        <pre className="bg-slate-950 text-slate-100 text-xs p-4 rounded-lg overflow-x-auto">
                            {`sockJs.onopen = onOpen;      // 연결 직후 서버에 최초 on 신호
sockJs.onmessage = onMessage;  // 'on' 메시지 수신 시 재조회
sockJs.onclose = onClose;

function onOpen(){ sockJs.send('on'); }
function onClose(){ sockJs.send('close'); }
function onMessage(msg){
    if(msg.data && msg.data.includes('on')){
        getSocketData(); // 실제 데이터 재수집 (AJAX)
    }
}`}</pre>
                        <div className="rounded-md border bg-muted/40 p-3 text-xs space-y-1">
                            <p className="font-medium">간단히 말하면</p>
                            <ul className="list-disc pl-5 space-y-0.5 text-muted-foreground">
                                <li>웹소켓: "업데이트 있어요!" 알림만</li>
                                <li>실제 데이터: 별도로 다시 가져오기</li>
                                <li>장점: 빠르고 안정적</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* Step 3: 채팅 개입 팝업 */}
                <Card id="step-3" className="group relative overflow-hidden border border-border bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm hover:shadow-md transition">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-rose-400/80 group-hover:bg-rose-500" />
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg"><Rocket className="h-5 w-5" />Step 3. 채팅창 열어서 참여하기</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm leading-relaxed">
                        <p>목록에서 "상담상태" 컬럼을 클릭하면 새 창이 열리고, 그 고객과 직접 채팅할 수 있습니다. 창을 닫으면 자동으로 참여 종료됩니다.</p>
                        <pre className="bg-slate-950 text-slate-100 text-xs p-4 rounded-lg overflow-x-auto">
                            {`$(document).on('click', '#channelTable tbody tr td:nth-child(8)', function(){
    const rowData = channelTable.row($(this).closest('tr')).data();
    const uuid = rowData.uuid;
    const win = window.open('/admin/vscmomc_chat?uuid=' + uuid + '&ani=' + rowData.ani,
        'chatWindow_' + uuid,
        'top=0,left=0,width=500,height=600,toolbar=0,location=0,menubar=0,status=0');
    win.resizeTo(500,600);
    win.onresize = () => win.resizeTo(500,600);
    win.addEventListener('beforeunload', ()=> {
        $.ajax({
            method:'POST', url:'/admin/stepInOut',
            data: JSON.stringify({ conn_id: uuid, stepInYn:'N' }),
            contentType:'application/json', dataType:'json',
            beforeSend:(xhr)=>xhr.setRequestHeader(header, token)
        });
    });
});`}</pre>
                        <div className="rounded-md border bg-muted/40 p-3 text-xs space-y-1">
                            <p className="font-medium">주의사항</p>
                            <ul className="list-disc pl-5 space-y-0.5 text-muted-foreground">
                                <li>다른 상담사가 이미 참여 중이면 막힐 수 있음</li>
                                <li>팝업 차단 설정 해제 필요</li>
                                <li>오래 방치하면 자동 종료될 수 있음</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                {/* 참고 자료 */}
                <Card id="legacy" className="group relative overflow-hidden border border-border bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm shadow-sm hover:shadow-md transition">
                    <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-slate-400/70 group-hover:bg-slate-500" />
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg"><FileText className="h-5 w-5" />기존 코드 참고</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <p className="text-muted-foreground">예전에 JSP로 만든 코드를 텍스트 파일로 저장해뒀습니다. 새로 만들 때 참고하세요.</p>
                        <Link className="text-primary text-sm inline-flex items-center gap-1 hover:underline" href="/samples/chat-mid-join/legacy.jsp.txt" target="_blank" rel="noreferrer">legacy.jsp.txt 열기<ArrowRight className="h-3 w-3" /></Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
