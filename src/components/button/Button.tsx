import { ButtonProps } from './Button.types';
import { StyledButton, IconContainer } from './Button.styles';

export default function Button({
  children,
  variant = 'primary',
  icon,
  onClick,
  disabled = false,
  type = 'button',
  className,
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $hasIcon={!!icon}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
    >
      {icon && <IconContainer>{icon}</IconContainer>}
      {children}
    </StyledButton>
  );
}
