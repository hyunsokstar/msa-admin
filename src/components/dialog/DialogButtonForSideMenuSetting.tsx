// src/components/DialogButtonForSideMenuSetting.tsx

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cog, ChevronRight, Pencil, Trash, Save, X, GripVertical } from 'lucide-react';
import { MenuItemType } from '@/api/apiForMenu';
import { useMenuStore } from '@/store/useMenuStore';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useApiForDeleteMenuForMenuId } from '@/hook/useApiForDeleteMenuForMenuId';

const DialogButtonForSideMenuSetting = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { sideMenus, setSideMenus, reorderMenus } = useMenuStore();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [expandedMenus, setExpandedMenus] = useState<Set<number>>(new Set());

    const { deleteMenu, isDeleting } = useApiForDeleteMenuForMenuId(); // 삭제 기능 연동

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleEdit = (menuId: number, menuName: string) => {
        setEditingId(menuId);
        setEditValue(menuName);
    };

    const handleSave = (menuId: number) => {
        setEditingId(null);
        setEditValue('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValue('');
    };

    const handleDelete = (menuId: number) => {
        console.log("Attempting to delete menu with id: ", menuId);

        deleteMenu(menuId, {
            onSuccess: () => {
                console.log(`Successfully deleted menu with id: ${menuId}`);
            },
            onError: (error) => {
                console.error(`Failed to delete menu with id: ${menuId}`, error);
            },
        });
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

    const handleDragEnd = (event: DragEndEvent, parentId: string | null = null) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        reorderMenus(Number(active.id), Number(over.id), parentId);
    };

    const SortableMenuItem = ({ menu, depth = 0, parentId = null }: {
        menu: MenuItemType;
        depth?: number;
        parentId?: string | null;
    }) => {
        const hasChildren = menu.items && menu.items.length > 0;
        const isEditing = editingId === menu.id;
        const isExpanded = expandedMenus.has(menu.id);

        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({ id: menu.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
            paddingLeft: `${depth * 14}px`, // Depth에 따라 padding-left 조정 (조금 더 줄여 인덴트가 덜 깊어 보이도록)
        };

        return (
            <div ref={setNodeRef} style={style} className="menu-item-container">
                <div className="menu-item group flex items-center gap-1 px-1 py-1 hover:bg-blue-50 rounded-md transition-colors">
                    <div className="flex items-center flex-1 min-w-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="p-0 h-5 w-5 cursor-grab hover:bg-blue-100"
                            {...attributes}
                            {...listeners}
                        >
                            <GripVertical className="h-3 w-3 text-gray-400" />
                        </Button>

                        {hasChildren ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="p-0 h-5 w-5 hover:bg-blue-100 ml-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleExpand(menu.id);
                                }}
                            >
                                <ChevronRight
                                    className={`h-3 w-3 transition-transform text-gray-600 ${isExpanded ? "rotate-90" : ""}`}
                                />
                            </Button>
                        ) : (
                            <div className="w-1 ml-1" /> // 갈매기 버튼이 없는 경우 손잡이와 텍스트 사이의 공간 최소화
                        )}

                        {isEditing ? (
                            <div className="flex-1 flex items-center gap-1 ml-1">
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
                                    className="h-5 w-5 hover:bg-green-100"
                                    onClick={() => handleSave(menu.id)}
                                >
                                    <Save className="h-3 w-3 text-green-600" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 hover:bg-gray-100"
                                    onClick={handleCancel}
                                >
                                    <X className="h-3 w-3 text-gray-600" />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <span className="text-sm truncate ml-1 text-gray-700">{menu.name}</span>
                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 hover:bg-blue-100"
                                        onClick={() => handleEdit(menu.id, menu.name)}
                                    >
                                        <Pencil className="h-3 w-3 text-blue-600" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-5 w-5 hover:bg-red-50"
                                        onClick={() => handleDelete(menu.id)}
                                        disabled={isDeleting} // 삭제 중이면 버튼 비활성화
                                    >
                                        <Trash className="h-3 w-3 text-red-500" />
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-1">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(event) => handleDragEnd(event, menu.id.toString())}
                        >
                            <SortableContext
                                items={menu.items}
                                strategy={verticalListSortingStrategy}
                            >
                                {menu.items.map((subMenu) => (
                                    <SortableMenuItem
                                        key={subMenu.id}
                                        menu={subMenu}
                                        depth={depth + 1}
                                        parentId={menu.id.toString()}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
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
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-lg bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-gray-800">메뉴 구조 설정</DialogTitle>
                    </DialogHeader>

                    <div className="mt-4 max-h-[80vh] overflow-y-auto pr-4 -mr-4">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(event) => handleDragEnd(event)}
                        >
                            <SortableContext
                                items={sideMenus}
                                strategy={verticalListSortingStrategy}
                            >
                                {sideMenus?.map((menu) => (
                                    <SortableMenuItem key={menu.id} menu={menu} />
                                ))}
                            </SortableContext>
                        </DndContext>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DialogButtonForSideMenuSetting;
