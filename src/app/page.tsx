"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Hero 섹션 */}
      <div className="relative w-full h-72 md:h-96">
        <svg
          className="absolute bottom-0 left-0 w-full h-auto text-gray-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L24,117.3C48,139,96,181,144,181.3C192,181,240,139,288,101.3C336,64,384,32,432,32C480,32,528,64,576,106.7C624,149,672,203,720,240C768,277,816,299,864,277.3C912,256,960,192,1008,149.3C1056,107,1104,85,1152,80C1200,75,1248,85,1296,112C1344,139,1392,181,1416,202.7L1440,224L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
          />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600 opacity-75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-shadow-lg">
            업무 관리 페이지
          </h1>
          <p className="text-sm md:text-lg text-shadow-sm">
            업무를 손쉽게 관리하고 추적하세요
          </p>
          <Button
            variant="outline"
            className="mt-4 flex items-center gap-2 border-white text-white hover:bg-white hover:text-gray-800 transition-colors duration-300"
          >
            <ArrowRight className="h-4 w-4" />
            시작하기
          </Button>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <main className="w-full flex flex-col items-center px-4 py-10">
        <Card className="max-w-md w-full shadow-xl border-none">
          <CardHeader>
            <CardTitle className="text-gray-800">프로젝트 개요</CardTitle>
            <CardDescription className="text-gray-600">
              업무 관리 프로젝트 소개
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              이 페이지는 팀원들과의 협업을 돕기 위해 업무 상태와 진행 상황을
              간편하게 관리하고 확인할 수 있도록 만든 업무 관리 프로젝트입니다.
              반응형 디자인으로 모바일에서도 편리하게 이용하실 수 있습니다 !
            </p>
            <Button
              variant="outline"
              className="mt-4 flex items-center gap-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              자세히 보기
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}