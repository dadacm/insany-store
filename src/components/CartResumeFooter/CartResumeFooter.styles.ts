import { media } from '@/constants';
import styled from 'styled-components';

export const CartResumeHelpLinks = styled.div`
  display: flex;
  flex-direction: column;
  color: #737380;
  gap: 12px;
  text-decoration: underline;
  font-size: 14px;

  ${media.mobile} {
    margin-top: 20px;
  }
`;
