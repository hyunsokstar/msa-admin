// src\app\board\resource-board\page.tsx

"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourcesBoardType } from "@/types/typeForResourcesBoard";
import { useApiForGetResourcesBoardList } from "@/hook/board/useApiForGetResourcesBoardList";

const ResourceBoard = () => {
    // React Query를 사용한 데이터 fetch
    const { data: resourcesData, isLoading, error } = useApiForGetResourcesBoardList({
        page: 1,
        pageSize: 10
    });

    // 새 자료 추가를 위한 상태
    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const titleInputRef = useRef<HTMLInputElement>(null);

    // 자료 추가 핸들러
    const handleAddResource = () => {
        if (!newTitle || !newDescription) return;

        // TODO: API 추가 구현 필요
        // const newResource = {
        //     title: newTitle,
        //     description: newDescription,
        // };

        setNewTitle("");
        setNewDescription("");
        titleInputRef.current?.focus();
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading resources</div>;

    return (
        <div className="flex max-w-6xl mx-auto p-6 gap-6 h-[calc(100vh-100px)]">
            {/* 왼쪽 입력 폼 */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-md border">
                <h2 className="text-lg font-semibold mb-4">📌 새 자료 추가</h2>
                <Input
                    ref={titleInputRef}
                    placeholder="자료 제목"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="mb-3"
                />
                <Textarea
                    placeholder="자료 설명"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="mb-3"
                />
                <Button onClick={handleAddResource} className="w-full">
                    추가하기
                </Button>
            </div>

            {/* 오른쪽 자료 목록 */}
            <div className="w-2/3 overflow-y-auto p-4 bg-gray-50 rounded-lg shadow-md border h-[calc(100vh-150px)]">
                <h2 className="text-lg font-semibold mb-4">📂 자료 목록</h2>
                <div className="grid gap-4">
                    {resourcesData && resourcesData.data.length > 0 ? (
                        resourcesData.data.map((resource: ResourcesBoardType) => (
                            <Card key={resource.id} className="border">
                                <CardHeader>
                                    <CardTitle>{resource.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">{resource.description}</p>
                                    <p className="text-sm text-gray-400 mt-2">
                                        {new Date(resource.created_at).toLocaleDateString()}
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <p className="text-gray-500">저장된 자료가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResourceBoard;