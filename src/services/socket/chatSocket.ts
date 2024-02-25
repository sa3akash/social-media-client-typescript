import { IMessageData } from "@/interfaces/chat.interface";
import { socketService } from "@/services/socket/socket";
import { store } from "@/store";
import {
  setConversation,
  setMessages,
} from "@/store/reducers/MessangerReducer";

// post
export class ChatSocket {
  static start() {
    ChatSocket.init();
  }

  static init() {
    socketService.socket.on("message-received", (data: IMessageData) => {
      const user = store.getState().auth.user;
      const messages = store.getState().messanger.messages;

      if (user?.authId === data.senderId || user?.authId === data.receiverId) {
        store.dispatch(setMessages([...messages, data]));
      }
    });
    socketService.socket.on("chat-list", (data: IMessageData) => {
      const user = store.getState().auth.user;
      const conversation = store.getState().messanger.conversations;

      if (user?.authId === data.senderId || user?.authId === data.receiverId) {
      const filterData = conversation.filter(
        (c) => c.conversationId !== data.conversationId,
      );
      store.dispatch(setConversation([data, ...filterData]));
      }
    });

  }

  static JoinRoomEmit(senderId:string,receiverId:string){
    socketService.socket.emit('join-room',{senderId,receiverId})
  }

  static JoinRoomOff(){
    socketService.socket.off('join-room')
  }
}
