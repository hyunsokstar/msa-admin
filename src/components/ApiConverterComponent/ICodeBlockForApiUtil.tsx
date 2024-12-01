// src/components/ApiConverterComponent/ICodeBlockForApiUtil.tsx
"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, Code2 } from 'lucide-react';
import IDialogButtonForQuestionForChatbotAboutApiType from './IDialogButtonForQuestionForChatbotAboutApiType';

interface ICodeBlockForApiUtilProps {
    title: string;
    code: string;
    codeKey: "code1" | "code2" | "code3" | "code4";
    copyToClipboard: (text: string, codeKey: "code1" | "code2" | "code3" | "code4") => void;
    copyStates: { [key: string]: boolean };
    hasDialogButtonForChatbot?: boolean;
}

const ICodeBlockForApiUtil: React.FC<ICodeBlockForApiUtilProps> = ({ title, code, codeKey, copyToClipboard, copyStates, hasDialogButtonForChatbot }) => (
    <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center p-3 border-b border-gray-100 bg-gray-50">
            <div className="font-medium text-gray-700 flex items-center gap-2">
                <Code2 className="h-4 w-4 text-blue-500" />
                {title}
            </div>
            <div className="flex items-center gap-2">
                {code && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`h-8 hover:bg-gray-100 transition-colors ${
                            copyStates[codeKey] ? 'text-green-500' : 'text-gray-500'
                        }`}
                        onClick={() => copyToClipboard(code, codeKey)}
                    >
                        {copyStates[codeKey] ? (
                            <Check className="h-4 w-4" />
                        ) : (
                            <Copy className="h-4 w-4" />
                        )}
                    </Button>
                )}
                {hasDialogButtonForChatbot && (
                    <IDialogButtonForQuestionForChatbotAboutApiType initialContent={code} />
                )}
            </div>
        </div>
        <div className="p-4 bg-gray-50/50 rounded-b-lg">
            <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 overflow-x-auto">
                {code || '코드가 생성되지 않았습니다.'}
            </pre>
        </div>
    </div>
);

export default ICodeBlockForApiUtil;
