import { SelectOption } from '@/components/select/Select';
import { CategoryInterface } from '@/services/types/category';

export function transformCategoriesToSelectOptions(
  categories: CategoryInterface[]
): SelectOption[] {
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));
  return [{ value: 'all', label: 'Todas as categorias' }, ...categoryOptions];
}
