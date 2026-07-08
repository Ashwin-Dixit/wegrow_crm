import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLeadService } from "../../services/leadService";

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async () => {
    const data = await getLeadService()
    return data.leads;
  }
);