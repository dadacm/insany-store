export const SORT_OPTIONS = [
  { value: 'novidades', label: 'Novidades' },
  { value: 'preco-maior-menor', label: 'Preço: Maior - menor' },
  { value: 'preco-menor-maior', label: 'Preço: Menor - maior' },
  { value: 'mais-vendidos', label: 'Mais vendidos' },
];

export const PRODUCTS_PER_PAGE = 8;

export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '746px',
  desktop: '1050px',
  largeDesktop: '1430px',
} as const;

export const media = {
  mobile: `@media (max-width: ${BREAKPOINTS.mobile})`,
  tablet: `@media (min-width: ${BREAKPOINTS.tablet})`,
  desktop: `@media (min-width: ${BREAKPOINTS.desktop})`,
  largeDesktop: `@media (min-width: ${BREAKPOINTS.largeDesktop})`,
} as const;

export const DELIVERY_PRICE = 40.0;
