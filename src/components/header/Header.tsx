'use client';

import Image from 'next/image';
import Link from 'next/link';
import SearchInputComponent from '../searchInput/SearchInput';
import { useSearch } from '@/hooks/useSearch';
import { useCart } from '@/hooks/useCart';
import {
  BagIconContainer,
  CartBadge,
  HeaderContainer,
  HeaderContent,
  HeaderTitle,
} from './Header.styles';

export default function Header() {
  const { searchValue, setSearchValue, handleSearch, isSearching } =
    useSearch();
  const { items, isLoading } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  console.log(totalItems);

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/">
          <HeaderTitle>InsanyShop</HeaderTitle>
        </Link>
        <div className="flex items-center gap-4">
          <SearchInputComponent
            className="search-input"
            placeholder="Procurando por algo específico?"
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onSearch={handleSearch}
            isLoading={isSearching}
          />
          <Link href="/carrinho">
            <BagIconContainer>
              <Image
                alt="seu carrinho"
                width={24}
                height={24}
                src={'/bag-icon.svg'}
              />
              {!isLoading && totalItems > 0 && (
                <CartBadge>{totalItems}</CartBadge>
              )}
            </BagIconContainer>
          </Link>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
}
