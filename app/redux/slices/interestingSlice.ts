import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api";

export const fetchInteresting = createAsyncThunk(
  "interesting/fetch",
  async () => {
    const response = await api.get("/interesting");
    return response.data.data;
  }
);

interface interestingStateInterface {
  items: Interesting[];
  isLoading: boolean;
}

const initialState = <interestingStateInterface>{
  items: [],
  isLoading: false,
};

const interestingSlice = createSlice({
  name: "interesting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInteresting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInteresting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchInteresting.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default interestingSlice.reducer;
