import { INotification } from "@/interfaces/notificaton.interface";
import { Utils } from "@/services/utils/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface NotificationState {
  notifications: INotification[] | [];
  loading?: boolean;
}

const initialState: NotificationState = {
  notifications: [],
  loading: true,
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotificationState>) => {
      // const uniqueArray = data.reduce((unique:INotification[], obj:INotification) => {
      //   return unique.some((item:INotification) => item._id === obj._id) ? unique : [...unique, obj];
      // }, []) as INotification[];

      const uniqueArray = Utils.uniqueArray([
        ...state.notifications,
        ...action.payload.notifications,
      ]);
      state.notifications = uniqueArray;
      state.loading = false;
    },
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications = [action.payload, ...state.notifications];
    },

    updateAsReadNotification: (state, action: PayloadAction<string>) => {
      const findIndex = state.notifications.findIndex(
        (n) => n._id === action.payload
      );
      if (findIndex !== -1) {
        state.notifications[findIndex] = {
          ...state.notifications[findIndex],
          read: true,
        };
      }
    },

    deleteNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      );
    },
    resetNotifications: (state) => {
      state.loading = initialState.loading;
      state.notifications = initialState.notifications;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setNotification,
  addNotification,
  updateAsReadNotification,
  deleteNotification,
  resetNotifications,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;
