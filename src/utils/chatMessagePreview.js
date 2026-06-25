const MESSAGE_TYPE_LABELS = {
  IMAGE: '사진을 보냈습니다.',
  RESERVATION_CREATED: '예약이 접수되었습니다.',
  RESERVATION_CONFIRMED: '예약이 확정되었습니다.',
  RESERVATION_REJECTED: '예약이 거절되었습니다.',
  RESERVATION_UPDATED: '예약이 수정되었습니다.',
  RESERVATION_CANCELED: '예약이 취소되었습니다.',
};

const MESSAGE_TYPES = new Set([
  'TEXT',
  'IMAGE',
  'TEXT_IMAGE',
  'RESERVATION_CREATED',
  'RESERVATION_CONFIRMED',
  'RESERVATION_REJECTED',
  'RESERVATION_UPDATED',
  'RESERVATION_CANCELED',
]);

const getFirstString = (...values) =>
  values.find((value) => typeof value === 'string' && value.trim().length > 0);

const normalizeMessageType = (messageType) => messageType?.trim?.().toUpperCase?.() ?? '';

const getMessageType = (value) => {
  const normalizedType = normalizeMessageType(value);
  return MESSAGE_TYPES.has(normalizedType) ? normalizedType : null;
};

const findMessageType = (value, visited = new Set()) => {
  const directType = getMessageType(value);
  if (directType) {
    return directType;
  }

  if (!value || typeof value !== 'object' || visited.has(value)) {
    return null;
  }

  visited.add(value);

  for (const child of Object.values(value)) {
    const childType = findMessageType(child, visited);
    if (childType) {
      return childType;
    }
  }

  return null;
};

export const getMessageTypeLabel = (messageType) => {
  const normalizedType = normalizeMessageType(messageType);

  return MESSAGE_TYPE_LABELS[normalizedType] ?? null;
};

export const getChatRoomLastMessagePreview = (room = {}) => {
  const lastMessage =
    room.lastMessage ?? room.latestMessage ?? room.recentMessage ?? room.lastChatMessage ?? {};
  const messageType = getFirstString(
    room.lastMessageType,
    room.lastMessageMessageType,
    room.lastMessageContentType,
    room.latestMessageType,
    room.recentMessageType,
    room.messageType,
    room.type,
    lastMessage.messageType,
    lastMessage.type,
    lastMessage.contentType,
    lastMessage.message,
    lastMessage.content,
    room.lastMessageContent
  );
  const normalizedMessageType = getMessageType(messageType) ?? findMessageType(room);
  const content = getFirstString(
    room.lastMessageContent,
    room.latestMessageContent,
    room.recentMessageContent,
    lastMessage.message,
    lastMessage.content,
    lastMessage.text
  );

  if (normalizedMessageType === 'TEXT' || normalizedMessageType === 'TEXT_IMAGE') {
    return content ?? getMessageTypeLabel(normalizedMessageType) ?? '';
  }

  return getMessageTypeLabel(normalizedMessageType) ?? content ?? '';
};
