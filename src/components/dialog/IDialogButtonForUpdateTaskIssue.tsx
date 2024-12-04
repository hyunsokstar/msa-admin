import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useUserStore } from '@/store/useUserStore';
import { toast } from 'react-toastify';
import { useApiForUpdateIssue } from '@/hook/useApiForUpdateIssue';
import { Issue, UpdateIssueDto, IssueFilter } from '@/types/typeForTaskIssue';
import IRegisterFormForUpdateIssue from '../form/register/IRegisterFormForUpdateIssue';

interface DialogButtonProps {
  issue: Issue;
  filter?: IssueFilter;
}

const IDialogButtonForUpdateTaskIssue = ({ issue, filter }: DialogButtonProps) => {
  const { user } = useUserStore();
  const updateIssueMutation = useApiForUpdateIssue(filter);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: UpdateIssueDto) => {
    if (!user?.id) {
      toast.error("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }
    try {
      await updateIssueMutation.mutateAsync({
          id: issue.id,
          data:data
      });
      toast.success("이슈가 성공적으로 수정되었습니다.");
      setOpen(false);
    } catch (error) {
      toast.error("이슈 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error('Issue update failed:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="
          min-w-[80vw]
          md:min-w-[70vw] 
          lg:min-w-[1200px] 
          h-[80vh]
          bg-white 
          border 
          shadow-lg 
          p-0
          overflow-hidden
        "
      >
        <div className="flex flex-col h-full">
          <DialogTitle className="text-xl font-semibold text-gray-900 p-6 border-b">
            이슈 수정
          </DialogTitle>
          
          <div className="flex-1 overflow-y-auto p-6 mb-2">
            <IRegisterFormForUpdateIssue 
              defaultValues={issue}
              userEmail={user?.email || ''}
              onSubmit={handleSubmit}
              isUpdating={updateIssueMutation.isPending}
            />
          </div>

          
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForUpdateTaskIssue;