import { findCategoryById } from '@/utils/findCategoryById';
import { CategoryInterface } from '@/services/types/category';

const mockCategories: CategoryInterface[] = [
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
  { id: '3', name: 'Casa', description: 'Produtos para casa', productCount: 8 },
];

describe('findCategoryById', () => {
  it('should find category by existing id', () => {
    const result = findCategoryById(mockCategories, '1');
    expect(result).toEqual(mockCategories[0]);
  });

  it('should find category by different existing id', () => {
    const result = findCategoryById(mockCategories, '2');
    expect(result).toEqual(mockCategories[1]);
  });

  it('should return undefined for non-existing id', () => {
    const result = findCategoryById(mockCategories, '999');
    expect(result).toBeUndefined();
  });

  it('should return undefined for empty string id', () => {
    const result = findCategoryById(mockCategories, '');
    expect(result).toBeUndefined();
  });

  it('should handle empty categories array', () => {
    const result = findCategoryById([], '1');
    expect(result).toBeUndefined();
  });

  it('should be case sensitive', () => {
    const result = findCategoryById(mockCategories, '1');
    expect(result).toBeDefined();

    const resultCase = findCategoryById(mockCategories, '1');
    expect(resultCase).toBeDefined();
  });
});
