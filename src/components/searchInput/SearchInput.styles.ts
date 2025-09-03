import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  display: inline-block;

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

  transition: all 0.2s ease-in-out;
  margin-right: 86px;

  &:focus {
    outline: none;

    box-shadow: 0 0 0 1px #f3f7ff;
  }

  &::placeholder {
    color: #6c757d;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;
