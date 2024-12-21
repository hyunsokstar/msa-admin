// src/api/apiForGetMenusData.ts
import getSupabase from '@/lib/supabaseClient';
import { UpdateHeaderNavDto } from '@/types/typeForMenu';

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
       console.log("1. 쿼리 시작");
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
       
       console.log("2. 쿼리 완료", {
           데이터존재: !!menuData,
           데이터길이: menuData?.length,
           에러: error
       });

       if (error) {
           console.error('메뉴 데이터 조회 실패:', error);
           return null;
       }

       if (!menuData?.length) {
           console.warn('메뉴 데이터가 없습니다');
           return [];
       }

       console.log("3. 메뉴 맵 생성 시작");
       const menuMap = new Map<number, MenuItemType>();
       const rootMenus: MenuItemType[] = [];

       // 디버깅을 위한 데이터 출력
       console.log("4. 받은 데이터 샘플:", menuData.slice(0, 2));

       menuData.forEach((item, index) => {
           console.log(`5-${index}. 아이템 처리:`, item.id);
           menuMap.set(item.id, {
               key: (key: any) => {},
               id: item.id,
               name: item.name,
               path: item.path,
               sort_order: item.sort_order,
               items: []
           });
       });

       console.log("6. 부모-자식 관계 설정 시작");
       menuData.forEach((item, index) => {
           console.log(`7-${index}. 관계 처리:`, {
               아이디: item.id,
               부모아이디: item.parent_id
           });
           
           const menuItem = menuMap.get(item.id);
           if (!menuItem) {
               console.warn(`메뉴 아이템 없음: ${item.id}`);
               return;
           }

           if (item.parent_id) {
               const parentItem = menuMap.get(item.parent_id);
               if (parentItem) {
                   parentItem.items.push(menuItem);
               } else {
                   console.warn(`부모 메뉴 없음: ${item.parent_id}`);
                   rootMenus.push(menuItem);
               }
           } else {
               rootMenus.push(menuItem);
           }
       });

       console.log("8. 최종 결과", {
           메뉴맵크기: menuMap.size,
           루트메뉴수: rootMenus.length
       });

       return rootMenus;

   } catch (error) {
       console.error('메뉴 데이터 처리 중 상세 에러:', {
           에러: error,
           타입: typeof error,
           메시지: error instanceof Error ? error.message : '알 수 없는 에러'
       });
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

export async function apiForUpdateHeaderNav(
    menuId: number, 
    updateData: UpdateHeaderNavDto
): Promise<MenuItemType> {
    const supabase = getSupabase();
    
    if (!supabase) {
        throw new Error('Supabase 클라이언트를 초기화하지 못했습니다.');
    }

    try {
        const { data, error } = await supabase
            .from('menus')
            .update({
                name: updateData.name,
                path: updateData.path,
                // updated_at: new Date().toISOString()
            })
            .eq('id', menuId)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        if (!data) {
            throw new Error('메뉴 업데이트 후 데이터를 찾을 수 없습니다.');
        }

        return {
            key: (key: any) => {},
            id: data.id,
            name: data.name,
            path: data.path,
            sort_order: data.sort_order,
            items: []
        };
    } catch (error) {
        console.error('메뉴 헤더 업데이트 중 오류:', error);
        throw error;
    }
}