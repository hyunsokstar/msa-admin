"use client";

import React, { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { SendHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
    onSuccess?: () => void;
}

const ICommonChattingInput: React.FC<Props> = ({ onSuccess }) => {
    const [message, setMessage] = useState('');
    const { user, isAuthenticated } = useUserStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated || !user) {
            toast.error('로그인이 필요합니다.');
            return;
        }

        if (!message.trim()) {
            return;
        }
    };

    return (
        <div className="border-t bg-white p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="메시지를 입력하세요..."
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className={cn(
                        "p-2 rounded-lg border border-gray-200",
                        "transition-colors duration-200",
                        "hover:border-blue-500 hover:text-blue-500",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500",
                        message.trim() ? "text-gray-700" : "text-gray-400",
                        "disabled:opacity-50"
                    )}
                >
                    <SendHorizontal size={20} className="transition-colors duration-200" />
                </button>
            </form>
        </div>
    );
};

export default ICommonChattingInput;