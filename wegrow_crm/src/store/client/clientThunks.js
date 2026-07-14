import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClientsService, createClientService, updateClientService, deleteClientService } from "../../services/clientService";

export const fetchClients = createAsyncThunk("clients/fetchClients", async (_, {rejectWithValue}) => {
    console.log("inside client thunk")
    try {
    const data = await getClientsService();
    return data.clients
    } catch(error) {
        return rejectWithValue(error.message)
    }
})

export const createClientThunk = createAsyncThunk("clients/createClientThunk", async (clientData, {rejectWithValue}) => {
    console.log("inside create client thunk", clientData)
    try {
    const data = await createClientService(clientData);
    return data.client
    } catch(error) {
        return rejectWithValue(error.message)
    }
})

export const updateClientThunk = createAsyncThunk("clients/updateClientThunk", async ({clientId, updates}, {rejectWithValue}) => {
    console.log("inside update client thunk", clientId, updates)
    try {
    const data = await updateClientService({clientId, updates});
    return data.client
    } catch(error) {
        return rejectWithValue(error.message)
    }
})

export const deleteClientThunk = createAsyncThunk("clients/deleteClientThunk", async (clientId, {rejectWithValue}) => {
    console.log("inside delete client thunk", clientId)
    try {
    const data = await deleteClientService(clientId);
    return data.clientId
    } catch(error) {
        return rejectWithValue(error.message)
    }
})