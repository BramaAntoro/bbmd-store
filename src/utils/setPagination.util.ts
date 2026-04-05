export default function setPagination(currentPage: number, totalProducts: number) {
  const perPage = 10;
  const from = (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalProducts);

  return {perPage, from, to}
}
