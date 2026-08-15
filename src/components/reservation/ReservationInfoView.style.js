import styled from 'styled-components';

export const DetailSection = styled.div`
  font-size: 13px;
  animation: fadeIn 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: ${({ $messageCard }) => ($messageCard ? '10px' : '0')};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const DetailBlock = styled.div`
  margin-top: ${({ $messageCard }) => ($messageCard ? '0' : '12px')};
  padding: ${({ $messageCard, $tone }) => ($messageCard && $tone === 'neutral' ? '14px' : '0')};
  border-radius: ${({ $messageCard, $tone }) =>
    $messageCard && $tone === 'neutral' ? '12px' : '0'};
  background: ${({ $messageCard, $tone }) =>
    $messageCard && $tone === 'neutral' ? '#f2f4f6' : 'transparent'};
`;

export const DetailValues = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PhotoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0;
`;

export const PhotoButton = styled.button`
  width: 56px;
  height: 56px;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #f08080;
    outline-offset: 2px;
  }
`;

export const Photo = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const RequestBox = styled.div`
  margin-top: 8px;
  padding: ${({ $messageCard, $tone }) => ($messageCard && $tone === 'neutral' ? '0' : '10px')};
  background: ${({ $messageCard, $tone }) =>
    $messageCard && $tone === 'neutral' ? 'transparent' : '#fafafa'};
  border: ${({ $messageCard, $tone }) =>
    $messageCard && $tone === 'neutral' ? '0' : '1px solid #f0f0f0'};
  border-radius: 10px;
  color: #555;
`;

export const Chip = styled.span`
  min-width: 36px;
  padding: 2px 8px;
  background: #f2f2f2;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #555;
  text-align: center;
`;

export const Label = styled.span`
  color: #777;
  font-size: 13px;
  font-weight: 600;
`;

export const CountText = styled.div`
  margin-top: 8px;
  color: #777;
  font-size: 12px;
`;

export const StatusNotice = styled.div`
  --status-bg: ${({ $variant }) =>
    $variant === 'confirmed' ? 'rgba(64, 186, 120, 0.15)' : 'rgba(255, 94, 94, 0.15)'};
  --status-fg: ${({ $variant }) => ($variant === 'confirmed' ? '#40ba78' : '#ff5e5e')};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--status-bg);
  color: var(--status-fg);
  font-size: 13px;
  font-weight: 700;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  width: 100%;
`;

export const MenuCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border: ${({ $messageCard }) => ($messageCard ? '0' : '1px solid #f0f0f0')};
  border-radius: 12px;
  background: ${({ $messageCard }) => ($messageCard ? '#fff6f6' : '#fcfcfc')};
`;

export const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`;

export const MenuName = styled.div`
  min-width: 0;
  font-weight: 600;
  color: #333;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;

export const MenuMeta = styled.div`
  flex: 0 0 auto;
  font-size: 12px;
  color: #888;
`;

export const InputList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 10px;
`;

export const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const InputLabel = styled.div`
  color: #888;
`;

export const InputValue = styled.div`
  color: #333;
  font-weight: 500;
`;

export const EmptyText = styled.div`
  margin-top: 8px;
  color: #999;
`;
