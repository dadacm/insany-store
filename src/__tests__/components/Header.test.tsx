import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/header/Header';
import { useSearch } from '@/hooks/useSearch';
import { useCart } from '@/hooks/useCart';

jest.mock('@/hooks/useSearch');
jest.mock('@/hooks/useCart');
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

const mockUseSearch = useSearch as jest.MockedFunction<typeof useSearch>;
const mockUseCart = useCart as jest.MockedFunction<typeof useCart>;

describe('Header Component', () => {
  const mockSearchValue = 'test search';
  const mockSetSearchValue = jest.fn();
  const mockHandleSearch = jest.fn();
  const mockIsSearching = false;

  const mockCartItems = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      brand: 'Brand 1',
      category: 'Category 1',
      image: 'image1.jpg',
      price: 100,
      rating: 4.5,
      stock: 10,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      brand: 'Brand 2',
      category: 'Category 2',
      image: 'image2.jpg',
      price: 50,
      rating: 4.0,
      stock: 5,
      quantity: 1,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseSearch.mockReturnValue({
      searchValue: mockSearchValue,
      setSearchValue: mockSetSearchValue,
      performSearch: jest.fn(),
      handleSearch: mockHandleSearch,
      clearSearch: jest.fn(),
      isSearching: mockIsSearching,
      currentSearch: '',
    });

    mockUseCart.mockReturnValue({
      items: mockCartItems,
      addItem: jest.fn(),
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getTotalPrice: jest.fn(),
      getTotalItems: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
      isLoading: false,
    });
  });

  it('should render header with title and search input', () => {
    render(<Header />);

    expect(screen.getByText('InsanyShop')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Procurando por algo específico?')
    ).toBeInTheDocument();
  });

  it('should display cart icon with badge when items are in cart', () => {
    render(<Header />);

    const cartIcon = screen.getByAltText('seu carrinho');
    expect(cartIcon).toBeInTheDocument();

    const cartBadge = screen.getByText('3'); // 2 + 1 = 3 total items
    expect(cartBadge).toBeInTheDocument();
  });

  it('should not display cart badge when cart is empty', () => {
    mockUseCart.mockReturnValue({
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getTotalPrice: jest.fn(),
      getTotalItems: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
      isLoading: false,
    });

    render(<Header />);

    const cartIcon = screen.getByAltText('seu carrinho');
    expect(cartIcon).toBeInTheDocument();

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('should not display cart badge when cart is loading', () => {
    mockUseCart.mockReturnValue({
      items: mockCartItems,
      addItem: jest.fn(),
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
      getTotalPrice: jest.fn(),
      getTotalItems: jest.fn(),
      isInCart: jest.fn(),
      getItemQuantity: jest.fn(),
      isLoading: true,
    });

    render(<Header />);

    const cartIcon = screen.getByAltText('seu carrinho');
    expect(cartIcon).toBeInTheDocument();

    expect(screen.queryByText('3')).not.toBeInTheDocument();
  });

  it('should handle search input change', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText(
      'Procurando por algo específico?'
    );
    fireEvent.change(searchInput, { target: { value: 'new search' } });

    expect(mockSetSearchValue).toHaveBeenCalledWith('new search');
  });

  it('should handle search on Enter key press', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText(
      'Procurando por algo específico?'
    );
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    expect(mockHandleSearch).toHaveBeenCalled();
  });

  it('should not handle search on Enter key press when searching', () => {
    mockUseSearch.mockReturnValue({
      searchValue: mockSearchValue,
      setSearchValue: mockSetSearchValue,
      performSearch: jest.fn(),
      handleSearch: mockHandleSearch,
      clearSearch: jest.fn(),
      isSearching: true,
      currentSearch: '',
    });

    render(<Header />);

    const searchInput = screen.getByPlaceholderText(
      'Procurando por algo específico?'
    );
    fireEvent.keyDown(searchInput, { key: 'Enter' });

    expect(mockHandleSearch).not.toHaveBeenCalled();
  });

  it('should have correct links', () => {
    render(<Header />);

    const homeLink = screen.getByRole('link', { name: 'InsanyShop' });
    expect(homeLink).toHaveAttribute('href', '/');

    const cartLink = screen.getByRole('link', { name: 'seu carrinho 3' });
    expect(cartLink).toHaveAttribute('href', '/carrinho');
  });
});
