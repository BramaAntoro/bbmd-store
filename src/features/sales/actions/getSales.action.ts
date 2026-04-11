"use server";

import getSalesService from "../services/getSales.service";

export default async function getSalesAction(params?: {
  page?: number;
  limit?: number;
  range?: string;
}) {
  return getSalesService(params?.page, params?.limit, params?.range);
}
