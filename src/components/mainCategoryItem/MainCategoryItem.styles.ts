import styled from 'styled-components';

export const MainCategoriesItemContainer = styled.a`
  padding-block: 26px;
  background-color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: solid 1px #e0e0e0;
  cursor: pointer;
`;

export const MainCategoriesItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
`;
export const ProductQuantityText = styled.span`
  font-size: 16px;
`;
