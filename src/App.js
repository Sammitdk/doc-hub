import "./App.css";
import { UseFirebaseValue } from "./Firebase";
import Login from "./components/Login";
import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPatient from "./components/RegisterPatient";
import SideBar from "./components/SideBar";
import Patients from "./components/Patients";
import Appointment from "./components/Appointment";
import PatientDetails from "./components/PatientDetails";
import CheckList from "./components/CheckList";
import CheckPatient from "./components/CheckPatient";

const App = () => {
  const [{ user }] = UseFirebaseValue();
  return (
    <div style={{ margin: 0, padding: 0 }}>
      {!user ? (
        <Login />
      ) : (
        <BrowserRouter>
          <SideBar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route exact path="/register" element={<RegisterPatient />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/:id" element={<PatientDetails />} />
            <Route path="/check" element={<CheckList />} />
            <Route path="/check/:id" element={<CheckPatient />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
