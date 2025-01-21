// src/lib/utils/treeUtils.ts
import { PersonalDevSpec } from "@/types/typeForProfile";

export function convertToTreeStructure(items: PersonalDevSpec[]) {
  const itemMap = new Map();
  const rootItems: PersonalDevSpec[] = [];

  items.forEach(item => {
    itemMap.set(item.id, { ...item, children: [] });
  });

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
}