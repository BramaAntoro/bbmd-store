"use client";

import { useState } from "react";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import getStockDisplay from "../utils/getStockDisplay.util";
import { usePageChange } from "@/hooks/usePageChange.hook";
import setPagination from "@/utils/setPagination.util";
import { TypeProductTableProps } from "../types/ProductTableProps.type";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import deleteProductAction from "../actions/deleteProduct,action";

export function ProductTable({
  products,
  currentPage,
  totalPages,
  totalProducts,
}: TypeProductTableProps) {
  const { handlePageChange } = usePageChange();
  const { from, to } = setPagination(currentPage, totalProducts);

  const router = useRouter();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      setIsDeleting(true);
      await deleteProductAction(deleteId);

      setDeleteId(null);
      setDeleteName(null);

      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
                    <td className="px-5 py-4">
                      <p className="font-medium text-zinc-800">
                        {product.name}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-medium text-zinc-700">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(product.price)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-block h-2 w-2 rounded-full",
                            stock.dot,
                          )}
                        />
                        <span
                          className={cn("text-sm font-medium", stock.color)}
                        >
                          {stock.label}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Edit */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 group-hover:opacity-100"
                        >
                          <Pencil size={14} />
                        </Button>

                        {/* Delete */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setDeleteId(product.id);
                            setDeleteName(product.name);
                          }}
                          className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-50 group-hover:opacity-100"
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
                  currentPage === page
                    ? "bg-emerald-600 text-white"
                    : "text-zinc-500",
                )}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog Confirm Delete */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Product</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-zinc-600">
            Yakin ingin menghapus product{" "}
            <span className="font-semibold">{deleteName}</span>?
          </p>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Batal
            </Button>

            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
