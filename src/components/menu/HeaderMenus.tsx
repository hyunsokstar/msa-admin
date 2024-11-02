// src/components/HeaderMenus.tsx

"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import AuthMenus from './AuthMenus';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';

export default function HeaderMenus() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const router = useRouter();
    const { data: menuItems, isLoading, isError } = useApiForGetMenusData();
    console.log('menuItems:', menuItems);

    const handleMenuClick = (path: string) => {
        router.push(path);
        setTimeout(() => {
            setOpenMenu(null);
        }, 200);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest('.menu-item')) {
            setOpenMenu(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    if (isLoading) {
        return (
            <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
                <nav className="relative px-4 py-2 flex justify-between items-center">
                    <img
                        src="/logo.svg"
                        alt="Dankkum Logo"
                        className="w-16 h-auto"
                    />
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
                    <img
                        src="/logo.svg"
                        alt="Dankkum Logo"
                        className="w-16 h-auto"
                    />
                    <div className="text-red-500">메뉴를 불러오는데 실패했습니다.</div>
                    <AuthMenus />
                </nav>
            </Card>
        );
    }

    return (
        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
            <nav className="relative px-4 py-2 flex justify-between items-center">
                <img
                    src="/logo.svg"
                    alt="Dankkum Logo"
                    className="w-16 h-auto"
                />

                <ul className="flex space-x-6">
                    {menuItems.map((menu) => (
                        <li key={menu.key} className="relative menu-item">
                            <button
                                onClick={() => setOpenMenu(openMenu === menu.key ? null : String(menu.key))}
                                className={`
                                    px-4 py-2 text-sm font-medium rounded-lg
                                    transition-all duration-300 ease-in-out
                                    relative overflow-hidden
                                    ${openMenu === String(menu.key)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'hover:bg-blue-50/50 text-gray-700 hover:text-blue-600'}
                                    before:absolute before:inset-0 before:w-full before:h-full 
                                    before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                                    before:translate-x-[-100%] hover:before:translate-x-[100%]
                                    before:transition-transform before:duration-500
                                `}
                            >
                                {menu.name}
                            </button>
                            <AnimatePresence>
                                {openMenu === String(menu.key) && menu.items && menu.items.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 mt-3 z-50"
                                    >
                                        <Card className="w-56 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg">
                                            <ul className="py-1">
                                                {menu.items.map((subItem) => (
                                                    <motion.li
                                                        key={subItem.key}
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="py-1.5"
                                                    >
                                                        <button
                                                            onClick={() => handleMenuClick(subItem.path || '')}
                                                            className="
                                                                px-4 py-2.5 w-full text-left text-sm
                                                                transition-all duration-200
                                                                text-gray-600 hover:text-blue-600
                                                                hover:bg-blue-50/50
                                                                relative group
                                                            "
                                                        >
                                                            <span className="relative z-10">{subItem.name}</span>
                                                            <motion.div
                                                                className="absolute inset-0 bg-blue-50/0 group-hover:bg-blue-50/50
                                                                    transition-all duration-300"
                                                                layoutId={`highlight-${subItem.key}`}
                                                            />
                                                        </button>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
                <AuthMenus />
            </nav>
        </Card>
    );
}
