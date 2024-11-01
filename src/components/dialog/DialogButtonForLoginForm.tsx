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
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useApiForLogin } from '@/hook/useApiForLogin';

const DialogButtonForLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // useApiForLogin 훅 사용
    const loginMutation = useApiForLogin();

    const handleLogin = () => {
        console.log("로그인 시도: ", { email, password });
        loginMutation.mutate({ email, password });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="text-sm font-medium bg-white hover:bg-gray-50"
                >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 bg-white w-[800px] max-w-[90vw]">
                <div className="flex flex-col md:flex-row w-full min-h-[500px]">
                    {/* Left Section: Image Box */}
                    <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 border-r border-gray-200">
                        <div className="max-w-[200px] w-full">
                            <img
                                src="/dankkum_logo.png"
                                alt="Dankkum Logo"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>

                    {/* Right Section: Login Form */}
                    <div className="w-full md:w-1/2 p-8">
                        <DialogHeader className="space-y-2 mb-6">
                            <DialogTitle className="text-2xl font-semibold text-gray-900">
                                Welcome Back
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                                Please login to your account
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" />
                                    <Label
                                        htmlFor="remember"
                                        className="text-sm text-gray-600 leading-none"
                                    >
                                        Remember me
                                    </Label>
                                </div>
                                <Button
                                    variant="link"
                                    className="text-sm text-blue-500 hover:text-blue-600 p-0"
                                >
                                    Forgot password?
                                </Button>
                            </div>

                            <Button
                                onClick={handleLogin}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6"
                                disabled={loginMutation.isPending}
                            >
                                {loginMutation.isPending ? 'Logging in...' : 'Sign In'}
                            </Button>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-2 bg-white text-gray-500">
                                        OR CONTINUE WITH
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="w-full bg-white hover:bg-gray-50 text-gray-600"
                                >
                                    Google
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full bg-white hover:bg-gray-50 text-gray-600"
                                >
                                    Facebook
                                </Button>
                            </div>

                            <p className="text-center text-sm text-gray-500">
                                Don't have an account?{' '}
                                <Button
                                    variant="link"
                                    className="text-blue-500 hover:text-blue-600 p-0"
                                >
                                    Sign up
                                </Button>
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogButtonForLogin;
