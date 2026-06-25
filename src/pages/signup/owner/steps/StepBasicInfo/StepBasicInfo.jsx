import * as S from './StepBasicInfo.styles';

export default function StepBasicInfo({ initialData, onChange }) {
  return (
    <S.Form>
      <S.Field>
        이름
        <S.Input
          name="name"
          value={initialData.name}
          placeholder="이름을 입력해 주세요."
          maxLength={5}
          onChange={onChange}
        />
      </S.Field>
      <S.Field>
        전화번호
        <S.Input
          name="phoneNumber"
          value={initialData.phoneNumber}
          placeholder="전화번호를 입력해 주세요."
          onChange={onChange}
        />
      </S.Field>
      <S.Field>
        상호명
        <S.Input
          name="businessName"
          value={initialData.businessName}
          placeholder="상호명을 입력해 주세요."
          onChange={onChange}
        />
      </S.Field>
      <S.Field>
        주소
        <S.AddressWrapper>
          <S.Input
            name="address"
            value={initialData.address}
            placeholder="주소를 입력해 주세요."
            onChange={onChange}
          />
          <S.AddressIcon aria-hidden="true" />
        </S.AddressWrapper>
      </S.Field>
    </S.Form>
  );
}
