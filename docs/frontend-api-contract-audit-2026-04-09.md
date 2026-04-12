# 프론트 API 계약 점검 문서

작성일: `2026-04-09`

## 목적

백엔드 API 명세와 프론트 현재 구현을 대조해, 실제 연동 시 깨질 가능성이 있는 API 계약 불일치를 정리한다.

이번 점검은 특히 아래 변경 사항이 프론트에 반영되었는지 확인하는 데 초점을 둔다.

- `#105` 예약 생성/조회 계약 전환
- `#115` booking-entry + staffId 기반 예약 진입 전환
- 예약 확정 API의 최신 요청 스키마 반영 여부

---

## 검토 기준 문서

백엔드 기준 문서:

- `C:\Users\User\Desktop\wjs\dev\project\SNAPBOOK_BE\BE\docs\api\03-api-spec.md`
- `C:\Users\User\Desktop\wjs\dev\project\SNAPBOOK_BE\BE\docs\api\04-api-spec-by-flow.md`
- `C:\Users\User\Desktop\wjs\dev\project\SNAPBOOK_BE\BE\docs\issues\#105\frontend-api-handoff.md`
- `C:\Users\User\Desktop\wjs\dev\project\SNAPBOOK_BE\BE\docs\issues\#115\frontend-api-handoff.md`

프론트 검토 범위:

- `src/api/services`
- `src/query`
- `src/pages/CustomerReservation`
- `src/pages/OwnerReservation`
- `src/pages/chat`
- `src/components/reservation`
- `src/hooks/chat`

---

## 결론 요약

### 정상 반영된 항목

- `booking-entry` API 사용
- `staffId` 기반 availability API 사용
- 예약 생성 요청에서 `formData` 제거
- 예약 생성 요청에 `shopId`, `staffId`, `date`, `time`, `requirements`, `imageUrls`, `menuSelections` 사용

### 계약 불일치가 남아 있는 항목

- 예약 확정 API 요청 바디가 최신 계약과 다름
- 예약 조회 응답을 아직 레거시 필드 중심으로 읽음
- 제거된 예약 필드(`part`, `removal`, `extend`, `wrapping`)를 아직 화면 모델에서 사용함
- 예약 생성 페이지가 `staffId` 누락 시 잘못된 요청을 막지 않음

---

## 상세 점검 결과

## 1. 예약 확정 API 요청 계약 불일치

### 백엔드 최신 계약

문서 기준 `PUT /api/reservations/{id}/confirm` 요청 바디는 아래 형태다.

```json
{
  "message": "내일 10시에 방문해주세요",
  "durationMinutes": 60,
  "startAt": "10:30"
}
```

핵심 조건:

- `message`: 필수
- `durationMinutes`: 필수
- `startAt`: 선택

근거:

- `BE/docs/api/04-api-spec-by-flow.md`
- 예약 확정 섹션 `B-6. 예약 확정 - 점주 (#97)`

### 프론트 현재 구현

현재 프론트는 예약 확정 시 `message`만 전송한다.

```js
await axiosClient.put(`/api/reservations/${id}/confirm`, {
  message,
});
```

관련 구현:

- `src/api/services/shopReservation.js`
- `src/pages/OwnerReservation/ownerReservationList.jsx`
- `src/components/message/ReservationDecisionMessage.jsx`
- `src/components/reservation/ReservationConfirmForm.jsx`

### 문제점

- `durationMinutes`가 필수인데 프론트가 보내지 않는다.
- `startAt` 재조정 기능이 UI/요청 모두에서 빠져 있다.
- 현재 구현 상태로는 백엔드가 4xx를 반환할 가능성이 높다.

### 실제 영향

- 점주가 예약을 수락해도 확정 실패 가능
- 채팅방 내 예약 수락 카드도 같은 문제를 가짐
- 점주 예약 목록 화면과 채팅 수락 플로우가 동일하게 깨질 수 있음

### 수정 우선순위

