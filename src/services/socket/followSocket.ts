import { socketService } from "@/services/socket/socket";
import { store } from "@/store";
import { addFollowing, removeFollowing } from "@/store/reducers/AuthReducer";

// post
export class FollowSocket {
  static start() {
    FollowSocket.init();
  }

  static init() {
    socketService.socket.on("add-follow", ({ id, to }) => {
      const { user } = store.getState().auth;
      if (user?.authId === to) {
        store.dispatch(addFollowing({ id }));
      }
    });
    socketService.socket.on("remove-follow", ({ id, to }) => {
      const { user } = store.getState().auth;
      if (user?.authId === to) {
        store.dispatch(removeFollowing({ id }));
      }
    });
  }
}
