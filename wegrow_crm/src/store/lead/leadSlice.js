import { createSlice } from "@reduxjs/toolkit";
import {deleteLeadThunk, fetchLeads, addLeadThunk, updateLeadThunk} from "./leadThunks";
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
      })
      //delete lead
      .addCase(deleteLeadThunk.pending, (state)=>{
        state.loading = true
      })
      .addCase(deleteLeadThunk.fulfilled, (state, action)=>{
        state.loading = false
        state.leads = state.leads.filter((lead)=> lead.id !== action.payload)
      })
      .addCase(deleteLeadThunk.rejected, (state, action)=>{
        state.loading = false
        state.error = action.error.message
      })
      //add lead
      .addCase(addLeadThunk.pending, (state)=>{
        state.loading = true
      })
      .addCase(addLeadThunk.fulfilled, (state, action)=>{
        state.leads.unshift(action.payload);
        state.loading = false
      })
      .addCase(addLeadThunk.rejected, (state, action)=>{
        state.loading = false
        state.error = action.error.message
      })
      //update lead
      .addCase(updateLeadThunk.pending, (state)=>{
        state.loading = true
      })
      .addCase(updateLeadThunk.fulfilled, (state, action)=>{
        state.loading = false
        state.leads = state.leads.map((lead)=> lead.id === action.payload.id ? action.payload : lead)
      })
      .addCase(updateLeadThunk.rejected, (state, action)=>{
        state.loading = false
        state.error = action.error.message
      })
  },
});

export const leadActions = leadSlice.actions
export default leadSlice;
