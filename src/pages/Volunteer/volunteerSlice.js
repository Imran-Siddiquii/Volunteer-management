import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://fitness-api.imransiddiqui2.repl.co/api/v1/volunteers";

export const fetchVolunteers = createAsyncThunk(
  "volunteer/fetchVolunteers",
  async () => {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  }
);

export const addVolunteer = createAsyncThunk(
  "volunteers/addVolunteer",
  async (volunteer) => {
    const response = await axios.post(`${BASE_URL}`, volunteer);
    return response.data;
  }
);
export const deleteVolunteer = createAsyncThunk(
  "volunteers/deleteVolunteer",
  async (volunteerId) => {
    const response = await axios.delete(`${BASE_URL}/${volunteerId}`);
    response.data = volunteerId;
    return response.data;
  }
);
export const editVolunteer = createAsyncThunk(
  "volunteers/editVolunteer",
  async (volunteer) => {
    const response = await axios.post(
      `${BASE_URL}/update-volunteer`,
      volunteer
    );
    return response.data;
  }
);
const initialState = {
  volunteerList: [],
  status: "idle",
  error: false
};

const volunteerSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVolunteers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteerList = action.payload.data;
    },
    [fetchVolunteers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteerList = [...state.volunteerList, action.payload.data];
    },
    [addVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [editVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload.data;
      const index = state.volunteerList.findIndex(
        (list) => list._id === updatedVolunteer._id
      );
      if (index !== -1) {
        state.volunteerList[index] = updatedVolunteer;
      }
    },
    [editVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteVolunteer.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteer.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteerList = state.volunteerList.filter(
        (student) => student._id !== action.payload
      );
    },
    [deleteVolunteer.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});
// export const { fetchVolunteer } = volunteerSlice.actions;
export default volunteerSlice.reducer;
