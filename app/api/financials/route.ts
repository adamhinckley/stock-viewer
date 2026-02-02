export async function GET(request: Request) {
  const finnhubBaseURL = process.env.NEXT_PUBLIC_FINNHUB_API_URL;
  const finnhubApiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");
  if (!symbol) {
    return new Response(JSON.stringify({ error: "Missing symbol parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const apiRes = await fetch(
      `${finnhubBaseURL}/stock/metric?symbol=${symbol}&metric=all&token=${finnhubApiKey}`,
    );
    if (!apiRes.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch financial metrics" }),
        {
          status: apiRes.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
    const data = await apiRes.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
