// C:\Users\terec\msa-admin\src\components\comment\IDialogButtonForCommentForTestItem.tsx
"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CommonDialogButton from "@/components/common/CommonDialogButton";
import { useApiForCreateCommentForTestItem } from "@/hook/useApiForCreateCommentForTestItem";
import { useUserStore } from "@/store/useUserStore";

interface Comment {
    id: string;
    test_item_id: string;
    author_id: string;
    comment: string;
    created_at: string;
    updated_at: string;
    ref_image?: string | null;
    ref_video?: string | null;
    author?: {
        id: string;
        full_name: string;
        profile_image_url?: string;
    };
}

interface Props {
    testItemId: string;
    testItemDescription: string;
}

const IDialogButtonForCommentForTestItem: React.FC<Props> = ({
    testItemId,
    testItemDescription,
}) => {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [commentCount, setCommentCount] = useState<number>(0);
    const [newComment, setNewComment] = useState("");

    const { user, isAuthenticated } = useUserStore();
    const authorId = user?.id;

    const { mutate: createComment, isLoading: isCreating } =
        useApiForCreateCommentForTestItem(testItemId);

    const fetchComments = async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const response = await fetch(`/api/test-items/${testItemId}/comments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("댓글을 불러오는 데 실패했습니다.");
            }

            const data = await response.json();
            setComments(data.data || []);
            setCommentCount(data.data?.length || 0);
        } catch (error) {
            console.error("❌ 댓글 로드 실패:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) {
            fetchComments();
        }
    };

    const handleSubmitComment = () => {
        if (!newComment.trim() || !authorId) return;

        createComment(
            {
                author_id: authorId,
                comment: newComment.trim(),
            },
            {
                onSuccess: () => {
                    setNewComment("");
                    fetchComments(); // 등록 후 목록 갱신
                },
            }
        );
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <CommonDialogButton
            isOpen={open}
            onOpenChange={handleOpenChange}
            widthPercent={70}
            title="댓글 목록"
            trigger={
                <Button
                    variant="ghost"
                    size="icon"
                    title="댓글 보기"
                    className="text-blue-600 hover:text-blue-800 p-2"
                >
                    <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs text-gray-600">({commentCount})</span>
                    </div>
                </Button>
            }
        >
            <div className="space-y-4">
                {/* 항목 설명 */}
                <div className="text-sm font-medium text-gray-700 bg-gray-100 p-3 rounded">
                    <span className="font-bold">테스트 항목:</span> {testItemDescription}
                </div>

                {/* 댓글 목록 */}
                {isLoading ? (
                    <div className="text-sm text-gray-500">댓글을 불러오는 중...</div>
                ) : isError ? (
                    <div className="text-sm text-red-500">댓글 로드에 실패했습니다.</div>
                ) : comments && comments.length > 0 ? (
                    <ul className="space-y-2">
                        {comments.map((c) => (
                            <li
                                key={c.id}
                                className="border rounded p-2 flex items-start space-x-3"
                            >
                                {c.author?.profile_image_url ? (
                                    <img
                                        src={c.author.profile_image_url}
                                        alt={`${c.author.full_name}의 프로필 이미지`}
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                                        {c.author?.full_name?.charAt(0) || "?"}
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm text-gray-900">{c.comment}</div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        {c.author?.full_name || "알 수 없는 작성자"} •{" "}
                                        {new Date(c.created_at).toLocaleString()}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-sm text-gray-400">아직 댓글이 없습니다.</div>
                )}

                {/* 댓글 입력 영역 (로그인한 사람만) */}
                <div className="pt-4 border-t mt-4">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="댓글을 입력하세요..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="flex-1"
                                disabled={isCreating}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmitComment();
                                    }
                                }}
                            />
                            <Button
                                variant="default"
                                size="icon"
                                onClick={handleSubmitComment}
                                disabled={isCreating || !newComment.trim()}
                                title="댓글 등록"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="text-sm text-gray-500 italic">
                            댓글을 작성하려면 로그인해야 합니다.
                        </div>
                    )}
                </div>
            </div>
        </CommonDialogButton>
    );
};

export default IDialogButtonForCommentForTestItem;
