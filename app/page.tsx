import ProductsSection from '@/components/productsSection/ProductsSection';
import { getCategories } from '@/services/category';
import { getProducts } from '@/services/products';

interface HomePageProps {
  searchParams: Promise<{
    sort?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const { sort, search, page = '1' } = await searchParams;

  const categoriesResponse = await getCategories();
  const { categories } = categoriesResponse;

  const pageNumber = Math.max(1, parseInt(page, 10) || 1);

  try {
    const productResponse = await getProducts('all', {
      page: pageNumber,
      search,
    });

    return (
      <div>
        <main>
          <ProductsSection
            categories={categories}
            productsResponse={productResponse}
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
