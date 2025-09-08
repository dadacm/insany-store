import { DELIVERY_PRICE } from '@/constants';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from '../button/Button';
import { useCart } from '@/contexts/CartContext';
import {
  CartResumeCard,
  CartResumeItem,
  CartResumeItens,
  CartResumeTitle,
  CartResumeTotalItem,
  Separator,
} from './CartResumeSection.styles';
import CartResumeFooter from '../CartResumeFooter/CartResumeFooter';

export default function CartResumeSection() {
  const { getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();

  return (
    <CartResumeCard>
      <div>
        <CartResumeTitle>RESUMO DO PEDIDO</CartResumeTitle>
        <CartResumeItens>
          <CartResumeItem>
            <span>Subtotal de produtos</span>
            <span>{formatCurrency(totalPrice)}</span>
          </CartResumeItem>
          <CartResumeItem>
            <span>Entrega</span>
            <span>{formatCurrency(DELIVERY_PRICE)}</span>
          </CartResumeItem>
        </CartResumeItens>
        <Separator />
        <CartResumeTotalItem>
          <span>Total</span>
          <span>{formatCurrency(totalPrice + DELIVERY_PRICE)}</span>
        </CartResumeTotalItem>
        <Button variant="secondary">FINALIZAR A COMPRA</Button>
      </div>
      <CartResumeFooter />
    </CartResumeCard>
  );
}
