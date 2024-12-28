import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { endpoint, method, body } = await request.json();
    
    // 원본 요청에서 Authorization 헤더 가져오기 
    const authorization = request.headers.get('authorization');
    
    // 기본 헤더 설정에 Authorization 추가
    const requestHeaders = {
      'Content-Type': 'application/json',
      ...(authorization && { 'Authorization': authorization }) // Authorization 헤더가 있으면 추가
    };

    const response = await fetch(endpoint, {
      method: method || 'GET',
      headers: requestHeaders,
      body: method !== 'GET' ? (
        requestHeaders['Content-Type'] === 'application/x-www-form-urlencoded' 
          ? body
          : JSON.stringify(body)
      ) : undefined
    });

    console.log("response : ", response);
    console.log("requestHeaders : ", requestHeaders); // 헤더 확인용 로그

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    // 나머지 코드는 동일
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