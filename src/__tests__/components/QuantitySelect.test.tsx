import { render, screen, fireEvent } from '@testing-library/react';
import QuantitySelect from '@/components/quantitySelect/QuantitySelect';

describe('QuantitySelect Component', () => {
  const defaultProps = {
    value: 1,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render quantity select with current value', () => {
    render(<QuantitySelect {...defaultProps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should render with different initial value', () => {
    render(<QuantitySelect {...defaultProps} value={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<QuantitySelect {...defaultProps} onChange={handleChange} />);

    const selectField = screen.getByText('1');
    fireEvent.click(selectField);

    const option3 = screen.getByText('3');
    fireEvent.click(option3);

    expect(handleChange).toHaveBeenCalledWith(3);
  });

  it('should render dropdown when clicked', () => {
    render(<QuantitySelect {...defaultProps} maxQuantity={10} />);

    const selectField = screen.getByText('1');
    fireEvent.click(selectField);

    const dropdown = screen.getByRole('list');
    expect(dropdown).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(10);
  });

  it('should render correct number of options', () => {
    render(<QuantitySelect {...defaultProps} maxQuantity={5} />);

    const selectField = screen.getByText('1');
    fireEvent.click(selectField);

    const dropdown = screen.getByRole('list');
    expect(dropdown).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });

  it('should handle value change to maximum', () => {
    const handleChange = jest.fn();
    render(
      <QuantitySelect
        {...defaultProps}
        onChange={handleChange}
        maxQuantity={10}
      />
    );

    const selectField = screen.getByText('1');
    fireEvent.click(selectField);

    const option10 = screen.getByText('10');
    fireEvent.click(option10);

    expect(handleChange).toHaveBeenCalledWith(10);
  });

  it('should handle value change to minimum', () => {
    const handleChange = jest.fn();
    render(
      <QuantitySelect {...defaultProps} onChange={handleChange} value={5} />
    );

    const selectField = screen.getByText('5');
    fireEvent.click(selectField);

    const option1 = screen.getByText('1');
    fireEvent.click(option1);

    expect(handleChange).toHaveBeenCalledWith(1);
  });

  it('should handle value change to middle value', () => {
    const handleChange = jest.fn();
    render(<QuantitySelect {...defaultProps} onChange={handleChange} />);

    const selectField = screen.getByText('1');
    fireEvent.click(selectField);

    const option5 = screen.getByText('5');
    fireEvent.click(option5);

    expect(handleChange).toHaveBeenCalledWith(5);
  });

  it('should be accessible with proper structure', () => {
    render(<QuantitySelect {...defaultProps} />);

    const selectField = screen.getByText('1');
    expect(selectField).toBeInTheDocument();
  });

  it('should handle multiple rapid changes', () => {
    const handleChange = jest.fn();
    const { rerender } = render(
      <QuantitySelect {...defaultProps} onChange={handleChange} />
    );

    const selectField1 = screen.getByText('1');
    fireEvent.click(selectField1);
    const option2 = screen.getByText('2');
    fireEvent.click(option2);

    rerender(
      <QuantitySelect {...defaultProps} value={2} onChange={handleChange} />
    );

    const selectField2 = screen.getByText('2');
    fireEvent.click(selectField2);
    const option3 = screen.getByText('3');
    fireEvent.click(option3);

    rerender(
      <QuantitySelect {...defaultProps} value={3} onChange={handleChange} />
    );

    const selectField3 = screen.getByText('3');
    fireEvent.click(selectField3);
    const option4 = screen.getByText('4');
    fireEvent.click(option4);

    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenNthCalledWith(1, 2);
    expect(handleChange).toHaveBeenNthCalledWith(2, 3);
    expect(handleChange).toHaveBeenNthCalledWith(3, 4);
  });

  it('should close dropdown when clicking outside', () => {
    render(<QuantitySelect {...defaultProps} />);

    const selectField = screen.getByText('1');
    fireEvent.click(selectField);

    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should not open dropdown when disabled', () => {
    render(<QuantitySelect {...defaultProps} disabled={true} />);

    const selectField = screen.getByText('1');
    fireEvent.click(selectField);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should use custom maxQuantity', () => {
    render(<QuantitySelect {...defaultProps} maxQuantity={5} />);

    const selectField = screen.getByText('1');
    fireEvent.click(selectField);

    const dropdown = screen.getByRole('list');
    expect(dropdown).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(5);

    expect(screen.queryByText('6')).not.toBeInTheDocument();
  });
});
