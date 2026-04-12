# `[FIX]: Align owner reservation confirm contract and list fields`

Issue: `#4`  
Created: `2026-04-10`  
Repository: `WAP-SNAPBOOK/codex-FE`  
Issue URL: `https://github.com/WAP-SNAPBOOK/codex-FE/issues/4`  
Branch: `fix/jiseob/#4`

---

## Background

`docs/api-contract-remediation/00-overview-and-sequence.md` 기준 Package A는 점주 예약 확정 플로우와 점주 예약 목록 화면을 최신 백엔드 계약에 맞추는 작업이다.
현재 프론트는 예약 확정 요청에서 `message`만 전송하고 있고, 점주 예약 목록도 제거된 예약 옵션형 필드에 계속 의존하고 있다.

## Problem

- `PUT /api/reservations/{id}/confirm` 요청에 필수 필드 `durationMinutes`가 누락되어 최신 계약과 맞지 않는다.
- 점주 예약 목록 화면이 `requests`, `photoUrls`, `part`, `removal`, `extendCount`, `wrappingCount` 같은 레거시/제거 필드를 중심으로 데이터를 읽고 있다.
- `useConfirmReservation` 입력 계약을 정리하지 않으면 후속 패키지의 채팅 예약 확정 플로우도 기준을 맞추기 어렵다.

## Goal

점주 예약 확정 요청을 최신 API 계약에 맞추고, 점주 예약 목록 화면이 표준 예약 조회 필드를 우선 사용하도록 정리한다.

## Scope

- `src/api/services/shopReservation.js`에서 예약 확정 요청 payload를 `{ id, message, durationMinutes, startAt? }` 기준으로 정리한다.
- `src/query/reservationQueries.js`에서 예약 확정 mutation 입력 계약을 같은 구조로 정리한다.
- `src/pages/OwnerReservation/ownerReservationList.jsx`에서 점주 예약 확정 UI가 실제 선택된 시술 시간을 `durationMinutes`로 전송하도록 수정한다.
- 점주 예약 목록 화면에서 제거된 예약 옵션형 필드 의존을 줄이고 `requirements`, `imageUrls`, `imageCount`를 우선 사용하도록 정리한다.
- 기존 점주 예약 화면 레이아웃과 거절/확정 결과 메시지 동작은 크게 깨지 않게 유지한다.

## Out Of Scope

- 고객 예약 목록 화면 수정
- 채팅 예약 카드 상세 모델 전환 전반
- 예약 생성 페이지 `staffId` 가드 수정
- 새로운 UI 재설계

## Acceptance Criteria

- [ ] 점주 예약 확정 요청이 `message + durationMinutes (+ optional startAt)` 구조로 전송된다.
- [ ] 점주 예약 목록 화면에서 제거된 예약 옵션형 필드(`part`, `removal`, `extend`, `wrapping`)에 새로 의존하지 않는다.
- [ ] 점주 예약 목록 화면이 `requirements`, `imageUrls`, `imageCount`를 표준으로 우선 사용한다.
- [ ] 점주 예약 확정/거절 후 결과 메시지 표시가 유지된다.

## Risks

- `useConfirmReservation`는 채팅 예약 확정 플로우에서도 사용 중이라 입력 계약 변경 시 호환성 처리가 필요할 수 있다.
- 점주 예약 조회 응답은 과도기 레거시 필드를 함께 내려줄 수 있으므로 표준 필드 우선 + 최소 fallback 전략이 필요하다.

## References

- `docs/api-contract-remediation/00-overview-and-sequence.md`
- `docs/api-contract-remediation/01-worker-a-confirm-flow.md`
- `docs/frontend-api-contract-audit-2026-04-09.md`
- `BE/docs/api/04-api-spec-by-flow.md`
- `BE/docs/issues/#105/frontend-api-handoff.md`
