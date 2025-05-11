// C:\Users\terec\msa-admin\src\app\api\test-targets-archive\route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { TestTarget } from '@/types/typeForTestTarget';

type ApiResponse<T> = {
    data?: T;
    error?: string;
    success?: boolean;
}

// 에러 객체 타입 정의
type ArchiveError = {
    targetId: string | number;
    operation: string;
    message: string;
}

// 아카이브 목록 조회
export async function GET(): Promise<NextResponse<ApiResponse<TestTarget[]>>> {
    try {
        const supabase = getSupabaseService();

        // 아카이브된 테스트 대상 정보 가져오기
        const { data: archivedTargets, error } = await supabase
            .from('test_targets_archive')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // 각 아카이브된 테스트 대상의 아이템 개수 가져오기
        const targetsWithCounts = await Promise.all(
            archivedTargets.map(async (target: TestTarget) => {
                try {
                    const { count, error: countError } = await supabase
                        .from('test_items_archive')  // 아카이브된 테스트 항목 테이블 사용
                        .select('*', { count: 'exact', head: true })
                        .eq('target_id', target.id);

                    if (countError) {
                        console.error(`Error getting count for target ${target.id}:`, countError);
                        return { ...target, item_count: 0 };
                    }

                    return { ...target, item_count: count || 0 };
                } catch (countError) {
                    console.error(`Error processing target ${target.id}:`, countError);
                    return { ...target, item_count: 0 };
                }
            })
        );

        return NextResponse.json({ data: targetsWithCounts });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// 테스트 대상을 아카이브로 이동 (테스트 항목도 함께 아카이브)
// 테스트 대상을 아카이브로 이동 (테스트 항목과 댓글도 함께 아카이브)
export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse<any>>> {
    try {
        const supabase = getSupabaseService();
        const { targetIds } = await request.json();

        if (!targetIds || !Array.isArray(targetIds) || targetIds.length === 0) {
            return NextResponse.json(
                { error: 'Invalid or missing targetIds' },
                { status: 400 }
            );
        }

        // 트랜잭션 없이 처리 (Supabase에서 트랜잭션이 제한적)
        let successful = true;

        // 타입을 명시적으로, errors 배열의 타입을 ArchiveError[]로 정의
        const results: {
            targets: number;
            items: number;
            comments: number; // 댓글 수 추가
            errors: ArchiveError[];
        } = {
            targets: 0,
            items: 0,
            comments: 0, // 댓글 수 초기화
            errors: []
        };

        // 각 타겟 ID에 대해 처리
        for (const targetId of targetIds) {
            try {
                // 1. 테스트 대상 정보 가져오기
                const { data: sourceTarget, error: fetchTargetError } = await supabase
                    .from('test_targets')
                    .select('*')
                    .eq('id', targetId)
                    .single();

                if (fetchTargetError) {
                    console.error(`대상 ${targetId} 조회 실패:`, fetchTargetError);
                    results.errors.push({
                        targetId,
                        operation: 'fetch_target',
                        message: fetchTargetError.message
                    });
                    successful = false;
                    continue;
                }

                // 2. 해당 타겟의 테스트 항목 가져오기
                const { data: sourceItems, error: fetchItemsError } = await supabase
                    .from('test_items')
                    .select('*')
                    .eq('target_id', targetId);

                if (fetchItemsError) {
                    console.error(`타겟 ${targetId}의 항목 조회 실패:`, fetchItemsError);
                    results.errors.push({
                        targetId,
                        operation: 'fetch_items',
                        message: fetchItemsError.message
                    });
                    // 항목 조회는 실패했지만 타겟은 계속 아카이브
                }

                // 3. 테스트 항목을 아카이브 테이블에 복사 (있는 경우에만)
                if (sourceItems && sourceItems.length > 0) {
                    const { error: insertItemsError } = await supabase
                        .from('test_items_archive')
                        .insert(sourceItems);

                    if (insertItemsError) {
                        console.error(`타겟 ${targetId}의 항목 아카이브 실패:`, insertItemsError);
                        results.errors.push({
                            targetId,
                            operation: 'archive_items',
                            message: insertItemsError.message
                        });
                        successful = false;
                    } else {
                        results.items += sourceItems.length;

                        // 4. 각 테스트 항목의 댓글 수집
                        for (const item of sourceItems) {
                            // 해당 테스트 항목의 댓글 가져오기
                            const { data: sourceComments, error: fetchCommentsError } = await supabase
                                .from('comments_for_test_items')
                                .select('*')
                                .eq('test_item_id', item.id);

                            if (fetchCommentsError) {
                                console.error(`항목 ${item.id}의 댓글 조회 실패:`, fetchCommentsError);
                                results.errors.push({
                                    targetId,
                                    operation: 'fetch_comments',
                                    message: fetchCommentsError.message
                                });
                                continue; // 댓글 조회 실패해도 계속 진행
                            }

                            // 댓글이 있는 경우 아카이브 테이블로 복사
                            if (sourceComments && sourceComments.length > 0) {
                                const { error: insertCommentsError } = await supabase
                                    .from('comments_for_test_items_archive')
                                    .insert(sourceComments);

                                if (insertCommentsError) {
                                    console.error(`항목 ${item.id}의 댓글 아카이브 실패:`, insertCommentsError);
                                    results.errors.push({
                                        targetId,
                                        operation: 'archive_comments',
                                        message: insertCommentsError.message
                                    });
                                } else {
                                    results.comments += sourceComments.length;
                                }
                            }
                        }
                    }
                }

                // 5. 테스트 대상을 아카이브 테이블에 복사
                const { error: insertTargetError } = await supabase
                    .from('test_targets_archive')
                    .insert([sourceTarget]);

                if (insertTargetError) {
                    console.error(`타겟 ${targetId} 아카이브 실패:`, insertTargetError);
                    results.errors.push({
                        targetId,
                        operation: 'archive_target',
                        message: insertTargetError.message
                    });
                    successful = false;
                    continue; // 타겟 아카이브 실패시 원본 삭제하지 않음
                }

                results.targets += 1;

                // 6. 원본 테스트 대상 삭제 (cascade로 test_items 및 comments_for_test_items도 함께 삭제됨)
                const { error: deleteTargetError } = await supabase
                    .from('test_targets')
                    .delete()
                    .eq('id', targetId);

                if (deleteTargetError) {
                    console.error(`타겟 ${targetId} 삭제 실패:`, deleteTargetError);
                    results.errors.push({
                        targetId,
                        operation: 'delete_target',
                        message: deleteTargetError.message
                    });
                    successful = false;
                    // 원본 삭제 실패시도 아카이브는 이미 완료됨
                }
            } catch (targetError: any) {
                console.error(`타겟 ${targetId} 처리 중 예외 발생:`, targetError);
                results.errors.push({
                    targetId,
                    operation: 'process_target',
                    message: targetError.message || '알 수 없는 오류'
                });
                successful = false;
            }
        }

        // 전체 결과 반환
        if (!successful) {
            return NextResponse.json(
                {
                    success: false,
                    data: results,
                    error: '일부 작업이 실패했습니다. 자세한 내용은 로그를 확인하세요.'
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: results
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('아카이브 작업 중 오류 발생:', error);
        return NextResponse.json(
            { error: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}