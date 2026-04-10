"use server";

import getProductsService from "../services/getProducts.service";

export default async function getProductsAction(params?: {
  name?: string;
  page?: number;
  limit?: number;
}) {
  return getProductsService(params?.name, params?.page, params?.limit);
}
