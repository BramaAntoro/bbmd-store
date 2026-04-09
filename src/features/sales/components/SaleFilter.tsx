"use client";

import { Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SaleFilter() {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Date Range */}
        <Button
          variant="outline"
          className="flex items-center gap-2 h-9 px-3 text-sm border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
        >
          <Calendar size={13} />
          Last 30 Days
          <span className="text-zinc-300">▾</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-8 px-3"
      >
        <X size={12} className="mr-1" />
        Clear all filters
      </Button>
    </div>
  );
}
