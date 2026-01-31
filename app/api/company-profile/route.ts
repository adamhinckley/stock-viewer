export async function GET(request: Request) {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return new Response(JSON.stringify({ error: "Missing symbol parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const [profileRes, financialsReportedRes, newsRes] = await Promise.all([
      fetch(`${baseURL}/stock/profile2?symbol=${symbol}&token=${apiKey}`),
      fetch(
        `${baseURL}/stock/financials-reported?symbol=${symbol}&token=${apiKey}`,
      ),
      fetch(
        `${baseURL}/company-news?&from=2026-01-30&to=2026-01-30&symbol=${symbol}&token=${apiKey}`,
      ),
    ]);

    // Fixed: Check .ok property for both responses
    if (!profileRes.ok || !financialsReportedRes.ok || !newsRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const [profile, financialsReported, news] = await Promise.all([
      profileRes.json(),
      financialsReportedRes.json(),
      newsRes.json(),
    ]);

    // Fixed: Remove duplicate .json() call - profile is already parsed
    // If you need both datasets, combine them:
    return new Response(JSON.stringify({ profile, financialsReported, news }), {
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
