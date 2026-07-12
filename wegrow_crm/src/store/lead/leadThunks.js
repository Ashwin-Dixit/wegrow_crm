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
    }, {rejectWithValue}) => {
      try {
      const data = await addLeadService({
        name,
        company,
        email,
        phone,
        source,
        notes,
      })
      return data.lead;
    } catch(error) {
        return rejectWithValue(error.message)
    }
    }
)
export const deleteLeadThunk = createAsyncThunk(
  "leads/deleteLeadThunk",
  async (leadId, {rejectWithValue}) => {
    try {
    const data = await deleteLeadService(leadId)
    return data.leadId;
  } catch(error) {
    return rejectWithValue(error.message)
  }
  }
);
export const updateLeadThunk = createAsyncThunk(
  "leads/updateLeadThunk",
  async ({leadId, updates}, {rejectWithValue}) => {
    console.log("inside thunk ", updates)
    try {
    const data = await updateLeadService(leadId, updates)
    return data.lead
  } catch(error) {
    return rejectWithValue(error.message)
  }
  }
)