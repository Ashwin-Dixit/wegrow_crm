import {createAsyncThunk} from "@reduxjs/toolkit"
import { getProjectsForClient } from "../../services/projectService"
import { createTaskService } from "../../services/taskService"

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (clientId, {rejectWithValue}) => {
    console.log("inside fetchprojects thunk")
    try {
    const data = await getProjectsForClient(clientId)
    return data.projects
    } catch(error) {
        return rejectWithValue(error.message)
    }
})
export const addTaskThunk = createAsyncThunk('projects/addTaskThunk', async(taskData, {rejectWithValue}) => {
    try {
    const data = await createTaskService(taskData)
    return data.task
    } catch(error) {
        return rejectWithValue(error.message)
    }
})