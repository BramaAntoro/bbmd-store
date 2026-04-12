"use server";

import getDashboardService from "../services/getDashboard.service";

export default async function getDashboardAction(params?: { range?: string }) {
  return getDashboardService(params?.range);
}
