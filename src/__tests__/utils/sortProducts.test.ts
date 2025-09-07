import { sortProducts } from '@/utils/sortProducts';
import { ProductInterface } from '@/services/types/Product';

const mockProducts: ProductInterface[] = [
  {
    id: 1,
    name: 'Produto A',
    description: 'Descrição A',
    brand: 'Marca A',
    category: 'Categoria A',
    image: 'image1.jpg',
    price: 100,
    rating: 4.5,
    stock: 10,
  },
  {
    id: 2,
    name: 'Produto B',
    description: 'Descrição B',
    brand: 'Marca B',
    category: 'Categoria B',
    image: 'image2.jpg',
    price: 200,
    rating: 4.0,
    stock: 5,
  },
  {
    id: 3,
    name: 'Produto C',
    description: 'Descrição C',
    brand: 'Marca C',
    category: 'Categoria C',
    image: 'image3.jpg',
    price: 50,
    rating: 5.0,
    stock: 15,
  },
];

describe('sortProducts', () => {
  it('should return empty array for invalid input', () => {
    expect(sortProducts(null as any, 'novidades')).toEqual([]);
    expect(sortProducts(undefined as any, 'novidades')).toEqual([]);
    expect(sortProducts('invalid' as any, 'novidades')).toEqual([]);
  });

  it('should sort by novidades (newest first)', () => {
    const sorted = sortProducts(mockProducts, 'novidades');
    expect(sorted[0].id).toBe(3);
    expect(sorted[1].id).toBe(2);
    expect(sorted[2].id).toBe(1);
  });

  it('should sort by preco-maior-menor (highest price first)', () => {
    const sorted = sortProducts(mockProducts, 'preco-maior-menor');
    expect(sorted[0].price).toBe(200);
    expect(sorted[1].price).toBe(100);
    expect(sorted[2].price).toBe(50);
  });

  it('should sort by preco-menor-maior (lowest price first)', () => {
    const sorted = sortProducts(mockProducts, 'preco-menor-maior');
    expect(sorted[0].price).toBe(50);
    expect(sorted[1].price).toBe(100);
    expect(sorted[2].price).toBe(200);
  });

  it('should sort by mais-vendidos (highest stock first)', () => {
    const sorted = sortProducts(mockProducts, 'mais-vendidos');
    expect(sorted[0].stock).toBe(15);
    expect(sorted[1].stock).toBe(10);
    expect(sorted[2].stock).toBe(5);
  });

  it('should return original array for unknown sort option', () => {
    const sorted = sortProducts(mockProducts, 'unknown' as any);
    expect(sorted).toEqual(mockProducts);
  });

  it('should not mutate original array', () => {
    const original = [...mockProducts];
    sortProducts(mockProducts, 'preco-maior-menor');
    expect(mockProducts).toEqual(original);
  });

  it('should handle products with missing price/stock values', () => {
    const productsWithMissingValues: ProductInterface[] = [
      { ...mockProducts[0], price: 0 },
      { ...mockProducts[1], stock: 0 },
      { ...mockProducts[2] },
    ];

    const sortedByPrice = sortProducts(
      productsWithMissingValues,
      'preco-menor-maior'
    );
    expect(sortedByPrice[0].price).toBe(0);

    const sortedByStock = sortProducts(
      productsWithMissingValues,
      'mais-vendidos'
    );
    expect(sortedByStock[0].stock).toBe(15);
  });
});
