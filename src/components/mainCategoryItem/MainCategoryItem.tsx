import { generateSlug } from '@/utils/generateSlugs';
import {
  CategoryTitle,
  MainCategoriesItemContainer,
  MainCategoriesItemContent,
  ProductQuantityText,
} from './MainCategoryItem.styles';
import { MainCategoryItemProps } from './MainCategoryItem.types';

export default function MainCategoriesItem({
  categoryName,
  productsQuantity,
}: MainCategoryItemProps) {
  return (
    <MainCategoriesItemContainer
      href={`/categoria/${generateSlug(categoryName)}`}
    >
      <MainCategoriesItemContent>
        <CategoryTitle>{categoryName}</CategoryTitle>
        <ProductQuantityText>{productsQuantity}</ProductQuantityText>
      </MainCategoriesItemContent>
    </MainCategoriesItemContainer>
  );
}
