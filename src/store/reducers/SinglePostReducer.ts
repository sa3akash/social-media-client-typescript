import { IFeelings, IFiles, IPrivacy } from "@/interfaces/post.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SinglePostDoc {
  _id?: string;
  post?: string;
  bgColor?: string;
  files?: [] | IFiles[];
  feelings?: IFeelings | "";
  gifUrl?: string;
  privacy?: IPrivacy;
}

const initialState: SinglePostDoc = {
  _id: "",
  files: [],
  post: "",
  privacy: "Public",
  bgColor: "",
  feelings: "",
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

export const { updatePostItem, clearPost } = SinglePost.actions;
export default SinglePost.reducer;
