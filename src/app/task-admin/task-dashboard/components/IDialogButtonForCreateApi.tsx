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
            onOpenChange={() => setIsOpen(true)}
            trigger={
                <CommonButton2
                    variant="primary"
                    icon={<PlusCircle className="h-4 w-4" />}
                >
                    Add API
                </CommonButton2>
            }
            title="Add New API Specification"
        >
            <div className="h-full flex">
                {/* Left Section */}
                <div className="w-1/2 p-6 border-r">
                    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                        <div className="space-y-6 flex-grow">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
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

                                <div className="space-y-2">
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

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Input
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, description: e.target.value }))
                                    }
                                    placeholder="Brief description of the API"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Headers</Label>
                                <Textarea
                                    value={formData.headers}
                                    onChange={(e) =>
                                        setFormData(prev => ({ ...prev, headers: e.target.value }))
                                    }
                                    placeholder="{}"
                                    className="font-mono h-32"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t">
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
                <div className="w-1/2 p-6 bg-gray-50">
                    <div className="space-y-6 h-full">
                        <div className="space-y-2">
                            <Label>Request Specification</Label>
                            <Textarea
                                value={formData.request_spec}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, request_spec: e.target.value }))
                                }
                                placeholder="{}"
                                className="font-mono h-64"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Response Specification</Label>
                            <Textarea
                                value={formData.response_spec}
                                onChange={(e) =>
                                    setFormData(prev => ({ ...prev, response_spec: e.target.value }))
                                }
                                placeholder="{}"
                                className="font-mono h-64"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </CommonDialogButton>
    );
};

export default IDialogButtonForCreateApi;