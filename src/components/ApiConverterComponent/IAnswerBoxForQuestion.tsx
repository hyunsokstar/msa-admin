"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Eye, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

    const isTypeScriptCode = (text: string): boolean => {
        // TypeScript 코드인지 확인하는 간단한 체크
        return text.includes('interface') || 
               text.includes('type') || 
               text.includes('export') ||
               /:\s*[A-Z][A-Za-z]*/.test(text); // 타입 표기 패턴 체크
    };

    const renderContent = () => {
        if (isHtmlMode) {
            return <div dangerouslySetInnerHTML={{ __html: response }} />;
        }
        
        if (isTypeScriptCode(response)) {
            return (
                <SyntaxHighlighter 
                    language="typescript"
                    style={oneLight}
                    customStyle={{
                        margin: 0,
                        background: 'transparent'
                    }}
                >
                    {response}
                </SyntaxHighlighter>
            );
        }

        return response || "챗봇 응답이 여기에 표시됩니다.";
    };

    return (
        <Card className="bg-gray-50">
            <div className="flex justify-between py-1">
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
                <Button
                    variant="ghost"
                    size="sm"
                    className={`hover:bg-gray-200 transition-colors ${copied ? "text-green-500" : "text-gray-700"}`}
                    onClick={handleCopyToClipboard}
                >
                    {copied ? (
                        <Check className="w-4 h-4 mr-1" />
                    ) : (
                        <Copy className="w-4 h-4 mr-1" />
                    )}
                    {copied ? "복사됨" : "복사"}
                </Button>
            </div>
            <div className="h-[65vh] w-full overflow-y-scroll whitespace-pre-wrap border-t border-gray-200 p-1">
                {renderContent()}
            </div>
        </Card>
    );
};

export default IAnswerBoxForQuestion;