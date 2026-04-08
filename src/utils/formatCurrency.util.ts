export const formatNumber = (value: number | string): string => {
  if (value === undefined || value === null || value === "") return "";
  const number = typeof value === "string" ? parseInt(value.replace(/\./g, ""), 10) : value;
  if (isNaN(number)) return "";
  return new Intl.NumberFormat("id-ID").format(number);
};

export const parseNumber = (value: string): number => {
  if (!value) return 0;
  return parseInt(value.replace(/\./g, ""), 10) || 0;
};
