import {configureStore} from "@reduxjs/toolkit";
import leadSlice from "./lead/leadSlice";
import clientSlice from "./client/clientSlice";
import projectSlice from "./project/projectSlice"
import notificationSlice from "./notification/notificationSlice"

const store = configureStore({
    reducer: {
        leads: leadSlice.reducer,
        clients: clientSlice.reducer,
        projects: projectSlice.reducer,
        notifications: notificationSlice.reducer,
    }
})

export default store