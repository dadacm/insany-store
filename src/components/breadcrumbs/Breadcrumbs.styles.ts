import styled from 'styled-components';

export const BreadcrumbNav = styled.nav`
  color: #737380;
`;

export const BreadcrumbList = styled.ol`
  display: flex;
`;

export const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
`;

export const BreadcrumbSeparator = styled.span`
  margin: 0 4px;
`;

export const BreadcrumbLink = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const BreadcrumbCurrent = styled.span`
  color: #000000;
`;
