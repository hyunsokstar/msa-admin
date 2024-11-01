// src\app\page.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">단꿈 교육 관리자 페이지</h1>
        <p className="text-lg text-gray-700">
          단꿈 교육의 효율적인 관리와 운영을 위한 관리자 페이지입니다.
        </p>
      </header>
      <main className="flex flex-col items-center">
        <Button className="mt-5" variant="outline">
          시작하기
        </Button>
      </main>
    </div>
  );
}
