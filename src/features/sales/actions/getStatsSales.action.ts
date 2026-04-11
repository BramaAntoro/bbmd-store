"use server";

import getStatsSalesService from "../services/getStatsSales.service";

export default async function getStatsSalesAction(params?: { range?: string }) {
  return getStatsSalesService(params?.range);
}
