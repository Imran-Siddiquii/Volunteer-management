import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://fitness-api.imransiddiqui2.repl.co/api/v1/events";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

export const addEvent = createAsyncThunk("events/addEvent", async (patient) => {
  const response = await axios.post(`${BASE_URL}`, patient);
  return response.data;
});
export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (eventId) => {
    const response = await axios.delete(`${BASE_URL}/${eventId}`);
    response.data = eventId;
    return response.data;
  }
);
export const editEvent = createAsyncThunk("events/editEvent", async (event) => {
  const response = await axios.post(`${BASE_URL}/update-event`, event);
  return response.data;
});
const initialState = {
  eventList: [],
  status: "idle",
  error: false
};

const eventtSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "success";
      state.eventList = action.payload.data;
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addEvent.pending]: (state) => {
      state.status = "loading";
    },
    [addEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.eventList = [...state.eventList, action.payload.data];
    },
    [addEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [editEvent.pending]: (state) => {
      state.status = "loading";
    },
    [editEvent.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload.data;
      const index = state.eventList.findIndex(
        (list) => list._id === updatedEvent._id
      );
      if (index !== -1) {
        state.eventList[index] = updatedEvent;
      }
    },
    [editEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteEvent.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.status = "success";
      state.eventList = state.eventList.filter(
        (student) => student._id !== action.payload
      );
    },
    [deleteEvent.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});
export const { fetchStandard, sortedBy, filteredBy } = eventtSlice.actions;
export default eventtSlice.reducer;
