import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cog, ChevronRight, Pencil, Trash, Save, X } from 'lucide-react';
import { MenuItemType } from '@/api/apiForMenu';
import { useMenuStore } from '@/store/useMenuStore';
import { cn } from '@/lib/utils';

export default function DialogButtonForSideMenuSetting() {
    const [isOpen, setIsOpen] = useState(false);
    const { sideMenus } = useMenuStore();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [expandedMenus, setExpandedMenus] = useState<Set<number>>(new Set());

    const handleEdit = (menuId: number, menuName: string) => {
        setEditingId(menuId);
        setEditValue(menuName);
    };

    const handleSave = (menuId: number) => {
        console.log(`Save menu item with id: ${menuId}, new name: ${editValue}`);
        setEditingId(null);
        setEditValue('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValue('');
    };

    const handleDelete = (menuId: number) => {
        console.log(`Delete menu item with id: ${menuId}`);
    };

    const toggleExpand = (menuId: number) => {
        setExpandedMenus(prev => {
            const newSet = new Set(prev);
            if (newSet.has(menuId)) {
                newSet.delete(menuId);
            } else {
                newSet.add(menuId);
            }
            return newSet;
        });
    };

    const MenuItem = ({ menu, depth = 0 }: { menu: MenuItemType; depth?: number }) => {
        const hasChildren = menu.items && menu.items.length > 0;
        const isEditing = editingId === menu.id;
        const isExpanded = expandedMenus.has(menu.id);

        return (
            <div className="w-full">
                <div
                    className={cn(
                        "group flex items-center gap-1 px-2 py-1.5 hover:bg-blue-50 rounded-md transition-colors",
                        depth > 0 && "ml-6"
                    )}
                >
                    <div className="flex items-center flex-1 min-w-0">
                        {hasChildren && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-8 w-8 hover:bg-blue-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpand(menu.id);
                                }}
                            >
                                <ChevronRight
                                    className={cn(
                                        "h-4 w-4 transition-transform text-gray-600",
                                        isExpanded && "rotate-90"
                                    )}
                                />
                            </Button>
                        )}
                        {!hasChildren && <div className="w-8" />}

                        {isEditing ? (
                            <div className="flex-1 flex items-center gap-2">
                                <Input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="h-8 text-sm"
                                    autoFocus
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSave(menu.id);
                                        } else if (e.key === 'Escape') {
                                            handleCancel();
                                        }
                                    }}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-green-100"
                                    onClick={() => handleSave(menu.id)}
                                >
                                    <Save className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-gray-100"
                                    onClick={handleCancel}
                                >
                                    <X className="h-4 w-4 text-gray-600" />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <span className="text-sm truncate ml-2 text-gray-700">{menu.name}</span>
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-blue-100"
                                        onClick={() => handleEdit(menu.id, menu.name)}
                                    >
                                        <Pencil className="h-4 w-4 text-blue-600" />
                                        <span className="sr-only">메뉴 수정</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-red-50"
                                        onClick={() => handleDelete(menu.id)}
                                    >
                                        <Trash className="h-4 w-4 text-red-500" />
                                        <span className="sr-only">메뉴 삭제</span>
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-1">
                        {menu.items.map((subMenu) => (
                            <MenuItem key={subMenu.id} menu={subMenu} depth={depth + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
                <Cog className="h-5 w-5" />
                <span className="sr-only">메뉴 설정 열기</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-gray-800">메뉴 구조 설정</DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 max-h-[60vh] overflow-y-auto pr-4 -mr-4">
                        {sideMenus?.map((menu) => (
                            <MenuItem key={menu.id} menu={menu} />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}