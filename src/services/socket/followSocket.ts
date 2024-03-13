import { store } from "@/store";
import { addFollowing, removeFollowing } from "@/store/reducers/AuthReducer";
import { Socket } from "socket.io-client";

// post
export class FollowSocket {
  static start(socket:Socket) {
    FollowSocket.init(socket);
  }

  static init(socket:Socket) {
    socket.on("add-follow", ({ id, to }) => {
      const { user } = store.getState().auth;
      if (user?.authId === to) {
        store.dispatch(addFollowing({ id }));
      }
    });
    socket.on("remove-follow", ({ id, to }) => {
      const { user } = store.getState().auth;
      if (user?.authId === to) {
        store.dispatch(removeFollowing({ id }));
      }
    });
  }
}
