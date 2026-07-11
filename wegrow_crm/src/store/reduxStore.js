import {configureStore} from "@reduxjs/toolkit";
import leadSlice from "./lead/leadSlice";
import clientSlice from "./client/clientSlice";
import projectSlice from "./project/projectSlice"

const store = configureStore({
    reducer: {
        leads: leadSlice.reducer,
        clients: clientSlice.reducer,
        projects: projectSlice.reducer,
    }
})

export default store