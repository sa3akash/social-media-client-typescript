import { IUserDoc } from "@/interfaces/auth.interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModelType = "createPost" | "editPost";

interface ISelectedUser {
  user: IUserDoc;
  conversationId: string;
}
export interface ModelState {
  type: ModelType | null;
  isOpen: boolean;
  feelingsIsOpen: boolean;
  openFileDialog: boolean;
  openVideoDialog: boolean;
  gifModalIsOpen: boolean;
  reactionsModalIsOpen: boolean;
  commentsModalIsOpen: boolean;
  deleteDialogIsOpen: boolean;
  selectedUser: ISelectedUser | null;
}

const initialState: ModelState = {
  type: null,
  isOpen: false,
  feelingsIsOpen: false,
  openFileDialog: false,
  openVideoDialog: false,
  gifModalIsOpen: false,
  reactionsModalIsOpen: false,
  commentsModalIsOpen: false,
  deleteDialogIsOpen: false,
  selectedUser: null,
};

export const ModelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    openModel: (state, action: PayloadAction<{ type: ModelType }>) => {
      state.isOpen = true;
      state.type = action.payload.type;
    },
    closeModel: (state) => {
      (state.type = null),
        (state.isOpen = false),
        (state.feelingsIsOpen = false),
        (state.openFileDialog = false),
        (state.openVideoDialog = false),
        (state.gifModalIsOpen = false),
        (state.reactionsModalIsOpen = false),
        (state.commentsModalIsOpen = false),
        (state.deleteDialogIsOpen = false);
    },
    setSelectedUser: (state, action: PayloadAction<ISelectedUser | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModel, closeModel, setSelectedUser } = ModelSlice.actions;

export default ModelSlice.reducer;
