"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useStockContext } from "../context/StockContext";

const pageSize = 20;

// Use the SymbolData type from StockContext for consistency
import type { SymbolData } from "../context/StockContext";

interface SymbolsResponse {
  page: number;
  total: number;
  pageSize: number;
  symbols: SymbolData[];
}

async function getSymbols(page = 1, search = ""): Promise<SymbolsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    ...(search ? { search } : {}),
  });
  const res = await fetch(`/api/symbols?${params.toString()}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

const StockIInput = () => {
  const { selectedStock, setSelectedStock, watchingStocks, setWatchingStocks } =
    useStockContext();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, error, isLoading } = useQuery<SymbolsResponse>({
    queryKey: ["symbols", 1, debouncedSearch],
    queryFn: () => getSymbols(1, debouncedSearch),
    enabled: debouncedSearch.length > 2 && dropdownOpen,
  });

  const handleSelect = (symbol: SymbolData) => {
    setSelectedStock(symbol);
    // Avoid duplicates
    if (!watchingStocks.find((s: SymbolData) => s.symbol === symbol.symbol)) {
      setWatchingStocks([...watchingStocks, symbol]);
    }
    setDropdownOpen(false);
    setSearch("");
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setDropdownOpen(true);
            setSelectedStock(null);
          }}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className="w-full p-3  rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {dropdownOpen && search && data && data.symbols.length > 0 && (
          <ul className="absolute z-10 left-0 right-0 bg-gray-900 text-gray-100 border border-gray-700 border-t-0 max-h-[calc(100vh-48px)] overflow-y-auto rounded-b-md shadow">
            {data.symbols.map((symbol) => (
              <li
                key={symbol.symbol}
                onMouseDown={() => handleSelect(symbol)}
                className={`px-3 py-2 cursor-pointer border-b border-gray-800 last:border-b-0 hover:bg-gray-800 ${
                  selectedStock?.symbol === symbol.symbol ? "bg-gray-800" : ""
                }`}
              >
                <span className="font-semibold">{symbol.symbol}</span>
                <span className="ml-2 text-gray-400">{symbol.description}</span>
              </li>
            ))}
          </ul>
        )}
        {dropdownOpen && search && data && data.symbols.length === 0 && (
          <div className="absolute z-10 left-0 right-0 bg-gray-900 text-gray-100 border border-gray-700 border-t-0 px-3 py-2 rounded-b-md shadow">
            No results found.
          </div>
        )}
      </div>
      {isLoading && (
        <div className="mt-2 text-gray-500">Loading symbols...</div>
      )}
      {error && <div className="mt-2 text-red-500">Error loading symbols</div>}
    </div>
  );
};

export default StockIInput;
