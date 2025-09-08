import { media } from '@/constants';
import styled from 'styled-components';

export const QuantitySelectContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const QuantitySelectField = styled.div<{ $disabled?: boolean }>`
  padding: 8px 12px 8px 12px;
  border: 1px solid #a8a8b3;
  border-radius: 8px;
  background: #f3f5f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.125rem;
  font-weight: 500;
  color: #a8a8b3;
  cursor: ${props => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.$disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  min-width: 60px;

  &:hover:not(:disabled) {
    border-color: #9ca3af;
  }

  ${media.mobile} {
    font-size: 14px;
    padding: 4px 8px 4px 8px;
    min-width: 45px;
  }
`;

export const QuantitySelectArrow = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a8a8b3;
  transition: transform 0.2s ease;
  transform: ${props => (props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

  ${media.mobile} {
    width: 16px;
    height: 16px;
  }
`;

export const QuantitySelectDropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  border: 1px solid #a8a8b3;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin: 4px 0 0 0;
  padding: 4px 0;
  color: #a8a8b3;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;

  ${media.mobile} {
    padding: 2px 0;
    margin: 2px 0 0 0;
  }
`;

export const QuantitySelectOption = styled.li<{ $isSelected?: boolean }>`
  padding: 8px 12px;
  background: ${props => (props.$isSelected ? '#f3f4f6' : 'white')};
  color: ${props => (props.$isSelected ? '#1f2937' : '#737380')};
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => (props.$isSelected ? '600' : '400')};
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    color: #1f2937;
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }

  &:only-child {
    border-radius: 8px;
  }
`;
