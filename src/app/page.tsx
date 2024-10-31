// src\app\page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <header className="text-center py-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to My Next.js 14 Homepage</h1>
          <p className="text-lg text-gray-700">This is a beautiful homepage using Tailwind CSS and Shadcn UI.</p>
        </header>
        <main className="flex flex-col items-center">
          <Button className="mt-5" variant="outline">
            Get Started
          </Button>
        </main>
      </div>
    </QueryClientProvider>
  );
}
