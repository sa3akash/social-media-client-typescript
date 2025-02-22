import { IPrivacy } from "@/interfaces/post.interface";
import api from "@/store/rtk/BaseQuery";

export const liveApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getStreamKey: builder.query({
      query: () => ({
        url: "/streams/key",
        method: "GET",
      }),
      forceRefetch: () => true,
    }),
    resetKey: builder.mutation({
      query: () => ({
        url: "/stream/reset",
        method: "PUT",
        body: {},
      }),
    }),
    startStrem: builder.mutation({
      query: (data: {
        title: string;
        description: string;
        privacy: IPrivacy;
      }) => ({
        url: "/stream/start",
        method: "POST",
        body: data,
      }),
    }),
    stopStreamByKey: builder.mutation({
      query: () => ({
        url: "/stream/end",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const { useGetStreamKeyQuery, useResetKeyMutation, useStartStremMutation,useStopStreamByKeyMutation } = liveApiSlice;
