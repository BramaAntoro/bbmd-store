import { TypeDashboardAnalysis } from "../types/DashboardAnalysis.type";
import { TypeTopProduct } from "../types/TopProduct.type";
import DashboardAnalysisFilter from "./DashboardAnalysisFilter";
import { formatCurrency } from "@/utils/formatCurrency.util";

export default function DashboardAnalysis({
  analysis,
  topProducts,
}: {
  analysis: TypeDashboardAnalysis;
  topProducts: TypeTopProduct[];
}) {
  const { labels, revenue, modalStock } = analysis.series;

  const maxValue = Math.max(1, ...revenue, ...modalStock);
  const height = 180;
  const width = 640;
  const paddingLeft = 72;
  const paddingRight = 16;
  const paddingY = 16;

  const getPoint = (value: number, index: number) => {
    const x =
      paddingLeft +
      (index / Math.max(1, labels.length - 1)) *
        (width - paddingLeft - paddingRight);
    const y =
      paddingY + (1 - value / maxValue) * (height - paddingY * 2);
    return { x, y };
  };

  const buildPath = (values: number[]) =>
    values
      .map((value, index) => {
        const point = getPoint(value, index);
        return `${index === 0 ? "M" : "L"}${point.x} ${point.y}`;
      })
      .join(" ");

  const yTicks = [maxValue, maxValue / 2, 0];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm lg:col-span-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              Analisis Pendapatan
            </p>
            <h3 className="mt-1 text-lg font-semibold text-zinc-900">
              Ringkasan Periode
            </h3>
          </div>
          <DashboardAnalysisFilter />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Total Omzet
            </p>
            <p className="mt-2 text-xl font-bold text-zinc-900">
              {analysis.totalSales}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Total Modal Stok
            </p>
            <p className="mt-2 text-xl font-bold text-zinc-900">
              {analysis.totalCost}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
              Item Terjual
            </p>
            <p className="mt-2 text-xl font-bold text-zinc-900">
              {analysis.totalItems}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-4">
          <div className="mb-3 flex items-center gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Omzet
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              Modal Stok
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full overflow-x-auto">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="h-[220px] w-full min-w-[520px]"
                aria-label="Diagram garis omzet dan modal"
              >
                {yTicks.map((value) => {
                  const y =
                    paddingY +
                    (1 - value / maxValue) * (height - paddingY * 2);
                  return (
                    <g key={value}>
                      <line
                        x1={paddingLeft}
                        y1={y}
                        x2={width - paddingRight}
                        y2={y}
                        stroke="#d5dbe6"
                        strokeWidth="1.5"
                      />
                      <text
                        x={paddingLeft - 8}
                        y={y + 4}
                        textAnchor="end"
                        className="fill-zinc-400 text-[10px]"
                      >
                        {formatCurrency(Math.round(value))}
                      </text>
                    </g>
                  );
                })}
                {labels.map((_, index) => {
                  const x =
                    paddingLeft +
                    (index / Math.max(1, labels.length - 1)) *
                      (width - paddingLeft - paddingRight);
                  return (
                    <line
                      key={`grid-x-${index}`}
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={height - paddingY}
                      stroke="#d5dbe6"
                      strokeWidth="1.5"
                    />
                  );
                })}
                <line
                  x1={paddingLeft}
                  y1={paddingY}
                  x2={paddingLeft}
                  y2={height - paddingY}
                  stroke="#e4e4e7"
                  strokeWidth="1"
                />
                <line
                  x1={paddingLeft}
                  y1={height - paddingY}
                  x2={width - paddingRight}
                  y2={height - paddingY}
                  stroke="#e4e4e7"
                  strokeWidth="1"
                />
                <path
                  d={buildPath(modalStock)}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
                <path
                  d={buildPath(revenue)}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
              </svg>
            </div>
            {labels.length > 0 && (
              <div
                className="mt-2 grid gap-2 text-[10px] text-zinc-400"
                style={{
                  gridTemplateColumns: `repeat(${labels.length}, minmax(0, 1fr))`,
                }}
              >
                {labels.map((label) => (
                  <span key={label} className="text-center">
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Produk Terlaris
        </p>
        <h3 className="mt-1 text-lg font-semibold text-zinc-900">
          Paling Banyak Terjual
        </h3>

        <div className="mt-4 flex flex-col gap-3">
          {topProducts.length === 0 ? (
            <p className="text-sm text-zinc-500">Belum ada penjualan.</p>
          ) : (
            topProducts.map((item, index) => (
              <div
                key={item.product_id}
                className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-800">
                    {index + 1}. {item.name}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    {item.sold} terjual
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
