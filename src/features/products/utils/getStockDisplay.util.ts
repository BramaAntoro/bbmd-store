const LOW_STOCK_THRESHOLD = 10;

export default function getStockDisplay(stock: number) {
  if (stock === 0) {
    return { label: "Out of stock", color: "text-red-500", dot: "bg-red-500" };
  }
  if (stock <= LOW_STOCK_THRESHOLD) {
    return {
      label: `Low stock: ${stock}`,
      color: "text-amber-500",
      dot: "bg-amber-500",
    };
  }
  return {
    label: `${stock} in stock`,
    color: "text-emerald-600",
    dot: "bg-emerald-500",
  };
}
