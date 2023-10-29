import React, { useEffect } from "react";
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
import "../Event/index";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers } from "./volunteerSlice";

const Volunteer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        Volunteers
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
                onClick={() => navigate("/volunteer/add")}
                style={{
                  backgroundColor: "#75bc8e"
                }}
              >
                Add Volunteer
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div>
            <h2 style={{ margin: "1rem" }}>Volunteer Lists</h2>
            <TableContainer
              component={Paper}
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Serial Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell>Area Of Interest</TableCell>
                    <TableCell>Availablility</TableCell>
                    <TableCell>Contant Info</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteerList?.map((volunteer, index) => (
                    <TableRow
                      style={{
                        cursor: "pointer"
                      }}
                      key={index}
                      onClick={() =>
                        navigate(`/volunteer/details/${volunteer._id}`)
                      }
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{volunteer.name}</TableCell>
                      <TableCell>{volunteer.skill}</TableCell>
                      <TableCell>{volunteer.areaOfInterest}</TableCell>
                      <TableCell>{volunteer.availability}</TableCell>
                      <TableCell>{volunteer.contact_info}</TableCell>
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

export default Volunteer;
