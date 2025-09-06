import ProductCard from '../productCard/ProductCard';
import { ProductsListContainer } from './ProductsList.styles';
import { ProductsListProps } from './ProductsList.types';

export default function ProductsList({
  products,
  categories,
  selectedCategoryName,
}: ProductsListProps) {
  return (
    <ProductsListContainer>
      {products.map((product: any) => (
        <ProductCard
          categories={categories}
          selectedCategoryName={selectedCategoryName}
          key={product.id}
          product={product}
        />
      ))}
    </ProductsListContainer>
  );
}
