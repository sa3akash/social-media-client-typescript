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
    const deletePostSocket = (
      data: MainPostQueryType,
      key: string,
      postId: string
    ) => {
      const filteredPages = data.pages.map((item) => {
        const posts = item.posts.filter((item) => item._id !== postId);
        return {
          ...item,
          posts,
        };
      });
      queryClient.setQueryData([key], {
        ...data,
        pages: filteredPages,
      });
    };

    const updateSinglePost = (mainData:MainPostQueryType,data:IPostDoc,key:string) => {
      const filteredPages = mainData.pages.map((items) => {
        const updatedData = items.posts.map((item) =>
          item._id === data._id ? data : item
        );
        return {
          ...items,
          posts: updatedData,
        };
      });

      queryClient.setQueryData([key], {
        ...mainData,
        pages: filteredPages,
      });
    }

    const addSinglePost = (mainData:MainPostQueryType,data:IPostDoc,key:string) => {
      const filteredPages = mainData.pages.map((page) => {
        return {
          ...page,
          posts: [data, ...page.posts],
        };
      });
      queryClient.setQueryData([key], {
        ...mainData,
        pages: filteredPages,
      });
    }


    const postUpdate = (data: IPostDoc) => {
      const postCache = queryClient.getQueryData([
        "posts",
      ]) as MainPostQueryType;

      if (postCache) {
        updateSinglePost(postCache,data,"posts")
      }

      if (data.authId === user?.authId) {
        const postUpdateUser = queryClient.getQueryData([
          `posts/user/${data.authId}`,
        ]) as MainPostQueryType;

        if (postUpdateUser) {
          updateSinglePost(postUpdateUser,data,`posts/user/${data.authId}`)
        }
      }
    };

    socket?.on("delete-post", (postId: string) => {
      const postCache = queryClient.getQueryData([
        "posts",
      ]) as MainPostQueryType;

      if (postCache) {
        deletePostSocket(postCache, "posts", postId);
      }

      const postCacheUser = queryClient.getQueryData([
        `posts/user/${user?.authId}`,
      ]) as MainPostQueryType;

      if (postCacheUser) {
        deletePostSocket(postCacheUser, `posts/user/${user?.authId}`, postId);
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
          addSinglePost(postCache,newPost,"posts")
        }
      }

      if (newPost.creator.authId === user?.authId) {
        const postCacheUser = queryClient.getQueryData([
          `posts/user/${newPost.authId}`,
        ]) as MainPostQueryType;
        if (postCacheUser) {
          addSinglePost(postCacheUser,newPost,`posts/user/${newPost.authId}`)
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
