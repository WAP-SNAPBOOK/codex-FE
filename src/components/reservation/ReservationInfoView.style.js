import styled from 'styled-components';

export const DetailSection = styled.div`
  font-size: 13px;
  animation: fadeIn 0.2s ease;

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
  margin-top: 12px;
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

export const Photo = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid #e5e5e5;
`;

export const RequestBox = styled.div`
  margin-top: 8px;
  padding: 10px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
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
  color: #c0c0c0;
  font-weight: 600;
`;

export const CountText = styled.div`
  margin-top: 8px;
  color: #777;
  font-size: 12px;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

export const MenuCard = styled.div`
  padding: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  background: #fcfcfc;
`;

export const MenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
`;

export const MenuName = styled.div`
  font-weight: 600;
  color: #333;
`;

export const MenuMeta = styled.div`
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
