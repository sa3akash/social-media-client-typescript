import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "@/store/reducers/AuthReducer";
import TostSlice from "@/store/reducers/TostReducer";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    tost: TostSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
