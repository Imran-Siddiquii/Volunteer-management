import { IconButton, Paper, Typography, Grid } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { deleteEvent } from "./eventSlice";
import { useDispatch, useSelector } from "react-redux";
const EventDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { eventList } = useSelector((state) => state.events);
  const eventDetail = eventList.find((ele) => ele._id == id);
  const { volunteerList } = useSelector((state) => state.volunteers);

  const registeredVolunteer = volunteerList.filter((list) =>
    list?.events?.find((item) => (item === eventDetail?.name ? list : null))
  );
  const handleRemovePatient = (id) => {
    dispatch(deleteEvent(id));
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
      {eventDetail && <Typography>Event Details</Typography>}
      {eventDetail ? (
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
                  Name : {eventDetail.name}
                </Typography>
                <Typography variant="body1">
                  Location : {eventDetail.location}
                </Typography>
                <Typography variant="body2">
                  Date : {eventDetail.date}
                </Typography>
                <Typography variant="body2">
                  Role : {eventDetail.role}
                </Typography>
                <Typography variant="body2">
                  Required Volunteer : {eventDetail.requiredVolunteer}
                </Typography>
                <Typography variant="body2">
                  Registered Volunteer Name :{" "}
                  {registeredVolunteer?.map((ele) => ele.name + ", ")}
                </Typography>
              </div>
              <div>
                <IconButton aria-label="edit">
                  <Link to="/event/add" state={eventDetail}>
                    <Edit style={{ color: "#75bc8e" }} />
                  </Link>
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemovePatient(eventDetail._id)}
                >
                  <Delete style={{ color: "#75bc8e" }} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </Grid>
      ) : (
        <Typography>Event not found</Typography>
      )}
    </Grid>
  );
};

export default EventDetails;
