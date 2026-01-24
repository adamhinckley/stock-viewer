"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useStockContext } from "../context/StockContext";

const pageSize = 20;

interface SymbolData {
  symbol: string;
  description: string;
}

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
  const { selectedStock, setSelectedStock } = useStockContext();
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data, error, isLoading } = useQuery<SymbolsResponse>({
    queryKey: ["symbols", 1, search],
    queryFn: () => getSymbols(1, search),
    enabled: search.length > 2 && dropdownOpen, // Only fetch when searching
  });

  const handleSelect = (symbol: SymbolData) => {
    setSelectedStock(symbol);
    setDropdownOpen(false);
    setSearch(symbol.symbol);
  };

  return (
    <div className="max-w-md mx-auto">
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
          className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      {selectedStock && (
        <div className="mt-6 p-4 border border-gray-200 rounded-md bg-black">
          <h4 className="font-bold mb-2">Selected Stock</h4>
          <div>
            <span className="font-semibold">Symbol:</span>{" "}
            {selectedStock.symbol}
          </div>
          <div>
            <span className="font-semibold">Description:</span>{" "}
            {selectedStock.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockIInput;
