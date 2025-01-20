"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
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
  const { isAuthenticated } = useUserStore();
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [showLoading, setShowLoading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isAuthenticated && !isPublicRoute) {
      setShowLoginDialog(true);
    } else {
      setShowLoginDialog(false);
    }
  }, [isAuthenticated, isPublicRoute]);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setShowLoading(true);
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
    prevPath.current = pathname;
  }, [pathname]);

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
        onOpenChange={setShowLoginDialog}
        showTrigger={false}
      />

      {(isAuthenticated || isPublicRoute) && children}
    </QueryClientProvider>
  );
}