import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SymbolData } from "../context/StockContext";
import InfoModal from "./InfoModal";

interface TileProps {
  stock: SymbolData;
}

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

const Tile = ({ stock }: TileProps) => {
  const [showModal, setShowModal] = useState(false);
  const {
    data: financials,
    error: financialsError,
    isLoading: financialsLoading,
  } = useQuery<FinancialMetrics>({
    queryKey: ["financials", stock.symbol],
    queryFn: async () => {
      const res = await fetch(`/api/financials?symbol=${stock.symbol}`);
      if (!res.ok) throw new Error("Failed to fetch financials");
      return res.json();
    },
    enabled: !!stock.symbol,
  });

  return (
    <>
      <div
        className="border rounded-lg p-4 shadow hover:shadow-lg transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800"
        onClick={() => setShowModal(true)}
      >
        <h2 className="text-lg font-semibold mb-2">{stock.symbol}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {stock.description}
        </p>
        {financialsLoading && (
          <div className="mt-2 text-xs text-gray-500">
            Loading financials...
          </div>
        )}
        {financialsError && (
          <div className="mt-2 text-xs text-red-500">
            Error loading financials
          </div>
        )}
        {financials && (
          <div className="mt-2 text-xs text-gray-500">
            <div>
              52 Week High: ${financials.metric["52WeekHigh"]?.toFixed(2)}
            </div>
            <div>
              52 Week Low: ${financials.metric["52WeekLow"]?.toFixed(2)}
            </div>
          </div>
        )}
        <div className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium">
          Click for details →
        </div>
      </div>

      {showModal && (
        <InfoModal
          stock={stock}
          financials={financials}
          isLoading={financialsLoading}
          error={financialsError}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Tile;
