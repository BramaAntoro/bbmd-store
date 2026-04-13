  // import { useState } from "react";
  import { ProductHeader } from "./ProductHeader";
  import { ProductStats } from "./ProductStats";
  import { ProductTable } from "./ProductTable";
  import getProductsAction from "../actions/getProducts.action";
  import { TypeSearchParams } from "@/types/searchParams.type";
  import setPageNumber from "@/utils/setPageNumber.util";
  import getStatsProductsAction from "../actions/getStatsProducts.action";

  export default async function ProductCatalogPage({
    searchParams,
  }: TypeSearchParams) {
    const { name, page } = setPageNumber(searchParams?.page, searchParams?.name);

    const res = await getProductsAction({ name, page });
    const statsRes = await getStatsProductsAction();


    const products = res.data ?? [];
    const meta = res.meta ?? { page: 1, totalPages: 1, total: 0, limit: 10 };

    const dataStats = statsRes.data;

    return (
      <div className="min-h-screen bg-zinc-50 p-4 sm:p-6 md:p-8">
        <nav className="mb-5 flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-zinc-400">
          <span className="text-zinc-300">`</span>
          <span className="text-emerald-600">Products</span>
        </nav>

        <ProductHeader />
        <ProductStats stats={dataStats} />
        <ProductTable
          products={products}
          currentPage={meta.page}
          totalPages={meta.totalPages}
          totalProducts={meta.total}
        />
      </div>
    );
  }
