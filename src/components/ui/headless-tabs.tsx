'use client'

import React from 'react'
import { Tab } from '@headlessui/react'

export type HeadlessTabItem = {
    value: string
    label: React.ReactNode
    content: React.ReactNode
}

type Props = {
    tabs: HeadlessTabItem[]
    defaultIndex?: number
    className?: string
    listClassName?: string
}

export default function HeadlessTabs({
    tabs,
    defaultIndex = 0,
    className,
    listClassName,
}: Props) {
    return (
        <Tab.Group defaultIndex={defaultIndex}>
            <Tab.List
                className={[
                    // 세그먼트 컨테이너: 외곽 라운드 보더 + 여백
                    'inline-flex items-center gap-1 rounded-full border border-border bg-background p-1 shadow-sm',
                    listClassName ?? '',
                ].join(' ')}
            >
                {tabs.map((t) => (
                    <Tab
                        key={t.value}
                        className={({ selected }) =>
                            [
                                // 공통 스타일
                                'px-4 py-1.5 rounded-full text-sm font-semibold select-none',
                                'outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                                // 상태 스타일
                                selected
                                    // 활성: 라이트 하이라이트(알약) + 선명 텍스트
                                    ? 'bg-muted text-foreground shadow-inner'
                                    // 비활성: 흐림 → 호버 시 대비 상승
                                    : 'text-muted-foreground hover:text-foreground',
                            ].join(' ')
                        }
                    >
                        {t.label}
                    </Tab>
                ))}
            </Tab.List>

            <Tab.Panels className={className ?? 'mt-6'}>
                {tabs.map((t) => (
                    <Tab.Panel key={t.value}>{t.content}</Tab.Panel>
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}