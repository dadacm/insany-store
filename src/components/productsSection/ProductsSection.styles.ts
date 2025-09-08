import { media } from '@/constants';
import styled from 'styled-components';

export const PageTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;

  ${media.mobile} {
    font-size: 24px;
  }
  ${media.tablet} {
    font-size: 32px;
  }
`;

export const TitleContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 47px;
  ${media.mobile} {
    flex-direction: column;
  }
`;
export const CategoryDescription = styled.span`
  font-size: 20px;
  font-weight: 400;
  ${media.mobile} {
    font-size: 16px;
  }
  ${media.tablet} {
    font-size: 18px;
  }
`;
