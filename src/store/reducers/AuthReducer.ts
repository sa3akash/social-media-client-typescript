import { IUserDoc } from "@/interfaces/auth.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: IUserDoc | null;
}

const initialState: AuthState = {
  user: null,
};

export const AuthSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUserDoc>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth } = AuthSlice.actions;

export default AuthSlice.reducer;
