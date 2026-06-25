# `[FIX]: 메뉴 연결 시 상점 태그 id를 사용하도록 수정`

Issue: `#168`  
Created: `2026-04-09`  
Repository: `WAP-SNAPBOOK/FE`  
Issue URL: `https://github.com/WAP-SNAPBOOK/FE/issues/168`  
Branch: `fix/jiseob/#168`

---

## 배경

2026년 4월 9일 운영에서 메뉴-태그 연결 흐름 실패가 확인되었습니다.
현재 프론트는 `POST /api/tags`로 전역 태그를 만든 뒤, 그 응답 `id`를 그대로 `POST /api/shops/{shopId}/menus/{menuId}/tags`의 `tagId`로 전달하고 있습니다.

## 문제

이 흐름은 `400 SHOP_TAG_MISMATCH`로 실패합니다.
메뉴-태그 연결 API는 `/api/tags`에서 받은 전역 태그 id가 아니라, `POST /api/shops/{shopId}/tags` 또는 `GET /api/shops/{shopId}/tags`에서 받은 상점 태그 id를 기대하기 때문입니다.

현재 프론트 구현도 동일한 실패 흐름을 따르고 있으며, 특히 아래 파일과 직접 연결됩니다.
- `src/query/signupQueries.js`
- `src/query/shopManage/tagQueries.js`
- `src/api/services/tagService.js`
- `src/api/services/menuService.js`

## 목표

메뉴-태그 연결 시 전역 태그 id가 아니라 상점 태그 id(`shopTagId`)를 일관되게 사용하도록 수정합니다.

## 범위

- 상점별 태그 생성/조회 API 흐름으로 정리 또는 전환
- 점주 회원가입 메뉴 설정 플로우에서 메뉴 연결 시 올바른 태그 id 사용
- 현재 `tagId` 명명과 주석에서 전역 태그 id와 상점 태그 id가 혼동되지 않도록 정리
- 수정된 계약이 mock, 테스트 또는 재현 가능한 검증 절차에 반영되도록 정리

## 범위 외

- 백엔드 API 계약 변경
- 예약 UI 또는 태그 UI의 무관한 리팩터링

## 완료 조건

- [ ] 프론트가 `POST /api/tags` 응답의 `id`를 `POST /api/shops/{shopId}/menus/{menuId}/tags`에 전달하지 않는다.
- [ ] 프론트가 `POST /api/shops/{shopId}/tags` 또는 `GET /api/shops/{shopId}/tags` 응답의 `id`를 메뉴 연결 payload `tagId`로 사용한다.
- [ ] 새로 만든 태그에 대해서도 점주 회원가입 또는 메뉴 설정 플로우에서 `SHOP_TAG_MISMATCH`가 재현되지 않는다.
- [ ] 수정된 계약이 mock, 테스트 또는 문서화된 로컬 검증 절차에 반영된다.

## 리스크

- 기존 코드 경로가 전역 태그 id 형태를 계속 가정하면 동일한 문제가 다시 유입될 수 있습니다.
- 상점 태그 응답 구조가 현재 가정과 다르면 점주 회원가입 또는 메뉴 설정 플로우에 회귀가 생길 수 있습니다.

## 참조

- 2026-04-09 운영 검증: `/api/tags` -> `/api/shops/{shopId}/menus/{menuId}/tags` 호출 시 `400 SHOP_TAG_MISMATCH`
- `src/query/signupQueries.js`
- `src/query/shopManage/tagQueries.js`
- `src/api/services/tagService.js`
- `src/api/services/menuService.js`
