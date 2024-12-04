// app/chat/[id]/page.tsx
"use client";

import { use } from "react";
import { useState } from "react";
import { Send, Paperclip, Users, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import useApiForGetChatRoomDetail from "@/hook/useApiForGetChatRoomDetail";

export default function ChatRoomPage({ params }: { params: Promise<{ id: string }> }) {
  // params를 use()로 언래핑
  const resolvedParams = use(params);
  const [message, setMessage] = useState("");
  const { data: room, isLoading, error } = useApiForGetChatRoomDetail(resolvedParams.id);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="border-b p-4">
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-16 w-64" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>
          채팅방 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* 채팅방 헤더 - 실제 API 데이터 활용 */}
      <div className="border-b p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {room?.name}
              <Badge variant="outline" className="ml-2">
                {room?.type || "일반"}
              </Badge>
            </h2>
            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Crown className="h-4 w-4" />
                {room?.owner ? (
                  <span className="flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback>{room.owner.full_name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    {room.owner.full_name || room.owner.email || '방장'}
                  </span>
                ) : (
                  "방장 정보 없음"
                )}
              </span>
              <span>•</span>
              <span>생성일: {new Date(room?.created_at || '').toLocaleDateString()}</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            채팅방 정보
          </Button>
        </div>
      </div>

      {/* 메시지 영역 - API 미구현 */}
      <div className="flex-1 p-4 bg-secondary/10">
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>메시지 영역 - API 구현 예정</p>
        </div>
      </div>

      {/* 메시지 입력 영역 - API 미구현 */}
      <div className="border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요... (API 구현 예정)"
            disabled
          />
          <Button disabled>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}