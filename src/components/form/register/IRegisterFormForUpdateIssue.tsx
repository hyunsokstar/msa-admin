import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Issue, UpdateIssueDto, PriorityLevel, SystemCategory, IssueType, IssueStatus } from "@/types/typeForTaskIssue";
import { DialogClose } from '@/components/ui/dialog';
import ImageUploader2 from '@/components/file-uploader/ImageUploader2';
import useApiForUsersInfoForSelectBox from '@/hook/useApiForUsersInfoForSelectBox';

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
      status: defaultValues.status,
    }
  });

  const { data: users, isLoading: isLoadingUsers } = useApiForUsersInfoForSelectBox();
  console.log('users:', users);
  

  console.log('defaultValues:', defaultValues);

  const handleSelectChange = (field: keyof UpdateIssueDto, value: string | null) => {
    setValue(field, value ?? undefined);
  };

  const handleImageUpload = (imageNumber: number) => (fileUrl: string) => {
    setValue(`ref_img_url${imageNumber}` as keyof UpdateIssueDto, fileUrl);
  };

  // SelectContent에 적용할 공통 스타일
  const selectContentStyles = "bg-white border border-gray-200 shadow-md rounded-md overflow-hidden";
  const selectItemStyles = "cursor-pointer hover:bg-indigo-50 focus:bg-indigo-50 focus:text-indigo-600 py-2 px-3";
  const selectTriggerStyles = "flex-1 h-9 bg-white hover:bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="space-y-4 pr-4 border-r border-gray-300">
              {/* Title */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-24">제목</label>
                <Input
                  {...register('title', { required: "제목은 필수 입력 항목입니다." })}
                  placeholder="이슈 제목 입력"
                  className="flex-1 h-9"
                />
              </div>
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
              )}

              {/* Description */}
              <div className="flex items-start space-x-4">
                <label className="text-sm font-medium text-gray-700 w-24 mt-1">설명</label>
                <textarea
                  {...register('description')}
                  placeholder="설명 입력 (선택 사항)"
                  className="flex-1 w-full h-24 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Page URL */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-24">페이지 URL</label>
                <Input
                  {...register('page_url')}
                  placeholder="이슈가 발생한 페이지 URL (선택 사항)"
                  className="flex-1 h-9"
                />
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 w-24">카테고리1</label>
                  <Select
                    onValueChange={(value) => handleSelectChange('category1', value as SystemCategory)}
                    defaultValue={defaultValues.category1}
                  >
                    <SelectTrigger className={selectTriggerStyles}>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent className={selectContentStyles}>
                      {['shop', 'lms', 'cms', 'user'].map((value) => (
                        <SelectItem 
                          key={value} 
                          value={value}
                          className={selectItemStyles}
                        >
                          {value.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 w-24">카테고리2</label>
                  <Input
                    {...register('category2')}
                    placeholder="카테고리2"
                    className="flex-1 h-9"
                  />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4 pl-4">
              {/* Settings Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Status */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 w-24">상태</label>
                  <Select
                    onValueChange={(value) => handleSelectChange('status', value as IssueStatus)}
                    defaultValue={defaultValues.status}
                  >
                    <SelectTrigger className={selectTriggerStyles}>
                      <SelectValue placeholder="상태 선택" />
                    </SelectTrigger>
                    <SelectContent className={selectContentStyles}>
                      <SelectItem value="Open" className={selectItemStyles}>대기</SelectItem>
                      <SelectItem value="In Progress" className={selectItemStyles}>진행중</SelectItem>
                      <SelectItem value="Closed" className={selectItemStyles}>완료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Priority */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 w-24">우선순위</label>
                  <Select
                    onValueChange={(value) => handleSelectChange('priority', value as PriorityLevel)}
                    defaultValue={defaultValues.priority}
                  >
                    <SelectTrigger className={selectTriggerStyles}>
                      <SelectValue placeholder="우선순위" />
                    </SelectTrigger>
                    <SelectContent className={selectContentStyles}>
                      <SelectItem value="High" className={selectItemStyles}>높음</SelectItem>
                      <SelectItem value="Medium" className={selectItemStyles}>중간</SelectItem>
                      <SelectItem value="Low" className={selectItemStyles}>낮음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Type */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-24">유형</label>
                <Select
                  onValueChange={(value) => handleSelectChange('type', value as IssueType)}
                  defaultValue={defaultValues.type}
                >
                  <SelectTrigger className={selectTriggerStyles}>
                    <SelectValue placeholder="유형" />
                  </SelectTrigger>
                  <SelectContent className={selectContentStyles}>
                    <SelectItem value="Bug" className={selectItemStyles}>버그</SelectItem>
                    <SelectItem value="Feature" className={selectItemStyles}>기능</SelectItem>
                    <SelectItem value="Enhancement" className={selectItemStyles}>개선</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Manager */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-24">담당자</label>
                <Input
                  value={userEmail}
                  readOnly
                  disabled
                  className="flex-1 h-9 bg-gray-100"
                />
              </div>

              {/* Executor */}
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 w-24">실행자</label>
                <Select
                  onValueChange={(value) => handleSelectChange('executor', value === 'none' ? null : value)}
                  defaultValue={defaultValues.executor || 'none'}
                >
                  <SelectTrigger className={selectTriggerStyles}>
                    <SelectValue placeholder="실행자 선택" />
                  </SelectTrigger>
                  <SelectContent className={selectContentStyles}>
                    <SelectItem value="none" className={selectItemStyles}>없음</SelectItem>
                    {users?.map((user) => (
                      <SelectItem 
                        key={user.id} 
                        value={user.id ?? ''}
                        className={selectItemStyles}
                      >
                        {user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>


              {/* Reference Images */}
              <div className="space-y-3">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center space-x-4">
                    <label className="text-sm font-medium text-gray-700 w-24">
                      참고 이미지 {num}
                    </label>
                    <div className="flex-1 h-32">
                      <ImageUploader2 
                        onUploadComplete={handleImageUpload(num)}
                        maxWidth="max-w-full"
                        isUpdate={true}
                        initialImage={String(defaultValues[`ref_img_url${num}` as keyof Issue] || '')}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Buttons */}
        <div className="shrink-0 border-t border-gray-200 bg-white px-6 py-4">
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="h-9">
                취소
              </Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white"
              disabled={isUpdating}
            >
              {isUpdating ? '수정 중...' : '수정하기'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IRegisterFormForUpdateIssue;