import Image from 'next/image';
import {
  CartPageContainer,
  EmptyCartContainer,
  EmptyCartText,
  EmptyCartTitle,
} from './EmptyCart.styles';
import Link from 'next/link';
import Button from '../button/Button';

export default function EmptyCart() {
  return (
    <CartPageContainer>
      <EmptyCartContainer>
        <Image
          src="/bag-icon.svg"
          alt="Carrinho vazio"
          width={120}
          height={120}
          style={{ opacity: 0.3, margin: '0 auto 2rem' }}
        />
        <EmptyCartTitle>Seu carrinho está vazio</EmptyCartTitle>
        <EmptyCartText>
          Adicione alguns produtos para começar suas compras!
        </EmptyCartText>
        <Link href="/">
          <Button variant="primary">Continuar comprando</Button>
        </Link>
      </EmptyCartContainer>
    </CartPageContainer>
  );
}
