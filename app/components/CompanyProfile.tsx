import Link from "next/link";
import type { CompanyProfile } from "../util/interfaces";

type Props = { profile: CompanyProfile };

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);

const CompanyProfile = ({ profile }: Props) => {
  if (!profile) return;
  return (
    <section className="">
      <Link
        href="/dashboard"
        className="mt-4 inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group w-fit"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </Link>
    </section>
  );
};

export default CompanyProfile;
