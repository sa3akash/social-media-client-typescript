// postsApi.ts
import { IPostDoc } from "@/interfaces/post.interface";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/store/rtk/BaseQuery";
import { IReactionDoc } from "@/interfaces/reaction.interface";
import { setUserReactions } from "@/store/reducers/AuthReducer";

export interface PostsResponse {
  posts: IPostDoc[];
  reactions: IReactionDoc[];
  currentPage: number;
  numberOfPages: number;
}

export const apiPostsSlice = createApi({
  reducerPath: "postsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getPaginatedPosts: builder.query<PostsResponse, number>({
      query: (page) => `/posts?page=${page}`,
      serializeQueryArgs: () => `posts-page`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data
        currentCache.posts = [...currentCache.posts, ...newData.posts];
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache after fetching posts
        try {
          const { data: getPosts } = await queryFulfilled;
          // Update the cache with the updated post
          dispatch(
            setUserReactions(getPosts.reactions)
          );
        } catch {
          // Handle error if needed
        }
      }
    }),
    createPost: builder.mutation({
        query: (post) => ({
          url: `post`,
          method: "POST",
          body: post,
        }),
        // Optimistically update the cache after updating a post
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const { data: createPostResponse } = await queryFulfilled;
            // Update the cache with the updated post
            dispatch(
              apiPostsSlice.util.updateQueryData(
                "getPaginatedPosts",
                1,
                (draft) => {
                  draft.posts = [createPostResponse.post, ...draft.posts];
                }
              )
            );
          } catch {
            // Handle error if needed
          }
        },
      }),
    updatePost: builder.mutation({
      query: ({ id, post }) => ({
        url: `post/${id}`,
        method: "PUT",
        body: post,
      }),
      // Optimistically update the cache after updating a post
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;
          // Update the cache with the updated post
          dispatch(
            apiPostsSlice.util.updateQueryData(
              "getPaginatedPosts",
              1,
              (draft) => {
                const index = draft.posts.findIndex((post) => post._id === id);

                if (index !== -1) {
                  draft.posts[index] = updatedPost.post;
                }
              }
            )
          );
        } catch {
          // Handle error if needed
        }
      },
    }),
  
    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
      // Optimistically update the cache
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiPostsSlice.util.updateQueryData(
            "getPaginatedPosts",
            1,
            (draft) => {
              // Remove the post from the cache
              const index = draft.posts.findIndex((p) => p._id === id);
              if (index !== -1) {
                draft.posts.splice(index, 1);
              }
            }
          )
        );
        try {
          await queryFulfilled; // Await the mutation to complete
        } catch {
          patchResult.undo(); // Undo the optimistic update if failed
        }
      },
    }),
  }),
});

export const {
  useGetPaginatedPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreatePostMutation
} = apiPostsSlice;
