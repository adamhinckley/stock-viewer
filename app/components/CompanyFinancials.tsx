"use client";
import { getFinancials } from "../util/dataFetchingFunctions";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import type { GlobalQuoteResponse } from "../util/interfaces";

const CompanyFinancials = () => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") || "";
  const {
    data: financialsData,
    error: financialsError,
    isLoading: financialsLoading,
  } = useQuery<GlobalQuoteResponse>({
    queryKey: ["company-quote", symbol],
    queryFn: () => getFinancials(symbol),
    enabled: !!symbol,
  });
  const quote = financialsData?.["Global Quote"];
  const hasError = Boolean(
    !financialsLoading &&
    !quote &&
    (financialsError || (financialsData && financialsData["Error Message"])),
  );

  const formatNumber = (value: string | undefined) => {
    if (!value) {
      return "--";
    }
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      return value;
    }
    return parsed.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatVolume = (value: string | undefined) => {
    if (!value) {
      return "--";
    }
    const parsed = Number(value);
    if (Number.isNaN(parsed)) {
      return value;
    }
    return parsed.toLocaleString();
  };

  if (financialsLoading) {
    return (
      <div className="w-full rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-20 rounded-lg bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (hasError || !quote) {
    return (
      <div className="w-full rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400">
          {hasError
            ? "Error loading financials"
            : "No financial data available"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Financial Snapshot
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200/70 dark:border-gray-700/70 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Price
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${formatNumber(quote["05. price"])}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200/70 dark:border-gray-700/70 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Open
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${formatNumber(quote["02. open"])}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200/70 dark:border-gray-700/70 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Previous Close
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${formatNumber(quote["08. previous close"])}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200/70 dark:border-gray-700/70 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Day High
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${formatNumber(quote["03. high"])}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200/70 dark:border-gray-700/70 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Day Low
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            ${formatNumber(quote["04. low"])}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200/70 dark:border-gray-700/70 p-4">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Volume
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {formatVolume(quote["06. volume"])}
          </p>
        </div>

        <div className="rounded-lg border border-gray-200/70 dark:border-gray-700/70 p-4 sm:col-span-2 lg:col-span-3">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Change
          </p>
          <div className="flex items-baseline gap-3">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {formatNumber(quote["09. change"])}
            </p>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {quote["10. change percent"]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompanyFinancials;
