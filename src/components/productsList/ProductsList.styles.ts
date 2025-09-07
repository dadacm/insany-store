import { media } from '@/constants';
import styled from 'styled-components';

export const ProductsListContainer = styled.div`
  display: grid;
  gap: 34px 26px;
  width: fit-content;
  ${media.mobile} {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  ${media.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  ${media.desktop} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  ${media.largeDesktop} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
