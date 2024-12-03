import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateIssueDto, PriorityLevel, SystemCategory, IssueType } from "@/types/typeForTaskIssue";
import { useUserStore } from '@/store/useUserStore';
import { Card, CardContent } from "@/components/ui/card";
import { LogIn } from 'lucide-react';
import useApiForCreateIssue from '@/hook/useApiForCreateIssue';
import { useRouter } from 'next/navigation';

const IDialogButtonForRegisterIssue = () => {
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
    category: "shop",
  });

  useEffect(() => {
    if (user?.id) {
      setIssueData(prev => ({
        ...prev,
        manager: user.id
      }));
    }
  }, [user]);

  useEffect(() => {
    if (open && user?.id) {
      setIssueData(prev => ({
        ...prev,
        manager: user.id
      }));
    }
  }, [open, user]);

  const handleInputChange = (key: keyof CreateIssueDto, value: string) => {
    setIssueData((prev: CreateIssueDto) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (issueData.title.trim() === "") {
      alert("제목은 필수 입력 항목입니다.");
      return;
    }

    if (!user?.id) {
      alert("사용자 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      await createIssueMutation.mutateAsync({
        ...issueData,
        manager: user.id
      });
      setOpen(false);
    } catch (error) {
      console.error('Issue creation failed:', error);
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const LoginRequired = () => (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
          <LogIn className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">로그인이 필요합니다</h3>
        <p className="text-gray-500 text-center">
          이슈를 등록하기 위해서는 먼저 로그인이 필요합니다.
        </p>
        <Button 
          variant="default" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"
          onClick={handleLogin}
        >
          로그인 하러가기
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          신규 이슈 등록
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border shadow-lg w-[90vw] max-w-none h-[90vh] overflow-y-auto">
        <DialogTitle className="text-lg font-semibold text-gray-900">신규 이슈 등록</DialogTitle>
        
        {!isAuthenticated ? (
          <LoginRequired />
        ) : (
          <>
            <div className="flex mt-6 space-x-6 h-full">
              {/* 왼쪽 섹션: 타이틀 및 설명 */}
              <div className="w-1/2 flex flex-col space-y-4 pr-4 border-r border-gray-300">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">제목</label>
                  <Input
                    placeholder="이슈 제목 입력"
                    value={issueData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">설명</label>
                  <textarea
                    placeholder="설명 입력 (선택 사항)"
                    value={issueData.description ?? ""}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-40"
                  />
                </div>
              </div>

              {/* 오른쪽 섹션: 셀렉트 박스 */}
              <div className="w-1/2 flex flex-col space-y-4 pl-4">
                {/* Priority */}
                <div className="flex items-center space-x-4">
                  <label className="w-1/3 text-sm font-medium text-gray-700">우선순위</label>
                  <Select
                    onValueChange={(value) => handleInputChange('priority', value as PriorityLevel)}
                    value={issueData.priority}
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                      <SelectValue placeholder="우선순위 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="High" className="hover:bg-indigo-50 cursor-pointer py-2">높음</SelectItem>
                      <SelectItem value="Medium" className="hover:bg-indigo-50 cursor-pointer py-2">중간</SelectItem>
                      <SelectItem value="Low" className="hover:bg-indigo-50 cursor-pointer py-2">낮음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div className="flex items-center space-x-4">
                  <label className="w-1/3 text-sm font-medium text-gray-700">카테고리</label>
                  <Select
                    onValueChange={(value) => handleInputChange('category', value as SystemCategory)}
                    value={issueData.category}
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="shop" className="hover:bg-indigo-50 cursor-pointer py-2">상점</SelectItem>
                      <SelectItem value="lms" className="hover:bg-indigo-50 cursor-pointer py-2">LMS</SelectItem>
                      <SelectItem value="cms" className="hover:bg-indigo-50 cursor-pointer py-2">CMS</SelectItem>
                      <SelectItem value="user" className="hover:bg-indigo-50 cursor-pointer py-2">사용자</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Type */}
                <div className="flex items-center space-x-4">
                  <label className="w-1/3 text-sm font-medium text-gray-700">유형</label>
                  <Select
                    onValueChange={(value) => handleInputChange('type', value as IssueType)}
                    value={issueData.type}
                  >
                    <SelectTrigger className="w-full bg-white border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                      <SelectValue placeholder="유형 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem value="Bug" className="hover:bg-indigo-50 cursor-pointer py-2">버그</SelectItem>
                      <SelectItem value="Feature" className="hover:bg-indigo-50 cursor-pointer py-2">기능</SelectItem>
                      <SelectItem value="Enhancement" className="hover:bg-indigo-50 cursor-pointer py-2">개선</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* manager - 읽기 전용으로 변경 */}
                <div className="flex items-center space-x-4">
                  <label className="w-1/3 text-sm font-medium text-gray-700">담당자</label>
                  <Input
                    value={user?.email || ''}
                    readOnly
                    disabled
                    className="w-full bg-gray-100"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <DialogClose asChild>
                <Button variant="outline" className="text-gray-700">
                  취소
                </Button>
              </DialogClose>
              <Button
                onClick={handleSubmit}
                disabled={createIssueMutation.isPending}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {createIssueMutation.isPending ? '등록 중...' : '등록하기'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForRegisterIssue;