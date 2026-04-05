import { TypeProductListItem } from "./ProductListItem.type";

export type TypeProductTableProps = {
  products: TypeProductListItem[];
  currentPage: number;
  totalPages: number;
  totalProducts: number;
};