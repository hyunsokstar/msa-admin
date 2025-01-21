// /app/login/page.tsx
'use client';

import * as React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import LoginFormFallback from './comp/LoginFormFallback';

// 클라이언트 사이드에서만 로드되도록 LoginForm을 동적 임포트
const LoginForm = dynamic(() => import('./comp/LoginForm'), {
  ssr: false
});

// 메인 LoginPage 컴포넌트
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}