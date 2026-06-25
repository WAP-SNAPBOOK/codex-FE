import styled from 'styled-components';

export const Card = styled.div`
  background: #fff;
  border: 4px solid #ededed;
  border-radius: 18px;
  padding: 16px;
  width: 225px;
`;

export const Title = styled.h3`
  font-size: 22px;
  font-weight: 800;
  margin-bottom: 16px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  margin-bottom: 4px;
`;

export const Label = styled.span`
  color: #777;
  font-size: 13px;
  font-weight: 600;
`;

export const Value = styled.span`
  font-weight: 600;
  color: ${({ highlight }) => (highlight ? '#f08080' : '#222')};
  text-align: right;
`;

export const PriceNote = styled.p`
  margin: 2px 0 0;
  color: #b3b3b3;
  font-size: 11px;
  font-weight: 500;
  text-align: right;
`;

export const Toggle = styled.button`
  width: 100%;
  background: none;
  border: none;
  color: #b3b3b3;
  font-size: 13px;
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const Divider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 12px 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 14px;
`;

export const DetailContent = styled.div`
  margin-top: 4px;
`;

export const DetailTitle = styled.div`
  margin-bottom: 8px;
  color: #222;
  font-size: 14px;
  font-weight: 700;
`;

export const DecisionFormSection = styled.div`
  margin-top: 14px;
  padding-top: ${({ $separated }) => ($separated ? '14px' : '0')};
  border-top: ${({ $separated }) => ($separated ? '1px solid #f0f0f0' : 'none')};
`;

export const RejectButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: 10px;
  background: #e5e5e5;
  border: none;
  font-weight: 600;
`;

export const ApproveButton = styled.button`
  flex: 1;
  height: 40px;
  border-radius: 10px;
  background: #ec6060;
  border: none;
  color: white;
  font-weight: 700;
`;

export const TextValue = styled.span`
  color: #222;
  font-weight: 600;
`;
