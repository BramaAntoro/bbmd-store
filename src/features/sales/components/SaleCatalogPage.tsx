import { SaleHeader } from "./SaleHeader";
import { SaleStats } from "./SaleStats";
import { SaleTable } from "./SaleTable";
import getSalesAction from "../actions/getSales.action";
import getStatsSalesAction from "../actions/getStatsSales.action";
import { TypeSearchParams } from "@/types/searchParams.type";
import setPageNumber from "@/utils/setPageNumber.util";


export default async function SaleCatalogPage({
  searchParams,
}: TypeSearchParams) {
  const { page } = setPageNumber(searchParams?.page, searchParams?.name);
  const res = await getSalesAction({ page, range: searchParams?.range });
  const statsRes = await getStatsSalesAction({ range: searchParams?.range });

  const sales = res.data ?? [];
  const meta = res.meta ?? { page: 1, totalPages: 1, total: 0, limit: 10 };
  const dataStats = statsRes.data ?? [];

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 md:p-8">
      <nav className="mb-5 flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-zinc-400">
        <span className="text-zinc-300">/</span>
        <span className="text-emerald-600">Sales</span>
      </nav>
      <SaleHeader />
      <SaleStats stats={dataStats} />
      <SaleTable
        sales={sales}
        currentPage={meta.page}
        totalPages={meta.totalPages}
        totalSales={meta.total}
      />
    </div>
  );
}
