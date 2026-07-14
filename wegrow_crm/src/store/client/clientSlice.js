import {createSlice} from "@reduxjs/toolkit"
import {fetchClients, createClientThunk, updateClientThunk, deleteClientThunk} from "./clientThunks"
const clientSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.clients = []
        state.loading = false;
        state.error = action.payload;
      })
      //create client
      .addCase(createClientThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClientThunk.fulfilled, (state, action) => {
        state.clients.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update client
      .addCase(updateClientThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(updateClientThunk.fulfilled, (state, action) => {
        state.clients = state.clients.map((c)=> c.id===action.payload.id ? action.payload : c)
        state.loading = false;
      })
      .addCase(updateClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //delete client
      .addCase(deleteClientThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteClientThunk.fulfilled, (state, action) => {
        state.clients = state.clients.filter((c)=> c.id!==action.payload)
        state.loading = false;
      })
      .addCase(deleteClientThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const clientActions = clientSlice.actions;
export default clientSlice;