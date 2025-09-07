import { transformCategoriesToSelectOptions } from '@/utils/transformCategoriesInterfaceToSelectOptions';
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

describe('transformCategoriesToSelectOptions', () => {
  it('should transform categories to select options', () => {
    const result = transformCategoriesToSelectOptions(mockCategories);

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ value: 'all', label: 'Todas as categorias' });
    expect(result[1]).toEqual({ value: '1', label: 'Eletrônicos' });
    expect(result[2]).toEqual({ value: '2', label: 'Roupas' });
    expect(result[3]).toEqual({ value: '3', label: 'Casa' });
  });

  it('should handle empty categories array', () => {
    const result = transformCategoriesToSelectOptions([]);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ value: 'all', label: 'Todas as categorias' });
  });

  it('should preserve category id and name', () => {
    const result = transformCategoriesToSelectOptions(mockCategories);

    const electronicsOption = result.find(option => option.value === '1');
    expect(electronicsOption).toEqual({ value: '1', label: 'Eletrônicos' });
  });

  it('should always include "Todas as categorias" as first option', () => {
    const result = transformCategoriesToSelectOptions(mockCategories);

    expect(result[0].value).toBe('all');
    expect(result[0].label).toBe('Todas as categorias');
  });

  it('should handle single category', () => {
    const singleCategory = [mockCategories[0]];
    const result = transformCategoriesToSelectOptions(singleCategory);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ value: 'all', label: 'Todas as categorias' });
    expect(result[1]).toEqual({ value: '1', label: 'Eletrônicos' });
  });
});
