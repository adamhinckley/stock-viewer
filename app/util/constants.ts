export const isDevEnv = process.env.NODE_ENV === "development";
export const finnhubBaseURL = process.env.NEXT_PUBLIC_FINNHUB_API_URL;
export const finnhubApiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
export const alphavantageBaseURL = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_URL;
export const alphavantageApiKey = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;
export const deployedDackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const localBackendURL = "http://localhost:3421";
export const backendURL = isDevEnv ? localBackendURL : deployedDackendURL;
