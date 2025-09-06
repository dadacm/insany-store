import { CategoryInterface } from '@/services/types/category';
import { ProductInterface } from '@/services/types/Product';

export interface ProductsListProps {
  products: ProductInterface[];
  selectedCategoryName?: string;
  categories: CategoryInterface[];
}
