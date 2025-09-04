'use client';
import ProductFilters from '@/components/productFilter/ProductFilters';
import { useState } from 'react';
import { ProductsSectionProps } from './ProductsSection.types';
import {
  ProductInterface,
  ProductsResponseInterface,
} from '@/services/types/Product';

export default function ProductsSection({
  initialProducts,
  categories,
}: ProductsSectionProps) {
  const [products, setProducts] = useState(initialProducts);

  const handleProductsChange = (newProducts: ProductsResponseInterface) => {
    setProducts(newProducts);
    console.log('Produtos filtrados:', newProducts);
  };

  return (
    <div>
      <main>
        <ProductFilters
          initialProducts={initialProducts}
          categories={categories}
          onProductsChange={handleProductsChange}
        />

        <div className="mt-8">
          <h2>Produtos ({products.products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
