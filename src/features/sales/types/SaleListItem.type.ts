import { Tables } from "@/lib/supabase/database.types";

export type TypeSaleListItem = Pick<
  Tables<"sales">,
  "id" | "created_at" | "total"
> & {
  items_count: number;
};
