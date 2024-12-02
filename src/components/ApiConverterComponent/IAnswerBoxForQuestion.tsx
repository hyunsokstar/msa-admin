// src/components/ApiConverterComponent/IAnswerBoxForQuestion.tsx
"use client";
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Eye, Copy, Check } from 'lucide-react';

interface IAnswerBoxForQuestionProps {
    response: string;
}

const IAnswerBoxForQuestion: React.FC<IAnswerBoxForQuestionProps> = ({ response }) => {
    const [isHtmlMode, setIsHtmlMode] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(response);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("복사 중 오류 발생:", error);
        }
    };

    return (
        <Card className="flex-grow p-4 bg-gray-50 relative">
            <div className="flex justify-between mb-2">
                {/* 왼쪽 상단 버튼들 */}
                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-gray-200 transition-colors text-gray-700"
                        onClick={() => setIsHtmlMode(!isHtmlMode)}
                    >
                        {isHtmlMode ? (
                            <>
                                <Eye className="w-4 h-4 mr-1" />
                                기본 모드
                            </>
                        ) : (
                            <>
                                <Code className="w-4 h-4 mr-1" />
                                HTML 모드
                            </>
                        )}
                    </Button>
                </div>
                {/* 오른쪽 상단 복사 버튼 */}
                <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:bg-gray-200 transition-colors ${copied ? 'text-green-500' : 'text-gray-700'}`}
                    onClick={handleCopyToClipboard}
                >
                    {copied ? (
                        <Check className="w-4 h-4 mr-1" />
                    ) : (
                        <Copy className="w-4 h-4 mr-1" />
                    )}
                    {copied ? '복사됨' : '복사'}
                </Button>
            </div>
            <div className="h-full overflow-auto whitespace-pre-wrap">
                {isHtmlMode ? (
                    <div dangerouslySetInnerHTML={{ __html: response }} />
                ) : (
                    response || '챗봇 응답이 여기에 표시됩니다?'
                )}
            </div>
        </Card>
    );
};

export default IAnswerBoxForQuestion;
