import { config } from "@/config";
import { INotification } from "@/interfaces/notificaton.interface";
import { Socket, io } from "socket.io-client";

class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io(config.baseUrl, {
      transports: ["websocket"],
      secure: true,
    });
  }
  // start connection
  public setupSocketConnection() {
    this.socketConnectionEvents();
    this.reactionSocket();
  }

  // listen for events
  private socketConnectionEvents() {
    this.socket.on("connect", () => {
      console.log("connected = ", this.socket.id);
    });
    this.socket.on("disconnect", (reason: Socket.DisconnectReason) => {
      console.log(`Reason: ${reason}`);
      this.socket.connect();
    });

    this.socket.on("connect_error", (error:Error) => {
      console.log(`Error: ${error!.message}`);
      this.socket.connect();
    });
    
  }

  // reactions
  private reactionSocket(){
    this.socket.on("add-reaction", (data:INotification) => {
      console.log(data);
    });
  }
}

export const socketService: SocketService = new SocketService();
