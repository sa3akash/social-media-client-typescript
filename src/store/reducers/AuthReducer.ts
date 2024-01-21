import { IUserDoc, IUserReactionDoc } from "@/interfaces/auth.interface";
import { storeKey } from "@/services/utils/keys";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUserDoc | null;
  userReaction: IUserReactionDoc[] | [];
  blocked: string[];
  following: string[];
  followers: string[];
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(storeKey.User) as string) || null,
  userReaction: [],
  blocked: [],
  followers: [],
  following: [],
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

    setLoginUserData: (
      state,
      action: PayloadAction<{
        following: string[];
        followers: string[];
        blocked: string[];
      }>
    ) => {
      state.blocked = action.payload.blocked;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },

    addUserReactions: (state, action: PayloadAction<IUserReactionDoc>) => {
      state.userReaction = [
        ...new Set([action.payload, ...state.userReaction]),
      ];
    },

    addFollowing: (state, action: PayloadAction<{id:string}>) => {
      state.following = [
        ...new Set([action.payload.id, ...state.following]),
      ];
    },

    removeFollowing: (state, action: PayloadAction<{id:string}>) => {
      state.following = state.following.filter(id=>id !== action.payload.id);
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
  setLoginUserData,
  addFollowing,
  removeFollowing,
} = AuthSlice.actions;

export default AuthSlice.reducer;
