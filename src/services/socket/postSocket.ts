import { IPostDoc } from "@/interfaces/post.interface";
import { socketService } from "@/services/socket/socket";
import { store } from "@/store";
import {
  addUserReactions,
  deleteUserReactions,
} from "@/store/reducers/AuthReducer";
import { addPost, updatePost } from "@/store/reducers/PostsReducer";

// post
export class PostSocket {
  static start() {
    PostSocket.addPostSocket();
    PostSocket.updateReactionSocket();
    PostSocket.updateCommentSocket();
  }

  static addPostSocket() {
    socketService.socket.on("add-post", (data: IPostDoc) => {
      store.dispatch(addPost(data));
    });
  }

  static updateReactionSocket() {
    socketService.socket.on(
      "update-reaction",
      ({ type, updatedPost, reactionDoc }) => {
        const { user } = store.getState().auth;
        store.dispatch(updatePost(updatedPost));

        if (reactionDoc?.authId === user?._id) {
          type === "add"
            ? store.dispatch(addUserReactions(reactionDoc))
            : store.dispatch(deleteUserReactions(reactionDoc.postId));
        }
      }
    );
  }

  static updateCommentSocket() {
    socketService.socket.on("update-comment", (data: IPostDoc) => {
      store.dispatch(updatePost(data));
    });
  }
}
