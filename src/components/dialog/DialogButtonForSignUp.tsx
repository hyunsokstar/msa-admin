// src/components/dialog/DialogButtonForSignUp.tsx
'use client';

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
import { Lock, Mail, UserPlus, X, Eye, EyeOff, User } from 'lucide-react';
import { FaGoogle, FaFacebook, FaComment } from 'react-icons/fa';
import { useSignUp } from "@/hook/useApiForSignUp";
import { SignUpFormData } from '@/types/typeForAuth';

const initialFormData: SignUpFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  full_name: ''
};

const DialogButtonForSignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading, validationErrors, validateForm } = useSignUp();

  const handleChange = <T extends keyof SignUpFormData>(field: T) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name
      });
      setIsOpen(false);
      setFormData(initialFormData);
    } catch (error) {
      console.error('회원가입 처리 중 오류:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <UserPlus className="w-4 h-4" />
          회원가입
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 max-w-[90vw] sm:max-w-xl md:max-w-3xl lg:max-w-[800px] rounded-lg shadow-2xl overflow-hidden bg-white">
        <DialogClose className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="bg-[#4171d6] text-white p-8 flex flex-col justify-center items-center w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">업무 관리 + Util</h2>
            <p className="text-blue-100 text-center leading-relaxed">
              회원가입하시고 다양한 혜택을<br />
              경험해보세요.
            </p>
          </div>

          {/* Right Section */}
          <div className="p-8 w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <DialogHeader className="mb-2">
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  회원가입
                </DialogTitle>
              </DialogHeader>

              {/* Full Name Input */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  value={formData.full_name}
                  onChange={handleChange('full_name')}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-lg"
                  placeholder="이름을 입력해주세요"
                  disabled={isLoading}
                />
                {validationErrors?.full_name && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.full_name}</p>
                )}
              </div>

              {/* Email Input */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-lg"
                  placeholder="이메일을 입력해주세요"
                  disabled={isLoading}
                />
                {validationErrors?.email && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange('password')}
                  className="pl-10 pr-10 py-2 w-full border-gray-200 rounded-lg"
                  placeholder="비밀번호 (영문, 숫자 포함 6자 이상)"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
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

              {/* Confirm Password Input */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  className="pl-10 pr-4 py-2 w-full border-gray-200 rounded-lg"
                  placeholder="비밀번호를 다시 입력해주세요"
                  disabled={isLoading}
                />
                {validationErrors?.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{validationErrors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#4171d6] hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                disabled={isLoading}
              >
                {isLoading ? '가입 진행 중...' : '가입하기'}
              </Button>
            </form>

            {/* Social Login Section */}
            <div className="mt-6">
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">또는</span>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
                  <FaGoogle className="w-5 h-5 text-[#EA4335]" />
                  <span className="sr-only">Google로 로그인</span>
                </Button>
                <Button variant="outline" className="w-10 h-10 p-0 rounded-full bg-[#FEE500] text-[#3C1E1E]">
                  <FaComment className="w-5 h-5" />
                  <span className="sr-only">카카오로 로그인</span>
                </Button>
                <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
                  <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                  <span className="sr-only">페이스북으로 로그인</span>
                </Button>
              </div>
            </div>

            {/* Already have an account? */}
            <div className="mt-4 text-center">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogButtonForSignUp;