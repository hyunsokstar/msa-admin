import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type HttpMethod = 'ALL' | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IRadioButtonsForOptionsForMultiApiTestListProps {
  selectedMethod: HttpMethod;
  onMethodChange: (value: string) => void;
}

const IRadioButtonsForOptionsForMultiApiTestList: React.FC<IRadioButtonsForOptionsForMultiApiTestListProps> = ({
  selectedMethod,
  onMethodChange
}) => {
  const methods: HttpMethod[] = ['ALL', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  return (
    <div className="flex items-center gap-4">
      <Label>HTTP Method:</Label>
      <RadioGroup
        value={selectedMethod}
        onValueChange={onMethodChange}
        className="flex gap-4"
      >
        {methods.map((method) => (
          <div key={method} className="flex items-center space-x-2">
            <RadioGroupItem value={method} id={method.toLowerCase()} />
            <Label htmlFor={method.toLowerCase()}>{method}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default IRadioButtonsForOptionsForMultiApiTestList;