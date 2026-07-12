import { createSlice } from "@reduxjs/toolkit";
import { fetchNotificationsAsync, markNotificationsReadAsync } from "./notificationThunk";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    readNotifications: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //notification read
      .addCase(markNotificationsReadAsync.pending,(state)=>{
        state.loading=true
      })
      .addCase(markNotificationsReadAsync.fulfilled,(state,action)=>{
        state.loading=false
        state.readNotifications = state.notifications.filter((n)=>action.payload.includes(n.id))
        state.notifications = state.notifications.filter((n)=>!action.payload.includes(n.id))
        state.error=null
      })
      .addCase(markNotificationsReadAsync.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
      })
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;
