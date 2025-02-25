import { IPostDoc } from "@/interfaces/post.interface";
import { postsApi } from "./getPostSlice";

export const posts = {
  addPost: (post: IPostDoc) => {
    return postsApi.util.updateQueryData("getPaginatedPosts", {}, (draft) => {
      draft.posts = [post, ...draft.posts];
    });
  },

  update: (id: string, newPost: IPostDoc) => {
    return postsApi.util.updateQueryData(
      "getPaginatedPosts",
      { type: "Post", id: "LIST" },
      (draft) => {
        const index = draft.posts.findIndex(
          (post: IPostDoc) => post._id === id
        );
        if (index !== -1) {
          draft.posts[index] = newPost;
        }
      }
    );
  },
  updateVideo: (id: string, newPost: IPostDoc) => {
    return postsApi.util.updateQueryData(
      "getPaginatedVideoPosts",
      { type: "Post", id: "LIST" },
      (draft) => {
        const index = draft.postWithVideos.findIndex(
          (post: IPostDoc) => post._id === id
        );
        if (index !== -1) {
          draft.postWithVideos[index] = newPost;
        }
      }
    );
  },
  updatePhoto: (id: string, newPost: IPostDoc) => {
    return postsApi.util.updateQueryData(
      "getPaginatedImagePosts",
      { type: "Post", id: "LIST" },
      (draft) => {
        const index = draft.postWithImages.findIndex(
          (post: IPostDoc) => post._id === id
        );
        if (index !== -1) {
          draft.postWithImages[index] = newPost;
        }
      }
    );
  },

  delete: (id: string) => {
    return postsApi.util.updateQueryData("getPaginatedPosts", {}, (draft) => {
      // Remove the post from the cache
      const index = draft.posts.findIndex((p: IPostDoc) => p._id === id);
      if (index !== -1) {
        draft.posts.splice(index, 1);
      }
    });
  },
};

export const postsUser = {
  addPost: (post: IPostDoc) => {
    return postsApi.util.updateQueryData(
      "getPaginatedUserPosts",
      { authId: post.creator.authId, page: 1 }, // Ensure correct args are passed
      (draft) => {
        draft.posts = [post, ...draft.posts];
      }
    );
  },

  update: (id: string, post: IPostDoc) => {
    return postsApi.util.updateQueryData(
      "getPaginatedUserPosts",
      { authId: post?.authId },
      (draft) => {
        const index = draft.posts.findIndex(
          (post: IPostDoc) => post._id === id
        );

        if (index !== -1) {
          draft.posts[index] = post;
        }
      }
    );
  },
  updateImage: (id: string, post: IPostDoc) => {
    return postsApi.util.updateQueryData(
      "getPaginatedImagePosts",
      { authId: post?.authId },
      (draft) => {
        const index = draft.posts.findIndex(
          (post: IPostDoc) => post._id === id
        );

        if (index !== -1) {
          draft.posts[index] = post;
        }
      }
    );
  },
  updateVideo: (id: string, post: IPostDoc) => {
    return postsApi.util.updateQueryData(
      "getPaginatedVideoPosts",
      { authId: post?.authId },
      (draft) => {
        const index = draft.posts.findIndex(
          (post: IPostDoc) => post._id === id
        );

        if (index !== -1) {
          draft.posts[index] = post;
        }
      }
    );
  },

  updateDelete: (id: string, post: IPostDoc) => {
    return postsApi.util.updateQueryData(
      "getPaginatedUserPosts",
      { authId: post?.authId },
      (draft) => {
        const index = draft.posts.findIndex(
          (post: IPostDoc) => post._id === id
        );

        if (index !== -1) {
          draft.posts[index] = post;
        }
      }
    );
  },

  delete: (id: string, authId: string) => {
    return postsApi.util.updateQueryData(
      "getPaginatedUserPosts",
      { authId: authId }, // Ensure correct args are passed
      (draft) => {
        const index = draft.posts.findIndex((p: IPostDoc) => p._id === id);
        if (index !== -1) {
          draft.posts.splice(index, 1);
        }
      }
    );
  },
  deleteImagePost: (id: string, authId: string) => {
    return postsApi.util.updateQueryData(
      "getPaginatedImagePosts",
      { authId: authId }, // Ensure correct args are passed
      (draft) => {
        const index = draft.posts.findIndex((p: IPostDoc) => p._id === id);
        if (index !== -1) {
          draft.posts.splice(index, 1);
        }
      }
    );
  },
  deleteVideoPost: (id: string, authId: string) => {
    return postsApi.util.updateQueryData(
      "getPaginatedVideoPosts",
      { authId: authId }, // Ensure correct args are passed
      (draft) => {
        const index = draft.posts.findIndex((p: IPostDoc) => p._id === id);
        if (index !== -1) {
          draft.posts.splice(index, 1);
        }
      }
    );
  },
};
