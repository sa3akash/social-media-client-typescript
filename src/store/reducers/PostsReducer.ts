import { IPostDoc } from "@/interfaces/post.interface";
import { Utils } from "@/services/utils/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PostsState {
  posts: IPostDoc[] | [];
  loading?: boolean;
}

const initialState: PostsState = {
  posts: [],
  loading: true,
};

export const PostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostsState>) => {
      const uniqueArray = Utils.uniqueArray([
        ...state.posts,
        ...action.payload.posts,
      ]);
      state.posts = uniqueArray;
      state.loading = false;
    },
    addPost: (state, action: PayloadAction<IPostDoc>) => {
      state.posts = [action.payload, ...state.posts];
    },

    updatePost: (state, action: PayloadAction<IPostDoc>) => {
      const postIndex = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (postIndex > -1) {
        state.posts[postIndex] = action.payload;
      }
    },

    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((n) => n._id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosts, addPost, updatePost, deletePost } = PostsSlice.actions;

export default PostsSlice.reducer;
