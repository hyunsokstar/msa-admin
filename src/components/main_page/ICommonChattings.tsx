"use client";
import { useQuery } from "@tanstack/react-query";
import { apiForGetCommonChattings } from "@/api/main/apiForCommonChattings";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCommonChattings } from "@/hook/main/useCommonChattings";
import { useUserStore } from "@/store/useUserStore";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import ICommonChattingInput from "./ICommonChattingInput";

interface ICommonChattingsProps {
    className?: string;
}

export default function ICommonChattings({ className }: ICommonChattingsProps) {
    const user = useUserStore((state) => state.user);
    const scrollRef = useRef<HTMLDivElement>(null);

    useCommonChattings();

    const { data: chattingsData, refetch } = useQuery({
        queryKey: ["commonChattings"],
        queryFn: () => apiForGetCommonChattings(),
    });

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chattingsData?.data]);

    return (
        <Card className={cn("flex flex-col", className)}>
            <div className="px-4 py-3 border-b">
                <h3 className="text-lg font-medium">공용 채팅방</h3>
            </div>

            <ScrollArea ref={scrollRef} className="flex-1">
                <div className="space-y-4 p-4">
                    {chattingsData?.data?.map((chat) => {
                        const isMyMessage = chat.user_id === user?.id;

                        return (
                            <div
                                key={chat.id}
                                className={cn(
                                    "flex items-start space-x-3",
                                    !isMyMessage ? "flex-row-reverse space-x-reverse" : ""
                                )}
                            >
                                <Avatar className="flex-shrink-0">
                                    <AvatarImage src={chat.users.profile_image_url || ''} />
                                    <AvatarFallback>{chat.users.full_name[0]}</AvatarFallback>
                                </Avatar>
                                <div className={cn(
                                    "max-w-[70%]",
                                    !isMyMessage ? "text-right" : "text-left"
                                )}>
                                    <div className={cn(
                                        "flex items-center space-x-2 mb-1",
                                        !isMyMessage ? "flex-row-reverse space-x-reverse" : ""
                                    )}>
                                        <span className="font-medium text-sm">{chat.users.full_name}</span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(chat.created_at).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-lg break-words",
                                        isMyMessage
                                            ? "bg-blue-100 text-gray-800"
                                            : "bg-gray-100 text-gray-800"
                                    )}>
                                        {chat.message}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>

            <div className="pt-2">
                <ICommonChattingInput onSuccess={refetch} />
            </div>
        </Card>
    );
}