import {
  getProducts,
  getProductById,
  getProductBySlug,
} from '@/services/products';
import { apiFetch } from '@/services/api';
import { generateSlug } from '@/utils/generateSlugs';

jest.mock('@/services/api');
jest.mock('@/utils/generateSlugs');

const mockApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;
const mockGenerateSlug = generateSlug as jest.MockedFunction<
  typeof generateSlug
>;

describe('Products Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    const mockProductsResponse = {
      products: [
        { id: 1, name: 'Product 1', price: 100, category: 'electronics' },
        { id: 2, name: 'Product 2', price: 200, category: 'clothing' },
      ],
      pagination: {
        currentPage: 1,
        hasNextPage: true,
        hasPreviousPage: false,
        totalPages: 5,
        totalProducts: 10,
      },
    };

    it('should fetch products without filters', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts();

      expect(mockApiFetch).toHaveBeenCalledWith('/products?limit=8');
      expect(result).toEqual(mockProductsResponse);
    });

    it('should fetch products with category filter', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts('electronics');

      expect(mockApiFetch).toHaveBeenCalledWith(
        '/products?category=electronics&limit=8'
      );
      expect(result).toEqual(mockProductsResponse);
    });

    it('should ignore "all" category', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts('all');

      expect(mockApiFetch).toHaveBeenCalledWith('/products?limit=8');
      expect(result).toEqual(mockProductsResponse);
    });

    it('should fetch products with page option', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts('electronics', { page: 2 });

      expect(mockApiFetch).toHaveBeenCalledWith(
        '/products?category=electronics&page=2&limit=8'
      );
      expect(result).toEqual(mockProductsResponse);
    });

    it('should fetch products with search option', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts('electronics', { search: 'phone' });

      expect(mockApiFetch).toHaveBeenCalledWith(
        '/products?category=electronics&search=phone&limit=8'
      );
      expect(result).toEqual(mockProductsResponse);
    });

    it('should fetch products with custom limit', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts('electronics', { limit: 20 });

      expect(mockApiFetch).toHaveBeenCalledWith(
        '/products?category=electronics&limit=20'
      );
      expect(result).toEqual(mockProductsResponse);
    });

    it('should ignore page 0 or negative', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts('electronics', { page: 0 });

      expect(mockApiFetch).toHaveBeenCalledWith(
        '/products?category=electronics&limit=8'
      );
      expect(result).toEqual(mockProductsResponse);
    });

    it('should trim search query', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts('electronics', { search: '  phone  ' });

      expect(mockApiFetch).toHaveBeenCalledWith(
        '/products?category=electronics&search=phone&limit=8'
      );
      expect(result).toEqual(mockProductsResponse);
    });

    it('should handle empty search query', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProducts('electronics', { search: '' });

      expect(mockApiFetch).toHaveBeenCalledWith(
        '/products?category=electronics&limit=8'
      );
      expect(result).toEqual(mockProductsResponse);
    });
  });

  describe('getProductById', () => {
    const mockProduct = {
      id: 1,
      name: 'Product 1',
      price: 100,
      category: 'electronics',
    };

    it('should fetch product by id', async () => {
      mockApiFetch.mockResolvedValueOnce(mockProduct);

      const result = await getProductById(1);

      expect(mockApiFetch).toHaveBeenCalledWith('/products/1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('getProductBySlug', () => {
    const mockProduct = {
      id: 1,
      name: 'Product 1',
      price: 100,
      category: 'electronics',
    };

    const mockProductsResponse = {
      products: [mockProduct],
      pagination: {
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 1,
        totalProducts: 1,
      },
    };

    it('should fetch product by slug', async () => {
      mockGenerateSlug.mockReturnValue('product-1');
      mockApiFetch.mockResolvedValueOnce(mockProductsResponse);

      const result = await getProductBySlug('product-1');

      expect(mockApiFetch).toHaveBeenCalledWith('/products?limit=1000');
      expect(mockGenerateSlug).toHaveBeenCalledWith('Product 1');
      expect(result).toEqual(mockProduct);
    });
  });
});
