import api from "@/store/rtk/BaseQuery";
import { setUserReactions } from "@/store/reducers/AuthReducer";
import { posts, postsUser } from "@/store/rtk/post/helpers";
import { Utils } from "@/services/utils/utils";

export const postsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaginatedPosts: builder.query({
      query: (page) => `/posts?page=${page}`,
      serializeQueryArgs: () => `posts-page`,
      merge: (currentCache, newData) => {
        const uniqueArray = Utils.uniqueArray([
          ...currentCache.posts,
          ...newData.posts,
        ]);

        currentCache.posts = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache after fetching posts
        try {
          const { data: getPosts } = await queryFulfilled;
          // Update the cache with the updated post
          dispatch(setUserReactions(getPosts.reactions));
        } catch {
          // Handle error if needed
        }
      },
      providesTags: (result) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.posts.map(({ _id }: { _id: string }) => ({
                type: "Post",
                id: _id,
              })),
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPaginatedUserPosts: builder.query({
      query: ({ authId, page }) => `posts/user/${authId}?page=${page}`,
      serializeQueryArgs: ({ queryArgs }) =>
        `posts-user-${queryArgs.authId}-page`,
      merge: (currentCache, newData) => {
        const uniqueArray = Utils.uniqueArray([
          ...currentCache.posts,
          ...newData.posts,
        ]);

        currentCache.posts = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache after fetching posts
        try {
          const { data: getPosts } = await queryFulfilled;
          // Update the cache with the updated post
          dispatch(setUserReactions(getPosts.reactions));
        } catch {
          // Handle error if needed
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      providesTags: (result) =>
        result
          ? [
              { type: "Post", id: "USER_LIST" }, // Add a unique tag for user posts
              ...result.posts.map(({ _id }: { _id: string }) => ({
                type: "Post",
                id: _id,
              })),
            ]
          : [{ type: "Post", id: "USER_LIST" }],
    }),

    getPaginatedImagePosts: builder.query({
      query: (page) => `/posts/image?page=${page}`,
      serializeQueryArgs: () => `posts-image-page`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data
        const uniqueArray = Utils.uniqueArray([
          ...currentCache.postWithImages,
          ...newData.postWithImages,
        ]);

        currentCache.postWithImages = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache after fetching posts
        try {
          const { data: getPosts } = await queryFulfilled;
          // Update the cache with the updated post
          dispatch(setUserReactions(getPosts.reactions));
        } catch {
          // Handle error if needed
        }
      },
      providesTags: (result) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.postWithImages.map(({ _id }: { _id: string }) => ({
                type: "Post",
                id: _id,
              })),
            ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPaginatedVideoPosts: builder.query({
      query: (page) => `/posts/video?page=${page}`,
      serializeQueryArgs: () => `posts-video-page`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data

        const uniqueArray = Utils.uniqueArray([
          ...currentCache.postWithVideos,
          ...newData.postWithVideos,
        ]);
        currentCache.postWithVideos = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        // Optimistically update the cache after fetching posts
        try {
          const { data: getPosts } = await queryFulfilled;
          // Update the cache with the updated post
          dispatch(setUserReactions(getPosts.reactions));
        } catch {
          // Handle error if needed
        }
      },
      providesTags: (result) =>
        result
          ? [
              { type: "Post", id: "LIST" },
              ...result.postWithVideos.map(({ _id }: { _id: string }) => ({
                type: "Post",
                id: _id,
              })),
            ]
          : [{ type: "Post", id: "LIST" }],
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
          dispatch(posts.addPost(createPostResponse.post));
          dispatch(postsUser.addPost(createPostResponse.post));
        } catch {
          // Handle error if needed
        }
      },
      // invalidatesTags: [{ type: 'Post', id: 'LIST' }],
      invalidatesTags: (_result, _error, post) => [
        { type: "User", id: post.authId },
        { type: "Post", id: "LIST" },
      ],
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
          dispatch(posts.update(id, updatedPost.post));
          dispatch(postsUser.update(id, updatedPost.post));
          dispatch(postsUser.updateImage(id, updatedPost.post));
          dispatch(postsUser.updateVideo(id, updatedPost.post));
        } catch {
          // Handle error if needed
        }
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: "Post", id }],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
      // Optimistically update the cache
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(posts.delete(id));

        try {
          const { data: deletedPost } = await queryFulfilled; // Await the mutation to complete

          dispatch(postsUser.delete(id, deletedPost.authId));
          dispatch(postsUser.deleteImagePost(id, deletedPost.authId));
          dispatch(postsUser.deleteVideoPost(id, deletedPost.authId));
        } catch {
          patchResult.undo(); // Undo the optimistic update if failed
        }
      },
      invalidatesTags: (_result, _error, id) => [
        // { type: "Post", id: "LIST" },
        { type: "Post", id },
      ],
    }),
  }),
});

export const {
  useGetPaginatedPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useGetPaginatedImagePostsQuery,
  useGetPaginatedVideoPostsQuery,
  useGetPaginatedUserPostsQuery,
} = postsApi;
