'use client';

import Select from '@/components/select/Select';
import { SORT_OPTIONS } from '@/constants';
import { transformCategoriesToSelectOptions } from '@/utils/transformCategoriesInterfaceToSelectOptions';
import { useEffect } from 'react';
import { ProductFilterProps, SortValueOptions } from './ProductFilters.types';
import { sortProducts } from '@/utils/sortProducts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { generateSlug } from '@/utils/generateSlugs';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';
import { FiltersContainer } from './ProductFIlters.styles';
import { findCategoryById } from '@/utils/findCategoryById';

export default function ProductFilters({
  categories,
  productsResponse,
  onProductsChange,
  selectedCategory = {
    id: 'all',
    name: 'all',
    description: '',
    productCount: 0,
  },
  currentSort = '',
  currentSearch = '',
}: ProductFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const sortBy = searchParams.get('sort') || currentSort;
  const search = searchParams.get('search') || currentSearch;
  const hasSelectedCategory = selectedCategory.id !== 'all';

  const currentCategoryId = selectedCategory.id;

  useEffect(() => {
    if (sortBy && productsResponse?.products) {
      const sortedProducts = sortProducts(
        productsResponse.products,
        sortBy as SortValueOptions
      );
      onProductsChange({
        ...productsResponse,
        products: sortedProducts,
      });
    } else if (productsResponse && onProductsChange) {
      onProductsChange(productsResponse);
    }
  }, [sortBy, productsResponse]);

  const categoriesSelectOption = Array.isArray(categories)
    ? transformCategoriesToSelectOptions(categories)
    : [];

  const updateURL = (params: Record<string, string | null>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        newSearchParams.set(key, value);
        return;
      }
      {
        newSearchParams.delete(key);
      }
    });

    if (params.sort || params.search) {
      newSearchParams.delete('page');
    }

    router.replace(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const onChangeCategory = (value: string) => {
    if (value === 'all') {
      router.push('/');
      return;
    }

    const selectedCategory = findCategoryById(categories, value);
    if (selectedCategory) {
      router.push(`/categoria/${generateSlug(selectedCategory.name)}`);
    }
  };

  const onChangeSort = (value: string) => {
    updateURL({ sort: value });
  };

  const breadcrumbsItens = [
    { name: 'Produto', href: '/' },
    { name: selectedCategory.name, href: undefined },
  ];

  return (
    <FiltersContainer>
      {hasSelectedCategory ? (
        <Breadcrumbs breadcrumbItens={breadcrumbsItens} />
      ) : (
        <Select
          value={currentCategoryId}
          onChange={onChangeCategory}
          placeholder="Selecione a categoria"
          options={categoriesSelectOption}
        />
      )}
      <Select
        value={sortBy}
        onChange={onChangeSort}
        placeholder="Organizar por"
        options={SORT_OPTIONS}
      />
    </FiltersContainer>
  );
}
