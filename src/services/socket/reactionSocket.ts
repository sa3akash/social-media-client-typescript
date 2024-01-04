import { IPostDoc } from "@/interfaces/post.interface";
import { socketService } from "@/services/socket/socket";
import { store } from "@/store";
import { updatePost } from "@/store/reducers/PostsReducer";

// post
export class ReactionSocket {
  static start() {
    ReactionSocket.updateReactionSocket();
  }
  static updateReactionSocket() {
    socketService.socket.on("update-reaction", (data: IPostDoc) => {
      store.dispatch(updatePost(data));
    });
  }
}
