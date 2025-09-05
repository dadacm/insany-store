import { CategoryInterface } from '@/services/types/category';
import { ProductsResponseInterface } from '@/services/types/Product';

export interface ProductsSectionProps {
  productsResponse: ProductsResponseInterface;
  categories: CategoryInterface[];
  selectedCategory?: CategoryInterface;
  initialSort?: string;
  initialSearch?: string;
}
