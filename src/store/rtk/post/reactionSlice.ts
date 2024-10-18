import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/store/rtk/BaseQuery";
import { IReactionDoc } from "@/interfaces/reaction.interface";
import { addUserReactions } from "@/store/reducers/AuthReducer";

export interface ReactionResponse {
  reactions: IReactionDoc[];
  currentPage: number;
  numberOfPages: number;
}

export const apiReactionSlice = createApi({
  reducerPath: "reactionsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPaginatedReaction: builder.query<ReactionResponse, number>({
      query: (page) => `/posts?page=${page}`,
      serializeQueryArgs: () => `posts-reactions`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data
        currentCache.reactions = [
          ...currentCache.reactions,
          ...newData.reactions,
        ];
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getReactionByType: builder.query({
      query: ({postId, reactionType,page=1}) => `/post/reaction/${postId}/${reactionType}?page=${page}`,
      serializeQueryArgs: ({queryArgs}) => `posts-reactions-${queryArgs.reactionType}`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data
        currentCache.reactions = [
          ...currentCache.reactions,
          ...newData.reactions,
        ];
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    createReaction: builder.mutation({
      query: (post) => ({
        url: "/post/reaction",
        method: "POST",
        body: post,
      }),
      // Optimistically update the cache after updating a post
      async onQueryStarted(newData, { dispatch, queryFulfilled }) {
        dispatch(addUserReactions(newData));

        try {
          await queryFulfilled; // Await the mutation to complete
        } catch {
          // patchResult.undo(); // Undo the optimistic update if failed
        }
      },
    }),
  }),
});

export const {
  useGetPaginatedReactionQuery,
  useCreateReactionMutation,
  useGetReactionByTypeQuery
} = apiReactionSlice;
