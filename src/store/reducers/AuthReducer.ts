import { IUserDoc, IUserReactionDoc } from "@/interfaces/auth.interface";
import { storeKey } from "@/services/utils/keys";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUserDoc | null;
  userReaction: IUserReactionDoc[] | [];
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(storeKey.User) as string) || null,
  userReaction: [],
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUserDoc | null>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
    setUserReactions: (state, action: PayloadAction<IUserReactionDoc[]>) => {
      state.userReaction = action.payload;
    },

    addUserReactions: (state, action: PayloadAction<IUserReactionDoc>) => {
      state.userReaction = [
        ...new Set([action.payload, ...state.userReaction]),
      ];
    },

    deleteUserReactions: (state, action: PayloadAction<string>) => {
      state.userReaction = state.userReaction.filter(
        (p) => p.postId !== action.payload
      );
    },
  },
});

export const {
  setAuth,
  setUserReactions,
  addUserReactions,
  deleteUserReactions,
} = AuthSlice.actions;

export default AuthSlice.reducer;
