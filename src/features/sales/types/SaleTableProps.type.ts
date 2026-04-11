import { TypeSaleListItem } from "./SaleListItem.type";

export type TypeSaleTableProps = {
  sales: TypeSaleListItem[];
  currentPage: number;
  totalPages: number;
  totalSales: number;
};
