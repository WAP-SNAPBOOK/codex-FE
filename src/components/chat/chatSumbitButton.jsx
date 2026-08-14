import React from 'react';
import sendIcon from '../../assets/icons/send-icon.svg';
import { ChatButton } from './chatIconButton';

export default function ChatSumbitButton({ onClick, disabled = false }) {
  return (
    <ChatButton type="button" aria-label="메시지 보내기" disabled={disabled} onClick={onClick}>
      <img src={sendIcon} alt="" />
    </ChatButton>
  );
}
