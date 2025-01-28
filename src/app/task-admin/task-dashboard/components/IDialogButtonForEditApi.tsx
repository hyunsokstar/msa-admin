// src/app/task-admin/task-dashboard/components/IDialogButtonForEditApi.tsx
"use client";

import React, { useState } from "react";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import { Pencil } from "lucide-react";
import CommonButton2 from "@/components/common/CommonButton2";
import ApiSpecForm from "./ApiSpecForm";
import { EditApiSpecRequest } from "@/api/task/type/typeForApiSpecForTask";
import CommonDialogButton from "@/components/common/CommonDialogButton";
import { useApiForEditTaskApiSpec } from "@/hook/task/useApiForEditTaskApiSpec";

interface IDialogButtonForEditApiProps {
    taskId: string;
    apiSpec: TaskApiSpec;
}

// IDialogButtonForEditApi.tsx
const IDialogButtonForEditApi: React.FC<IDialogButtonForEditApiProps> = ({
    taskId,
    apiSpec
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const editApiSpecMutation = useApiForEditTaskApiSpec(taskId);

    const handleSubmit = async (data: EditApiSpecRequest) => {
        try {
            await editApiSpecMutation.mutateAsync({
                specId: apiSpec.id,
                data
            });
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to edit API spec:', error);
        }
    };

    return (
        <CommonDialogButton
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            trigger={
                <CommonButton2
                    variant="ghost"
                    icon={<Pencil className="h-4 w-4" />}
                    className="px-2"
                />
            }
            title={
                <div className="flex items-center gap-2">
                    <Pencil className="h-5 w-5" />
                    API 스펙 수정
                </div>
            }
            size="full"
        >
            <ApiSpecForm
                onSubmit={handleSubmit}
                onCancel={() => setIsOpen(false)}
                initialData={apiSpec}
            />
        </CommonDialogButton>
    );
};

export default IDialogButtonForEditApi;