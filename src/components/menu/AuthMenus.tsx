'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import DialogButtonForLogin from '../dialog/DialogButtonForLoginForm';
import DialogButtonForSignUp from '../dialog/DialogButtonForSignUp';

// DialogButtonForLogin 컴포넌트를 동적 로딩으로 불러옴

const AuthMenus: React.FC = () => {
    return (
        <div className="flex items-center space-x-4">
            {/* 로그인 버튼 (Dialog로 띄우는 방식) */}
            <DialogButtonForLogin />
            {/* 회원가입 등의 추가 인증 버튼을 여기에 포함 가능 */}
            <DialogButtonForSignUp />
        </div>
    );
};

export default AuthMenus;