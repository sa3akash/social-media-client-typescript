import { IMessageData } from "@/interfaces/chat.interface";
import { Utils } from "@/services/utils/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MessangerState {
  conversations: IMessageData[] | [];
  messages: IMessageData[] | [];
}

const initialState: MessangerState = {
  conversations: [],
  messages: [],
};

export const MessangerSlice = createSlice({
  name: "messanger",
  initialState,
  reducers: {
    setConversation: (state, action: PayloadAction<IMessageData[]>) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action: PayloadAction<IMessageData>) => {
      state.conversations = [action.payload, ...state.conversations];
    },
    setMessages: (state, action: PayloadAction<IMessageData[]>) => {
      state.messages = action.payload;
    },
    addMessages: (state, action: PayloadAction<IMessageData[]>) => {
      const uniqueArray = Utils.uniqueArray([
        ...action.payload,
        ...state.messages,
      ]);
      state.messages = uniqueArray;
    },
  },
});

export const {
  setConversation,
  addConversation,
  setMessages,
  addMessages,
} = MessangerSlice.actions;

export default MessangerSlice.reducer;
