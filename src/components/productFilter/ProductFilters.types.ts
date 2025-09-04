import { CategoryInterface } from '@/services/types/category';
import { ProductsResponseInterface } from '@/services/types/Product';

export interface ProductFilterProps {
  categories: CategoryInterface[];
  initialProducts?: ProductsResponseInterface;
  onProductsChange?: (newProducts: ProductsResponseInterface) => void;
}
export type SortValueOptions =
  | 'novidades'
  | 'preco-maior-menor'
  | 'preco-menor-maior'
  | 'mais-vendidos';
