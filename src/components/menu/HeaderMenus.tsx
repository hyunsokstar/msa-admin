'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import AuthMenus from './AuthMenus';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';
import { useMenuStore } from '@/store/useMenuStore';
import { MenuItemType } from '@/api/apiForMenu';
import { ChevronDown, ChevronRight, Menu, Home } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

const menuVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export default function HeaderMenus() {
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: menuItems, isLoading, isError } = useApiForGetMenusData();
  const { updateSideMenus } = useMenuStore();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleMenuClick = useCallback(
    (path: string, menuId: number) => {
      if (path) {
        updateSideMenus(menuId.toString());
        router.push(`/${path}`);
        setOpenMenus(new Set());
        setIsMobileMenuOpen(false);
      }
    },
    [router, updateSideMenus]
  );

  const handleMouseEnter = useCallback(
    (menuPath: string) => {
      if (!isMobile) {
        setOpenMenus(new Set([menuPath]));
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setOpenMenus(new Set());
    }
  }, [isMobile]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuItemClick = useCallback((menuPath: string) => {
    setOpenMenus((prev) => {
      const isOpen = prev.has(menuPath);
      return isOpen ? new Set() : new Set([menuPath]);
    });
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg w-full">
        <nav className="relative px-2 py-4 flex justify-between items-center container mx-auto max-w-[1600px]">
          <div className="flex">
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
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg w-full">
        <nav className="relative px-2 py-4 flex justify-between items-center container mx-auto max-w-[1600px]">
          <div className="text-red-500 font-medium">Failed to load menu items</div>
          <AuthMenus />
        </nav>
      </Card>
    );
  }

  const renderSubMenuItems = (menu: MenuItemType, fullPath: string, depth: number = 0) => {
    if (!menu.items?.length) return null;

    const isOpen = openMenus.has(fullPath);
    const position = depth === 0 ? 'top-full left-0' : 'left-full top-0';

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className={`absolute ${position} z-[9999] mt-2`}
          >
            <Card className="bg-white shadow-xl rounded-lg overflow-hidden p-4">
              <ul className="py-2 min-w-[240px]">
                {menu.items.map((subMenu) => {
                  const subPath = `${fullPath}/${subMenu.path}`;
                  return (
                    <li key={subPath} className="relative px-2">
                      <button
                        onClick={() => (subMenu.items?.length ? handleMobileMenuItemClick(subPath) : handleMenuClick(subPath, subMenu.id))}
                        className="w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-100 flex items-center justify-between"
                      >
                        <span>{subMenu.name}</span>
                        {subMenu.items?.length > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                      </button>
                      {renderSubMenuItems(subMenu, subPath, depth + 1)}
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

  const renderMenuItems = (items: MenuItemType[]) => (
    <ul className={`flex ${isMobile ? 'flex-col' : 'space-x-8'} w-full`}>
      {items.map((menu) => {
        const fullPath = menu.path;
        const isOpen = openMenus.has(fullPath);
        const hasSubMenus = menu.items?.length > 0;

        return (
          <li key={fullPath} className="relative px-2" onMouseEnter={() => handleMouseEnter(fullPath)} onMouseLeave={handleMouseLeave}>
            <button
              onClick={() => (hasSubMenus ? handleMobileMenuItemClick(fullPath) : handleMenuClick(menu.path, menu.id))}
              className="px-6 py-3 text-sm font-medium hover:bg-blue-100 flex items-center space-x-1"
            >
              <span>{menu.name}</span>
              {hasSubMenus && <ChevronDown className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''}`} />}
            </button>
            {renderSubMenuItems(menu, fullPath)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <Card className="bg-white border-none shadow-lg w-full z-[9999]">
      <nav className="relative px-3 py-4 flex justify-between items-center ">
        <div className="flex items-center space-x-8">
          <button onClick={() => router.push('/')} className="text-gray-700 hover:text-blue-500 transition-colors">
            <Home className="h-6 w-6" />
          </button>
          {isMobile && <button onClick={toggleMobileMenu}><Menu className="h-6 w-6" /></button>}
          {!isMobile && renderMenuItems(menuItems)}
        </div>
        <AuthMenus />
      </nav>
      {isMobile && isMobileMenuOpen && <div className="px-8 py-6">{renderMenuItems(menuItems)}</div>}
    </Card>
  );
}
