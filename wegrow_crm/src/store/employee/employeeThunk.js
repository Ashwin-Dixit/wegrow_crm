import { fetchEmployees } from "@/services/employeeService"
import {createAsyncThunk} from "@reduxjs/toolkit"

const fetchEmployeesThunk = createAsyncThunk("employees/fetchEmployees", async (_,{rejectWithValue})=>{
    try{
        const data = await fetchEmployees()
        return data.employees
    }
    catch(error){
        console.log(error)
        return rejectWithValue(error.message)
    }
})

export default fetchEmployeesThunk