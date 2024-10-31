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
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Mail, Lock, UserPlus } from 'lucide-react';

const DialogButtonForSignUp: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log("회원 가입 시도: ", { email, password });
        // 회원가입 로직 추가 후 리디렉션
        router.push('/welcome');
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-sm font-medium px-6 py-2">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px] p-6 bg-white">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-2xl font-semibold text-gray-900">
                        Create Your Account
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                        Join us to start your journey
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-4">
                    <div className="grid gap-2">
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

                    <div className="grid gap-2">
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

                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword" className="text-gray-700">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSignUp}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                    >
                        Sign Up
                    </Button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account?{' '}
                        <Button
                            variant="link"
                            className="text-blue-500 hover:text-blue-600 p-0"
                        >
                            Log in
                        </Button>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogButtonForSignUp;
