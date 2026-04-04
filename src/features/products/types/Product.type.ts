import type { Tables } from "@/lib/supabase/database.types";

export type Product = Tables<"products">;

export type ProductStat = {
  label: string;
  value: string;
  suffix?: string;
  change?: number;
};

export const MOCK_STATS: ProductStat[] = [
  { label: "Total Inventory", value: "1,284", change: 12 },
  { label: "Out of Stock", value: "14", change: -2 },
  { label: "Valuation", value: "$42,900", suffix: "USD" },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Chronometer",
    sku: "PRD-90210",
    barcode: "8901234567890",
    price: 249.0,
    cost: 120.0,
    stock: 42,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Symphony Headset",
    sku: "PRD-11822",
    barcode: "8901234567891",
    price: 399.0,
    cost: 200.0,
    stock: 4,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Aero Runner v2",
    sku: "PRD-44591",
    barcode: "8901234567892",
    price: 120.0,
    cost: 60.0,
    stock: 156,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Artisan Ceramic Mug",
    sku: "PRD-77213",
    barcode: "8901234567893",
    price: 24.0,
    cost: 10.0,
    stock: 89,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Leather Wallet Pro",
    sku: "PRD-33841",
    barcode: "8901234567894",
    price: 79.0,
    cost: 35.0,
    stock: 0,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Bamboo Desk Organizer",
    sku: "PRD-58290",
    barcode: "8901234567895",
    price: 45.0,
    cost: 20.0,
    stock: 23,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Smart Notebook",
    sku: "PRD-61047",
    barcode: "8901234567896",
    price: 34.5,
    cost: 15.0,
    stock: 7,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Titanium Pen Set",
    sku: "PRD-20193",
    barcode: "8901234567897",
    price: 58.0,
    cost: 25.0,
    stock: 312,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Minimalist Wall Clock",
    sku: "PRD-84720",
    barcode: "8901234567898",
    price: 130.0,
    cost: 60.0,
    stock: 18,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Wireless Charger Pad",
    sku: "PRD-99001",
    barcode: "8901234567899",
    price: 49.99,
    cost: 22.0,
    stock: 5,
    user_id: "mock-user-id",
    created_at: new Date().toISOString(),
  },
];