import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClientsService, createClientService } from "../../services/clientService";

export const fetchClients = createAsyncThunk("clients/fetchClients", async () => {
    console.log("inside client thunk")
    const data = await getClientsService();
    return data.clients
})

export const createClientThunk = createAsyncThunk("clients/createClientThunk", async (clientData) => {
    console.log("inside create client thunk", clientData)
    const data = await createClientService(clientData);
    return data.client
})