import { useSocket } from "@/hooks/useSocket";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IPostDoc } from "@/interfaces/post.interface";
import { posts } from "@/store/rtk/post/helpers";

const usePostSocket = () => {
  const { socket } = useSocket();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    socket?.on("add-post", (newPost: IPostDoc) => {
      if (user?.authId !== newPost.creator.authId) {
        dispatch(posts.addPost(newPost));
      }
    });

    socket?.on("update-post", (newPost: IPostDoc) => {
      if (user?.authId !== newPost.creator.authId) {
        dispatch(posts.update(newPost._id, newPost));
      }
    });

    socket?.on("updated-post", (newPost: IPostDoc) => {
      dispatch(posts.update(newPost._id, newPost));
    });

    socket?.on("update-comment", (newPost: IPostDoc, id: string) => {
      if (user?.authId !== id) {
        dispatch(posts.update(newPost._id, newPost));
      }
    });

    socket?.on("delete-post", (postId: string, creatorId: string) => {
      if (user?.authId !== creatorId) {
        dispatch(posts.delete(postId));
      }
    });

    return () => {
      socket?.off("add-post");
      socket?.off("update-post");
      socket?.off("delete-post");
      socket?.off("updated-post");
      socket?.off("update-comment");
    };
  }, [dispatch, socket, user?.authId]);
};

export default usePostSocket;
