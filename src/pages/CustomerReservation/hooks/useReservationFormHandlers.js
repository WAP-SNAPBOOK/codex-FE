import { useCallback } from 'react';

export function useReservationFormHandlers(setFormData, setCanNext) {
  //고객 기본정보 입력 헨들러
  const handleUserInfoChange = useCallback(
    ({ name, phoneNumber, isValid }) => {
      setFormData((p) => ({
        ...p,
        basic: { ...p.basic, name, phoneNumber },
      }));
      setCanNext(isValid); //다음 단계 진행 여부
    },
    [setFormData, setCanNext]
  );

  //예약 시간 입력 헨들러
  const handleDateTimeChange = useCallback(
    ({ date, time, isValid }) => {
      setFormData((p) => ({
        ...p,
        basic: { ...p.basic, date, time },
      }));
      setCanNext(isValid);
    },
    [setFormData, setCanNext]
  );

  //사진, 요구사항 입력 헨들러
  const handlePhotoNoteChange = useCallback(
    ({ files, notes, isValid }) => {
      setFormData((p) => ({
        ...p,
        photoNote: { files, notes },
      }));
      setCanNext(isValid);
    },
    [setFormData, setCanNext]
  );

  //태그, 메뉴 선택 헨들러
  const handleTagMenuChange = useCallback(
    ({ tagId, menuIds, menuCounts, isValid }) => {
      setFormData((p) => ({
        ...p,
        tagMenu: { tagId, menuIds, menuCounts },
      }));
      setCanNext(isValid);
    },
    [setFormData, setCanNext]
  );

  //옵션 선택 헨들러
  const handleOptionsChange = useCallback(
    ({ options }) => {
      setFormData((p) => ({ ...p, options }));
    },
    [setFormData]
  );

  return {
    handleUserInfoChange,
    handleDateTimeChange,
    handlePhotoNoteChange,
    handleTagMenuChange,
    handleOptionsChange,
  };
}
