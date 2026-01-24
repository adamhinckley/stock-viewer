"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export interface SymbolData {
  symbol: string;
  description: string;
}

interface StockContextType {
  selectedStock: SymbolData | null;
  setSelectedStock: (symbol: SymbolData | null) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockContextProvider({ children }: { children: ReactNode }) {
  const [selectedStock, setSelectedStock] = useState<SymbolData | null>(null);

  return (
    <StockContext.Provider value={{ selectedStock, setSelectedStock }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStockContext() {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error(
      "useStockContext must be used within a StockContextProvider",
    );
  }
  return context;
}
