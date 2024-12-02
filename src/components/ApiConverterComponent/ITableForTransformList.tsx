// src/components/ITableForTransformList.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { CheckCircle, Circle } from 'lucide-react';
import { TransformTemplate } from '@/types/typeForTransform';

interface Props {
  onSelect: (name: string, url: string, method: string) => void;
  onToggleCompletion: (id: number, isCompleted: boolean) => void;
}

const ITableForTransformList: React.FC<Props> = ({ onSelect, onToggleCompletion }) => {
  const { data: templates, isLoading, isError } = useApiForGetTransformTemplates();

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500 py-4">Error loading templates.</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">변환 템플릿 목록</h3>
      <div className="divide-y divide-gray-200">
        {templates?.map((template: TransformTemplate) => (
          <div
            key={template.id}
            className="py-4 px-2 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 rounded-lg"
          >
            <div>
              <div className="text-base font-semibold text-gray-900">
                {template.title} ({template.method})
              </div>
              <div className="text-sm text-gray-600">{template.url}</div>
              <div className="text-sm text-gray-500">{template.description}</div>
            </div>
            <div className="flex items-center gap-4">
              <Toggle
                pressed={template.is_completed}
                onPressedChange={() => onToggleCompletion(template.id, !template.is_completed)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-150 ${
                  template.is_completed
                    ? 'bg-green-100 hover:bg-green-200 text-green-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
              >
                {template.is_completed ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    완료
                  </>
                ) : (
                  <>
                    <Circle className="w-5 h-5 text-gray-500" />
                    비완료
                  </>
                )}
              </Toggle>
              <Button
                variant="outline"
                className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors duration-150 ${
                  template.is_completed
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white`}
                onClick={() => onSelect(template.title, template.url, template.method)}
              >
                선택
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ITableForTransformList;