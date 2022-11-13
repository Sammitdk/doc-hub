import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { db, UseFirebaseValue } from "../Firebase";
import Patient from "./Patient";

const Patients = () => {
  const [{ patients }, dispatch] = UseFirebaseValue([]);

  useEffect(() => {
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

  return patients?.map((patient) => {
    return <Patient patient={patient} key={patient.id} />;
  });
};

export default Patients;
