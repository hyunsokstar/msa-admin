// src/components/TransformResponse.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { TransformStyle } from '@/types/typeForTransform';
import IDialogButtonForUpdateTransformStyle from '../dialog/IDialogButtonForUpdateTransformStyle';


interface Props {
  style: TransformStyle;
  generatedCode: string;
}

const TransformResponse = ({ style, generatedCode }: Props) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      toast.success('코드가 클립보드에 복사되었습니다.');
    } catch (error) {
      toast.error('복사에 실패했습니다.');
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            {style.name}
            <span className="text-sm text-gray-500 ml-2">
              ({style.description})
            </span>
          </CardTitle>
          <span className='flex gap-2'>
            <IDialogButtonForUpdateTransformStyle style={style} />
            <Button 
              onClick={copyToClipboard}
              variant="outline" 
              size="sm"
              className=""
            >
              복사
            </Button>
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative bg-gray-50 rounded-lg p-4">
          <pre className="overflow-x-auto">
            <code>{generatedCode}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransformResponse;