export interface QuantitySelectProps {
  value: number;
  maxQuantity?: number;
  onChange: (quantity: number) => void;
  disabled?: boolean;
  className?: string;
}
