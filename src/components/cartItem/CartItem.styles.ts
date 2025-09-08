import { media } from '@/constants';
import styled from 'styled-components';

export const CartItemCard = styled.div`
  background: white;
  border-radius: 8px;
  display: flex;
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductImage = styled.div`
  position: relative;
  flex: 1;
  flex-shrink: 0;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: hidden;
`;

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ProductName = styled.h3`
  font-size: 20px;
  font-weight: 300;
  color: #41414d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${media.mobile} {
    font-size: 16px;
    white-space: normal;
  }
  ${media.tablet} {
    font-size: 16px;
    white-space: normal;
  }
  ${media.desktop} {
    font-size: 16px;
    white-space: normal;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

export const ProductDescriptionText = styled.p`
  font-size: 12px;
  color: #41414d;
  margin-top: 12px;
  margin-bottom: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  ${media.mobile} {
    max-width: 153px;
  }
`;

export const CartItemPrice = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #09090a;

  ${media.mobile} {
    font-size: 14px;
  }
`;

export const RemoveButton = styled.button`
  color: #dc2626;
  font-weight: 500;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  width: 24px;
  height: 24px;

  &:hover {
    background: #fef2f2;
    color: #b91c1c;
  }
`;

export const ProducCardContent = styled.div`
  padding-left: 31px;
  padding-top: 16px;
  padding-bottom: 24px;
  padding-right: 16px;
  flex: 1;
`;

export const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
