import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessageProps } from "@/types/typeForCommonChatting";
import { useUserStore } from "@/store/useUserStore";

const notificationSound = "/sounds/message-notification.mp3";

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
   const { user } = useUserStore();
   const isLeft = message.is_left;
   const displayName = message.sender?.full_name || "Unknown";
   const userInitial = displayName[0] || "U";
   const isRecipientCurrentUser = message.recipient?.id === user?.id;

   // 메시지가 로그인 유저에게 온 경우 알림 소리 재생
   useEffect(() => {
       if (isRecipientCurrentUser) {
           const sound = new Audio(notificationSound);
           sound.play().catch((error) => console.error("Error playing sound:", error));
       }
   }, [isRecipientCurrentUser]);

   return (
       <div className={cn(
           "flex items-start space-x-3",
           !isLeft ? "flex-row-reverse space-x-reverse" : "flex-row"
       )}>
           <Avatar className="flex-shrink-0">
               <AvatarImage src={message.sender?.profile_image_url || ""} />
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
                   <div className={cn(
                       "flex items-center",
                       !isLeft ? "flex-row-reverse" : "flex-row",
                       !isLeft ? "space-x-reverse" : "space-x-1"
                   )}>
                       <span className="font-medium text-sm">{displayName}</span>
                       {message.recipient && (
                           <span className={cn(
                               "text-sm",
                               isRecipientCurrentUser
                                   ? "bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded"
                                   : "text-gray-500"
                           )}>
                               → @{message.recipient.full_name}
                           </span>
                       )}
                   </div>
                   <span className="text-xs text-gray-500">
                       {new Date(message.created_at).toLocaleTimeString()}
                   </span>
               </div>
               <div className="flex items-start space-x-2">
                   <div className={cn(
                       "p-3 rounded-lg break-words",
                       !isLeft ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                   )}>
                       {message.message}
                   </div>
                   {message.recipient && message.task_link && (
                       <a
                           href={message.task_link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex-shrink-0 p-2 text-gray-500 hover:text-blue-500 transition-colors"
                       >
                           <ExternalLink size={16} />
                       </a>
                   )}
               </div>
           </div>
       </div>
   );
};

export default ChatMessage;