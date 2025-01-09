// // src/app/api/proxy/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// // Route segment config
// export const dynamic = 'force-dynamic';

// export async function POST(request: NextRequest) {
//   try {
//     const { endpoint, method, body } = await request.json();
    
//     // CORS 체크를 위한 origin 확인
//     const origin = request.headers.get('origin');
//     const authorization = request.headers.get('authorization');
    
//     // 기본 헤더 설정
//     const requestHeaders = new Headers({
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'Origin': origin || '',
//       ...(authorization && { 'Authorization': authorization })
//     });

//     // body 처리
//     let processedBody: string | undefined;
//     if (body) {
//       processedBody = typeof body === 'object' ? JSON.stringify(body) : body;
//     }

//     console.log('Proxy Request:', {
//       url: endpoint,
//       method: method || 'GET',
//       headers: Object.fromEntries(requestHeaders.entries()),
//       body: processedBody
//     });

//     // fetch 요청
//     const response = await fetch(endpoint, {
//       method: method || 'GET',
//       headers: requestHeaders,
//       body: method !== 'GET' ? processedBody : undefined,
//       // EC2에서 SSL/TLS 검증 관련 이슈가 있을 경우
//       // @ts-ignore
//       rejectUnauthorized: false
//     });

//     // 응답 로깅
//     const responseText = await response.text();
//     console.log('Proxy Response:', {
//       status: response.status,
//       statusText: response.statusText,
//       headers: Object.fromEntries(response.headers.entries()),
//       body: responseText
//     });

//     // 에러 응답 처리
//     if (!response.ok) {
//       return NextResponse.json(
//         {
//           error: 'API request failed',
//           status: response.status,
//           statusText: response.statusText,
//           details: responseText
//         },
//         {
//           status: response.status,
//           headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': origin || '*',
//             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//             'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//           }
//         }
//       );
//     }

//     // JSON 파싱 시도
//     try {
//       const jsonData = JSON.parse(responseText);
//       return NextResponse.json(jsonData, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': origin || '*',
//           'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//           'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//         }
//       });
//     } catch {
//       // JSON이 아닌 경우 텍스트로 반환
//       return new NextResponse(responseText, {
//         headers: {
//           'Content-Type': response.headers.get('content-type') || 'text/plain',
//           'Access-Control-Allow-Origin': origin || '*',
//           'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//           'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//         }
//       });
//     }

//   } catch (error) {
//     console.error('Proxy error:', error);
//     return NextResponse.json(
//       {
//         error: 'Failed to proxy request',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       },
//       {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//           'Access-Control-Allow-Headers': 'Content-Type, Authorization'
//         }
//       }
//     );
//   }
// }

// // OPTIONS 요청 처리
// export async function OPTIONS(request: NextRequest) {
//   const origin = request.headers.get('origin');
  
//   return new NextResponse(null, {
//     headers: {
//       'Access-Control-Allow-Origin': origin || '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//       'Access-Control-Max-Age': '86400' // 24시간
//     }
//   });
// }

// src/app/api/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Route segment config
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { endpoint, method, body } = await request.json();
    
    // CORS 체크를 위한 origin 확인
    const origin = request.headers.get('origin');
    const authorization = request.headers.get('authorization');
    
    // 기본 헤더 설정
    const requestHeaders = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': origin || '',
      ...(authorization && { 'Authorization': authorization })
    });

    // body 처리
    let processedBody: string | undefined;
    if (body) {
      processedBody = typeof body === 'object' ? JSON.stringify(body) : body;
    }

    console.log('Proxy Request:', {
      url: endpoint,
      method: method || 'GET',
      headers: Object.fromEntries(requestHeaders.entries()),
      body: processedBody
    });

    // fetch 요청
    const response = await fetch(endpoint, {
      method: method || 'GET',
      headers: requestHeaders,
      body: method !== 'GET' ? processedBody : undefined,
      // EC2에서 SSL/TLS 검증 관련 이슈가 있을 경우
      // @ts-ignore
      rejectUnauthorized: false
    });

    // 응답 로깅
    const responseText = await response.text();
    console.log('Proxy Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: responseText
    });

    // 에러 응답 처리
    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'API request failed',
          status: response.status,
          statusText: response.statusText,
          details: responseText
        },
        {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          }
        }
      );
    }

    // JSON 파싱 시도
    try {
      const jsonData = JSON.parse(responseText);
      return NextResponse.json(jsonData, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    } catch {
      // JSON이 아닌 경우 텍스트로 반환
      return new NextResponse(responseText, {
        headers: {
          'Content-Type': response.headers.get('content-type') || 'text/plain',
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      });
    }

  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      {
        error: 'Failed to proxy request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      }
    );
  }
}

// OPTIONS 요청 처리
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400' // 24시간
    }
  });
}