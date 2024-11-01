import * as React from 'react';
import { useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, UserPlus } from 'lucide-react';
import { SignUpFormData, useSignUp } from '@/hook/useApiForSignUp';

const DialogButtonForSignUp: React.FC = () => {
    const [formData, setFormData] = useState<SignUpFormData>({
        email: 'terecal2@daum.net',
        password: 'cjswlek2874!@',
        confirmPassword: 'cjswlek2874!@'
    });
    const [isOpen, setIsOpen] = useState(false);
    const { signUp, isLoading, validationErrors, validateForm } = useSignUp();

    const handleChange = (field: keyof SignUpFormData) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm(formData)) return;
        try {
            await signUp({
                email: formData.email,
                password: formData.password
            });
            // setIsOpen(false);
            // setFormData({ email: '', password: '', confirmPassword: '' });
        } catch (error) {
            // Error is handled by the mutation
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-sm font-medium px-6 py-2">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
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

                    {/* Right Section: Sign Up Form */}
                    <div className="w-full md:w-1/2 p-8">
                        <form onSubmit={handleSubmit}>
                            <DialogHeader className="space-y-2 mb-6">
                                <DialogTitle className="text-2xl font-semibold text-gray-900">
                                    Create Your Account
                                </DialogTitle>
                                <DialogDescription className="text-gray-500">
                                    Join us to start your journey
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
                                            value={formData.email}
                                            onChange={handleChange('email')}
                                            className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
                                            placeholder="name@example.com"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {validationErrors.email && (
                                        <p className="text-sm text-red-500">{validationErrors.email}</p>
                                    )}
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
                                            value={formData.password}
                                            onChange={handleChange('password')}
                                            className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
                                            placeholder="••••••••"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {validationErrors.password && (
                                        <p className="text-sm text-red-500">{validationErrors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-gray-700">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange('confirmPassword')}
                                            className="pl-9 bg-gray-50 border-gray-200 focus:bg-white"
                                            placeholder="••••••••"
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {validationErrors.confirmPassword && (
                                        <p className="text-sm text-red-500">{validationErrors.confirmPassword}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-6"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing up...' : 'Sign Up'}
                                </Button>

                                <p className="text-center text-sm text-gray-500 mt-4">
                                    Already have an account?{' '}
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="text-blue-500 hover:text-blue-600 p-0"
                                    >
                                        Log in
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