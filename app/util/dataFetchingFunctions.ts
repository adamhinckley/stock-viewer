import { apiKey, baseURL } from "./constants";

export async function getProfile(symbol: string) {
  const res = await fetch(
    `${baseURL}/stock/profile2?symbol=${symbol}&token=${apiKey}`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function getCompanyNews(symbol: string, from: string, to: string) {
  const res = await fetch(
    `${baseURL}/company-news?&from=${from}&to=${to}&symbol=${symbol}&token=${apiKey}`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
