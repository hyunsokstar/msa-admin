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

// export async function apiForGetMenusData(): Promise<MenuItemType[] | null> {

//     const supabase = getSupabase();

//     console.log("menu data 가져오기 api 호출");
    

//     if (!supabase) {
//         console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
//         return null;
//     }

//     try {
//         const { data, error } = await supabase
//             .from('menus')
//             .select('*')
//             .order('parent_id', { ascending: true })
//             .order('sort_order', { ascending: true });

//         console.log("메뉴 데이터 가져오기 성공 ?", data);
        

//         if (error) {
//             console.error('메뉴 데이터를 가져오는 중 오류 발생:', error);
//             return null;
//         }

//         if (!data) {
//             console.warn('메뉴 데이터를 찾을 수 없습니다.');
//             return null;
//         }

//         // console.log("Fetched raw data from Supabase:", data);

//         // 메뉴 항목을 매핑하여 id를 기준으로 접근할 수 있게 만듭니다.
//         const menuMap: { [key: number]: MenuItemType } = {};
//         data.forEach((item) => {
//             menuMap[item.id] = {
//                 key: (key: any) => { },
//                 id: item.id,
//                 name: item.name,
//                 path: item.path,
//                 sort_order: item.sort_order,
//                 items: []
//             };
//         });

//         // 부모-자식 관계 설정
//         const rootMenus: MenuItemType[] = [];
//         data.forEach((item) => {
//             if (item.parent_id && menuMap[item.parent_id]) {
//                 menuMap[item.parent_id].items.push(menuMap[item.id]);
//             } else if (!item.parent_id) {
//                 rootMenus.push(menuMap[item.id]);
//             }
//         });

//         return rootMenus;
//     } catch (error) {
//         console.error('메뉴 데이터를 가져오는 중 예외 발생:', error);
//         return null;
//     }
// }


export async function apiForGetMenusData(): Promise<MenuItemType[] | null> {

// getSupabase() 함수 호출 시점 체크
console.log("Supabase 클라이언트 초기화 시작", performance.now());
const supabase = getSupabase();
console.log("Supabase 클라이언트 초기화 완료", performance.now());
    
    console.log("메뉴 데이터 요청 시작");

    if (!supabase) {
        console.error("Supabase 클라이언트 초기화 실패");
        return null;
    }

    try {
        // 한 번의 쿼리로 모든 데이터 가져오기
        const { data: menuData, error } = await supabase
            .from('menus')
            .select(`
                id,
                name,
                path,
                parent_id,
                sort_order
            `)
            .order('parent_id', { ascending: true })
            .order('sort_order', { ascending: true });

        if (error) {
            console.error('메뉴 데이터 조회 실패:', error);
            return null;
        }

        if (!menuData?.length) {
            console.warn('메뉴 데이터가 없습니다');
            return [];
        }

        // 메뉴 맵 생성 (한 번의 순회)
        const menuMap = new Map<number, MenuItemType>();
        const rootMenus: MenuItemType[] = [];

        // 모든 메뉴 아이템을 먼저 생성
        menuData.forEach(item => {
            menuMap.set(item.id, {
                key: (key: any) => {},
                id: item.id,
                name: item.name,
                path: item.path,
                sort_order: item.sort_order,
                items: []
            });
        });

        // 부모-자식 관계 설정 (한 번의 순회)
        menuData.forEach(item => {
            const menuItem = menuMap.get(item.id);
            if (!menuItem) return;

            if (item.parent_id) {
                const parentItem = menuMap.get(item.parent_id);
                if (parentItem) {
                    parentItem.items.push(menuItem);
                } else {
                    // 부모가 없는 경우 루트로 처리
                    rootMenus.push(menuItem);
                }
            } else {
                rootMenus.push(menuItem);
            }
        });

        console.log(`메뉴 데이터 로드 완료: ${rootMenus.length}개의 루트 메뉴`);
        return rootMenus;

    } catch (error) {
        console.error('메뉴 데이터 처리 중 오류:', error);
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

interface UpdateMenuOrderParams {
    movingMenuId: number;
    targetMenuId: number;
    newOrder: number;
    targetOrder: number;
}

export async function apiForUpdateMenuOrder({ 
    movingMenuId, 
    targetMenuId,
    newOrder,
    targetOrder 
}: UpdateMenuOrderParams): Promise<boolean> {
    const supabase = getSupabase();

    if (!supabase) {
        console.error("Supabase 클라이언트를 초기화하지 못했습니다.");
        return false;
    }

    try {
        // 먼저 두 메뉴의 현재 데이터를 가져옴
        const { data: menus, error: fetchError } = await supabase
            .from('menus')
            .select('*')
            .in('id', [movingMenuId, targetMenuId]);

        if (fetchError || !menus || menus.length !== 2) {
            console.error('메뉴 데이터 조회 중 오류 발생:', fetchError);
            return false;
        }

        // 각 메뉴의 현재 데이터를 찾음
        const movingMenu = menus.find(menu => menu.id === movingMenuId);
        const targetMenu = menus.find(menu => menu.id === targetMenuId);

        if (!movingMenu || !targetMenu) {
            console.error('메뉴를 찾을 수 없습니다.');
            return false;
        }

        // 각 메뉴의 데이터를 유지하면서 sort_order만 업데이트
        const { error: updateError } = await supabase
            .from('menus')
            .upsert([
                { ...movingMenu, sort_order: newOrder },
                { ...targetMenu, sort_order: targetOrder }
            ]);

        if (updateError) {
            console.error('메뉴 순서 업데이트 중 오류 발생:', updateError);
            return false;
        }

        return true;
    } catch (error) {
        console.error('메뉴 순서 업데이트 중 예외 발생:', error);
        return false;
    }
}
