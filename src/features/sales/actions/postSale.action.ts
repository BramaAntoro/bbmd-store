"use server"

import postSaleService from "../services/postSale.service";
import { TypeSaleInput } from "../types/SaleInput.type";

export default async function postSaleAction(data: TypeSaleInput) {
  return await postSaleService(data);
}
