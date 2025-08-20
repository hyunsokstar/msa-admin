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
    // UI variant: 'pill' keeps the rounded chips; 'minimal' is clean & chic
    variant?: 'pill' | 'minimal'
}

export default function HeadlessTabs({
    tabs,
    defaultIndex = 0,
    className,
    listClassName,
    variant = 'pill',
}: Props) {
    const listBase =
        variant === 'pill'
            ? 'inline-flex items-center gap-1 rounded-full border-2 border-border bg-background p-1 shadow-md'
            : 'inline-flex items-center gap-1 rounded-lg border border-border/60 bg-transparent p-0.5 shadow-none';

    return (
        <Tab.Group defaultIndex={defaultIndex}>
            <Tab.List
                className={[
                    // 세그먼트 컨테이너: 외곽 라운드 보더 + 여백
                    listBase,
                    listClassName ?? '',
                ].join(' ')}
            >
                {tabs.map((t) => (
                    <Tab
                        key={t.value}
                        className={({ selected }) =>
                            variant === 'pill'
                                ? [
                                      // 공통 스타일 (pill)
                                      'px-4 py-1.5 rounded-full text-sm font-semibold select-none',
                                      'outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                                      // 경계선 기본값(더 선명하게)
                                      'border border-border/80',
                                      // 상태 스타일
                                      selected
                                          ? 'bg-white text-foreground border-primary shadow-sm'
                                          : 'bg-transparent text-muted-foreground hover:text-foreground hover:border-foreground/40',
                                  ].join(' ')
                                : [
                                      // 공통 스타일 (minimal)
                                      'relative px-3 py-1.5 rounded-md text-sm font-medium select-none',
                                      'outline-none transition-colors focus-visible:ring-1 focus-visible:ring-primary/40',
                                      // 미니멀: 기본 테두리 제거, 텍스트 대비 낮춤
                                      'border border-transparent text-foreground/70 hover:text-foreground hover:bg-muted/40',
                                      // 상태 스타일: 선택 시 얇은 밑줄 인디케이터
                                      selected
                                          ? 'text-foreground after:content-["\""] after:absolute after:left-2 after:right-2 after:-bottom-0.5 after:h-[2px] after:bg-foreground/80 after:rounded-full'
                                          : 'after:content-none',
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