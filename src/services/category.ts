import { apiFetch } from './api';
import { CategoryInterface } from '@/services/types/category';

export async function getCategories(): Promise<{
  categories: CategoryInterface[];
}> {
  return apiFetch<{
    categories: CategoryInterface[];
  }>('/categories');
}
