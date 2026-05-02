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
let nextMenuId = 1000;

const menusByShopTag = {
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
      id: 7,
      shopId: 1,
      name: '브라질리언 왁싱',
      description: '브라질리언 왁싱 시술',
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 8,
      shopId: 1,
      name: '페이스 왁싱',
      description: '얼굴 왁싱 시술',
      isActive: true,
      sortOrder: 2,
    },
  ],
  101: [
    {
      id: 101,
      shopId: 65,
      name: '기본 손관리',
      description: '손톱 정리와 기본 케어',
      isActive: true,
      sortOrder: 0,
    },
  ],
};

const parseTagIds = (url) =>
  url.searchParams
    .getAll('tagIds')
    .flatMap((value) => String(value).split(','))
    .map(Number)
    .filter(Boolean);

const getTagsForMenu = (menuId, shopId) =>
  Object.entries(menusByShopTag)
    .filter(([tagId]) => tagId !== '__unlinked')
    .filter(([, menus]) => menus.some((menu) => menu.id === menuId && String(menu.shopId) === String(shopId)))
    .map(([tagId]) => {
      const tag = (shopTagsByShopId[String(shopId)] ?? []).find((shopTag) => shopTag.id === Number(tagId));
      return tag ? { id: tag.id, name: tag.name } : null;
    })
    .filter(Boolean);

const withMenuTags = (menu) => ({
  ...menu,
  tags: getTagsForMenu(menu.id, menu.shopId),
});

const getActiveMenus = (shopId, tagIds) => {
  const tagMenus =
    tagIds.length > 0
      ? tagIds.flatMap((tagId) => menusByShopTag[tagId] ?? [])
      : Object.values(menusByShopTag).flat();

  const seen = new Set();
  return tagMenus
    .filter((menu) => String(menu.shopId) === String(shopId) && menu.isActive)
    .filter((menu) => {
      if (seen.has(menu.id)) return false;
      seen.add(menu.id);
      return true;
    })
    .map(withMenuTags);
};

export const handlers = [
  http.get(`${BASE}/shop/link`, () => {
    return HttpResponse.json({
      shopId: 65,
      fullUrl: 'https://snapbook.store/s/mock-shop',
      canonicalUrl: '/s/mock-shop',
      slug: 'mock-shop',
      publicCode: 'MOCKSHOP',
    });
  }),

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

  // 점주 관리용 상점별 태그(카테고리) 전체 조회
  http.get(`${BASE}/api/shops/:shopId/tags/manage`, ({ params }) => {
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

  // 상점별 태그(카테고리) 수정
  http.patch(`${BASE}/api/shops/:shopId/tags/:tagId`, async ({ params, request }) => {
    const shopId = String(params.shopId);
    const tagId = Number(params.tagId);
    const { name } = await request.json();
    const shopTags = shopTagsByShopId[shopId] ?? [];
    const target = shopTags.find((tag) => tag.id === tagId);

    if (!target) {
      return HttpResponse.json({ code: 'SHOP_TAG_MISMATCH' }, { status: 400 });
    }

    if (shopTags.some((tag) => tag.id !== tagId && tag.name === name)) {
      return HttpResponse.json({ code: 'SHOP_TAG_ALREADY_EXISTS' }, { status: 409 });
    }

    target.name = name;
    return HttpResponse.json(target);
  }),

  // 상점별 태그(카테고리) 삭제
  http.delete(`${BASE}/api/shops/:shopId/tags/:tagId`, ({ params }) => {
    const shopId = String(params.shopId);
    const tagId = Number(params.tagId);
    const shopTags = shopTagsByShopId[shopId] ?? [];
    shopTagsByShopId[shopId] = shopTags.filter((tag) => tag.id !== tagId);
    delete menusByShopTag[tagId];
    return new HttpResponse(null, { status: 200 });
  }),

  // 태그(카테고리)별 메뉴 목록 조회
  http.get(`${BASE}/api/shops/:shopId/menus`, ({ params, request }) => {
    const url = new URL(request.url);
    const tagIds = parseTagIds(url);

    return HttpResponse.json(getActiveMenus(params.shopId, tagIds));
  }),

  // 메뉴 생성
  http.post(`${BASE}/api/shops/:shopId/menus`, async ({ params, request }) => {
    const shopId = Number(params.shopId);
    const { name, description, sortOrder } = await request.json();
    const menu = {
      id: nextMenuId++,
      shopId,
      name,
      description,
      isActive: true,
      sortOrder,
    };
    menusByShopTag.__unlinked = [...(menusByShopTag.__unlinked ?? []), menu];

    return HttpResponse.json(menu, { status: 201 });
  }),

  // 메뉴 수정
  http.patch(`${BASE}/api/shops/:shopId/menus/:menuId`, async ({ params, request }) => {
    const menuId = Number(params.menuId);
    const body = await request.json();
    const menu = Object.values(menusByShopTag)
      .flat()
      .find((item) => item.id === menuId);

    if (!menu) {
      return HttpResponse.json({ code: 'MENU_NOT_FOUND' }, { status: 404 });
    }

    Object.assign(menu, body);
    return HttpResponse.json(withMenuTags(menu));
  }),

  // 메뉴 비활성화
  http.delete(`${BASE}/api/shops/:shopId/menus/:menuId`, ({ params }) => {
    const menuId = Number(params.menuId);
    Object.values(menusByShopTag)
      .flat()
      .filter((menu) => menu.id === menuId)
      .forEach((menu) => {
        menu.isActive = false;
      });
    return new HttpResponse(null, { status: 200 });
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

    const menuId = Number(params.menuId);
    const menu = Object.values(menusByShopTag)
      .flat()
      .find((item) => item.id === menuId);

    if (menu) {
      menusByShopTag[tagId] = menusByShopTag[tagId] ?? [];
      if (!menusByShopTag[tagId].some((item) => item.id === menuId)) {
        menusByShopTag[tagId].push(menu);
      }
    }

    return HttpResponse.json(
      {
        menuId,
        tagId,
      },
      { status: 201 }
    );
  }),

  // 메뉴에서 태그 제거
  http.delete(`${BASE}/api/shops/:shopId/menus/:menuId/tags/:tagId`, ({ params }) => {
    const tagId = Number(params.tagId);
    const menuId = Number(params.menuId);
    menusByShopTag[tagId] = (menusByShopTag[tagId] ?? []).filter((menu) => menu.id !== menuId);
    return new HttpResponse(null, { status: 200 });
  }),
];
