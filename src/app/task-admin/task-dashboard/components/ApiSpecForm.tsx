// ApiSpecForm.tsx
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import { EditApiSpecRequest } from "@/api/task/type/typeForApiSpecForTask";
import CommonSelectBox from "./CommonSelectBox";
import CommonButton2 from "@/components/common/CommonButton2";
import { X, Save } from "lucide-react";

const HTTP_METHODS = [
    { value: 'GET', label: 'GET' },
    { value: 'POST', label: 'POST' },
    { value: 'PUT', label: 'PUT' },
    { value: 'DELETE', label: 'DELETE' },
    { value: 'PATCH', label: 'PATCH' }
];

interface ApiSpecFormProps {
    onSubmit: (data: EditApiSpecRequest) => void;
    onCancel: () => void;
    initialData?: TaskApiSpec;
}

const ApiSpecForm: React.FC<ApiSpecFormProps> = ({
    onSubmit,
    onCancel,
    initialData
}) => {
    const [selectedMethod, setSelectedMethod] = useState(initialData?.method || 'GET');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const data: EditApiSpecRequest = {
                method: selectedMethod,
                endpoint: formData.get('endpoint') as string,
                description: formData.get('description') as string,
                request_spec: JSON.parse(formData.get('request_spec') as string || '{}'),
                response_spec: JSON.parse(formData.get('response_spec') as string || '{}'),
                headers: JSON.parse(formData.get('headers') as string || '{}'),
            };
            await onSubmit(data);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-2">
                    <Label htmlFor="method">HTTP Method</Label>
                    <CommonSelectBox
                        options={HTTP_METHODS}
                        value={selectedMethod}
                        onChange={setSelectedMethod}
                        name="method"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="endpoint">Endpoint</Label>
                    <Input
                        id="endpoint"
                        name="endpoint"
                        defaultValue={initialData?.endpoint}
                        placeholder="/api/resource"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    defaultValue={initialData?.description || ''}
                    placeholder="API description"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="headers">Headers</Label>
                <Textarea
                    id="headers"
                    name="headers"
                    defaultValue={JSON.stringify(initialData?.headers || {}, null, 2)}
                    placeholder="{}"
                    className="font-mono text-sm h-24"
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="request_spec">Request Specification</Label>
                    <Textarea
                        id="request_spec"
                        name="request_spec"
                        defaultValue={JSON.stringify(initialData?.request_spec || {}, null, 2)}
                        placeholder="{}"
                        className="font-mono text-sm h-80 min-h-[20rem]"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="response_spec">Response Specification</Label>
                    <Textarea
                        id="response_spec"
                        name="response_spec"
                        defaultValue={JSON.stringify(initialData?.response_spec || {}, null, 2)}
                        placeholder="{}"
                        className="font-mono text-sm h-80 min-h-[20rem]"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <CommonButton2
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    icon={<X className="h-4 w-4" />}
                >
                    Cancel
                </CommonButton2>
                <CommonButton2
                    type="submit"
                    variant="primary"
                    loading={isSubmitting}
                    icon={<Save className="h-4 w-4" />}
                >
                    Update
                </CommonButton2>
            </div>
        </form>
    );
};

export default ApiSpecForm;