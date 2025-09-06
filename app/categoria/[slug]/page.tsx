import ProductsSection from '@/components/productsSection/ProductsSection';
import { getCategories } from '@/services/category';
import { getProducts } from '@/services/products';
import { generateSlug } from '@/utils/generateSlugs';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort, search, page = '1' } = await searchParams;

  const categoriesResponse = await getCategories();

  const category = categoriesResponse.categories.find(
    category => generateSlug(category.name) === slug
  );

  if (!category) {
    notFound();
  }

  const pageNumber = Math.max(1, parseInt(page, 10) || 1);

  try {
    const productResponse = await getProducts(category.id, {
      page: pageNumber,
      search,
    });

    return (
      <div>
        <main>
          <ProductsSection
            categories={categoriesResponse.categories}
            productsResponse={productResponse}
            selectedCategory={category}
            currentSort={sort}
            currentSearch={search}
            currentPage={pageNumber}
          />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return <div>Erro ao carregar produtos</div>;
  }
}
