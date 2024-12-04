// app/chat/page.tsx
"use client";

import { Plus, Search, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { useState } from "react";
import useApiForChatRoomList from "@/hook/useApiForChatRoomList";
import { useRouter } from 'next/navigation';


export default function ChatPage() {
  const { data: rooms, isLoading, isError } = useApiForChatRoomList();
  const [searchQuery, setSearchQuery] = useState("");
  // userouter 선언 하기
  const router = useRouter();

  const filteredRooms = rooms?.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      {/* 헤더 섹션 */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">채팅</h1>
          <p className="text-muted-foreground mt-1">
            팀원들과 실시간으로 대화를 나누세요
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> 새 채팅방 만들기
        </Button>
      </div>

      {/* 검색 바 */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="채팅방 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* 에러 상태 */}
      {isError && (
        <Alert variant="destructive">
          <AlertTitle>에러</AlertTitle>
          <AlertDescription>
            채팅방 목록을 불러오는 데 실패했습니다. 잠시 후 다시 시도해주세요.
          </AlertDescription>
        </Alert>
      )}

      {/* 채팅방 목록 */}
      {!isLoading && !isError && (
        <div className="space-y-4">
          {filteredRooms?.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-medium">채팅방이 없습니다</p>
              <p className="text-muted-foreground">새로운 채팅방을 만들어보세요</p>
            </div>
          ) : (
            filteredRooms?.map((room) => (
              <Card
                key={room.id}
                className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => router.push(`/chat-admin/${room.id}`)}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{room.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        생성일: {new Date(room.created_at).toLocaleDateString()}
                      </span>
                      {room.created_at && (
                        <>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            생성자: {room.owner?.email || "알 수 없음"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}