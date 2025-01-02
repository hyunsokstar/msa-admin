// src/components/dialog/DialogButtonForLogin.tsx

'use client';

import * as React from 'react';
import { useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock, LogIn, X, Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaFacebook, FaComment } from 'react-icons/fa'; // React-icons 로고 추가
import { useApiForLogin } from '@/hook/useApiForLogin';

const DialogButtonForLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // useApiForLogin 훅 사용
    const loginMutation = useApiForLogin();

    const handleLogin = () => {
        console.log("로그인 시도: ", { email, password });
        loginMutation.mutate({ email, password });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    type='button'
                variant="outline" className="text-sm font-medium px-6 py-2">
                    <LogIn className="w-4 h-4 mr-2" />
                    로그인
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-white w-[800px] max-w-[90vw] rounded-lg shadow-2xl">
                {/* 닫기 버튼 */}
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <div className="flex flex-col md:flex-row w-full min-h-[550px]">
                    {/* 왼쪽: 이미지 섹션 */}
                    <div className="w-full md:w-1/2 flex flex-col">
                        {/* 상단 영역 */}
                        <div className="h-1/2 flex items-center justify-center">
                            <img
                                src="/bigman.webp"
                                alt="Dankkum Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* 하단 텍스트 영역 */}
                        <div className="bg-[#4171d6] h-1/2 flex flex-col items-center justify-center p-8 text-white">
                            <p className="text-blue-100 text-center leading-relaxed">
                                로그인 후에 업무 관리의 <br/> 신세계를 경험 하세요 !
                            </p>
                        </div>
                    </div>

                    {/* 오른쪽: 로그인 폼 섹션 */}
                    <div className="w-full md:w-1/2 p-8">
                        <form onSubmit={(e) => e.preventDefault()} className="h-full flex flex-col">
                            <DialogHeader className="mb-6">
                                <DialogTitle className="text-2xl font-bold text-gray-900">
                                    로그인
                                </DialogTitle>
                            </DialogHeader>

                            <div className="space-y-4">
                                {/* 이메일 입력 */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 flex justify-center">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full py-2 border-gray-200 rounded-lg"
                                            placeholder="이메일을 입력해주세요"
                                            disabled={loginMutation.isPending}
                                        />
                                    </div>
                                </div>

                                {/* 비밀번호 입력 */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 flex justify-center">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div className="flex-1 relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full py-2 border-gray-200 rounded-lg"
                                            placeholder="비밀번호를 입력해주세요"
                                            disabled={loginMutation.isPending}
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" />
                                        <Label
                                            htmlFor="remember"
                                            className="text-sm text-gray-600 leading-none"
                                        >
                                            로그인 상태 유지
                                        </Label>
                                    </div>
                                    <Button
                                    type='button'
                                        variant="link"
                                        className="text-sm text-blue-500 hover:text-blue-600 p-0"
                                    >
                                        비밀번호를 잊으셨나요?
                                    </Button>
                                </div>

                                <Button
                                type='button'
                                    onClick={handleLogin}
                                    className="w-full bg-[#4171d6] hover:bg-blue-700 text-white py-2 mt-6 rounded-lg transition-colors"
                                    disabled={loginMutation.isPending}
                                >
                                    {loginMutation.isPending ? '로그인 중...' : '로그인'}
                                </Button>
                            </div>

                            {/* 소셜 로그인 섹션 */}
                            <div className="mt-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">또는</span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-center space-x-4">
                                    {/* Google 로그인 버튼 */}
                                    <button 
                                        type='button'
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                                        <FaGoogle className="w-5 h-5 text-[#EA4335]" />
                                    </button>
                                    {/* Kakao 로그인 버튼 */}
                                    <button 
                                    type='button'
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FEE500] hover:bg-[#FDD800] transition-colors">
                                        <FaComment className="w-5 h-5 text-[#3C1E1E]" />
                                    </button>
                                    {/* Naver 로그인 버튼 */}
                                    <button 
                                    type='button'
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#03C75A] hover:bg-[#02B551] transition-colors">
                                        <FaFacebook className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    계정이 없으신가요?{' '}
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="text-[#4171d6] hover:text-blue-700 p-0 font-medium"
                                    >
                                        회원가입
                                    </Button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogButtonForLogin;
