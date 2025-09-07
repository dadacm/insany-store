import { useCart } from '@/contexts/CartContext';
import CartItem from '../cartItem/CartItem';
import { formatCurrency } from '@/utils/formatCurrency';
import Image from 'next/image';
import {
  CartDescription,
  CartTitle,
  TotalPriceText,
} from './CartProductsSection.styles';
import { BackButtonComponent } from '../backButtonComponent/BackButtonComponent';

export default function CartProductsSection() {
  const { items, getTotalPrice, getTotalItems } = useCart();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <div className="flex-1">
      <BackButtonComponent />
      <CartTitle>SEU CARRINHO</CartTitle>
      <div>
        <CartDescription>
          Total {'('} {totalItems} {totalItems === 1 ? 'produto' : 'produtos'}
          {')'}
        </CartDescription>
        <TotalPriceText> {formatCurrency(totalPrice)}</TotalPriceText>
        <div className="flex mt-6 flex-col gap-4">
          {items.map(item => (
            <CartItem item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
