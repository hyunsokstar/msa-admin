// C:\Users\terec\msa-admin\src\app\api\test-targets-archive\[id]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase/serverClient';
import { TestTarget } from '@/types/typeForTestTarget';

type ApiResponse<T> = {
    data?: T;
    error?: string;
    success?: boolean;
}

export const dynamic = 'force-dynamic';

// 특정 아카이브 항목 조회
export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const supabase = getSupabaseService();
        const params = await context.params;
        const id = params.id;

        const { data, error } = await supabase
            .from('test_targets_archive')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching archived target:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// 아카이브에서 테스트 대상 영구 삭제
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const supabase = getSupabaseService();
        const params = await context.params;
        const id = params.id;

        // 관련된 테스트 항목들도 함께 삭제
        const { error: itemsDeleteError } = await supabase
            .from('test_items_archive')
            .delete()
            .eq('target_id', id);

        if (itemsDeleteError) {
            console.error('Error deleting archived test items:', itemsDeleteError);
            return NextResponse.json(
                { error: itemsDeleteError.message, success: false },
                { status: 500 }
            );
        }

        // 테스트 대상 삭제
        const { error } = await supabase
            .from('test_targets_archive')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting archived target:', error);
            return NextResponse.json(
                { error: error.message, success: false },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}

// 아카이브에서 테스트 대상 복원
export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const supabase = getSupabaseService();
        const params = await context.params;
        const id = params.id;

        // 1. 아카이브에서 테스트 대상 가져오기
        const { data: archivedTarget, error: fetchTargetError } = await supabase
            .from('test_targets_archive')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchTargetError) {
            console.error('Error fetching archived target:', fetchTargetError);
            return NextResponse.json(
                { error: fetchTargetError.message, success: false },
                { status: 500 }
            );
        }

        // 2. 아카이브에서 관련 테스트 항목들 가져오기
        const { data: archivedItems, error: fetchItemsError } = await supabase
            .from('test_items_archive')
            .select('*')
            .eq('target_id', id);

        if (fetchItemsError) {
            console.error('Error fetching archived test items:', fetchItemsError);
            return NextResponse.json(
                { error: fetchItemsError.message, success: false },
                { status: 500 }
            );
        }

        // 3. 원본 테이블에 테스트 대상 복원
        const { error: insertTargetError } = await supabase
            .from('test_targets')
            .insert([archivedTarget]);

        if (insertTargetError) {
            console.error('Error restoring target:', insertTargetError);
            return NextResponse.json(
                { error: insertTargetError.message, success: false },
                { status: 500 }
            );
        }

        // 4. 원본 테이블에 테스트 항목들 복원 (항목이 있는 경우에만)
        if (archivedItems && archivedItems.length > 0) {
            const { error: insertItemsError } = await supabase
                .from('test_items')
                .insert(archivedItems);

            if (insertItemsError) {
                console.error('Error restoring test items:', insertItemsError);
                // 테스트 대상 복원은 성공했지만 테스트 항목 복원은 실패한 경우
                // 이상적으로는 이 경우 트랜잭션을 롤백해야 하지만, Supabase에서는 단순하게 처리
                // 롤백을 위해 방금 복원한 테스트 대상 삭제
                const { error: rollbackError } = await supabase
                    .from('test_targets')
                    .delete()
                    .eq('id', id);

                if (rollbackError) {
                    console.error('Error rolling back test target restoration:', rollbackError);
                }

                return NextResponse.json(
                    { error: insertItemsError.message, success: false },
                    { status: 500 }
                );
            }
        }

        // 5. 아카이브에서 테스트 대상 삭제
        const { error: deleteTargetError } = await supabase
            .from('test_targets_archive')
            .delete()
            .eq('id', id);

        if (deleteTargetError) {
            console.error('Error removing target from archive:', deleteTargetError);
            // 비정상적이지만 복원 자체는 성공했으므로 경고만 반환
            return NextResponse.json(
                {
                    error: 'Target and items were restored but could not be removed from archive: ' + deleteTargetError.message,
                    success: true
                },
                { status: 200 }
            );
        }

        // 6. 아카이브에서 테스트 항목들 삭제
        if (archivedItems && archivedItems.length > 0) {
            const { error: deleteItemsError } = await supabase
                .from('test_items_archive')
                .delete()
                .eq('target_id', id);

            if (deleteItemsError) {
                console.error('Error removing items from archive:', deleteItemsError);
                // 비정상적이지만 복원 자체는 성공했으므로 경고만 반환
                return NextResponse.json(
                    {
                        error: 'Target and items were restored but items could not be removed from archive: ' + deleteItemsError.message,
                        success: true
                    },
                    { status: 200 }
                );
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                message: "테스트 대상 및 관련 항목이 성공적으로 복원되었습니다.",
                restoredItemsCount: archivedItems ? archivedItems.length : 0
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}