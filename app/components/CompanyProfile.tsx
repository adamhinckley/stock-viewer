"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../util/dataFetchingFunctions";
import Suspend from "./Suspend";

import type { CompanyProfile } from "../util/interfaces";

const CompanyProfile = () => {
  const searchParams = useSearchParams();
  const symbol = searchParams.get("symbol") || "";
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    data: profileData,
    error: profileError,
    isLoading: profileLoading,
  } = useQuery<CompanyProfile>({
    queryKey: ["company-profile", symbol],
    queryFn: () => getProfile(symbol),
    enabled: !!symbol,
    gcTime: 1000 * 60 * 20,
  });

  const isContentReady = profileData && profileData.logo ? imageLoaded : true;

  return (
    <>
      {/* Hidden image to preload */}
      {profileData?.logo && !imageLoaded && (
        <img
          src={profileData.logo}
          alt="preload"
          onLoad={() => setImageLoaded(true)}
          style={{ display: "none" }}
        />
      )}
      {/* loading skeleton */}
      {profileLoading || !isContentReady ? (
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
      ) : profileError || !profileData ? (
        <div className="w-full rounded-lg p-6">
          <p className="text-gray-500 dark:text-gray-400">
            {profileError
              ? "Error loading company profile"
              : "No profile data available"}
          </p>
        </div>
      ) : (
        <div className="w-full rounded-lg p-6">
          <div className="flex items-center gap-4">
            {/* Logo */}
            {profileData.logo && (
              <div className="flex-shrink-0">
                <img
                  src={profileData.logo}
                  alt={`${profileData.name} logo`}
                  className="h-16 w-16 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                />
              </div>
            )}

            {/* Company Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 mb-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {profileData.name}
                </h2>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {profileData.ticker}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
                {profileData.finnhubIndustry && (
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Industry:</span>
                    <span>{profileData.finnhubIndustry}</span>
                  </span>
                )}
                {profileData.exchange && (
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Exchange:</span>
                    <span>{profileData.exchange}</span>
                  </span>
                )}
                {profileData.ipo && (
                  <span className="flex items-center gap-1">
                    <span className="font-medium">IPO:</span>
                    <span>
                      {new Date(profileData.ipo).toLocaleDateString()}
                    </span>
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

export default Suspend(CompanyProfile);
