import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase";
import { deleteDoc, doc } from "firebase/firestore";

const Patient = ({ patient }) => {
  const navigate = useNavigate();

  const appointmentRoute = window.location.pathname !== "/appointment";
  const checkRoute = window.location.pathname === "/check";

  const patientClick = (patient) => {
    console.log(patient);
    navigate(`/${patient}`);
  };

  const check = (patient) => {
    navigate(`/check/${patient.docId}`);
  };

  const deleteP = async () => {
    await deleteDoc(doc(db, "Appointments", patient.docId));
  };

  return checkRoute ? (
    <div className="patient-check">
      <div className="patient-name">
        <button className="delete" onClick={deleteP}>
          Delete
        </button>
        <h2>
          {patient.firstname.charAt(0).toUpperCase() +
            patient.firstname.slice(1)}{" "}
          {patient.middlename.charAt(0).toUpperCase() +
            patient.middlename.slice(1)}{" "}
          {patient.lastname.charAt(0).toUpperCase() + patient.lastname.slice(1)}
        </h2>
        <h2>{patient.dateTime}</h2>
      </div>
      <button className="patient-check-button" onClick={() => check(patient)}>
        Check
      </button>
    </div>
  ) : (
    <div className="patient" onClick={() => patientClick(patient.id)}>
      <h2 className="patient-name">
        {patient.firstname.charAt(0).toUpperCase() + patient.firstname.slice(1)}{" "}
        {appointmentRoute &&
          patient.middlename.charAt(0).toUpperCase() +
            patient.middlename.slice(1)}{" "}
        {patient.lastname.charAt(0).toUpperCase() + patient.lastname.slice(1)}
      </h2>
      <h2 className="patient-id">{patient.id}</h2>
    </div>
  );
};

export default Patient;
