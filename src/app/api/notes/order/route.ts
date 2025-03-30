// src/app/api/notes/order/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface OrderChangeItem {
  id: number
  order: number
}

interface OrderChangeRequestBody {
  items: OrderChangeItem[]
}

export async function PUT (request: NextRequest): Promise<NextResponse> {
  try {
    // Create the Supabase client with the correct cookies function
    const supabase = createRouteHandlerClient({ cookies })

    const body: OrderChangeRequestBody = await request.json()

    if (!Array.isArray(body.items)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    console.log('Updating notes order:', body.items)

    // notes 테이블의 순서를 업데이트
    const updatePromises = body.items.map(item =>
      supabase
        .from('notes')
        .update({ order: item.order })
        .eq('id', item.id)
        .select()
    )

    const results = await Promise.all(updatePromises)

    const errors = results
      .map((result, index) =>
        result.error ? { error: result.error, index } : null
      )
      .filter(Boolean)

    if (errors.length > 0) {
      console.error('Error updating notes order:', errors)
      return NextResponse.json(
        { error: 'Failed to update some items order' },
        { status: 500 }
      )
    }

    const updatedData = results.map(result => result.data).flat()

    return NextResponse.json({ data: updatedData }, { status: 200 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
