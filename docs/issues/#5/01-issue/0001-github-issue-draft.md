# `[FIX]: Align customer reservation list response model`

Issue: `#5`  
Created: `2026-04-10`  
Repository: `WAP-SNAPBOOK/codex-FE`  
Issue URL: `https://github.com/WAP-SNAPBOOK/codex-FE/issues/5`  
Branch: `fix/jiseob/#5`

---

## Background

`docs/api-contract-remediation/00-overview-and-sequence.md` 기준 Package B는 고객 예약 목록 화면을 `#105` 이후 표준 예약 조회 응답 모델에 맞추는 작업이다.
현재 고객 예약 목록은 제거된 옵션형 필드와 레거시 응답 필드를 중심으로 데이터를 읽고 있어서 최신 백엔드 계약과 어긋나 있다.

## Problem

- 고객 예약 목록 화면이 `part`, `removal`, `extendStatus`, `wrappingStatus`, `extendCount`, `wrappingCount` 같은 제거된 예약 옵션형 필드에 의존한다.
- 표준 조회 응답인 `requirements`, `imageUrls`, `imageCount`, `menus`를 우선 사용하지 않는다.
- 과도기 fallback은 필요하지만, 현재처럼 레거시 필드를 화면 기준 모델로 유지하면 응답 계약이 계속 어긋난다.

## Goal

고객 예약 목록 화면이 표준 예약 조회 응답 필드 중심으로 동작하도록 정리하고, 제거된 옵션형 필드 렌더링을 제거한다.

## Scope

- `src/pages/CustomerReservation/CustomerReservationList.jsx`에서 표준 응답 필드(`requirements`, `imageUrls`, `imageCount`, `menus`)를 우선 사용하도록 정리한다.
- 레거시 fallback(`requests`, `photoUrls`, `photoCount`)은 과도기 호환 수준으로만 유지한다.
- 고객 예약 상세 UI에서 `손/발`, `제거`, `연장`, `랩핑` 렌더링을 제거한다.
- 필요한 경우 `src/pages/CustomerReservation/CustomerReservationList.css`에서 최소 스타일 정리만 수행한다.
- 확정/거절 상태에서 점주 전달 사항 및 거절 사유 표시가 유지되도록 한다.

## Out Of Scope

- 점주 예약 목록 수정
- 채팅 예약 카드 수정
- 예약 확정 mutation 수정
- 예약 생성 플로우 수정

## Acceptance Criteria

- [ ] 고객 예약 목록 화면이 `requirements`, `imageUrls`, `imageCount`, `menus`를 표준 기준으로 읽는다.
- [ ] 제거된 예약 옵션형 필드(`part`, `removal`, `extend`, `wrapping`)를 렌더링하지 않는다.
- [ ] `requirements`가 없을 때만 `requests`, `imageUrls`가 없을 때만 `photoUrls` fallback이 동작한다.
- [ ] 이미지, 요구사항, 점주 전달 사항/거절 사유가 화면에서 계속 정상 표시된다.

## Risks

- 메뉴 스냅샷 구조를 화면에 과하게 풀어내면 기존 레이아웃이 흔들릴 수 있어 단순 리스트 형태가 적절하다.
- 예약 목록 응답이 과도기 레거시 필드를 함께 내려주는 상태일 수 있으므로 표준 우선 + 최소 fallback 전략이 필요하다.

## References

- `docs/api-contract-remediation/00-overview-and-sequence.md`
- `docs/api-contract-remediation/02-worker-b-customer-reservation-view.md`
- `docs/frontend-api-contract-audit-2026-04-09.md`
- `BE/docs/issues/#105/frontend-api-handoff.md`
- `BE/docs/api/04-api-spec-by-flow.md`
