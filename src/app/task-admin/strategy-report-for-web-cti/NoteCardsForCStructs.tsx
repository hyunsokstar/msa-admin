// components/NoteCardsForCStructs.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoteItem {
    title: string;
    summary: string;
    url: string;
}

const notes: NoteItem[] = [
    {
        title: '1. 학생 정보를 저장하는 구조체',
        summary: '기본적인 구조체 선언 및 필드 정의를 통해 학생의 이름과 나이를 저장하는 예제입니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/79/note-contents?pageNum=1',
    },
    {
        title: '2. 구조체를 typedef와 함께 사용하기',
        summary: '`typedef`를 활용하여 구조체 타입을 간단히 재정의하고 더 간결하게 사용하는 예제를 소개합니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/79/note-contents?pageNum=2',
    },
    {
        title: '3. 배열로 이루어진 구조체 활용해 보기',
        summary: '구조체 배열을 선언하고 여러 명의 학생 정보를 저장/출력하는 방법을 설명합니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/79/note-contents?pageNum=3',
    },
    {
        title: '4. 함수 파라미터로 구조체 넘기기',
        summary: '구조체를 함수 인자로 넘기고 값/참조 방식의 차이를 설명하며 예제 코드도 포함되어 있습니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/79/note-contents?pageNum=4',
    },
    {
        title: '5. 중첩 구조체 예제',
        summary: '구조체 안에 다른 구조체를 포함시켜 계층적인 데이터 구조를 만드는 예제를 보여줍니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/79/note-contents?pageNum=5',
    },
    {
        title: '6. 동적 구조체',
        summary: '`malloc`을 활용하여 구조체를 동적으로 생성하고 메모리를 관리하는 예제를 학습합니다.',
        url: 'https://nexus-task-master.shop/note-admin/notes/79/note-contents?pageNum=6',
    },
];

const NoteCardsForCStructs = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note, index) => (
                <Card
                    key={index}
                    className="shadow-sm border border-gray-200 hover:shadow-md transition-all bg-white hover:bg-slate-50 rounded-xl p-4"
                >
                    <CardHeader className="p-0 mb-2">
                        <CardTitle className="text-sm font-bold text-blue-700">
                            {note.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-sm text-gray-700">
                        <p className="mb-3 leading-snug">
                            {note.summary}
                        </p>
                        <Button asChild variant="outline" className="text-xs h-8 px-3">
                            <a href={note.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                바로 가기 <ExternalLink className="w-3 h-3 ml-1" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default NoteCardsForCStructs;