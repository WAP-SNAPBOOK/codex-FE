import styled from 'styled-components';

export const Toggle = styled.div`
  position: relative;
  width: 90px;
  height: 35px;
  padding: 3px;
  background-color: #f3f4f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Indicator = styled.div`
  position: absolute;
  top: 3px;
  /* 토글 시 현재 선택 영역으로 이동 */
  left: ${({ $active }) => ($active ? '3px' : 'calc(50% + 1px)')};
  width: calc(50% - 4px);
  height: calc(100% - 6px);
  background-color: #ffffff;
  border-radius: 12px;
  transition: left 0.25s ease;
`;

export const Option = styled.div`
  flex: 1;
  z-index: 1;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? '#f87171' : '#000000')};
`;
