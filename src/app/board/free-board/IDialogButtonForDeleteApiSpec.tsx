import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Trash2 } from 'lucide-react';
import { useApiForDeleteApiSpec } from '@/hook/useApiForDeleteApiSpec';
import CommonButton from '@/components/common/CommonButton';
import { ApiSpec } from '@/types/typeForApiSpec';

interface IDialogButtonForDeleteApiSpecProps {
  spec: ApiSpec;
  onSuccess?: () => void;
}

export const IDialogButtonForDeleteApiSpec: React.FC<IDialogButtonForDeleteApiSpecProps> = ({ 
  spec,
  onSuccess 
}) => {
  const [open, setOpen] = React.useState(false);
  const deleteApiSpec = useApiForDeleteApiSpec();

  const handleDelete = () => {
    deleteApiSpec.mutate(spec.id, {
      onSuccess: () => {
        setOpen(false);
        onSuccess?.();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CommonButton
          variant="ghost"
          size="sm"
          startIcon={<Trash2 className="h-4 w-4" />}
          className="text-red-500 hover:text-red-700"
        >
          삭제
        </CommonButton>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>API 스펙 삭제</DialogTitle>
          <DialogDescription>
            이 API 스펙을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium text-gray-500">삭제할 API 정보:</p>
            <div className="rounded-md bg-gray-50 p-4">
              <p><span className="font-semibold">제목:</span> {spec.title}</p>
              <p><span className="font-semibold">메소드:</span> {spec.method}</p>
              <p><span className="font-semibold">엔드포인트:</span> {spec.endpoint}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <CommonButton
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteApiSpec.isPending}
          >
            취소
          </CommonButton>
          <CommonButton
            variant="destructive"
            onClick={handleDelete}
            isLoading={deleteApiSpec.isPending}
            loadingText="삭제 중..."
          >
            삭제
          </CommonButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForDeleteApiSpec;