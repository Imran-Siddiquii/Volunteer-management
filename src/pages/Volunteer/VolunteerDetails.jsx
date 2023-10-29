import { IconButton, Paper, Typography, Grid } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { deleteVolunteer } from "./volunteerSlice";
import { useDispatch, useSelector } from "react-redux";
const VolunteerDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { volunteerList } = useSelector((state) => state.volunteers);
  const volunteerDetail = volunteerList.find((ele) => ele._id == id);

  const handleRemoveVolunteer = (id) => {
    dispatch(deleteVolunteer(id));
  };

  return (
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
      {volunteerDetail && <Typography>Volunteer Details</Typography>}
      {volunteerDetail ? (
        <Grid item xs={12} sm={12}>
          <Paper elevation={3} className="exercise-list-item">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px"
              }}
            >
              <div>
                <Typography variant="h6" color="#75bc8e">
                  Name : {volunteerDetail.name}
                </Typography>
                <Typography variant="body1">
                  Contact Info : {volunteerDetail.contact_info}
                </Typography>
                <Typography variant="body2">
                  Skills : {volunteerDetail.skill}
                </Typography>
                <Typography variant="body2">
                  Availability : {volunteerDetail.availability}
                </Typography>
                <Typography variant="body2">
                  Area Of Interest : {volunteerDetail.areaOfInterest}
                </Typography>
                <Typography variant="body2">
                  Event History :{" "}
                  {volunteerDetail.events?.map((ele) => ele + ", ")}
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <Link to="/volunteer/add" state={volunteerDetail}>
                    <Edit style={{ color: "#75bc8e" }} />
                  </Link>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveVolunteer(volunteerDetail._id)}
                >
                  <Delete style={{ color: "#75bc8e" }} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </Grid>
      ) : (
        <Typography>Volunteer not found</Typography>
      )}
    </Grid>
  );
};

export default VolunteerDetails;
