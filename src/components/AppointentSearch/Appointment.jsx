import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db, UseFirebaseValue } from "../../Firebase";
import Patient from "../Patient/Patient";
import "./appointment.css";

const Appointment = () => {
  const [search, setSearch] = useState(" ");
  const [{ searchList }, setSearchList] = UseFirebaseValue();
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle({
      transition: "transform 1s ease-in-out",
      transform: "translateX(15%)",
    });
    const q = query(
      collection(db, "Patients"),
      where("firstname", ">=", search),
      where("firstname", "<=", search + "~")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setSearchList({
        type: "patientsSearch",
        searchList: querySnapshot.docs.map((doc) => ({
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
  }, [search]);
  return (
    <>
      <div className="search-bar" style={style}>
        <input
          type="text"
          placeholder="Search Patient"
          required
          onChange={(e) => setSearch(e.target.value.toLocaleLowerCase())}
        />
      </div>
      {searchList?.map((patient) => {
        return (
          <div key={patient.id} className="main-patient-div">
            <Patient patient={patient} />
          </div>
        );
      })}
    </>
  );
};

export default Appointment;
