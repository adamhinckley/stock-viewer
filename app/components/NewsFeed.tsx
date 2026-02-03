import { useEffect } from "react";
import { FixedSizeList } from "react-window";

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

interface NewsFeedProps {
  news: NewsItem[];
  loading: boolean;
  error: any;
}

const NewsFeed = ({ news, loading, error }: NewsFeedProps) => {
  // Handle errors in useEffect
  useEffect(() => {
    if (error) {
      console.error("Failed to fetch news:", error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="text-gray-500 dark:text-gray-400 w-full lg:max-w-[375px]">
        Loading news...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading news</div>;
  }

  if (!news || news.length === 0) {
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
    const item = news[index];
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
    <div className="w-full max-w-none lg:max-w-[375px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Recent News
      </h2>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <FixedSizeList
          height={600}
          itemCount={news.length}
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
