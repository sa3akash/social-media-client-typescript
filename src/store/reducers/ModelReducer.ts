import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModelType = "createPost";

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

    toggleImageModal: (state, action: PayloadAction<boolean>) => {
      state.openFileDialog = action.payload;
    },
    toggleVideoModal: (state, action: PayloadAction<boolean>) => {
      state.openVideoDialog = action.payload;
    },
    toggleFeelingModal: (state, action: PayloadAction<boolean>) => {
      state.feelingsIsOpen = action.payload;
    },
    toggleGifModal: (state, action: PayloadAction<boolean>) => {
      state.gifModalIsOpen = action.payload;
    },
    toggleReactionsModal: (state, action: PayloadAction<boolean>) => {
      state.reactionsModalIsOpen = action.payload;
    },
    toggleCommentsModal: (state, action: PayloadAction<boolean>) => {
      state.commentsModalIsOpen = action.payload;
    },
    toggleDeleteDialog: (state, action: PayloadAction<{ toggle: boolean }>) => {
      const { toggle } = action.payload;
      state.deleteDialogIsOpen = toggle;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openModel,
  closeModel,
  toggleImageModal,
  toggleVideoModal,
  toggleFeelingModal,
  toggleGifModal,
  toggleReactionsModal,
  toggleCommentsModal,
  toggleDeleteDialog,
} = ModelSlice.actions;

export default ModelSlice.reducer;
