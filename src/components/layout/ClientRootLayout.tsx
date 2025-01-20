"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import DialogButtonForLogin from "../dialog/DialogButtonForLoginForm";

const HeaderMenus = dynamic(() => import("@/components/menu/HeaderMenus"), {
  ssr: false,
});

const queryClient = new QueryClient();

const loadingBarVariants = {
  start: { scaleX: 0, opacity: 1 },
  end: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  exit: {
    scaleX: 1,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const PUBLIC_ROUTES = ['/login', '/signup', '/forgot-password', '/', '/help', '/about'];

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useUserStore();
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [showLoading, setShowLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // 페이지 전환 감지 및 처리
  useEffect(() => {
    if (prevPath.current !== pathname) {
      setIsTransitioning(true);
      setShowLoading(true);
      
      const timer = setTimeout(() => {
        setShowLoading(false);
        setIsTransitioning(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
    prevPath.current = pathname;
  }, [pathname]);

  // 인증 상태 및 라우트 체크
  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute && !isTransitioning) {
      // 페이지 전환이 완료된 후에만 로그인 다이얼로그 표시
      const timer = setTimeout(() => {
        setShowLoginDialog(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowLoginDialog(false);
    }
  }, [isAuthenticated, isPublicRoute, isTransitioning]);

  // 로그인 다이얼로그 닫기 핸들러
  const handleLoginDialogClose = () => {
    setShowLoginDialog(false);
    if (!isAuthenticated && !isPublicRoute) {
      router.push('/'); // 메인 페이지로 리다이렉트
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
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
        <HeaderMenus />
      </div>

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

      <DialogButtonForLogin 
        open={showLoginDialog} 
        onOpenChange={handleLoginDialogClose}
        showTrigger={false}
      />

      {(isAuthenticated || isPublicRoute) && children}
    </QueryClientProvider>
  );
}