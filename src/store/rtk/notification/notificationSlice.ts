/* eslint-disable @typescript-eslint/no-unused-vars */
import api from "@/store/rtk/BaseQuery";
import { IReactionDoc } from "@/interfaces/reaction.interface";
import { INotification } from "@/interfaces/notificaton.interface";
import { Utils } from "@/services/utils/utils";

export interface PostsResponse {
  notifications: INotification[];
  reactions: IReactionDoc[];
  currentPage: number;
  numberOfPages: number;
}

export const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<PostsResponse, number>({
      query: (page) => `/notifications?page=${page}`,
      serializeQueryArgs: () => `notification-page`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data
        const uniqueArray = Utils.uniqueArray([
          ...currentCache.notifications,
          ...newData.notifications,
        ]);

        currentCache.notifications = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      onQueryStarted: async (_, { queryFulfilled }) => {
        // Optimistically update the cache after fetching posts
        try {
          await queryFulfilled;
          // Update the cache with the updated post
        } catch {
          // Handle error if needed
        }
      },
    }),
    markRead: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "PUT",
        body: {},
      }),
      // Optimistically update the cache after updating a post
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(
          notificationApi.util.updateQueryData(
            "getNotification",
            1,
            (draft) => {
              const index = draft.notifications.findIndex((n) => n._id === id);

              if (index !== -1) {
                draft.notifications[index] = {
                  ...draft.notifications[index],
                  read: true,
                };
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          // Handle error if needed
        }
      },
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
        body: {},
      }),
      // Optimistically update the cache after updating a post
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(
          notificationApi.util.updateQueryData(
            "getNotification",
            1,
            (draft) => {
              const index = draft.notifications.findIndex((n) => n._id === id);
              if (index !== -1) {
                draft.notifications.splice(index, 1);
              }
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          // Handle error if needed
        }
      },
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useMarkReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;
