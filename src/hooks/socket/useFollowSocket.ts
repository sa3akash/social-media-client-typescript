import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { addFollowers } from "@/store/reducers/AuthReducer";

const useFollowSocket = () => {
  const { socket } = useSocket();

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    socket?.on("add-follow", ({ id, to }) => {
      if (user?.authId === to) {
        dispatch(addFollowers(id));
      }
    });
    socket?.on("remove-follow", ({ id, to }) => {
      if (user?.authId === to) {
        dispatch(addFollowers(id));
      }
    });

    return () => {
      socket?.off("add-follow");
      socket?.off("remove-follow");
    };
  }, [dispatch, socket, user?.authId]);
};
export default useFollowSocket;
