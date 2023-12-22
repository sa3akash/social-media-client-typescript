import { IUserDoc } from "@/interfaces/auth.interface";
import { storeKey } from "@/services/utils/keys";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUserDoc | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem(storeKey.User) as string) || null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUserDoc | null>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
