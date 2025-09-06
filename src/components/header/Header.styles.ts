import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: white;
  padding-block: 18px;
  justify-content: center;
  display: flex;
  padding-inline: 10%;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const HeaderTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  color: #5d5d6d;
`;
export const BagIconContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
export const CartBadge = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: #de3838;
  height: 17px;
  width: 17px;
  top: 14px;
  right: 0;
  bottom: 0;
  left: 10px;
  font-family: var(--font-saira), sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 500;
  color: white;
`;
