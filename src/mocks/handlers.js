import { http, HttpResponse } from 'msw';

const BASE = import.meta.env.VITE_API_BASE_URL ?? '';

export const handlers = [
  // 상점별 태그(카테고리) 목록 조회
  http.get(`${BASE}/api/shops/:shopId/tags`, () => {
    return HttpResponse.json([
      { id: 1, name: '네일' },
      { id: 3, name: '왁싱' },
      { id: 4, name: '치킨' },
      { id: 5, name: '피자' },
      { id: 7, name: '짜장면' },
    ]);
  }),

  // 태그(카테고리)별 메뉴 목록 조회
  http.get(`${BASE}/api/shops/:shopId/menus`, ({ request }) => {
    const url = new URL(request.url);
    const tagIds = url.searchParams.get('tagIds');

    const menusByTag = {
      1: [
        {
          id: 1,
          shopId: 1,
          name: '젤네일',
          description: '기본 젤네일 시술',
          isActive: false,
          sortOrder: 1,
        },
        {
          id: 2,
          shopId: 1,
          name: '젤아트',
          description: '아트 시술',
          isActive: true,
          sortOrder: 2,
        },
        {
          id: 3,
          shopId: 1,
          name: '젤아트',
          description: '아트 시술',
          isActive: true,
          sortOrder: 2,
        },
        {
          id: 4,
          shopId: 1,
          name: '아트',
          description: '아트 시술',
          isActive: true,
          sortOrder: 2,
        },
        {
          id: 5,
          shopId: 1,
          name: '아트',
          description: '아트 시술',
          isActive: true,
          sortOrder: 2,
        },
        {
          id: 6,
          shopId: 1,
          name: '아트',
          description: '아트 시술',
          isActive: true,
          sortOrder: 2,
        },
      ],
      3: [
        {
          id: 3,
          shopId: 1,
          name: '브라질리언 왁싱',
          description: '브라질리언 왁싱 시술',
          isActive: true,
          sortOrder: 1,
        },
        {
          id: 4,
          shopId: 1,
          name: '페이스 왁싱',
          description: '얼굴 왁싱 시술',
          isActive: true,
          sortOrder: 2,
        },
      ],
    };

    return HttpResponse.json(menusByTag[tagIds] || []);
  }),
];
