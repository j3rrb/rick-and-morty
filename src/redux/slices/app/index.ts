import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
  },
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
