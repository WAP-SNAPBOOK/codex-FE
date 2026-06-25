# `[FIX]: 예약 메뉴 수량 버튼이 1회 클릭당 2씩 증가하는 문제 수정`

Issue: `#170`  
Created: `2026-04-09`  
Repository: `WAP-SNAPBOOK/FE`  
Issue URL: `https://github.com/WAP-SNAPBOOK/FE/issues/170`  
Branch: `fix/jiseob/#170`

---

## Background

고객 예약 3단계에서 메뉴별 NUMBER 입력 필드를 `CountStepper`로 노출하고 있습니다.
현재 프론트는 `stepValue`를 그대로 수량 버튼 증감 단위로 사용합니다.

## Problem

특정 메뉴 입력 필드에서 `+` 버튼을 1번 눌렀을 때 값이 2씩 증가합니다.
사용자는 수량 버튼이 한 칸씩 움직일 것으로 기대하지만, 점주가 설정한 `stepValue`가 그대로 반영되면서 예상과 다른 동작이 발생합니다.

## Goal

예약 메뉴 수량 버튼 동작을 사용자 기대와 일치하도록 정리합니다.

## Scope

- 예약 생성 3단계 NUMBER 입력 필드 증감 로직 점검
- `CountStepper`와 `stepValue` 연결 방식의 의도 확인 및 수정
- 점주 메뉴 입력 필드의 `stepValue` 설정이 고객 예약 UI에 미치는 영향 정리

## Out Of Scope

- 예약 생성 API 스키마 변경
- 기존 예약 데이터 일괄 수정

## Acceptance Criteria

- [ ] 예약 메뉴 NUMBER 입력 필드에서 `+` 또는 `-` 버튼을 1회 탭했을 때 기대한 단위로만 증감한다.
- [ ] 현재 2씩 증가하던 재현 케이스가 해결된다.
- [ ] 최소값/최대값 경계 처리에 회귀가 없다.
- [ ] 점주 설정값과 고객 예약 UI 동작 규칙이 코드상 일관되게 정리된다.

## Risks

- 기존에 `stepValue` 기반 증감을 의도했던 경우 동작이 바뀔 수 있습니다.
- 수량 필드 초기값과 경계값 처리에서 회귀가 발생할 수 있습니다.

## References

- `src/pages/CustomerReservation/steps/StepTagMenu/MenuInputFields.jsx`
- `src/pages/CustomerReservation/steps/StepTagMenu/CountStepper.jsx`
- `src/pages/signup/owner/steps/StepMenuSetup/MenuItemCard.jsx`
