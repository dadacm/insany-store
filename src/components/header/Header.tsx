'use client';

import { HeaderContainer } from './Header.styles';

export default function Header() {
  return (
    <HeaderContainer>
      InsanyShop{' '}
      <div>
        <div>
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
        <button>xx</button>
      </div>
    </HeaderContainer>
  );
}
