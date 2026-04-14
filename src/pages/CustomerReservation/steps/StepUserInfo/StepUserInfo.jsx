import { useState, useEffect, useRef } from 'react';
import { sanitizeDigits, validateMobile010 } from '@/utils/phoneNumber';
import userIcon from '@/assets/icons/user-icon_gray.svg';
import phoneIcon from '@/assets/icons/phone-icon.svg';
import * as S from '../steps.styles';

export default function StepUserInfo({ initialData, onChange }) {
  const [name, setName] = useState(initialData.name ?? '');
  const [phone, setPhone] = useState(initialData.phoneNumber ?? '');
  const hasEditedNameRef = useRef(false);
  const hasEditedPhoneRef = useRef(false);

  const isValid = (name ?? '').trim().length > 0 && validateMobile010(phone).valid;

  useEffect(() => {
    if (!hasEditedNameRef.current && initialData.name && initialData.name !== name) {
      setName(initialData.name);
    }
  }, [initialData.name, name]);

  useEffect(() => {
    if (
      !hasEditedPhoneRef.current &&
      initialData.phoneNumber &&
      initialData.phoneNumber !== phone
    ) {
      setPhone(initialData.phoneNumber);
    }
  }, [initialData.phoneNumber, phone]);

  //예약 폼 정보 변경(이름, 전화 번호)
  useEffect(() => {
    onChange({
      name,
      phoneNumber: phone,
      isValid, //입력 유효성 여부
    });
  }, [name, phone, isValid, onChange]);

  return (
    <>
      <S.StepTitle>기본 정보 입력</S.StepTitle>
      <div className="flex flex-col items-center mb-[320px]">
        <S.Field>
          <S.InputWrapper>
            <S.Input
              placeholder="이름을 입력해 주세요"
              value={name}
              onChange={(e) => {
                hasEditedNameRef.current = true;
                setName(e.target.value.slice(0, 5));
              }}
            />
            <S.InputIcon>
              <img src={userIcon} alt="userIcon" />
            </S.InputIcon>
          </S.InputWrapper>
        </S.Field>

        <S.Field>
          <S.Label>전화번호</S.Label>

          <S.InputWrapper>
            <S.Input
              placeholder="전화번호를 입력해 주세요"
              inputMode="numeric"
              value={phone}
              onChange={(e) => {
                hasEditedPhoneRef.current = true;
                setPhone(sanitizeDigits(e.target.value).slice(0, 11));
              }}
            />
            <S.InputIcon>
              <img src={phoneIcon} alt="phoneIcon" />
            </S.InputIcon>
          </S.InputWrapper>
        </S.Field>
      </div>
    </>
  );
}
