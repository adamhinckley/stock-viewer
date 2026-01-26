"use client";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

export interface SymbolData {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

interface StockContextType {
  selectedStock: SymbolData | null;
  setSelectedStock: (symbol: SymbolData | null) => void;
  watchingStocks: SymbolData[];
  setWatchingStocks: (symbols: SymbolData[]) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockContextProvider({ children }: { children: ReactNode }) {
  const [selectedStock, setSelectedStock] = useState<SymbolData | null>(null);
  const [watchingStocks, setWatchingStocks] = useState<SymbolData[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (watchingStocks.length === 0) return;

    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);

    socket.addEventListener("open", () => {
      watchingStocks.forEach((stock) => {
        console.log("subscribing to", stock.symbol);
        socket.send(
          JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCMXN" }),
        );
      });
    });

    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "ping") return;
      setMessages(JSON.parse(event.data));
    });

    const pingInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "ping" }));
      }
    }, 2000);

    return () => {
      console.log("cleaning up");
      clearInterval(pingInterval);
      socket.close();
    };
  }, [watchingStocks]);

  console.log("messages:", messages);
  console.log("watchingStocks:", watchingStocks);

  return (
    <StockContext.Provider
      value={{
        selectedStock,
        setSelectedStock,
        watchingStocks,
        setWatchingStocks,
      }}
    >
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
