import { TypeDashboardStatsCard } from "./DashboardStatsCard.type";
import { TypeDashboardAnalysis } from "./DashboardAnalysis.type";
import { TypeTopProduct } from "./TopProduct.type";

export type TypeDashboardData = {
  stats: TypeDashboardStatsCard[];
  analysis: TypeDashboardAnalysis;
  topProducts: TypeTopProduct[];
};
