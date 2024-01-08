const baseUrl = import.meta.env.VITE_BASE_URL;

// console.log(import.meta.env.VITE_GIPHY_API_KEY);

export const config = {
  apiUrl: baseUrl ? `${baseUrl}/api/v1` : "/api/v1",
  baseUrl: baseUrl,
  GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY,
};
// || 'O9T4jRqw73fBvel8w9t0fNVJZTx80BlZ'
