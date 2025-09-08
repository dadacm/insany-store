'use client';
import { ProductInterface } from '@/services/types/Product';

import { BackButtonComponent } from '../backButtonComponent/BackButtonComponent';
import Image from 'next/image';
import { formatCurrency } from '@/utils/formatCurrency';
import { AddItemToCartButton } from '../addItemToCartButton/AddItemToCartButton';
import {
  ProductDetailsContainer,
  ProductImageContainer,
  ProductInfoContainer,
  ProductHeader,
  ProductCategory,
  ProductName,
  ProductPrice,
  ProductDescriptionSection,
  DescriptionTitle,
  DescriptionText,
  ProductActions,
} from './ProductDetails.styles';
import { CategoryInterface } from '@/services/types/category';
import { findCategoryById } from '@/utils/findCategoryById';

interface ProductDetails {
  product: ProductInterface;
  categories: CategoryInterface[];
}

export function ProductDetails({ product, categories }: ProductDetails) {
  const productCategoryName =
    categories && findCategoryById(categories, product?.category)?.name;

  return (
    <ProductDetailsContainer>
      <BackButtonComponent />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <ProductImageContainer>
          <Image
            alt={product.name}
            src={product.image}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </ProductImageContainer>

        <ProductInfoContainer>
          <div>
            <ProductHeader>
              <ProductCategory>{productCategoryName}</ProductCategory>
              <ProductName>{product.name}</ProductName>
            </ProductHeader>
            <ProductPrice>{formatCurrency(product.price)}</ProductPrice>
          </div>

          <ProductDescriptionSection>
            <DescriptionTitle>DESCRIÇÃO</DescriptionTitle>
            <DescriptionText>{product.description}</DescriptionText>
          </ProductDescriptionSection>

          <ProductActions>
            <AddItemToCartButton product={product} />
          </ProductActions>
        </ProductInfoContainer>
      </div>
    </ProductDetailsContainer>
  );
}
