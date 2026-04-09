"use client";

import { TrendingDown, TrendingUp } from "lucide-react";

type SaleStatCard = {
  label: string;
  value: string;
  change?: number;
};

type SaleStatsProps = {
  stats: SaleStatCard[];
};

export function SaleStats({ stats }: SaleStatsProps) {
  return (
    <div className="mb-6 rounded-xl border border-zinc-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 divide-y divide-zinc-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((stat, i) => (
          <div key={i} className="px-6 py-5">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1.5">
              {stat.label}
            </p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-zinc-900 tracking-tight">
                {stat.value}
              </span>
              {stat.change !== undefined && (
                <span
                  className={`mb-0.5 flex items-center gap-0.5 text-xs font-semibold ${stat.change >= 0 ? "text-emerald-500" : "text-red-500"}`}
                >
                  {stat.change >= 0 ? (
                    <TrendingUp size={12} />
                  ) : (
                    <TrendingDown size={12} />
                  )}
                  {stat.change > 0 ? "+" : ""}
                  {stat.change}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
