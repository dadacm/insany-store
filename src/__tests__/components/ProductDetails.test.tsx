import { render, screen } from '@testing-library/react';
import { ProductDetails } from '@/components/productDetails/ProductDetails';
import { ProductInterface } from '@/services/types/Product';
import { CategoryInterface } from '@/services/types/category';

jest.mock('next/image', () => {
  return function MockImage({ alt, src, ...props }: any) {
    return <img alt={alt} src={src} {...props} />;
  };
});

jest.mock('@/components/backButtonComponent/BackButtonComponent', () => ({
  BackButtonComponent: () => <div data-testid="back-button">Back Button</div>,
}));

jest.mock('@/components/addItemToCartButton/AddItemToCartButton', () => ({
  AddItemToCartButton: ({ product }: { product: ProductInterface }) => (
    <button data-testid="add-to-cart-button">
      Add to Cart - {product.name}
    </button>
  ),
}));

jest.mock('@/utils/formatCurrency', () => ({
  formatCurrency: (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`,
}));

jest.mock('@/utils/findCategoryById', () => ({
  findCategoryById: (categories: CategoryInterface[], id: string) => {
    return categories.find(cat => cat.id === id);
  },
}));

describe('ProductDetails Component', () => {
  const mockProduct: ProductInterface = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product description',
    brand: 'Test Brand',
    category: 'electronics',
    image: '/test-image.jpg',
    price: 99.99,
    rating: 4.5,
    stock: 10,
  };

  const mockCategories: CategoryInterface[] = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Electronic products',
      productCount: 5,
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Clothing items',
      productCount: 3,
    },
  ];

  it('should render product details correctly', () => {
    render(
      <ProductDetails product={mockProduct} categories={mockCategories} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,99')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test product description')
    ).toBeInTheDocument();
  });

  it('should render back button', () => {
    render(
      <ProductDetails product={mockProduct} categories={mockCategories} />
    );

    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('should render add to cart button', () => {
    render(
      <ProductDetails product={mockProduct} categories={mockCategories} />
    );

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toHaveTextContent('Add to Cart - Test Product');
  });

  it('should render product image with correct attributes', () => {
    render(
      <ProductDetails product={mockProduct} categories={mockCategories} />
    );

    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should render description section', () => {
    render(
      <ProductDetails product={mockProduct} categories={mockCategories} />
    );

    expect(screen.getByText('DESCRIÇÃO')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test product description')
    ).toBeInTheDocument();
  });

  it('should handle missing category gracefully', () => {
    const productWithoutCategory = {
      ...mockProduct,
      category: 'nonexistent',
    };

    render(
      <ProductDetails
        product={productWithoutCategory}
        categories={mockCategories}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
  });

  it('should handle empty categories array', () => {
    render(<ProductDetails product={mockProduct} categories={[]} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,99')).toBeInTheDocument();
  });

  it('should format price correctly', () => {
    const expensiveProduct = {
      ...mockProduct,
      price: 1234.56,
    };

    render(
      <ProductDetails product={expensiveProduct} categories={mockCategories} />
    );

    expect(screen.getByText('R$ 1234,56')).toBeInTheDocument();
  });
});
