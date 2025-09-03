'use client'

import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function Header() {
  return <HeaderContainer>InsanyShop <div>
    <input type="text" placeholder="Search" />
    <button>Search</button>
    <button>xx</button>
    </div></HeaderContainer>;
}