import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { ChatMessageProps } from '@/types/typeForCommonChatting';

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isLeft = message.is_left;

    const displayName = message.users?.full_name || 'Unknown';
    const userInitial = displayName[0] || 'U';

    return (
        <div className={cn(
            "flex items-start space-x-3",
            !isLeft ? "flex-row-reverse space-x-reverse" : "flex-row"
        )}>
            <Avatar className="flex-shrink-0">
                <AvatarImage src={message.users?.profile_image_url || ''} />
                <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>

            <div className={cn(
                "max-w-[70%]",
                !isLeft ? "text-right" : "text-left"
            )}>
                <div className={cn(
                    "flex items-center space-x-2 mb-1",
                    !isLeft ? "flex-row-reverse space-x-reverse" : "flex-row"
                )}>
                    <span className="font-medium text-sm">{displayName}</span>
                    <span className="text-xs text-gray-500">
                        {new Date(message.created_at).toLocaleTimeString()}
                    </span>
                </div>
                <div className={cn(
                    "p-3 rounded-lg break-words",
                    !isLeft ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                )}>
                    {message.message}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;