import { IUserDoc, IUserReactionDoc } from "@/interfaces/auth.interface";
import { storeKey } from "@/services/utils/keys";
import { Utils } from "@/services/utils/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUserDoc | null;
  userReaction: IUserReactionDoc[] | [];
  blocked: string[];
  following: string[];
  followers: string[];
  onlineUsers: string[];
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(storeKey.User) as string) || null,
  userReaction: [],
  blocked: [],
  followers: [],
  following: [],
  onlineUsers: [],
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
      const uniqueArray = Utils.uniqueArray([
        ...state.userReaction,
        ...action.payload,
      ]);
      state.userReaction = uniqueArray;
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },

    setLoginUserData: (
      state,
      action: PayloadAction<{
        following: string[];
        followers: string[];
        blocked: string[];
      }>,
    ) => {
      state.blocked = action.payload.blocked;
      state.followers = action.payload.followers;
      state.following = action.payload.following;
    },

    addUserReactions: (state, action: PayloadAction<IUserReactionDoc>) => {
      const findIndex = state.userReaction.findIndex(
        (p) => p.postId === action.payload.postId,
      )

      if (findIndex !== -1) {
        if(state.userReaction[findIndex].type === action.payload.type){
          state.userReaction = state.userReaction.filter(p=>p.postId !== action.payload.postId)
        }else{
          state.userReaction[findIndex] = {...state.userReaction[findIndex], ...action.payload}
        }
      }else{
        state.userReaction = [...state.userReaction, action.payload]
      }
    },

    addFollowing: (state, action: PayloadAction<{ id: string }>) => {
      state.following = [...new Set([action.payload.id, ...state.following])];
    },

    removeFollowing: (state, action: PayloadAction<{ id: string }>) => {
      state.following = state.following.filter(
        (id) => id !== action.payload.id,
      );
    },
  },
});

export const {
  setAuth,
  setUserReactions,
  addUserReactions,
  setLoginUserData,
  addFollowing,
  removeFollowing,
  setOnlineUsers,
} = AuthSlice.actions;

export default AuthSlice.reducer;
