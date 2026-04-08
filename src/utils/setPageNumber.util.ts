export default function setPageNumber(pages: string | undefined, search: string | undefined) {
  const page = Number(pages ?? 1);
  const name = search || undefined;

  return { page, name };
}
