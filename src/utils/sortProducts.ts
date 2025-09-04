import { SortValueOptions } from '@/components/productFilter/ProductFilters.types';
import { ProductInterface } from '@/services/types/Product';

export function sortProducts(
  products: ProductInterface[],
  sortBy: SortValueOptions
): ProductInterface[] {
  if (!Array.isArray(products)) {
    return [];
  }

  const sortedProducts = [...products];

  switch (sortBy) {
    case 'novidades':
      return sortedProducts.sort((a, b) => {
        const idA = a.id || 0;
        const idB = b.id || 0;
        return idB - idA;
      });

    case 'preco-maior-menor':
      return sortedProducts.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceB - priceA;
      });

    case 'preco-menor-maior':
      return sortedProducts.sort((a, b) => {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return priceA - priceB;
      });
    case 'mais-vendidos':
      return sortedProducts.sort((a, b) => {
        const stockA = a.stock || 0;
        const stockB = b.stock || 0;
        return stockA - stockB;
      });

    default:
      return sortedProducts;
  }
}
