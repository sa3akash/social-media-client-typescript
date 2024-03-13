import { IMessageData } from "@/interfaces/chat.interface";
import { store } from "@/store";
import {
  setConversation,
  setMessages,
} from "@/store/reducers/MessangerReducer";
import { Socket } from "socket.io-client";

// post
export class ChatSocket {
  static start(socket: Socket) {
    ChatSocket.init(socket);
  }

  static init(socket: Socket) {
    socket.on("message-received", (data: IMessageData) => {
      const messages = store.getState().messanger.messages;
      const selectedConversation =
        store.getState().messanger.selectedConversation;
      const check =
        selectedConversation?.senderId === data.senderId || data.receiverId;
      if (
        selectedConversation?.conversationId === data.conversationId ||
        check
      ) {
        store.dispatch(setMessages([...messages, data]));
      }
    });

    socket.on("chat-list", (data: IMessageData) => {
      const conversation = store.getState().messanger.conversations;
      const filterData = conversation.filter(
        (c) => c.conversationId !== data.conversationId
      );
      store.dispatch(setConversation([data, ...filterData]));
    });

    socket.on("chat-mark", (data) => {
      const { conversations, selectedConversation, messages } =
        store.getState().messanger;

      const updatedConversations = conversations.map((c) =>
        c.conversationId === data.conversationId ? { ...c, isRead: true } : c
      );

      store.dispatch(setConversation(updatedConversations));

      if (data.conversationId === selectedConversation?.conversationId) {
        const updatedMessges = messages.map((m) =>
          !m.isRead ? { ...m, isRead: true } : m
        );
        store.dispatch(setMessages(updatedMessges));
      }
    });
  }
}
