import { useState } from 'react';
import { Plus } from 'lucide-react';
import CommonButton from '@/components/common/CommonButton';
import { DialogFormForCreateDevSpec } from './DialogFormForCreateDevSpec';
import { useUserStore } from '@/store/useUserStore';

interface DialogButtonProps {
  parentId: string;
  parentName: string;
}

export const DialogButtonForCreateDevSpecForProfilePage = ({ parentId, parentName }: DialogButtonProps) => {
  const [open, setOpen] = useState(false);
  const user = useUserStore(state => state.user);

  return (
    <>
      <CommonButton
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        // className="h-6 w-6 min-w-[24px] bg-white"
        disabled={!user}
        style={{ opacity: user ? 1 : 0.5 }}
      >
        {/* <Plus className="h-3 w-3 text-gray-500" /> */}
        추가
      </CommonButton>
      
      {user && (
        <DialogFormForCreateDevSpec 
          open={open}
          onClose={() => setOpen(false)}
          parentId={parentId}
          parentName={parentName}
        />
      )}
    </>
  );
};