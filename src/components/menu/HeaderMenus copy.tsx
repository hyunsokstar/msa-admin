// app/components/HeaderMenus.tsx

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import AuthMenus from "./AuthMenus";
import useApiForGetMenusData from "@/hook/useApiForGetMenusData";
import { useMenuStore } from "@/store/useMenuStore";
import { MenuItemType } from "@/api/apiForMenu";
import { ChevronDown, ChevronRight, Menu as MenuIcon, X as CloseIcon } from "lucide-react";

const menuVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export default function HeaderMenus() {
  // 데스크탑 서브 메뉴 오픈 여부
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  // 모바일 전체 메뉴 오픈 여부
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const router = useRouter();
  const { data: menuItems, isLoading, isError } = useApiForGetMenusData();
  const { updateSideMenus } = useMenuStore();

  const handleMenuClick = useCallback(
    (path: string, menuId: number) => {
      if (path) {
        updateSideMenus(menuId.toString());
        router.push(`/${path}`);
        // 메뉴 클릭 시 데스크탑/모바일 모두 메뉴 닫기
        setOpenMenus(new Set());
        setIsMobileMenuOpen(false);
      }
    },
    [router, updateSideMenus]
  );

  const handleMouseEnter = useCallback((menuPath: string) => {
    setOpenMenus((prev) => new Set([...prev, menuPath]));
  }, []);

  const handleMouseLeave = useCallback((menuPath: string) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);
      newSet.delete(menuPath);
      return newSet;
    });
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg">
        <nav className="relative px-6 py-3 flex justify-between items-center">
          {/* <img src="/logo.svg" alt="Dankkum Logo" className="w-16 h-auto" /> */}
          <div className="flex space-x-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-28 bg-gray-200/80 rounded-lg animate-pulse" />
            ))}
          </div>
          <AuthMenus />
        </nav>
      </Card>
    );
  }

  if (isError || !menuItems) {
    return (
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg">
        <nav className="relative px-6 py-3 flex justify-between items-center">
          {/* <img src="/logo.svg" alt="Dankkum Logo" className="w-16 h-auto" /> */}
          <div className="text-red-500 font-medium">Failed to load menu items</div>
          <AuthMenus />
        </nav>
      </Card>
    );
  }

  // 서브메뉴 렌더링
  const renderSubMenuItems = (menu: MenuItemType, currentPath: string = "", depth: number = 0) => {
    if (!menu.items?.length) return null;

    const fullPath = currentPath ? `${currentPath}/${menu.path}` : menu.path;
    const isOpen = openMenus.has(fullPath);

    // 데스크탑일 때 서브메뉴의 위치(absolute)
    const position = depth === 0 ? "top-full left-0" : "left-full top-0";

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className={`absolute ${position} z-50 ${
              depth === 0 ? "mt-2" : "-mt-2 ml-2"
            } hidden md:block`} // 데스크탑 전용
          >
            <Card className="bg-white/95 backdrop-blur-lg border border-gray-100/50 shadow-xl rounded-xl overflow-hidden">
              <ul className="py-2 min-w-[220px]">
                {menu.items.map((subMenu) => {
                  const subPath = `${fullPath}/${subMenu.path}`;
                  return (
                    <li
                      key={subPath}
                      className="relative px-1"
                      onMouseEnter={() => handleMouseEnter(subPath)}
                      onMouseLeave={() => handleMouseLeave(subPath)}
                    >
                      <button
                        onClick={() => handleMenuClick(subPath, subMenu.id)}
                        className="w-full text-left px-4 py-2.5 text-sm rounded-lg 
                          hover:bg-blue-50/80 text-gray-700 hover:text-blue-600 
                          transition-all duration-200 ease-in-out flex items-center 
                          justify-between group"
                      >
                        <span className="font-medium">{subMenu.name}</span>
                        {subMenu.items?.length > 0 && (
                          <ChevronRight
                            className="w-4 h-4 text-gray-400 
                            group-hover:text-blue-500 transition-colors"
                          />
                        )}
                      </button>
                      {renderSubMenuItems(subMenu, fullPath, depth + 1)}
                    </li>
                  );
                })}
              </ul>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // 데스크탑용 메뉴 렌더링
  const renderDesktopMenuItems = (items: MenuItemType[]) => (
    <ul className="flex space-x-4">
      {items.map((menu) => {
        const currentPath = menu.path;
        const isOpen = openMenus.has(currentPath);
        const hasSubMenus = menu.items?.length > 0;

        return (
          <li
            key={currentPath}
            className="relative menu-item"
            onMouseEnter={() => handleMouseEnter(currentPath)}
            onMouseLeave={() => handleMouseLeave(currentPath)}
          >
            <button
              onClick={() => {
                if (!hasSubMenus) {
                  handleMenuClick(menu.path, menu.id);
                }
              }}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg 
                  transition-all duration-200 ease-in-out flex items-center 
                  space-x-1 group ${
                    hasSubMenus
                      ? "cursor-default text-gray-600 hover:text-gray-800"
                      : "hover:bg-blue-50/80 text-gray-700 hover:text-blue-600"
                  }`}
              disabled={hasSubMenus}
            >
              <span>{menu.name}</span>
              {hasSubMenus && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 
                    ${isOpen ? "rotate-180" : ""} 
                    text-gray-400 group-hover:text-gray-600`}
                />
              )}
            </button>
            {/* 데스크탑 전용 서브메뉴 */}
            {renderSubMenuItems(menu, "", 0)}
          </li>
        );
      })}
    </ul>
  );

  // 모바일용 메뉴 렌더링 (간단히 수직 리스트로 표시)
  const renderMobileMenuItems = (items: MenuItemType[]) => {
    return (
      <div className="mt-4 space-y-2 md:hidden">
        {items.map((menu) => {
          // 하위 메뉴가 있을 경우 간단히 표기 (depth 없이)
          const hasSubMenus = menu.items?.length > 0;
          return (
            <div key={menu.path} className="px-2">
              <button
                className="w-full text-left px-4 py-2.5 text-sm rounded-lg 
                  hover:bg-blue-50/80 text-gray-700 hover:text-blue-600 
                  transition-all duration-200 ease-in-out flex items-center 
                  justify-between group"
                onClick={() => handleMenuClick(menu.path, menu.id)}
              >
                <span className="font-medium">{menu.name}</span>
                {hasSubMenus && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg">
      <nav className="relative px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* 로고 영역 */}
        {/* <img src="/logo.svg" alt="Dankkum Logo" className="w-16 h-auto" /> */}

        {/* 데스크탑 메뉴 (md 이상의 화면) */}
        <div className="hidden md:flex items-center space-x-8">
          {renderDesktopMenuItems(menuItems)}
        </div>

        {/* 모바일 메뉴 아이콘 (md 미만 화면) */}
        <div className="flex md:hidden items-center">
          <button
            className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>

        {/* 우측 Auth 메뉴 (로그인/회원가입 등) */}
        <AuthMenus />
      </nav>

      {/* 모바일용 전체 메뉴 펼침 영역 */}
      {isMobileMenuOpen && (
        <div className="px-4 pb-4 md:hidden">
          <hr className="my-2 border-gray-200" />
          {renderMobileMenuItems(menuItems)}
        </div>
      )}
    </Card>
  );
}
