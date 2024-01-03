import { IPostDoc } from "@/interfaces/post.interface";
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
      const data = [...state.posts, ...action.payload.posts];

      const uniqueArray = Array.from(new Set(data.map((obj) => obj._id))).map(
        (id) => {
          return data.find((obj) => obj._id === id);
        }
      ) as IPostDoc[];
      state.posts = uniqueArray;
      state.loading = false;
    },
    addPost: (state, action: PayloadAction<IPostDoc>) => {
      state.posts = [action.payload, ...state.posts];
    },

    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((n) => n._id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPosts, addPost, deletePost } = PostsSlice.actions;

export default PostsSlice.reducer;
