import { Button, Paper, TextField, Typography, Grid } from "@mui/material";
import { useState } from "react";
import { addEvent, editEvent } from "./eventSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
const EventForm = () => {
  const { state } = useLocation();
  const event = state ? state : null;
  const [name, setName] = useState(event ? event.name : "");
  const [date, setDate] = useState(event ? event.date : "");
  const [location, setLocation] = useState(event ? event.location : "");
  const [description, setDescription] = useState(
    event ? event?.description : ""
  );
  const [role, setRole] = useState(event ? event?.role : "");
  const [requiredVolunteer, setRequiredVolunteer] = useState(
    event ? event.requiredVolunteer : ""
  );
  const [formError, setFormError] = useState(false);
  const dispatch = useDispatch();
  const handleAddEvent = () => {
    if (
      name.trim() === "" ||
      date.toString().trim() === "" ||
      location.trim() === "" ||
      description.trim() === "" ||
      role.trim() === "" ||
      requiredVolunteer.toString().trim() === ""
    ) {
      return setFormError(true);
    }
    const eventData = {
      name,
      date,
      location,
      description,
      role,
      requiredVolunteer
    };
    if (event) {
      dispatch(editEvent({ _id: event._id, ...eventData }));
    } else {
      dispatch(addEvent(eventData));
    }
    setFormError(false);
    setName("");
    setDate("");
    setLocation("");
    setRole("");
    setDescription("");
    setRequiredVolunteer("");
  };
  return (
    <>
      <Grid
        className="exercise-container"
        sx={{
          border: "1px solid #75bc8e",
          padding: "1rem",
          margin: "1rem",
          borderRadius: "5px"
        }}
      >
        <Paper elevation={3} className="exercise-form">
          <Typography variant="h5" gutterBottom color="#75bc8e">
            {event ? "Update Event" : "Add Event"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            className="text-field-form"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Typography label="Date" className="text-field-form">
            Date
          </Typography>
          <TextField
            type="date"
            fullWidth
            className="text-field-form"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TextField
            label="Location"
            // type="date"
            fullWidth
            className="text-field-form"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Description"
            type="textarea"
            fullWidth
            className="text-field-form"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={5}
          />
          <TextField
            label="Role"
            fullWidth
            className="text-field-form"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <TextField
            label="Required volunteer"
            fullWidth
            className="text-field-form"
            value={requiredVolunteer}
            onChange={(e) => setRequiredVolunteer(e.target.value)}
          />
          {formError ? (
            <p className="error-message">Please fill all this fields</p>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEvent}
            style={{
              marginTop: "16px",
              backgroundColor: "#75bc8e",
              color: "white"
            }}
          >
            {event ? "Update Event" : "Add Event"}
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default EventForm;
