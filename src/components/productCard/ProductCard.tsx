import Image from 'next/image';
import { ProductCardProps } from './ProductCard.types';
import {
  CategoryText,
  NameDescriptionContainer,
  PriceStockContainer,
  PriceText,
  ProductCardContainer,
  ProductDescription,
  ProductImageContainer,
  ProductInfoContainer,
  ProductName,
  StockText,
} from './ProductCard.styles';
import { findCategoryById } from '@/utils/findCategoryById';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from '../button/Button';
import { useCart } from '@/hooks/useCart';

export default function ProductCard({
  product,
  selectedCategoryName,
  categories,
}: ProductCardProps) {
  const { category, description, image, name, price, rating, stock } = product;
  const { addItem, isInCart, getItemQuantity, isLoading } = useCart();

  const hasSelectedCategory =
    selectedCategoryName && selectedCategoryName != 'all';

  const productCategoryName = hasSelectedCategory
    ? selectedCategoryName
    : findCategoryById(categories, category)?.name;

  const handleAddToCart = () => {
    addItem(product);
  };

  const isProductInCart = isInCart(product.id);
  const quantityInCart = getItemQuantity(product.id);

  return (
    <ProductCardContainer>
      <ProductImageContainer>
        <Image
          className="rounded-t-[19px] "
          fill
          src={image}
          alt={name}
          style={{ objectFit: 'cover' }}
        />
      </ProductImageContainer>
      <ProductInfoContainer>
        <div className="flex justify-between">
          <CategoryText>{productCategoryName}</CategoryText>
          <div className="flex gap-1">
            <Image
              height={12}
              width={14}
              src="/star-icon.svg"
              alt="Avaliação"
            />
            <span>{rating}</span>
          </div>
        </div>
        <NameDescriptionContainer>
          <ProductName>{name}</ProductName>
          <ProductDescription>{description}</ProductDescription>
        </NameDescriptionContainer>
        <PriceStockContainer>
          <PriceText>{formatCurrency(price)}</PriceText>
          <StockText>{stock} em estoque</StockText>
        </PriceStockContainer>
        <Button
          className="mt-3.5"
          icon={
            <Image
              alt="carrinho de compras"
              src="/market-cart-icon.svg"
              width={24}
              height={24}
            />
          }
          onClick={handleAddToCart}
          disabled={isLoading || stock === 0}
          variant="primary"
        >
          Adicionar
        </Button>
      </ProductInfoContainer>
    </ProductCardContainer>
  );
}
