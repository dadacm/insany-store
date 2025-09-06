import { CategoryInterface } from '@/services/types/category';
import { ProductsResponseInterface } from '@/services/types/Product';

export interface ProductFilterProps {
  categories: CategoryInterface[];
  productsResponse: ProductsResponseInterface;
  onProductsChange: (products: ProductsResponseInterface) => void;
  selectedCategory?: CategoryInterface;
  currentSort?: string;
  currentSearch?: string;
}

export type SortValueOptions =
  | 'novidades'
  | 'preco-maior-menor'
  | 'preco-menor-maior'
  | 'mais-vendidos';
