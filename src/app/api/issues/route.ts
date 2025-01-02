// app/api/issues/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { IssueFilter } from '@/types/typeForTaskIssue';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  try {
    // URL 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const filterParam = searchParams.get('filter');
    const filter: IssueFilter | undefined = filterParam ? JSON.parse(filterParam) : undefined;

    // 메인 데이터 쿼리 준비
    let mainQuery = supabase
      .from('issues')
      .select(`
        *,
        manager_user:users!fk_issues_manager(id, email),
        executor_user:users!issues_executor_fkey(id, email)
      `, { count: 'exact' });

    // 필터 조건 적용
    if (filter) {
      if (filter.status && filter.status !== 'All') mainQuery = mainQuery.eq('status', filter.status);
      if (filter.priority && filter.priority !== 'All') mainQuery = mainQuery.eq('priority', filter.priority);
      if (filter.category1 && filter.category1 !== 'All') mainQuery = mainQuery.eq('category1', filter.category1);
      if (filter.type && filter.type !== 'All') mainQuery = mainQuery.eq('type', filter.type);
      if (filter.keyword && filter.keyword.trim() !== '') {
        mainQuery = mainQuery.ilike('title', `%${filter.keyword}%`);
      }
      if (filter.executor && filter.executor.trim() !== '') mainQuery = mainQuery.eq('executor', filter.executor);
    }

    // 페이징 적용
    mainQuery = mainQuery
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    const { data, error, count } = await mainQuery;
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 완료/미완료 이슈 카운트 계산
    const totalCompleted = data?.filter(issue => issue.status === 'Closed').length || 0;
    const totalIncomplete = data?.filter(issue => issue.status !== 'Closed').length || 0;

    return NextResponse.json({
      issues: data || [],
      totalCompleted,
      totalIncomplete,
      totalIssues: count || 0
    });

  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}