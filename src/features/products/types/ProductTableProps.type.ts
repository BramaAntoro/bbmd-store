import { TypeProduct } from "./Product.type";
// import { TypeProductListItem } from "./ProductListItem.type";

export type TypeProductTableProps = {
  products: TypeProduct[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
};