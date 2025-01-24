import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUserStore } from '@/store/useUserStore';
import {
 Dialog,
 DialogContent, 
 DialogHeader,
 DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import CommonButton from '@/components/common/CommonButton';
import { useApiForCreatePersonalDevSpec } from '@/hook/user/useApiForCreatePersonalDevSpec';

const formSchema = z.object({
 name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
 status: z.string().default('active'),
 sort_order: z.number().default(0),
 is_active: z.boolean().default(true),
 is_folder: z.boolean().default(false),
});

type FormData = z.infer<typeof formSchema>;

interface DialogProps {
 parentId: string;
 parentName: string;
 open: boolean;
 onClose: () => void;
}

export const DialogFormForCreateDevSpec = ({ parentId, parentName, open, onClose }: DialogProps) => {
 const user = useUserStore(state => state.user);
 const mutation = useApiForCreatePersonalDevSpec();

 const { register, handleSubmit, reset, formState: { errors, isSubmitting }, control } = useForm<FormData>({
   resolver: zodResolver(formSchema),
   defaultValues: {
     status: 'active',
     sort_order: 0,
     is_active: true,
     is_folder: false
   }
 });

// DialogFormForCreateDevSpec.tsx 수정
const onSubmit = async (data: FormData) => {
  if (!user) return;

  const newSpec = {
    name: data.name,
    parent_id: parentId === "0" ? null : parseInt(parentId), // "0"일 때 null로 설정
    status: data.status,
    created_by: user.id,
    sort_order: data.sort_order,
    is_active: data.is_active,
    is_folder: data.is_folder
  };

  try {
    await mutation.mutateAsync(newSpec);
    reset();
    onClose();
  } catch (error) {
    console.error('Error adding spec:', error);
  }
};

 return (
   <Dialog open={open} onOpenChange={onClose}>
     <DialogContent className="bg-white max-w-md">
       <DialogHeader>
         <DialogTitle className="text-xl font-semibold">
           {parentName}에 새 항목 추가
         </DialogTitle>
       </DialogHeader>
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
         <div className="space-y-2">
           <Label htmlFor="name">이름</Label>
           <Input
             id="name"
             {...register('name')}
             placeholder="새 항목 이름을 입력하세요"
             className="bg-white"
           />
           {errors.name && (
             <p className="text-sm text-red-500 mt-1">
               {errors.name.message?.toString()}
             </p>
           )}
         </div>

          <Controller
            name="is_folder"
            control={control}
            render={({ field }) => (
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="is_folder">폴더로 생성</Label>
                <Switch
                  id="is_folder"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="data-[state=checked]:bg-primary"
                />
              </div>
            )}
          />

         <div className="flex justify-end gap-3 pt-4">
           <CommonButton
             type="button"
             variant="outline"
             onClick={onClose}
             className="bg-white"
           >
             취소
           </CommonButton>
           <CommonButton
             type="submit"
             isLoading={mutation.isPending}
             loadingText="추가 중..."
             className="bg-primary text-white"
             disabled={mutation.isPending}
           >
             추가
           </CommonButton>
         </div>
       </form>
     </DialogContent>
   </Dialog>
 );
};