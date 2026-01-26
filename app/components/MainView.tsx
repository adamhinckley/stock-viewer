import StockIInput from "@/app/components/StockIInput";
import StockInfo from "./StockInfo";
import Tile from "./Tile";
import { useStockContext } from "../context/StockContext";

const MainView = () => {
  const { selectedStock, setSelectedStock, watchingStocks, setWatchingStocks } =
    useStockContext();

  return (
    <main className="min-h-screen  p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl   mb-4">Stock Watcher</h1>
      <StockIInput />
      {watchingStocks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {watchingStocks.map((stock) => (
            <Tile key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </main>
  );
};

export default MainView;
