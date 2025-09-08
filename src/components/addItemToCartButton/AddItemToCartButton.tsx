import Image from 'next/image';
import Button from '../button/Button';
import { useCart } from '@/contexts/CartContext';
import { AddItemToCartProps } from './AddItemToCartButton.types';

export function AddItemToCartButton({ product }: AddItemToCartProps) {
  const { addItem, isInCart, getItemQuantity, isLoading } = useCart();

  const isProductInCart = isInCart(product.id);
  const quantityInCart = getItemQuantity(product.id);
  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <Button
      className="mt-3.5"
      icon={
        <Image
          alt="carrinho de compras"
          src="/market-cart-icon.svg"
          width={24}
          height={24}
        />
      }
      onClick={e => {
        e.stopPropagation();
        handleAddToCart();
      }}
      disabled={isLoading || product.stock === 0}
      variant={isProductInCart ? 'secondary' : 'primary'}
    >
      Adicionar {isProductInCart && `( ${quantityInCart} )`}
    </Button>
  );
}
