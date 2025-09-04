import styled from 'styled-components';

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectField = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 12px 40px 12px 0;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #737380;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SelectArrow = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SelectOption = styled.option`
  padding: 8px;
  background: white;
  color: #333;
`;
