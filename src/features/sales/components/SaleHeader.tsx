"use client";

import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateSaleDrawer } from "./CreateSaleDrawer";

export function SaleHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Sales History
          </h1>
          <p className="mt-1.5 max-w-md text-sm text-zinc-500 leading-relaxed">
            Lacak dan kelola riwayat transaksi toko kamu.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <Button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium h-9 px-4 shadow-sm w-full sm:w-auto"
          >
            <Plus size={14} />
            <span>Tambah Transaksi</span>
          </Button>
        </div>
      </div>

      <CreateSaleDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
