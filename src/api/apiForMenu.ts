// src/api/apiForGetMenusData.ts
import getSupabase from '@/lib/supabaseClient';

// MenuItemType 타입 선언
export type MenuItemType = {
    key(key: any): void;
    id: number;
    name: string;
    path: string;
    sort_order: number;
    items: MenuItemType[];
};

/**
 * 메뉴 ID로 삭제 (Cascade 삭제)
 * @param menuId 삭제할 메뉴의 ID
 * @returns 성공 여부
 */
export async function apiForDeleteMenuForMenuId(menuId: number): Promise<boolean> {
    const supabase = getSupabase();

    if (!supabase) {
        console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
        return false;
    }

    try {
        const { error } = await supabase
            .from('menus')
            .delete()
            .eq('id', menuId);

        if (error) {
            console.error('메뉴 삭제 중 오류 발생:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('메뉴 삭제 중 예외 발생:', error);
        return false;
    }
}

export async function apiForGetMenusData(): Promise<MenuItemType[] | null> {
    const supabase = getSupabase();

    if (!supabase) {
        console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
        return null;
    }

    try {
        const { data, error } = await supabase
            .from('menus')
            .select('*')
            .order('parent_id', { ascending: true })
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('메뉴 데이터를 가져오는 중 오류 발생:', error);
            return null;
        }

        if (!data) {
            console.warn('메뉴 데이터를 찾을 수 없습니다.');
            return null;
        }

        // console.log("Fetched raw data from Supabase:", data);

        // 메뉴 항목을 매핑하여 id를 기준으로 접근할 수 있게 만듭니다.
        const menuMap: { [key: number]: MenuItemType } = {};
        data.forEach((item) => {
            menuMap[item.id] = {
                key: (key: any) => { },
                id: item.id,
                name: item.name,
                path: item.path,
                sort_order: item.sort_order,
                items: []
            };
        });

        // 부모-자식 관계 설정
        const rootMenus: MenuItemType[] = [];
        data.forEach((item) => {
            if (item.parent_id && menuMap[item.parent_id]) {
                menuMap[item.parent_id].items.push(menuMap[item.id]);
            } else if (!item.parent_id) {
                rootMenus.push(menuMap[item.id]);
            }
        });

        return rootMenus;
    } catch (error) {
        console.error('메뉴 데이터를 가져오는 중 예외 발생:', error);
        return null;
    }
}

export default apiForGetMenusData;

// api/apiForMenu.ts에 삭제 함수 추가
export const apiForDeleteMenu = async (menuId: number): Promise<boolean> => {
    console.log('API 호출 시작:', menuId);
    const supabase = getSupabase();

    if (!supabase) {
        console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
        return false;
    }

    try {
        const { error } = await supabase
            .from('menus')
            .delete()
            .eq('id', menuId);

        if (error) {
            console.error('Supabase 에러:', error);
            throw error;
        }

        console.log('삭제 완료:', menuId);
        return true;
    } catch (error) {
        console.error('메뉴 삭제 중 오류 발생:', error);
        return false;
    }
};
