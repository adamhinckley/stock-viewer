import {
  finnhubApiKey,
  finnhubBaseURL,
  deployedBackendURL,
  localBackendURL,
} from "./constants";

const isLocal = process.env.NEXT_PUBLIC_VERCEL_ENV === "dev";
const backendURL = isLocal ? localBackendURL : deployedBackendURL;

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

export async function getProfile(symbol: string) {
  const res = await fetch(
    `${finnhubBaseURL}/stock/profile2?symbol=${symbol}&token=${finnhubApiKey}`,
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function getCompanyDetails(symbol: string, params?: string) {
  const token = getCookie("access_token");
  const res = await fetch(
    `${backendURL}/api-data/stock/${symbol}?${params || ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
