// components/dialog/IDialogButtonForDeleteApiName.tsx
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApiForDeleteApiName } from '@/hook/useApiForDeleteApiName';

interface IDialogButtonForDeleteApiNameProps {
    id: number;
    apiName: string;
}

const IDialogButtonForDeleteApiName: React.FC<IDialogButtonForDeleteApiNameProps> = ({ id, apiName }) => {
    const { deleteApiName, isDeleting } = useApiForDeleteApiName();

    const handleDelete = () => {
        deleteApiName({ id, apiName });
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-100"
            onClick={handleDelete}
            disabled={isDeleting}
        >
            <Trash2 className="h-5 w-5" />
        </Button>
    );
};

export default IDialogButtonForDeleteApiName;