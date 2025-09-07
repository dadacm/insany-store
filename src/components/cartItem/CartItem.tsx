import Image from 'next/image';
import {
  CartItemCard,
  ProductImage,
  ProducCardContent,
  ProductTitleContainer,
  ProductName,
  RemoveButton,
  ProductDescriptionText,
  QuantityControls,
  CartItemPrice,
} from './CartItem.styles';
import QuantitySelect from '../quantitySelect/QuantitySelect';
import { formatCurrency } from '@/utils/formatCurrency';
import { CartItemProps } from './CartItem.types';
import { useCart } from '@/contexts/CartContext';

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity, isLoading } = useCart();

  return (
    <CartItemCard key={item.id}>
      <ProductImage>
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </ProductImage>
      <ProducCardContent>
        <ProductTitleContainer>
          <ProductName>{item.name}</ProductName>

          <RemoveButton
            onClick={() => removeItem(item.id)}
            disabled={isLoading}
          >
            <Image src="/trash-icon.svg" width={24} height={24} alt="Remover" />
          </RemoveButton>
        </ProductTitleContainer>
        <ProductDescriptionText>{item.description}</ProductDescriptionText>
        <QuantityControls>
          <QuantitySelect
            value={item.quantity}
            onChange={quantity => updateQuantity(item.id, quantity)}
            disabled={isLoading}
            maxQuantity={99}
          />
          <CartItemPrice>
            {formatCurrency(item.quantity * item.price)}
          </CartItemPrice>
        </QuantityControls>
      </ProducCardContent>
    </CartItemCard>
  );
}
