import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent } from "@/components/ui/card";
import useApiForCreateIssue from '@/hook/useApiForCreateIssue';
import { useRouter } from 'next/navigation';
import { CreateIssueDto } from '@/types/typeForTaskIssue';
import IRegisterFormForCreateIssue from '../form/register/IRegisterFormForCreateIssue';

interface DialogButtonProps {
  isDisabled: boolean;
}

const IDialogButtonForRegisterIssue = ({ isDisabled }: DialogButtonProps) => {
  const router = useRouter();
  const { user, isAuthenticated } = useUserStore();
  const createIssueMutation = useApiForCreateIssue();

  const [open, setOpen] = useState(false);
  const [issueData, setIssueData] = useState<CreateIssueDto>({
    title: "",
    description: "",
    priority: "Medium",
    manager: "",
    type: "Bug",
    category1: "shop",
    ref_img_url1: "",
    ref_img_url2: "",
    ref_img_url3: "",
  });

  useEffect(() => {
    if (user?.id) {
      setIssueData((prev) => ({
        ...prev,
        manager: user.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (open && user?.id) {
      setIssueData((prev) => ({
        ...prev,
        manager: user.id,
      }));
    }
  }, [open, user]);

  const handleSubmit = async (data: CreateIssueDto) => {

    console.log("save button click check : ", data);
    

    if (data.title.trim() === "") {
      alert("제목은 필수 입력 항목입니다.");
      return;
    }

    if (!user?.id) {
      alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      console.log("save button click check 2: ", data);
      
      await createIssueMutation.mutateAsync({
        ...data,
        manager: user.id,
      });
      setOpen(false);
    } catch (error) {
      console.error('Issue creation failed:', error);
    }
  };

  const LoginRequired = () => (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        로그인 후 이슈를 등록할 수 있습니다.
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={isDisabled}

        >
          신규 이슈 등록
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border shadow-lg w-[50vw] max-w-none overflow-y-auto">
        <DialogTitle className="text-lg font-semibold text-gray-900">신규 이슈 등록</DialogTitle>

        {!isAuthenticated ? (
          <LoginRequired />
        ) : (
          <IRegisterFormForCreateIssue
            defaultValues={issueData}
            userEmail={user?.email || ''}
            onSubmit={(data) => handleSubmit(data)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForRegisterIssue;