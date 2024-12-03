// src/components/dialogs/IDialogButtonForCreateApiName.tsx

'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'react-toastify';
import { ApiNameInput, useApiForCreateApiName } from '@/hook/useApiForCreateApiName';

const IDialogButtonForCreateApiName: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useApiForCreateApiName();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ApiNameInput>({
    defaultValues: {
      title: '',
      url: '',
      method: '',
      description: '',
      is_completed: false,
    },
  });

  const onSubmit: SubmitHandler<ApiNameInput> = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('API 이름이 성공적으로 생성되었습니다.');
        reset(); // 폼 초기화
        setIsOpen(false); // 다이얼로그 닫기
      },
      onError: () => {
        toast.error('API 생성 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>새 API 생성</Button>
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <DialogHeader>
          <DialogTitle>새 API 생성</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                제목
              </label>
              <Input
                id="title"
                {...register('title', { required: '제목을 입력해주세요' })}
                placeholder="API 제목"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL
              </label>
              <Input
                id="url"
                {...register('url', { required: 'URL을 입력해주세요' })}
                placeholder="예: /api/example"
              />
              {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
            </div>
            <div>
              <label htmlFor="method" className="block text-sm font-medium text-gray-700">
                HTTP 메서드
              </label>
              <Input
                id="method"
                {...register('method', { required: 'HTTP 메서드를 입력해주세요' })}
                placeholder="예: GET, POST"
              />
              {errors.method && <p className="text-red-500 text-sm">{errors.method.message}</p>}
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                설명
              </label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="API 설명 (선택)"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="is_completed" {...register('is_completed')} />
              <label htmlFor="is_completed" className="text-sm text-gray-700">
                완료 상태
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? '저장 중...' : '저장'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default IDialogButtonForCreateApiName;
