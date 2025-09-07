import { PRODUCTS_PER_PAGE } from '@/constants';
import { apiFetch } from './api';
import { ProductsResponseInterface } from '@/services/types/Product';

export interface GetProductsOptions {
  page?: number;
  search?: string;
  limit?: number;
}

export async function getProducts(
  category?: string,
  options?: GetProductsOptions
): Promise<ProductsResponseInterface> {
  const params = new URLSearchParams();

  if (category && category !== 'all') {
    params.set('category', category);
  }

  if (options?.page && options.page > 0) {
    params.set('page', options.page.toString());
  }

  if (options?.search && options.search.trim()) {
    params.set('search', options.search.trim());
  }

  const limit = options?.limit || PRODUCTS_PER_PAGE;
  params.set('limit', limit.toString());

  const query = params.toString() ? `?${params.toString()}` : '';
  const fullUrl = `/products${query}`;

  return apiFetch<ProductsResponseInterface>(fullUrl);
}

export async function getProductById(
  id: number
): Promise<ProductsResponseInterface> {
  return apiFetch<ProductsResponseInterface>(`/products/${id}`);
}
