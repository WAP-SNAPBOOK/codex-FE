import { http, HttpResponse } from 'msw';

const BASE = import.meta.env.VITE_API_BASE_URL ?? '';
const globalTags = [{ id: 4, name: '손관리' }];
const shopTagsByShopId = {
  1: [
    { id: 1, name: '네일' },
    { id: 3, name: '왁싱' },
    { id: 4, name: '치킨' },
    { id: 5, name: '피자' },
    { id: 7, name: '짜장면' },
  ],
  65: [{ id: 101, name: '손관리' }],
};
let nextGlobalTagId = 5;
let nextShopTagId = 102;

export const handlers = [
  // 전역 태그 정의 목록 조회
  http.get(`${BASE}/api/tags`, () => {
    return HttpResponse.json(globalTags);
  }),

  // 전역 태그 정의 생성
  http.post(`${BASE}/api/tags`, async ({ request }) => {
    const { name } = await request.json();
    const created = { id: nextGlobalTagId++, name };
    globalTags.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  // 상점별 태그(카테고리) 목록 조회
  http.get(`${BASE}/api/shops/:shopId/tags`, ({ params }) => {
    const shopId = String(params.shopId);
    return HttpResponse.json(shopTagsByShopId[shopId] ?? []);
  }),

  // 상점별 태그(카테고리) 생성
  http.post(`${BASE}/api/shops/:shopId/tags`, async ({ params, request }) => {
    const shopId = String(params.shopId);
    const { name } = await request.json();

    if (!shopTagsByShopId[shopId]) {
      shopTagsByShopId[shopId] = [];
    }

    const created = { id: nextShopTagId++, name };
    shopTagsByShopId[shopId].push(created);

    return HttpResponse.json(created, { status: 201 });
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

  // 메뉴에 태그 연결
  http.post(`${BASE}/api/shops/:shopId/menus/:menuId/tags`, async ({ params, request }) => {
    const shopId = String(params.shopId);
    const { tagId } = await request.json();
    const shopTags = shopTagsByShopId[shopId] ?? [];

    const matchedShopTag = shopTags.find((tag) => tag.id === tagId);
    if (!matchedShopTag) {
      return HttpResponse.json(
        {
          code: 'SHOP_TAG_MISMATCH',
          message: '메뉴 연결에는 상점 태그 ID를 사용해야 합니다.',
        },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      {
        menuId: Number(params.menuId),
        tagId,
      },
      { status: 201 }
    );
  }),
];
