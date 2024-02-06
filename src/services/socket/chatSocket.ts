import { socketService } from "@/services/socket/socket";


// post
export class ChatSocket {
  static start() {
    ChatSocket.init();
  }

  static init() {
    socketService.socket.on("message-received", (data) => {
      console.log('message data',data)
    });
    socketService.socket.on("chat-list", (data) => {
      console.log('conversation data',data)
    });
  }
}
