import { render, screen, fireEvent } from '@testing-library/react';
import { BackButtonComponent } from '@/components/backButtonComponent/BackButtonComponent';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('BackButtonComponent', () => {
  const mockBack = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      back: mockBack,
      push: mockPush,
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    Object.defineProperty(window, 'history', {
      value: {
        length: 2,
      },
      writable: true,
    });
  });

  it('should render back button with icon and text', () => {
    render(<BackButtonComponent />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByAltText('Voltar')).toBeInTheDocument();
  });

  it('should call router.back when history length > 1', () => {
    Object.defineProperty(window, 'history', {
      value: { length: 3 },
      writable: true,
    });

    render(<BackButtonComponent />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should call router.push with fallback URL when history length <= 1', () => {
    Object.defineProperty(window, 'history', {
      value: { length: 1 },
      writable: true,
    });

    render(<BackButtonComponent fallbackUrl="/home" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/home');
    expect(mockBack).not.toHaveBeenCalled();
  });

  it('should use default fallback URL when none provided', () => {
    Object.defineProperty(window, 'history', {
      value: { length: 1 },
      writable: true,
    });

    render(<BackButtonComponent />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('should call custom onClick when provided', () => {
    const customOnClick = jest.fn();
    render(<BackButtonComponent onClick={customOnClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(customOnClick).toHaveBeenCalledTimes(1);
    expect(mockBack).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should have proper accessibility attributes', () => {
    render(<BackButtonComponent />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '0');
  });

  it('should render back icon with correct attributes', () => {
    render(<BackButtonComponent />);

    const icon = screen.getByAltText('Voltar');
    expect(icon).toHaveAttribute('src', '/back-icon.svg');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });
});
