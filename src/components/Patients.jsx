import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, UseFirebaseValue } from "../Firebase";
import Patient from "../components/Patient/Patient";
import "../components/Patient/patient.css";

const Patients = () => {
  const [{ patients }, dispatch] = UseFirebaseValue([]);
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle({
      transition: "transform 1.5s ease-in-out",
      transform: "translateY(8%)",
    });
    const q = query(collection(db, "Patients"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      dispatch({
        type: "setPatients",
        patients: querySnapshot.docs.map((doc) => ({
          id: doc.data().id,
          firstname: doc.data().firstname,
          middlename: doc.data().middlename,
          lastname: doc.data().lastname,
          gender: doc.data().gender,
          age: doc.data().age,
          mobilenumber: doc.data().mobilenumber,
          address: doc.data().address,
        })),
      });
      return () => {
        unsubscribe();
      };
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="patient-div" style={style}>
      {patients?.map((patient) => {
        return <Patient patient={patient} key={patient.id} />;
      })}
    </div>
  );
};

export default Patients;
