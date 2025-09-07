import { getCategories } from '@/services/category';
import { apiFetch } from '@/services/api';

jest.mock('@/services/api');

const mockApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

describe('Category Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch categories successfully', async () => {
    const mockCategoriesResponse = {
      categories: [
        {
          id: '1',
          name: 'Eletrônicos',
          description: 'Produtos eletrônicos',
          productCount: 10,
        },
        {
          id: '2',
          name: 'Roupas',
          description: 'Roupas e acessórios',
          productCount: 5,
        },
        {
          id: '3',
          name: 'Casa',
          description: 'Produtos para casa',
          productCount: 8,
        },
      ],
    };

    mockApiFetch.mockResolvedValueOnce(mockCategoriesResponse);

    const result = await getCategories();

    expect(mockApiFetch).toHaveBeenCalledWith('/categories');
    expect(result).toEqual(mockCategoriesResponse);
  });

  it('should handle empty categories response', async () => {
    const mockEmptyResponse = { categories: [] };

    mockApiFetch.mockResolvedValueOnce(mockEmptyResponse);

    const result = await getCategories();

    expect(mockApiFetch).toHaveBeenCalledWith('/categories');
    expect(result).toEqual(mockEmptyResponse);
  });

  it('should propagate API errors', async () => {
    const error = new Error('API Error');
    mockApiFetch.mockRejectedValueOnce(error);

    await expect(getCategories()).rejects.toThrow('API Error');
  });
});
