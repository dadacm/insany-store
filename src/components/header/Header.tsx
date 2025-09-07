'use client';

import Image from 'next/image';
import Link from 'next/link';
import SearchInputComponent from '../searchInput/SearchInput';
import { useSearch } from '@/hooks/useSearch';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSearching) {
      handleSearch();
    }
  };

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
