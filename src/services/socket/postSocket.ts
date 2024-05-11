import { IPostDoc } from "@/interfaces/post.interface";
import { store } from "@/store";
import {
  addUserReactions,
  deleteUserReactions,
} from "@/store/reducers/AuthReducer";
import { addPost, updatePost } from "@/store/reducers/PostsReducer";
import { UserUtils } from "@/services/utils/userUtils";
import { Socket } from "socket.io-client";

// post
export class PostSocket {
  static start(socket: Socket) {
    PostSocket.addPostSocket(socket);
    PostSocket.updateReactionSocket(socket);
    PostSocket.updateCommentSocket(socket);
    PostSocket.updatePostSocket(socket);
  }

  static addPostSocket(socket: Socket) {
    socket.on("add-post", (data: IPostDoc) => {
      if (UserUtils.checkPrivacyPost(data)) {
        store.dispatch(addPost(data));
      }
    });
  }

  static updateReactionSocket(socket: Socket) {
    socket.on("update-reaction", ({ type, updatedPost, reactionDoc }) => {
      const { user } = store.getState().auth;

      store.dispatch(updatePost(updatedPost));

      if (reactionDoc?.authId === user?.authId) {
        type === "add"
          ? store.dispatch(addUserReactions(reactionDoc))
          : store.dispatch(deleteUserReactions(reactionDoc.postId));
      }
    });
  }

  static updateCommentSocket(socket: Socket) {
    socket.on("update-comment", (data: IPostDoc) => {
      // console.log(data)
      store.dispatch(updatePost(data));
    });
  }

  static updatePostSocket(socket: Socket) {
    socket.on("update-post", (data: IPostDoc) => {
      store.dispatch(updatePost(data));
    });

    // socket.on("delete-post", (postId: string) => {
    //   store.dispatch(deletePost(postId));
    // });
  }
}
