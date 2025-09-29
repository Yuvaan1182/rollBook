import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NavState {
  lastRoute: string | null;
}

const initialState: NavState = { lastRoute: null };

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
