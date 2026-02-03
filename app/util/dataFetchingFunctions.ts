import { backendURL } from "./constants";

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
};

export async function getCompanyDetails(
  symbol: string | null,
  params?: string,
) {
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
