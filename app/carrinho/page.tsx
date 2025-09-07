'use client';

import { useCart } from '@/contexts/CartContext';
import CartProductsSection from '@/components/cartProductsSection/CartProductsSection';
import CartResumeSection from '@/components/cartResumeSection/CartResumeSection';
import EmptyCart from '@/components/emptyCard/EmptyCart';

export default function CarrinhoPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="flex-1 min-h-screen">
      <div className="flex flex-col gap-8 justify-between h-full md:flex-row">
        <CartProductsSection />
        <CartResumeSection />
      </div>
    </main>
  );
}
