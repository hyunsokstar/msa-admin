"use client";

import React from "react";
import ICommonChattings from "@/components/main_page/ICommonChattings";
import IUserListWithLoginStatus from "@/components/main_page/IUserListWithLoginStatus";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">

      {/* 탭 영역 */}
      <div className="mx-4 mt-3 flex items-center justify-between shadow-sm border border-gray-200 dark:border-gray-800 h-12 rounded-md bg-white dark:bg-slate-900 px-2">
        <div className="flex-1 flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            {/* 탭 영역 - 추후 탭 컴포넌트로 대체 */}
            <div className="text-sm text-gray-500">탭 영역</div>
          </div>
        </div>
        <Separator orientation="vertical" className="h-8 mx-4" />
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 mx-4 mt-4 flex flex-col overflow-hidden">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-7 gap-4 overflow-hidden">
          <div className="md:col-span-4 h-full overflow-hidden">
            <ICommonChattings className="h-full" />
          </div>
          <div className="md:col-span-3 h-full overflow-hidden">
            <IUserListWithLoginStatus className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}