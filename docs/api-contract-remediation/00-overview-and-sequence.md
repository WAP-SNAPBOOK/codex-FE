# API 계약 정렬 작업 분배 문서

작성일: `2026-04-09`

## 목적

이 문서는 `docs/frontend-api-contract-audit-2026-04-09.md`에서 확인된 프론트 API 계약 불일치를
실제 작업 가능한 단위로 쪼개어 다른 Codex 작업자에게 넘기기 위한 총괄 문서다.

코드 수정은 아직 시작하지 않았고, 이 문서는 순수 handoff 문서다.

---

## 기준 문서

필수 참고:

- `docs/frontend-api-contract-audit-2026-04-09.md`
- `C:\Users\User\Desktop\wjs\dev\project\SNAPBOOK_BE\BE\docs\api\03-api-spec.md`
- `C:\Users\User\Desktop\wjs\dev\project\SNAPBOOK_BE\BE\docs\api\04-api-spec-by-flow.md`
- `C:\Users\User\Desktop\wjs\dev\project\SNAPBOOK_BE\BE\docs\issues\#105\frontend-api-handoff.md`
- `C:\Users\User\Desktop\wjs\dev\project\SNAPBOOK_BE\BE\docs\issues\#115\frontend-api-handoff.md`

---

## 작업 패키지

### Worker A

- 문서: `docs/api-contract-remediation/01-worker-a-confirm-flow.md`
- 주제: 예약 확정 API 계약 정렬 + 점주 예약 화면 정리
- 우선순위: `P1`
- 의존성: 없음

### Worker B

- 문서: `docs/api-contract-remediation/02-worker-b-customer-reservation-view.md`
- 주제: 고객 예약 조회 화면의 응답 모델 전환
- 우선순위: `P1`
- 의존성: 없음

### Worker C

- 문서: `docs/api-contract-remediation/03-worker-c-chat-and-entry-guard.md`
- 주제: 채팅 예약 카드 응답 모델 전환 + 예약 생성 `staffId` 가드
- 우선순위: `P2`
- 의존성: Worker A의 예약 확정 mutation 시그니처 확정

---

## 권장 실행 순서

### 실행 순서

1. Worker A 시작
2. Worker B 병행 시작 가능
3. Worker A의 `useConfirmReservation` 입력 계약이 정리되면 Worker C 시작

### 권장 머지 순서

1. Worker A
2. Worker B
3. Worker C

이 순서를 권장하는 이유:

- Worker A가 예약 확정 요청 스키마의 기준을 먼저 고정해야 한다.
- Worker B는 고객 예약 목록 화면만 다루므로 비교적 독립적이다.
- Worker C는 채팅 예약 카드에서 예약 확정 mutation을 소비하므로 Worker A 기준이 정리된 뒤 들어가는 편이 안전하다.

---

## 공통 가이드

모든 작업자는 아래 원칙을 따른다.

- 백엔드 문서를 기준 계약으로 본다.
- 새 UI를 크게 디자인하지 않는다.
- 현재 화면 구조를 유지하되, 계약 불일치만 실용적으로 수정한다.
- 제거된 필드에 새 의존성을 추가하지 않는다.
- 표준 필드 우선순위는 아래와 같다.

```txt
requirements
imageUrls
imageCount
menus
menus[].inputValues
```

- 레거시 필드는 과도기 fallback 정도로만 다룬다.

```txt
requests
photoUrls
photoCount
```

- 제거된 필드는 새 코드 기준으로 의존 제거 대상이다.

```txt
part
removal
extend
wrapping
extendCount
wrappingCount
extendStatus
wrappingStatus
```

---

## 파일 소유권

충돌 방지를 위해 아래 소유권을 우선 적용한다.

### Worker A 소유

- `src/api/services/shopReservation.js`
- `src/query/reservationQueries.js`
- `src/pages/OwnerReservation/ownerReservationList.jsx`

### Worker B 소유

- `src/pages/CustomerReservation/CustomerReservationList.jsx`
- 필요 시 `src/pages/CustomerReservation/CustomerReservationList.css`

### Worker C 소유

- `src/components/message/ReservationDecisionMessage.jsx`
- `src/components/reservation/ReservationInfoView.jsx`
- `src/hooks/chat/useReservationSocketHandler.js`
- `src/hooks/chat/useNormalizedMessages.js`
- `src/components/message/MessageItem.jsx`
- `src/pages/CustomerReservation/ReservationCreatePage.jsx`
- 필요 시 `src/components/reservation/ReservationConfirmForm.jsx`

주의:

- `ReservationConfirmForm.jsx`는 Worker A와 Worker C가 모두 건드릴 가능성이 있으므로,
  실제 착수 전 Worker A가 이 파일을 수정할지 여부를 먼저 확정한다.
- 가능하면 Worker A는 mutation 계약과 점주 페이지에 집중하고,
  Worker C가 채팅 예약 카드 쪽 폼 조정을 맡는 편이 충돌이 적다.

---

## 리뷰 포인트

리뷰어는 아래를 중점 확인한다.

1. 예약 확정 요청이 최신 계약에 맞는가
2. 조회 화면이 표준 필드를 우선 사용하고 있는가
3. 제거된 필드 의존이 실제로 사라졌는가
4. `staffId` 누락 시 잘못된 예약 생성 요청을 막는가
5. 불필요한 전면 리팩터링이나 UI 재설계가 들어가지 않았는가

---

## 완료 기준

전체 작업은 아래가 모두 만족되면 종료로 본다.

1. 점주 예약 확정이 최신 요청 바디로 전송된다.
2. 고객/점주/채팅 예약 조회 UI가 표준 응답 필드를 우선 사용한다.
3. 제거된 예약 옵션형 필드 의존이 주요 화면에서 제거된다.
4. 예약 생성 페이지가 `staffId` 누락 상태를 그대로 서버로 보내지 않는다.

