import {createSlice} from '@reduxjs/toolkit'
import {fetchProjects, addTaskThunk, updateTaskStatusThunk} from './projectThunk'

const projectSlice = createSlice({
    name: 'projects',
    initialState:{
        projects: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProjects.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchProjects.fulfilled, (state, action) => {
            state.loading = false
            state.projects = action.payload
        })
        .addCase(fetchProjects.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        //add task
        .addCase(addTaskThunk.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addTaskThunk.fulfilled, (state, action) => {
            state.loading = false
            const newState = state.projects.map((project) => {
                if(project.id === action.payload.project_id){
                    return {...project, tasks: [...project.tasks, action.payload]}
                }
                return project
            })
            state.projects = newState
        })
        .addCase(addTaskThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(updateTaskStatusThunk.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateTaskStatusThunk.fulfilled, (state, action) => {
            state.loading = false
            const newState = state.projects.map((project) => {
                if(project.id === action.payload.project_id){
                    return {...project, tasks: project.tasks.map((task) => {
                        if(task.id === action.payload.id){
                            return action.payload
                        }
                        return task
                    })}
                }
                return project
            })
            state.projects = newState
        })
        .addCase(updateTaskStatusThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export const projectActions = projectSlice.actions
export default projectSlice