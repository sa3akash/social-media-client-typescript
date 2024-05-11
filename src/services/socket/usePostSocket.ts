import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { MainPostQueryType } from "@/interfaces/reactQueryExtendedType";
import { IPostDoc } from "@/interfaces/post.interface";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserReactions,
  deleteUserReactions,
} from "@/store/reducers/AuthReducer";
import { UserUtils } from "@/services/utils/userUtils";

const usePostSocket = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    socket?.on("delete-post", (postId: string) => {
      const postCache = queryClient.getQueryData([
        "posts",
      ]) as MainPostQueryType;
      const filteredPages = postCache.pages.map((item) => {
        const posts = item.posts.filter((item) => item._id !== postId);
        return {
          ...item,
          posts,
        };
      });
      queryClient.setQueryData(["posts"], {
        ...postCache,
        pages: filteredPages,
      });
    });

    const postUpdate = (data: IPostDoc) => {
      const postCache = queryClient.getQueryData([
        "posts",
      ]) as MainPostQueryType;
      const filteredPages = postCache.pages.map((items) => {
        const updatedData = items.posts.map((item) =>
          item._id === data._id ? data : item
        );
        return {
          ...items,
          posts: updatedData,
        };
      });
      queryClient.setQueryData(["posts"], {
        ...postCache,
        pages: filteredPages,
      });
    };

    socket?.on("update-post", postUpdate);
    socket?.on("update-comment", postUpdate);
    socket?.on("update-reaction", ({ type, updatedPost, reactionDoc }) => {
      postUpdate(updatedPost);
      if (reactionDoc?.authId === user?.authId) {
        type === "add"
          ? dispatch(addUserReactions(reactionDoc))
          : dispatch(deleteUserReactions(reactionDoc.postId));
      }
    });

    socket?.on("add-post", (newPost: IPostDoc) => {
      if (UserUtils.checkPrivacyPost(newPost)) {
        const postCache = queryClient.getQueryData([
          "posts",
        ]) as MainPostQueryType;
        const filteredPages = postCache.pages.map((page) => {
          if (page.currentPage === 1) {
            return {
              ...page,
              posts: [newPost, ...page.posts],
            };
          }
        });
        queryClient.setQueryData(["posts"], {
          ...postCache,
          pages: filteredPages,
        });
      }
    });

    return () => {
      socket?.off("delete-post");
      socket?.off("update-post");
      socket?.off("update-comment");
      socket?.off("update-reaction");
      socket?.off("add-post");
    };
  }, [dispatch, queryClient, socket, user?.authId]);
};
export default usePostSocket;
