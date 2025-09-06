import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
