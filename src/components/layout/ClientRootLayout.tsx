// src/app/ClientRootLayout.tsx
'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';

// HeaderMenus 컴포넌트를 동적으로 로딩하도록 변경
const HeaderMenus = dynamic(() => import('@/components/menu/HeaderMenus'), { ssr: false });

const queryClient = new QueryClient();

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <HeaderMenus />
            {children}
        </QueryClientProvider>
    );
}
