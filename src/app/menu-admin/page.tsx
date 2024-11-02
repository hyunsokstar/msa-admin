// src/components/MenuAdmin.tsx
"use client";
import { MenuItemType } from '@/api/apiForMenu';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';
import React, { useState, useEffect } from 'react';

interface Props { }

const MenuAdmin = (props: Props) => {
    const { data: menus, isLoading, isError } = useApiForGetMenusData();
    const [expandedMenuIds, setExpandedMenuIds] = useState<Set<string | number>>(new Set());

    const toggleExpand = (menuId: string | number) => {
        setExpandedMenuIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(menuId)) {
                newSet.delete(menuId);
            } else {
                newSet.add(menuId);
            }
            return newSet;
        });
    };

    const renderMenuItems = (menuItems: MenuItemType[]) => {
        return (
            <ul className="pl-4 border-l-2 border-gray-300">
                {menuItems.map((menu) => (
                    <li key={menu.key} className="my-2">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleExpand(menu.key)}>
                            {menu.items.length > 0 && (
                                <span className="text-sm font-bold">
                                    {expandedMenuIds.has(menu.key) ? '-' : '+'}
                                </span>
                            )}
                            <span className="font-medium">{menu.name}</span>
                        </div>
                        {expandedMenuIds.has(menu.key) && menu.items.length > 0 && renderMenuItems(menu.items)}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="p-4 bg-white border rounded-md shadow-md">
            <h1 className="text-xl font-bold mb-4">Menu Admin</h1>
            {isLoading && <p>Loading menus...</p>}
            {isError && <p>Error loading menus. Please try again.</p>}
            {menus && renderMenuItems(menus)}
        </div>
    );
};

export default MenuAdmin;
