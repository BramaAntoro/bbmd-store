"use client";

import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import getStockDisplay from "../utils/getStockDisplay.util";
import { usePageChange } from "@/hooks/usePageChange.hook";
import setPagination from "@/utils/setPagination.util";
import { TypeProductTableProps } from "../types/ProductTableProps.type";


export function ProductTable({
  products,
  currentPage,
  totalPages,
  totalProducts,
}: TypeProductTableProps) {
  const { handlePageChange } = usePageChange();

  const { from, to } = setPagination(currentPage, totalProducts);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/60">
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Nama produk
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Harga
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Stock
              </th>
              <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {products.map((product) => {
              const stock = getStockDisplay(product.stock);
              return (
                <tr
                  key={product.id}
                  className="group transition-colors hover:bg-zinc-50/70"
                >
                  {/* Product name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3.5">
                      {/* Placeholder avatar karena Supabase tidak ada imageUrl */}
                      <div>
                        <p className="font-medium text-zinc-800 leading-snug">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4 font-medium text-zinc-700">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(product.price)}
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-block h-2 w-2 rounded-full shrink-0",
                          stock.dot,
                        )}
                      />
                      <span className={cn("text-sm font-medium", stock.color)}>
                        {stock.label}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3.5 bg-zinc-50/40">
        <p className="text-xs text-zinc-400">
          Showing {from} to {to} of {totalProducts} products
        </p>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft size={14} />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant="ghost"
              size="icon"
              onClick={() => handlePageChange(page)}
              className={cn(
                "h-7 w-7 text-xs font-medium",
                currentPage === page
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100",
              )}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
