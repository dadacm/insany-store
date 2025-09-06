'use client';
import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { PaginationProps } from './Pagination.types';
import {
  PaginationContainer,
  PaginationButton,
  NavigationButton,
} from './Pagination.styles';

export const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  className,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = pagination;

  const generatePageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage && currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (hasNextPage && currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationContainer className={className}>
      <NavigationButton
        onClick={handlePreviousPage}
        disabled={!hasPreviousPage}
        $isDisabled={!hasPreviousPage}
        aria-label="Página anterior"
      >
        &lt;
      </NavigationButton>

      {generatePageNumbers().map(page => (
        <PaginationButton
          key={page}
          onClick={() => handlePageChange(page)}
          $isActive={page === currentPage}
          aria-label={`Ir para página ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </PaginationButton>
      ))}

      <NavigationButton
        onClick={handleNextPage}
        disabled={!hasNextPage}
        $isDisabled={!hasNextPage}
        aria-label="Próxima página"
      >
        &gt;
      </NavigationButton>
    </PaginationContainer>
  );
};
