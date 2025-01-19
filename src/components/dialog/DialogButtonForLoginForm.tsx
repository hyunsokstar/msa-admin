'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import CommonButton from '@/components/common/CommonButton';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LogIn, Mail, Lock, X, Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaComment } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { useApiForLogin } from '@/hook/useApiForLogin';

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

const DialogButtonForLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const loginMutation = useApiForLogin();

    const handleLogin = () => {
        loginMutation.mutate({ email, password });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <CommonButton
                    size="sm"
                    startIcon={<LogIn className="h-4 w-4" />}
                >
                    로그인
                </CommonButton>
            </DialogTrigger>

            <DialogContent className="p-0 bg-white w-[400px] max-w-[95vw] 
                rounded-2xl border-none">
                <DialogTitle asChild>
                    <VisuallyHidden>로그인</VisuallyHidden>
                </DialogTitle>

                <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative p-8"
                >
                    <button
                        onClick={() => (document.querySelector('[role="dialog"]')?.closest('div')?.querySelector('button[aria-label="Close"]') as HTMLButtonElement)?.click()}
                        className="absolute right-6 top-6 rounded-full p-2
                            text-gray-400 hover:text-gray-600 hover:bg-gray-100
                            transition-all duration-200"
                    >
                        <X className="h-4 w-4" />
                        <VisuallyHidden>Close</VisuallyHidden>
                    </button>

                    <form 
                        className="space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
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
                            >
                                <FaComment className="h-5 w-5 text-[#391B1B]" />
                            </CommonButton>
                            <CommonButton
                                variant="outline"
                                size="icon"
                                className="w-11 h-11 rounded-full bg-[#03C75A] hover:bg-[#02B351] border-none"
                                aria-label="네이버로 로그인"
                            >
                                <SiNaver className="h-5 w-5 text-white" />
                            </CommonButton>
                            <CommonButton
                                variant="outline"
                                size="icon"
                                className="w-11 h-11 rounded-full border-gray-200 hover:bg-gray-50"
                                aria-label="구글로 로그인"
                            >
                                <FaGoogle className="h-5 w-5 text-[#EA4335]" />
                            </CommonButton>
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-sm text-gray-600">
                                계정이 없으신가요?{' '}
                                <CommonButton
                                    variant="link"
                                    className="text-primary hover:text-primary/90 font-medium"
                                >
                                    회원가입
                                </CommonButton>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogButtonForLogin;
