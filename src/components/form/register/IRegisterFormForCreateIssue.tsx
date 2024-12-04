import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CreateIssueDto, PriorityLevel, SystemCategory, IssueType } from "@/types/typeForTaskIssue";

interface IFormForCreateIssueProps {
  defaultValues: CreateIssueDto;
  userEmail: string;
  onSubmit: (data: CreateIssueDto) => void;
}

const IRegisterFormForCreateIssue = ({ defaultValues, userEmail, onSubmit }: IFormForCreateIssueProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateIssueDto>({
    defaultValues
  });

  // Custom handler for select inputs since they can't use register directly
  const handleSelectChange = (field: keyof CreateIssueDto, value: string) => {
    setValue(field, value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-6 space-y-6 h-full">
      <div className="flex space-x-6 h-full">
        {/* 왼쪽 섹션: 타이틀 및 설명 */}
        <div className="w-1/2 flex flex-col space-y-4 pr-4 border-r border-gray-300">
          {/* Title */}
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

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">설명</label>
            <textarea
              {...register('description')}
              placeholder="설명 입력 (선택 사항)"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-40"
            />
          </div>

          {/* Page URL */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">페이지 URL</label>
            <Input
              {...register('page_url')}
              placeholder="이슈가 발생한 페이지 URL (선택 사항)"
            />
            <p className="text-sm text-gray-500">이슈가 발생한 페이지의 URL을 입력해주세요.</p>
          </div>

          <div className="space-y-2">
            <label className="w-1/3 text-sm font-medium text-gray-700">카테고리</label>
            <Select
              onValueChange={(value) => handleSelectChange('category1', value as SystemCategory)}
              defaultValue={defaultValues.category1}
            >
              <SelectTrigger className="w-full bg-white border-gray-300 hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg">
                <SelectItem value="shop" className="hover:bg-indigo-50 cursor-pointer py-2">SHOP</SelectItem>
                <SelectItem value="lms" className="hover:bg-indigo-50 cursor-pointer py-2">LMS</SelectItem>
                <SelectItem value="cms" className="hover:bg-indigo-50 cursor-pointer py-2">CMS</SelectItem>
                <SelectItem value="user" className="hover:bg-indigo-50 cursor-pointer py-2">USER</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        {/* 오른쪽 섹션: 셀렉트 박스 */}
        <div className="w-1/2 flex flex-col space-y-4 pl-4">
          {/* Priority */}
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">우선순위</label>
            <Select
              onValueChange={(value) => handleSelectChange('priority', value as PriorityLevel)}
              defaultValue={defaultValues.priority}
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

          {/* Type */}
          <div className="flex items-center space-x-4">
            <label className="w-1/3 text-sm font-medium text-gray-700">유형</label>
            <Select
              onValueChange={(value) => handleSelectChange('type', value as IssueType)}
              defaultValue={defaultValues.type}
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

          {/* manager - 읽기 전용 */}
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
      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" className="text-gray-700">
          취소
        </Button>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default IRegisterFormForCreateIssue;
