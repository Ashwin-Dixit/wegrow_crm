import {createAsyncThunk} from "@reduxjs/toolkit"
import { getProjectsForClient, addProjectService, deleteProjectService, updateProjectService, updateProjectStatusService } from "../../services/projectService"
import { createTaskService, updateTaskStatusService, deleteTaskService } from "../../services/taskService"

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (clientId, {rejectWithValue}) => {
    try {
    const data = await getProjectsForClient(clientId)
    return data.projects
    } catch(error) {
        return rejectWithValue(error.message)
    }
})
export const addProjectThunk = createAsyncThunk('projects/addProject', async (projectData, {rejectWithValue}) => {
    try{
        const data = await addProjectService(projectData)
        return data.project
    } catch(error) {
        console.log("error in add project thunk", error)
        return rejectWithValue(error.message)
    }
})
export const deleteProjectThunk = createAsyncThunk('projects/deleteProject', async (id, rejectWithValue)=>{
    try{
        const data = await deleteProjectService(id)
        return data.projectId
    } catch(error){
        return rejectWithValue(error.message)
    }
})
export const updateProjectThunk = createAsyncThunk('projects/updateProject', async(projectData, {rejectWithValue}) => {
    try{
        const data = await updateProjectService(projectData)
        return data.project
    } catch(error) {
        return rejectWithValue(error.message)
    }
})
export const updateProjectStatusThunk = createAsyncThunk('projects/updateProjectStatus', async(projectData, {rejectWithValue}) => {
    try{
        const data = await updateProjectStatusService(projectData)
        return data.project
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
export const updateTaskStatusThunk = createAsyncThunk('projects/updateTaskStatusThunk', async(taskData, {rejectWithValue}) => {
    try{
        const data = await updateTaskStatusService(taskData)
        return data.task
    } catch(error) {
        return rejectWithValue(error.message)
    }
})
export const deleteTaskThunk = createAsyncThunk('projects/deleteTaskThunk', async(taskId, {rejectWithValue}) => {
    try {
        const data = await deleteTaskService(taskId)
        return data.task
    } catch(error) {
        return rejectWithValue(error.message)
    }
})