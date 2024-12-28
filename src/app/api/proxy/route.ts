import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { endpoint, method, body } = await request.json();
    
    const authorization = request.headers.get('authorization');
    
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...(authorization && { 'Authorization': authorization })
    };

    // body가 객체인 경우 JSON 문자열로 변환
    let bodyString = typeof body === 'object' ? JSON.stringify(body) : body;

    console.log('Request headers:', requestHeaders);
    console.log('Sending request with body:', bodyString);

    const response = await fetch(endpoint, {
      method: method || 'GET',
      headers: requestHeaders,
      body: method !== 'GET' ? bodyString : undefined
    });

    // 응답 내용 먼저 받기
    const responseText = await response.text();
    console.log('Response status:', response.status);
    console.log('Response text:', responseText);

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: 'API request failed',
          status: response.status,
          details: responseText
        }, 
        { status: response.status }
      );
    }

    // responseText가 JSON인지 확인
    try {
      const jsonData = JSON.parse(responseText);
      return NextResponse.json(jsonData);
    } catch {
      return new NextResponse(responseText, {
        headers: { 
          'Content-Type': response.headers.get('content-type') || 'text/plain' 
        }
      });
    }

  } catch (error) {
    console.error('Proxy error details:', error);
    return NextResponse.json(
      { 
        error: 'Failed to proxy request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}