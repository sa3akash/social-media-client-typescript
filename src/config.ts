const baseUrl = import.meta.env.VITE_BASE_URL;

export const config = {
  apiUrl: baseUrl ? `${baseUrl}/api/v1` : "/api/v1",
  baseUrl: baseUrl,
  GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY,
  RTMP_SERVER_URL: import.meta.env.RTMPVITE_RTMP_SERVER_URL_SERVER_URL || "rtmp://localhost:1935/live",
};
// || 'O9T4jRqw73fBvel8w9t0fNVJZTx80BlZ'
