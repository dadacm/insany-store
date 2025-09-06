import { CategoryInterface } from '@/services/types/category';
import { ProductInterface } from '@/services/types/Product';

export interface ProductCardProps {
  product: ProductInterface;
  selectedCategoryName?: string;
  categories: CategoryInterface[];
}
