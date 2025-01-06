// src/components/dialog/DialogButtonForSignUp.tsx

'use client';

import * as React from 'react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail, UserPlus, X, Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaFacebook, FaComment } from 'react-icons/fa'; // React-icons 로고 추가
import { useSignUp } from "@/hook/useApiForSignUp";

const initialFormData: FormFields = {
    email: '',
    password: '',
    confirmPassword: ''
};

type FormFields = {
    email: string;
    password: string;
    confirmPassword: string;
};

const DialogButtonForSignUp: React.FC = () => {
    const [formData, setFormData] = useState<FormFields>(initialFormData);
    const [isOpen, setIsOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signUp, isLoading, validationErrors, validateForm } = useSignUp();

    const handleChange = <T extends keyof FormFields>(field: T) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm(formData)) return;
        try {
            await signUp({ email: formData.email, password: formData.password });
            setIsOpen(false);
            setFormData(initialFormData);
        } catch (error) {
            console.error('회원가입 오류:', error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-sm font-medium px-6 py-2">
                    <UserPlus className="w-4 h-4 mr-2" />
                    회원가입
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
                        {/* <div className="h-1/2 flex items-center justify-center">
                            <img
                                src="/site_logo.png"
                                alt="Dankkum Logo"
                                className="w-full h-full object-cover"
                            />
                        </div> */}
                        {/* 하단 텍스트 영역 */}
                        <div className="bg-[#4171d6] h-1/2 flex flex-col items-center justify-center p-8 text-white">
                            <h2 className="text-3xl font-bold mb-4">업무 관리 + Util</h2>
                            <p className="text-blue-100 text-center leading-relaxed">
                                회원가입하시고 다양한 혜택을<br />
                                경험해보세요.
                            </p>
                        </div>
                    </div>

                    {/* 오른쪽: 회원가입 폼 섹션 */}
                    <div className="w-full md:w-1/2 p-8">
                        <form onSubmit={handleSubmit} className="h-full flex flex-col">
                            <DialogHeader className="mb-6">
                                <DialogTitle className="text-2xl font-bold text-gray-900">
                                    회원가입
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
                                            value={formData.email}
                                            onChange={handleChange('email')}
                                            className="w-full py-2 border-gray-200 rounded-lg"
                                            placeholder="이메일을 입력해주세요"
                                            disabled={isLoading}
                                        />
                                        {validationErrors?.email && (
                                            <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
                                        )}
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
                                            value={formData.password}
                                            onChange={handleChange('password')}
                                            className="w-full py-2 border-gray-200 rounded-lg"
                                            placeholder="비밀번호 (영문, 숫자 포함 6자 이상)"
                                            disabled={isLoading}
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
                                        {validationErrors?.password && (
                                            <p className="text-sm text-red-500 mt-1">{validationErrors.password}</p>
                                        )}
                                    </div>
                                </div>

                                {/* 비밀번호 확인 입력 */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 flex justify-center">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            className="w-full py-2 border-gray-200 rounded-lg"
                                            placeholder="비밀번호를 다시 입력해주세요"
                                            disabled={isLoading}
                                        />
                                        {validationErrors?.confirmPassword && (
                                            <p className="text-sm text-red-500 mt-1">{validationErrors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-[#4171d6] hover:bg-blue-700 text-white py-2 mt-6 rounded-lg transition-colors"
                                    disabled={isLoading}
                                >
                                    {isLoading ? '가입 진행 중...' : '가입하기'}
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
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                                        <FaGoogle className="w-5 h-5 text-[#EA4335]" />
                                    </button>
                                    {/* Kakao 로그인 버튼 */}
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FEE500] hover:bg-[#FDD800] transition-colors">
                                        <FaComment className="w-5 h-5 text-[#3C1E1E]" />
                                    </button>
                                    {/* Naver 로그인 버튼 */}
                                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#03C75A] hover:bg-[#02B551] transition-colors">
                                        <FaFacebook className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    이미 계정이 있으신가요?{' '}
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="text-[#4171d6] hover:text-blue-700 p-0 font-medium"
                                    >
                                        로그인
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

export default DialogButtonForSignUp;
