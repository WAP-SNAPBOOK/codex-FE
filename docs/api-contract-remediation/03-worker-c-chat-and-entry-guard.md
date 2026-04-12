# Worker C Handoff

## 작업명

채팅 예약 카드 응답 모델 전환 + 예약 생성 `staffId` 가드

## 우선순위

`P2`

## 선행 의존성

Worker A가 `useConfirmReservation`의 입력 계약을 먼저 정리한 뒤 착수하는 것을 권장한다.

권장 기준:

```js
{
  id,
  message,
  durationMinutes,
  startAt, // optional
}
```

---

## 목표

채팅방 안의 예약 카드가 최신 예약 상세 계약을 기준으로 동작하게 만들고,
예약 생성 페이지가 `staffId` 누락 상태에서 잘못된 요청을 보내지 않도록 막는다.

---

## 참고 문서

- `docs/frontend-api-contract-audit-2026-04-09.md`
- `docs/api-contract-remediation/00-overview-and-sequence.md`
- `BE/docs/issues/#105/frontend-api-handoff.md`
- `BE/docs/issues/#115/frontend-api-handoff.md`
- `BE/docs/api/04-api-spec-by-flow.md`

중점 참고:

- `B-0. 예약 진입 정보 조회`
- `B-4. 예약 생성`
- `B-5. 예약 상세 조회`
- `B-6. 예약 확정 - 점주`

---

## 현재 문제

채팅 예약 카드는 아직 아래 필드를 전제로 상세 보기를 구성한다.

- `part`
- `removal`
- `extendCount`
- `wrappingCount`
- `requests`
- `photoUrls`

하지만 최신 예약 상세는 아래를 중심으로 읽어야 한다.

- `requirements`
- `imageUrls`
- `imageCount`
- `menus`
- `menus[].inputValues`

또한 예약 생성 페이지는 `staffId`가 없으면 사실상 `0`을 payload에 넣을 수 있다.

---

## 소유 파일

- `src/components/message/ReservationDecisionMessage.jsx`
- `src/components/reservation/ReservationInfoView.jsx`
- `src/hooks/chat/useReservationSocketHandler.js`
- `src/hooks/chat/useNormalizedMessages.js`
- `src/components/message/MessageItem.jsx`
- `src/pages/CustomerReservation/ReservationCreatePage.jsx`

필요 시:

- `src/components/reservation/ReservationConfirmForm.jsx`

---

## 해야 할 일

### 1. 채팅 예약 상세 카드의 데이터 기준 전환

상세 UI는 아래를 우선 표시한다.

- 요구사항
- 이미지
- 선택 메뉴 스냅샷
- 메뉴별 입력값 스냅샷

다음 필드는 제거 대상으로 본다.

- 손/발
- 제거
- 연장
- 랩핑

### 2. 소켓/정규화 경로에서 제거된 필드 의존 제거

현재는 예약 상세 조회 후 payload를 다시 조립하면서 제거된 필드를 복사하고 있다.

가이드:

- 가능하면 예약 상세 응답을 그대로 쓰거나,
- 최소한 표준 필드만 추려서 사용한다.

핵심:

- `requirements`
- `imageUrls`
- `imageCount`
- `menus`
- `confirmationMessage`
- `rejectionReason`

### 3. 채팅 예약 확정 UI가 Worker A의 mutation 계약을 따르게 정리

채팅 예약 카드에서 예약 확정 시 아래 정보가 mutation으로 전달되어야 한다.

- `id`
- `message`
- `durationMinutes`
- `startAt` optional

UX 가이드:

- 현재 채팅 예약 카드에서 duration 선택 UI가 있다면 그대로 연결한다.
- `startAt` 조정 UX가 불명확하면 이번 작업에서는 생략 가능하다.

### 4. 예약 생성 페이지 `staffId` 누락 방어

현재 예약 생성 페이지는 `staffId` 쿼리 파라미터 누락 시 잘못된 payload를 만들 수 있다.

이번 작업에서 최소한 아래 중 하나는 보장한다.

1. `staffId`가 유효하지 않으면 제출 차단
2. `staffId`가 유효하지 않으면 이전 화면 복귀 또는 에러 안내

중요:

- `staffId`가 없는 상태로 `POST /api/reservations`를 보내지 않게 한다.

---

## 이번 작업에서 굳이 하지 않을 것

- 고객 예약 목록 수정
- 점주 예약 목록 수정
- 백엔드 계약 변경 제안
- 예약 진입 화면 자체 재설계

---

## 완료 기준

1. 채팅 예약 상세 카드가 표준 예약 상세 응답 기준으로 동작한다.
2. 제거된 예약 옵션형 필드에 더 이상 의존하지 않는다.
3. 채팅 내 예약 확정이 Worker A 기준 mutation 계약을 사용한다.
4. `staffId` 누락 상태에서 예약 생성 요청이 서버로 나가지 않는다.

---

## 검증 방법

1. 채팅 메시지에서 예약 카드가 열릴 때 상세 정보가 표준 필드 기준으로 표시되는지 확인한다.
2. `requirements`와 `imageUrls`만 있는 응답에서도 카드가 정상 렌더링되는지 확인한다.
3. `part`, `removal`, `extend`, `wrapping`이 없어도 카드가 깨지지 않는지 확인한다.
4. `staffId` 없는 URL로 예약 생성 페이지에 진입했을 때 잘못된 제출이 차단되는지 확인한다.

---

## 작업자 메모

- 이 작업은 채팅 UI 전체 개편이 아니다.
- 핵심은 예약 상세 카드의 데이터 기준을 최신 계약으로 바꾸고,
  잘못된 예약 생성 요청을 막는 것이다.
