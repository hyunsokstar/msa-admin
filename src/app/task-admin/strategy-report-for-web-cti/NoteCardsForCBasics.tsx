// src/components/NoteCardsForCBasics.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoteItem {
    title: string;
    url: string;
}

const notes: NoteItem[] = [
    { title: 'C 언어 개발 환경 설정', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=1' },
    { title: '반복문 연습해 보기', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=2' },
    { title: 'if 문 예제 작성 및 실행 해보기', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=3' },
    { title: 'if else 예제 작성 및 test', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=4' },
    { title: '스위치문 예제', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=5' },
    { title: '삼항 연산자 예제 작성 및 테스트', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=6' },
    { title: '배열 예제', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=7' },
    { title: '함수 예제', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=8' },
    { title: '포인터 예제', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=9' },
    { title: '함수에서 포인터를 활용해서 값 수정 해보기', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=10' },
    { title: '함수에서 배열을 넘길 경우 포인터를 사용 해야함', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=11' },
    { title: '메모리 동적 할당 및 해제에 대한 기본 예제', url: 'https://nexus-task-master.shop/note-admin/notes/78/note-contents?pageNum=12' },
];

const NoteCardsForCBasics = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">🧠 C언어 기초 문법 정리 Part(1)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map((note, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-base font-semibold text-gray-800">{`${index + 1}. ${note.title}`}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button asChild className="w-full">
                                <a href={note.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                                    <ExternalLink size={16} />
                                    바로가기
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default NoteCardsForCBasics;
