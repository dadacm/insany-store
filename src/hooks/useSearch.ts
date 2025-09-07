'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';

export function useSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = useCallback(
    (query: string) => {
      setIsSearching(true);

      const newSearchParams = new URLSearchParams(searchParams);

      if (query.trim()) {
        newSearchParams.set('search', query.trim());
      } else {
        newSearchParams.delete('search');
      }

      newSearchParams.delete('page');

      const queryString = newSearchParams.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl, { scroll: false });

      setIsSearching(false);
    },
    [router, searchParams, pathname]
  );

  const handleSearch = useCallback(() => {
    performSearch(searchValue);
  }, [searchValue, performSearch]);

  const clearSearch = useCallback(() => {
    setSearchValue('');
    performSearch('');
  }, [performSearch]);

  return {
    searchValue,
    setSearchValue,
    performSearch,
    handleSearch,
    clearSearch,
    isSearching,
    currentSearch: searchParams.get('search') || '',
  };
}
