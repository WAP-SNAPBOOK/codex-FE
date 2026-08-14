import React from 'react';
import addIcon from '../../assets/icons/add-icon.svg';
import { AddButton } from './chatIconButton';

export default function AddMenuButton({ onToggleMenu }) {
  const handleClick = () => {
    onToggleMenu?.(); // 부모에서 전달한 메뉴 토글 콜백
  };

  return (
    <AddButton type="button" aria-label="채팅 메뉴 열기" onClick={handleClick}>
      <img src={addIcon} alt="" />
    </AddButton>
  );
}
