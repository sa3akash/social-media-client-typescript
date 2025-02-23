import api from "@/store/rtk/BaseQuery";
import { IReactionDoc } from "@/interfaces/reaction.interface";
import { postsApi } from "@/store/rtk/post/getPostSlice";
import { IPostDoc } from "@/interfaces/post.interface";
import { Utils } from "@/services/utils/utils";

export interface ReactionResponse {
  reactions: IReactionDoc[];
  currentPage: number;
  numberOfPages: number;
}

export const commentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCommantByPostId: builder.query({
      query: ({ postId, lastCreatedAt }) => `/comments/get/${postId}?lastCreatedAt=${lastCreatedAt}`,
      serializeQueryArgs: ({ queryArgs }) =>
        `posts-commant-${queryArgs.postId}`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data

        const uniqueArray = Utils.uniqueArray([
          ...currentCache,
          ...newData,
        ]);
        currentCache = uniqueArray;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getNestedCommant: builder.query({
      query: ({ commentId, lastCreatedAt }) => `/comments/reply/${commentId}?lastCreatedAt=${lastCreatedAt}`,
      serializeQueryArgs: ({ queryArgs }) =>
        `posts-commant-reply-${queryArgs.commentId}`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data

        const uniqueArray = Utils.uniqueArray([
          ...currentCache,
          ...newData,
        ]);
        currentCache = uniqueArray;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),

    addCommant: builder.mutation({
      query: (post) => ({
        url: "/comments/add",
        method: "POST",
        body: post,
      }),
      // Optimistically update the cache after updating a post
      async onQueryStarted(addCommant, { dispatch, queryFulfilled }) {
        // dispatch(addUserReactions(newData));
        dispatch(
          postsApi.util.updateQueryData("getPaginatedPosts", 1, (draft) => {
            const index = draft.posts.findIndex(
              (post: IPostDoc) => post._id === addCommant.postId,
            );

            if (index !== -1) {
              draft.posts[index] = {
                ...draft.posts[index],
                commentsCount: draft.posts[index].commentsCount + 1,
              };
            }
          }),
        );
        try {
          await queryFulfilled; // Await the mutation to complete
        } catch {
          // patchResult.undo(); // Undo the optimistic update if failed
        }
      },
    }),
  }),
});

export const { useAddCommantMutation, useGetCommantByPostIdQuery, useGetNestedCommantQuery } = commentApi;
