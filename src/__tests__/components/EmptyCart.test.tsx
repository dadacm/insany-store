import { render, screen } from '@testing-library/react';
import EmptyCart from '@/components/emptyCard/EmptyCart';

jest.mock('next/image', () => {
  return function MockImage({ alt, src, width, height, style }: any) {
    return (
      <img
        alt={alt}
        src={src}
        width={width}
        height={height}
        style={style}
        data-testid="empty-cart-image"
      />
    );
  };
});

jest.mock('next/link', () => {
  return function MockLink({ href, children }: any) {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('@/components/button/Button', () => ({
  __esModule: true,
  default: ({
    variant,
    children,
  }: {
    variant: string;
    children: React.ReactNode;
  }) => (
    <button data-testid="continue-shopping-button" data-variant={variant}>
      {children}
    </button>
  ),
}));

describe('EmptyCart Component', () => {
  it('should render empty cart message', () => {
    render(<EmptyCart />);

    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
    expect(
      screen.getByText('Adicione alguns produtos para começar suas compras!')
    ).toBeInTheDocument();
  });

  it('should render empty cart image', () => {
    render(<EmptyCart />);

    const image = screen.getByTestId('empty-cart-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/bag-icon.svg');
    expect(image).toHaveAttribute('alt', 'Carrinho vazio');
    expect(image).toHaveAttribute('width', '120');
    expect(image).toHaveAttribute('height', '120');
  });

  it('should render continue shopping button', () => {
    render(<EmptyCart />);

    const button = screen.getByTestId('continue-shopping-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Continuar comprando');
    expect(button).toHaveAttribute('data-variant', 'primary');
  });

  it('should have link to home page', () => {
    render(<EmptyCart />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render all elements in correct structure', () => {
    render(<EmptyCart />);

    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
    expect(
      screen.getByText('Adicione alguns produtos para começar suas compras!')
    ).toBeInTheDocument();
    expect(screen.getByTestId('empty-cart-image')).toBeInTheDocument();
    expect(screen.getByTestId('continue-shopping-button')).toBeInTheDocument();
  });
});
