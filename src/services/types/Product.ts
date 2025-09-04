export interface ProductInterface {
  id: number;
  name: string;
  description: string;
  brand: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  stock: number;
}
export interface PaginationInterface {
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  totalProducts: number;
}
export interface ProductsResponseInterface {
  products: ProductInterface[];
  pagination: PaginationInterface;
}
