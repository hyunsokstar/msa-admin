"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Send, X } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import IAnswerBoxForQuestion from '@/components/ApiConverterComponent/IAnswerBoxForQuestion';

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
    const [isPasteMode, setIsPasteMode] = useState(false);

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

    const handlePaste = useCallback(async (e: ClipboardEvent) => {
        if (!isPasteMode) return;
        
        const items = e.clipboardData?.items;
        if (!items) return;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                if (file) {
                    const reader = new FileReader();
                    try {
                        const dataUrl = await new Promise<string>((resolve, reject) => {
                            reader.onload = () => resolve(reader.result as string);
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        });
                        setSelectedImages(prev => [...prev, dataUrl]);
                    } catch (error) {
                        console.error('Error reading pasted image:', error);
                    }
                }
            }
        }
    }, [isPasteMode]);

    useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [handlePaste]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setChatResponse('답변을 생성하고 있습니다...');

            const formData = new FormData();
            formData.append('promptText', question);

            selectedImages.forEach((image, index) => {
                const file = dataURLtoFile(image, `image${index}.png`);
                formData.append('files', file);
            });

            const response = await fetch('/api/chat', {
                method: 'POST',
                body: formData,
            });

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
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="relative flex h-full bg-white rounded-lg overflow-hidden">
                    {/* Left Section */}
                    <div className="w-1/2 p-6 border-r border-gray-200 flex flex-col bg-white">
                        <div className="mb-2">
                            <Textarea
                                placeholder="API 관련 질문을 입력하세요..."
                                className="w-full h-32 resize-none bg-white"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex-grow flex flex-col overflow-hidden">
                            <div className="mb-4 space-y-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <div className="flex gap-2">
                                    <label htmlFor="image-upload" className="flex-1">
                                        <Button 
                                            variant="outline" 
                                            className="w-full bg-white hover:bg-gray-50"
                                            asChild
                                        >
                                            <span>이미지 선택</span>
                                        </Button>
                                    </label>
                                    <Button
                                        variant="outline"
                                        className={`flex-1 ${
                                            isPasteMode 
                                                ? 'bg-red-50 border-red-500 text-red-700 hover:bg-red-100' 
                                                : 'bg-white hover:bg-gray-50'
                                        }`}
                                        onClick={() => setIsPasteMode(!isPasteMode)}
                                    >
                                        {isPasteMode ? '붙여넣기 모드 켜짐' : '붙여넣기 모드 끄기'}
                                    </Button>
                                </div>
                            </div>

                            
                            <div 
                                className={`flex-grow overflow-auto border-2 rounded-lg p-4 ${
                                    isPasteMode ? 'border-red-500 border-dashed' : 'border-gray-300 border-dashed'
                                }`}
                            >
                                <div className="grid grid-cols-2 gap-4">
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
                                {selectedImages.length === 0 && (
                                    <div className="text-center text-gray-500 p-8">
                                        {isPasteMode 
                                            ? '이미지를 붙여넣으세요 (Ctrl+V)'
                                            : '이미지를 선택하거나 붙여넣기 모드를 활성화하세요'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/2 p-6 flex flex-col bg-white">
                        <DialogHeader className="mb-0">
                            {/* <DialogTitle className="text-2xl font-bold text-gray-800">
                                API 타입에 대한 문의
                            </DialogTitle> */}
                            {/* <p className="text-sm text-gray-600 mt-2">
                                API 타입에 대해 궁금한 점이 있으시면 왼쪽에 문의 내용을 작성해 주세요.
                            </p> */}
                        </DialogHeader>

                        <div className="mb-2">
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

                        <IAnswerBoxForQuestion response={chatResponse} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default IDialogButtonForQuestionForChatbotAboutApiType;