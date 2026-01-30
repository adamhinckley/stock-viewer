"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StockContextProvider } from "../context/StockContext";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StockContextProvider>{children}</StockContextProvider>
    </QueryClientProvider>
  );
}
