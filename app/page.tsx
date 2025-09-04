import ProductsSection from '@/components/productsSection/ProductsSection';
import { getCategories } from '@/services/category';
import { getProducts } from '@/services/products';

export default async function Home() {
  const categoriesResponse = await getCategories();
  const productResponse = await getProducts('all');
  const { categories } = categoriesResponse;
  const { products } = productResponse;
  console.log(products);

  return (
    <div>
      <main>
        <ProductsSection
          categories={categories}
          initialProducts={productResponse}
        />
      </main>
    </div>
  );
}
