// src\app\lcms-admin\teacher-admin\layout.tsx
import CommonSideMenu from "@/components/menu/CommonSideMenu";

export default function TeacherAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // 데이터 로딩을 위해 hook 호출

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r min-h-screen">
                <CommonSideMenu />
            </aside>
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}