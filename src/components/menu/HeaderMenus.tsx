'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card'; // shadcn ui card 컴포넌트
import AuthMenus from './AuthMenus';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';
import { useMenuStore } from '@/store/useMenuStore';
import { MenuItemType } from '@/api/apiForMenu';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
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
        setOpenMenus((prev) => new Set([...prev, menuPath]));
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(
    (menuPath: string) => {
      if (!isMobile) {
        setOpenMenus((prev) => {
          const newSet = new Set(prev);
          newSet.delete(menuPath);
          return newSet;
        });
      }
    },
    [isMobile]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuItemClick = useCallback((menuPath: string) => {
    setOpenMenus((prev) => {
      const isOpen = prev.has(menuPath);
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.delete(menuPath);
      } else {
        newSet.add(menuPath);
      }
      return newSet;
    });
  }, []);

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg w-full">
        <nav className="relative px-6 py-3 flex justify-between items-center container mx-auto max-w-screen-xl">
          <div className="flex space-x-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-28 bg-gray-200/80 rounded-lg animate-pulse"
              />
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
        <nav className="relative px-6 py-3 flex justify-between items-center container mx-auto max-w-screen-xl">
          <div className="text-red-500 font-medium">
            Failed to load menu items
          </div>
          <AuthMenus />
        </nav>
      </Card>
    );
  }

  const renderSubMenuItems = (
    menu: MenuItemType,
    currentPath: string = '',
    depth: number = 0
  ) => {
    if (!menu.items?.length) return null;

    const fullPath = currentPath ? `${currentPath}/${menu.path}` : menu.path;
    const isOpen = openMenus.has(fullPath);

    const position =
      depth === 0
        ? 'top-full left-0'
        : isMobile
        ? 'top-0 left-0 w-full'
        : 'left-full top-0';

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
              depth === 0
                ? isMobile
                  ? ''
                  : 'mt-2'
                : isMobile
                ? ''
                : '-mt-2 ml-2'
            }`}
          >
            <Card
              className={`bg-white/95 backdrop-blur-lg border $
                shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-200`}
            >
              <ul className={`py-2 ${isMobile ? '' : 'min-w-[220px]'}`}>
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
                          if (isMobile && subMenu.items?.length > 0) {
                            handleMobileMenuItemClick(subPath);
                          } else {
                            handleMenuClick(subPath, subMenu.id);
                          }
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm rounded-lg 
                          hover:bg-blue-100/90 hover:text-primary transition-all duration-200 ease-in-out flex items-center 
                          justify-between group`}
                      >
                        <span className="font-medium">{subMenu.name}</span>
                        {subMenu.items?.length > 0 && (
                          <ChevronRight
                            className={`w-4 h-4 text-gray-400 
                            group-hover:text-blue-500 transition-colors 
                            $
                              isMobile && openMenus.has(subPath)}`}
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
    <ul className={`flex ${isMobile ? 'flex-col' : 'space-x-8'} w-full`}>
      {items.map((menu) => {
        const currentPath = menu.path;
        const isOpen = openMenus.has(currentPath);
        const hasSubMenus = menu.items?.length > 0;

        return (
          <li
            key={currentPath}
            className={`relative menu-item ${
              isMobile ? 'border-b border-gray-200/70 last:border-b-0' : ''
            }`}
            onMouseEnter={() => handleMouseEnter(currentPath)}
            onMouseLeave={() => handleMouseLeave(currentPath)}
          >
            <button
              onClick={() => {
                if (isMobile && hasSubMenus) {
                  handleMobileMenuItemClick(currentPath);
                } else if (!hasSubMenus) {
                  handleMenuClick(menu.path, menu.id);
                }
              }}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg 
                transition-all duration-200 ease-in-out flex items-center 
                space-x-1 group w-full
                hover:bg-gradient-to-r from-blue-50 to-blue-100 text-gray-700 hover:text-primary-600`}
            >
              <span>{menu.name}</span>
              {hasSubMenus && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 
                  ${isMobile && isOpen ? 'rotate-180' : ''} 
                  ${isOpen ? 'rotate-180' : ''}
                  text-gray-400 group-hover:text-primary-500`}
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
    <Card className="bg-white/90 backdrop-blur-md border-none shadow-lg w-full">
      <nav className="relative px-6 py-3 flex justify-between items-center container mx-auto max-w-screen-xl">
        <div className="flex items-center space-x-8">
          {isMobile && (
            <button
              onClick={toggleMobileMenu}
              className="mr-4 inline-flex items-center justify-center text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          {!isMobile && renderMenuItems(menuItems)}
        </div>
        <AuthMenus />
      </nav>
      {isMobile && isMobileMenuOpen && (
        <div className="px-6 py-4 border-t border-gray-200 container mx-auto max-w-screen-xl">
          {renderMenuItems(menuItems)}
        </div>
      )}
    </Card>
  );
}
