import { TypePaginationMeta } from "@/types/paginationMeta.type";
import { TypeResponseSuccess } from "@/types/responseSuccess.type";

export default function responseSuccess<T>(
  data: T,
  message: string = "Success",
  statusCode: number = 200,
  meta?: TypePaginationMeta,
): TypeResponseSuccess<T> {
  return {
    success: true,
    data: data,
    message: message,
    statusCode: statusCode,
    meta: meta ?? null
  };
}
