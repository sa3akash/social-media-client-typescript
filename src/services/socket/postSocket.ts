import { IPostDoc } from "@/interfaces/post.interface";
import { socketService } from "@/services/socket/socket";
import { store } from "@/store";
import { addPost } from "@/store/reducers/PostsReducer";

// post
export class PostSocket {
  static addPostSocket() {
    socketService.socket.on("add-post", (data: IPostDoc) => {
      store.dispatch(addPost(data));
    });
  }
}
