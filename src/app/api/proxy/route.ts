import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { endpoint, method, body, headers = {} } = await request.json();
    
    // headers가 없는 경우를 대비해 기본값 설정
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };

    const response = await fetch(endpoint, {
      method: method || 'GET',
      headers: requestHeaders,
      body: method !== 'GET' ? (
        requestHeaders['Content-Type'] === 'application/x-www-form-urlencoded' 
          ? body  // form-urlencoded는 문자열 그대로 전달
          : JSON.stringify(body) // 그 외의 경우 JSON으로 변환
      ) : undefined
    });

    console.log("response : ", response);
    

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    // 응답 형식 확인 및 처리
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const text = await response.text();
      return new NextResponse(text, {
        headers: { 'Content-Type': contentType || 'text/plain' }
      });
    }

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to proxy request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}