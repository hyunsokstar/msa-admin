import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUploader2 from '@/components/file-uploader/ImageUploader2';

interface DialogForSubTodoUpdateProps {
    isOpen: boolean;
    onClose: () => void;
    todo: {
        content: string;
        task_result_image: string | null;
        ref_task_note: string | null;
    };
    onUpdate: (updatedData: {
        content: string;
        task_result_image: string | null;
        ref_task_note: string | null;
    }) => void;
}

const DEFAULT_FORM_DATA: {
    content: string;
    task_result_image: string | null;
    ref_task_note: string | null;
} = {
    content: '',
    task_result_image: null,
    ref_task_note: null
};

const DialogForSubTodoUpdate: React.FC<DialogForSubTodoUpdateProps> = ({
    isOpen,
    onClose,
    todo,
    onUpdate,
}) => {
    const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

    // Update formData when todo changes
    useEffect(() => {
        if (todo) {
            setFormData({
                content: todo.content,
                task_result_image: todo.task_result_image,
                ref_task_note: todo.ref_task_note
            });
        }
    }, [todo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updating subtodo with:', formData);
        onUpdate(formData);
    };

    const handleImageUpload = (fileUrl: string) => {
        setFormData(prev => ({
            ...prev,
            task_result_image: fileUrl
        }));
    };

    // Reset form when dialog closes
    const handleClose = () => {
        setFormData(DEFAULT_FORM_DATA);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-4xl bg-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">서브 할일 수정</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Left Column - Basic Information */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="content">할일 내용</Label>
                                <Textarea
                                    id="content"
                                    value={formData.content}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        content: e.target.value
                                    }))}
                                    placeholder="할일 내용을 입력하세요"
                                    className="min-h-[120px]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="ref_task_note">참고 노트 URL</Label>
                                <Input
                                    id="ref_task_note"
                                    type="url"
                                    value={formData.ref_task_note || ''}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        ref_task_note: e.target.value || null
                                    }))}
                                    placeholder="https://"
                                />
                            </div>
                        </div>

                        {/* Right Column - Image Upload */}
                        <div className="space-y-2">
                            <Label>결과 이미지</Label>
                            <ImageUploader2
                                initialImage={formData.task_result_image ?? undefined}
                                onUploadComplete={handleImageUpload}
                                isUpdate={true}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className="w-24"
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            disabled={!formData.content.trim()}
                            className="w-24"
                        >
                            수정
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogForSubTodoUpdate;