import StockIInput from "@/app/components/StockIInput";
import StockInfo from "./StockInfo";
import Tile from "./Tile";
import { useStockContext } from "../context/StockContext";

const MainView = () => {
  const { selectedStock, setSelectedStock, watchingStocks, setWatchingStocks } =
    useStockContext();

  return (
    <main className="min-h-screen max-w-6xl mx-auto">
      <div className="sticky top-[73px] z-30 px-4 pt-4">
        <StockIInput />
      </div>
      <div className="px-4 ">
        {watchingStocks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {watchingStocks.map((stock) => (
              <Tile key={stock.symbol} stock={stock} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MainView;
