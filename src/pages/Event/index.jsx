import React, { useEffect, useState } from "react";
import {
  Button,
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
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./eventSlice";

const Event = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventList, status, error } = useSelector((state) => state.events);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  return (
    <div className="exercise-container" sx={{ border: "1px solid gray" }}>
      <Typography
        variant="h4"
        mt={6}
        textAlign="center"
        color="#75bc8e"
        gutterBottom
      >
        Events
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
        <Grid item xs={12} sm={8}>
          <Grid item container>
            <Grid sm={12} justifyContent="end">
              <Button
                variant="contained"
                onClick={() => navigate("/event/add")}
                style={{
                  backgroundColor: "#75bc8e"
                }}
              >
                Add Event
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>Event Lists</h2>
            <TableContainer
              component={Paper}
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Descriiption</TableCell>
                    <TableCell>Role</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventList?.map((event, index) => (
                    <TableRow
                      style={{
                        cursor: "pointer"
                      }}
                      key={index}
                      onClick={() => navigate(`/event/details/${event._id}`)}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.description}</TableCell>
                      <TableCell>{event.role}</TableCell>
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

export default Event;
