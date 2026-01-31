"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CompanyProfile, {
  type CompanyProfileInterface,
} from "@/app/components/CompanyProfile";

async function getProfile(symbol: string) {
  const res = await fetch(`/api/company-profile?symbol=${symbol}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

const detailsPage = () => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") || "";
  const name = searchParams.get("name");

  const { data, error, isLoading } = useQuery({
    queryKey: ["company-profile", symbol],
    queryFn: () => getProfile(symbol),
    enabled: !!symbol,
  });

  console.log("data", data);
  const { profile, finacialsReported } = data || {};

  return (
    <div>
      <CompanyProfile profile={profile} />
    </div>
  );
};

export default detailsPage;
