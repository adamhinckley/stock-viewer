"use client";

import type { SymbolData } from "../context/StockContext";

interface FinancialMetrics {
  metric: {
    "10DayAverageTradingVolume": number;
    "3MonthAverageTradingVolume": number;
    "52WeekHigh": number;
    "52WeekHighDate": string;
    "52WeekLow": number;
    "52WeekLowDate": string;
    "5DayPriceReturnDaily": number;
    monthToDatePriceReturnDaily: number;
    "priceRelativeToS&P5004Week": number;
    "priceRelativeToS&P500Ytd": number;
    yearToDatePriceReturnDaily: number;
  };
  metricType: string;
  series: Record<string, unknown>;
  symbol: string;
}

interface InfoModalProps {
  stock: SymbolData;
  financials: FinancialMetrics | undefined;
  isLoading: boolean;
  error: Error | null;
  onClose: () => void;
}

const InfoModal = ({
  stock,
  financials,
  isLoading,
  error,
  onClose,
}: InfoModalProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toFixed(2);
  };

  const formatPercentage = (num: number) => {
    return `${(num * 100).toFixed(2)}%`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {stock.symbol}
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 mt-1">
                {stock.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300">
              Failed to load financial data. Please try again.
            </div>
          )}

          {financials && (
            <div className="space-y-6">
              {/* Price Range Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                  52-Week Range
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      High
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${financials.metric["52WeekHigh"]?.toFixed(2) || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(financials.metric["52WeekHighDate"])}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Low
                    </div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      ${financials.metric["52WeekLow"]?.toFixed(2) || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(financials.metric["52WeekLowDate"])}
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Section */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-100 dark:border-purple-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Performance Returns
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <MetricCard
                    label="5-Day Return"
                    value={formatPercentage(
                      financials.metric["5DayPriceReturnDaily"] || 0,
                    )}
                    isPercentage
                    rawValue={financials.metric["5DayPriceReturnDaily"]}
                  />
                  <MetricCard
                    label="Month-to-Date"
                    value={formatPercentage(
                      financials.metric.monthToDatePriceReturnDaily || 0,
                    )}
                    isPercentage
                    rawValue={financials.metric.monthToDatePriceReturnDaily}
                  />
                  <MetricCard
                    label="Year-to-Date"
                    value={formatPercentage(
                      financials.metric.yearToDatePriceReturnDaily || 0,
                    )}
                    isPercentage
                    rawValue={financials.metric.yearToDatePriceReturnDaily}
                  />
                </div>
              </div>

              {/* Relative Performance Section */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                  Relative to S&P 500
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MetricCard
                    label="4-Week Relative"
                    value={formatPercentage(
                      financials.metric["priceRelativeToS&P5004Week"] || 0,
                    )}
                    isPercentage
                    rawValue={financials.metric["priceRelativeToS&P5004Week"]}
                  />
                  <MetricCard
                    label="YTD Relative"
                    value={formatPercentage(
                      financials.metric["priceRelativeToS&P500Ytd"] || 0,
                    )}
                    isPercentage
                    rawValue={financials.metric["priceRelativeToS&P500Ytd"]}
                  />
                </div>
              </div>

              {/* Trading Volume Section */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-100 dark:border-emerald-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Trading Volume
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MetricCard
                    label="10-Day Average"
                    value={formatNumber(
                      financials.metric["10DayAverageTradingVolume"] || 0,
                    )}
                    isVolume
                  />
                  <MetricCard
                    label="3-Month Average"
                    value={formatNumber(
                      financials.metric["3MonthAverageTradingVolume"] || 0,
                    )}
                    isVolume
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  isPercentage?: boolean;
  rawValue?: number;
  isVolume?: boolean;
}

const MetricCard = ({
  label,
  value,
  isPercentage,
  rawValue,
  isVolume,
}: MetricCardProps) => {
  const getColorClass = () => {
    if (isVolume || !isPercentage) return "text-gray-900 dark:text-white";
    if (rawValue === undefined) return "text-gray-900 dark:text-white";
    if (rawValue > 0) return "text-green-600 dark:text-green-400";
    if (rawValue < 0) return "text-red-600 dark:text-red-400";
    return "text-gray-600 dark:text-gray-400";
  };

  const getIndicator = () => {
    if (!isPercentage || rawValue === undefined || isVolume) return null;
    if (rawValue > 0) return "↑";
    if (rawValue < 0) return "↓";
    return "→";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {label}
      </div>
      <div className={`text-xl font-bold ${getColorClass()} flex items-center`}>
        {getIndicator() && <span className="mr-1">{getIndicator()}</span>}
        {value}
      </div>
    </div>
  );
};

export default InfoModal;
