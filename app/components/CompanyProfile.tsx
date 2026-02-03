import { useState } from "react";

import type { CompanyProfile } from "../util/interfaces";

interface CompanyProfileProps {
  profile?: CompanyProfile;
  loading?: boolean;
  error?: Error | null;
}

const CompanyProfile = ({ profile, loading, error }: CompanyProfileProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const isContentReady = profile && profile.logo ? imageLoaded : true;

  return (
    <>
      {/* Hidden image to preload */}
      {profile?.logo && !imageLoaded && (
        <img
          src={profile.logo}
          alt="preload"
          onLoad={() => setImageLoaded(true)}
          style={{ display: "none" }}
        />
      )}
      {/* loading skeleton */}
      {loading || !isContentReady ? (
        <div className="w-full rounded-lg p-6">
          <div className="animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex-1">
                <div className="mb-2 h-6 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      ) : error || !profile ? (
        <div className="w-full rounded-lg p-6">
          <p className="text-gray-500 dark:text-gray-400">
            {error
              ? "Error loading company profile"
              : "No profile data available"}
          </p>
        </div>
      ) : (
        <div className="w-full rounded-lg p-6">
          <div className="flex items-center gap-4">
            {/* Logo */}
            {profile.logo && (
              <div className="flex-shrink-0">
                <img
                  src={profile.logo}
                  alt={`${profile.name} logo`}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
              </div>
            )}

            {/* Company Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {profile.name}
                </h2>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {profile.ticker}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                {profile.finnhubIndustry && (
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Industry:</span>
                    <span>{profile.finnhubIndustry}</span>
                  </span>
                )}
                {profile.exchange && (
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Exchange:</span>
                    <span>{profile.exchange}</span>
                  </span>
                )}
                {profile.ipo && (
                  <span className="flex items-center gap-1">
                    <span className="font-medium">IPO:</span>
                    <span>{new Date(profile.ipo).toLocaleDateString()}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyProfile;
