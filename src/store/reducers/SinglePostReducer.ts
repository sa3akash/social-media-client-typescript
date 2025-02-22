import { IFeelings, IFiles, IPrivacy } from "@/interfaces/post.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SinglePostDoc {
  _id?: string;
  post?: string;
  bgColor?: string;
  files?: [] | IFiles[];
  feelings?: IFeelings | "";
  gifUrl?: string;
  privacy?: IPrivacy;
  description?: string;
}

const initialState: SinglePostDoc = {
  _id: "",
  files: [],
  post: "",
  privacy: "Public",
  bgColor: "",
  feelings: "",
  description: "",
  gifUrl: "",
};

const SinglePost = createSlice({
  name: "SinglePost",
  initialState,
  reducers: {
    updatePostItem: (state, action: PayloadAction<SinglePostDoc>) => {
      for (const [key, value] of Object.entries(action.payload)) {
        state[key as keyof SinglePostDoc] = value;
      }
    },
    updateFilesItem: (state, action: PayloadAction<IFiles>) => {
      state.files = [...state.files!, action.payload];
    },
    updateRemoveItem: (state, action: PayloadAction<{name:string}>) => {
      state.files = state.files?.filter((item) => item.name !== action.payload.name);
    },
    clearPost: (state) => {
      (state.files = []),
        (state.post = ""),
        (state.privacy = "Public"),
        (state.bgColor = ""),
        (state.feelings = ""),
        (state.gifUrl = "");
    },
  },
});

export const { updatePostItem, clearPost,updateFilesItem,updateRemoveItem } = SinglePost.actions;
export default SinglePost.reducer;
