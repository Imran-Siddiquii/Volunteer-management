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
import { fetchVolunteers } from "../Volunteer/volunteerSlice";

const VolunteerSummary = () => {
  const dispatch = useDispatch();
  const { volunteerList, status } = useSelector((state) => state.volunteers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVolunteers());
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
        Volunteer Summary
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
            <h2 style={{ margin: "1rem" }}>Volunteer Summary</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial No</TableCell>
                    <TableCell>Volunteers</TableCell>
                    <TableCell>Contact Info</TableCell>
                    <TableCell>Assigned Event</TableCell>
                    <TableCell>Volunteer history</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteerList?.map((list, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{list.name}</TableCell>
                      <TableCell> {list.contact_info}</TableCell>
                      <TableCell>
                        {list.events.map((ele) => ele + ", ")}{" "}
                      </TableCell>
                      <TableCell>{list.areaOfInterest}</TableCell>
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

export default VolunteerSummary;
