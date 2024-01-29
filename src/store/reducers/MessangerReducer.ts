import { IMessageData } from "@/interfaces/chat.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MessangerState {
  conversations: IMessageData[] | [];
}

const initialState: MessangerState = {
  conversations: [],
};

export const MessangerSlice = createSlice({
  name: "messanger",
  initialState,
  reducers: {
    setConversation: (state, action: PayloadAction<IMessageData[]>) => {
      state.conversations = action.payload
    },
  },
});

export const {
  setConversation,
} = MessangerSlice.actions;

export default MessangerSlice.reducer;
