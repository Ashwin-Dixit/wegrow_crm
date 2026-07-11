import {createSlice} from "@reduxjs/toolkit"
import {fetchClients, createClientThunk} from "./clientThunks"
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
  },
});

export const clientActions = clientSlice.actions;
export default clientSlice;