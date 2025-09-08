import { render, screen, fireEvent } from '@testing-library/react';
import { AddItemToCartButton } from '@/components/addItemToCartButton/AddItemToCartButton';
import { useCart } from '@/contexts/CartContext';
import { ProductInterface } from '@/services/types/Product';

jest.mock('@/contexts/CartContext');

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

const mockProduct: ProductInterface = {
  id: 1,
  name: 'Test Product',
  description: 'A test product',
  brand: 'Test Brand',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  price: 99.99,
  rating: 4.5,
  stock: 10,
};

describe('AddItemToCartButton Component', () => {
  const mockAddItem = jest.fn();
  const mockIsInCart = jest.fn();
  const mockGetItemQuantity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCart.mockReturnValue({
      addItem: mockAddItem,
      isInCart: mockIsInCart,
      getItemQuantity: mockGetItemQuantity,
      isLoading: false,
      items: [],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getTotalPrice: jest.fn(),
      getTotalItems: jest.fn(),
    });
  });

  it('should render add to cart button', () => {
    mockIsInCart.mockReturnValue(false);
    mockGetItemQuantity.mockReturnValue(0);

    render(<AddItemToCartButton product={mockProduct} />);

    expect(
      screen.getByRole('button', { name: /adicionar/i })
    ).toBeInTheDocument();
  });

  it('should call addItem when button is clicked', () => {
    mockIsInCart.mockReturnValue(false);
    mockGetItemQuantity.mockReturnValue(0);

    render(<AddItemToCartButton product={mockProduct} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockAddItem).toHaveBeenCalledWith(mockProduct);
  });

  it('should show quantity when product is in cart', () => {
    mockIsInCart.mockReturnValue(true);
    mockGetItemQuantity.mockReturnValue(3);

    render(<AddItemToCartButton product={mockProduct} />);

    expect(screen.getByText('Adicionar ( 3 )')).toBeInTheDocument();
  });

  it('should use secondary variant when product is in cart', () => {
    mockIsInCart.mockReturnValue(true);
    mockGetItemQuantity.mockReturnValue(1);

    render(<AddItemToCartButton product={mockProduct} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('secondary');
  });

  it('should use primary variant when product is not in cart', () => {
    mockIsInCart.mockReturnValue(false);
    mockGetItemQuantity.mockReturnValue(0);

    render(<AddItemToCartButton product={mockProduct} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('primary');
  });

  it('should be disabled when product is out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    mockIsInCart.mockReturnValue(false);
    mockGetItemQuantity.mockReturnValue(0);

    render(<AddItemToCartButton product={outOfStockProduct} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should be disabled when cart is loading', () => {
    mockUseCart.mockReturnValue({
      addItem: mockAddItem,
      isInCart: mockIsInCart,
      getItemQuantity: mockGetItemQuantity,
      isLoading: true,
      items: [],
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getTotalPrice: jest.fn(),
      getTotalItems: jest.fn(),
    });

    mockIsInCart.mockReturnValue(false);
    mockGetItemQuantity.mockReturnValue(0);

    render(<AddItemToCartButton product={mockProduct} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should render cart icon', () => {
    mockIsInCart.mockReturnValue(false);
    mockGetItemQuantity.mockReturnValue(0);

    render(<AddItemToCartButton product={mockProduct} />);

    const image = screen.getByAltText('carrinho de compras');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/market-cart-icon.svg');
  });

  it('should not call addItem when button is disabled', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    mockIsInCart.mockReturnValue(false);
    mockGetItemQuantity.mockReturnValue(0);

    render(<AddItemToCartButton product={outOfStockProduct} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockAddItem).not.toHaveBeenCalled();
  });
});
