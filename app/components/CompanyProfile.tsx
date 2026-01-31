export interface CompanyProfileInterface {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

type Props = { profile: CompanyProfileInterface };

const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);

const CompanyProfile = ({ profile }: Props) => {
  console.log("profile", profile);
  if (!profile) return;
  return (
    <section className="inline-flex w-fit flex-col rounded-xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur">
      <header className="flex items-center gap-4">
        <div className="h-12 w-12 overflow-hidden rounded-lg bg-white/10">
          <img
            src={profile.logo}
            alt={`${profile.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
          <p className="text-sm text-white/60">
            {profile.ticker} · {profile.exchange}
          </p>
        </div>
        <a
          href={profile.weburl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto rounded-md border border-white/20 px-3 py-1.5 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
        >
          Website
        </a>
      </header>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">
            Market Cap
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {formatCurrency(profile.marketCapitalization, profile.currency)}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">
            Shares Outstanding
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {formatNumber(profile.shareOutstanding)}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">
            Industry
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {profile.finnhubIndustry}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">IPO</p>
          <p className="mt-1 text-lg font-semibold text-white">{profile.ipo}</p>
        </div>
        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">
            Country
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {profile.country}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">Phone</p>
          <p className="mt-1 text-lg font-semibold text-white">
            {profile.phone}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfile;
