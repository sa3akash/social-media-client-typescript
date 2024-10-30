import { ISendMessageDataJson } from "@/interfaces/chat.interface";
import { Utils } from "@/services/utils/utils";
import api from "@/store/rtk/BaseQuery";

export const messangerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data: ISendMessageDataJson) => ({
        url: "/chat/message",
        method: "POST",
        body: data,
      }),
    }),
    getConversation: builder.query({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
      }),
      providesTags: ["Conversations"],
    }),

    getMessages: builder.query({
      query: ({ conversationId, page }) => ({
        url: `/chat/messagess/${conversationId}?page=${page}`,
        method: "GET",
      }),
      serializeQueryArgs: ({queryArgs}) => `messages-page-${queryArgs.conversationId}`,
      merge: (currentCache, newData) => {

        const uniqueArray = Utils.uniqueArray([
          ...newData.messages,
          ...currentCache.messages,
        ]);
        console.log(uniqueArray)
        currentCache.messages = uniqueArray;
        currentCache.currentPage = newData.currentPage;
        currentCache.numberOfPages = newData.numberOfPages;
      },
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationQuery,
  useGetMessagesQuery,
} = messangerApi;
