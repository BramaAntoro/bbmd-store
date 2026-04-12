export type TypeDashboardAnalysis = {
  totalSales: string;
  totalCost: string;
  totalItems: string;
  series: {
    labels: string[];
    revenue: number[];
    modalStock: number[];
  };
};
