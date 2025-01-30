import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import ChatMessage from './ChatMessage';
import ICommonChattingInput from './ICommonChattingInput';
import { cn } from '@/lib/utils';
import { ChatContainerProps } from '@/types/typeForCommonChatting';

const ChatContainer: React.FC<ChatContainerProps> = ({ className, messages, onSuccess }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Card className={cn("flex flex-col h-full", className)}>
            <div className="px-4 py-3 border-b">
                <h3 className="text-lg font-medium">공용 채팅방</h3>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="space-y-4">
                    {messages?.map((message) => (
                        <ChatMessage
                            key={message.id}
                            message={message}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="pt-2">
                <ICommonChattingInput onSuccess={onSuccess} />
            </div>
        </Card>
    );
};

export default ChatContainer;