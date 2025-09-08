'use client';

import MainCategoriesItem from '../mainCategoryItem/MainCategoryItem';
import {
  MainCategoriesContainer,
  MainCategoriesList,
  MainCategoriesTitle,
} from './MainCategoriesSection.styles';
import { MainCategoriesSectionProps } from './MainCategoriesSection.types';

export default function MainCategories({
  categories,
}: MainCategoriesSectionProps) {
  return (
    <MainCategoriesContainer>
      <MainCategoriesTitle>Principais categorias</MainCategoriesTitle>
      <MainCategoriesList>
        {categories.map(category => (
          <MainCategoriesItem
            key={category.id}
            categoryName={category.name}
            productsQuantity={category.productCount}
          />
        ))}
      </MainCategoriesList>
    </MainCategoriesContainer>
  );
}
