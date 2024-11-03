// src/components/menu/CommonSideMenu.tsx
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useMenuStore } from '@/store/useMenuStore';
import { MenuItemType } from '@/api/apiForMenu';
import { ChevronDown, ChevronRight, Cog } from 'lucide-react'; // Cog 아이콘 추가
import DialogButtonForSideMenuSetting from '../dialog/DialogButtonForSideMenuSetting';

const CommonSideMenu = () => {
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
    const router = useRouter();
    const { sideMenus, isLoading, currentMenuId } = useMenuStore();

    React.useEffect(() => {
        if (currentMenuId) {
            const findMenuPath = (
                items: MenuItemType[],
                targetId: string,
                path: string[] = []
            ): string[] | null => {
                for (const item of items) {
                    if (item.id.toString() === targetId) {
                        return path;
                    }
                    if (item.items?.length) {
                        const found = findMenuPath(item.items, targetId, [...path, item.id.toString()]);
                        if (found) return found;
                    }
                }
                return null;
            };

            const menuPath = sideMenus.length > 0 ? findMenuPath(sideMenus, currentMenuId) : null;
            if (menuPath) {
                setExpandedMenus(new Set(menuPath));
            }
        }
    }, [currentMenuId, sideMenus]);

    const toggleMenu = (menuPath: string) => {
        setExpandedMenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(menuPath)) {
                newSet.delete(menuPath);
            } else {
                newSet.add(menuPath);
            }
            return newSet;
        });
    };

    const handleMenuClick = (path: string, menuId: string) => {
        if (path) {
            router.push(`/${path}`);
        }
    };

    const renderMenuItem = (menu: MenuItemType, currentPath: string = '', depth: number = 0) => {
        const fullPath = currentPath ? `${currentPath}/${menu.path}` : menu.path;
        const isExpanded = expandedMenus.has(menu.id.toString());
        const hasChildren = menu.items && menu.items.length > 0;
        const isActive = currentMenuId === menu.id.toString();
        const paddingLeft = depth * 24; // depth에 따라 인덴트를 늘림

        return (
            <div key={fullPath} className="w-full">
                <button
                    onClick={() => hasChildren ? toggleMenu(menu.id.toString()) : handleMenuClick(fullPath, menu.id.toString())}
                    style={{ paddingLeft: `${paddingLeft}px` }}
                    className={`
                        w-full flex items-center justify-between py-2 pr-4 text-sm
                        ${depth === 0 ? 'font-medium' : 'font-normal'}
                        ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'}
                        hover:bg-blue-50/30 hover:text-blue-600
                        transition-colors duration-150
                        ${isExpanded ? 'bg-blue-50/20' : ''}
                    `}
                >
                    <div className="flex items-center gap-2">
                        {hasChildren && (
                            <span className="flex-shrink-0">
                                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                            </span>
                        )}
                        <span className="truncate">{menu.name}</span>
                    </div>
                </button>

                <AnimatePresence>
                    {isExpanded && hasChildren && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div>
                                {menu.items.map(subMenu => renderMenuItem(subMenu, fullPath, depth + 1))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    if (isLoading) {
        return (
            <Card className="w-64 h-full p-4 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />
                ))}
            </Card>
        );
    }

    return (
        <Card className="w-64 h-full overflow-y-auto">
            <div className="flex justify-between items-center py-2 px-4 border-b">
                <span className="text-lg font-semibold">Menu</span>
                <DialogButtonForSideMenuSetting />
            </div>
            <div className="py-2">
                {sideMenus?.map(menu => renderMenuItem(menu))}
            </div>
        </Card>
    );
};

export default CommonSideMenu;
