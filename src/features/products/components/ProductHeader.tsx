"use client";

import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProductHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Product Catalog
        </h1>
        <p className="mt-1.5 max-w-md text-sm text-zinc-500 leading-relaxed">
          Manage your digital ateliers inventory with precision and ease. View,
          edit, and curate your offering.
        </p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 text-sm font-medium h-9 px-4"
        >
          <Download size={14} />
          Export
        </Button>
        <Button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium h-9 px-4 shadow-sm">
          <Plus size={14} />
          Add Product
        </Button>
      </div>
    </div>
  );
}
