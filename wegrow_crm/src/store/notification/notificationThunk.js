import { createAsyncThunk } from "@reduxjs/toolkit"
import {fetchNotifications, markNotificationsRead} from "../../services/notificationService"

export const fetchNotificationsAsync = createAsyncThunk(
    "notifications/fetchNotifications",
    async (_, {rejectWithValue}) => {
        try{
            const data = await fetchNotifications()
            return data.notifications
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)

export const markNotificationsReadAsync = createAsyncThunk(
    "notifications/markNotificationsRead",
    async (notifications, {rejectWithValue}) => {
        const notificationIds = notifications.map((n) => n.id)
        try{
            const data = await markNotificationsRead(notificationIds)
            return data.notificationIds
        }catch(error){
            return rejectWithValue(error.message)
        }
    }
)
    