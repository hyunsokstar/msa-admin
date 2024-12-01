"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Send, X } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import axios from 'axios';

interface IDialogButtonForQuestionForChatbotAboutApiTypeProps {
    initialContent?: string;
}

const IDialogButtonForQuestionForChatbotAboutApiType: React.FC<IDialogButtonForQuestionForChatbotAboutApiTypeProps> = ({ 
    initialContent 
}) => {
    const [question, setQuestion] = useState(initialContent || '');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [chatResponse, setChatResponse] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isDialogOpen) {
            setQuestion(initialContent || '');
        }
    }, [isDialogOpen, initialContent]);

    // base64 to File 변환 함수
    const dataURLtoFile = (dataurl: string, filename: string): File => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages: string[] = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            try {
                const dataUrl = await new Promise<string>((resolve, reject) => {
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
                
                newImages.push(dataUrl);
            } catch (error) {
                console.error('Error reading file:', error);
            }
        }

        setSelectedImages(prev => [...prev, ...newImages]);
        
        if (e.target) {
            e.target.value = '';
        }
    };

    const handleRemoveImage = (index: number) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setChatResponse('답변을 생성하고 있습니다...');

            // FormData 생성
            const formData = new FormData();
            formData.append('promptText', question);

            // 선택된 이미지들을 File 객체로 변환하여 추가
            selectedImages.forEach((image, index) => {
                const file = dataURLtoFile(image, `image${index}.png`);
                formData.append('files', file);
            });

            // API 요청
            const response = await fetch('/api/chat', {
                method: 'POST',
                body: formData,
            });

            console.log("Api response:", response);
            

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            setChatResponse(data.answer);

        } catch (error) {
            console.error('Error sending request:', error);
            setChatResponse('죄송합니다. 요청 처리 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 hover:bg-gray-100 transition-colors text-gray-500"
                >
                    <MessageCircle className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-white shadow-2xl border-0">
                {/* ... (이전 코드와 동일) ... */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="relative flex h-full bg-white rounded-lg overflow-hidden">
                    {/* Left Section */}
                    <div className="w-1/2 p-6 border-r border-gray-200 flex flex-col bg-white">
                        <div className="mb-4">
                            <Textarea
                                placeholder="API 관련 질문을 입력하세요..."
                                className="w-full h-32 resize-none bg-white"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex-grow flex flex-col overflow-hidden">
                            <div className="mb-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload">
                                    <Button 
                                        variant="outline" 
                                        className="w-full bg-white hover:bg-gray-50"
                                        asChild
                                    >
                                        <span>이미지 선택</span>
                                    </Button>
                                </label>
                            </div>
                            
                            <div className="flex-grow overflow-auto">
                                <div className="grid grid-cols-3 gap-4 p-2">
                                    {selectedImages.map((image, index) => (
                                        <div 
                                            key={index} 
                                            className="relative aspect-square group border border-gray-200 rounded-lg overflow-hidden"
                                        >
                                            <img
                                                src={image}
                                                alt={`Selected ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                            >
                                                <X className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 p-6 flex flex-col bg-white">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl font-bold text-gray-800">
                                API 타입에 대한 문의
                            </DialogTitle>
                            <p className="text-sm text-gray-600 mt-2">
                                API 타입에 대해 궁금한 점이 있으시면 왼쪽에 문의 내용을 작성해 주세요.
                            </p>
                        </DialogHeader>

                        <div className="mb-4">
                            <Button 
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={handleSubmit}
                                disabled={isLoading || !question.trim()}
                            >
                                {isLoading ? (
                                    <span>처리중...</span>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        챗봇에게 질문하기
                                    </>
                                )}
                            </Button>
                        </div>

                        <Card className="flex-grow p-4 bg-gray-50">
                            <div className="h-full overflow-auto whitespace-pre-wrap">
                                {chatResponse || '챗봇 응답이 여기에 표시됩니다.'}
                            </div>
                        </Card>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default IDialogButtonForQuestionForChatbotAboutApiType;