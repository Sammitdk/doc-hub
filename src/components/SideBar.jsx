import "../main.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import { Link } from "react-router-dom";

const SideBar = () => {
  const appointment = window.matchMedia("(max-width: 600px)").matches;
  return (
    <div className="side-bar">
      <h1>Welcome</h1>
      <hr />
      <div className="home-icon">
        <Link to="/">
          <HomeOutlinedIcon sx={{ fontSize: 50 }} />
        </Link>
        <h2>Home</h2>
      </div>
      <hr style={{ marginTop: 10 }} />
      <div className="home-icon">
        <Link to="/register">
          <MedicalInformationOutlinedIcon sx={{ fontSize: 50 }} />
        </Link>
        <h2>Register</h2>
      </div>
      <hr style={{ marginTop: 10 }} />
      <div className="home-icon">
        <Link to="/appointment">
          <HowToRegOutlinedIcon sx={{ fontSize: 50 }} />
        </Link>
        <h2>{appointment ? "Appoint" : "Appointment"}</h2>
      </div>
      <hr style={{ marginTop: 10 }} />
      <div className="home-icon">
        <Link to="/check">
          <VaccinesOutlinedIcon sx={{ fontSize: 50 }} />
        </Link>
        <h2>Check</h2>
      </div>
      <hr style={{ marginTop: 10 }} />
      <div className="home-icon">
        <Link to="/patients">
          <PeopleAltOutlinedIcon sx={{ fontSize: 50 }} />
        </Link>
        <h2>Patients</h2>
      </div>
      <hr style={{ marginTop: 10 }} />
    </div>
  );
};
export default SideBar;
