'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import CommonButton from '@/components/common/CommonButton';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaComment } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { useApiForLogin } from '@/hook/useApiForLogin';
import DialogButtonForSignUp from './DialogButtonForSignUp';

interface DialogButtonForLoginProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showTrigger?: boolean;
}

const contentVariants = {
    hidden: { 
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
        }
    }
};

const DialogButtonForLogin: React.FC<DialogButtonForLoginProps> = ({ 
    open: externalOpen, 
    onOpenChange: externalOnOpenChange,
    showTrigger = true 
}) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useApiForLogin();

    // 제어/비제어 상태 관리
    const isControlled = externalOpen !== undefined;
    const open = isControlled ? externalOpen : internalOpen;
    const onOpenChange = isControlled ? externalOnOpenChange : setInternalOpen;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginMutation.mutateAsync({ email, password });
            onOpenChange?.(false);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setShowPassword(false);
    };

    return (
        <Dialog 
            open={open} 
            onOpenChange={(newOpen) => {
                onOpenChange?.(newOpen);
                if (!newOpen) {
                    resetForm();
                }
            }}
        >
            {showTrigger && (
                <DialogTrigger asChild>
                    <CommonButton
                        size="sm"
                        startIcon={<LogIn className="h-4 w-4" />}
                    >
                        로그인
                    </CommonButton>
                </DialogTrigger>
            )}

            <DialogContent className="p-0 bg-white w-[400px] max-w-[95vw] rounded-2xl border-none">
                <DialogTitle asChild>
                    <VisuallyHidden>로그인</VisuallyHidden>
                </DialogTitle>

                <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative p-8"
                >
                    <form 
                        className="space-y-6"
                        onSubmit={handleLogin}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 bg-gray-50 border-gray-200 rounded-xl w-full
                                        focus:bg-white focus:ring-2 focus:ring-primary/10"
                                    placeholder="이메일"
                                    disabled={loginMutation.isPending}
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Lock className="w-5 h-5 text-gray-400" />
                                <div className="relative w-full">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 bg-gray-50 border-gray-200 rounded-xl w-full
                                            focus:bg-white focus:ring-2 focus:ring-primary/10"
                                        placeholder="비밀번호"
                                        disabled={loginMutation.isPending}
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2
                                            text-gray-400 hover:text-gray-600 p-1.5 z-10
                                            transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                        <VisuallyHidden>
                                            {showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                                        </VisuallyHidden>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" className="rounded-md" />
                                    <Label htmlFor="remember" className="text-sm text-gray-600">
                                        로그인 상태 유지
                                    </Label>
                                </div>
                                <button
                                    type="button"
                                    className="text-xs text-primary hover:text-primary/90 
                                        font-medium transition-colors"
                                >
                                    비밀번호 찾기
                                </button>
                            </div>

                            <CommonButton
                                type="submit"
                                className="w-full h-12 text-base rounded-xl bg-primary"
                                isLoading={loginMutation.isPending}
                                loadingText="로그인 중..."
                            >
                                로그인
                            </CommonButton>
                        </div>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-4 text-gray-500">소셜 로그인</span>
                            </div>
                        </div>

                        <div className="flex justify-center items-center space-x-4">
                            <CommonButton
                                variant="outline"
                                size="icon"
                                className="w-11 h-11 rounded-full bg-[#FEE500] hover:bg-[#FDD800] border-none"
                                aria-label="카카오로 로그인"
                                onClick={() => {/* 카카오 로그인 구현 */}}
                            >
                                <FaComment className="h-5 w-5 text-[#391B1B]" />
                            </CommonButton>
                            <CommonButton
                                variant="outline"
                                size="icon"
                                className="w-11 h-11 rounded-full bg-[#03C75A] hover:bg-[#02B351] border-none"
                                aria-label="네이버로 로그인"
                                onClick={() => {/* 네이버 로그인 구현 */}}
                            >
                                <SiNaver className="h-5 w-5 text-white" />
                            </CommonButton>
                            <CommonButton
                                variant="outline"
                                size="icon"
                                className="w-11 h-11 rounded-full border-gray-200 hover:bg-gray-50"
                                aria-label="구글로 로그인"
                                onClick={() => {/* 구글 로그인 구현 */}}
                            >
                                <FaGoogle className="h-5 w-5 text-[#EA4335]" />
                            </CommonButton>
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-sm text-gray-600">
                                계정이 없으신가요?{' '}
                                <DialogButtonForSignUp />
                            </p>
                        </div>
                    </form>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogButtonForLogin;