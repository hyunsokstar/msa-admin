// src/constants/menu.ts

export interface MenuItemType {
    key: string;
    name: string;
    subItems?: MenuItemType[];
}

export const HEADER_MENU_ITEMS: MenuItemType[] = [
    {
        key: "task-management",
        name: "작업 관리",
        subItems: [
            { key: "task-list", name: "작업 목록" },
            { key: "create-task", name: "작업 생성" },
            { key: "assigned-tasks", name: "할당된 작업" },
        ],
    },
    {
        key: "collaboration-management",
        name: "협업 관리",
        subItems: [
            { key: "figma", name: "피그마" },
            { key: "erd", name: "ERD" },
            { key: "github", name: "GitHub" },
            { key: "note", name: "노트" },
            { key: "chatting", name: "채팅" },
        ],
    },
    {
        key: "team-management",
        name: "팀 관리",
        subItems: [
            { key: "team-members", name: "팀 멤버 관리" },
            { key: "roles-permissions", name: "역할 및 권한" },
        ],
    },
];
