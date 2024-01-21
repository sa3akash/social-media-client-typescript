import { IPostDoc } from "@/interfaces/post.interface";
import { socketService } from "@/services/socket/socket";
import { store } from "@/store";
import {
  addUserReactions,
  deleteUserReactions,
} from "@/store/reducers/AuthReducer";
import { addPost, deletePost, updatePost } from "@/store/reducers/PostsReducer";
import { UserUtils } from "@/services/utils/userUtils";

// post
export class PostSocket {
  static start() {
    PostSocket.addPostSocket();
    PostSocket.updateReactionSocket();
    PostSocket.updateCommentSocket();
    PostSocket.updatePostSocket();
  }

  static addPostSocket() {
    socketService.socket.on("add-post", (data: IPostDoc) => {
      if (UserUtils.checkPrivacyPost(data)) {
        store.dispatch(addPost(data));
      }
    });
  }

  static updateReactionSocket() {
    socketService.socket.on(
      "update-reaction",
      ({ type, updatedPost, reactionDoc }) => {
        const { user } = store.getState().auth;
        store.dispatch(updatePost(updatedPost));

        if (reactionDoc?.authId === user?.authId) {
          type === "add"
            ? store.dispatch(addUserReactions(reactionDoc))
            : store.dispatch(deleteUserReactions(reactionDoc.postId));
        }
      }
    );
  }

  static updateCommentSocket() {
    socketService.socket.on("update-comment", (data: IPostDoc) => {
      // console.log(data)
      store.dispatch(updatePost(data));
    });
  }

  static updatePostSocket() {
    socketService.socket.on("update-post", (data: IPostDoc) => {
      store.dispatch(updatePost(data));
    });

    socketService.socket.on("delete-post", (postId: string) => {
      store.dispatch(deletePost(postId));
    });
  }
}
