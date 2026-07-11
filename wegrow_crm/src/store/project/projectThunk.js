import {createAsyncThunk} from "@reduxjs/toolkit"
import { getProjectsForClient } from "../../services/projectService"
import { createTaskService } from "../../services/taskService"

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (clientId) => {
    console.log("inside fetchprojects thunk")
    const data = await getProjectsForClient(clientId)
    return data.projects
})
export const addTaskThunk = createAsyncThunk('projects/addTaskThunk', async(taskData) => {
    const data = await createTaskService(taskData)
    return data.task
})