import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import Patient from "./Patient";
import { isEmpty } from "@firebase/util";

const Check = () => {
  const [searchList, setSearchList] = useState([]);

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
    <div>
      {isEmpty(searchList) && (
        <h2 style={{ textAlign: 'center' }}>No Appointments</h2>
      )}
      {searchList?.map((item) => {
        return (
          <div key={item.id} className="appointment-check-list">
            <Patient patient={item} />
          </div>
        );
      })}
    </div>
  );
};

export default Check;
