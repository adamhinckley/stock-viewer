"use client";
import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProfile, getCompanyNews } from "../util/dataFetchingFunctions";

import type { CompanyProfile } from "../util/interfaces";
import Suspend from "./Suspend";
import NewsFeed from "./NewsFeed";

const today = new Date();
const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);

const fromDate = twoDaysAgo.toISOString().split("T")[0];
const toDate = today.toISOString().split("T")[0];

console.log("fromDate", fromDate);
console.log("toDate", toDate);

const CompanyPage = () => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") || "";

  const {
    data: profileData,
    error: profileError,
    isLoading: profileLoading,
  } = useQuery<CompanyProfile>({
    queryKey: ["company-profile", symbol],
    queryFn: () => getProfile(symbol),
    enabled: !!symbol,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const {
    data: newsData,
    error: newsError,
    isLoading: newsLoading,
  } = useQuery<CompanyProfile>({
    queryKey: ["company-news", symbol],
    queryFn: () => getCompanyNews(symbol, fromDate, toDate),
    enabled: !!symbol,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  console.log("profileData", profileData);

  return (
    <section className="">
      <Link
        href="/dashboard"
        className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group w-fit"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </Link>
      <NewsFeed />
    </section>
  );
};

export default Suspend(CompanyPage);
