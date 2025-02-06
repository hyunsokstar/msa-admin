// src/components/common/CommonSelectBox.tsx
"use client";

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
    value: string;
    label: string;
}

interface CommonSelectBoxProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
    name?: string;
    className?: string;
}

const CommonSelectBox = ({
    options,
    value,
    onChange,
    label,
    name,
    className
}: CommonSelectBoxProps) => {
    const selectedOption = options.find(option => option.value === value) || options[0];

    return (
        <Listbox value={value} onChange={onChange} name={name}>
            <div className="relative">
                {label && (
                    <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </Listbox.Label>
                )}
                <Listbox.Button className={cn(
                    "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border border-input",
                    "focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300",
                    "text-sm",
                    className
                )}>
                    <span className="block truncate">{selectedOption.label}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute bottom-full top-auto z-10 mb-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {options.map((option) => (
                            <Listbox.Option
                                key={option.value}
                                value={option.value}
                                className={({ active }) =>
                                    cn(
                                        "relative cursor-default select-none py-2 pl-10 pr-4",
                                        active ? "bg-indigo-100 text-indigo-900" : "text-gray-900"
                                    )
                                }
                            >
                                {({ selected }) => (
                                    <>
                                        <span className={cn(
                                            "block truncate",
                                            selected ? "font-medium" : "font-normal"
                                        )}>
                                            {option.label}
                                        </span>
                                        {selected && (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                                                <Check className="h-4 w-4" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    );
};

export default CommonSelectBox;
