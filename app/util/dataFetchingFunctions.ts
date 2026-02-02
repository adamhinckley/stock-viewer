import {
  finnhubApiKey,
  finnhubBaseURL,
  alphavantageBaseURL,
  alphavantageApiKey,
} from "./constants";

export async function getProfile(symbol: string) {
  const res = await fetch(
    `${finnhubBaseURL}/stock/profile2?symbol=${symbol}&token=${finnhubApiKey}`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function getCompanyNews(symbol: string, from: string, to: string) {
  const res = await fetch(
    `${finnhubBaseURL}/company-news?&from=${from}&to=${to}&symbol=${symbol}&token=${finnhubApiKey}`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function getFinancials(symbol: string) {
  const res = await fetch(
    `${alphavantageBaseURL}function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${alphavantageApiKey}`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
