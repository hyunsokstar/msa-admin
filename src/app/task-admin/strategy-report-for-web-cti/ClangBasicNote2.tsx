// src/components/NoteCardsForCStructsPart2.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const ClangBasicNote2: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        🧠 C언어 기초 문법 정리 Part(2)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">
                {note.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm mb-4 leading-snug">
                {note.summary}
              </p>
              <div className="flex justify-center mt-4">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                  <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={16} /> 바로가기
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClangBasicNote2;
