// src/components/form/update/IRegisterFormForUpdateIssue.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Issue, UpdateIssueDto, PriorityLevel, SystemCategory, IssueType, IssueStatus } from "@/types/typeForTaskIssue";
import { DialogClose } from '@/components/ui/dialog';

interface IFormForUpdateIssueProps {
  defaultValues: Issue;
  userEmail: string;
  onSubmit: (data: UpdateIssueDto) => void;
  isUpdating: boolean;
}

const IRegisterFormForUpdateIssue = ({ defaultValues, userEmail, onSubmit, isUpdating }: IFormForUpdateIssueProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateIssueDto>({
    defaultValues: {
      title: defaultValues.title,
      description: defaultValues.description,
      priority: defaultValues.priority,
      type: defaultValues.type,
      category1: defaultValues.category1,
      category2: defaultValues.category2,
      page_url: defaultValues.page_url,
      status: defaultValues.status
    }
  });

  const handleSelectChange = (field: keyof UpdateIssueDto, value: string) => {
    setValue(field, value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-6 space-y-6 h-full">
      <div className="flex space-x-6 h-full">
        {/* 왼쪽 섹션 */}
        <div className="w-1/2 flex flex-col space-y-4 pr-4 border-r border-gray-300">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">제목</label>
            <Input
              {...register('title', { required: "제목은 필수 입력 항목입니다." })}
              placeholder="이슈 제목 입력"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">설명</label>
            <textarea
              {...register('description')}
              placeholder="설명 입력 (선택 사항)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">페이지 URL</label>
            <Input
              {...register('page_url')}
              placeholder="이슈가 발생한 페이지 URL (선택 사항)"
            />
            <p className="text-sm text-gray-500">이슈가 발생한 페이지의 URL을 입력해주세요.</p>
          </div>

          <div className="space-y-2">
            <label className="w-1/3 text-sm font-medium text-gray-700">카테고리1</label>
            <Select
              onValueChange={(value) => handleSelectChange('category1', value as SystemCategory)}
              defaultValue={defaultValues.category1}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="shop" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">SHOP</SelectItem>
                <SelectItem value="lms" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">LMS</SelectItem>
                <SelectItem value="cms" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">CMS</SelectItem>
                <SelectItem value="user" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">USER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">카테고리2</label>
            <Input
              {...register('category2')}
              placeholder="카테고리2 (선택 사항)"
            />
          </div>
        </div>

        {/* 오른쪽 섹션 */}
        <div className="w-1/2 flex flex-col space-y-4 pl-4">
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">상태</label>
            <Select
              onValueChange={(value) => handleSelectChange('status', value as IssueStatus)}
              defaultValue={defaultValues.status}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="Open" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">대기</SelectItem>
                <SelectItem value="In Progress" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">진행중</SelectItem>
                <SelectItem value="Closed" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">완료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">우선순위</label>
            <Select
              onValueChange={(value) => handleSelectChange('priority', value as PriorityLevel)}
              defaultValue={defaultValues.priority}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="우선순위 선택" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="High" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">높음</SelectItem>
                <SelectItem value="Medium" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">중간</SelectItem>
                <SelectItem value="Low" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">낮음</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">유형</label>
            <Select
              onValueChange={(value) => handleSelectChange('type', value as IssueType)}
              defaultValue={defaultValues.type}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <SelectValue placeholder="유형 선택" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="Bug" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">버그</SelectItem>
                <SelectItem value="Feature" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">기능</SelectItem>
                <SelectItem value="Enhancement" className="cursor-pointer hover:bg-indigo-100 px-4 py-2">개선</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">담당자</label>
            <Input
              value={userEmail}
              readOnly
              disabled
              className="w-full bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4 border-t">
        <DialogClose asChild>
          <Button type="button" variant="outline" className="text-gray-700">
            취소
          </Button>
        </DialogClose>
        <Button 
          type="submit" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          disabled={isUpdating}
        >
          {isUpdating ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </form>
  );
};

export default IRegisterFormForUpdateIssue;
