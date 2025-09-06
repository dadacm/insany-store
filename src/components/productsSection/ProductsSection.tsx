'use client';
import ProductFilters from '@/components/productFilter/ProductFilters';
import { useState } from 'react';
import { ProductsSectionProps } from './ProductsSection.types';
import { ProductsResponseInterface } from '@/services/types/Product';
import {
  CategoryDescription,
  PageTitle,
  TitleContainer,
} from './ProductsSection.styles';
import ProductsList from '../productsList/ProductsList';
import { Pagination } from '../pagination/Pagination';

export default function ProductsSection({
  productsResponse,
  categories,
  selectedCategory,
  currentSort,
  currentSearch,
  currentPage = 1,
}: ProductsSectionProps) {
  const [products, setProducts] = useState(productsResponse);

  const handleProductsChange = (newProducts: ProductsResponseInterface) => {
    setProducts(newProducts);
  };
  console.log({ products });

  return (
    <div>
      <main>
        <ProductFilters
          productsResponse={productsResponse}
          categories={categories}
          onProductsChange={handleProductsChange}
          selectedCategory={selectedCategory}
          currentSort={currentSort}
          currentSearch={currentSearch}
        />

        <div className="mt-8">
          <div>
            <TitleContainer>
              <PageTitle>
                {selectedCategory?.name || 'Todos os produtos'}
              </PageTitle>
              {selectedCategory?.description && (
                <CategoryDescription>
                  {selectedCategory.description}
                </CategoryDescription>
              )}
            </TitleContainer>
            <ProductsList
              products={products.products}
              categories={categories}
              selectedCategoryName={selectedCategory?.name}
            />
          </div>
          <Pagination
            pagination={products.pagination}
            onPageChange={() => {}}
          />
        </div>
      </main>
    </div>
  );
}
