import api from "@/store/rtk/BaseQuery";
import { IFollowerDoc } from "@/interfaces/auth.interface";
import { Utils } from "@/services/utils/utils";
import { addFollowing } from "@/store/reducers/AuthReducer";

export interface ReactionResponse {
  users: IFollowerDoc[];
  currentPage: number;
  numberOfPages: number;
}

export const userFriendApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFriendsUsers: builder.query({
      query: ({ uri, page = 1 }) => `/${uri}?page=${page}`,
      serializeQueryArgs: ({ queryArgs }) => `friends-page-${queryArgs.uri}`,
      merge: (currentCache, newData) => {
        // Merge the new data with the current cached data
        const uniqueArray = Utils.uniqueArray([
          ...currentCache.users,
          ...newData.users,
        ]);
        currentCache.users = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    getSuggestedFriends: builder.query({
      query: () => `/users/random`,
      serializeQueryArgs: () => `suggested-friends`,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),

    getSearchFriends: builder.query({
      query: ({ searchValue, page=1 }) => `/users/${searchValue}?page=${page}`,
      serializeQueryArgs: ({queryArgs}) => `search-friends-${queryArgs.searchValue}-page=${queryArgs.pageParam}`,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),

    followUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/follow/${id}`,
        method: "PUT",
        body: {},
      }),
      invalidatesTags: (result,_error,id) => [{ type: "User", id: result?.data?.authId },{type: "User", id: id}],
      // Optimistically update the cache after updating a post
      async onQueryStarted(followId, { dispatch, queryFulfilled }) {
        dispatch(addFollowing(followId));
        dispatch(
          userFriendApi.util.updateQueryData(
            "getSuggestedFriends",
            1,
            (draft) => {
              const index = draft.users.findIndex(
                (u: IFollowerDoc) => u._id === followId
              );
              if (index !== -1) {
                draft.users = draft.users.filter(
                  (u: IFollowerDoc) => u._id !== followId
                );
              }
            }
          )
        );
        try {
          await queryFulfilled;
          // Update the cache with the updated post
        } catch {
          // Handle error if needed
        }
      },
    }),
  }),
});

export const {
  useGetFriendsUsersQuery,
  useFollowUserMutation,
  useGetSuggestedFriendsQuery,
  useGetSearchFriendsQuery,
} = userFriendApi;
