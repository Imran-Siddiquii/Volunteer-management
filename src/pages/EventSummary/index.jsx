import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import "../Event/index.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../Event/eventSlice";
import { fetchVolunteers } from "../Volunteer/volunteerSlice";

// Users can view a summary of a specific event, which includes the list of registered volunteers, volunteer roles, and event details
const EventSummary = () => {
  const dispatch = useDispatch();
  const { eventList, status } = useSelector((state) => state.events);
  const { volunteerList } = useSelector((state) => state.volunteers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
      dispatch(fetchVolunteers());
    }
  }, [status, dispatch]);

  const renderRegisteredVolunteer = (name) => {
    const registeredVolunteer = volunteerList.filter((volunteer) =>
      volunteer?.events?.find((item) => (item === name ? volunteer : null))
    );
    return registeredVolunteer.map((ele) => ele.name + ", ");
  };
  return (
    <div className="exercise-container" sx={{ border: "1px solid gray" }}>
      <Typography
        variant="h4"
        mt={6}
        textAlign="center"
        color="#75bc8e"
        gutterBottom
      >
        Event Summary
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          border: "1px solid #75bc8e",
          padding: "1rem",
          margin: "1rem",
          borderRadius: "5px"
        }}
      >
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>Event Summary</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial No</TableCell>
                    <TableCell>Events </TableCell>
                    <TableCell>Registered Volunteer</TableCell>
                    <TableCell>Volunteer roles</TableCell>
                    <TableCell>event details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventList.map((list, index) => (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{list.name}</TableCell>

                      <TableCell>
                        {renderRegisteredVolunteer(list.name)}
                      </TableCell>
                      <TableCell> {list.role}</TableCell>
                      <TableCell>{list.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default EventSummary;
