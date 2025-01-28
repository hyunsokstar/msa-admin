// src/app/task-admin/task-dashboard/components/IDialogButtonForDeleteApi.tsx
"use client";

import React, { useState } from "react";
import { TaskApiSpec } from "@/types/task/typeForTaskDashboard";
import { Trash2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommonButton2 from "@/components/common/CommonButton2";
import CommonDialogButton from "@/components/common/CommonDialogButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getMethodColor } from "@/lib/utils";
import { useApiForDeleteTaskApiSpec } from "@/hook/task/useApiForDeleteTaskApiSpec";

interface IDialogButtonForDeleteApiProps {
    taskId: string;
    apiSpec: TaskApiSpec;
}

const IDialogButtonForDeleteApi: React.FC<IDialogButtonForDeleteApiProps> = ({
    taskId,
    apiSpec
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const deleteApiSpecMutation = useApiForDeleteTaskApiSpec(taskId);

    const handleDelete = async () => {
        try {
            await deleteApiSpecMutation.mutateAsync(apiSpec.id);
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to delete API spec:', error);
        }
    };

    return (
        <CommonDialogButton
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            trigger={
                <CommonButton2
                    variant="ghost"
                    icon={<Trash2 className="h-4 w-4 text-red-500" />}
                    className="hover:bg-gray-100 px-2 text-gray-600 hover:text-gray-800"
                />
            }
            title={
                <div className="flex items-center gap-2 text-gray-800">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    API 스펙 삭제
                </div>
            }
        >
            <div className="py-4">
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="mb-2">
                            <Badge className={cn("font-mono", getMethodColor(apiSpec.method))}>
                                {apiSpec.method}
                            </Badge>
                        </div>
                        <div className="font-mono text-sm text-gray-700 break-all">
                            {apiSpec.endpoint}
                        </div>
                        {apiSpec.description && (
                            <div className="mt-2 text-sm text-gray-600">
                                {apiSpec.description}
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-red-500 font-medium">
                        ⚠️ 이 API 스펙을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                    </p>
                </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-600 hover:text-gray-800"
                >
                    취소
                </Button>
                <CommonButton2
                    variant="danger"
                    icon={<Trash2 className="h-4 w-4" />}
                    onClick={handleDelete}
                    className="gap-2 hover:bg-red-700"
                >
                    삭제
                </CommonButton2>
            </div>
        </CommonDialogButton>
    );
};

export default IDialogButtonForDeleteApi;