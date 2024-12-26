// app/api/supabase/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false }
  }
)

export async function POST(req: Request) {
  const { method, path, body, options = {} } = await req.json()
  
  try {
    const dbMethod = method.toLowerCase() as 'select' | 'insert' | 'update' | 'delete' | 'upsert'
    let response;
    
    switch (dbMethod) {
      case 'select':
        response = await supabase.from(path).select(body, options);
        break;
      case 'insert':
        response = await supabase.from(path).insert(body, options);
        break;
      case 'update':
        response = await supabase.from(path).update(body, { ...options, returning: 'minimal' });
        break;
      case 'delete':
        response = await supabase.from(path).delete({ ...options, returning: 'minimal' });
        break;
      case 'upsert':
        response = await supabase.from(path).upsert(body, { ...options, returning: 'minimal' });
        break;
      default:
        return NextResponse.json({ error: 'Invalid method' }, { status: 400 })
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}