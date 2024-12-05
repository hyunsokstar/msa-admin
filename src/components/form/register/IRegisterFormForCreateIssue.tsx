import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CreateIssueDto, PriorityLevel, SystemCategory, IssueType } from "@/types/typeForTaskIssue";
import ImageUploader2 from '@/components/file-uploader/ImageUploader2';

interface IFormForCreateIssueProps {
  defaultValues: CreateIssueDto;
  userEmail: string;
  onSubmit: (data: CreateIssueDto) => void;
}

const IRegisterFormForCreateIssue = ({ defaultValues, userEmail, onSubmit }: IFormForCreateIssueProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateIssueDto>({
    defaultValues
  });

  const handleSelectChange = (field: keyof CreateIssueDto, value: string) => {
    setValue(field, value);
  };

  const handleImageUpload = (imageNumber: number) => (fileUrl: string) => {
    setValue(`ref_img_url${imageNumber}` as keyof CreateIssueDto, fileUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto px-4">
      <div className="grid grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4 pr-4 border-r border-gray-300">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">제목</label>
            <Input
              {...register('title', { required: "제목은 필수 입력 항목입니다." })}
              placeholder="이슈 제목 입력"
              className="h-9"
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">설명</label>
            <textarea
              {...register('description')}
              placeholder="설명 입력 (선택 사항)"
              className="w-full h-24 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Page URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">페이지 URL</label>
            <Input
              {...register('page_url')}
              placeholder="이슈가 발생한 페이지 URL (선택 사항)"
              className="h-9"
            />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">카테고리1</label>
              <Select
                onValueChange={(value) => handleSelectChange('category1', value as SystemCategory)}
                defaultValue={defaultValues.category1}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-md">
                  {['shop', 'lms', 'cms', 'user'].map((value) => (
                    <SelectItem 
                      key={value} 
                      value={value}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      {value.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">카테고리2</label>
              <Input
                {...register('category2')}
                placeholder="카테고리2"
                className="h-9"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 pl-4">
          {/* Settings Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Priority */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">우선순위</label>
              <Select
                onValueChange={(value) => handleSelectChange('priority', value as PriorityLevel)}
                defaultValue={defaultValues.priority}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="우선순위" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-md">
                  <SelectItem value="High" className="cursor-pointer hover:bg-gray-100">높음</SelectItem>
                  <SelectItem value="Medium" className="cursor-pointer hover:bg-gray-100">중간</SelectItem>
                  <SelectItem value="Low" className="cursor-pointer hover:bg-gray-100">낮음</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">유형</label>
              <Select
                onValueChange={(value) => handleSelectChange('type', value as IssueType)}
                defaultValue={defaultValues.type}
              >
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="유형" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-md">
                  <SelectItem value="Bug" className="cursor-pointer hover:bg-gray-100">버그</SelectItem>
                  <SelectItem value="Feature" className="cursor-pointer hover:bg-gray-100">기능</SelectItem>
                  <SelectItem value="Enhancement" className="cursor-pointer hover:bg-gray-100">개선</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Manager */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">담당자</label>
            <Input
              value={userEmail}
              readOnly
              disabled
              className="h-9 bg-gray-100"
            />
          </div>

          {/* Reference Images */}
          
          <div className="space-y-3">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  참고 이미지 {num}
                </label>
                <div className="h-32">
                  <ImageUploader2 
                    onUploadComplete={handleImageUpload(num)} 
                    maxWidth="max-w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
        <Button type="button" variant="outline" className="h-9">
          취소
        </Button>
        <Button type="submit" className="h-9 bg-indigo-600 hover:bg-indigo-700">
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default IRegisterFormForCreateIssue;