import { media } from '@/constants';
import styled from 'styled-components';

export const MainCategoriesTitle = styled.span`
  font-weight: 700;
  font-size: 40px;
  ${media.mobile} {
    margin-top: 20px;
    font-size: 24px;
  }
`;

export const MainCategoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 34px;
`;
export const MainCategoriesContainer = styled.div`
  ${media.mobile} {
    margin-top: 20px;
  }
`;
