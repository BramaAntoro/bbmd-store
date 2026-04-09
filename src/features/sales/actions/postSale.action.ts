import postSaleService from "../services/postSale.service";
import { TypeSaleInput } from "../types/SaleInput.type";

export default async function postProductAction(data: TypeSaleInput) {
  return await postSaleService(data);
}
