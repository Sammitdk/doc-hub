import { Link } from "react-router-dom";
import "./sidebar.css";

const SideBar = () => {
  return (
    <div className="side-bar">
      <div className="side-bar-top">
        <h1>Welcome</h1>
        <div className="side-bar-routes">
          <div className="home-icon">
            <Link to="/" className="link">
              <h2>Home</h2>
            </Link>
          </div>

          <div className="home-icon">
            <Link to="/register" className="link">
              <h2>Register</h2>
            </Link>
          </div>

          <div className="home-icon">
            <Link to="/appointment" className="link">
              <h2>Appointment</h2>
            </Link>
          </div>

          <div className="home-icon">
            <Link to="/check" className="link">
              <h2>Check</h2>
            </Link>
          </div>

          <div className="home-icon">
            <Link to="/patients" className="link">
              <h2>Patients</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="side-bar-bottom"></div>
    </div>
  );
};
export default SideBar;
