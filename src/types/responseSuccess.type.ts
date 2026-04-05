import { TypePaginationMeta } from "./paginationMeta.type";

export type TypeResponseSuccess<T> = {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
  meta: TypePaginationMeta | null;
};
