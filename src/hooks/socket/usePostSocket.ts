import { useSocket } from "@/hooks/useSocket";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiPostsSlice } from "@/store/rtk/post/getPostSlice";
import { IPostDoc } from "@/interfaces/post.interface";

const usePostSocket = () => {
  const { socket } = useSocket();
  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    socket?.on("add-post", (newPost: IPostDoc) => {
      dispatch(
        apiPostsSlice.util.updateQueryData("getPaginatedPosts", 1, (draft) => {
          if (user?.authId !== newPost.creator.authId) {
            draft.posts.unshift(newPost);
          }
        })
      );
    });

    socket?.on("update-post", (newPost: IPostDoc) => {
      dispatch(
        apiPostsSlice.util.updateQueryData("getPaginatedPosts", 1, (draft) => {
          if (user?.authId !== newPost.creator.authId) {
            const index = draft.posts.findIndex(
              (post) => post._id === newPost._id
            );
            if (index !== -1) {
              draft.posts[index] = newPost;
            }
          }
        })
      );
    });

    socket?.on("updated-post", (newPost: IPostDoc) => {
      dispatch(
        apiPostsSlice.util.updateQueryData("getPaginatedPosts", 1, (draft) => {
            const index = draft.posts.findIndex(
              (post) => post._id === newPost._id
            );
            if (index !== -1) {
              draft.posts[index] = newPost;
            }
          
        })
      );
    });
    socket?.on("update-comment", (newPost: IPostDoc,id:string) => {
      dispatch(
        apiPostsSlice.util.updateQueryData("getPaginatedPosts", 1, (draft) => {
          if (user?.authId !== id) {
            const index = draft.posts.findIndex(
              (post) => post._id === newPost._id
            );
            if (index !== -1) {
              draft.posts[index] = newPost;
            }
          }
          
        })
      );
    });

    socket?.on("delete-post", (postId: string, creatorId: string) => {
      dispatch(
        apiPostsSlice.util.updateQueryData("getPaginatedPosts", 1, (draft) => {
          if (user?.authId !== creatorId) {
            const index = draft.posts.findIndex((p) => p._id === postId);
            if (index !== -1) {
              draft.posts.splice(index, 1);
            }
          }
        })
      );
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