`High`

---

## 2. 예약 조회 응답을 아직 레거시 모델 중심으로 사용 중

### 백엔드 최신 계약

`#105` 이후 예약 조회 응답은 아래 표준 필드를 공통으로 포함한다.

- `requirements`
- `imageUrls`
- `imageCount`

대상 API:

- `GET /api/reservations/{id}`
- `GET /api/reservations/my`
- `GET /api/reservations/shop`
- `GET /api/reservations/chat/customer`
- `GET /api/reservations/chat/owner`

또한 문서상 아래 필드는 제거 대상으로 명시되어 있다.

- `part`
- `removal`
- `extend`
- `wrapping`

레거시 호환 필드는 과도기적으로만 유지된다.

- `requests`
- `photoUrls`
- `photoCount`

근거:

- `BE/docs/issues/#105/frontend-api-handoff.md`
- `BE/docs/api/04-api-spec-by-flow.md`

### 프론트 현재 구현

현재 프론트는 예약 조회 데이터를 읽을 때 여전히 아래 필드에 강하게 의존한다.

- `requests`
- `photoUrls`
- `part`
- `removal`
- `extendCount`
- `wrappingCount`
- `extendStatus`
- `wrappingStatus`

관련 구현:

- `src/pages/CustomerReservation/CustomerReservationList.jsx`
- `src/pages/OwnerReservation/ownerReservationList.jsx`
- `src/components/reservation/ReservationInfoView.jsx`
- `src/hooks/chat/useReservationSocketHandler.js`

### 문제점

- 표준 필드 `requirements`, `imageUrls`, `imageCount` 우선 사용으로 전환되지 않았다.
- 제거된 필드가 아직 UI와 상태 모델에 남아 있다.
- 백엔드가 문서대로 동작하면 상세 보기 일부가 비거나 왜곡될 수 있다.

### 예상 증상

- 요구사항 박스가 비어 보일 수 있음
- 사진 수/사진 목록 처리 기준이 표준 필드와 어긋남
- 손/발, 제거, 연장, 랩핑 UI는 더 이상 응답에 없는데도 계속 렌더링하려 함
- 채팅 예약 상세 카드에서 제거된 필드를 기대함

### 수정 우선순위

`High`

---

## 3. 점주 채팅 예약 상세 카드도 제거된 필드를 전제로 구성됨

### 백엔드 최신 계약

예약 상세 응답은 `menus`, `inputValues`, `requirements`, `imageUrls`, `imageCount` 기준으로 읽어야 한다.

문서 예시 응답에는 메뉴 스냅샷 구조가 포함된다.

```json
{
  "menus": [
    {
      "shopMenuId": 1,
      "menuNameSnapshot": "젤네일",
      "inputValues": [
        {
          "fieldLabelSnapshot": "연장 개수",
          "inputTypeSnapshot": "NUMBER",
          "valueNumber": 2,
          "valueText": null
        }
      ]
    }
  ]
}
```

### 프론트 현재 구현

점주 채팅 예약 상세 카드는 여전히 과거 옵션형 모델로 그려진다.

- `손/발`
- `제거`
- `연장`
- `랩핑`
- `requests`
- `photoUrls`

관련 구현:

- `src/components/reservation/ReservationInfoView.jsx`
- `src/components/message/ReservationDecisionMessage.jsx`
- `src/hooks/chat/useReservationSocketHandler.js`

### 문제점

- 최신 상세 응답의 `menus[]` / `inputValues[]`는 UI에 반영되지 않는다.
- 문서상 제거된 필드를 계속 화면에 표시한다.
- 채팅 예약 카드가 실제 예약 상세와 다른 정보를 보여줄 수 있다.

### 수정 우선순위

`High`

---

## 4. 예약 생성 페이지가 staffId 누락을 안전하게 처리하지 않음

### 백엔드 최신 계약

`#115` 문서 기준 예약 흐름은 아래 순서다.

