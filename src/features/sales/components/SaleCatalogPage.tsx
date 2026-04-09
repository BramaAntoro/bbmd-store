import { SaleHeader } from "./SaleHeader";
import { SaleStats } from "./SaleStats";
import { SaleListItem, SaleTable } from "./SaleTable";


const MOCK_SALE_STATS = [
  { label: "Monthly Revenue", value: "Rp 42.850.000", change: 12.5 },
  { label: "Transactions", value: "1.284" },
  { label: "Average Order Value", value: "Rp 33.370", change: -2.4 },
];

const MOCK_SALES: SaleListItem[] = [
  { id: "f184294c-0a10-46b9-986d-9ea3c24f42d0", created_at: "2023-10-24T02:45:00Z", total: 124500, items_count: 4 },
  { id: "a294294c-1b20-57c0-997e-0fb6753e421b", created_at: "2023-10-24T01:12:00Z", total: 45000, items_count: 1 },
  { id: "b384294c-2c30-68d1-008f-1gc7864f532c", created_at: "2023-10-23T11:58:00Z", total: 892000, items_count: 12 },
  { id: "c474294c-3d40-79e2-119g-2hd8975g643d", created_at: "2023-10-23T09:15:00Z", total: 58000, items_count: 3 },
  { id: "d564294c-4e50-80f3-220h-3ie9086h754e", created_at: "2023-10-22T17:22:00Z", total: 210000, items_count: 2 },
];

export default function SaleCatalogPage() {
  return (
    <div className="min-h-screen bg-zinc-50 p-6 md:p-8">
      <nav className="mb-5 flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-zinc-400">
        <span className="text-zinc-300">/</span>
        <span className="text-emerald-600">Sales</span>
      </nav>
      <SaleHeader />
      <SaleStats stats={MOCK_SALE_STATS} />
      <SaleTable sales={MOCK_SALES} currentPage={1} totalPages={3} totalSales={1284} />
    </div>
  );
}