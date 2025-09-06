import styled, { css } from 'styled-components';
import { ButtonVariant } from './Button.types';

interface StyledButtonProps {
  variant: ButtonVariant;
  $hasIcon: boolean;
}

const variantStyles = {
  primary: css`
    background-color: #000000;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #333333;
    }
  `,
  secondary: css`
    background-color: #1b9847;
    color: #f5f5fa;

    &:hover:not(:disabled) {
      background-color: #15803d;
    }
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => (props.$hasIcon ? '8px' : '0')};
  padding-block: 8px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-height: 40px;
  width: 100%;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${props => variantStyles[props.variant]}
`;

export const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;
