// src/app/ClientRootLayout.tsx
'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 스타일 추가

// HeaderMenus 컴포넌트를 동적으로 로딩하도록 변경
const HeaderMenus = dynamic(() => import('@/components/menu/HeaderMenus'), { ssr: false });

const queryClient = new QueryClient();

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <HeaderMenus />
            {/* ToastContainer 추가 */}
            <ToastContainer
                position="top-center" // 위치 설정
                autoClose={2000} // 자동 닫힘 시간 (밀리초)
                hideProgressBar={false} // 진행 표시 바 표시 여부
                newestOnTop={false} // 최신 알림을 위에 표시
                closeOnClick // 클릭 시 닫기
                rtl={false} // RTL(오른쪽에서 왼쪽) 방향 여부
                pauseOnFocusLoss // 포커스 손실 시 일시 중지
                draggable // 드래그 가능 여부
                pauseOnHover // 호버 시 일시 중지
            />
            {children}
        </QueryClientProvider>
    );
}
