import '@testing-library/jest-dom';
import { render, screen, act, renderHook } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import { ProductInterface } from '@/services/types/Product';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockProduct: ProductInterface = {
  id: 1,
  name: 'Produto Teste',
  description: 'Descrição do produto',
  brand: 'Marca Teste',
  category: 'Categoria Teste',
  image: 'test.jpg',
  price: 100,
  rating: 4.5,
  stock: 10,
};

const TestComponent = () => {
  const { items, addItem, removeItem, getTotalPrice, getTotalItems } =
    useCart();

  return (
    <div>
      <div data-testid="total-items">{getTotalItems()}</div>
      <div data-testid="total-price">{getTotalPrice()}</div>
      <div data-testid="items-count">{items.length}</div>
      <button onClick={() => addItem(mockProduct)}>Add Item</button>
      <button onClick={() => removeItem(1)}>Remove Item</button>
    </div>
  );
};

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    localStorageMock.getItem.mockClear();
  });

  it('should provide cart context to children', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
    expect(screen.getByTestId('items-count')).toHaveTextContent('0');
  });

  it('should add item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Item').click();
    });

    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('100');
    expect(screen.getByTestId('items-count')).toHaveTextContent('1');
  });

  it('should increment quantity when adding same item twice', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Item').click();
      screen.getByText('Add Item').click();
    });

    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('200');
    expect(screen.getByTestId('items-count')).toHaveTextContent('1');
  });

  it('should remove item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Item').click();
    });

    expect(screen.getByTestId('total-items')).toHaveTextContent('1');

    act(() => {
      screen.getByText('Remove Item').click();
    });

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
    expect(screen.getByTestId('items-count')).toHaveTextContent('0');
  });

  it('should load cart from localStorage on mount', () => {
    const savedCart = JSON.stringify([{ ...mockProduct, quantity: 2 }]);
    localStorageMock.getItem.mockReturnValue(savedCart);

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('200');
    expect(screen.getByTestId('items-count')).toHaveTextContent('1');
  });

  it('should save cart to localStorage when items change', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByText('Add Item').click();
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'insany-store-cart',
      expect.stringContaining('"id":1')
    );
  });

  it('should throw error when useCart is used outside provider', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within a CartProvider');

    consoleSpy.mockRestore();
  });
});
