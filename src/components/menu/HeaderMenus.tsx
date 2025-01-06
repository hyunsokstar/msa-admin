"use client";
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import AuthMenus from './AuthMenus';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';
import { useMenuStore } from '@/store/useMenuStore';
import { MenuItemType } from '@/api/apiForMenu';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';

const menuVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const transition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

export default function HeaderMenus() {
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: menuItems, isLoading, isError } = useApiForGetMenusData();
  const { updateSideMenus } = useMenuStore();

  const handleMenuClick = useCallback((path: string, menuId: number) => {
    if (path) {
      updateSideMenus(menuId.toString());
      router.push(`/${path}`);
      setOpenMenus(new Set());
      setIsMobileMenuOpen(false);
    }
  }, [router, updateSideMenus]);

  const handleMouseEnter = useCallback((menuPath: string) => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop) {
      setOpenMenus(prev => new Set([...prev, menuPath]));
    }
  }, []);

  const handleMouseLeave = useCallback((menuPath: string) => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (isDesktop) {
      setOpenMenus(prev => {
        const newSet = new Set(prev);
        newSet.delete(menuPath);
        return newSet;
      });
    }
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleMobileMenuItemClick = useCallback((menuPath: string) => {
    setOpenMenus(prev => {
      const isOpen = prev.has(menuPath);
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.delete(menuPath)
      } else {
        newSet.add(menuPath);
      }
      return newSet;
    });
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg">
        <nav className="relative px-6 py-3 flex justify-between items-center">
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
          <div className="text-red-500 font-medium">Failed to load menu items</div>
          <AuthMenus />
        </nav>
      </Card>
    );
  }

  const renderSubMenuItems = (menu: MenuItemType, currentPath: string = '', depth: number = 0) => {
    if (!menu.items?.length) return null;

    const fullPath = currentPath ? `${currentPath}/${menu.path}` : menu.path;
    const isOpen = openMenus.has(fullPath);

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className={`absolute z-50 
              ${depth === 0 
                ? 'md:top-full md:left-0 md:mt-2 w-full md:w-auto' 
                : 'md:left-full md:top-0 md:-mt-2 md:ml-2 w-full md:w-auto'}`}
          >
            <Card className="bg-white/95 backdrop-blur-lg border border-gray-100/50 shadow-xl rounded-xl overflow-hidden">
              <ul className="py-2 md:min-w-[220px]">
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
                        onClick={() => {
                          if (window.innerWidth < 768 && subMenu.items?.length > 0) {
                            handleMobileMenuItemClick(subPath);
                          } else {
                            handleMenuClick(subPath, subMenu.id);
                          }
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm rounded-lg 
                          hover:bg-blue-50/80 text-gray-700 hover:text-blue-600 
                          transition-all duration-200 ease-in-out flex items-center 
                          justify-between group"
                      >
                        <span className="font-medium">{subMenu.name}</span>
                        {subMenu.items?.length > 0 && (
                          <ChevronRight className={`w-4 h-4 text-gray-400 
                            group-hover:text-blue-500 transition-transform duration-200
                            ${openMenus.has(subPath) ? 'md:rotate-0 rotate-90' : ''}`} 
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

  const renderMenuItems = (items: MenuItemType[]) => (
    <ul className="flex flex-col md:flex-row md:space-x-8 w-full">
      {items.map((menu) => {
        const currentPath = menu.path;
        const isOpen = openMenus.has(currentPath);
        const hasSubMenus = menu.items?.length > 0;

        return (
          <li
            key={currentPath}
            className="relative menu-item border-b border-gray-200/70 last:border-b-0 md:border-b-0"
            onMouseEnter={() => handleMouseEnter(currentPath)}
            onMouseLeave={() => handleMouseLeave(currentPath)}
          >
            <button
              onClick={() => {
                if (window.innerWidth < 768 && hasSubMenus) {
                  handleMobileMenuItemClick(currentPath);
                } else if (!hasSubMenus) {
                  handleMenuClick(menu.path, menu.id);
                }
              }}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg 
                transition-all duration-200 ease-in-out flex items-center 
                space-x-1 group w-full justify-between md:justify-start
                ${hasSubMenus
                  ? 'md:cursor-default text-gray-600 hover:text-gray-800'
                  : 'hover:bg-blue-50/80 text-gray-700 hover:text-blue-600'
                }`}
              disabled={window.innerWidth >= 768 && hasSubMenus}
            >
              <span>{menu.name}</span>
              {hasSubMenus && (
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 
                  ${isOpen ? 'rotate-180' : ''} 
                  text-gray-400 group-hover:text-gray-600`}
                />
              )}
            </button>
            {renderSubMenuItems(menu, '', 0)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg">
      <nav className="relative px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <button onClick={toggleMobileMenu} className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <div className="hidden md:block">
            {renderMenuItems(menuItems)}
          </div>
        </div>
        <AuthMenus />
      </nav>
      {isMobileMenuOpen && (
        <div className="px-6 py-4 border-t border-gray-200 md:hidden">
          {renderMenuItems(menuItems)}
        </div>
      )}
    </Card>
  );
}