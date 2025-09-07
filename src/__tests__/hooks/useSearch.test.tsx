import { renderHook, act } from '@testing-library/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const mockPush = jest.fn();
const mockRouter = { push: mockPush };
const mockSearchParams = new URLSearchParams();
const mockPathname = '/products';

describe('useSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Limpar corretamente o URLSearchParams
    for (const key of mockSearchParams.keys()) {
      mockSearchParams.delete(key);
    }
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  it('should initialize with empty search value when no search param', () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchValue).toBe('');
    expect(result.current.isSearching).toBe(false);
    expect(result.current.currentSearch).toBe('');
  });

  it('should initialize with search param value', () => {
    mockSearchParams.set('search', 'test query');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useSearch());

    expect(result.current.searchValue).toBe('test query');
    expect(result.current.currentSearch).toBe('test query');
  });

  it('should update search value', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchValue('new query');
    });

    expect(result.current.searchValue).toBe('new query');
  });

  it('should perform search with query', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.performSearch('test query');
    });

    expect(mockPush).toHaveBeenCalledWith('/products?search=test+query', {
      scroll: false,
    });
  });

  it('should perform search with trimmed query', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.performSearch('  test query  ');
    });

    expect(mockPush).toHaveBeenCalledWith('/products?search=test+query', {
      scroll: false,
    });
  });

  it('should clear search when empty query', () => {
    mockSearchParams.set('search', 'existing query');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.performSearch('');
    });

    expect(mockPush).toHaveBeenCalledWith('/products', { scroll: false });
  });

  it('should clear search when query is only whitespace', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.performSearch('   ');
    });

    expect(mockPush).toHaveBeenCalledWith('/products', { scroll: false });
  });

  it('should handle search with existing params', () => {
    mockSearchParams.set('category', 'electronics');
    mockSearchParams.set('page', '2');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.performSearch('test');
    });

    expect(mockPush).toHaveBeenCalledWith(
      '/products?category=electronics&search=test',
      { scroll: false }
    );
  });

  it('should remove page param when searching', () => {
    mockSearchParams.set('page', '2');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.performSearch('test');
    });

    expect(mockPush).toHaveBeenCalledWith('/products?search=test', {
      scroll: false,
    });
  });

  it('should handle search using handleSearch', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchValue('test query');
    });

    act(() => {
      result.current.handleSearch();
    });

    expect(mockPush).toHaveBeenCalledWith('/products?search=test+query', {
      scroll: false,
    });
  });

  it('should clear search using clearSearch', () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchValue('test query');
    });

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.searchValue).toBe('');
    expect(mockPush).toHaveBeenCalledWith('/products', { scroll: false });
  });
});
