import { CategoryInterface } from '@/services/types/category';
import { ProductsResponseInterface } from '@/services/types/Product';

export interface ProductsSectionProps {
  initialProducts: ProductsResponseInterface;
  categories: CategoryInterface[];
}
