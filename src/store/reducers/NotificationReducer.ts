import { INotification } from "@/interfaces/notificaton.interface";
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
      const data = [...state.notifications, ...action.payload.notifications];

      const uniqueArray = Array.from(new Set(data.map((obj) => obj._id))).map(
        (id) => {
          return data.find((obj) => obj._id === id);
        },
      ) as INotification[];

      // const uniqueArray = data.reduce((unique:INotification[], obj:INotification) => {
      //   return unique.some((item:INotification) => item._id === obj._id) ? unique : [...unique, obj];
      // }, []) as INotification[];

      state.notifications = uniqueArray;
      state.loading = false;
    },
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications = [action.payload, ...state.notifications];
    },

    updateAsReadNotification: (state, action: PayloadAction<string>) => {
      const findIndex = state.notifications.findIndex(
        (n) => n._id === action.payload,
      );
      if (findIndex !== -1) {
        state.notifications[findIndex] = {
          ...state.notifications[findIndex],
          read: true,
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNotification, addNotification, updateAsReadNotification } =
  NotificationSlice.actions;

export default NotificationSlice.reducer;
