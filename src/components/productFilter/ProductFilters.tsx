'use client';

import Select from '@/components/select/Select';
import { SORT_OPTIONS } from '@/constants';
import { getProducts } from '@/services/products';
import { transformCategoriesToSelectOptions } from '@/utils/transformCategoriesInterfaceToSelectOptions';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ProductFilterProps } from './ProductFilters.types';
import { sortProducts } from '@/utils/sortProducts';

export default function ProductFilters({
  categories,
  initialProducts,
  onProductsChange,
}: ProductFilterProps) {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState<string>('');
  const [hasChangedCategory, setHasChangedCategory] = useState(false);

  const { data: productsResponse, isLoading } = useSWR(
    hasChangedCategory ? `/products?category=${category}` : null,
    () => getProducts(category),
    {
      fallbackData: initialProducts,
    }
  );

  useEffect(() => {
    if (productsResponse?.products && onProductsChange) {
      if (sortBy) {
        const sortedProducts = sortProducts(
          productsResponse.products,
          sortBy as any
        );
        onProductsChange({
          ...productsResponse,
          products: sortedProducts,
        });
        return;
      }
      {
        onProductsChange(productsResponse);
      }
    }
  }, [productsResponse, sortBy]);

  const categoriesSelectOption = Array.isArray(categories)
    ? transformCategoriesToSelectOptions(categories)
    : [];

  const onChangeCategory = (value: string) => {
    setCategory(value);
    setHasChangedCategory(true);
  };

  const onChangeSort = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="flex justify-between">
      <Select
        value={category}
        onChange={onChangeCategory}
        placeholder="Selecione a categoria"
        options={categoriesSelectOption}
      />
      <Select
        value={sortBy}
        onChange={onChangeSort}
        placeholder="Organizar por"
        options={SORT_OPTIONS}
      />
    </div>
  );
}
