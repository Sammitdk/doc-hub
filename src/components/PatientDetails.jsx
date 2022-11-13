import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  getDoc,
  Timestamp,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import "../index.css";

const PatientDetails = () => {
  const detailedName = window.matchMedia("(max-width: 600px)").matches;
  console.log(detailedName);
  const urlPara = useParams();
  const [newList, setNewList] = useState(null);
  const navigate = useNavigate();
  const checkRoute = window.location.pathname;
  const [prescription, set] = useState({ medicine: "", care: "" });
  useEffect(() => {
    getPatient();
    // eslint-disable-next-line
  }, []);

  async function getPatient() {
    if (urlPara.id === checkRoute.slice(7)) {
      const docRef = doc(db, "Appointments", urlPara.id);
      const docSnap = await getDoc(docRef);
      setNewList(docSnap.data());
    } else {
      const docRef = doc(db, "Patients", urlPara.id);
      const docSnap = await getDoc(docRef);
      setNewList(docSnap.data());
    }
  }

  const submitPrescription = async (newList) => {
    await setDoc(
      doc(db, "Patients", newList?.id, "Appointments", urlPara?.id),
      {
        medicine: prescription.medicine,
        care: prescription.care,
      },
      { merge: true }
    );
    await deleteDoc(doc(db, "Appointments", urlPara?.id));
    navigate("/check");
  };

  const appoint = async (patientDetails) => {
    const MainAppointment = await addDoc(
      collection(db, "Patients", urlPara.id, "Appointments"),
      {
        dateTime: Timestamp.now(),
        id: urlPara.id,
        firstname: patientDetails.firstname,
        middlename: patientDetails.middlename,
        lastname: patientDetails.lastname,
        age: patientDetails.age,
        mobilenumber: patientDetails.mobilenumber,
      }
    );

    await setDoc(doc(db, "Appointments", MainAppointment.id), {
      dateTime: Timestamp.now(),
      docId: MainAppointment.id,
      id: urlPara.id,
      firstname: patientDetails.firstname,
      middlename: patientDetails.middlename,
      lastname: patientDetails.lastname,
      age: patientDetails.age,
      mobilenumber: patientDetails.mobilenumber,
    });
    navigate("/");
  };

  return (
    <div>
      <div className="detailed-info">
        <h1>Personal Details</h1>
        <div className="detailed-name">
          <h2 style={{ paddingLeft: 7 }}>
            Name :{" "}
            {newList?.firstname.charAt(0).toUpperCase() +
              newList?.firstname.slice(1)}{" "}
            {!detailedName &&
              newList?.middlename.charAt(0).toUpperCase() +
                newList?.middlename.slice(1)}{" "}
            {newList?.lastname.charAt(0).toUpperCase() +
              newList?.lastname.slice(1)}
          </h2>
        </div>
        <div className="detailed-age">
          <h2>Age</h2>
          <h2 style={{ paddingLeft: 7 }}>{newList?.age}</h2>
        </div>
        <div className="detailed-number">
          <h2>Mobile Number :</h2>
          <h2 style={{ paddingLeft: 7 }}>{newList?.mobilenumber}</h2>
        </div>
      </div>

      {checkRoute !== `/${urlPara.id}` && (
        <div className="doctor-details">
          <form>
            <label className="medicine-label">Medicine</label>
            <input
              type="text"
              placeholder="prescription"
              required
              onChange={(e) =>
                set({ ...prescription, medicine: e.target.value })
              }
            />
            <label className="medicine-care">Care</label>
            <input
              type="text"
              placeholder="prescription"
              required
              onChange={(e) => set({ ...prescription, care: e.target.value })}
            />
          </form>
          <button
            onClick={() => submitPrescription(newList)}
            className="button"
            style={{ marginTop: "3%", marginLeft: "43%" }}
            type="submit"
          >
            Checked
          </button>
        </div>
      )}
      {checkRoute === `/${urlPara.id}` && (
        <div className="doctor-appointment">
          <button
            className="button"
            onClick={() => appoint(newList)}
            style={{ marginLeft: "45%" }}
          >
            Appoint
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
