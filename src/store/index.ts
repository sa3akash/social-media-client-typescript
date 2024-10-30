import { configureStore,combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Default storage (localStorage)


import AuthSlice from "@/store/reducers/AuthReducer";
import NotificationSlice from "@/store/reducers/NotificationReducer";
import ModelSlice from "@/store/reducers/ModelReducer";
import SinglePost from "@/store/reducers/SinglePostReducer";
import api from "./rtk/BaseQuery";


// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,  // Uses localStorage by default
  whitelist: []
  // whitelist: [api.reducerPath]
};

// Combine your reducers
const rootReducer = combineReducers({

  auth: AuthSlice,
  notification: NotificationSlice,
  model: ModelSlice,
  SinglePost: SinglePost,
  [api.reducerPath]: api.reducer,  // RTK Query reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable this check for redux-persist
    }).concat(api.middleware),
});

// Persistor for the store
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
