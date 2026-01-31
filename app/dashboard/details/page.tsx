"use client";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CompanyProfile from "@/app/components/CompanyProfile";

async function getProfile(symbol: string) {
  const res = await fetch(`/api/company-profile?symbol=${symbol}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

const DetailsContent = () => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") || "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["company-profile", symbol],
    queryFn: () => getProfile(symbol),
    enabled: !!symbol,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  console.log("data", data);
  const { profile, finacialsReported } = data || {};

  return <CompanyProfile profile={profile} />;
};

const DetailsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
};

export default DetailsPage;
