import { configureStore } from "@reduxjs/toolkit";

import eventSlice from "../pages/Event/eventSlice";
import volunteerSlice from "../pages/Volunteer/volunteerSlice";

const store = configureStore({
  reducer: {
    events: eventSlice,
    volunteers: volunteerSlice
  }
});

export default store;
