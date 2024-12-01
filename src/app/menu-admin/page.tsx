"use client";

import { MenuItemType } from '@/api/apiForMenu';
import useApiForGetMenusData from '@/hook/useApiForGetMenusData';
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Pencil, Trash2, Plus } from 'lucide-react';
import DialogButtonForAddMenuForParentMenu from '@/components/dialog/DialogButtonForAddMenuForParentMenu';
import { useQueryClient } from '@tanstack/react-query';
import { useApiForDeleteMenu } from '@/hook/useApiForDeleteMenu';
import { useUserStore } from '@/store/useUserStore';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const MenuAdmin = () => {
   const { data: menus, isLoading, isError } = useApiForGetMenusData();
   const { deleteMenu, isDeleting } = useApiForDeleteMenu();
   const queryClient = useQueryClient();
   const [expandedMenuIds, setExpandedMenuIds] = useState<Set<number>>(new Set());
   const { user } = useUserStore();
   const isAdmin = user?.is_admin ?? false;

   useEffect(() => {
       if (menus) {
           const allIds = new Set<number>();
           const addIds = (items: MenuItemType[]) => {
               items.forEach(item => {
                   allIds.add(item.id);
                   if (item.items.length > 0) {
                       addIds(item.items);
                   }
               });
           };
           addIds(menus);
           setExpandedMenuIds(allIds);
       }
   }, [menus]);

   const toggleExpand = (menuId: number) => {
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

   const handleMenuSuccess = () => {
       queryClient.invalidateQueries({ queryKey: ['menus'] });
   };

   const handleDeleteMenu = async (menuId: number, menuName: string) => {
       if (!isAdmin) return;
       
       console.log('삭제 시도:', { menuId, menuName });
       try {
           await deleteMenu(
               { menuId, menuName },
               {
                   onSuccess: () => {
                       console.log('삭제 성공:', { menuId, menuName });
                   },
                   onError: (error) => {
                       console.error('삭제 실패:', error);
                   }
               }
           );
       } catch (error) {
           console.error('삭제 중 예외 발생:', error);
       }
   };

   const renderMenuItems = (menuItems: MenuItemType[], depth = 0) => {
       return (
           <ul className={`space-y-2 ${depth > 0 ? 'ml-8' : ''}`}>
               {menuItems.map((menu) => (
                   <li
                       key={menu.id}
                       className={`
                           rounded-lg 
                           ${depth === 0 ? 'border-l-4 border-blue-500 shadow-sm' : ''}
                           ${depth === 1 ? 'border-l-4 border-indigo-400' : ''}
                           ${depth === 2 ? 'border-l-4 border-purple-400' : ''}
                           ${depth === 3 ? 'border-l-4 border-pink-400' : ''}
                           hover:shadow-md transition-shadow
                           bg-white
                       `}
                   >
                       <div className={`
                           flex items-center gap-3 p-3
                           hover:bg-gray-50 transition-colors
                           ${depth === 0 ? 'bg-gray-50' : ''}
                       `}>
                           <div className="flex items-center gap-2 flex-1">
                               <button
                                   onClick={() => toggleExpand(menu.id)}
                                   className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                               >
                                   {menu.items.length > 0 ? (
                                       expandedMenuIds.has(menu.id)
                                           ? <ChevronDown className="w-4 h-4 text-gray-600" />
                                           : <ChevronRight className="w-4 h-4 text-gray-600" />
                                   ) : (
                                       <div className="w-4 h-4" />
                                   )}
                               </button>
                               <div className="flex-1">
                                   <div className="font-medium text-gray-900">
                                       {menu.name}
                                   </div>
                                   <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                       <code className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                                           {menu.path}
                                       </code>
                                       <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                       <span>순서: {menu.sort_order}</span>
                                   </div>
                               </div>
                           </div>
                           {isAdmin && (
                               <div className="flex items-center gap-1">
                                   <DialogButtonForAddMenuForParentMenu
                                       parentId={menu.id}
                                       parentMenuName={menu.name}
                                       onSuccess={handleMenuSuccess}
                                   />
                                   <Button
                                       variant="ghost"
                                       size="icon"
                                       className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                       onClick={() => console.log('Edit menu:', menu.id)}
                                   >
                                       <Pencil className="w-4 h-4" />
                                   </Button>
                                   <Button
                                       variant="ghost"
                                       size="icon"
                                       className={`
                                           text-red-600 hover:text-red-700 hover:bg-red-50
                                           ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}
                                       `}
                                       onClick={() => handleDeleteMenu(menu.id, menu.name)}
                                       disabled={isDeleting}
                                   >
                                       <Trash2 className="w-4 h-4" />
                                   </Button>
                               </div>
                           )}
                       </div>
                       {expandedMenuIds.has(menu.id) && menu.items.length > 0 && (
                           <div className="mt-2 mb-3">
                               {renderMenuItems(menu.items, depth + 1)}
                           </div>
                       )}
                   </li>
               ))}
           </ul>
       );
   };

   if (!isAdmin) {
       return (
           <div className="p-6 mt-14">
               <Alert variant="destructive">
                   <AlertDescription>
                       메뉴 관리 페이지는 관리자만 접근할 수 있습니다.
                   </AlertDescription>
               </Alert>
           </div>
       );
   }

   return (
       <div className="p-6 max-w-6xl mx-auto">
           <div className="flex justify-between items-center mb-6">
               <h1 className="text-2xl font-bold text-gray-900">메뉴 관리</h1>
               {isAdmin && (
                   <DialogButtonForAddMenuForParentMenu
                       parentId={null}
                       parentMenuName=""
                       onSuccess={handleMenuSuccess}
                   />
               )}
           </div>
           {isLoading && (
               <div className="text-center py-8 text-gray-500">
                   메뉴 불러오는 중...
               </div>
           )}
           {isError && (
               <div className="text-center py-8 text-red-500 bg-red-50 rounded-lg">
                   메뉴를 불러오는 중 오류가 발생했습니다. 다시 시도해 주세요.
               </div>
           )}
           <div className="space-y-4">
               {menus && renderMenuItems(menus)}
           </div>
       </div>
   );
};

export default MenuAdmin;