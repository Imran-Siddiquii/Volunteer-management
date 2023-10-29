import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Grid
} from "@mui/material";
import React, { useState } from "react";
import { addVolunteer, editVolunteer } from "./volunteerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, events, theme) {
  return {
    fontWeight:
      events.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const VolunteerForm = () => {
  const location = useLocation();
  const { state } = location;
  const volunteer = state ? state : null;
  const [name, setName] = useState(volunteer ? volunteer.name : "");
  const [contact_info, setContact_Info] = useState(
    volunteer ? volunteer?.contact_info : ""
  );
  const [skill, setSkill] = useState(volunteer ? volunteer.skill : "");

  const [availability, setAvailability] = useState(
    volunteer ? volunteer?.availability : ""
  );
  const [areaOfInterest, setAreaOfInterest] = useState(
    volunteer ? volunteer?.areaOfInterest : ""
  );
  const [events, setEvents] = useState(
    volunteer?.events?.length > 0 ? volunteer.events : []
  );
  const [formError, setFormError] = useState(false);
  const dispatch = useDispatch();
  const { eventList } = useSelector((state) => state.events);
  const theme = useTheme();
  const handleChange = (e) => {
    const {
      target: { value }
    } = e;
    setEvents(typeof value === "string" ? value.split(",") : value);
  };
  const handleAddVolunteer = () => {
    if (
      name.trim() === "" ||
      skill.trim() === "" ||
      contact_info.toString().trim() === "" ||
      availability.trim() === "" ||
      areaOfInterest.trim() === "" ||
      events.length === 0
    ) {
      return setFormError(true);
    }
    const volunteerData = {
      name,
      skill,
      contact_info,
      availability,
      events,
      areaOfInterest
    };
    if (volunteer) {
      dispatch(editVolunteer({ _id: volunteer._id, ...volunteerData }));
    } else {
      dispatch(addVolunteer(volunteerData));
    }
    setFormError(false);
    setName("");
    setSkill("");
    setAreaOfInterest("");
    setAvailability("");
    setContact_Info("");
    setEvents([]);
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
            {volunteer ? "Update Volunteer" : "Add Volunteer"}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            className="text-field-form"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Skills"
            fullWidth
            className="text-field-form"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <TextField
            label="Availability"
            fullWidth
            className="text-field-form"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
          <TextField
            label="Contact Info"
            type="number"
            fullWidth
            className="text-field-form"
            value={contact_info}
            onChange={(e) => setContact_Info(e.target.value)}
          />
          <TextField
            label="Areas of interest"
            fullWidth
            className="text-field-form"
            value={areaOfInterest}
            onChange={(e) => setAreaOfInterest(e.target.value)}
          />
          <FormControl fullWidth className="text-field-form">
            <InputLabel
              id="demo-multiple-name-label"
              sx={{ background: "white", padding: "0 5px" }}
            >
              Event
            </InputLabel>

            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={events}
              multiple
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              disabled={!eventList.length > 0}
            >
              {eventList.length > 0 &&
                eventList.map((event, index) => (
                  <MenuItem
                    key={index}
                    value={event.name}
                    style={getStyles(name, events, theme)}
                  >
                    {event?.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {!eventList.length > 0 && (
            <Typography style={{ color: "red" }}>
              There are no events
            </Typography>
          )}
          {formError ? (
            <p className="error-message">Please fill all this fields</p>
          ) : null}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddVolunteer}
            style={{
              marginTop: "16px",
              backgroundColor: "#75bc8e",
              color: "white"
            }}
          >
            {volunteer ? "Update Volunteer" : "Add Volunteer"}
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default VolunteerForm;
