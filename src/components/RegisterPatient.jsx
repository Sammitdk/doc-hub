import React, { useState, useEffect } from "react";
import "../registerpatient.css";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, UseFirebaseValue } from "../Firebase";
import { useNavigate } from "react-router-dom";

const RegisterPatient = () => {
  const [{ error }, setError] = UseFirebaseValue();
  useEffect(() => {
    const timer = setTimeout(() => {
      setError({
        type: "UserAlreadyExist",
        error: null,
      });
    }, 2000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [error]);
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "Male",
    age: "",
    mobilenumber: "",
    address: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(
      db,
      "Patients",
      `${inputValues.firstname.toLowerCase()}${String(
        inputValues.mobilenumber
      ).slice(-4)}`
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setError({
        type: "UserAlreadyExist",
        error: "User Already Exist",
      });
    } else {
      const data = {
        id: `${inputValues.firstname.toLowerCase()}${String(
          inputValues.mobilenumber
        ).slice(-4)}`,
        firstname: inputValues.firstname.toLowerCase(),
        middlename: inputValues.middlename.toLowerCase(),
        lastname: inputValues.lastname.toLowerCase(),
        gender: inputValues.gender,
        age: Number(inputValues.age),
        mobilenumber: Number(inputValues.mobilenumber),
        address: inputValues.address,
      };
      await setDoc(docRef, data);
      navigate("/");
    }
  };
  return (
    <div className="register-div">
      <form onSubmit={submitHandler}>
        <div className="full-name">
          <div className="first-name">
            <label className="div-label">First Name</label>
            <input
              type="text"
              placeholder="Your name.."
              required
              onChange={(e) =>
                setInputValues({ ...inputValues, firstname: e.target.value })
              }
            />
          </div>
          <div className="middle-name">
            <label className="div-label">Middle Name</label>
            <input
              type="text"
              placeholder="Your middle name.."
              required
              onChange={(e) =>
                setInputValues({ ...inputValues, middlename: e.target.value })
              }
            />
          </div>
          <div className="last-name">
            <label className="div-label">Last Name</label>
            <input
              type="text"
              placeholder="Your last name.."
              required
              onChange={(e) =>
                setInputValues({ ...inputValues, lastname: e.target.value })
              }
            />
          </div>
        </div>
        <label className="div-label">Gender</label>
        <select
          required
          value={inputValues.gender}
          onChange={(e) =>
            setInputValues({ ...inputValues, gender: e.target.value })
          }
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer Not To Say">Prefer Not to say</option>
        </select>
        <label className="div-label">Age</label>
        <input
          type="text"
          placeholder="Your age.."
          required
          maxLength="2"
          title="Please Enter Number Correctly"
          pattern="[0-9]{0,99}"
          onChange={(e) =>
            setInputValues({ ...inputValues, age: e.target.value })
          }
        />
        <label className="div-label">Mobile Number</label>
        <input
          type="text"
          placeholder="Your Mobile Number.."
          required
          maxLength="10"
          pattern="[1-9]{1}[0-9]{9}"
          title="Please Enter Number Correctly"
          onChange={(e) =>
            setInputValues({ ...inputValues, mobilenumber: e.target.value })
          }
        />
        <label className="div-label">Address</label>
        <input
          type="text"
          placeholder="Your Address.."
          required
          onChange={(e) =>
            setInputValues({ ...inputValues, address: e.target.value })
          }
        />
        <h3 style={{ color: "red" }}>{error}</h3>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default RegisterPatient;
