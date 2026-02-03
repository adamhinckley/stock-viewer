"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCompanyDetails } from "../util/dataFetchingFunctions";

import type { SymbolData } from "../context/StockContext";
import type { CompanyData } from "../util/interfaces";

interface TileProps {
  stock: SymbolData;
}

const Tile = ({ stock }: TileProps) => {
  const router = useRouter();

  const { data: profileData, isLoading: profileLoading } =
    useQuery<CompanyData>({
      queryKey: ["company-profile", stock.symbol],
      queryFn: () => getCompanyDetails(stock.symbol, "include=logo"),
      enabled: !!stock.symbol,
      staleTime: Infinity,
      gcTime: Infinity,
    });

  const handleClick = () => {
    if (stock.symbol) {
      router.push(`/dashboard/details?symbol=${stock.symbol}`);
    }
  };

  const { logo, name } = profileData?.nameAndLogo || {};

  return (
    <div
      className="p-1 hover:opacity-80 transition-opacity duration-300 cursor-pointer flex flex-col items-center gap-3"
      onClick={handleClick}
    >
      {profileLoading ? (
        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      ) : logo ? (
        <Image
          src={logo}
          alt={`${name} logo`}
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
            name || stock.description
          )}
        </h2>
      </div>
    </div>
  );
};

export default Tile;
