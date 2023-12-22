import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  type: "success" | "error" | "worning" | null;
  message: string | null;
}

const initialState: AuthState = {
  type: null,
  message: null,
};

export const TostSlice = createSlice({
  name: "tost",
  initialState,
  reducers: {
    setTost: (state, action: PayloadAction<AuthState>) => {
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTost } = TostSlice.actions;

export default TostSlice.reducer;
