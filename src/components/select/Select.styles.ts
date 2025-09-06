import styled from 'styled-components';

export const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectField = styled.div<{ disabled?: boolean }>`
  padding: 12px 40px 12px 0;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #737380;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  position: relative;
`;

export const SelectArrow = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%)
    ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  pointer-events: none;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
`;

export const SelectDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
`;

export const SelectOption = styled.li<{ isSelected?: boolean }>`
  padding: 8px 12px;
  background: white;
  color: #737380;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  &:only-child {
    border-radius: 4px;
  }
`;
