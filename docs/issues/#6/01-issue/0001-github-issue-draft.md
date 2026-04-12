# [FIX]: 패키지 C - 채팅 예약 카드 응답 모델 전환 및 staffId 가드

Issue: `#6`
Issue URL: https://github.com/WAP-SNAPBOOK/codex-FE/issues/6
Repository: `WAP-SNAPBOOK/codex-FE`
Base Branch: `develop`
Suggested Branch: `fix/jiseob/#6`

## 배경

- 채팅 예약 카드가 아직 제거된 예약 옵션형 필드(`part`, `removal`, `extendCount`, `wrappingCount`, `requests`, `photoUrls`)에 의존한다.
- 최신 예약 상세 계약은 `requirements`, `imageUrls`, `imageCount`, `menus`, `menus[].inputValues` 기준으로 읽어야 한다.
- 예약 생성 페이지는 `staffId` 쿼리 파라미터가 없을 때 잘못된 payload를 보낼 수 있다.

## 범위

- 채팅 예약 상세 카드의 데이터 기준을 최신 계약으로 전환한다.
- 소켓/정규화 경로에서 제거된 필드 의존을 없앤다.
- 채팅 예약 확정 UI가 `{ id, message, durationMinutes, startAt? }` 계약을 따르도록 정리한다.
- 예약 생성 페이지에서 `staffId` 누락 시 제출을 차단하거나 에러 안내로 막는다.

## 완료 조건

- 채팅 예약 상세 카드가 `requirements`, `imageUrls`, `imageCount`, `menus` 기준으로 정상 렌더링된다.
- `part`, `removal`, `extend`, `wrapping` 없이도 카드가 깨지지 않는다.
- 채팅 내 예약 확정이 최신 mutation 계약을 사용한다.
- `staffId` 없는 상태로 `POST /api/reservations`가 나가지 않는다.

## 리스크

- 채팅 메시지 정규화 경로와 상세 조회 응답 구조가 달라 회귀 가능성이 있다.
- 예약 확정 카드와 예약 생성 페이지가 서로 다른 입력 계약을 쓰고 있어 공용 UI 변경 시 영향 범위를 확인해야 한다.
