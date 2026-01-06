import { createSlice } from "@reduxjs/toolkit";

interface SearchModalState {
  isOpen: boolean;
}

const initialState: SearchModalState = {
  isOpen: false,
};

const searchModalSlice = createSlice({
  name: "searchModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openModal, closeModal, toggleModal } = searchModalSlice.actions;

export default searchModalSlice.reducer;
