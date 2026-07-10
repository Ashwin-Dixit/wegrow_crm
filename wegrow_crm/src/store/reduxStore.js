import {configureStore} from "@reduxjs/toolkit";
import leadSlice from "./lead/leadSlice";
import clientSlice from "./client/clientSlice";

const store = configureStore({
    reducer: {
        leads: leadSlice.reducer,
        clients: clientSlice.reducer,
    }
})

export default store