import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import Patient from "../components/Patient/Patient";
import "../components/Patient/patient.css";
import { isEmpty } from "@firebase/util";
import "../index.css";

const Check = () => {
  const [searchList, setSearchList] = useState([]);
  const [style, setStyle] = useState({});

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateString.toDate());
  };

  useEffect(() => {
    setStyle({
      transition: "transform 1s linear",
      transform: "translateX(15%)",
    });
    const q = query(collection(db, "Appointments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setSearchList(
        querySnapshot.docs.map((doc) => ({
          docId: doc.data().docId,
          dateTime: formatDate(doc.data().dateTime),
          id: doc.data().id,
          firstname: doc.data().firstname,
          middlename: doc.data().middlename,
          lastname: doc.data().lastname,
          age: doc.data().age,
        }))
      );
      return () => {
        unsubscribe();
      };
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {searchList === isEmpty ? (
        <div className="appointment-check-list" style={style}>
          {searchList?.map((item) => {
            return <Patient key={item.id} patient={item} />;
          })}
        </div>
      ) : (
        <h2 className="no-appointment">No Appointments</h2>
      )}
    </>
  );
};

export default Check;
