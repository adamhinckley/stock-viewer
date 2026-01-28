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

const defaultStocks = [
  {
    currency: "USD",
    description: "ALPHABET INC-CL C",
    displaySymbol: "GOOG",
    figi: "BBG009S3NB30",
    isin: "",
    mic: "XNAS",
    shareClassFIGI: "BBG009S3NB21",
    symbol: "GOOG",
    symbol2: "",
    type: "Common Stock",
  },
  {
    currency: "USD",
    description: "MICROSOFT CORP",
    displaySymbol: "MSFT",
    figi: "BBG000BPH459",
    isin: "",
    mic: "XNAS",
    shareClassFIGI: "BBG001S5TD05",
    symbol: "MSFT",
    symbol2: "",
    type: "Common Stock",
  },
  {
    currency: "USD",
    description: "AMAZON.COM INC",
    displaySymbol: "AMZN",
    figi: "BBG000BVPV84",
    isin: "",
    mic: "XNAS",
    shareClassFIGI: "BBG001S5PQL7",
    symbol: "AMZN",
    symbol2: "",
    type: "Common Stock",
  },
  {
    currency: "USD",
    description: "WALMART INC",
    displaySymbol: "WMT",
    figi: "BBG000BWXBC2",
    isin: "",
    mic: "XNAS",
    shareClassFIGI: "BBG001S5XH92",
    symbol: "WMT",
    symbol2: "",
    type: "Common Stock",
  },
  {
    currency: "USD",
    description: "BEST BUY CO INC",
    displaySymbol: "BBY",
    figi: "BBG000BCWCG1",
    isin: "",
    mic: "XNYS",
    shareClassFIGI: "BBG001S5P285",
    symbol: "BBY",
    symbol2: "",
    type: "Common Stock",
  },
  {
    currency: "USD",
    description: "COSTCO WHOLESALE CORP",
    displaySymbol: "COST",
    figi: "BBG000F6H8W8",
    isin: "",
    mic: "XNAS",
    shareClassFIGI: "BBG001S9KRQ7",
    symbol: "COST",
    symbol2: "",
    type: "Common Stock",
  },
];

export function StockContextProvider({ children }: { children: ReactNode }) {
  const [selectedStock, setSelectedStock] = useState<SymbolData | null>(null);
  const [watchingStocks, setWatchingStocks] =
    useState<SymbolData[]>(defaultStocks);
  const [messages, setMessages] = useState<string[]>([]);

  // useEffect(() => {
  //   if (watchingStocks.length === 0) return;

  //   const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);

  //   socket.addEventListener("open", () => {
  //     watchingStocks.forEach((stock) => {
  //       console.log("subscribing to", stock.symbol);
  //       socket.send(
  //         JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCMXN" }),
  //       );
  //     });
  //   });

  //   socket.addEventListener("error", (event) => {
  //     console.error("WebSocket error:", event);
  //   });

  //   socket.addEventListener("message", (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.type === "ping") return;
  //     setMessages(JSON.parse(event.data));
  //   });

  //   const pingInterval = setInterval(() => {
  //     if (socket.readyState === WebSocket.OPEN) {
  //       socket.send(JSON.stringify({ type: "ping" }));
  //     }
  //   }, 2000);

  //   return () => {
  //     console.log("cleaning up");
  //     clearInterval(pingInterval);
  //     socket.close();
  //   };
  // }, [watchingStocks]);

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
