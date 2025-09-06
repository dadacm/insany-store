import { PaginationInterface } from '../../services/types/Product';

export interface PaginationProps {
  pagination: PaginationInterface;
  onPageChange: (page: number) => void;
  className?: string;
}
