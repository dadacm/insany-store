import styled from 'styled-components';

export const ProductCardContainer = styled.div`
  background-color: white;
  border-radius: 19px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  min-width: 280px;
  max-width: 420px;
  cursor: pointer;
`;
export const ProductImageContainer = styled.div`
  position: relative;
  min-width: 280px;
  height: 280px;
  max-width: 420px;
`;

export const ProductName = styled.h4`
  font-size: 14px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: 2.8em;
`;

export const CategoryText = styled.span`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
`;

export const ProductInfoContainer = styled.div`
  padding-inline: 21px;
  padding-block: 28px;
`;

export const NameDescriptionContainer = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PriceText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #1b9847;
`;

export const StockText = styled.span`
  font-size: 14px;
`;

export const PriceStockContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  justify-content: space-between;
`;

export const RatingText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;
