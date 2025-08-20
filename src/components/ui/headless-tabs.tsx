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
                    'inline-flex items-center gap-1 rounded-full border-2 border-border bg-background p-1 shadow-md',
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
                                // 경계선 기본값(더 선명하게)
                                'border border-border/80',
                                // 상태 스타일
                                selected
                                    // 활성: 밝은 배경 + 선명 테두리 색상
                                    ? 'bg-white text-foreground border-primary shadow-sm'
                                    // 비활성: 흐림 → 호버 시 대비 상승 + 테두리 강조
                                    : 'bg-transparent text-muted-foreground hover:text-foreground hover:border-foreground/40',
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