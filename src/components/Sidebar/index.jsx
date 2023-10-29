import { Link, useMatch } from "react-router-dom";
import "./sidebar.css";
function NavLinkWithActive({ to, children }) {
  const match = useMatch(to);
  return (
    <li className={match ? "active" : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}
const Sidebar = () => {
  return (
    <div className="left-sidebar">
      <div className="logo">
        <Link to="/">
          <img src="/Volunteer.png" alt="Volunteer Logo" width="100px" />
        </Link>
        <h2
          style={{
            textAlign: "center",
            margin: "15px auto"
          }}
        >
          Volunteer Management
        </h2>
      </div>
      <ul className="nav-links">
        <NavLinkWithActive to="/">Volunteers</NavLinkWithActive>
        <NavLinkWithActive to="/events">Events</NavLinkWithActive>
        <NavLinkWithActive to="/event-summary">
          Events Summary
        </NavLinkWithActive>
        <NavLinkWithActive to="/volunteer-summary">
          Volunteers Summary
        </NavLinkWithActive>
      </ul>
    </div>
  );
};
export default Sidebar;
