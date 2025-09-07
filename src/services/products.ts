import { PRODUCTS_PER_PAGE } from '@/constants';
import { apiFetch } from './api';
import { ProductsResponseInterface } from '@/services/types/Product';
import { ProductInterface } from '@/services/types/Product';
import { generateSlug } from '@/utils/generateSlugs';

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

export async function getProductById(id: number): Promise<ProductInterface> {
  return apiFetch<ProductInterface>(`/products/${id}`);
}

export async function getProductBySlug(
  slug: string
): Promise<ProductInterface> {
  const response = await getProducts('all', { limit: 1000 });

  const product = response.products.find(
    product => generateSlug(product.name) === slug
  );

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  return product;
}
