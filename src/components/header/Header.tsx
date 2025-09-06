'use client';

import Image from 'next/image';
import SearchInputComponent from '../searchInput/SearchInput';
import {
  BagIconContainer,
  CartBadge,
  HeaderContainer,
  HeaderContent,
  HeaderTitle,
} from './Header.styles';

export default function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderTitle>InsanyShop</HeaderTitle>
        <div className="flex items-center gap-4">
          <SearchInputComponent
            className="search-input"
            placeholder="Procurando por algo específico?"
            value={''}
            onChange={() => {}}
            onKeyDown={() => {}}
            onSearch={() => {}}
          />
          <BagIconContainer>
            <Image
              alt="seu carrinho"
              width={24}
              height={24}
              src={'/bag-icon.svg'}
            />
            <CartBadge>2</CartBadge>
          </BagIconContainer>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
}
