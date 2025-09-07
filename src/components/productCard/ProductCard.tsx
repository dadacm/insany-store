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
import { generateSlug } from '@/utils/generateSlugs';
import { useRouter } from 'next/navigation';
import { AddItemToCartButton } from '../addItemToCartButton/AddItemToCartButton';

export default function ProductCard({
  product,
  selectedCategoryName,
  categories,
}: ProductCardProps) {
  const { category, description, image, name, price, rating, stock } = product;

  const hasSelectedCategory =
    selectedCategoryName && selectedCategoryName != 'all';

  const productCategoryName = hasSelectedCategory
    ? selectedCategoryName
    : findCategoryById(categories, category)?.name;

  const router = useRouter();

  const handleCardClick = () => {
    const slug = generateSlug(name);
    router.push(`/produto/${slug}`);
  };

  return (
    <ProductCardContainer onClick={handleCardClick}>
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
        <AddItemToCartButton product={product} />
      </ProductInfoContainer>
    </ProductCardContainer>
  );
}
