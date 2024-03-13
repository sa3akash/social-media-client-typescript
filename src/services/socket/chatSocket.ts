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

    socket.on("chat-list-mark", (data: IMessageData) => {
      const conversation = store.getState().messanger.conversations;
      const index = conversation.findIndex(
        (c) => c.conversationId === data.conversationId
      );
      if (index !== -1) {
        const updatedConversation = {
          ...conversation[index],
          ...data,
        };

        const updatedConversations = [
          ...conversation.slice(0, index),
          updatedConversation,
          ...conversation.slice(index + 1),
        ];

        store.dispatch(setConversation(updatedConversations));
      }
    });

    // socket.on("message-mark", (data: IMessageData) => {
    //   const messages = store.getState().messanger.messages;
    //   const updated = messages.filter((c) => c._id !== data._id);

    //   store.dispatch(setMessages([...updated, data]));
    // });
  }
}
