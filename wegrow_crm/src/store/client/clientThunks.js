import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClientsService, createClientService, updateClientService, deleteClientService } from "../../services/clientService";

export const fetchClients = createAsyncThunk("clients/fetchClients", async (_, {rejectWithValue}) => {
    try {
    const data = await getClientsService();
    return data.clients
    } catch(error) {
        return rejectWithValue(error.message)
    }
})

export const createClientThunk = createAsyncThunk("clients/createClientThunk", async (clientData, {rejectWithValue}) => {
    try {
    const data = await createClientService(clientData);
    return data.client
    } catch(error) {
        return rejectWithValue(error.message)
    }
})

export const updateClientThunk = createAsyncThunk("clients/updateClientThunk", async ({clientId, updates}, {rejectWithValue}) => {
    try {
    const data = await updateClientService({clientId, updates});
    return data.client
    } catch(error) {
        return rejectWithValue(error.message)
    }
})

export const deleteClientThunk = createAsyncThunk("clients/deleteClientThunk", async (clientId, {rejectWithValue}) => {
    try {
    const data = await deleteClientService(clientId);
    return data.clientId
    } catch(error) {
        return rejectWithValue(error.message)
    }
})