import api from "@/store/rtk/BaseQuery";
import {
  IForgotPassword,
  ILogin,
  IRegister,
  IUpdatePassword,
} from "@/interfaces/auth.interface";
import { setAuth } from "@/store/reducers/AuthReducer";
import { AccountFormValues } from "@/lib/zodSchema";
import { INotificationSettings } from "@/interfaces/settings.interface";
 
export const userAuthApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILogin) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(data.user));
          // Update the cache with the updated post
        } catch {
          // Handle error if needed
        }
      },
    }),
    register: builder.mutation({
      query: (data: IRegister) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth({ authId: data.user._id, ...data.user }));
          // Update the cache with the updated post
        } catch {
          // Handle error if needed
        }
      },
    }),

    forgot: builder.mutation({
      query: (data: IForgotPassword) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    reset: builder.mutation({
      query: ({ data, token }) => ({
        url: `/reset-password/${token}`,
        method: "POST",
        body: data,
      }),
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `/current-user?authId=${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: 'User', id }],  
      // serializeQueryArgs: ({queryArgs}) => `current-user-${queryArgs}`,
      // forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),

    logedUserData: builder.query({
      query: () => ({
        url: "/login-user-data",
        method: "GET",
      }),
      serializeQueryArgs: () => `current-user-data`,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    checkUsername: builder.query({
      query: (username) => ({
        url: `/check-username?username=${username}`,
        method: "GET",
      }),      
      serializeQueryArgs: ({queryArgs}) => `check-${queryArgs}`,
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
    updateUsername: builder.mutation({
      query: (username) => ({
        url: `/update-username`,
        method: "PUT",
        body: {username},
      }),
      invalidatesTags: (result) => [{ type: "User", id: result?.authId }],    
    }),
    updatePassword: builder.mutation({
      query: (body: IUpdatePassword) => ({
        url: "/update-password",
        method: "PUT",
        body: body,
      }),
    }),
    updateProfileCover: builder.mutation({
      query: (body: FormData) => ({
        url: "/update-cover-picture",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result) => [{ type: "User", id: result?.authId }],

    }),
    updateProfileImage: builder.mutation({
      query: (body: FormData) => ({
        url: "/update-profile-picture",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result) => [{ type: "User", id: result?.authId }],

    }),
    updateProfileInfo: builder.mutation({
      query: (body: AccountFormValues) => ({
        url: "/users/info-update",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: (result) => [{ type: "User", id: result?.authId }],
    }),
    getSettingsNotification: builder.query({
      query: () => ({
        url: "/users/settings/notificatons",
        method: "GET",
      }),
      providesTags: ['Settings/Notification'],
    }),

    updateNotificationSettions: builder.mutation({
      query: (body: INotificationSettings) => ({
        url: "/users/settings/notificaton",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ['Settings/Notification'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotMutation,
  useResetMutation,
  useGetUserQuery,
  useLogedUserDataQuery,
  useCheckUsernameQuery,
  useUpdateUsernameMutation,
  useUpdatePasswordMutation,
  useUpdateProfileCoverMutation,
  useUpdateProfileImageMutation,
  useUpdateProfileInfoMutation,
  useGetSettingsNotificationQuery,
  useUpdateNotificationSettionsMutation
} = userAuthApi;
