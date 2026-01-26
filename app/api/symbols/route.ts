let cachedSymbols: any[] | null = null;

export async function GET(request: Request) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "50", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";

  try {
    // Only fetch if not cached
    if (!cachedSymbols) {
      const response = await fetch(
        `${baseURL}/stock/symbol?exchange=US&token=${apiKey}`,
      );
      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: "Failed to fetch symbols from API" }),
          { status: response.status },
        );
      }
      cachedSymbols = await response.json();
      if (cachedSymbols) {
        console.log("Fetched and cached symbols:", cachedSymbols.length);
      }
    }

    // Filter by search term (symbol or description)
    const symbolsArray = cachedSymbols ?? [];
    const filteredSymbols = search
      ? symbolsArray.filter(
          (s: any) =>
            s.symbol.toLowerCase().includes(search) ||
            s.description.toLowerCase().includes(search),
        )
      : symbolsArray;

    // Simple pagination
    const start = (page - 1) * pageSize;
    const pagedSymbols = filteredSymbols.slice(start, start + pageSize);

    return Response.json({
      symbols: pagedSymbols,
      total: filteredSymbols.length,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Error in /api/symbols:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
