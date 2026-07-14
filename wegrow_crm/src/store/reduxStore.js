import {configureStore} from "@reduxjs/toolkit";
import leadSlice from "./lead/leadSlice";
import clientSlice from "./client/clientSlice";
import projectSlice from "./project/projectSlice"
import notificationSlice from "./notification/notificationSlice"
import employeeSlice from "./employee/employeeSlice"

const store = configureStore({
    reducer: {
        leads: leadSlice.reducer,
        clients: clientSlice.reducer,
        projects: projectSlice.reducer,
        notifications: notificationSlice.reducer,
        employees: employeeSlice.reducer,
    }
})

export default store