import ProductsSection from '@/components/productsSection/ProductsSection';
import { getCategories } from '@/services/category';
import { getProducts } from '@/services/products';
import { generateSlug } from '@/utils/generateSlugs';

import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    sort?: string;
    search?: string;
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = params;
  const { sort, search } = searchParams;

  const categoriesResponse = await getCategories();

  const category = categoriesResponse.categories.find(
    category => generateSlug(category.name) === slug
  );

  if (!category) {
    notFound();
  }

  const productResponse = await getProducts(category.id);

  return (
    <div>
      <main>
        <ProductsSection
          categories={categoriesResponse.categories}
          productsResponse={productResponse}
          selectedCategory={category}
          initialSort={sort}
          initialSearch={search}
        />
      </main>
    </div>
  );
}
