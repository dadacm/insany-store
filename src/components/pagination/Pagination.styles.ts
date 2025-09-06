import styled, { css } from 'styled-components';

interface PaginationButtonProps {
  $isActive?: boolean;
  $isDisabled?: boolean;
}

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
`;

export const PaginationButton = styled.button<PaginationButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background-color: #e9e9f0;
  color: #737380;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px;

  &:hover:not(:disabled) {
    background-color: #d1d1d8;
    color: #5a5a66;
  }

  ${props =>
    props.$isActive &&
    css`
      color: #a212df;
      border: solid 1px #a212df;

      &:hover {
        background-color: #333333;
        color: #ffffff;
      }
    `}

  ${props =>
    props.$isDisabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        background-color: #e9e9f0;
        color: #737380;
      }
    `}
`;

export const NavigationButton = styled(PaginationButton)`
  font-weight: 400;
`;
