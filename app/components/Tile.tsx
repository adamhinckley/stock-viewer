"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { SymbolData } from "../context/StockContext";

interface TileProps {
  stock: SymbolData;
}

interface CompanyProfile {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

interface CompanyProfileResponse {
  profile: CompanyProfile;
  financialsReported: unknown;
  news: unknown;
}

const Tile = ({ stock }: TileProps) => {
  const router = useRouter();

  const { data: profileData, isLoading: profileLoading } =
    useQuery<CompanyProfileResponse>({
      queryKey: ["company-profile", stock.symbol],
      queryFn: async () => {
        const res = await fetch(`/api/company-profile?symbol=${stock.symbol}`);
        if (!res.ok) throw new Error("Failed to fetch company profile");
        return res.json();
      },
      enabled: !!stock.symbol,
      staleTime: Infinity,
      gcTime: Infinity,
    });

  const handleClick = () => {
    if (profileData?.profile?.ticker) {
      router.push(`/dashboard/details?symbol=${profileData.profile.ticker}`);
    }
  };

  return (
    <div
      className="p-1 hover:opacity-80 transition-opacity duration-300 cursor-pointer flex flex-col items-center gap-3"
      onClick={handleClick}
    >
      {profileLoading ? (
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      ) : profileData?.profile?.logo ? (
        <Image
          src={profileData.profile.logo}
          alt={`${profileData.profile.name} logo`}
          width={64}
          height={64}
          className="rounded-full object-contain"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-xl">
          {stock.symbol.charAt(0)}
        </div>
      )}

      <div className="text-center">
        <h2 className="text-base font-medium">
          {profileLoading ? (
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto" />
          ) : (
            profileData?.profile?.name || stock.description
          )}
        </h2>
      </div>
    </div>
  );
};

export default Tile;
