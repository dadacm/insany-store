import { ProductDetails } from '@/components/productDetails/ProductDetails';
import { getCategories } from '@/services/category';
import { getProductBySlug } from '@/services/products';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const categoriesResponse = await getCategories();
  const { categories } = categoriesResponse;

  try {
    const product = await getProductBySlug(slug);

    return (
      <main className="flex-1 min-h-screen">
        <ProductDetails categories={categories} product={product} />
      </main>
    );
  } catch (error) {
    notFound();
  }
}
