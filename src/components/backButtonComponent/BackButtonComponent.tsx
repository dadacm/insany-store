'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BackButton } from './BackButtonComponent.styles';

interface BackButtonComponentProps {
  fallbackUrl?: string;
  onClick?: () => void;
}

export function BackButtonComponent({
  fallbackUrl = '/',
  onClick,
}: BackButtonComponentProps = {}) {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackUrl);
    }
  };

  return (
    <BackButton onClick={handleBack} role="button" tabIndex={0}>
      <Image width={24} height={24} src="/back-icon.svg" alt="Voltar" />
      <span>Voltar</span>
    </BackButton>
  );
}
