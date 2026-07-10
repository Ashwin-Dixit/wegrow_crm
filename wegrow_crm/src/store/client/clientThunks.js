import { createAsyncThunk } from "@reduxjs/toolkit";
import { getClientsService } from "../../services/clientService";

export const fetchClients = createAsyncThunk("clients/fetchClients", async () => {
    console.log("inside client thunk")
    const data = await getClientsService();
    return data.clients
})