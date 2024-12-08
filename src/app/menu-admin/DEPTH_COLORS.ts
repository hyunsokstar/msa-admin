export const DEPTH_COLORS = {
  0: '#1a1a1a',  // 진한 회색
  1: '#404040',  // 중간 회색
  2: '#666666',  // 연한 회색
} as const;

/**
 * 메뉴 경로의 깊이를 계산하는 함수
 * @param path 메뉴 경로 (예: '/menu1/submenu2/item3')
 * @returns 경로의 깊이 (레벨)
 */
export const getMenuDepth = (path: string): number => {
  return path.split('/').filter(Boolean).length;
};