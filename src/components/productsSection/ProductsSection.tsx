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

export default function ProductsSection({
  productsResponse,
  categories,
  selectedCategory,
  initialSort,
  initialSearch,
}: ProductsSectionProps) {
  const [products, setProducts] = useState(productsResponse);

  const handleProductsChange = (newProducts: ProductsResponseInterface) => {
    setProducts(newProducts);
  };

  return (
    <div>
      <main>
        <ProductFilters
          productsResponse={productsResponse}
          categories={categories}
          onProductsChange={handleProductsChange}
          selectedCategory={selectedCategory}
          initialSort={initialSort}
          initialSearch={initialSearch}
        />

        <div className="mt-8">
          <TitleContainer>
            <PageTitle>{selectedCategory?.name}</PageTitle>
            <CategoryDescription>
              {selectedCategory?.description}
            </CategoryDescription>
          </TitleContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {products.products.map((product: any) => (
              <div key={product.id} className="border text-black p-4 rounded">
                <h3>{product.name}</h3>
                <p>R$ {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
