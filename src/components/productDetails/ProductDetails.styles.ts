import styled from 'styled-components';
import { media } from '@/constants';

export const ProductDetailsContainer = styled.div`
  flex: 1;
  max-width: 100%;
`;

export const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);

  ${media.desktop} {
    height: 580px;
    flex: 1;
    max-width: 50%;
  }
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.desktop} {
    flex: 1;
    max-width: 50%;
    padding-left: 0;
  }
`;

export const ProductHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ProductCategory = styled.h4`
  font-size: 16px;

  color: #41414d;
  margin: 0;
`;

export const ProductName = styled.h2`
  font-size: 32px;
  font-weight: 300;
  color: #41414d;
  margin: 0;
`;

export const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #46ab6a;
`;

export const ProductDescriptionSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DescriptionTitle = styled.h5`
  font-size: 16px;
  font-weight: 500;
  color: #737380;
  margin: 0;
  text-transform: uppercase;
`;

export const DescriptionText = styled.p`
  font-size: 14px;
  color: #41414d;
  margin: 0;
`;

export const ProductActions = styled.div`
  margin-top: 8px;
`;
