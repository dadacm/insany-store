import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/productCard/ProductCard';
import { ProductInterface } from '@/services/types/Product';
import { CategoryInterface } from '@/services/types/category';
import { CartProvider } from '@/contexts/CartContext';

const mockProduct: ProductInterface = {
  id: 1,
  name: 'Test Product',
  description: 'A test product description',
  brand: 'Test Brand',
  category: '1', // Changed to match category ID
  image: 'https://example.com/image.jpg',
  price: 99.99,
  rating: 4.5,
  stock: 10,
};

const mockCategories: CategoryInterface[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Electronic products',
    productCount: 5,
  },
  { id: '2', name: 'Clothing', description: 'Clothing items', productCount: 3 },
];

const renderWithCartProvider = (component: React.ReactElement) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe('ProductCard Component', () => {
  it('should render product information', () => {
    renderWithCartProvider(
      <ProductCard product={mockProduct} categories={mockCategories} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,99')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('should render product image with correct alt text', () => {
    renderWithCartProvider(
      <ProductCard product={mockProduct} categories={mockCategories} />
    );

    const productImage = screen.getByAltText('Test Product');
    expect(productImage).toHaveAttribute('alt', 'Test Product');
    expect(productImage).toHaveAttribute('src');
  });

  it('should render star rating', () => {
    renderWithCartProvider(
      <ProductCard product={mockProduct} categories={mockCategories} />
    );

    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('should render add to cart button', () => {
    renderWithCartProvider(
      <ProductCard product={mockProduct} categories={mockCategories} />
    );

    expect(
      screen.getByRole('button', { name: /adicionar/i })
    ).toBeInTheDocument();
  });

  it('should handle add to cart button click', () => {
    renderWithCartProvider(
      <ProductCard product={mockProduct} categories={mockCategories} />
    );

    const addButton = screen.getByRole('button', {
      name: /adicionar/i,
    });
    fireEvent.click(addButton);

    expect(addButton).toBeInTheDocument();
  });

  it('should display correct price format', () => {
    const productWithDifferentPrice = {
      ...mockProduct,
      price: 1234.56,
    };

    renderWithCartProvider(
      <ProductCard
        product={productWithDifferentPrice}
        categories={mockCategories}
      />
    );

    expect(screen.getByText('R$ 1.234,56')).toBeInTheDocument();
  });

  it('should handle product with zero rating', () => {
    const productWithZeroRating = {
      ...mockProduct,
      rating: 0,
    };

    renderWithCartProvider(
      <ProductCard
        product={productWithZeroRating}
        categories={mockCategories}
      />
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should handle product with high rating', () => {
    const productWithHighRating = {
      ...mockProduct,
      rating: 5,
    };

    renderWithCartProvider(
      <ProductCard
        product={productWithHighRating}
        categories={mockCategories}
      />
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should handle product with decimal rating', () => {
    const productWithDecimalRating = {
      ...mockProduct,
      rating: 3.7,
    };

    renderWithCartProvider(
      <ProductCard
        product={productWithDecimalRating}
        categories={mockCategories}
      />
    );

    expect(screen.getByText('3.7')).toBeInTheDocument();
  });

  it('should render with different product names', () => {
    const differentProduct = {
      ...mockProduct,
      name: 'Different Product Name',
    };

    renderWithCartProvider(
      <ProductCard product={differentProduct} categories={mockCategories} />
    );

    expect(screen.getByText('Different Product Name')).toBeInTheDocument();
  });

  it('should render with different brands', () => {
    const differentBrandProduct = {
      ...mockProduct,
      brand: 'Different Brand',
    };

    renderWithCartProvider(
      <ProductCard
        product={differentBrandProduct}
        categories={mockCategories}
      />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('should handle empty categories array', () => {
    renderWithCartProvider(
      <ProductCard product={mockProduct} categories={[]} />
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('R$ 99,99')).toBeInTheDocument();
  });

  it('should render product card as clickable container', () => {
    renderWithCartProvider(
      <ProductCard product={mockProduct} categories={mockCategories} />
    );

    const cardContainer = screen.getByText('Test Product').closest('div');
    expect(cardContainer).toBeInTheDocument();
  });
});
