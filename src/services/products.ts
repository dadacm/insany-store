import { apiFetch } from './api';
import { ProductsResponseInterface } from '@/services/types/Product';

export async function getProducts(
  category?: string
): Promise<ProductsResponseInterface> {
  const query =
    category && category !== 'all'
      ? `?category=${encodeURIComponent(category)}`
      : '';

  return apiFetch<ProductsResponseInterface>(`/products${query}`);
}

export async function getProductById(
  id: number
): Promise<ProductsResponseInterface> {
  return apiFetch<ProductsResponseInterface>(`/products/${id}`);
}
