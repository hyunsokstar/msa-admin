// src/app/task-admin/test-docu/[id]/component/ICollapsibleCommentsForTestItem.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApiForCreateCommentForTestItem } from "@/hook/useApiForCreateCommentForTestItem";
import { useUserStore } from "@/store/useUserStore";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    testItemId: string;
}

interface Comment {
    id: string;
    comment: string;
    created_at: string;
    author?: {
        full_name: string;
        profile_image_url?: string;
    };
}

const listVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
};

export default function ICollapsibleCommentsForTestItem({ testItemId }: Props) {
    const [open, setOpen] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    const { isAuthenticated, user } = useUserStore();
    const { mutate: createComment } = useApiForCreateCommentForTestItem(testItemId);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/test-items/${testItemId}/comments`);
            const json = await res.json();
            setComments(json.data ?? []);
        } catch (err) {
            console.error("댓글 로드 실패", err);
        } finally {
            setLoading(false);
        }
    };

    // 마운트 및 testItemId 변경 시 카운트용 불러오기
    useEffect(() => {
        fetchComments();
    }, [testItemId]);

    // open 상태 변동 시 재불러오기
    useEffect(() => {
        if (open) fetchComments();
    }, [open]);

    const handleSubmit = () => {
        if (!newComment.trim() || !user?.id) return;
        createComment(
            { author_id: user.id, comment: newComment.trim() },
            {
                onSuccess: () => {
                    setNewComment("");
                    fetchComments();
                }
            }
        );
    };

    return (
        <div className="mt-2">
            <button
                onClick={() => setOpen((o) => !o)}
                className="text-sm text-blue-600 hover:underline flex items-center"
            >
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex items-center"
                >
                    {open ? (
                        <ChevronUp className="w-4 h-4 mr-1" />
                    ) : (
                        <ChevronDown className="w-4 h-4 mr-1" />
                    )}
                </motion.span>
                댓글 {comments.length}개
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="content"
                        layout
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            duration: 0.3
                        }}
                        style={{ originY: 0 }}
                        className="overflow-hidden bg-yellow-200 border border-dashed border-red-500 p-3 mt-2 rounded-md space-y-2"
                    >
                        {loading ? (
                            <div className="text-gray-500 text-sm">불러오는 중...</div>
                        ) : comments.length === 0 ? (
                            <div className="text-gray-500 text-sm">아직 댓글이 없습니다.</div>
                        ) : (
                            <motion.ul
                                variants={listVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-2 text-sm"
                            >
                                {comments.map((c) => (
                                    <motion.li
                                        key={c.id}
                                        variants={itemVariants}
                                        className="bg-white p-2 rounded shadow-sm border"
                                    >
                                        <div>{c.comment}</div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {c.author?.full_name} •{" "}
                                            {new Date(c.created_at).toLocaleString()}
                                        </div>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}

                        {isAuthenticated && (
                            <div className="flex items-center gap-2 pt-2 border-t mt-2">
                                <Input
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="댓글을 입력하세요"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit();
                                        }
                                    }}
                                />
                                <Button size="icon" onClick={handleSubmit} disabled={!newComment.trim()}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
