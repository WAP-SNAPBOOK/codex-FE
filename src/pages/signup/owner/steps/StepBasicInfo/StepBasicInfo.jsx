import { AuthInput } from '../../../../../components/auth/AuthInput';

export default function StepBasicInfo({ initialData, onChange }) {
  return (
    <div className="w-full flex flex-col gap-[15px]">
      <div className="flex flex-col gap-[7px]">
        <span className="font-bold">이름</span>
        <AuthInput
          name="name"
          value={initialData.name}
          placeholder="이름"
          maxLength={5}
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col gap-[7px]">
        <span className="font-bold">전화번호</span>
        <AuthInput
          name="phoneNumber"
          value={initialData.phoneNumber}
          placeholder="전화번호"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col gap-[7px]">
        <span className="font-bold">상호명</span>
        <AuthInput
          name="businessName"
          value={initialData.businessName}
          placeholder="상호명"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col gap-[7px]">
        <span className="font-bold">주소</span>
        <AuthInput
          name="address"
          value={initialData.address}
          placeholder="주소"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
