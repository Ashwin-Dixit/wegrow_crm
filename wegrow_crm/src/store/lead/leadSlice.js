import { createSlice } from "@reduxjs/toolkit";
import {fetchLeads} from "./leadThunks";
const leadSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.leads = []
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const leadActions = leadSlice.actions
export default leadSlice;
