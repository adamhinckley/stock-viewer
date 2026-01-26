"use client";
import { SymbolData, useStockContext } from "../context/StockContext";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function StockInfo() {
  const { selectedStock, setWatchingStocks } = useStockContext();

  if (!selectedStock) {
    return null;
  }

  const infoRows = [
    { label: "Symbol", value: selectedStock.symbol },
    { label: "Display Symbol", value: selectedStock.displaySymbol },
    { label: "Type", value: selectedStock.type },
    { label: "Currency", value: selectedStock.currency },
    { label: "FIGI", value: selectedStock.figi },
    { label: "Share Class FIGI", value: selectedStock.shareClassFIGI },
    { label: "ISIN", value: selectedStock.isin },
    { label: "MIC", value: selectedStock.mic },
    { label: "Symbol 2", value: selectedStock.symbol2 },
  ].filter((row) => row.value && row.value !== "");

  const handleWatch = () => {
    // Avoid duplicates
    setWatchingStocks(
      ((prev) => {
        if (prev.find((s) => s.symbol === selectedStock.symbol)) {
          return prev;
        }
        return [...prev, selectedStock];
      })(Array.isArray(setWatchingStocks) ? setWatchingStocks : []),
    );
  };

  return (
    <div className="mt-6 w-full m bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex justify-between items-center">
              <DisclosureButton className="cursor-pointer flex w-full justify-between items-center rounded-lg bg-gray-100 dark:bg-gray-900 px-4 py-2 text-left text-base font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-blue-500/75">
                <span>{selectedStock.description || "Stock Details"}</span>
                <ChevronDownIcon
                  className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-white group-data-open:rotate-180`}
                  aria-hidden="true"
                />
              </DisclosureButton>
              <button className="cursor-pointer" onClick={handleWatch}>
                Watch
              </button>
            </div>
            <DisclosurePanel className="pt-4 pb-2 text-sm text-gray-700 dark:text-gray-200">
              <dl className="divide-y divide-gray-200 dark:divide-gray-800">
                {infoRows.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col sm:flex-row sm:items-center py-2 px-1"
                  >
                    <dt className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 w-32 sm:w-40">
                      {label}
                    </dt>
                    <dd className="mt-1 sm:mt-0 text-sm sm:text-base text-gray-900 dark:text-gray-100 break-all">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
