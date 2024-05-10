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
      store.dispatch(setMessages([...messages, data]));
    });

    socket.on("chat-list", (data: IMessageData) => {
      const conversation = store.getState().messanger.conversations;
      const filterData = conversation.filter(
        (c) => c.conversationId !== data.conversationId,
      );
      store.dispatch(setConversation([data, ...filterData]));
    });
  }
}
