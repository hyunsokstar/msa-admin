import { PersonalDevSpec, PersonalDevSpecsResponse } from "@/types/typeForProfile";

export const apiForGetPersonalDevSpecs = async (context: any) => {
  try {
    const response = await fetch(
      `/api/personal-dev-specs`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch personal dev specs');
    }

    const responseData: PersonalDevSpecsResponse = await response.json();
    console.log('Response data:', responseData);

    // 트리 구조로 변환
    const convertToTreeStructure = (items: PersonalDevSpec[]) => {
      const itemMap = new Map();
      const rootItems: PersonalDevSpec[] = [];

      // 먼저 모든 아이템을 맵에 저장
      items.forEach(item => {
        itemMap.set(item.id, { ...item, children: [] });
      });

      // 트리 구조 구성
      items
        .sort((a, b) => a.sort_order - b.sort_order)
        .forEach(item => {
          if (item.parent_id === null) {
            rootItems.push(itemMap.get(item.id));
          } else {
            const parentItem = itemMap.get(item.parent_id);
            if (parentItem) {
              parentItem.children.push(itemMap.get(item.id));
            }
          }
        });

      return rootItems;
    };

    return {
      data: convertToTreeStructure(responseData.data)
    };

  } catch (error) {
    console.error('Error in apiForGetPersonalDevSpecs:', error);
    throw error;
  }
};