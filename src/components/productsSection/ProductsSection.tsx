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
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || currentSearch;
  const hasSearch = search && search.trim() !== '';

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
            {hasSearch && (
              <div className="items-center flex  min-w-2xl w-full">
                <div style={{ fontSize: '14px', color: '#495057' }}>
                  Resultados para: <strong>"{search}"</strong>
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6c757d',
                    marginBlock: '14px',
                  }}
                >
                  {productsResponse.pagination.totalProducts} produtos
                  encontrados
                </div>
              </div>
            )}
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
