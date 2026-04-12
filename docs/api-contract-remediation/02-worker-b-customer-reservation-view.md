# Worker B Handoff

## 작업명

고객 예약 조회 화면의 응답 모델 전환

## 우선순위

`P1`

## 목표

고객 예약 목록 화면이 `#105` 이후 표준 예약 조회 응답을 기준으로 동작하도록 정리한다.

---

## 참고 문서

- `docs/frontend-api-contract-audit-2026-04-09.md`
- `docs/api-contract-remediation/00-overview-and-sequence.md`
- `BE/docs/issues/#105/frontend-api-handoff.md`
- `BE/docs/api/04-api-spec-by-flow.md`

중점 참고:

- `조회 응답 영향`
- `B-5. 예약 상세 조회`

---

## 현재 문제

고객 예약 목록 화면은 아직 아래 필드를 중심으로 구성돼 있다.

- `part`
- `removal`
- `extendStatus`
- `wrappingStatus`
- `extendCount`
- `wrappingCount`
- `requests`
- `photoUrls`

하지만 문서 기준 최신 응답은 아래를 표준으로 본다.

- `requirements`
- `imageUrls`
- `imageCount`
- `menus`

그리고 아래 필드는 제거 대상으로 명시돼 있다.

- `part`
- `removal`
- `extend`
- `wrapping`

---

## 소유 파일

- `src/pages/CustomerReservation/CustomerReservationList.jsx`
- 필요 시 `src/pages/CustomerReservation/CustomerReservationList.css`

가능하면 이 범위를 넘지 않는다.

---

## 해야 할 일

### 1. 조회 데이터 읽는 기준 변경

우선 사용:

- `requirements`
- `imageUrls`
- `imageCount`
- `menus`

레거시 fallback 허용:

- `requests`
- `photoUrls`
- `photoCount`

단, 제거된 필드는 새 기준으로 사용하지 않는다.

### 2. 상세 UI 단순화

현재 옵션형 상세 UI는 계약과 맞지 않으므로 정리한다.

유지할 정보:

- 고객명
- 예약 날짜
- 예약 시간
- 요구사항
- 이미지
- 점주 전달 사항 또는 거절 사유

가능하면 추가 표시:

- 선택 메뉴 목록
- 메뉴별 입력값 스냅샷

가이드:

- 메뉴 표시가 과하게 복잡해지지 않게 단순 리스트로 처리한다.
- 메뉴가 없으면 숨기거나 빈 상태로 둔다.

### 3. 제거된 옵션형 필드 렌더링 제거

다음 UI는 제거 대상이다.

- 손/발
- 제거
- 연장
- 랩핑

이 정보는 문서상 더 이상 신뢰 가능한 계약이 아니다.

---

## 이번 작업에서 굳이 하지 않을 것

- 점주 예약 목록 수정
- 채팅 예약 카드 수정
- 예약 확정 mutation 수정
- 예약 생성 플로우 수정

---

## 완료 기준

1. 고객 예약 목록 화면이 표준 응답 필드 중심으로 동작한다.
2. 제거된 예약 옵션형 필드를 렌더링하지 않는다.
3. 이미지와 요구사항이 표준 필드 기준으로 정상 표시된다.
4. 레이아웃은 현재 화면에서 과하게 벗어나지 않는다.

---

## 검증 방법

1. mock 또는 실제 응답에서 `requirements`, `imageUrls`, `menus`를 넣었을 때 화면이 깨지지 않는지 확인한다.
2. `requests`만 있고 `requirements`가 없을 때 과도기 fallback이 동작하는지 확인한다.
3. `part`, `removal`, `extend`, `wrapping`이 없어도 화면이 정상 렌더링되는지 확인한다.

---

## 작업자 메모

- 이 작업은 UI 재디자인이 아니라 데이터 계약 정렬 작업이다.
- 메뉴 스냅샷 표시는 있으면 좋지만, 핵심은 제거된 필드를 걷어내고 표준 필드로 전환하는 것이다.

