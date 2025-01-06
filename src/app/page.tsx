"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
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
    <div className="w-full h-full flex flex-col mt-16">
      {/* Hero 섹션 */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden">
        {/* 배경 요소들에만 -z-10 적용 */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-blue-50 to-slate-100 -z-10" />
        <svg
          className="absolute bottom-0 left-0 w-full h-auto -z-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 200"
        >
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,96L60,101.3C120,107,240,117,360,117.3C480,117,600,107,720,101.3C840,96,960,96,1080,117.3C1200,139,1320,181,1380,202.7L1440,224V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
          />
        </svg>

        {/* 가운데 텍스트 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 px-4 text-center">
          <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-3">
            업무 관리 페이지
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            쉽고 간편하게 업무를 관리하고 추적해보세요
          </p>
          <Link href="/task-admin/issue-admin">
            <Button
              variant="outline"
              className="mt-3 flex items-center gap-2 border-gray-400 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              시작하기
            </Button>
          </Link>
        </div>
      </div>

      {/* 메인 컨텐츠 영역 */}
      <section className="mx-auto p-4 md:p-6 w-full max-w-4xl">
        <Card className="shadow-md border-none">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 md:p-5 rounded-t-md">
            <CardTitle className="text-gray-700 text-lg md:text-xl font-bold">
              프로젝트 소개
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm md:text-base">
              협업과 업무 관리를 돕는 모던한 웹앱
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-5 bg-white rounded-b-md">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              이 프로젝트는 팀원들과의 협업을 한층 쉽게 만들어주는{" "}
              <span className="font-semibold text-blue-600">
                업무 관리용 웹앱
              </span>
              입니다. 직관적인 UI와 반응형 디자인으로 어디서든 업무를 확인하고
              진행 상황을 간단히 공유할 수 있어요.
            </p>
            <Button
              variant="outline"
              className="mt-4 flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300"
            >
              <ArrowRight className="h-4 w-4" />
              자세히 보기
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}