"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FixedSizeList } from "react-window";
import { getCompanyNews } from "../util/dataFetchingFunctions";

interface NewsItem {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

const today = new Date();
const twoDaysAgo = new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000);

const fromDate = twoDaysAgo.toISOString().split("T")[0];
const toDate = today.toISOString().split("T")[0];

const NewsFeed = () => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") || "";
  const {
    data: newsData,
    error: newsError,
    isLoading: newsLoading,
  } = useQuery<NewsItem[]>({
    queryKey: ["company-news", symbol],
    queryFn: () => getCompanyNews(symbol, fromDate, toDate),
    enabled: !!symbol,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  if (newsLoading) {
    return (
      <div className="text-gray-500 dark:text-gray-400">Loading news...</div>
    );
  }

  if (newsError) {
    return <div className="text-red-500">Error loading news</div>;
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className="text-gray-500 dark:text-gray-400">No news available</div>
    );
  }

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = newsData[index];
    const date = new Date(item.datetime * 1000);
    const isToday = new Date().toDateString() === date.toDateString();
    const timeString = isToday
      ? date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    return (
      <div
        style={style}
        className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
      >
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col  p-4  hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
        >
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
            {item.headline}
          </h3>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {timeString}
            </p>
            <span className="flex-shrink-0 text-xs font-medium text-blue-600 dark:text-blue-400 px-2 py-1 bg-blue-50 dark:bg-blue-950/30 rounded">
              {item.source}
            </span>
          </div>
        </a>
      </div>
    );
  };

  return (
    <div className="w-full max-w-none sm:max-w-[375px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Recent News
      </h2>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <FixedSizeList
          height={600}
          itemCount={newsData.length}
          itemSize={80}
          width="100%"
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default NewsFeed;
