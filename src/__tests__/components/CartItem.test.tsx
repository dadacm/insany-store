import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '@/components/cartItem/CartItem';
import { useCart } from '@/contexts/CartContext';

jest.mock('@/contexts/CartContext');

const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

const mockCartItem = {
  id: 1,
  name: 'Test Product',
  description: 'A test product description',
  brand: 'Test Brand',
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  quantity: 2,
};

describe('CartItem Component', () => {
  const mockRemoveItem = jest.fn();
  const mockUpdateQuantity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCart.mockReturnValue({
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      isLoading: false,
      items: [],
      addItem: jest.fn(),
      clearCart: jest.fn(),
      getTotalPrice: jest.fn(),
      getTotalItems: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });
  });

  it('should render cart item information', () => {
    render(<CartItem item={mockCartItem} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('R$ 199,98')).toBeInTheDocument();
  });

  it('should render product image', () => {
    render(<CartItem item={mockCartItem} />);

    const productImage = screen.getByAltText('Test Product');
    expect(productImage).toHaveAttribute('alt', 'Test Product');
    expect(productImage).toHaveAttribute('src');
  });

  it('should render quantity select with correct value', () => {
    render(<CartItem item={mockCartItem} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should call removeItem when remove button is clicked', () => {
    render(<CartItem item={mockCartItem} />);

    const removeButton = screen.getByRole('button', { name: /remover/i });
    fireEvent.click(removeButton);

    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });

  it('should call updateQuantity when quantity changes', () => {
    render(<CartItem item={mockCartItem} />);

    const quantityField = screen.getByText('2');
    fireEvent.click(quantityField);

    const option5 = screen.getByText('5');
    fireEvent.click(option5);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 5);
  });

  it('should calculate total price correctly', () => {
    const itemWithDifferentQuantity = { ...mockCartItem, quantity: 3 };
    render(<CartItem item={itemWithDifferentQuantity} />);

    expect(screen.getByText('R$ 299,97')).toBeInTheDocument();
  });

  it('should render remove button with trash icon', () => {
    render(<CartItem item={mockCartItem} />);

    const removeButton = screen.getByRole('button', { name: /remover/i });
    const trashIcon = removeButton.querySelector('img');

    expect(trashIcon).toHaveAttribute('src', '/trash-icon.svg');
    expect(trashIcon).toHaveAttribute('alt', 'Remover');
  });

  it('should disable remove button when loading', () => {
    mockUseCart.mockReturnValue({
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      isLoading: true,
      items: [],
      addItem: jest.fn(),
      clearCart: jest.fn(),
      getTotalPrice: jest.fn(),
      getTotalItems: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartItem item={mockCartItem} />);

    const removeButton = screen.getByRole('button', { name: /remover/i });
    expect(removeButton).toBeDisabled();
  });

  it('should disable quantity select when loading', () => {
    mockUseCart.mockReturnValue({
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      isLoading: true,
      items: [],
      addItem: jest.fn(),
      clearCart: jest.fn(),
      getTotalPrice: jest.fn(),
      getTotalItems: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
    });

    render(<CartItem item={mockCartItem} />);

    const quantityField = screen.getByText('2');
    fireEvent.click(quantityField);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should handle zero quantity', () => {
    const itemWithZeroQuantity = { ...mockCartItem, quantity: 0 };
    render(<CartItem item={itemWithZeroQuantity} />);

    expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
  });

  it('should handle high quantity', () => {
    const itemWithHighQuantity = { ...mockCartItem, quantity: 100 };
    render(<CartItem item={itemWithHighQuantity} />);

    expect(screen.getByText('R$ 9.999,00')).toBeInTheDocument();
  });
});
