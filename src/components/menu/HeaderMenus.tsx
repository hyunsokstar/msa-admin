// src\components\HeaderMenus.tsx

"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HEADER_MENU_ITEMS } from '@/constants/menu';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import AuthMenus from './AuthMenus';

export default function HeaderMenus() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const router = useRouter();

    const handleMenuClick = (parentKey: string, subKey: string) => {
        router.push(`/${parentKey}/${subKey}`);
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

    return (
        <Card className="bg-white/80 backdrop-blur-sm border-none shadow-sm">
            <nav className="relative px-4 py-2 flex justify-between items-center">
                <img
                    src="/logo.svg"
                    alt="Dankkum Logo"
                    className="w-16 h-auto" // 로고 사이즈를 w-16으로 설정
                />

                <ul className="flex space-x-6">
                    {HEADER_MENU_ITEMS.map((menu) => (
                        <li key={menu.key} className="relative menu-item">
                            <button
                                onClick={() => setOpenMenu(openMenu === menu.key ? null : menu.key)}
                                className={`
                                    px-4 py-2 text-sm font-medium rounded-lg
                                    transition-all duration-300 ease-in-out
                                    relative overflow-hidden
                                    ${openMenu === menu.key
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
                                {openMenu === menu.key && menu.subItems && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 mt-3 z-50" // mt-3으로 간격 추가
                                    >
                                        <Card className="w-56 bg-white/95 backdrop-blur-sm border border-gray-100 shadow-lg">
                                            <ul className="py-1">
                                                {menu.subItems.map((subItem) => (
                                                    <motion.li
                                                        key={subItem.key}
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="py-1.5" // 메뉴 간 간격 추가
                                                    >
                                                        <button
                                                            onClick={() => handleMenuClick(menu.key, subItem.key)}
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
                {/* 오른쪽 끝에 AuthMenus 추가 */}
                <AuthMenus />
            </nav>
        </Card>
    );
}
