"use client";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CompanyProfile from "@/app/components/CompanyProfile";
import { getProfile } from "@/app/util/dataFetchingFunctions";

const DetailsPage = () => {
  return <CompanyProfile />;
};

export default DetailsPage;
