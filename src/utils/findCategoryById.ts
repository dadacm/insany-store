import { CategoryInterface } from '@/services/types/category';

export const findCategoryById = (categories: CategoryInterface[], id: string) =>
  categories.find(category => category.id === id);
