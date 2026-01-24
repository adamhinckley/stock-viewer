const baseURL = process.env.NEXT_PUBLIC_API_URL;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "50", 10);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const response = await fetch(
    `${baseURL}/stock/symbol?exchange=US&token=${apiKey}`,
  );
  const allSymbols = await response.json();

  // Simple pagination
  const start = (page - 1) * pageSize;
  const pagedSymbols = allSymbols.slice(start, start + pageSize);

  return Response.json({
    symbols: pagedSymbols,
    total: allSymbols.length,
    page,
    pageSize,
  });
}

// export async function getSymbols() {
//   console.log("Base URL for symbols:", baseURL);
//   try {
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get("page") || "1", 10);
//     const pageSize = parseInt(searchParams.get("pageSize") || "50", 10);
//     const response = await fetch(
//       `${baseURL}/stock/symbol?exchange=US&token=${process.env.NEXT_PUBLIC_API_KEY}`,
//     );
//     const data = await response.json();
//     console.log("Fetched symbols data:", data);
//     const allSymbols = await response.json();

//     // Simple pagination
//     const start = (page - 1) * pageSize;
//     const pagedSymbols = allSymbols.slice(start, start + pageSize);

//     return Response.json({
//       symbols: pagedSymbols,
//       total: allSymbols.length,
//       page,
//       pageSize,
//     });
//   } catch (error) {
//     console.error("Error fetching symbols data:", error);
//   }
// }
