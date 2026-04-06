"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { AddProductModal } from "./AddProductModal";

export function ProductHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("name") ?? "");
  const [addProductModal, setAddProductModal] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (val) {
        params.set("name", val);
        params.set("page", "1");
      } else {
        params.delete("name");
        params.set("page", "1");
      }
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Product
        </h1>
        <p className="mt-1.5 max-w-md text-sm text-zinc-500 leading-relaxed">
          Kelola inventaris atelier digital Anda dengan tepat dan mudah. Lihat,
          edit, dan kurasi penawaran Anda.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {/* ✅ Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={value}
            onChange={handleSearch}
            placeholder="Search products..."
            className="h-9 w-56 rounded-lg border border-zinc-200 bg-white pl-8 pr-4 text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
          )}
        </div>

        <Button
          onClick={() => setAddProductModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium h-9 px-4 shadow-sm"
        >
          <Plus size={14} />
          Tambah Produk
        </Button>
      </div>
      <AddProductModal open={addProductModal} onClose={() => setAddProductModal(false)} />
    </div>
  );
}
