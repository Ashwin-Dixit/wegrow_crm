import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLeadService, deleteLeadService, addLeadService, updateLeadService } from "../../services/leadService";

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async () => {
    const data = await getLeadService()
    return data.leads;
  }
);
export const addLeadThunk = createAsyncThunk(
  "leads/addLeadThunk",
  async ({
      name,
      company,
      email,
      phone,
      source,
      notes,
    }) => {
      const data = await addLeadService({
        name,
        company,
        email,
        phone,
        source,
        notes,
      })
      return data.lead;
    }
)
export const deleteLeadThunk = createAsyncThunk(
  "leads/deleteLeadThunk",
  async (leadId) => {
    const data = await deleteLeadService(leadId)
    return data.leadId;
  }
);
export const updateLeadThunk = createAsyncThunk(
  "leads/updateLeadThunk",
  async ({leadId, updates}) => {
    console.log("inside thunk ", updates)
    const data = await updateLeadService(leadId, updates)
    return data.lead
  }
)