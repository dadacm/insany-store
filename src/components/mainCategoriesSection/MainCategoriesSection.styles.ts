import styled from 'styled-components';

export const MainCategoriesTitle = styled.span`
  font-weight: 700;
  font-size: 40px;
`;

export const MainCategoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 34px;
`;
