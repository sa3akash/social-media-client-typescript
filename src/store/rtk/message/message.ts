import { ISendMessageDataJson } from "@/interfaces/chat.interface";
import { Utils } from "@/services/utils/utils";
import api from "@/store/rtk/BaseQuery";
import { messagesHelpers } from "./helpers";

export const messangerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data: ISendMessageDataJson) => ({
        url: "/chat/message",
        method: "POST",
        body: data,
      }
    ),
    // invalidatesTags: ['Conversations'],
    onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
      try {
        const { data: newMessage } = await queryFulfilled;
        // Update the cache with the updated post
        dispatch(messagesHelpers.addMessage(newMessage?.message))
        dispatch(messagesHelpers.updateConversation(newMessage?.message))

      } catch {
        // Handle error if needed
      }
    }
    }),
    getConversation: builder.query({
      query: () => ({
        url: "/chat/conversations",
        method: "GET",
      }),
      serializeQueryArgs: () => `conversations`,
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
