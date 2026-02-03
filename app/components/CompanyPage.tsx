"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCompanyDetails } from "../util/dataFetchingFunctions";

import Suspend from "./Suspend";
import NewsFeed from "./NewsFeed";
import CompanyProfile from "./CompanyProfile";

import type {
  CompanyData,
  GlobalQuoteResponse,
  NewsItem,
} from "../util/interfaces";
import CompanyFinancials from "./CompanyFinancials";

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
    data: data,
    error: error,
    isLoading: loading,
  } = useQuery<CompanyData>({
    queryKey: ["company-news", symbol],
    queryFn: () => getCompanyDetails(symbol),
    enabled: !!symbol,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  console.log("data", data);

  return (
    <section className="px-4">
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
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full ">
          <CompanyProfile
            profile={data?.profile as CompanyProfile}
            loading={loading}
            error={error}
          />
          <CompanyFinancials
            financials={data?.financials as GlobalQuoteResponse}
            loading={loading}
            error={error}
          />
        </div>
        <NewsFeed
          news={data?.news as NewsItem[]}
          loading={loading}
          error={error}
        />
      </div>
    </section>
  );
};

export default Suspend(CompanyPage);
