"use client";

import { useState } from "react";
import { ProductHeader } from "./ProductHeader";
import { ProductStats } from "./ProductStats";
import { ProductTable } from "./ProductTable";
import { MOCK_PRODUCTS, MOCK_STATS } from "../types/Product.type";

export default function ProductCatalogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3;

  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-8">
      <nav className="mb-5 flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-zinc-400">
        <span>Inventory</span>
        <span className="text-zinc-300">`</span>
        <span className="text-emerald-600">Products</span>
      </nav>

      <ProductHeader />
      <ProductStats stats={MOCK_STATS} />
      <ProductTable
        products={MOCK_PRODUCTS}
        currentPage={currentPage}
        totalPages={totalPages}
        totalProducts={284}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}