1. `booking-entry` 호출
2. `defaultStaffId` 또는 선택한 `staffId` 확보
3. `staffId` 기반 availability 호출
4. `staffId` 포함하여 예약 생성

또한 `#105` 문서 기준 `POST /api/reservations`에서 `staffId`는 필수다.

### 프론트 현재 구현

예약 생성 페이지는 쿼리스트링에서 `staffId`를 읽는다.

```js
const staffId = Number(searchParams.get('staffId'));
```

이 값은 그대로 payload에 들어간다.

```js
const payload = {
  shopId: Number(shopId),
  staffId: staffId,
  date: basic.date,
  time: basic.time,
  requirements: photoNote.notes || null,
  imageUrls,
  menuSelections,
};
```

관련 구현:

- `src/pages/CustomerReservation/ReservationCreatePage.jsx`

### 문제점

- `staffId` 쿼리가 없으면 `Number(null)` 결과로 `0`이 들어간다.
- 프론트가 누락 상태를 사전에 차단하지 않는다.
- 잘못된 직접 진입 URL이나 라우팅 누락 시 계약 위반 요청이 발생한다.

### 현재 상태 평가

채팅방에서 예약 화면으로 이동하는 정상 경로는 `defaultStaffId`를 붙여 주므로 일반 플로우는 대체로 동작할 가능성이 높다.

하지만 아래 상황은 취약하다.

- 사용자가 URL 직접 접근
- 링크 생성 로직에서 `staffId` 누락
- 향후 다른 진입 경로 추가 시 누락 방어 없음

### 수정 우선순위

`Medium`

---

## 5. 정상 반영된 항목

아래는 이번 점검에서 문서와 일치한다고 본 항목이다.

### 5-1. booking-entry 도입 반영

프론트는 아래 두 API를 모두 사용하도록 준비되어 있다.

- 공개 진입: `GET /api/public/shops/{slugOrCode}/booking-entry`
- 인증 진입: `GET /api/v1/shops/{shopId}/booking-entry`

관련 구현:

- `src/api/services/shopLinkService.js`
- `src/query/linkQueries.js`
- `src/query/shopQueries.js`

### 5-2. staffId 기반 availability 전환 반영

프론트는 문서 기준 최신 경로를 사용한다.

- `GET /api/v1/shops/{shopId}/staff/{staffId}/availability`
- `GET /api/v1/shops/{shopId}/staff/{staffId}/availability/monthly`

관련 구현:

- `src/api/services/scheduleService.js`
- `src/query/scheduleQueries.js`
- `src/pages/CustomerReservation/steps/StepDateTime/StepDateTime.jsx`

### 5-3. 예약 생성 요청 계약은 대체로 최신 문서와 일치

프론트는 예약 생성 시 아래 필드를 사용한다.

- `shopId`
- `staffId`
- `date`
- `time`
- `requirements`
- `imageUrls`
- `menuSelections`

또한 레거시 `formData`는 요청 본문으로 보내지 않는다.

관련 구현:

- `src/pages/CustomerReservation/ReservationCreatePage.jsx`
- `src/api/services/reservationService.js`

---

## 우선 조치 권장안

1. 예약 확정 API 요청을 최신 계약으로 변경한다.
2. 예약 조회 UI 전반을 `requirements`, `imageUrls`, `imageCount`, `menus` 중심 모델로 전환한다.
3. 제거된 필드(`part`, `removal`, `extend`, `wrapping`)를 화면 모델에서 삭제한다.
4. 예약 생성 페이지에서 `staffId` 누락 시 진입 차단 또는 재조회 로직을 추가한다.

---

## 한 줄 결론

`#115` 기준의 예약 진입 구조는 프론트가 대부분 따라갔지만, `#105` 이후 예약 조회 모델 전환과 예약 확정 요청 스키마 반영은 아직 불완전하며, 특히 예약 확정 API와 예약 상세 UI는 현재 계약 기준으로 바로 수정이 필요하다.
