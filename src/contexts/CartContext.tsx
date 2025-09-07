'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { ProductInterface } from '@/services/types/Product';

interface CartItem extends ProductInterface {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: ProductInterface) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'insany-store-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveToStorage = useCallback((cartItems: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, []);

  const addItem = useCallback(
    (product: ProductInterface) => {
      setItems(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        let newItems;

        if (existingItem) {
          newItems = prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          newItems = [...prev, { ...product, quantity: 1 }];
        }

        saveToStorage(newItems);
        return newItems;
      });
    },
    [saveToStorage]
  );

  const removeItem = useCallback(
    (productId: number) => {
      setItems(prev => {
        const newItems = prev.filter(item => item.id !== productId);
        saveToStorage(newItems);
        return newItems;
      });
    },
    [saveToStorage]
  );

  const updateQuantity = useCallback(
    (productId: number, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setItems(prev => {
        const newItems = prev.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
        saveToStorage(newItems);
        return newItems;
      });
    },
    [removeItem, saveToStorage]
  );

  const clearCart = useCallback(() => {
    setItems([]);
    saveToStorage([]);
  }, [saveToStorage]);

  const getTotalPrice = useCallback(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const getTotalItems = useCallback(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const isInCart = useCallback(
    (productId: number) => items.some(item => item.id === productId),
    [items]
  );

  const getItemQuantity = useCallback(
    (productId: number) => {
      const item = items.find(item => item.id === productId);
      return item ? item.quantity : 0;
    },
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isInCart,
        getItemQuantity,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
