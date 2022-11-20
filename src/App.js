import "./App.css";
import { UseFirebaseValue } from "./Firebase";
import Login from "./components/Login";
import Main from "./components/Home/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPatient from "./components/Register/RegisterPatient";
import SideBar from "./components/sidebar/SideBar";
import Patients from "./components/Patients";
import Appointment from "./components/AppointentSearch/Appointment";
import PatientDetails from "./components/Patient/PatientDetails";
import CheckList from "./components/CheckList";
import Dialog from "./components/Dialog";

const App = () => {
  const [{ user }] = UseFirebaseValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <BrowserRouter>
          <SideBar />
          <Dialog />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route exact path="/register" element={<RegisterPatient />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/check" element={<CheckList />} />
            <Route path="/check/:id" element={<PatientDetails />} />
            <Route path="/:id" element={<PatientDetails />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
