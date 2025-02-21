import api from "@/store/rtk/BaseQuery";
import { IReactionDoc } from "@/interfaces/reaction.interface";
import { addUserReactions } from "@/store/reducers/AuthReducer";
import { Utils } from "@/services/utils/utils";

export interface ReactionResponse {
  reactions: IReactionDoc[];
  currentPage: number;
  numberOfPages: number;
}

export const reactionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedReaction: builder.query<ReactionResponse, number>({
      query: (page) => `/posts?page=${page}`,
      serializeQueryArgs: () => `posts-reactions`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data
        const uniqueArray = Utils.uniqueArray([
          ...currentCache.reactions,
          ...newData.reactions,
        ]);

        currentCache.reactions = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getReactionByType: builder.query({
      query: ({ postId, reactionType, page = 1 }) =>
        reactionType !== "all"
          ? `/post/reaction/${postId}/${reactionType}?page=${page}`
          : `/post/reactions/${postId}?page=${page}`,
      serializeQueryArgs: ({ queryArgs }) =>
        `posts-reactions-${queryArgs.postId}-${queryArgs.reactionType}`,
      merge: (currentCache, newData) => {
        const uniqueArray = Utils.uniqueArray([
          ...currentCache.reactions,
          ...newData.reactions,
        ]);

        currentCache.reactions = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg.postId !== previousArg?.postId ||
          currentArg.reactionType !== previousArg?.reactionType
        );
      },
    }),
    createReaction: builder.mutation({
      query: (post) => ({
        url: "/post/reaction",
        method: "POST",
        body: post,
      }),

      invalidatesTags: (_result, _error, post) => [
        { type: "Post", id: post.targetId },
        { type: "Post", id: "USER_LIST" },
      ], // Optimistically update the cache after updating a post
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
  useGetReactionByTypeQuery,
} = reactionsApi;
