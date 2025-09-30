import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  lastRoute: string;
}

const initialState: NavState = { lastRoute: "" };

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setLastRoute: (state, action: PayloadAction<string>) => {
      state.lastRoute = action.payload;
    },
  },
});

export const { setLastRoute } = navigationSlice.actions;
export default navigationSlice.reducer;
