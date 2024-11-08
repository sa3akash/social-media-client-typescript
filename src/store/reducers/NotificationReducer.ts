import { IUserDoc } from "@/interfaces/auth.interface";
import { INotification } from "@/interfaces/notificaton.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CallUserProps {
  type: "audio" | "video";
  isCalling: boolean;
  isConnected: boolean;
  userData: IUserDoc;
  initiator: boolean;
}

export interface NotificationState {
  notifications: INotification[] | [];
  callUser: CallUserProps | null;
}

const initialState: NotificationState = {
  notifications: [],
  callUser: null,
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetNotifications: (state) => {
      state.notifications = initialState.notifications;
    },

    setCallUser: (state, action: PayloadAction<CallUserProps | null>) => {
      state.callUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetNotifications, setCallUser } = NotificationSlice.actions;

export default NotificationSlice.reducer;
