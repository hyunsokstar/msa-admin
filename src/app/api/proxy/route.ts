// src\api\proxy\route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { endpoint, method, body } = await request.json();

    let apiUrl = endpoint;
    if (!endpoint.startsWith('http')) {
      apiUrl = `${process.env.API_BASE_URL}${endpoint}`;
    }

    console.log('Proxy request to:', apiUrl); // 디버깅용

    const response = await fetch(apiUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' && body ? JSON.stringify(body) : undefined
    });

    // 응답 타입 확인
    const contentType = response.headers.get('content-type');
    console.log('Response content-type:', contentType); // 디버깅용

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText); // 디버깅용
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
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