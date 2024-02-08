import { socketService } from "@/services/socket/socket";
import { store } from "@/store";
import { setConversation } from "@/store/reducers/MessangerReducer";


// post
export class ChatSocket {
  static start() {
    ChatSocket.init();
  }

  static init() {
    socketService.socket.on("message-received", (data) => {

      // console.log('message data',data)
    });
    socketService.socket.on("chat-list", (data) => {
      const conversation = store.getState().messanger.conversations;

      if(conversation.some(c=>c.conversationId === data.conversationId)){
        const filterConversation = conversation.filter(c=>c.conversationId !== data.conversationId);
        store.dispatch(setConversation([data,...filterConversation]))
      }
    });
  }
}
