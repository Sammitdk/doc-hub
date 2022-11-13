import React, { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db, UseFirebaseValue } from "../Firebase";
import Patient from "./Patient";
import "../App.css";

const Appointment = () => {
  const [search, setSearch] = useState(" ");
  const [{ searchList }, setSearchList] = UseFirebaseValue();

  useEffect(() => {
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
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Patient"
          required
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {searchList?.map((patient) => {
        return (
          <div key={patient.id} className="main-patient-div">
            <Patient patient={patient} />
          </div>
        );
      })}
    </div>
  );
};

export default Appointment;
