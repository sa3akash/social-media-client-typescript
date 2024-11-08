import { configureStore, combineReducers } from "@reduxjs/toolkit";

import AuthSlice from "@/store/reducers/AuthReducer";
import NotificationSlice from "@/store/reducers/NotificationReducer";
import ModelSlice from "@/store/reducers/ModelReducer";
import SinglePost from "@/store/reducers/SinglePostReducer";
import api from "./rtk/BaseQuery";

// Combine your reducers
const rootReducer = combineReducers({
  auth: AuthSlice,
  notification: NotificationSlice,
  model: ModelSlice,
  SinglePost: SinglePost,
  [api.reducerPath]: api.reducer, // RTK Query reducer
});

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this check for redux-persist
    }).concat(api.middleware),
});

// Persistor for the store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
