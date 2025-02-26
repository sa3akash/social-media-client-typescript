import { config } from "@/config";
import { PageURL } from "@/services/utils/pageUrl";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// Custom baseQuery with cookie handling
const baseQuery = fetchBaseQuery({
  baseUrl: config.apiUrl, // Your API base URL
  credentials: "include", // Ensures that cookies (access and refresh tokens) are sent with each request
});

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  // First attempt to make the request
  let result = await baseQuery(args, api, extraOptions);

  // Check for a 401 error (access token expired)
  if (result.error && (result.error as FetchBaseQueryError).status === (401 | 503)) {
    // Attempt to refresh the access token
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // If the refresh was successful, retry the original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh failed, handle the error (e.g., logout, show login page, etc.)
      //   api.dispatch(setAuthError('Authentication failed. Please log in again.'));
      // Optionally, redirect to login page or clear auth state
      localStorage.clear();
      window.location.href = PageURL.Login; // Example for redirect
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Comment",
    "Reaction",
    "Notification",
    "Follower",
    "Post",
    "Settings/Notification",
    "Conversations",
  ],
  endpoints: () => ({}), // Empty, will be populated by separate files
});

export default api;
