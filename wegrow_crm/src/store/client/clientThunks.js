import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClientsService, createClientService } from "../../services/clientService";

export const fetchClients = createAsyncThunk("clients/fetchClients", async ({rejectWithValue}) => {
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