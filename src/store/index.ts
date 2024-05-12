import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@/store/reducers/AuthReducer";
import NotificationSlice from "@/store/reducers/NotificationReducer";
import ModelSlice from "@/store/reducers/ModelReducer";
import SinglePost from "@/store/reducers/SinglePostReducer";
import MessangerSlice from "@/store/reducers/MessangerReducer";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    notification: NotificationSlice,
    model: ModelSlice,
    SinglePost: SinglePost,
    messanger: MessangerSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
