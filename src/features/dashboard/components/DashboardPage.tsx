import DashboardStats from "./DashboardStats";
import DashboardAnalysis from "./DashboardAnalysis";
import getDashboardAction from "../actions/getDashboard.action";
import { TypeSearchParams } from "@/types/searchParams.type";

export default async function DashboardPage({
  searchParams,
}: TypeSearchParams) {
  const range = searchParams?.range ?? "30d";
  const res = await getDashboardAction({ range });
  const data = res.data ?? {
    stats: [],
    analysis: {
      totalSales: "0",
      totalCost: "0",
      totalItems: "0",
      series: { labels: [], revenue: [], modalStock: [] },
    },
    topProducts: [],
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 md:p-8">
      <nav className="mb-5 flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-zinc-400">
        <span className="text-zinc-300">/</span>
        <span className="text-emerald-600">Dashboard</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Ringkasan Bisnis
        </h1>
        <p className="mt-1.5 max-w-md text-sm text-zinc-500 leading-relaxed">
          Pantau performa penjualan dan produk terlaris dengan cepat.
        </p>
      </div>

      <DashboardStats stats={data.stats} />

      <div className="mt-6">
        <DashboardAnalysis
          analysis={data.analysis}
          topProducts={data.topProducts}
        />
      </div>
    </div>
  );
}
