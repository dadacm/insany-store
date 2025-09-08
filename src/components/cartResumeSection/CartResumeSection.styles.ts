import { media } from '@/constants';
import styled from 'styled-components';

export const CartResumeCard = styled.div`
  background-color: white;
  padding-block: 16px;
  padding-inline: 24px;
  width: 30%;
  color: #41414d;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 85px;
  justify-content: space-between;

  ${media.mobile} {
    width: 100%;
    margin-bottom: 10px;
  }
`;
export const CartResumeTitle = styled.h2`
  font-weight: 600;
  font-size: 20px;
`;
export const CartResumeItens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
  margin-bottom: 24px;
`;

export const CartResumeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Separator = styled.div`
  height: 1px;
  background-color: #dce2e5;
  margin: 8px 0;
`;
export const CartResumeTotalItem = styled(CartResumeItem)`
  font-weight: 600;
  margin-bottom: 40px;
`;
