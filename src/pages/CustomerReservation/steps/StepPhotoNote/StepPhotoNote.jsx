import { useRef, useState, useEffect } from 'react';
import * as C from '../steps.styles';
import * as S from './stepPhotoNote.style';
import pictureIcon from '@/assets/icons/picture-icon.svg';

const MAX_PHOTOS = 4;

export default function StepPhotoNote({ initialData = {}, onChange }) {
  const fileInputRef = useRef(null); // 이미지 파일 참조용
  const [files, setFiles] = useState(initialData.files ?? []); //사진 파일
  const [notes, setNotes] = useState(initialData.notes ?? ''); //요구사항

  const [previews, setPreviews] = useState([]);

  const isValid = true; // 사진, 요구사항은 선택 사항

  //부모 에약 폼 정보 변경
  useEffect(() => {
    onChange({
      files,
      notes,
      isValid,
    });
  }, [files, notes, isValid, onChange]);

  //미리보기 생성, 정리
  useEffect(() => {
    const nextPreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviews(nextPreviews);

    //cleanup
    return () => {
      nextPreviews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [files]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const merged = [...files, ...selected].slice(0, MAX_PHOTOS);
    setFiles(merged);
  };

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      {/* 사진 */}
      <C.SectionTitle>사진</C.SectionTitle>

      <S.UploadBox as="button" type="button" onClick={() => fileInputRef.current.click()}>
        사진을 선택해 주세요
        <S.UploadIcon>
          <img src={pictureIcon} alt="pictureIcon" />
        </S.UploadIcon>
      </S.UploadBox>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
      />

      <S.PhotoGrid>
        {previews.map((p, idx) => (
          <S.PhotoItem key={idx}>
            <img src={p.url} alt="" />
            <S.RemoveButton onClick={() => removeFile(idx)}>×</S.RemoveButton>
          </S.PhotoItem>
        ))}

        {files.length < MAX_PHOTOS &&
          Array.from({ length: MAX_PHOTOS - files.length }).map((_, i) => (
            <S.EmptyPhoto key={`empty-${i}`}>+</S.EmptyPhoto>
          ))}
      </S.PhotoGrid>

      {/* 요구사항 */}
      <C.SectionTitle>
        요구사항 <S.Optional>(선택)</S.Optional>
      </C.SectionTitle>

      <C.TextArea
        placeholder="요구사항을 입력해 주세요"
        value={notes}
        onChange={(e) => setNotes(e.target.value.slice(0, 250))}
      />

      <S.TextCount>{notes.length} / 250</S.TextCount>
    </>
  );
}
