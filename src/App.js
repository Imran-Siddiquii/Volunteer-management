// if server is not running , please run manually this is my replt link
//https://replit.com/@Imransiddiqui2/fitness-api#index.js

import Sidebar from "./components/Sidebar";
import Event from "./pages/Event";
import EventDetails from "./pages/Event/EventDetails";
import EventForm from "./pages/Event/EventForm";
import EventSummary from "./pages/EventSummary";
import Volunteer from "./pages/Volunteer";
import VolunteerDetails from "./pages/Volunteer/VolunteerDetails";
import VolunteerForm from "./pages/Volunteer/VolunteerForm";
import VolunteerSummary from "./pages/VolunteerSummary";
import "./styles.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="page-container">
        <Routes>
          <Route exact path="/" element={<Volunteer />} />
          <Route exact path="/events" element={<Event />} />
          <Route exact path="/event/add" element={<EventForm />} />
          <Route exact path="/event/details/:id" element={<EventDetails />} />
          <Route exact path="/volunteer/add" element={<VolunteerForm />} />
          <Route
            exact
            path="/volunteer/details/:id"
            element={<VolunteerDetails />}
          />
          <Route
            exact
            path="/volunteer-summary"
            element={<VolunteerSummary />}
          />
          <Route exact path="/event-summary" element={<EventSummary />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
