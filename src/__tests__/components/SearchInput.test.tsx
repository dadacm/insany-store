import { render, screen, fireEvent } from '@testing-library/react';
import SearchInputComponent from '@/components/searchInput/SearchInput';

describe('SearchInput Component', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    onKeyDown: jest.fn(),
    onSearch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input', () => {
    render(<SearchInputComponent {...defaultProps} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display placeholder text', () => {
    render(
      <SearchInputComponent
        {...defaultProps}
        placeholder="Search products..."
      />
    );

    expect(
      screen.getByPlaceholderText('Search products...')
    ).toBeInTheDocument();
  });

  it('should display default placeholder when none provided', () => {
    render(<SearchInputComponent {...defaultProps} />);

    expect(
      screen.getByPlaceholderText('Buscar produtos...')
    ).toBeInTheDocument();
  });

  it('should display current value', () => {
    render(<SearchInputComponent {...defaultProps} value="test query" />);

    expect(screen.getByDisplayValue('test query')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<SearchInputComponent {...defaultProps} onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new query' } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.any(Object),
      })
    );
  });

  it('should call onKeyDown when key is pressed', () => {
    const handleKeyDown = jest.fn();
    render(
      <SearchInputComponent {...defaultProps} onKeyDown={handleKeyDown} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'Enter',
      })
    );
  });

  it('should call onSearch when search button is clicked', () => {
    const handleSearch = jest.fn();
    render(<SearchInputComponent {...defaultProps} onSearch={handleSearch} />);

    const searchButton = screen.getByRole('button');
    fireEvent.click(searchButton);

    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('should show loading state when isLoading is true', () => {
    render(<SearchInputComponent {...defaultProps} isLoading={true} />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).toBeDisabled();
  });

  it('should not be disabled when isLoading is false', () => {
    render(<SearchInputComponent {...defaultProps} isLoading={false} />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).not.toBeDisabled();
  });

  it('should not be disabled by default', () => {
    render(<SearchInputComponent {...defaultProps} />);

    const searchButton = screen.getByRole('button');
    expect(searchButton).not.toBeDisabled();
  });

  it('should apply custom className', () => {
    render(<SearchInputComponent {...defaultProps} className="custom-class" />);

    const container = screen.getByRole('textbox').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('should handle Enter key press', () => {
    const handleKeyDown = jest.fn();
    render(
      <SearchInputComponent {...defaultProps} onKeyDown={handleKeyDown} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(handleKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'Enter',
        code: 'Enter',
      })
    );
  });

  it('should handle Escape key press', () => {
    const handleKeyDown = jest.fn();
    render(
      <SearchInputComponent {...defaultProps} onKeyDown={handleKeyDown} />
    );

    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

    expect(handleKeyDown).toHaveBeenCalledWith(
      expect.objectContaining({
        key: 'Escape',
        code: 'Escape',
      })
    );
  });
});
