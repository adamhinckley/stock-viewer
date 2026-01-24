export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "50", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(
    `${baseURL}/stock/symbol?exchange=US&token=${apiKey}`,
  );
  const allSymbols = await response.json();

  // Filter by search term (symbol or description)
  const filteredSymbols = search
    ? allSymbols.filter(
        (s: any) =>
          s.symbol.toLowerCase().includes(search) ||
          s.description.toLowerCase().includes(search),
      )
    : allSymbols;

  // Simple pagination
  const start = (page - 1) * pageSize;
  const pagedSymbols = filteredSymbols.slice(start, start + pageSize);

  return Response.json({
    symbols: pagedSymbols,
    total: filteredSymbols.length,
    page,
    pageSize,
  });
}
