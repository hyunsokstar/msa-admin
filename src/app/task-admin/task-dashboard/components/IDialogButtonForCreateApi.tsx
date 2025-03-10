"use client";

import React, { useState } from "react";
import CommonButton2 from "@/components/common/CommonButton2";
import { PlusCircle } from "lucide-react";
import CommonDialogButton from "@/components/common/CommonDialogButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateTaskApiSpec } from "@/hook/useCreateTaskApiSpec";
import { toast } from "react-toastify";

interface IDialogButtonForCreateApiProps {
    taskId: string;
}

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

const IDialogButtonForCreateApi: React.FC<IDialogButtonForCreateApiProps> = ({
    taskId
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        method: 'GET',
        endpoint: '',
        description: '',
        request_spec: '{}',
        response_spec: '{}',
        headers: '{}'
    });

    const createTaskApiSpec = useCreateTaskApiSpec(taskId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const parsedData = {
                ...formData,
                request_spec: JSON.parse(formData.request_spec),
                response_spec: JSON.parse(formData.response_spec),
                headers: JSON.parse(formData.headers)
            };

            createTaskApiSpec.mutate(parsedData, {
                onSuccess: () => {
                    setIsOpen(false);
                    setFormData({
                        method: 'GET',
                        endpoint: '',
                        description: '',
                        request_spec: '{}',
                        response_spec: '{}',
                        headers: '{}'
                    });
                }
            });
        } catch (error) {
            toast.error("Invalid JSON in request/response spec or headers");
        }
    };

    return (
        <CommonDialogButton
            isOpen={isOpen}
            onOpenChange={setIsOpen}  // 수정: 함수 직접 전달
            trigger={
                <CommonButton2
                    variant="primary"
                    icon={<PlusCircle className="h-4 w-4" />}
                >
                    Add API
                </CommonButton2>
            }
            title="Add New API Specification"
            size="full"
        >
            <div className="flex h-full gap-6 px-6">
                {/* Left Section */}
                <div className="w-1/2 flex flex-col">
                    <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col">
                        <div className="space-y-8 flex-grow overflow-y-auto pr-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label>HTTP Method</Label>
                                    <Select
                                        value={formData.method}
                                        onValueChange={(value) =>
                                            setFormData(prev => ({ ...prev, method: value }))
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {HTTP_METHODS.map(method => (
                                                <SelectItem key={method} value={method}>
                                                    {method}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label>Endpoint</Label>
                                    <Input
                                        value={formData.endpoint}
                                        onChange={(e) =>
                                            setFormData(prev => ({ ...prev, endpoint: e.target.value }))
                                        }
                                        placeholder="https://api.example.com/users"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label>Description</Label>
                                <Input
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, description: e.target.value }))
                                    }
                                    placeholder="Brief description of the API"
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Headers</Label>
                                <Textarea
                                    value={formData.headers}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, headers: e.target.value }))
                                    }
                                    placeholder="{}"
                                    className="font-mono h-40"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-6 border-t">
                            <CommonButton2
                                variant="ghost"
                                onClick={() => setIsOpen(false)}
                                type="button"
                            >
                                Cancel
                            </CommonButton2>
                            <CommonButton2
                                variant="primary"
                                type="submit"
                                loading={createTaskApiSpec.isPending}
                            >
                                Create
                            </CommonButton2>
                        </div>
                    </form>
                </div>

                {/* Right Section */}
                <div className="w-1/2 flex flex-col bg-gray-50 rounded-lg">
                    <div className="space-y-8 h-full overflow-y-auto p-6">
                        <div className="space-y-3">
                            <Label>Request Specification</Label>
                            <Textarea
                                value={formData.request_spec}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, request_spec: e.target.value }))
                                }
                                placeholder="{}"
                                className="font-mono h-[calc(35vh)]"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label>Response Specification</Label>
                            <Textarea
                                value={formData.response_spec}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, response_spec: e.target.value }))
                                }
                                placeholder="{}"
                                className="font-mono h-[calc(35vh)]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CommonDialogButton>
    );
};

export default IDialogButtonForCreateApi;