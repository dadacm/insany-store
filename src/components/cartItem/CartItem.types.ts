import { ProductInterface } from '@/services/types/Product';

export interface CartItem extends ProductInterface {
  quantity: number;
}
export interface CartItemProps {
  item: CartItem;
}
