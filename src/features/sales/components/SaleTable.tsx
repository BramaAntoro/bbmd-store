"use client";

import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Tables } from "@/lib/supabase/database.types";

export type SaleListItem = Pick<
  Tables<"sales">,
  "id" | "created_at" | "total"
> & {
  items_count: number;
};

type SaleTableProps = {
  sales: SaleListItem[];
  currentPage: number;
  totalPages: number;
  totalSales: number;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatId(id: string) {
  return id.slice(0, 8).toUpperCase();
}

export function SaleTable({
  sales,
  currentPage,
  totalPages,
  totalSales,
}: SaleTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const perPage = 10;
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalSales);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden">
      {/* Filter */}
      <div className="px-5 py-3.5 border-b border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 h-8 px-3 text-xs border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
          >
            Last 30 Days ▾
          </Button>
        </div>
        <Button
          variant="ghost"
          className="text-xs text-emerald-600 hover:text-emerald-700 h-8 px-3"
        >
          Clear all filters
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 bg-zinc-50/60">
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Date & Time
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Transaction ID
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Items
              </th>
              <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Total
              </th>
              <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {sales.map((sale) => (
              <tr
                key={sale.id}
                className="group transition-colors hover:bg-zinc-50/70"
              >
                {/* Date & Time */}
                <td className="px-5 py-4">
                  <p className="font-medium text-zinc-800">
                    {formatDate(sale.created_at)}
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {formatTime(sale.created_at)}
                  </p>
                </td>

                {/* Transaction ID */}
                <td className="px-5 py-4 font-mono text-sm font-medium text-zinc-700">
                  #{formatId(sale.id)}
                </td>

                {/* Items */}
                <td className="px-5 py-4 text-zinc-600">
                  {sale.items_count} {sale.items_count === 1 ? "item" : "items"}
                </td>

                {/* Total */}
                <td className="px-5 py-4 font-medium text-zinc-700">
                  {formatCurrency(sale.total)}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 group-hover:opacity-100 transition-all"
                    >
                      <Eye size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3.5 bg-zinc-50/40">
        <p className="text-xs text-zinc-400">
          Showing {from} to {to} of {totalSales} results
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
