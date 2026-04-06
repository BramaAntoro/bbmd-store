// import { useState } from "react";
import { ProductHeader } from "./ProductHeader";
import { ProductStats } from "./ProductStats";
import { ProductTable } from "./ProductTable";
import { MOCK_STATS } from "../types/Product.types";
import getProductsAction from "../actions/getProducts.action";
import { AppError } from "@/lib/errors/AppError";
import { TypeSearchParams } from "@/types/searchParams.type";
import setPageNumber from "@/utils/setPageNumber.util";
import getStatsProductsAction from "../actions/getStatsProducts.action";

export default async function ProductCatalogPage({
  searchParams,
}: TypeSearchParams) {
  const { name, page } = setPageNumber(searchParams?.page, searchParams?.name);

  const res = await getProductsAction({ name, page });
  const statsRes = await getStatsProductsAction();

  if (res instanceof AppError) {
    return <div className="p-8 text-red-500">Failed to load products.</div>;
  }

  if (statsRes instanceof AppError) {
    return <div className="p-8 text-red-500">Failed to load stats.</div>;
  }

  if (!("data" in res)) {
    return <div className="p-8 text-red-500">Tidak ada barang.</div>;
  }

  const products = res.data ?? [];
  const meta = res.meta ?? { page: 1, totalPages: 1, total: 0, limit: 10 };

  const dataStats = statsRes.data;

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-8">
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
