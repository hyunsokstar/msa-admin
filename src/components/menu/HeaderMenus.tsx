"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import AuthMenus from './AuthMenus';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';
import { MenuItemType } from '@/api/apiForMenu';

export default function HeaderMenus() {
    const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
    const router = useRouter();
    const { data: menuItems, isLoading, isError } = useApiForGetMenusData();

    const handleMenuClick = (path: string) => {
        if (path) {
            router.push(`/${path}`);
            setOpenMenus(new Set());
        }
    };

    const handleMouseEnter = (menuPath: string) => {
        setOpenMenus(prev => {
            const newSet = new Set(prev);
            newSet.add(menuPath);
            return newSet;
        });
    };

    const handleMouseLeave = (menuPath: string) => {
        setOpenMenus(prev => {
            const newSet = new Set(prev);
            newSet.delete(menuPath);
            return newSet;
        });
    };

    if (isLoading) {
        return (
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
                <nav className="relative px-4 py-2 flex justify-between items-center">
                    <img src="/logo.svg" alt="Dankkum Logo" className="w-16 h-auto" />
                    <div className="flex space-x-6 animate-pulse">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-8 w-24 bg-gray-200 rounded-lg" />
                        ))}
                    </div>
                    <AuthMenus />
                </nav>
            </Card>
        );
    }

    if (isError || !menuItems) {
        return (
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
                <nav className="relative px-4 py-2 flex justify-between items-center">
                    <img src="/logo.svg" alt="Dankkum Logo" className="w-16 h-auto" />
                    <div className="text-red-500">메뉴를 불러오는데 실패했습니다.</div>
                    <AuthMenus />
                </nav>
            </Card>
        );
    }

    const renderSubMenuItems = (menu: MenuItemType, currentPath: string, depth: number = 0) => {
        if (!menu.items || menu.items.length === 0) return null;

        const isFirstLevel = depth === 0;
        const position = isFirstLevel
            ? "left-0 top-full mt-2"
            : "left-full top-0 ml-2";

        const isOpen = openMenus.has(currentPath);

        return (
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={isFirstLevel ? { opacity: 0, y: -10 } : { opacity: 0, x: -10 }}
                        animate={isFirstLevel ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                        exit={isFirstLevel ? { opacity: 0, y: -10 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute ${position} z-50`}
                    >
                        <Card className="bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg mt-1.5">
                            <ul className="py-2 min-w-[200px]">
                                {menu.items.map((subMenu) => {
                                    const subPath = `${currentPath}/${subMenu.path}`;
                                    return (
                                        <li
                                            key={subPath}
                                            className="relative px-2"
                                            onMouseEnter={() => handleMouseEnter(subPath)}
                                            onMouseLeave={() => handleMouseLeave(subPath)}
                                        >
                                            <button
                                                onClick={() => {
                                                    if (!subMenu.items?.length) {
                                                        handleMenuClick(subMenu.path || '');
                                                    }
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm rounded-lg
                                                    ${openMenus.has(subPath)
                                                        ? 'bg-blue-50 text-blue-600'
                                                        : 'hover:bg-blue-50/50 text-gray-700 hover:text-blue-600'}
                                                    transition-colors duration-150`}
                                            >
                                                {subMenu.name}
                                                {subMenu.items?.length > 0 && (
                                                    <span className="float-right">›</span>
                                                )}
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

    const renderMenuItems = (items: MenuItemType[]) => {
        return (
            <ul className="flex space-x-6">
                {items.map((menu) => {
                    const currentPath = `/${menu.path}`;
                    const isOpen = openMenus.has(currentPath);

                    return (
                        <li
                            key={currentPath}
                            className="relative menu-item"
                            onMouseEnter={() => handleMouseEnter(currentPath)}
                            onMouseLeave={() => handleMouseLeave(currentPath)}
                        >
                            <button
                                onClick={() => {
                                    if (!menu.items?.length) {
                                        handleMenuClick(menu.path || '');
                                    }
                                }}
                                className={`px-4 py-2 text-sm font-medium rounded-lg
                                    transition-all duration-300 ease-in-out
                                    relative overflow-hidden
                                    ${isOpen
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'hover:bg-blue-50/50 text-gray-700 hover:text-blue-600'}`}
                            >
                                {menu.name}
                                {menu.items?.length > 0 && (
                                    <span className="ml-1">▼</span>
                                )}
                            </button>
                            {renderSubMenuItems(menu, currentPath, 0)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
            <nav className="relative px-4 py-2 flex justify-between items-center">
                <img src="/logo.svg" alt="Dankkum Logo" className="w-16 h-auto" />
                <div className="flex space-x-6">
                    {renderMenuItems(menuItems)}
                </div>
                <AuthMenus />
            </nav>
        </Card>
    );
}

