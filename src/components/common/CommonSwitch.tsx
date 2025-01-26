// CommonSwitch.tsx
import { Switch } from '@headlessui/react'

interface CommonSwitchProps {
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
}

const CommonSwitch: React.FC<CommonSwitchProps> = ({
  checked,
  onCheckedChange,
  label
}) => {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          checked={checked}
          onChange={onCheckedChange}
          className={`${
            checked ? 'bg-green-500' : 'bg-yellow-400'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        >
          <span className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        {label && (
          <Switch.Label className="ml-2 text-sm text-gray-700">
            {label}
          </Switch.Label>
        )}
      </div>
    </Switch.Group>
  );
};

export default CommonSwitch;