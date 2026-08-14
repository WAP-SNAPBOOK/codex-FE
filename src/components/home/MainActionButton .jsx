import styled from 'styled-components';
import theme from '../../styles/theme';

const MainButton = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  min-height: 88px;
  padding: 16px;
  border: 1px solid #e8e9ec;
  border-radius: 20px;
  background: #fff;
  color: #17181a;
  text-align: left;
  box-shadow: 0 8px 24px rgba(17, 24, 39, 0.05);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.08s ease;

  &:active {
    transform: translateY(1px);
    background: #fafafa;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

const IconBox = styled.span`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 17px;
  background: rgba(240, 128, 128, 0.12);
  color: ${theme.colors.primary};

  svg {
    width: 30px;
    height: 30px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const TextGroup = styled.span`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.strong`
  color: #24262a;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.3;
`;

const Description = styled.span`
  overflow: hidden;
  color: #858991;
  font-size: 13px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Chevron = styled.span`
  flex: 0 0 auto;
  color: #afb1b7;
  font-size: 26px;
  font-weight: 300;
  line-height: 1;
`;

function MainActionButton({ icon, label, description, onClick }) {
  return (
    <MainButton type="button" onClick={onClick}>
      <IconBox aria-hidden="true">{icon}</IconBox>
      <TextGroup>
        <Label>{label}</Label>
        <Description>{description}</Description>
      </TextGroup>
      <Chevron aria-hidden="true">›</Chevron>
    </MainButton>
  );
}

export default MainActionButton;
