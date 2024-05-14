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
import { IFullUserDoc } from "@/interfaces/auth.interface";
import { SocketUtils } from "./socketUtils";

const usePostSocket = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const socketUtils = new SocketUtils(queryClient);

  useEffect(() => {
    const postUpdate = (data: IPostDoc) => {
      const postCache = queryClient.getQueryData([
        "posts",
      ]) as MainPostQueryType;

      if (postCache) {
        socketUtils.updateSinglePostCache(postCache, data, "posts");
      }

      if (data.authId === user?.authId) {
        const postUpdateUser = queryClient.getQueryData([
          `posts/user/${data.authId}`,
        ]) as MainPostQueryType;

        if (postUpdateUser) {
          socketUtils.updateSinglePostCache(
            postUpdateUser,
            data,
            `posts/user/${data.authId}`
          );
        }
      }
    };

    socket?.on("delete-post", (postId: string, postCreator: string) => {
      const postCache = queryClient.getQueryData([
        "posts",
      ]) as MainPostQueryType;

      if (postCache) {
        socketUtils.deletePostCache(postCache, "posts", postId);
      }

      const postCacheUser = queryClient.getQueryData([
        `posts/user/${user?.authId}`,
      ]) as MainPostQueryType;

      if (postCacheUser) {
        socketUtils.deletePostCache(
          postCacheUser,
          `posts/user/${user?.authId}`,
          postId
        );
      }

      if (user?.authId === postCreator) {
        const userDetails = queryClient.getQueryData([
          "profile",
          postCreator,
        ]) as IFullUserDoc;
        if (userDetails) {
          socketUtils.updateUserDetails({
            key: ["profile", postCreator],
            mainData: userDetails,
            updateFeild: { postsCount: +userDetails.postsCount - 1 },
          });
        }
      }
    });

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
        if (postCache) {
          socketUtils.addPostCache(postCache, newPost, "posts");
        }
      }

      if (newPost.creator.authId === user?.authId) {
        const postCacheUser = queryClient.getQueryData([
          `posts/user/${newPost.authId}`,
        ]) as MainPostQueryType;
        if (postCacheUser) {
          socketUtils.addPostCache(
            postCacheUser,
            newPost,
            `posts/user/${newPost.authId}`,
            true
          );
        }
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
