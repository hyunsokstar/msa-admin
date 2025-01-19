"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// HeaderMenus 컴포넌트를 동적으로 로딩 (ssr:false)
const HeaderMenus = dynamic(() => import("@/components/menu/HeaderMenus"), {
  ssr: false,
});

const queryClient = new QueryClient();

/* 로딩바 애니메이션 Variants */
const loadingBarVariants = {
  start: {
    scaleX: 0,
    opacity: 1,
  },
  end: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
  exit: {
    scaleX: 1,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Next.js App Router의 현재 경로
  const pathname = usePathname();
  // 이전 경로를 저장해둘 ref
  const prevPath = useRef(pathname);

  // 로딩바 표시 여부
  const [showLoading, setShowLoading] = useState(false);

  /* 
    경로(pathname)가 변경되면 => "페이지 이동"으로 간주하고 로딩바 표시
    - 간단히 0.8초 뒤에 로딩바를 닫음
    - 실제로는 Suspense나 fetch, API 응답 시간 등에 맞춰 세밀하게 조절 가능
  */
  useEffect(() => {
    if (prevPath.current !== pathname) {
      // 페이지 이동 발생
      setShowLoading(true);

      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 800); // 0.8초 뒤 로딩바 제거 (임의로 설정)

      return () => {
        clearTimeout(timer);
      };
    }
    prevPath.current = pathname;
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* ▼ 로딩바: Header 위에 얹어서, 페이지 전환 시 로딩 애니메이션 */}
      <div className="relative">
        <AnimatePresence>
          {showLoading && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
              variants={loadingBarVariants}
              initial="start"
              animate="end"
              exit="exit"
            />
          )}
        </AnimatePresence>
        {/* 헤더 메뉴 */}
        <HeaderMenus />
      </div>

      {/* ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* 메인 컨텐츠 */}
      {children}
    </QueryClientProvider>
  );
}
