import {configureStore} from "@reduxjs/toolkit";
import leadSlice from "./lead/leadSlice";

const store = configureStore({
    reducer: {
        leads: leadSlice.reducer
    }
})

export default store