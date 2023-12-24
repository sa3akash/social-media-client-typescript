import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModelType = "createPost";

export interface ModelState {
  type: ModelType | null;
  isOpen: boolean;
  feeling: string;
  image: string;
  data: [] | null;
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
  feeling: "",
  image: "",
  data: null,
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
    openModel: (
      state,
      action: PayloadAction<{ type: ModelType; data: [] }>
    ) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data;
    },
    closeModel: (state) => {
      (state.type = null),
        (state.isOpen = false),
        (state.feeling = ""),
        (state.image = ""),
        (state.data = null),
        (state.feelingsIsOpen = false),
        (state.openFileDialog = false),
        (state.openVideoDialog = false),
        (state.gifModalIsOpen = false),
        (state.reactionsModalIsOpen = false),
        (state.commentsModalIsOpen = false),
        (state.deleteDialogIsOpen = false);
    },
    addPostFeeling: (state, action: PayloadAction<string>) => {
      state.feeling = action.payload;
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
    toggleDeleteDialog: (
      state,
      action: PayloadAction<{ toggle: boolean; data: [] }>
    ) => {
      const { toggle, data } = action.payload;
      state.deleteDialogIsOpen = toggle;
      state.data = data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openModel,
  closeModel,
  addPostFeeling,
  toggleImageModal,
  toggleVideoModal,
  toggleFeelingModal,
  toggleGifModal,
  toggleReactionsModal,
  toggleCommentsModal,
  toggleDeleteDialog,
} = ModelSlice.actions;

export default ModelSlice.reducer;
