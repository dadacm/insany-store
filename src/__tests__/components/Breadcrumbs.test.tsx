import { render, screen } from '@testing-library/react';
import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs';
import { BreadcrumbItem } from '@/components/breadcrumbs/Breadcrumbs.types';

const mockBreadcrumbItems: BreadcrumbItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Categoria', href: '/categoria' },
  { name: 'Produto Atual', href: '/produto' },
];

describe('Breadcrumbs Component', () => {
  it('should render breadcrumb navigation', () => {
    render(<Breadcrumbs breadcrumbItens={mockBreadcrumbItems} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument();
  });

  it('should render all breadcrumb items', () => {
    render(<Breadcrumbs breadcrumbItens={mockBreadcrumbItems} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Categoria')).toBeInTheDocument();
    expect(screen.getByText('Produto Atual')).toBeInTheDocument();
  });

  it('should render links for non-last items', () => {
    render(<Breadcrumbs breadcrumbItens={mockBreadcrumbItems} />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const categoriaLink = screen.getByRole('link', { name: 'Categoria' });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(categoriaLink).toHaveAttribute('href', '/categoria');
  });

  it('should render current page for last item', () => {
    render(<Breadcrumbs breadcrumbItens={mockBreadcrumbItems} />);

    const currentPage = screen.getByText('Produto Atual');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });

  it('should render separators between items', () => {
    render(<Breadcrumbs breadcrumbItens={mockBreadcrumbItems} />);

    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  it('should not render separator after last item', () => {
    render(<Breadcrumbs breadcrumbItens={mockBreadcrumbItems} />);

    const separators = screen.getAllByText('/');
    expect(separators).toHaveLength(2);
  });

  it('should handle single breadcrumb item', () => {
    const singleItem = [{ name: 'Home', href: '/' }];
    render(<Breadcrumbs breadcrumbItens={singleItem} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Home')).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  it('should handle empty breadcrumb items', () => {
    render(<Breadcrumbs breadcrumbItens={[]} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.queryByText('/')).not.toBeInTheDocument();
  });

  it('should handle two breadcrumb items', () => {
    const twoItems = [
      { name: 'Home', href: '/' },
      { name: 'Current', href: '/current' },
    ];
    render(<Breadcrumbs breadcrumbItens={twoItems} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
    expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
    expect(screen.getAllByText('/')).toHaveLength(1);
  });

  it('should have proper accessibility attributes', () => {
    render(<Breadcrumbs breadcrumbItens={mockBreadcrumbItems} />);

    const navigation = screen.getByRole('navigation');
    expect(navigation).toHaveAttribute('aria-label', 'Breadcrumb');

    const currentPage = screen.getByText('Produto Atual');
    expect(currentPage).toHaveAttribute('aria-current', 'page');
  });
});
