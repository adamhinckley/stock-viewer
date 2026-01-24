"use client";
import { useEffect, useState } from "react";
// import { GET, getSymbols } from "./api/route";
// import { ClientPageRoot } from "next/dist/client/components/client-page";
import StockIInput from "./components/StockIInput";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StockContextProvider } from "./context/StockContext";

console.log("API_URL:", process.env.NEXT_PUBLIC_WEBSOCKET_URL);
export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [symbols, setSymbols] = useState<any[]>([]);
  useEffect(() => {
    // const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`);
    // getSymbols().then(setSymbols);
    // socket.addEventListener("open", () => {
    //   socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
    //   socket.send(
    //     JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" }),
    //   );
    //   socket.send(
    //     JSON.stringify({ type: "subscribe", symbol: "IC MARKETS:1" }),
    //   );
    // });
    // socket.addEventListener("message", (event) => {
    //   setMessages((prev) => [event.data]);
    // });
    // const pingInterval = setInterval(() => {
    //   console.log("Sending ping");
    //   if (socket.readyState === WebSocket.OPEN) {
    //     socket.send(JSON.stringify({ type: "ping" }));
    //   }
    // }, 2000);
    // return () => {
    //   clearInterval(pingInterval);
    //   socket.close();
    // };
  }, []);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <StockContextProvider>
        <StockIInput />
      </StockContextProvider>
    </QueryClientProvider>
  );
}
