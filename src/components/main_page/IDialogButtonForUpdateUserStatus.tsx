"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/useUserStore";
import { useApiForUpdateUserStatus } from "@/hook/useApiForUpdateUserStatus";
import { CheckCircle, PauseCircle, XCircle, Coffee, BookOpen, Users } from "lucide-react";
import CommonDialogButton from "../common/CommonDialogButton";

interface IDialogButtonForUpdateUserStatusProps {
    userId: string;
    currentStatus: string;
}

const statusOptions = [
    { label: "업무중", value: "working", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { label: "휴식중", value: "break", icon: <Coffee className="w-5 h-5 text-yellow-500" /> },
    { label: "자리 비움", value: "away", icon: <PauseCircle className="w-5 h-5 text-orange-500" /> },
    { label: "휴가", value: "vacation", icon: <XCircle className="w-5 h-5 text-red-500" /> },
    { label: "스터디중", value: "studying", icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
    { label: "회의중", value: "meeting", icon: <Users className="w-5 h-5 text-purple-500" /> },
];

const getStatusLabel = (value: string) => {
    return statusOptions.find(option => option.value === value)?.label || "오프라인";
};

const getStatusIcon = (value: string) => {
    return statusOptions.find(option => option.value === value)?.icon;
};

const IDialogButtonForUpdateUserStatus = ({ userId, currentStatus }: IDialogButtonForUpdateUserStatusProps) => {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const updateUserStatus = useApiForUpdateUserStatus();
    const currentUser = useUserStore((state) => state.user);

    const handleUpdateStatus = async (newStatus: 'working' | 'break' | 'away' | 'vacation' | 'studying' | 'meeting' | 'offline') => {
        if (currentUser?.id === userId) {
            try {
                await updateUserStatus.mutateAsync({ userId, status: newStatus });
                setSelectedStatus(newStatus);
            } catch (error) {
                console.error('Failed to update status:', error);
            }
        }
    };

    return (
        <CommonDialogButton
            trigger={
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    {getStatusIcon(currentStatus)}
                    <span>{getStatusLabel(currentStatus)}</span>
                </Button>
            }
            title="상태 변경"
            size="md"
        >
            <div className="grid grid-cols-2 gap-3 mt-4">
                {statusOptions.map(({ label, value, icon }) => (
                    <Button
                        key={value}
                        variant={selectedStatus === value ? "default" : "outline"}
                        className={`flex items-center gap-2 justify-start transition-all ${selectedStatus === value
                            ? "ring-2 ring-primary ring-offset-2"
                            : "hover:ring-1 hover:ring-primary/30"
                            }`}
                        onClick={() => handleUpdateStatus(value as 'working' | 'break' | 'away' | 'vacation' | 'studying' | 'meeting' | 'offline')}
                    >
                        {icon}
                        {label}
                    </Button>
                ))}
            </div>
        </CommonDialogButton>
    );
};

export default IDialogButtonForUpdateUserStatus;