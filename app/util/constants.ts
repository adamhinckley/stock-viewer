export const isLocal = window.location.hostname === "localhost";
export const finnhubBaseURL = process.env.NEXT_PUBLIC_FINNHUB_API_URL;
export const finnhubApiKey = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;
export const alphavantageBaseURL = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_URL;
export const alphavantageApiKey = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;
export const deployedBackendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const localBackendURL = "http://localhost:3421";
export const backendURL = isLocal ? localBackendURL : deployedBackendURL;
