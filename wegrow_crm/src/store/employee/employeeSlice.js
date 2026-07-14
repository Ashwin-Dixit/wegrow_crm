import {createSlice} from "@reduxjs/toolkit"
import fetchEmployeesThunk from "./employeeThunk"

const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        employees: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchEmployeesThunk.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchEmployeesThunk.fulfilled, (state, action) => {
            state.loading = false
            state.employees = action.payload
        })
        .addCase(fetchEmployeesThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const employeeActions = employeeSlice.actions
export default employeeSlice