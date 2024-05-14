import { IFullUserDoc } from "@/interfaces/auth.interface";
import { IPostDoc } from "@/interfaces/post.interface";
import { MainPostQueryType } from "@/interfaces/reactQueryExtendedType";
import { QueryClient } from "@tanstack/react-query";

export class SocketUtils {
  constructor(private queryClient: QueryClient) {}

  public addPostCache(
    mainData: MainPostQueryType,
    data: IPostDoc,
    key: string,
    updateProfilePost?: boolean
  ) {
    const filteredPages = mainData.pages.map((page) => {
      return {
        ...page,
        posts: [data, ...page.posts],
      };
    });
    this.queryClient.setQueryData([key], {
      ...mainData,
      pages: filteredPages,
    });

    if (updateProfilePost) {
      const userDetails = this.queryClient.getQueryData([
        "profile",
        data.authId,
      ]) as IFullUserDoc;
      if (userDetails) {
        this.updateUserDetails({
          key: ["profile", data.authId],
          mainData: userDetails,
          updateFeild: { postsCount: +userDetails.postsCount + 1 },
        });
      }
    }
  }

  public updateUserDetails({
    mainData,
    updateFeild,
    key,
  }: {
    mainData: IFullUserDoc;
    updateFeild: Record<string, string | number>;
    key: string[];
  }) {
    this.queryClient.setQueryData(key, { ...mainData, ...updateFeild });
  }

  public deletePostCache(data: MainPostQueryType, key: string, postId: string) {
    const filteredPages = data.pages.map((item) => {
      const posts = item.posts.filter((item) => item._id !== postId);
      return {
        ...item,
        posts,
      };
    });
    this.queryClient.setQueryData([key], {
      ...data,
      pages: filteredPages,
    });
  }

  public updateSinglePostCache(
    mainData: MainPostQueryType,
    data: IPostDoc,
    key: string
  ) {
    const filteredPages = mainData.pages.map((items) => {
      const updatedData = items.posts.map((item) =>
        item._id === data._id ? data : item
      );
      return {
        ...items,
        posts: updatedData,
      };
    });

    this.queryClient.setQueryData([key], {
      ...mainData,
      pages: filteredPages,
    });
  }
}
