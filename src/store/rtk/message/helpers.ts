import { IMessageData } from "@/interfaces/chat.interface";
import { messangerApi } from "./message";

export const messagesHelpers = {
  addMessage: (post: IMessageData) => {
    return messangerApi.util.updateQueryData(
      "getMessages",
      { conversationId: post.conversationId },
      (draft) => {
        draft.messages = [...draft.messages, post];
      }
    );
  },

  updateConversation: (post: IMessageData) => {
    return messangerApi.util.updateQueryData(
      "getConversation",
      "conversations",
      (draft) => {
        const conversationIndex = draft.conversationList.findIndex(
          (conversation: IMessageData) =>
            conversation.conversationId === post?.conversationId
        );
        if (conversationIndex !== -1) {
          draft.conversationList.splice(conversationIndex, 1);
        }
        draft.conversationList.unshift(post);
      }
    );
  },

  updateMarkReadConversation: (conversationId: string) => {
    return messangerApi.util.updateQueryData(
      "getConversation",
      "conversations",
      (draft) => {
        const updatedConversations = [...draft.conversationList].map((c) =>
          c.conversationId === conversationId ? { ...c, isRead: true } : c
        );

        draft.conversationList = updatedConversations;
      }
    );
  },
  updateMarkReadMessage: (
    conversationIdUser: string,
    conversationIdSocket: string
  ) => {
    return messangerApi.util.updateQueryData(
      "getMessages",
      { conversationId: conversationIdUser },
      (draft) => {
        if (conversationIdUser === conversationIdSocket) {
          const updatedMessges = [...draft.messages].map((m) =>
            !m.isRead ? { ...m, isRead: true } : m
          );

          draft.messages = updatedMessges;
        }
      }
    );
  },


  getConversationCache: ()=>{
    return messangerApi.endpoints.getConversation.select('conversations');
  }
};
