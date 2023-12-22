const baseUrl = import.meta.env.VITE_BASE_URL;

export const config = {
  apiUrl: baseUrl ? `${baseUrl}/api/v1` : "/api/v1",
  baseUrl: baseUrl,
};
