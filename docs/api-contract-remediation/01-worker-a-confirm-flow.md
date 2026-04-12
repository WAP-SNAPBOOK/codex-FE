# Worker A Handoff

## 작업명

예약 확정 API 계약 정렬 + 점주 예약 화면 정리

## 우선순위

`P1`

## 목표

점주가 예약을 확정하는 플로우를 최신 백엔드 계약에 맞춘다.

핵심은 다음 2가지다.

1. `PUT /api/reservations/{id}/confirm` 요청 바디를 최신 계약에 맞춘다.
2. 점주 예약 목록 화면이 더 이상 제거된 예약 필드에 의존하지 않도록 정리한다.

---

## 참고 문서

- `docs/frontend-api-contract-audit-2026-04-09.md`
- `docs/api-contract-remediation/00-overview-and-sequence.md`
- `BE/docs/api/04-api-spec-by-flow.md`

특히 아래 섹션을 본다.

- `B-5. 예약 상세 조회`
- `B-6. 예약 확정 - 점주`
- `B-7. 예약 거절 - 점주`

---

## 현재 문제

현재 프론트는 예약 확정 시 `message`만 보내고 있다.

하지만 최신 계약은 아래 형식이다.

```json
{
  "message": "내일 10시에 방문해주세요",
  "durationMinutes": 60,
  "startAt": "10:30"
}
```

즉:

- `message` 필수
- `durationMinutes` 필수
- `startAt` 선택

또한 점주 예약 목록 화면은 아직 `requests`, `photoUrls`, `part`, `removal`, `extendCount`, `wrappingCount` 등
제거되었거나 레거시인 필드를 중심으로 그려져 있다.

---

## 소유 파일

- `src/api/services/shopReservation.js`
- `src/query/reservationQueries.js`
- `src/pages/OwnerReservation/ownerReservationList.jsx`

가능하면 이 범위를 넘지 않는다.

---

## 해야 할 일

### 1. 예약 확정 mutation 입력 계약 정리

목표 입력 형태:

```js
{
  id,
  message,
  durationMinutes,
  startAt, // optional
}
```

작업:

- service layer가 위 형태를 받을 수 있게 정리
- query mutation도 같은 입력 계약을 받도록 정리
- 에러 처리 문구는 유지하되, 계약 위반 가능성을 줄이는 방향으로 정리

### 2. 점주 예약 목록의 확정 UI를 최신 계약에 맞추기

현재 화면에는 duration 조절 UI가 이미 있으므로,
적어도 `durationMinutes`는 반드시 요청에 포함되게 만든다.

가이드:

- 현재 plus/minus 및 preset UI가 실제 duration 선택으로 연결되게 한다.
- `startAt` 조정 UX가 애매하면 이번 작업에서는 생략 가능하다.
- 이 경우 `startAt`은 보내지 않거나 `undefined`로 처리한다.
- 중요한 것은 `durationMinutes` 누락이 없어야 한다는 점이다.

### 3. 점주 예약 목록의 조회 표시 필드 정리

점주 화면에서 아래 항목은 제거 대상으로 본다.

- 손/발
- 제거
- 연장
- 랩핑

대신 최소한 아래 정보가 안정적으로 보이게 정리한다.

- 고객명
- 예약 날짜
- 예약 시간
- 요구사항
- 이미지 목록
- 확정 메시지 / 거절 사유

추가로 가능하면 `menus` 스냅샷을 간단한 목록 형태로 보여도 된다.
다만 과한 UI 재구성은 하지 않는다.

---

## 이번 작업에서 굳이 하지 않을 것

- 채팅 예약 카드 수정
- 고객 예약 목록 수정
- 예약 생성 페이지 `staffId` 가드 수정
- 새로운 디자인 시스템 도입

---

## 완료 기준

1. 점주 예약 확정 요청이 `message + durationMinutes (+ optional startAt)` 구조로 전송된다.
2. 점주 예약 목록 화면이 제거된 예약 필드에 새로 의존하지 않는다.
3. 화면은 기존 레이아웃을 크게 깨지지 않게 유지한다.

---

## 검증 방법

1. 점주 예약 목록에서 예약 확정 요청 payload를 확인한다.
2. `durationMinutes`가 실제로 포함되는지 확인한다.
3. 점주 예약 목록 화면에서 제거된 예약 옵션형 필드가 렌더링되지 않는지 확인한다.
4. 확정/거절 후 메시지 표시가 유지되는지 확인한다.

---

## 작업자 메모

- `startAt`은 문서상 optional이다. UX가 명확하지 않으면 이번 작업에서는 무리해서 넣지 않아도 된다.
- 이 작업의 핵심은 예약 확정 API를 더 이상 깨지 않게 만드는 것이다.

