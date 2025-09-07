import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const SearchContainer = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: #f3f7ff;
  padding: 10px 50px 10px 12px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease-in-out;
  margin-right: 86px;

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.6;
  }

  &::placeholder {
    color: #6c757d;
  }
`;

export const SearchIcon = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.7;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #6c757d;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
