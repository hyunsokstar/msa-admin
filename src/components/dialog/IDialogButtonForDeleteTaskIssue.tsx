"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useApiForDeleteTaskIssue } from "@/hook/useApiForDeleteTaskIssue";

interface IDialogButtonForDeleteTaskIssueProps {
    issueId: number;
    issueTitle: string;
    filter: any;
}

const IDialogButtonForDeleteTaskIssue: FC<IDialogButtonForDeleteTaskIssueProps> = ({ issueId, issueTitle, filter }) => {
    const { deleteIssue, isDeleting } = useApiForDeleteTaskIssue(filter);

    const handleDelete = () => {
        deleteIssue({ issueId, issueTitle });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
            {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </Button>
    );
};

export default IDialogButtonForDeleteTaskIssue;